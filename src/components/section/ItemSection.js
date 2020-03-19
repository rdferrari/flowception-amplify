import React from "react";
import { S3Image } from "aws-amplify-react";
import { Link } from "react-router-dom";

function ItemSection({ sections }) {
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
    </div>
  ));
}

export default ItemSection;
