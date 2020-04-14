import React, { useState } from "react";
import ItemSection from "./ItemSection";
import ItemSectionDraggable from "./ItemSectionDraggable";

function ListSection({ user, sections, isDraggable }) {
  return (
    <div className="">
      {isDraggable === false ? (
        <ItemSection sections={sections} user={user} />
      ) : (
        <ItemSectionDraggable sections={sections} user={user} />
      )}
    </div>
  );
}

export default ListSection;
