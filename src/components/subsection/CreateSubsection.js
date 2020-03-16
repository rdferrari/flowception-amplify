import React, { useState } from "react";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { createSubsection, deleteSubsection } from "../../graphql/mutations";
import { useInput } from "../auth/useInput";

function CreateSubsection({ sectionId, getData }) {
  // const { value: type, bind: bindType, reset: resetType } = useInput(null);
  const { value: text, bind: bindText, reset: resetText } = useInput(null);
  const [url, setUrl] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  const handleSubmit = async evt => {
    evt.preventDefault();

    const input = {
      sectionId,
      type: mediaType,
      text,
      url,
      ownerUsername: Auth.user.username,
      createdAt: Date.now()
    };

    const result = await API.graphql(
      graphqlOperation(createSubsection, {
        input
      })
    );
    console.info(`Created section: id ${result.data.createSubsection.id}`);

    resetText();
    setUrl(null);
    setMediaType(null);
  };

  const createSubsectionMedia = async name => {
    const input = {
      sectionId,
      type: mediaType,
      url: name,
      text: null,
      ownerUsername: Auth.user.username,
      createdAt: Date.now()
    };

    const result = await API.graphql(
      graphqlOperation(createSubsection, {
        input
      })
    );
    console.info(`Created section: id ${result.data.createSubsection.id}`);
    resetText();
    setUrl(null);
    setMediaType(null);
  };

  const handleUploadFile = async event => {
    event.preventDefault();
    const file = event.target.files[0];

    const randomExtension = Math.floor(Math.random() * 90000) + 10000;

    const name = randomExtension + file.name;

    setUrl(name);

    Storage.put(name, file);

    createSubsectionMedia(name);
  };

  const handleDeleteImage = async imageUrl => {
    const input = { id: sectionId };
    await API.graphql(graphqlOperation(deleteSubsection, { input }));

    Storage.remove(imageUrl).then(() => {
      setUrl(null);
    });

    getData();
  };

  return (
    <div>
      <h2>Create Subsection</h2>

      <p onClick={() => setMediaType("TEXT")}>text</p>
      <p onClick={() => setMediaType("IMAGE")}>Image</p>
      <p onClick={() => setMediaType("IMAGE_360")}>Image 360</p>
      <p onClick={() => setMediaType("VIDEO")}>Video</p>
      <p onClick={() => setMediaType("VIDEO_360")}>Video 360</p>

      {mediaType === "IMAGE" ||
      mediaType === "IMAGE_360" ||
      mediaType === "VIDEO" ||
      mediaType === "VIDEO_360" ? (
        url ? (
          <div>
            <S3Image imgKey={url} />
            <p onClick={() => handleDeleteImage(url)}>Delete image</p>
          </div>
        ) : (
          <input type="file" onChange={handleUploadFile} />
        )
      ) : null}

      <form onSubmit={handleSubmit}>
        {mediaType === "TEXT" ? (
          <label>
            Text:
            <input type="text" {...bindText} />
            <input type="submit" value="Submit" />
          </label>
        ) : null}
      </form>
    </div>
  );
}

export default CreateSubsection;
