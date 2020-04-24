import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { updateSection } from "../../graphql/mutations";
import Upload from "../Upload";

import useForm from "../form/useForm";
import validate from "../form/sectionFormValidation";
import SectionForm from "./SectionForm";

function EditSection({
  sectionId,
  iniTitle,
  iniIntro,
  iniBody,
  iniUrlKey,
  iniUrlPath,
  getPublicData,
  setEditSection,
}) {
  const [urlKey, setUrlKey] = useState(iniUrlKey);
  const [urlPath, setUrlPath] = useState(iniUrlPath);

  const INIT_VALUES = {
    title: iniTitle,
    intro: iniIntro,
    body: iniBody,
  };

  const handleSubmitApi = async () => {
    const input = {
      id: sectionId,
      title: values.title,
      intro: values.intro,
      body: values.body,
      urlKey,
      urlPath,
      updatedAt: Date.now(),
    };

    const result = await API.graphql(
      graphqlOperation(updateSection, {
        input,
      })
    );
    getPublicData();
    setEditSection(false);
    console.info(`Updated section: id ${result.data.updateSection.id}`);
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    INIT_VALUES,
    handleSubmitApi,
    validate
  );

  const updateUrl = async (name, path) => {
    const input = {
      id: sectionId,
      urlKey: name,
      urlPath: path,
      updatedAt: Date.now(),
    };

    const result = await API.graphql(
      graphqlOperation(updateSection, {
        input,
      })
    );
    getPublicData();
    console.info(`Updated section: id ${result.data.updateSection.id}`);
  };

  return (
    <div>
      <Upload
        setUrlKey={setUrlKey}
        setUrlPath={setUrlPath}
        urlPath={urlPath}
        urlKey={urlKey}
        updateUrl={updateUrl}
        fileType="image/*"
      />

      <SectionForm
        handleSubmit={handleSubmit}
        setShowForm={setEditSection}
        errors={errors}
        values={values}
        handleChange={handleChange}
        buttonText="Save changes"
      />
    </div>
  );
}

export default EditSection;
