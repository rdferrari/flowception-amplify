import React from "react";
import { S3Image } from "aws-amplify-react";

function MediaItem({ type, url, id, handleDeleteSubsection, user, group }) {
  return (
    <div className="section-detail-text-container">
      {url && type === "IMAGE" && (
        <div>
          <S3Image className="section-card-image" imgKey={url} />
          {user && group === "admin" && (
            <button
              className="primary-button button-dark"
              onClick={() => handleDeleteSubsection(id)}
            >
              Delete image
            </button>
          )}
        </div>
      )}

      {type === "IMAGE_360" && (
        <div>
          <p>Image 360</p>
          <button
            className="primary-button button-dark"
            onClick={() => handleDeleteSubsection(id)}
          >
            Delete 360 image
          </button>
        </div>
      )}

      {type === "VIDEO" && (
        <div>
          <p>Video</p>
          <button
            className="primary-button button-dark"
            onClick={() => handleDeleteSubsection(id)}
          >
            Delete video
          </button>
        </div>
      )}

      {type === "VIDEO_360" && (
        <div>
          <p>Video 360</p>
          <button
            className="primary-button button-dark"
            onClick={() => handleDeleteSubsection(id)}
          >
            Delete 360 video
          </button>
        </div>
      )}
    </div>
  );
}

export default MediaItem;
