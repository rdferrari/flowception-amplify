import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";

import {
  onCreateSubsection,
  onUpdateSection,
} from "../../graphql/subscriptions";
import { deleteSubsection, deleteSection } from "../../graphql/mutations";
import { getSection, listSections } from "../../graphql/queries";

import EditSection from "../section/EditSection";
import EditSubsection from "./EditSubsection";
import MediaItem from "./MediaItem";
import DetailSection from "../section/DetailSection";
import TextItem from "./TextItem";
import CreateSubsection from "./CreateSubsection";
import ListSection from "../section/ListSection";

function Subsection(props) {
  let { id } = useParams();
  const [sectionId, setSectionId] = useState(null);
  const [sections, updateSections] = useState([]);
  const [subsections, setSubsections] = useState(null);
  const [title, setTitle] = useState(null);
  const [intro, setIntro] = useState(null);
  const [body, setBody] = useState(null);
  const [urlKey, setUrlKey] = useState(null);
  const [urlPath, setUrlPath] = useState(null);
  const [editSection, setEditSection] = useState(false);
  const [editText, setEditText] = useState(false);

  useEffect(() => {
    getPublicData();
    getPublicListData();
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

  const getPublicListData = async () => {
    const sectionData = await API.graphql({
      query: listSections,
      variables: {},
      authMode: "API_KEY",
    });

    const sectionArray = sectionData.data.listSections.items;
    updateSections(sectionArray);
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

    props.history.push("/sections");
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

  return (
    <UserContext.Consumer>
      {({ user, group }) => (
        <div className="section-sub-container">
          <div className="section-sub-container-content">
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

            {user && group === "admin" && (
              <CreateSubsection
                sectionId={id}
                getPublicData={getPublicData}
                subsections={subsections}
              />
            )}

            {subsections &&
              subsections.sort(compare).map((item) => (
                <div className="section-sub-item" key={item.id}>
                  {item.type === "TEXT" && (
                    <div>
                      {editText === false ? (
                        <TextItem
                          title={item.title}
                          text={item.text}
                          id={item.id}
                          user={user}
                          group={group}
                          setEditText={setEditText}
                          handleDeleteSubsection={handleDeleteSubsection}
                        />
                      ) : (
                        <EditSubsection
                          subsectionId={item.id}
                          iniTitle={item.title}
                          iniText={item.text}
                          getPublicData={getPublicData}
                          setEditText={setEditText}
                        />
                      )}
                    </div>
                  )}

                  <MediaItem
                    type={item.type}
                    urlKey={item.urlKey}
                    id={item.id}
                    handleDeleteSubsection={handleDeleteSubsection}
                    user={user}
                    group={group}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Subsection;
