import React from "react";
import { useLocation } from "react-router-dom";
// import { S3Image } from "aws-amplify-react";
// import { Link } from "react-router-dom";

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
              className="section-drag-container"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <p className="section-drag-drop-title">{section.title}</p>
              <img
                className="section-drag-drop-icon"
                src="/images/dragDrop.svg"
                alt={section.title}
              />
            </div>
          )}
        </Draggable>
      )
  );
}

export default ItemSectionDraggable;
