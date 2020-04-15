import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { updateSubsection } from "../../graphql/mutations";
import MediaItem from "./MediaItem";

import useForm from "../form/useForm";
import validate from "../form/subsectionFormValidation";
import SubsectionForm from "./SubsectionForm";

function ItemsSubsection({
  title,
  text,
  id,
  user,
  group,
  handleDeleteSubsection,
  subsectionId,
  getPublicData,
  type,
  urlKey,
}) {
  const [editText, setEditText] = useState(false);

  const INIT_VALUES = {
    title: title,
    text: text,
  };

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

  const { values, errors, handleChange, handleSubmit } = useForm(
    INIT_VALUES,
    handleSubmitApi,
    validate,
    false
  );

  console.log(INIT_VALUES.title, values.title);

  const handleEditText = () => {
    setEditText(true);
  };

  return type === "TEXT" ? (
    <div>
      {title && text && editText === true ? (
        <SubsectionForm
          handleSubmit={handleSubmit}
          setShowForm={setEditText}
          errors={errors}
          values={values}
          handleChange={handleChange}
          buttonText="Save changes"
        />
      ) : (
        <div className="section-detail-text-container">
          <h2 className="section-title">{title}</h2>
          <p className="section-text">{text}</p>
          {user && group === "admin" && (
            <div className="section-button-flex">
              <button
                className="primary-button button-dark"
                onClick={() => handleEditText()}
              >
                Edit text
              </button>
              <button
                className="delete-section-button-dark"
                onClick={() => handleDeleteSubsection(id)}
              >
                Delete text
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <MediaItem
      type={type}
      urlKey={urlKey}
      id={id}
      handleDeleteSubsection={handleDeleteSubsection}
      user={user}
      group={group}
    />
  );
}

export default ItemsSubsection;
