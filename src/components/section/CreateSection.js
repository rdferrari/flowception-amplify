import React, { useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createSection } from "../../graphql/mutations";
import useForm from "../form/useForm";
import validate from "../form/sectionFormValidation";
import Upload from "../Upload";
import SectionForm from "./SectionForm";

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

      <SectionForm
        handleSubmit={handleSubmit}
        setShowForm={setShowCreateSection}
        errors={errors}
        values={values}
        handleChange={handleChange}
        buttonText="Create new section"
      />
    </div>
  );
}

export default CreateSection;
