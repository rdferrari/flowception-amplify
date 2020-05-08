import React from "react";
import { S3Image } from "aws-amplify-react";
import { Link } from "react-router-dom";

function ItemSection({ sections }) {
  function compare(a, b) {
    if (Number(a.order) < Number(b.order)) {
      return -1;
    }
    if (Number(a.order) > Number(b.order)) {
      return 1;
    }
    return 0;
  }

  const orderedSections = sections.sort(compare);
  return sections.map(
    (section) =>
      sections && (
        <div key={section.id} className="section-card">
          {section.urlKey && (
            <div>
              <S3Image className="section-card-image" imgKey={section.urlKey} />
            </div>
          )}
          <div className="section-text-container">
            <h2 className="section-title">{section.title}</h2>
            <p className="section-text">{section.intro}</p>
            <Link to={`/section/${section.id}`}>
              <p className="learn-more">View more</p>
            </Link>
            {console.log(section.title)}
          </div>
        </div>
      )
  );
}

export default ItemSection;
