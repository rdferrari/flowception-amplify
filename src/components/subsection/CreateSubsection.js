import React, { useState } from "react";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { createSubsection } from "../../graphql/mutations";

import useForm from "../form/useForm";
import validate from "../form/subsectionFormValidation";
import MediaType from "./MediaType";

const INIT_VALUES = {
  title: "",
  text: "",
};

function CreateSubsection({ sectionId, subsections }) {
  const [urlKey, setUrlKey] = useState(null);
  const [urlPath, setUrlPath] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmitApi = async () => {
    const input = {
      sectionId,
      type: mediaType,
      title: values.title,
      text: values.text,
      urlKey,
      urlPath,
      order: subsections.length,
      ownerUsername: Auth.user.username,
      createdAt: Date.now(),
    };

    const result = await API.graphql(
      graphqlOperation(createSubsection, {
        input,
      })
    );
    console.info(`Created section: id ${result.data.createSubsection.id}`);

    setUrlKey(null);
    setUrlPath(null);
    setMediaType(null);
    setShowForm(false);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    INIT_VALUES,
    handleSubmitApi,
    validate
  );

  const createSubsectionMedia = async (urlKey) => {
    const input = {
      sectionId,
      type: mediaType,
      urlKey,
      urlPath,
      text: null,
      title: null,
      order: subsections.length,
      ownerUsername: Auth.user.username,
      createdAt: Date.now(),
    };

    const result = await API.graphql(
      graphqlOperation(createSubsection, {
        input,
      })
    );
    console.info(`Created section: id ${result.data.createSubsection.id}`);
    setUrlKey(null);
    setUrlPath(null);
    setMediaType(null);
    setShowForm(false);
  };

  const handleTypeForm = (type) => {
    setMediaType(type);
    setShowForm(true);
  };

  return (
    <div className="section-sub-create">
      {mediaType === null && (
        <p className="section-text">Chose the media type to create</p>
      )}

      {showForm === false ? (
        <div className="section-sub-type-container">
          <img
            className="section-sub-create-icon"
            onClick={() => handleTypeForm("TEXT")}
            src="/images/createText.svg"
          />
          <img
            className="section-sub-create-icon"
            onClick={() => handleTypeForm("IMAGE")}
            src="/images/createImage.svg"
          />
          <img
            className="section-sub-create-icon"
            onClick={() => handleTypeForm("IMAGE_360")}
            src="/images/create360Image.svg"
          />
          <img
            className="section-sub-create-icon"
            onClick={() => handleTypeForm("VIDEO")}
            src="/images/createVideo.svg"
          />
          <img
            className="section-sub-create-icon"
            onClick={() => handleTypeForm("VIDEO_360")}
            src="/images/create360Video.svg"
          />
        </div>
      ) : (
        <div>
          <MediaType
            mediaType={mediaType}
            type="IMAGE"
            setShowForm={setShowForm}
            createSubsectionMedia={() => createSubsectionMedia(urlKey)}
            setUrlKey={setUrlKey}
            setUrlPath={setUrlPath}
            urlPath={urlPath}
            urlKey={urlKey}
          />
          <MediaType
            mediaType={mediaType}
            type="VIDEO"
            setShowForm={setShowForm}
            createSubsectionMedia={() => createSubsectionMedia(urlKey)}
            setUrlKey={setUrlKey}
            setUrlPath={setUrlPath}
            urlPath={urlPath}
            urlKey={urlKey}
          />
          <MediaType
            mediaType={mediaType}
            type="IMAGE_360"
            setShowForm={setShowForm}
            createSubsectionMedia={() => createSubsectionMedia(urlKey)}
            setUrlKey={setUrlKey}
            setUrlPath={setUrlPath}
            urlPath={urlPath}
            urlKey={urlKey}
          />
          <MediaType
            mediaType={mediaType}
            type="VIDEO_360"
            setShowForm={setShowForm}
            createSubsectionMedia={() => createSubsectionMedia(urlKey)}
            setUrlKey={setUrlKey}
            setUrlPath={setUrlPath}
            urlPath={urlPath}
            urlKey={urlKey}
          />

          <form onSubmit={handleSubmit} noValidate>
            {mediaType === "TEXT" && (
              <div>
                <input
                  placeholder="Subsection title"
                  className="input-light section-title"
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
                  placeholder="Subsection text"
                  className="input-light section-text"
                  type="text"
                  name="text"
                  onChange={handleChange}
                  value={values.text || ""}
                  required
                />

                <div className="section-button-flex">
                  <button className="primary-button button-dark" type="submit">
                    Add new subsection
                  </button>
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
  );
}

export default CreateSubsection;
