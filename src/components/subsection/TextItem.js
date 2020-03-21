import React from "react";

function TextItem({
  title,
  text,
  id,
  user,
  group,
  setEditText,
  handleDeleteSubsection
}) {
  return (
    <div className="section-sub-textType-container">
      <h2>{title}</h2>
      <p>{text}</p>
      {user && group === "admin" && (
        <div>
          <button
            className="primary-button button-dark"
            onClick={() => setEditText(true)}
          >
            Edit text
          </button>
          <button
            className="delete-section-button"
            onClick={() => handleDeleteSubsection(id)}
          >
            Delete text
          </button>
        </div>
      )}
    </div>
  );
}

export default TextItem;
