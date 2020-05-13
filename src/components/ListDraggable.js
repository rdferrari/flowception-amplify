import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { update } from "../graphql/mutations";

const ListDraggable = ({ data, update }) => {
  function compare(a, b) {
    if (Number(a.order) < Number(b.order)) {
      return -1;
    }
    if (Number(a.order) > Number(b.order)) {
      return 1;
    }
    return 0;
  }

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

    const resultArr = Array.from(data);
    const [removed] = resultArr.splice(startIndex, 1);
    resultArr.splice(endIndex, 0, removed);
    console.log(resultArr);

    resultArr.map((item, index) => (item.order = index));

    resultArr.map((item, index) => reorderUpdate(item.id, index));
  }

  const reorderUpdate = async (sectionId, order) => {
    const input = {
      id: sectionId,
      order: order,
    };

    const result = await API.graphql(
      graphqlOperation(update, {
        input,
      })
    );
    // console.info(`Updated section: id ${result.data.update.id}`);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {data &&
              data.sort(compare).map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      className="section-drag-container"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p className="section-drag-drop-title">{item.title}</p>
                      <img
                        className="section-drag-drop-icon"
                        src="/images/dragDrop.svg"
                        alt="Drag and drop"
                      />
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
};

export default ListDraggable;
