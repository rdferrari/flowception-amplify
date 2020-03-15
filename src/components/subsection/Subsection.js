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
import { deleteSubsection } from "../../graphql/mutations";

function Subsection() {
  let { id } = useParams();
  const [subsections, setSubsections] = useState(null);
  const [title, setTitle] = useState(null);
  const [intro, setIntro] = useState(null);
  const [body, setBody] = useState(null);
  const [url, setUrl] = useState(null);
  const [editSection, setEditSection] = useState(false);
  const [editText, setEditText] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const sectionData = await API.graphql({
        query: getSection,
        variables: { id },
        authMode: "API_KEY"
      });

      setSubsections(sectionData.data.getSection.subsections.items);
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

    getData();
  };

  const handleDeleteImage = async imageUrl => {
    Storage.remove(imageUrl);
  };

  return (
    <UserContext.Consumer>
      {({ user, group }) => (
        <div>
          {editSection === false ? (
            <DetailSection
              url={url}
              title={title}
              intro={intro}
              body={body}
              user={user}
              group={group}
              setEditSection={setEditSection}
            />
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
                    getData={getData}
                    setEditSection={setEditSection}
                  />
                </div>
              ) : null}
            </div>
          )}
          <h3>Subsection</h3>

          {user && group === "admin" ? (
            <CreateSubsection sectionId={id} />
          ) : null}

          {subsections
            ? subsections.map(item => (
                <div key={item.id}>
                  <p>Item type: {item.type}</p>
                  {item.type === "TEXT" ? (
                    <div>
                      {editText === false ? (
                        <div>
                          <p>{item.text}</p>{" "}
                          <p onClick={() => handleDeleteSubsection(item.id)}>
                            delete
                          </p>
                          <p onClick={() => setEditText(true)}>Edit</p>
                        </div>
                      ) : (
                        <EditSubsection
                          subsectionId={item.id}
                          iniText={item.text}
                          getData={getData}
                          setEditText={setEditText}
                        />
                      )}
                    </div>
                  ) : null}
                  {item.type === "IMAGE" ? (
                    <div>
                      <S3Image imgKey={item.url} />
                      <p
                        onClick={() =>
                          handleDeleteSubsection(item.id, item.url)
                        }
                      >
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
