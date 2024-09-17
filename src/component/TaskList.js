// src/component/TaskList.js
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState({
    today: [],
    tomorrow: [],
    thisWeek: [],
    nextWeek: [],
    unplanned: [
      { id: '1', content: 'Test Task 1' },
      { id: '2', content: 'Test Task 2' },
      { id: '3', content: 'Test Task 3' },
      { id: '4', content: 'Test Task 4' },
      { id: '5', content: 'Test Task 5' },
      { id: '6', content: 'Test Task 6' },
      { id: '7', content: 'Test Task 7' },
      { id: '8', content: 'Test Task 8' },
      { id: '9', content: 'Test Task 9' },
      { id: '10', content: 'Test Task 10' },
    ],
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Do nothing if there's no destination (i.e., dropped outside any droppable area)
    if (!destination) return;

    // If dropped in the same column at the same position, do nothing
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Copy the source list of tasks and remove the dragged task
    const startList = Array.from(tasks[source.droppableId]);
    const [movedTask] = startList.splice(source.index, 1);

    // Copy the destination list and insert the dragged task
    const endList = Array.from(tasks[destination.droppableId]);
    endList.splice(destination.index, 0, movedTask);

    // Update the state with the new task arrangement
    setTasks({
      ...tasks,
      [source.droppableId]: startList,
      [destination.droppableId]: endList,
    });
  };

  const renderTask = (task, index) => (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );

  const renderTaskColumn = (columnId, title) => (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          className="task-column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h3>{title}</h3>
          {tasks[columnId].map((task, index) => renderTask(task, index))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-list-container">
        {renderTaskColumn('today', 'Today')}
        {renderTaskColumn('tomorrow', 'Tomorrow')}
        {renderTaskColumn('thisWeek', 'This Week')}
        {renderTaskColumn('nextWeek', 'Next Week')}
        {renderTaskColumn('unplanned', 'Unplanned')}
      </div>
    </DragDropContext>
  );
};

export default TaskList;
