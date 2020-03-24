import React, { useState } from "react";
import { Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { Player } from "video-react";

function MediaItem({ type, url, id, handleDeleteSubsection, user, group }) {
  const [mediaUrl, setMediaUrl] = useState(null);

  const getStorageUrl = url => {
    Storage.get(url)
      .then(result => setMediaUrl(result))
      .catch(err => console.log(err));
  };

  // console.log(getStorageUrl("22380vibrations-two.jpeg"), mediaUrl);

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
          <Player playsInline src="/videos/Baumann.mp4" />
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
