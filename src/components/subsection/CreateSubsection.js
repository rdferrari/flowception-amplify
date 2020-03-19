import React, { useState } from "react";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { createSubsection, deleteSubsection } from "../../graphql/mutations";
import { useInput } from "../auth/useInput";

function CreateSubsection({ sectionId, getData, subsections }) {
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput(null);
  const { value: text, bind: bindText, reset: resetText } = useInput(null);
  const [url, setUrl] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async evt => {
    evt.preventDefault();

    const input = {
      sectionId,
      type: mediaType,
      title,
      text,
      url,
      order: subsections.length,
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
    setShowForm(false);
  };

  const createSubsectionMedia = async name => {
    const input = {
      sectionId,
      type: mediaType,
      url: name,
      text: null,
      title: null,
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
    setShowForm(false);
  };

  const handleUploadFile = async event => {
    event.preventDefault();
    const file = event.target.files[0];

    const randomExtension = Math.floor(Math.random() * 90000) + 10000;

    const name = randomExtension + file.name;

    setUrl(name);

    Storage.put(name, file);

    createSubsectionMedia(name);

    setUploading(false);
    setShowForm(false);
  };

  const handleTypeForm = type => {
    setMediaType(type);
    setShowForm(true);
  };

  return (
    <div className="section-sub-container">
      <h2>Create Subsection</h2>

      {showForm === false ? (
        <div className="section-sub-type-container">
          <img
            className="section-sub-create-bt"
            onClick={() => handleTypeForm("TEXT")}
            src="/images/subText.svg"
          />
          <img
            onClick={() => handleTypeForm("IMAGE")}
            src="/images/subImage.svg"
          />
          <img
            onClick={() => handleTypeForm("IMAGE_360")}
            src="/images/subImage360.svg"
          />
          <img
            onClick={() => handleTypeForm("VIDEO")}
            src="/images/subVideo.svg"
          />
          <img
            onClick={() => handleTypeForm("VIDEO_360")}
            src="/images/subVideo360.svg"
          />
        </div>
      ) : (
        <div>
          {mediaType === "IMAGE" ||
          mediaType === "IMAGE_360" ||
          mediaType === "VIDEO" ||
          mediaType === "VIDEO_360" ? (
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
          ) : null}

          <form onSubmit={handleSubmit}>
            {mediaType === "TEXT" ? (
              <div>
                <input
                  placeholder="Subsection title"
                  className="input-light"
                  type="text"
                  {...bindTitle}
                />
                <textarea
                  rows="6"
                  cols="60"
                  placeholder="Subsection text"
                  className="input-light"
                  type="text"
                  {...bindText}
                />
                <input
                  className="primary-button button-light"
                  type="submit"
                  value="Add new subsection"
                />
              </div>
            ) : null}
          </form>
          <button
            className="primary-button button-transparent-light"
            onClick={() => setShowForm(false)}
          >
            Close form
          </button>
        </div>
      )}
    </div>
  );
}

export default CreateSubsection;
