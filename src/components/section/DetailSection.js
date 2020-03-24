import React from "react";
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
  sectionId
}) {
  return (
    <div>
      {urlKey && <S3Image className="section-card-image" imgKey={urlKey} />}
      <div className="section-detail-text-container">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-text">{intro}</p>
          <p className="section-text">{body}</p>
          {user && group === "admin" && (
            <div className="section-button-flex">
              <button
                className="primary-button button-transparent"
                onClick={() => setEditSection(true)}
              >
                Edit section
              </button>
              <button
                className="delete-section-button"
                onClick={() => handleDeleteSection(sectionId, urlKey)}
              >
                Delete section
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailSection;
