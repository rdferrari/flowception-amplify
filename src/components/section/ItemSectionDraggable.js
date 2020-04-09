import React from "react";
import { useLocation } from "react-router-dom";
import { S3Image } from "aws-amplify-react";
import { Link } from "react-router-dom";

import { Draggable } from "react-beautiful-dnd";

function ItemSectionDraggable({ sections }) {
  const location = useLocation();
  const locationSectionId = location.pathname.slice(9);

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
    (section, index) =>
      locationSectionId !== section.id && (
        <Draggable key={section.id} draggableId={section.id} index={index}>
          {(provided) => (
            <div
              className="section-card"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Link to={`/section/${section.id}`}>
                {section.urlKey && (
                  <S3Image
                    className="section-card-image"
                    imgKey={section.urlKey}
                  />
                )}
                <div className="section-card-text-container">
                  <h2 className="section-card-text-title">{section.title}</h2>
                  <p className="section-card-text">{section.intro}</p>
                  {location.pathname !== "/sections" && <p>{section.body}</p>}
                </div>
              </Link>
            </div>
          )}
        </Draggable>
      )
  );
}

export default ItemSectionDraggable;
