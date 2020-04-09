import React, { useState } from "react";
import ItemSection from "./ItemSection";
import ItemSectionDraggable from "./ItemSectionDraggable";

function ListSection({ user, group, sections }) {
  const [isDraggable, setIsDraggable] = useState(false);
  return (
    <div className="section-desktop-list-scroll">
      <button onClick={() => setIsDraggable(!isDraggable)}>
        {isDraggable === true
          ? "Reorder List: active"
          : "Reorder List: NO active"}{" "}
      </button>
      {isDraggable === false ? (
        <ItemSection sections={sections} user={user} />
      ) : (
        <ItemSectionDraggable sections={sections} user={user} />
      )}
    </div>
  );
}

export default ListSection;
