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
  getPublicData,
  setEditSection
}) {
  const { value: title, bind: bindTitle } = useInput(iniTitle);
  const { value: intro, bind: bindIntro } = useInput(iniIntro);
  const { value: body, bind: bindBody } = useInput(iniBody);
  const [url, setUrl] = useState(iniUrl);
  const [uploading, setUploading] = useState(false);

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
    getPublicData();
    setEditSection(false);
    console.info(`Updated section: id ${result.data.updateSection.id}`);
  };

  const updateUrl = async name => {
    const input = {
      id: sectionId,
      url: name,
      updatedAt: Date.now()
    };

    const result = await API.graphql(
      graphqlOperation(updateSection, {
        input
      })
    );
    getPublicData();
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

    updateUrl(name);
    setUploading(false);
  };

  const handleDeleteImage = async imageUrl => {
    Storage.remove(imageUrl).then(() => {
      setUrl(null);
    });

    updateUrl(null);
    setUploading(false);
  };

  return (
    <div>
      {url ? (
        <div>
          <S3Image className="section-card-image" imgKey={url} />
          <button
            className="primary-button button-transparent"
            onClick={() => handleDeleteImage(url)}
          >
            Delete image
          </button>
        </div>
      ) : (
        <div className="upload-btn-wrapper">
          <input
            onClick={() => setUploading(true)}
            type="file"
            onChange={handleUploadFile}
            className="myfile"
          />
          {uploading === false ? (
            <img className="btn" src="/images/UploadBt.svg" />
          ) : (
            <img className="btn" src="/images/Uploading.svg" />
          )}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Section title"
          className="input-light"
          type="text"
          {...bindTitle}
        />

        <textarea
          rows="6"
          cols="60"
          placeholder="Section introduction"
          className="input-light"
          type="text"
          {...bindIntro}
        />

        <textarea
          rows="6"
          cols="60"
          placeholder="Section body text"
          className="input-light"
          type="text"
          {...bindBody}
        />

        <input
          className="primary-button button-dark"
          type="submit"
          value="Edit section"
        />
      </form>
      <button
        className="primary-button button-transparent"
        onClick={() => setEditSection(false)}
      >
        Close form
      </button>
    </div>
  );
}

export default EditSection;
