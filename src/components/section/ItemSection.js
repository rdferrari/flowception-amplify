import React from "react";
import { S3Image } from "aws-amplify-react";
import { Link } from "react-router-dom";

function ItemSection({ sections }) {
  function compare(a, b) {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  }

  const orderedSections = sections.sort(compare);
  return orderedSections.map(
    (section) =>
      sections && (
        <div key={section.id} className="section-card">
          {section.urlKey && (
            <S3Image className="section-card-image" imgKey={section.urlKey} />
          )}
          <div>
            <h2 className="section-title">{section.title}</h2>
            <p className="section-text">{section.intro}</p>
            <Link to={`/section/${section.id}`}>
              <p className="learn-more">Learn more</p>
            </Link>
          </div>
        </div>
      )
  );
}

export default ItemSection;
