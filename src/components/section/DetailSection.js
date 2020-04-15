import React, { useState } from "react";
import { S3Image } from "aws-amplify-react";

function DetailSection({
  urlKey,
  title,
  intro,
  body,
  user,
  group,
  setEditSection,
  handleDeleteSection,
  sectionId,
}) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  return (
    <div>
      {showDeleteConfirmation === false ? (
        <div>
          {urlKey && (
            <S3Image className="subsection-card-image" imgKey={urlKey} />
          )}
          <div>
            <div className="section-detail-text-container">
              <h2 className="section-title">{title}</h2>
              <p className="section-text">{intro}</p>
              <p className="section-text">{body}</p>
            </div>
            {user && group === "admin" && (
              <div>
                <div className="section-button-flex">
                  <button
                    className="primary-button button-dark"
                    onClick={() => setEditSection(true)}
                  >
                    Edit section
                  </button>
                  <button
                    className="delete-section-button-transparent"
                    onClick={() => setShowDeleteConfirmation(true)}
                  >
                    Delete section
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="section-title">You are deleting: {title}</h2>
          <p className="section-text">
            This action can´t be undone. Are you sure you want proceed?
          </p>
          <div className="section-button-flex">
            <button
              className="primary-button button-dark"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              No, go back
            </button>
            <button
              className="delete-section-button-dark"
              onClick={() => handleDeleteSection(sectionId, urlKey)}
            >
              Yes, delete content
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailSection;
