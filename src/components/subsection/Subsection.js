import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { onCreateSubsection } from "../../graphql/subscriptions";
import {
  deleteSubsection,
  deleteSection,
  updateSubsection,
} from "../../graphql/mutations";
import { getSection } from "../../graphql/queries";

import EditSection from "../section/EditSection";
import ItemsSubsection from "./ItemsSubsection";
import DetailSection from "../section/DetailSection";
import CreateSubsection from "./CreateSubsection";
import ListSubsectionDraggable from "./ListSubsectionDraggable";
import AdminMenu from "../AdminMenu";

function Subsection(props) {
  let { id } = useParams();
  const [sectionId, setSectionId] = useState(null);
  const [subsections, setSubsections] = useState(null);
  const [title, setTitle] = useState(null);
  const [intro, setIntro] = useState(null);
  const [body, setBody] = useState(null);
  const [urlKey, setUrlKey] = useState(null);
  const [urlPath, setUrlPath] = useState(null);
  const [editSection, setEditSection] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [showCreateSubsection, setShowCreateSubsection] = useState(false);

  useEffect(() => {
    getPublicData();
  }, []);

  const getPublicData = async () => {
    try {
      const sectionData = await API.graphql({
        query: getSection,
        variables: { id },
        authMode: "API_KEY",
      });

      setSubsections(sectionData.data.getSection.subsections.items);
      setSectionId(sectionData.data.getSection.id);
      setTitle(sectionData.data.getSection.title);
      setIntro(sectionData.data.getSection.intro);
      setBody(sectionData.data.getSection.body);
      setUrlKey(sectionData.data.getSection.urlKey);
      setUrlPath(sectionData.data.getSection.urlPath);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  };

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateSubsection)
    ).subscribe({
      next: (data) => {
        const {
          value: {
            data: { onCreateSubsection },
          },
        } = data;
        const subsectionData = [onCreateSubsection, ...subsections];
        setSubsections(subsectionData);
      },
    });
    return () => subscription.unsubscribe();
  }, [subsections]);

  const handleDeleteSubsection = async (subsectionId, urlKey) => {
    const input = { id: subsectionId };
    await API.graphql(graphqlOperation(deleteSubsection, { input }));

    if (urlKey) {
      handleDeleteImage(urlKey);
    }

    getPublicData();
  };

  const handleDeleteImage = async (imageUrl) => {
    Storage.remove(imageUrl);
  };

  const handleDeleteSection = async (sectionId, urlKey) => {
    subsections.map((subsection) =>
      handleDeleteSubsection(subsection.id, subsection.urlKey)
    );

    const input = { id: sectionId };
    await API.graphql(graphqlOperation(deleteSection, { input }));

    if (urlKey) {
      handleDeleteImage(urlKey);
    }

    props.history.push("/");
  };

  function compare(a, b) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }

  if (id !== sectionId) {
    getPublicData();
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const dropSource = result.source.index;
    const dropDestination = result.destination.index;

    if (dropDestination === dropSource) {
      return;
    }

    setSubsections([]);
    console.log("source:", dropSource);
    console.log("destination", dropDestination);
    console.log(subsections[dropDestination].order);

    const reorderUpdate = async (sectionId, drop) => {
      const input = {
        id: sectionId,
        order: drop,
      };

      const result = await API.graphql(
        graphqlOperation(updateSubsection, {
          input,
        })
      );
      getPublicData();
      console.info(`Updated section: id ${result.data.updateSubsection.id}`);
    };

    const dropSourceOrderCopy = subsections[dropSource].order;

    reorderUpdate(
      subsections[dropSource].id,
      subsections[dropDestination].order
    );
    reorderUpdate(subsections[dropDestination].id, dropSourceOrderCopy);
  };

  return (
    <UserContext.Consumer>
      {({ user, group }) => (
        <div className="subsection-container">
          <div className="section-detail-text-container">
            {showCreateSubsection === false && (
              <div>
                {editSection === false ? (
                  <DetailSection
                    urlKey={urlKey}
                    urlPath={urlPath}
                    title={title}
                    intro={intro}
                    body={body}
                    user={user}
                    group={group}
                    setEditSection={setEditSection}
                    handleDeleteSection={handleDeleteSection}
                    sectionId={sectionId}
                  />
                ) : (
                  title &&
                  intro &&
                  body &&
                  user &&
                  group === "admin" && (
                    <EditSection
                      sectionId={id}
                      iniTitle={title}
                      iniIntro={intro}
                      iniBody={body}
                      iniUrlKey={urlKey}
                      iniUrlPath={urlPath}
                      getPublicData={getPublicData}
                      setEditSection={setEditSection}
                    />
                  )
                )}
              </div>
            )}
            {user && group === "admin" && (
              <div>
                {showCreateSubsection === false ? (
                  <AdminMenu
                    createIcon="createNewSection.svg"
                    setShowCreate={setShowCreateSubsection}
                    reorderIcon="reorderSectionList.svg"
                    setIsDraggable={setIsDraggable}
                    isDraggable={isDraggable}
                    listIcon="sectionList.svg"
                  />
                ) : (
                  <CreateSubsection
                    sectionId={id}
                    getPublicData={getPublicData}
                    subsections={subsections}
                  />
                )}
              </div>
            )}

            {isDraggable === false ? (
              subsections &&
              subsections.sort(compare).map((item, index) => (
                <div key={item.id}>
                  <ItemsSubsection
                    title={item.title}
                    text={item.text}
                    id={item.id}
                    user={user}
                    group={group}
                    handleDeleteSubsection={handleDeleteSubsection}
                    subsectionId={item.id}
                    iniTitle={item.title}
                    iniText={item.text}
                    getPublicData={getPublicData}
                    type={item.type}
                    urlKey={item.urlKey}
                    index={index}
                    isDraggable={isDraggable}
                    order={item.order}
                  />
                </div>
              ))
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <ListSubsectionDraggable
                        subsections={subsections}
                        compare={compare}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Subsection;
