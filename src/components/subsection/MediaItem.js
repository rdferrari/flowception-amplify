import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { Player } from "video-react";
import { Pannellum, PannellumVideo } from "pannellum-react";

function MediaItem({ type, urlKey, id, handleDeleteSubsection, user, group }) {
  const [urlPath, setUrlPath] = useState(null);

  useEffect(() => {
    Storage.get(urlKey)
      .then((result) => setUrlPath(result))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="subsection-media-item">
      {urlKey && type === "IMAGE" && (
        <div className="subsection-delete-container">
          <S3Image className="subsection-card-image" imgKey={urlKey} />
          {user && group === "admin" && (
            <button
              className="delete-section-button-dark"
              src="/images/deleteImage.svg"
              onClick={() => handleDeleteSubsection(id, urlKey)}
            >
              Delete Image
            </button>
          )}
        </div>
      )}

      {urlPath && type === "VIDEO" && (
        <div>
          <Player playsInline src={urlPath} />
          {user && group === "admin" && (
            <button
              className="primary-button button-dark"
              onClick={() => handleDeleteSubsection(id, urlKey)}
            >
              Delete video
            </button>
          )}
        </div>
      )}

      {urlPath && type === "IMAGE_360" && (
        <div>
          <Pannellum
            width="100%"
            height="400px"
            image={urlPath}
            mouseZoom={false}
            pitch={10}
            yaw={180}
            hfov={110}
            autoLoad
            onLoad={() => {
              console.log("panorama loaded");
            }}
          ></Pannellum>
          {user && group === "admin" && (
            <button
              className="primary-button button-dark"
              onClick={() => handleDeleteSubsection(id, urlKey)}
            >
              Delete 360 image
            </button>
          )}
        </div>
      )}

      {urlPath && type === "VIDEO_360" && (
        <div>
          <PannellumVideo
            video={urlPath}
            mouseZoom={false}
            controls={true}
            autoplay={false}
            width="100%"
            height="400px"
            pitch={10}
            yaw={180}
            hfov={140}
            minHfov={50}
            maxHfov={180}
          ></PannellumVideo>
          {user && group === "admin" && (
            <button
              className="primary-button button-dark"
              onClick={() => handleDeleteSubsection(id, urlKey)}
            >
              Delete 360 video
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MediaItem;
