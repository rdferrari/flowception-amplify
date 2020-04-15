import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { updateSubsection } from "../../graphql/mutations";

import useForm from "../form/useForm";
import validate from "../form/subsectionFormValidation";
import SubsectionForm from "./SubsectionForm";

function TextEdit({
  title,
  text,
  id,
  user,
  group,
  handleDeleteSubsection,
  subsectionId,
  iniTitle,
  iniText,
  getPublicData,
}) {
  const [editText, setEditText] = useState(false);

  const handleSubmitApi = async () => {
    const input = {
      id: subsectionId,
      title: values.title,
      text: values.text,
      updatedAt: Date.now(),
    };

    const result = await API.graphql(
      graphqlOperation(updateSubsection, {
        input,
      })
    );
    console.log(`Subsectio id: ${result.data.updateSubsection.id} was edited`);
    setEditText(false);
    getPublicData();
  };

  const INIT_VALUES = {
    title: title,
    text: text,
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    INIT_VALUES,
    handleSubmitApi,
    validate
  );

  if (editText === true) {
    return (
      <SubsectionForm
        handleSubmit={handleSubmit}
        setShowForm={setShowForm}
        errors={errors}
        values={values}
        handleChange={handleChange}
        buttonText="Save changes"
      />
    );
  } else {
    return (
      <div className="section-detail-text-container">
        <h2>{title}</h2>
        <p>{text}</p>
        {user && group === "admin" && (
          <div className="section-button-flex">
            <button
              className="primary-button button-dark"
              onClick={() => setEditText(true)}
            >
              Edit text
            </button>
            <button
              className="delete-section-button"
              onClick={() => handleDeleteSubsection(id)}
            >
              Delete text
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default TextEdit;
