import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { S3Image } from "aws-amplify-react";

import { onCreateSubsection } from "../../graphql/subscriptions";
import { getSection } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import EditSection from "../section/EditSection";
import { UserContext } from "../../App";
import DetailSection from "../section/DetailSection";
import CreateSubsection from "./CreateSubsection";

function Subsection() {
  let { id } = useParams();
  const [subsections, setSubsections] = useState(null);
  const [title, setTitle] = useState(null);
  const [intro, setIntro] = useState(null);
  const [body, setBody] = useState(null);
  const [url, setUrl] = useState(null);
  const [editSection, setEditSection] = useState(false);

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

  return (
    <UserContext.Consumer>
      {({ user, group }) => (
        <div>
          {console.log(subsections)}
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
                  {item.type === "TEXT" ? <p>{item.text}</p> : null}
                  {item.type === "IMAGE" ? <S3Image imgKey={item.url} /> : null}
                </div>
              ))
            : null}
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Subsection;
