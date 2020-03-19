import React from "react";
import ItemSection from "./ItemSection";

function ListSection({ user, group, sections }) {
  return <ItemSection sections={sections} user={user} group={group} />;
}

export default ListSection;
