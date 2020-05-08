import React, { useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createSubsection } from "../../graphql/mutations";

import useForm from "../form/useForm";
import validate from "../form/subsectionFormValidation";
import MediaType from "./MediaType";
import SubsectionForm from "./SubsectionForm";

const INIT_VALUES = {
  title: null,
  text: null,
};

function CreateSubsection({ sectionId, subsections, setShowCreateSubsection }) {
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

    //setUrlKey(null);
    //setUrlPath(null);
    //setMediaType(null);
    setShowForm(false);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    INIT_VALUES,
    handleSubmitApi,
    validate,
    true
  );

  const handleTypeForm = (type) => {
    setUrlKey(null);
    setUrlPath(null);
    setMediaType(type);
    setShowForm(true);
  };

  return (
    <div className="section-sub-create">
      {showForm === false ? (
        <div>
          <div>
            <p className="section-text">
              Chose a media type to create or
              <span
                className="text-button"
                onClick={() => setShowCreateSubsection(false)}
              >
                {" "}
                go back
              </span>
            </p>
          </div>
          <div className="section-sub-type-container">
            <img
              className="section-sub-create-icon"
              onClick={() => handleTypeForm("TEXT")}
              src="/images/createText.svg"
              alt="Create text"
            />
            <img
              className="section-sub-create-icon"
              onClick={() => handleTypeForm("PDF")}
              src="/images/createPdf.svg"
              alt="Create pdf"
            />
            <img
              className="section-sub-create-icon"
              onClick={() => handleTypeForm("IMAGE")}
              src="/images/createImage.svg"
              alt="Create content"
            />
            <img
              className="section-sub-create-icon"
              onClick={() => handleTypeForm("IMAGE_360")}
              src="/images/create360Image.svg"
              alt="Create 360 content"
            />
            <img
              className="section-sub-create-icon"
              onClick={() => handleTypeForm("VIDEO")}
              src="/images/createVideo.svg"
              alt="Create video"
            />
            <img
              className="section-sub-create-icon"
              onClick={() => handleTypeForm("VIDEO_360")}
              src="/images/create360Video.svg"
              alt="Create 360 video"
            />
            <img
              className="section-sub-create-icon"
              onClick={() => handleTypeForm("AUDIO")}
              src="/images/createAudio.svg"
              alt="Create Audio"
            />
          </div>
        </div>
      ) : (
        <div>
          <MediaType
            handleSubmit={handleSubmit}
            setShowForm={setShowForm}
            errors={errors}
            values={values}
            handleChange={handleChange}
            mediaType={mediaType}
            type="IMAGE"
            setUrlKey={setUrlKey}
            setUrlPath={setUrlPath}
            urlPath={urlPath}
            urlKey={urlKey}
            fileType="image/*"
          />
          <MediaType
            handleSubmit={handleSubmit}
            setShowForm={setShowForm}
            errors={errors}
            values={values}
            handleChange={handleChange}
            mediaType={mediaType}
            type="AUDIO"
            setUrlKey={setUrlKey}
            setUrlPath={setUrlPath}
            urlPath={urlPath}
            urlKey={urlKey}
            fileType="audio/*"
          />
          <MediaType
            handleSubmit={handleSubmit}
            setShowForm={setShowForm}
            errors={errors}
            values={values}
            handleChange={handleChange}
            mediaType={mediaType}
            type="VIDEO"
            setUrlKey={setUrlKey}
            setUrlPath={setUrlPath}
            urlPath={urlPath}
            urlKey={urlKey}
            fileType="video/*"
          />
          <MediaType
            handleSubmit={handleSubmit}
            setShowForm={setShowForm}
            errors={errors}
            values={values}
            handleChange={handleChange}
            mediaType={mediaType}
            type="IMAGE_360"
            setUrlKey={setUrlKey}
            setUrlPath={setUrlPath}
            urlPath={urlPath}
            urlKey={urlKey}
            fileType="image/*"
          />
          <MediaType
            handleSubmit={handleSubmit}
            setShowForm={setShowForm}
            errors={errors}
            values={values}
            handleChange={handleChange}
            mediaType={mediaType}
            type="VIDEO_360"
            setUrlKey={setUrlKey}
            setUrlPath={setUrlPath}
            urlPath={urlPath}
            urlKey={urlKey}
            fileType="video/*"
          />

          <MediaType
            handleSubmit={handleSubmit}
            setShowForm={setShowForm}
            errors={errors}
            values={values}
            handleChange={handleChange}
            mediaType={mediaType}
            type="PDF"
            setUrlKey={setUrlKey}
            setUrlPath={setUrlPath}
            urlPath={urlPath}
            urlKey={urlKey}
            accept=".pdf"
          />

          {mediaType === "TEXT" && (
            <SubsectionForm
              handleSubmit={handleSubmit}
              setShowForm={setShowForm}
              errors={errors}
              values={values}
              handleChange={handleChange}
              buttonText="Create new content"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default CreateSubsection;
