import React from 'react';
import TaskItem, { type Task } from './TaskItem';

interface CompletedTasksProps {
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

const CompletedTasks: React.FC<CompletedTasksProps> = ({
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
  const completedTasks = tasks.filter((t) => t.completed);
  return (
    <ul className="space-y-2 pb-2 pr-2">
      {completedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          editingId={editingId}
          editingText={editingText}
          setEditingId={setEditingId}
          setEditingText={setEditingText}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          isDraggable={false}
        />
      ))}
    </ul>
  );
};

export default CompletedTasks;
