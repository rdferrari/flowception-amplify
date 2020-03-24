import React, { useState } from "react";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { createSubsection } from "../../graphql/mutations";
import { useInput } from "../auth/useInput";

const MediaType = ({
  mediaType,
  type,
  uploading,
  setUploading,
  handleUploadFile,
  setShowForm
}) => {
  return (
    mediaType === type && (
      <div className="upload-btn-wrapper">
        <input type="file" onChange={handleUploadFile} className="myfile" />
        {uploading === false ? (
          <img className="btn" src="/images/UploadBt.svg" />
        ) : (
          <p>uploading</p>
        )}

        <button
          className="primary-button button-transparent-light"
          onClick={() => setShowForm(false)}
        >
          Close form
        </button>
      </div>
    )
  );
};

function CreateSubsection({ sectionId, subsections }) {
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
    resetTitle();
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

    setUploading(true);

    Storage.put(name, file).then(() => {
      setUrl(name);
      setUploading(false);
      setShowForm(false);
      createSubsectionMedia(name);
    });
  };

  const handleTypeForm = type => {
    setMediaType(type);
    setShowForm(true);
  };

  return (
    <div className="section-sub-create">
      <div className="section-detail-text-container">
        <h2 className="section-title">Create Subsection</h2>

        {showForm === false ? (
          <div className="section-sub-type-container">
            <img
              className="section-sub-create-icon"
              onClick={() => handleTypeForm("TEXT")}
              src="/images/subText.svg"
            />
            <img
              className="section-sub-create-icon"
              onClick={() => handleTypeForm("IMAGE")}
              src="/images/subImage.svg"
            />
            <img
              className="section-sub-create-icon"
              onClick={() => handleTypeForm("IMAGE_360")}
              src="/images/subImage360.svg"
            />
            <img
              className="section-sub-create-icon"
              onClick={() => handleTypeForm("VIDEO")}
              src="/images/subVideo.svg"
            />
            <img
              className="section-sub-create-icon"
              onClick={() => handleTypeForm("VIDEO_360")}
              src="/images/subVideo360.svg"
            />
          </div>
        ) : (
          <div>
            <MediaType
              mediaType={mediaType}
              type="IMAGE"
              setUploading={setUploading}
              handleUploadFile={handleUploadFile}
              uploading={uploading}
              setShowForm={setShowForm}
            />
            <MediaType
              mediaType={mediaType}
              type="VIDEO"
              setUploading={setUploading}
              handleUploadFile={handleUploadFile}
              uploading={uploading}
              setShowForm={setShowForm}
            />
            <MediaType
              mediaType={mediaType}
              type="IMAGE_360"
              setUploading={setUploading}
              handleUploadFile={handleUploadFile}
              uploading={uploading}
              setShowForm={setShowForm}
            />
            <MediaType
              mediaType={mediaType}
              type="VIDEO_360"
              setUploading={setUploading}
              handleUploadFile={handleUploadFile}
              uploading={uploading}
              setShowForm={setShowForm}
            />

            <form onSubmit={handleSubmit}>
              {mediaType === "TEXT" && (
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
                  <div className="section-button-flex">
                    <input
                      className="primary-button button-light"
                      type="submit"
                      value="Add new subsection"
                    />
                    <button
                      className="primary-button button-transparent-light"
                      onClick={() => setShowForm(false)}
                    >
                      Close form
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateSubsection;
