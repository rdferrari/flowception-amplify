import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";

import { onCreateSubsection } from "../../graphql/subscriptions";
import { getSection } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import EditSection from "../section/EditSection";
import EditSubsection from "./EditSubsection";
import { UserContext } from "../../App";
import DetailSection from "../section/DetailSection";
import CreateSubsection from "./CreateSubsection";
import { deleteSubsection, deleteSection } from "../../graphql/mutations";

function Subsection(props) {
  let { id } = useParams();
  const [subsections, setSubsections] = useState(null);
  const [idDelete, setIdDelete] = useState(null);
  const [title, setTitle] = useState(null);
  const [intro, setIntro] = useState(null);
  const [body, setBody] = useState(null);
  const [url, setUrl] = useState(null);
  const [editSection, setEditSection] = useState(false);
  const [editText, setEditText] = useState(false);

  useEffect(() => {
    getPublicData();
  }, []);

  const getPublicData = async () => {
    try {
      const sectionData = await API.graphql({
        query: getSection,
        variables: { id },
        authMode: "API_KEY"
      });

      setSubsections(sectionData.data.getSection.subsections.items);
      setIdDelete(sectionData.data.getSection.id);
      setTitle(sectionData.data.getSection.title);
      setIntro(sectionData.data.getSection.intro);
      setBody(sectionData.data.getSection.body);
      setUrl(sectionData.data.getSection.url);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  };

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateSubsection)
    ).subscribe({
      next: data => {
        const {
          value: {
            data: { onCreateSubsection }
          }
        } = data;
        const subsectionData = [onCreateSubsection, ...subsections];
        setSubsections(subsectionData);
      }
    });
    return () => subscription.unsubscribe();
  }, [subsections]);

  const handleDeleteSubsection = async (subsectionId, url) => {
    const input = { id: subsectionId };
    await API.graphql(graphqlOperation(deleteSubsection, { input }));

    if (url) {
      handleDeleteImage(url);
    }

    getPublicData();
  };

  const handleDeleteImage = async imageUrl => {
    Storage.remove(imageUrl);
  };

  const handleDeleteSection = async (sectionId, url) => {
    console.log(subsections);
    subsections.map(subsection =>
      handleDeleteSubsection(subsection.id, subsection.url)
    );

    const input = { id: sectionId };
    await API.graphql(graphqlOperation(deleteSection, { input }));

    if (url) {
      handleDeleteImage(url);
    }

    props.history.push("/");
  };

  return (
    <UserContext.Consumer>
      {({ user, group }) => (
        <div>
          {editSection === false ? (
            <div>
              <DetailSection
                url={url}
                title={title}
                intro={intro}
                body={body}
                user={user}
                group={group}
                setEditSection={setEditSection}
                handleDeleteSection={handleDeleteSection}
                idDelete={idDelete}
              />
            </div>
          ) : (
            <div>
              {title && intro && body && user && group === "admin" ? (
                <div>
                  <h2>Edit Section</h2>
                  <EditSection
                    sectionId={id}
                    iniTitle={title}
                    iniIntro={intro}
                    iniBody={body}
                    iniUrl={url}
                    getPublicData={getPublicData}
                    setEditSection={setEditSection}
                  />
                </div>
              ) : null}
            </div>
          )}

          {user && group === "admin" ? (
            <CreateSubsection
              sectionId={id}
              getPublicData={getPublicData}
              subsections={subsections}
            />
          ) : null}

          {subsections
            ? subsections.map(item => (
                <div key={item.id}>
                  {item.type === "TEXT" ? (
                    <div>
                      {editText === false ? (
                        <div className="section-sub-textType-container">
                          <h2>{item.title}</h2>
                          <p>{item.text}</p>{" "}
                          {user && group === "admin" ? (
                            <div>
                              <button
                                className="primary-button button-dark"
                                onClick={() => setEditText(true)}
                              >
                                Edit text
                              </button>
                              <button
                                className="delete-section-button"
                                onClick={() => handleDeleteSubsection(item.id)}
                              >
                                Delete text
                              </button>
                            </div>
                          ) : null}
                        </div>
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
                  ) : null}
                  {item.type === "IMAGE" ? (
                    <div>
                      {item.url ? (
                        <S3Image
                          className="section-card-image"
                          imgKey={item.url}
                        />
                      ) : null}
                      {user && group === "admin" ? (
                        <button
                          className="delete-section-button"
                          onClick={() =>
                            handleDeleteSubsection(item.id, item.url)
                          }
                        >
                          Delete image
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                  {item.type === "VIDEO" ? (
                    <div>
                      <p>Item type: {item.type}</p>
                      <p>Video {item.url}</p>
                      <p onClick={() => handleDeleteSubsection(item.id)}>
                        delete
                      </p>
                    </div>
                  ) : null}
                  {item.type === "IMAGE_360" ? (
                    <div>
                      <p>Item type: {item.type}</p>
                      <p>360 image {item.url}</p>
                      <p onClick={() => handleDeleteSubsection(item.id)}>
                        delete
                      </p>
                    </div>
                  ) : null}
                  {item.type === "VIDEO_360" ? (
                    <div>
                      <p>Item type: {item.type}</p>
                      <p>360 video {item.url}</p>
                      <p onClick={() => handleDeleteSubsection(item.id)}>
                        delete
                      </p>
                    </div>
                  ) : null}
                </div>
              ))
            : null}
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Subsection;
