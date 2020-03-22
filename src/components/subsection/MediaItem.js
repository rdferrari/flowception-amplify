import React from "react";
import { S3Image } from "aws-amplify-react";

function MediaItem({ type, url, id, handleDeleteSubsection }) {
  return (
    <div className="section-detail-text-container">
      {type === "IMAGE" && (
        <div>
          <S3Image className="section-card-image" imgKey={url} />
          <p onClick={() => handleDeleteSubsection(id)}>delete</p>
        </div>
      )}

      {type === "IMAGE_360" && (
        <div>
          <p>Image 360</p>
          <p onClick={() => handleDeleteSubsection(id)}>delete</p>
        </div>
      )}

      {type === "VIDEO" && (
        <div>
          <p>Video</p>
          <p onClick={() => handleDeleteSubsection(id)}>delete</p>
        </div>
      )}

      {type === "VIDEO_360" && (
        <div>
          <p>Video 360</p>
          <p onClick={() => handleDeleteSubsection(id)}>delete</p>
        </div>
      )}
    </div>
  );
}

export default MediaItem;
