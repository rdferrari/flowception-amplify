import React from "react";
import { Draggable } from "react-beautiful-dnd";

const ListSubsectionDraggable = ({ subsections, compare }) => {
  return (
    subsections &&
    subsections.sort(compare).map((item, index) => (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            key={item.id}
          >
            <div className="section-card">
              <p>{item.id}</p>
              <p>{item.order}</p>
            </div>
          </div>
        )}
      </Draggable>
    ))
  );
};

export default ListSubsectionDraggable;
