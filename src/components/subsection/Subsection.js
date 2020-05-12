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
import { getSection, listSubsections } from "../../graphql/queries";

import EditSection from "../section/EditSection";
import DetailSection from "../section/DetailSection";

import ItemsSubsection from "./ItemsSubsection";
import CreateSubsection from "./CreateSubsection";
import ListSubsectionDraggable from "./ListSubsectionDraggable";

import AdminMenu from "../AdminMenu";

function Subsection(props) {
  let { id } = useParams();
  const [sectionId, setSectionId] = useState(null);
  // const [subsections, setSubsections] = useState(null);
  const [title, setTitle] = useState(null);
  const [intro, setIntro] = useState(null);
  const [body, setBody] = useState(null);
  const [urlKey, setUrlKey] = useState(null);
  const [urlPath, setUrlPath] = useState(null);
  const [editSection, setEditSection] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [showCreateSubsection, setShowCreateSubsection] = useState(false);

  const [subSections, setSubSections] = useState([]);

  useEffect(() => {
    getPublicData();
    listSubsectionData();
  }, []);

  const listSubsectionData = async () => {
    try {
      const subsectionsData = await API.graphql({
        query: listSubsections,
        variables: { limit: 1000 },
        authMode: "API_KEY",
      });

      const subsectionsDataArray = subsectionsData.data.listSubsections.items;

      const subsectionsDataFiltered = subsectionsDataArray.filter(
        (item) => item.sectionId === id
      );

      setSubSections(subsectionsDataFiltered);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  };

  const getPublicData = async () => {
    try {
      const sectionData = await API.graphql({
        query: getSection,
        variables: { id, limit: 1000 },
        authMode: "API_KEY",
      });

      // setSubsections(sectionData.data.getSection.subsections.items);
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
        const subsectionData = [onCreateSubsection, ...subSections];
        setSubSections(subsectionData);
      },
    });
    return () => subscription.unsubscribe();
  }, [subSections]);

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
    subSections.map((subsection) =>
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
    if (Number(a.order) < Number(b.order)) {
      return -1;
    }
    if (Number(a.order) > Number(b.order)) {
      return 1;
    }
    return 0;
  }

  if (id !== sectionId) {
    getPublicData();
  }

  // On drag

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const dropSource = result.source.index;
    const dropDestination = result.destination.index;

    if (dropDestination === dropSource) {
      return;
    }

    setSubSections([]);
    console.log("source:", dropSource);
    console.log("destination", dropDestination);
    console.log(subSections[dropDestination].order);

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
      listSubsectionData();
      console.info(`Updated section: id ${result.data.updateSubsection.id}`);
    };

    const dropSourceOrderCopy = subSections[dropSource].order;

    reorderUpdate(
      subSections[dropSource].id,
      subSections[dropDestination].order
    );
    reorderUpdate(subSections[dropDestination].id, dropSourceOrderCopy);
  };

  return (
    <UserContext.Consumer>
      {({ user, group }) => (
        <div className="subsection-container">
          <div className="">
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
                    createIcon="createNewContent.svg"
                    setShowCreate={setShowCreateSubsection}
                    reorderIcon="reorderSectionList.svg"
                    setIsDraggable={setIsDraggable}
                    isDraggable={isDraggable}
                    listIcon="sectionList.svg"
                  />
                ) : (
                  <CreateSubsection
                    sectionId={id}
                    getPublicData={listSubsectionData}
                    subsections={subSections}
                    setShowCreateSubsection={setShowCreateSubsection}
                  />
                )}
              </div>
            )}

            {isDraggable === false ? (
              subSections &&
              subSections.sort(compare).map((item) => (
                <div key={item.id}>
                  <ItemsSubsection
                    title={item.title}
                    text={item.text}
                    id={item.id}
                    user={user}
                    group={group}
                    handleDeleteSubsection={handleDeleteSubsection}
                    subsectionId={item.id}
                    getPublicData={listSubsectionData}
                    type={item.type}
                    urlKey={item.urlKey}
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
                        subsections={subSections}
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
