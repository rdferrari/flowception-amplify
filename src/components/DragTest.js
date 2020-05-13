import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { listSubsections } from "../graphql/queries";
import { updateSubsection } from "../graphql/mutations";

function DragTest() {
  const [subsections, setSubsections] = useState([]);

  useEffect(() => {
    listSubsectionData();
  }, []);

  function compare(a, b) {
    if (Number(a.order) < Number(b.order)) {
      return -1;
    }
    if (Number(a.order) > Number(b.order)) {
      return 1;
    }
    return 0;
  }

  const listSubsectionData = async () => {
    try {
      const subsectionsData = await API.graphql({
        query: listSubsections,
        variables: { limit: 1000 },
        authMode: "API_KEY",
      });

      const subsectionsDataArray = subsectionsData.data.listSubsections.items;

      const subsectionsDataFiltered = subsectionsDataArray.filter(
        (item) => item.sectionId === "6438a26d-821b-4488-a3ad-20e7d375a070"
      );

      setSubsections(subsectionsDataFiltered);
    } catch (err) {
      console.log("error fetching data..", err);
    }
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    let startIndex = result.source.index;
    let endIndex = result.destination.index;

    console.log(startIndex, endIndex);

    const resultArr = Array.from(subsections);
    const [removed] = resultArr.splice(startIndex, 1);
    resultArr.splice(endIndex, 0, removed);
    console.log(resultArr);

    resultArr.map((item, index) => (item.order = index));

    resultArr.map((item, index) => reorderUpdate(item.id, index));

    // console.log(resultArr);
  }

  const reorderUpdate = async (sectionId, order) => {
    const input = {
      id: sectionId,
      order: order,
    };

    const result = await API.graphql(
      graphqlOperation(updateSubsection, {
        input,
      })
    );
    console.info(`Updated section: id ${result.data.updateSubsection.id}`);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {subsections &&
              subsections.sort(compare).map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.title} - {item.order}
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragTest;
