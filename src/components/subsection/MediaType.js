import React from "react";
import Upload from "../Upload";

const MediaType = ({
  mediaType,
  type,
  createSubsectionMedia,
  setUrlKey,
  setUrlPath,
  urlPath,
  urlKey,
  setShowForm,
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

        <div className="section-button-flex">
          {urlKey && (
            <button
              className="primary-button button-dark"
              onClick={createSubsectionMedia}
            >
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
      </div>
    )
  );
};

export default MediaType;
