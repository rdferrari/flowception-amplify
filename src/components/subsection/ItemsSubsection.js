import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { updateSubsection } from "../../graphql/mutations";
import { Draggable } from "react-beautiful-dnd";
import MediaItem from "./MediaItem";

import useForm from "../form/useForm";
import validate from "../form/subsectionFormValidation";

function ItemsSubsection({
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
  type,
  urlKey,
  index,
  isDraggable,
}) {
  const [editText, setEditText] = useState(false);

  const INIT_VALUES = {
    title: iniTitle,
    text: iniText,
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
    validate
  );

  const TextItemEdit = () => {
    if (editText === true) {
      return (
        <div>
          <form onSubmit={handleSubmit} noValidate>
            <input
              placeholder="Subsection title"
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
              name="text"
              onChange={handleChange}
              value={values.text || ""}
              required
            />

            {errors.text && <p>{errors.text}</p>}
            <div className="section-button-flex">
              <button className="primary-button button-dark" type="submit">
                Save subsection
              </button>
              <button
                className="primary-button button-transparent"
                onClick={() => setEditText(false)}
              >
                Close form
              </button>
            </div>
          </form>
        </div>
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
  };

  if (isDraggable === true) {
    return (
      <Draggable key={id} draggableId={id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <p>{id}</p>
            </div>

            {/*  {type === "TEXT" ? (
              <TextItemEdit />
            ) : (
              <MediaItem
                type={type}
                urlKey={urlKey}
                id={id}
                handleDeleteSubsection={handleDeleteSubsection}
                user={user}
                group={group}
              />
            )} */}
          </div>
        )}
      </Draggable>
    );
  } else {
    return type === "TEXT" ? (
      <TextItemEdit />
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
}

export default ItemsSubsection;
