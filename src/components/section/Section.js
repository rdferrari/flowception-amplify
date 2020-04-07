import React, { useEffect, useState } from "react";
import CreateSection from "./CreateSection";
import ListSection from "./ListSection";
import { UserContext } from "../../App";

import { API, graphqlOperation } from "aws-amplify";

import { listSections } from "../../graphql/queries";
import { onCreateSection, onUpdateSection } from "../../graphql/subscriptions";

const Section = () => {
  const [sections, updateSections] = useState([]);

  useEffect(() => {
    getPublicData();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateSection)
    ).subscribe({
      next: (data) => {
        const {
          value: {
            data: { onCreateSection },
          },
        } = data;
        const sectionData = [onCreateSection, ...sections];
        updateSections(sectionData);
      },
    });
    return () => subscription.unsubscribe();
  }, [sections]);

  const getPublicData = async () => {
    const sectionData = await API.graphql({
      query: listSections,
      variables: {},
      authMode: "API_KEY",
    });

    const sectionArray = sectionData.data.listSections.items;
    updateSections(sectionArray);
  };

  return (
    <UserContext.Consumer>
      {({ user, group }) => (
        <div className="section-desktop-flex">
          <div className="section-list-container">
            {user && group === "admin" && (
              <div className="section-create-container">
                <CreateSection user={user} sections={sections} />
              </div>
            )}

            <ListSection user={user} group={group} sections={sections} />
          </div>
          <div className="section-desktop-right">
            <div>
              <h1 className="section-desktop-right-text">
                Maumahara ka mau oranga, ake, ake.
              </h1>
              <img
                className="section-desktop-right-image"
                src="/images/vibrationsHeader.jpg"
              />
            </div>
          </div>
          ​
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Section;
