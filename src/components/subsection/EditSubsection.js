import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { updateSubsection } from "../../graphql/mutations";
import { useInput } from "../auth/useInput";

function EditSubsection({ subsectionId, iniText, getData, setEditText }) {
  const { value: text, bind: bindText } = useInput(iniText);

  const handleSubmit = async evt => {
    evt.preventDefault();

    const input = {
      id: subsectionId,
      text,
      updatedAt: Date.now()
    };

    const result = await API.graphql(
      graphqlOperation(updateSubsection, {
        input
      })
    );
    getData();
    setEditText(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Text:
          <input type="text" {...bindText} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default EditSubsection;
