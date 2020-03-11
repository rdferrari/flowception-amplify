import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { getSection } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import EditSection from "../section/EditSection";

function Subsection() {
  let { id } = useParams();
  const [title, setTitle] = useState(null);
  const [intro, setIntro] = useState(null);
  const [body, setBody] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const sectionData = await API.graphql(
        graphqlOperation(getSection, { id })
      );
      setTitle(sectionData.data.getSection.title);
      setIntro(sectionData.data.getSection.intro);
      setBody(sectionData.data.getSection.body);
      setUrl(sectionData.data.getSection.url);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  };

  return (
    <div>
      <h1>Section</h1>
      {url ? <S3Image imgKey={url} /> : null}
      <p>{title}</p>
      <p>{intro}</p>
      <p>{body}</p>
      {title && intro && body ? (
        <EditSection
          sectionId={id}
          iniTitle={title}
          iniIntro={intro}
          iniBody={body}
          getData={getData}
        />
      ) : null}
    </div>
  );
}

export default Subsection;
