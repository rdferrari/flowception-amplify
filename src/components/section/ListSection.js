import React, { useEffect, useState } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import ItemSection from "./ItemSection";

import { listSections } from "../../graphql/queries";
import { onCreateSection } from "../../graphql/subscriptions";
import { deleteSection } from "../../graphql/mutations";

function ListSection({ user, username }) {
  const [sections, updateSections] = useState([]);

  useEffect(() => {
    getPublicData();
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

  // const getData = async () => {
  //   try {
  //     const sectionData = await API.graphql(graphqlOperation(listSections));
  //     updateSections(sectionData.data.listSections.items);
  //   } catch (err) {
  //     console.log("error fetching data..", err);
  //   }
  // };

  const getPublicData = async () => {
    const sectionData = await API.graphql({
      query: listSections,
      variables: {},
      authMode: "API_KEY"
    });
    updateSections(sectionData.data.listSections.items);
  };

  const handleDeleteContent = async sectionId => {
    const input = { id: sectionId };
    await API.graphql(graphqlOperation(deleteSection, { input }));
    getPublicData();
  };

  return (
    <div>
      <h2>Section List</h2>
      <ItemSection
        sections={sections}
        handleDeleteContent={handleDeleteContent}
        user={user}
        username={username}
      />
    </div>
  );
}

export default ListSection;
