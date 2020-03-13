import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";

import { getSection } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import EditSection from "../section/EditSection";
import { UserContext } from "../../App";
import DetailSection from "../section/DetailSection";

function Subsection({ user, username }) {
  let { id } = useParams();
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

      setTitle(sectionData.data.getSection.title);
      setIntro(sectionData.data.getSection.intro);
      setBody(sectionData.data.getSection.body);
      setUrl(sectionData.data.getSection.url);
    } catch (err) {
      console.log("error fetching data..", err);
    }
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
        </div>
      )}
    </UserContext.Consumer>
  );
}

export default Subsection;
