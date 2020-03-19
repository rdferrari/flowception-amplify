import React, { useEffect, useState } from "react";
import CreateSection from "./CreateSection";
import ListSection from "./ListSection";
import { UserContext } from "../../App";

import { API, graphqlOperation } from "aws-amplify";

import { listSections } from "../../graphql/queries";
import { onCreateSection } from "../../graphql/subscriptions";

const Section = () => {
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

  return (
    <UserContext.Consumer>
      {({ user, group }) => (
        <div className="section-list-container">
          {user && group === "admin" ? (
            <CreateSection user={user} sections={sections} />
          ) : null}
          <ListSection user={user} group={group} sections={sections} />
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Section;
