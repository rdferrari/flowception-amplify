import React, { useState } from "react";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { createSection } from "../../graphql/mutations";
import { useInput } from "../auth/useInput";

function CreateSection() {
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput(null);
  const { value: intro, bind: bindIntro, reset: resetIntro } = useInput(null);
  const { value: body, bind: bindBody, reset: resetBody } = useInput(null);
  const [url, setUrl] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async evt => {
    evt.preventDefault();
    // alert(`Submitting ${title} ${intro} ${body}`);

    const input = {
      title,
      intro,
      body,
      url,
      ownerUsername: Auth.user.username,
      createdAt: Date.now()
    };

    const result = await API.graphql(
      graphqlOperation(createSection, {
        input
      })
    );
    console.info(`Created section: id ${result.data.createSection.id}`);

    resetTitle();
    resetIntro();
    resetBody();
    setUrl(null);
  };

  const handleUploadFile = async event => {
    event.preventDefault();
    const file = event.target.files[0];

    const randomExtension = Math.floor(Math.random() * 90000) + 10000;

    const name = randomExtension + file.name;

    Storage.put(name, file).then(() => {
      setUrl(name);
    });
  };

  const handleDeleteImage = async imageUrl => {
    Storage.remove(imageUrl).then(() => {
      setUrl(null);
    });
  };

  if (showForm === false) {
    return (
      <button
        className="primary-button button-dark"
        onClick={() => setShowForm(true)}
      >
        Add new section
      </button>
    );
  } else {
    return (
      <div>
        {url ? (
          <div>
            <S3Image className="section-card-image" imgKey={url} />
            <button
              className="primary-button button-transparent"
              onClick={() => handleDeleteImage(url)}
            >
              Delete image
            </button>
          </div>
        ) : (
          <div className="upload-btn-wrapper">
            <input type="file" onChange={handleUploadFile} className="myfile" />
            <img className="btn" src="/images/UploadBt.svg" />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>
            <input
              placeholder="Section title"
              className="input-light"
              type="text"
              {...bindTitle}
            />
          </label>
          <label>
            <textarea
              rows="6"
              cols="60"
              placeholder="Section introduction"
              className="input-light"
              type="text"
              {...bindIntro}
            />
          </label>
          <label>
            <textarea
              rows="6"
              cols="60"
              placeholder="Section body text"
              className="input-light"
              type="text"
              {...bindBody}
            />
          </label>
          <input
            className="primary-button button-dark"
            type="submit"
            value="Create section"
          />
        </form>

        <button
          className="primary-button button-transparent"
          onClick={() => setShowForm(false)}
        >
          Close form
        </button>
      </div>
    );
  }
}

export default CreateSection;
