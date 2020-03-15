import React, { useState } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { updateSection } from "../../graphql/mutations";
import { useInput } from "../auth/useInput";

function EditSection({
  sectionId,
  iniTitle,
  iniIntro,
  iniBody,
  iniUrl,
  getData,
  setEditSection
}) {
  const { value: title, bind: bindTitle } = useInput(iniTitle);
  const { value: intro, bind: bindIntro } = useInput(iniIntro);
  const { value: body, bind: bindBody } = useInput(iniBody);
  const [url, setUrl] = useState(iniUrl);

  const handleSubmit = async evt => {
    evt.preventDefault();
    // alert(`Submitting ${title} ${intro} ${body}`);

    const input = {
      id: sectionId,
      title,
      intro,
      body,
      url,
      updatedAt: Date.now()
    };

    const result = await API.graphql(
      graphqlOperation(updateSection, {
        input
      })
    );
    getData();
    setEditSection(false);
    console.info(`Updated section: id ${result.data.updateSection.id}`);
  };

  const handleUploadFile = async event => {
    event.preventDefault();
    const file = event.target.files[0];

    const randomExtension = Math.floor(Math.random() * 90000) + 10000;

    const name = randomExtension + file.name;

    Storage.put(name, file).then(() => {
      setUrl(name);
    });
  };

  const handleDeleteImage = async imageUrl => {
    Storage.remove(imageUrl).then(() => {
      setUrl(null);
    });
  };

  return (
    <div>
      {url ? (
        <div>
          <S3Image imgKey={url} />
          <p onClick={() => handleDeleteImage(url)}>Delete image</p>
        </div>
      ) : (
        <input type="file" onChange={handleUploadFile} />
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" {...bindTitle} />
        </label>
        <label>
          Intro:
          <input type="text" {...bindIntro} />
        </label>
        <label>
          Body:
          <input type="text" {...bindBody} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default EditSection;
