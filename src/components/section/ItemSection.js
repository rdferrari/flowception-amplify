import React from "react";
// import { API, graphqlOperation } from "aws-amplify";
// import { deleteSection } from "../../graphql/mutations";
import { S3Image } from "aws-amplify-react";
import { Link } from "react-router-dom";

function ItemSection({ sections, handleDeleteContent, user, group }) {
  return sections.map(section => (
    <div className="section-card" key={section.id}>
      <Link to={`/section/${section.id}`}>
        {section.url ? (
          <S3Image className="section-card-image" imgKey={section.url} />
        ) : null}
        <div className="section-card-text-container">
          <h2>{section.title}</h2>
          <p>{section.intro}</p>
        </div>
      </Link>
      {/* {user && group ? (
        <p onClick={() => handleDeleteContent(section.id, section.url)}>
          delete section
        </p>
      ) : null} */}
    </div>
  ));
}

export default ItemSection;
