import React, { useState } from "react";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { createSection } from "../../graphql/mutations";
// import { useInput } from "../auth/useInput";
import useForm from "../form/useForm";
import validate from "../form/sectionFormValidation";

function CreateSection({ sections }) {
  // const { value: title, bind: bindTitle, reset: resetTitle } = useInput(null);
  // const { value: intro, bind: bindIntro, reset: resetIntro } = useInput(null);
  // const { value: body, bind: bindBody, reset: resetBody } = useInput(null);

  // function login() {
  //   console.log("No errors, submit callback called!");
  // }

  const [urlKey, setUrlKey] = useState(null);
  const [urlPath, setUrlPath] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmitApi = async () => {
    const input = {
      title: values.title,
      intro: values.intro,
      body: values.body,
      urlKey,
      urlPath,
      order: sections.length,
      ownerUsername: Auth.user.username,
      createdAt: Date.now(),
    };

    const result = await API.graphql(
      graphqlOperation(createSection, {
        input,
      })
    );
    console.info(`Created section: id ${result.data.createSection.id}`);

    // resetTitle();
    // resetIntro();
    // resetBody();
    setUrlKey(null);
    setUrlPath(null);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    handleSubmitApi,
    validate
  );

  const handleUploadFile = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    const randomExtension = Math.floor(Math.random() * 90000) + 10000;

    const name = randomExtension + file.name;

    setUploading(true);

    Storage.put(name, file).then(() => {
      setUrlKey(name);
      setUploading(false);
      Storage.get(name)
        .then((result) => setUrlPath(result))
        .catch((err) => console.log(err));
    });
  };

  const handleDeleteImage = async (imageUrl) => {
    Storage.remove(imageUrl).then(() => {
      setUrlKey(null);
    });
  };

  if (showForm === false) {
    return (
      <div className="section-create-container-detail">
        <button
          className="add-section-button button-dark"
          onClick={() => setShowForm(true)}
        >
          Add new section
        </button>
      </div>
    );
  } else {
    return (
      <div className="section-create-container-detail">
        {urlKey ? (
          <div>
            <S3Image className="section-card-image" imgKey={urlKey} />
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
              <img className="btn" src="/images/Uploading.svg" />
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <input
            placeholder="Section title"
            className="input-light"
            type="text"
            name="title"
            onChange={handleChange}
            value={values.title || ""}
            required
          />
          {errors.title && <p>{errors.title}</p>}

          <textarea
            rows="6"
            cols="60"
            placeholder="Section introduction"
            className="input-light"
            type="text"
            name="intro"
            onChange={handleChange}
            value={values.intro || ""}
            required
          />

          {errors.intro && <p>{errors.intro}</p>}

          <textarea
            rows="6"
            cols="60"
            placeholder="Section body text"
            className="input-light"
            type="text"
            name="body"
            onChange={handleChange}
            value={values.body || ""}
          />

          <div className="section-button-flex">
            <button className="primary-button button-dark" type="submit">
              Add new section
            </button>
            <button
              className="primary-button button-transparent"
              onClick={() => setShowForm(false)}
            >
              Close form
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateSection;
