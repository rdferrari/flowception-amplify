import React from "react";
import { S3Image } from "aws-amplify-react";
import { Link } from "react-router-dom";

function ItemSection({ sections }) {
  return sections.map(section => (
    <div key={section.id}>
      <S3Image imgKey={section.url} />
      <h3>{section.title}</h3>
      <p>{section.intro}</p>
      <p>{section.body}</p>
    </div>
  ));
}

export default ItemSection;
