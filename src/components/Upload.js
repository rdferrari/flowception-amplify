import React, { useState } from "react";
import { Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";

const Upload = ({ setUrlKey, setUrlPath, urlPath, urlKey, updateUrl }) => {
  const [uploading, setUploading] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState("");
  const [progressTotal, setProgressTotal] = useState("");

  const handleUploadFile = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    const randomExtension = Math.floor(Math.random() * 90000) + 10000;

    const name = randomExtension + file.name;

    setUploading(true);

    Storage.put(name, file, {
      progressCallback(progress) {
        setProgressLoaded(progress.loaded);
        setProgressTotal(progress.total);
      },
    }).then(() => {
      setUrlKey(name);
      setUploading(false);
      Storage.get(name)
        .then((result) => setUrlPath(result))
        .catch((err) => console.log(err));

      if (updateUrl) {
        updateUrl(name, urlPath);
      }
    });
  };

  const handleDeleteImage = async (imageUrl) => {
    Storage.remove(imageUrl).then(() => {
      setUrlKey(null);
    });
  };

  return (
    <div>
      {urlKey ? (
        <div>
          <S3Image className="section-uploaded-image" imgKey={urlKey} />
          <button
            className="primary-button button-transparent"
            onClick={() => handleDeleteImage(urlKey)}
          >
            Delete image
          </button>
        </div>
      ) : (
        <div className="upload-btn-wrapper">
          <input type="file" onChange={handleUploadFile} className="myfile" />
          {uploading === false ? (
            <img className="btn" src="/images/UploadBt.svg" />
          ) : (
            <div>
              <img className="btn" src="/images/Uploading.svg" />
              <p>Uploading: {(progressLoaded / progressTotal) * 100} %</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Upload;
