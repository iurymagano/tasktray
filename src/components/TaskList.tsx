import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskItem, { type Task } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  editingId: string | null;
  editingText: string;
  setEditingId: (id: string | null) => void;
  setEditingText: (text: string) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  editingId,
  editingText,
  setEditingId,
  setEditingText,
  saveEdit,
  cancelEdit,
  toggleTask,
  deleteTask,
}) => {
  const activeTasks = tasks.filter((t) => !t.completed);
  return (
    <Droppable droppableId="tasks-droppable">
      {(provided) => (
        <ul
          className="space-y-2 pb-2 pr-2"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {activeTasks.map((task, idx) => (
            <Draggable key={task.id} draggableId={task.id} index={idx}>
              {(provided) => (
                <TaskItem
                  task={task}
                  editingId={editingId}
                  editingText={editingText}
                  setEditingId={setEditingId}
                  setEditingText={setEditingText}
                  saveEdit={saveEdit}
                  cancelEdit={cancelEdit}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                  draggableProps={provided.draggableProps}
                  dragHandleProps={provided.dragHandleProps ?? undefined}
                  innerRef={provided.innerRef}
                  isDraggable={true}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default TaskList;
