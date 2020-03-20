import React from "react";
import ItemSection from "./ItemSection";

function ListSection({ user, group, sections }) {
  return (
    <div className="section-desktop-list-scroll">
      <ItemSection sections={sections} user={user} group={group} />
    </div>
  );
}

export default ListSection;
