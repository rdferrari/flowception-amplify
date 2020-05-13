import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { UserContext } from "../../App";
import { listSections } from "../../graphql/queries";
import { updateSection } from "../../graphql/mutations";
import { onCreateSection } from "../../graphql/subscriptions";

import CreateSection from "./CreateSection";
import ItemSection from "./ItemSection";
import AdminMenu from "../AdminMenu";

// import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ListDraggable from "../ListDraggable";

const Section = () => {
  const [sections, updateSections] = useState([]);
  const [showCreateSection, setShowCreateSection] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);

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
      variables: { limit: 1000 },
      authMode: "API_KEY",
    });

    const sectionArray = sectionData.data.listSections.items;

    updateSections(sectionArray);
  };

  return (
    <UserContext.Consumer>
      {({ user, group }) => (
        <div>
          {showCreateSection === false && (
            <div>
              <img
                className="section-tagline"
                src="/images/tagline.svg"
                alt="WHAT WE CAN DESCRIBE IS IMPERMANENT"
              />
            </div>
          )}

          {user && group === "admin" && (
            <>
              {showCreateSection === false && (
                <AdminMenu
                  createIcon="createNewSection.svg"
                  setShowCreate={setShowCreateSection}
                  reorderIcon="reorderSectionList.svg"
                  setIsDraggable={setIsDraggable}
                  isDraggable={isDraggable}
                  listIcon="sectionList.svg"
                />
              )}

              {showCreateSection === true && (
                <CreateSection
                  user={user}
                  sections={sections}
                  setShowCreateSection={setShowCreateSection}
                />
              )}
            </>
          )}

          {showCreateSection === false && (
            <div>
              {isDraggable === false ? (
                <div className="section-list-container">
                  <ItemSection sections={sections} user={user} />
                </div>
              ) : (
                <ListDraggable data={sections} update={updateSection} />
              )}
            </div>
          )}
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Section;
