import React, { useEffect, useState } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import ItemSection from "./ItemSection";

import { listSections } from "../../graphql/queries";
import { onCreateSection } from "../../graphql/subscriptions";
import { deleteSection } from "../../graphql/mutations";

function ListSection({ user, group }) {
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

  const getPublicData = async () => {
    const sectionData = await API.graphql({
      query: listSections,
      variables: {},
      authMode: "API_KEY"
    });
    updateSections(sectionData.data.listSections.items);
  };

  const handleDeleteImage = async imageUrl => {
    Storage.remove(imageUrl);
  };

  return <ItemSection sections={sections} user={user} group={group} />;
}

export default ListSection;
