import React, { useState } from "react";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { createSection } from "../../graphql/mutations";
import { useInput } from "../auth/useInput";

function CreateSection({ username }) {
  const { value: title, bind: bindTitle, reset: resetTitle } = useInput(null);
  const { value: intro, bind: bindIntro, reset: resetIntro } = useInput(null);
  const { value: body, bind: bindBody, reset: resetBody } = useInput(null);
  const [url, setUrl] = useState(null);

  const handleSubmit = async evt => {
    evt.preventDefault();
    // alert(`Submitting ${title} ${intro} ${body}`);

    const input = {
      title,
      intro,
      body,
      url,
      ownerUsername: Auth.user.username,
      createdAt: Date.now()
    };

    const result = await API.graphql(
      graphqlOperation(createSection, {
        input
      })
    );
    console.info(`Created section: id ${result.data.createSection.id}`);

    resetTitle();
    resetIntro();
    resetBody();
  };

  const handleUploadFile = async event => {
    event.preventDefault();
    const file = event.target.files[0];
    const name = file.name;

    Storage.put(name, file).then(() => {
      setUrl(name);
    });
  };

  return (
    <div>
      <h2>Create Section</h2>
      <input type="file" onChange={handleUploadFile} />
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

export default CreateSection;
