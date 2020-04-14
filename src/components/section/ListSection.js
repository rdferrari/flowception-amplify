import React from "react";
import ItemSection from "./ItemSection";
import ItemSectionDraggable from "./ItemSectionDraggable";

function ListSection({ user, sections, isDraggable }) {
  return (
    <div>
      {isDraggable === false ? (
        <div className="section-list-container">
          <ItemSection sections={sections} user={user} />
        </div>
      ) : (
        <ItemSectionDraggable sections={sections} user={user} />
      )}
    </div>
  );
}

export default ListSection;
