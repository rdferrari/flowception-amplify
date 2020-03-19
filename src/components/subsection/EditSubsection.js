import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { updateSubsection } from "../../graphql/mutations";
import { useInput } from "../auth/useInput";

function EditSubsection({
  subsectionId,
  iniTitle,
  iniText,
  getPublicData,
  setEditText
}) {
  const { value: title, bind: bindTitle } = useInput(iniTitle);
  const { value: text, bind: bindText } = useInput(iniText);

  const handleSubmit = async evt => {
    evt.preventDefault();

    const input = {
      id: subsectionId,
      title,
      text,
      updatedAt: Date.now()
    };

    const result = await API.graphql(
      graphqlOperation(updateSubsection, {
        input
      })
    );
    console.log(`Subsectio id: ${result.data.updateSubsection.id} was edited`);
    setEditText(false);
    getPublicData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Subsection title"
          className="input-light"
          type="text"
          {...bindTitle}
        />
        <textarea
          rows="6"
          cols="60"
          placeholder="Subsection text"
          className="input-light"
          type="text"
          {...bindText}
        />
        <input
          className="primary-button button-dark"
          type="submit"
          value="Edit subsection"
        />
      </form>
      <button
        className="primary-button button-transparent"
        onClick={() => setEditText(false)}
      >
        Close form
      </button>
    </div>
  );
}

export default EditSubsection;
