import React, { useEffect, useState } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { Link } from "react-router-dom";
import ItemSection from "./ItemSection";

import { listSections } from "../../graphql/queries";

function ListSection() {
  const [sections, updateSections] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const sectionData = await API.graphql(graphqlOperation(listSections));
      updateSections(sectionData.data.listSections.items);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  }

  return (
    <div>
      <h2>Section List</h2>
      <ItemSection sections={sections} />
    </div>
  );
}

export default ListSection;
