import React from "react";
import { Draggable } from "react-beautiful-dnd";

const ListSubsectionDraggable = ({ subsections, compare }) => {
  return (
    subsections &&
    subsections.sort(compare).map((item, index) => (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided) => (
          <div
            className="section-drag-container"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            key={item.id}
          >
            <p className="section-drag-drop-title">{item.urlKey}</p>
            <p className="section-drag-drop-title">{item.title}</p>
            <img
              className="section-drag-drop-icon"
              src="/images/dragDrop.svg"
            />
          </div>
        )}
      </Draggable>
    ))
  );
};

export default ListSubsectionDraggable;
