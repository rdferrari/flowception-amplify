import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { Player } from "video-react";
import { Pannellum, PannellumVideo } from "pannellum-react";
import ReactAudioPlayer from "react-audio-player";

function MediaItem({
  type,
  urlKey,
  id,
  handleDeleteSubsection,
  user,
  group,
  title,
}) {
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
              className="delete-section-button-transparent"
              onClick={() => handleDeleteSubsection(id, urlKey)}
            >
              Delete video
            </button>
          )}
        </div>
      )}

      {urlPath && type === "PDF" && (
        <div>
          <a href={urlPath}>
            <p className="section-text text-button">
              Download PDF | <span>{title}</span>
            </p>
          </a>
          {user && group === "admin" && (
            <button
              className="delete-section-button-transparent"
              onClick={() => handleDeleteSubsection(id, urlKey)}
            >
              Delete pdf
            </button>
          )}
        </div>
      )}

      {urlPath && type === "AUDIO" && (
        <div>
          <div>
            <ReactAudioPlayer src={urlPath} controls />
          </div>
          {user && group === "admin" && (
            <button
              className="delete-section-button-transparent"
              onClick={() => handleDeleteSubsection(id, urlKey)}
            >
              Delete audio
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
              className="delete-section-button-transparent"
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
              className="delete-section-button-transparent"
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
