import React from "react";
import { S3Image } from "aws-amplify-react";

function DetailSection({
  url,
  title,
  intro,
  body,
  user,
  group,
  setEditSection
}) {
  return (
    <div>
      {url ? <S3Image className="section-card-image" imgKey={url} /> : null}
      <div className="section-detail-text-container">
        <h2>{title}</h2>
        <p>{intro}</p>
        <p>{body}</p>
        {user && group === "admin" ? (
          <button
            className="primary-button button-transparent"
            onClick={() => setEditSection(true)}
          >
            Edit section
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DetailSection;
