import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { getSection } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import EditSection from "../section/EditSection";
import { UserContext } from "../../App";

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

      // const sectionData = await API.graphql(
      //   graphqlOperation(getSection, { id })
      // );
      setTitle(sectionData.data.getSection.title);
      setIntro(sectionData.data.getSection.intro);
      setBody(sectionData.data.getSection.body);
      setUrl(sectionData.data.getSection.url);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  };

  if (editSection === false) {
    return (
      <UserContext.Consumer>
        {({ user, group }) => (
          <div>
            <h1>Section</h1>
            {url ? <S3Image imgKey={url} /> : null}
            <p>{title}</p>
            <p>{intro}</p>
            <p>{body}</p>
            {user && group === "admin" ? (
              <p onClick={() => setEditSection(true)}>Edit</p>
            ) : null}
          </div>
        )}
      </UserContext.Consumer>
    );
  } else {
    return (
      <UserContext.Consumer>
        {({ user, group }) =>
          user && group === "admin" ? (
            <div>
              <h2>Edit Section</h2>
              {title && intro && body ? (
                <EditSection
                  sectionId={id}
                  iniTitle={title}
                  iniIntro={intro}
                  iniBody={body}
                  iniUrl={url}
                  getData={getData}
                  setEditSection={setEditSection}
                />
              ) : null}
            </div>
          ) : null
        }
      </UserContext.Consumer>
    );
  }
}

export default Subsection;
