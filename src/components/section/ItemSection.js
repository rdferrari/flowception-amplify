import React from "react";
// import { API, graphqlOperation } from "aws-amplify";
// import { deleteSection } from "../../graphql/mutations";
import { S3Image } from "aws-amplify-react";
import { Link } from "react-router-dom";

function ItemSection({ sections, handleDeleteContent }) {
  return sections.map(section => (
    <div key={section.id}>
      <Link to={`/section/${section.id}`}>
        {section.url ? <S3Image imgKey={section.url} /> : null}
        <h3>{section.title}</h3>
        <p>{section.intro}</p>
        <p>{section.body}</p>
      </Link>
      <p onClick={() => handleDeleteContent(section.id)}>delete section</p>
    </div>
  ));
}

export default ItemSection;
