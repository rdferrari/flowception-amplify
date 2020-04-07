import React, { useState } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { updateSection } from "../../graphql/mutations";

import useForm from "../form/useForm";
import validate from "../form/sectionFormValidation";

function EditSection({
  sectionId,
  iniTitle,
  iniIntro,
  iniBody,
  iniUrlKey,
  iniUrlPath,
  getPublicData,
  setEditSection,
}) {
  const [uploading, setUploading] = useState(false);
  const [urlKey, setUrlKey] = useState(iniUrlKey);
  const [urlPath, setUrlPath] = useState(iniUrlPath);

  const INIT_VALUES = {
    title: iniTitle,
    intro: iniIntro,
    body: iniBody,
  };

  const handleSubmitApi = async () => {
    const input = {
      id: sectionId,
      title: values.title,
      intro: values.intro,
      body: values.body,
      urlKey,
      urlPath,
      updatedAt: Date.now(),
    };

    const result = await API.graphql(
      graphqlOperation(updateSection, {
        input,
      })
    );
    getPublicData();
    setEditSection(false);
    console.info(`Updated section: id ${result.data.updateSection.id}`);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    INIT_VALUES,
    handleSubmitApi,
    validate
  );

  const updateUrl = async (name, path) => {
    const input = {
      id: sectionId,
      urlKey: name,
      urlPath: path,
      updatedAt: Date.now(),
    };

    const result = await API.graphql(
      graphqlOperation(updateSection, {
        input,
      })
    );
    getPublicData();
    console.info(`Updated section: id ${result.data.updateSection.id}`);
  };

  const handleUploadFile = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    const randomExtension = Math.floor(Math.random() * 90000) + 10000;

    const name = randomExtension + file.name;

    setUploading(true);

    Storage.put(name, file).then(() => {
      setUrlKey(name);
      setUploading(false);
      Storage.get(name)
        .then((result) => setUrlPath(result))
        .catch((err) => console.log(err));
      updateUrl(name, urlPath);
    });
  };

  const handleDeleteImage = async (imageUrl) => {
    Storage.remove(imageUrl).then(() => {
      setUrlKey(null);
      updateUrl(null, null);
    });
  };

  return (
    <div>
      {urlKey ? (
        <div>
          <S3Image className="section-card-image" imgKey={urlKey} />
          <div className="section-detail-text-container">
            <button
              className="primary-button button-dark"
              onClick={() => handleDeleteImage(urlKey)}
            >
              Delete image
            </button>
          </div>
        </div>
      ) : (
        <div className="upload-btn-wrapper">
          <input type="file" onChange={handleUploadFile} className="myfile" />
          {uploading === false ? (
            <img className="btn" src="/images/UploadBt.svg" />
          ) : (
            <img className="btn" src="/images/Uploading.svg" />
          )}
        </div>
      )}
      <div className="section-detail-text-container">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Section title"
            className="input-light"
            type="text"
            name="title"
            onChange={handleChange}
            value={values.title || ""}
            required
          />
          {errors.title && <p>{errors.title}</p>}

          <textarea
            rows="6"
            cols="60"
            placeholder="Section introduction"
            className="input-light"
            type="text"
            name="intro"
            onChange={handleChange}
            value={values.intro || ""}
            required
          />

          {errors.intro && <p>{errors.intro}</p>}

          <textarea
            rows="6"
            cols="60"
            placeholder="Section body text"
            className="input-light"
            type="text"
            name="body"
            onChange={handleChange}
            value={values.body || ""}
          />

          <div className="section-button-flex">
            <input
              className="primary-button button-dark"
              type="submit"
              value="Save section"
            />
            <button
              className="primary-button button-transparent"
              onClick={() => setEditSection(false)}
            >
              Close form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditSection;
