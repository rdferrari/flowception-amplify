import React, { useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createSection } from "../../graphql/mutations";
import useForm from "../form/useForm";
import validate from "../form/sectionFormValidation";
import Upload from "../Upload";

const INIT_VALUES = {
  title: "",
  intro: "",
  body: "",
};

function CreateSection({ sections, setShowCreateSection }) {
  const [urlKey, setUrlKey] = useState(null);
  const [urlPath, setUrlPath] = useState(null);

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

    setUrlKey(null);
    setUrlPath(null);
    setShowCreateSection(false);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    INIT_VALUES,
    handleSubmitApi,
    validate
  );

  return (
    <div className="section-create-container">
      <Upload
        setUrlKey={setUrlKey}
        setUrlPath={setUrlPath}
        urlPath={urlPath}
        urlKey={urlKey}
      />

      <form onSubmit={handleSubmit} noValidate>
        {errors.title && <p className="input-error">* {errors.title}</p>}
        <textarea
          rows="2"
          cols="60"
          placeholder="Section title"
          className="input-light section-card-text-title"
          type="text"
          name="title"
          onChange={handleChange}
          value={values.title || ""}
          required
        />
        {errors.intro && <p className="input-error">* {errors.intro}</p>}
        <textarea
          rows="6"
          cols="60"
          placeholder="Section introduction"
          className="input-light section-card-text"
          type="text"
          name="intro"
          onChange={handleChange}
          value={values.intro || ""}
          required
        />

        {errors.body && <p className="input-error">* {errors.body}</p>}
        <textarea
          rows="6"
          cols="60"
          placeholder="Section body text"
          className="input-light section-card-text"
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
            onClick={() => setShowCreateSection(false)}
          >
            Close form
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSection;
