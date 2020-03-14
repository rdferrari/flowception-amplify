import React, { useState } from "react";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { createSubsection } from "../../graphql/mutations";
import { useInput } from "../auth/useInput";

function CreateSubsection({ sectionId }) {
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

  const handleUploadFile = async event => {
    event.preventDefault();
    const file = event.target.files[0];
    const name = file.name;

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
          </label>
        ) : null}

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default CreateSubsection;
