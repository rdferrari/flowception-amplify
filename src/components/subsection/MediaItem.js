import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { Player } from "video-react";

function MediaItem({ type, urlKey, id, handleDeleteSubsection, user, group }) {
  const [urlPath, setUrlPath] = useState(null);

  Storage.get(urlKey)
    .then(result => setUrlPath(result))
    .catch(err => console.log(err));

  console.log(urlPath);
  return (
    <div className="section-detail-text-container">
      {urlKey && type === "IMAGE" && (
        <div>
          <S3Image className="section-card-image" imgKey={urlKey} />
          {user && group === "admin" && (
            <button
              className="primary-button button-dark"
              onClick={() => handleDeleteSubsection(id, urlKey)}
            >
              Delete image
            </button>
          )}
        </div>
      )}

      {urlPath && type === "VIDEO" && (
        <div>
          <Player playsInline src={urlPath} />
          <button
            className="primary-button button-dark"
            onClick={() => handleDeleteSubsection(id, urlKey)}
          >
            Delete video
          </button>
        </div>
      )}

      {urlKey && type === "IMAGE_360" && (
        <div>
          <p>Image 360</p>
          <button
            className="primary-button button-dark"
            onClick={() => handleDeleteSubsection(id, urlKey)}
          >
            Delete 360 image
          </button>
        </div>
      )}

      {urlKey && type === "VIDEO_360" && (
        <div>
          <p>Video 360</p>
          <button
            className="primary-button button-dark"
            onClick={() => handleDeleteSubsection(id, urlKey)}
          >
            Delete 360 video
          </button>
        </div>
      )}
    </div>
  );
}

export default MediaItem;
