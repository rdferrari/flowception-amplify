import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { updateSection } from "../../graphql/mutations";
import { useInput } from "../auth/useInput";

function EditSection({ sectionId, iniTitle, iniIntro, iniBody, getData }) {
  const { value: title, bind: bindTitle } = useInput(iniTitle);
  const { value: intro, bind: bindIntro } = useInput(iniIntro);
  const { value: body, bind: bindBody } = useInput(iniBody);

  const handleSubmit = async evt => {
    evt.preventDefault();
    // alert(`Submitting ${title} ${intro} ${body}`);

    const input = {
      id: sectionId,
      title,
      intro,
      body,
      createdAt: Date.now()
    };

    const result = await API.graphql(
      graphqlOperation(updateSection, {
        input
      })
    );
    getData();
    console.info(`Updated section: id ${result.data.updateSection.id}`);
  };

  return (
    <div>
      <h2>Edit Section</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" {...bindTitle} />
        </label>
        <label>
          Intro:
          <input type="text" {...bindIntro} />
        </label>
        <label>
          Body:
          <input type="text" {...bindBody} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default EditSection;
