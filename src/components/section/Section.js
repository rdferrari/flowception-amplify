import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { UserContext } from "../../App";
import { listSections } from "../../graphql/queries";
import { updateSection } from "../../graphql/mutations";
import { onCreateSection } from "../../graphql/subscriptions";
import CreateSection from "./CreateSection";
import ListSection from "./ListSection";
import AdminMenu from "../AdminMenu";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
      variables: {},
      authMode: "API_KEY",
    });

    const sectionArray = sectionData.data.listSections.items;
    updateSections(sectionArray);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const dropSource = result.source.index;
    const dropDestination = result.destination.index;

    if (dropDestination === dropSource) {
      return;
    }

    updateSections([]);
    console.log("source:", dropSource);
    console.log("destination", dropDestination);
    console.log(sections[dropDestination].order);

    const reorderUpdate = async (sectionId, drop) => {
      const input = {
        id: sectionId,
        order: drop,
      };

      const result = await API.graphql(
        graphqlOperation(updateSection, {
          input,
        })
      );
      getPublicData();
      console.info(`Updated section: id ${result.data.updateSection.id}`);
    };

    const dropSourceOrderCopy = sections[dropSource].order;

    reorderUpdate(sections[dropSource].id, sections[dropDestination].order);
    reorderUpdate(sections[dropDestination].id, dropSourceOrderCopy);
  };

  return (
    <UserContext.Consumer>
      {({ user, group }) => (
        <div>
          {showCreateSection === false && (
            <img
              className="section-tagline"
              src="/images/tagline.svg"
              alt="WHAT WE CAN DESCRIBE IS IMPERMANENT"
            />
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
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="list">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <div>
                      <ListSection
                        user={user}
                        sections={sections}
                        isDraggable={isDraggable}
                      />
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      )}
    </UserContext.Consumer>
  );
};

export default Section;
