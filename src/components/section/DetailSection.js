import React from "react";
import { S3Image } from "aws-amplify-react";

function DetailSection({
  url,
  title,
  intro,
  body,
  user,
  group,
  setEditSection
}) {
  return (
    <div>
      <h1>Section</h1>
      {url ? <S3Image imgKey={url} /> : null}
      <p>{title}</p>
      <p>{intro}</p>
      <p>{body}</p>
      {user && group === "admin" ? (
        <p onClick={() => setEditSection(true)}>Edit</p>
      ) : null}
    </div>
  );
}

export default DetailSection;
