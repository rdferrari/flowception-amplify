import React from "react";
import Upload from "../Upload";

const MediaType = ({
  mediaType,
  type,
  handleSubmit,
  setUrlKey,
  setUrlPath,
  urlPath,
  urlKey,
  setShowForm,
  errors,
  values,
  handleChange,
}) => {
  return (
    mediaType === type && (
      <div className="upload-btn-wrapper">
        <Upload
          setUrlKey={setUrlKey}
          setUrlPath={setUrlPath}
          urlPath={urlPath}
          urlKey={urlKey}
        />

        {console.log(urlKey, urlPath)}

        <form onSubmit={handleSubmit} noValidate>
          {errors.title && <p className="input-error">* {errors.title}</p>}
          <textarea
            rows="2"
            cols="60"
            placeholder="Content title"
            className="input-light section-text"
            type="text"
            name="title"
            onChange={handleChange}
            value={values.title || ""}
            required
          />

          <div className="section-button-flex">
            {urlKey && (
              <button className="primary-button button-dark" type="submit">
                Confirm add content
              </button>
            )}
            <button
              className="primary-button button-transparent-light"
              onClick={() => setShowForm(false)}
            >
              Close form
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default MediaType;
