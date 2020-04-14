import React from "react";

const Footer = ({
  createIcon,
  setShowCreate,
  reorderIcon,
  setIsDraggable,
  isDraggable,
  listIcon,
}) => {
  return (
    <div>
      <img
        className="section-admin-buttons"
        src={`/images/${createIcon}`}
        alt="Create new content"
        onClick={() => setShowCreate(true)}
      />
      {isDraggable === false ? (
        <img
          className="section-admin-buttons"
          src={`/images/${reorderIcon}`}
          alt="Reorder list"
          onClick={() => setIsDraggable(!isDraggable)}
        />
      ) : (
        <img
          className="section-admin-buttons"
          src={`/images/${listIcon}`}
          alt="Back to list"
          onClick={() => setIsDraggable(!isDraggable)}
        />
      )}
    </div>
  );
};

export default Footer;
