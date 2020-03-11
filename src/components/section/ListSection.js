import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import ItemSection from "./ItemSection";

import { listSections } from "../../graphql/queries";
import { onCreateSection } from "../../graphql/subscriptions";
import { deleteSection } from "../../graphql/mutations";

function ListSection() {
  const [sections, updateSections] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateSection)
    ).subscribe({
      next: data => {
        const {
          value: {
            data: { onCreateSection }
          }
        } = data;
        const sectionData = [onCreateSection, ...sections];
        updateSections(sectionData);
      }
    });
    return () => subscription.unsubscribe();
  }, [sections]);

  const getData = async () => {
    try {
      const sectionData = await API.graphql(graphqlOperation(listSections));
      updateSections(sectionData.data.listSections.items);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  };

  const handleDeleteContent = async sectionId => {
    const input = { id: sectionId };
    await API.graphql(graphqlOperation(deleteSection, { input }));
    getData();
  };

  return (
    <div>
      <h2>Section List</h2>
      <ItemSection
        sections={sections}
        handleDeleteContent={handleDeleteContent}
      />
    </div>
  );
}

export default ListSection;
