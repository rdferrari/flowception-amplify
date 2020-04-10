import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { UserContext } from "../../App";
import { listSections } from "../../graphql/queries";
import { updateSection } from "../../graphql/mutations";
import { onCreateSection } from "../../graphql/subscriptions";
import CreateSection from "./CreateSection";
import ListSection from "./ListSection";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

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
        <div className="section-desktop-flex">
          <div className="section-list-container">
            {user && group === "admin" && (
              <div className="section-create-container">
                <CreateSection user={user} sections={sections} />
              </div>
            )}

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="list">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <ListSection
                      user={user}
                      group={group}
                      sections={sections}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {/* <ListSection user={user} group={group} sections={sections} /> */}
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
