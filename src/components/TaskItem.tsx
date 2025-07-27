import { motion } from 'framer-motion';
import React from 'react';
import type { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  editingId: string | null;
  editingText: string;
  setEditingId: (id: string | null) => void;
  setEditingText: (text: string) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  innerRef?: (element: HTMLElement | null) => void;
  isDraggable?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  editingId,
  editingText,
  setEditingId,
  setEditingText,
  saveEdit,
  cancelEdit,
  toggleTask,
  deleteTask,
  draggableProps = {},
  dragHandleProps = {},
  innerRef,
  isDraggable = false,
}) => {
  return (
    <li
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className={`flex items-center p-2 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors ${isDraggable ? '' : 'opacity-70'}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="flex items-center w-full"
      >
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-4 h-4 cursor-pointer text-blue-500 rounded focus:ring-blue-500 bg-gray-700 border-gray-600 checked:bg-blue-500 checked:border-blue-500 transition-colors"
        />
        {editingId === task.id ? (
          <textarea
            className="flex-1 ml-3 px-1 py-0.5 rounded bg-gray-800 border border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none resize-none min-h-[24px] max-h-32"
            value={editingText}
            onChange={e => setEditingText(e.currentTarget.value)}
            onInput={e => {
              const ta = e.currentTarget;
              ta.style.height = '24px';
              ta.style.height = ta.scrollHeight + 'px';
            }}
            onBlur={saveEdit}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                saveEdit();
              } else if (e.key === 'Escape') {
                cancelEdit();
              }
            }}
            autoFocus
            rows={Math.max(1, (editingText.match(/\n/g)?.length ?? 0) + 1)}
          />
        ) : (
          <span
            className={`flex-1 ml-3 transition-all ${task.completed ? 'line-through text-gray-400' : ''}`}
            onClick={() => {
              setEditingId(task.id);
              setEditingText(task.text);
            }}
            tabIndex={0}
            role="button"
            style={{ cursor: 'pointer', whiteSpace: 'pre-line' }}
            title="Clique para editar"
          >
            {task.text}
          </span>
        )}
        <button
          onClick={() => deleteTask(task.id)}
          className="ml-2 text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-gray-700 transition-colors transform hover:scale-125"
        >
          ✕
        </button>
      </motion.div>
    </li>
  );
};

export default TaskItem;
