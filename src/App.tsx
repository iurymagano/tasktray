import { useState, useEffect, useRef } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import TaskList from './components/TaskList';
import './App.css';
import CompletedTasks from './components/CompletedTasks';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = 'electron-tasks';

export default function App() {
  // Detecta ambiente Electron ou navegador
  const isElectron = Boolean(window && window.electronAPI);
  console.log('Rodando em:', isElectron ? 'Electron' : 'Navegador');

  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [newTask, setNewTask] = useState('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Estado para edição inline
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  // Salva edição inline da tarefa
  function saveEdit() {
    if (editingId && editingText.trim()) {
      setTasks(
        tasks.map((t) =>
          t.id === editingId ? { ...t, text: editingText } : t,
        ),
      );
    }
    setEditingId(null);
  }

  // Cancela edição inline da tarefa
  function cancelEdit() {
    console.log('adicionado um console');
    setEditingId(null);
  }

  // Foca no input ao abrir a janela (apenas Electron)
  useEffect(() => {
    if (isElectron && window.electronAPI && inputRef.current) {
      window.electronAPI.onFocusInput?.(() => {
        inputRef.current?.focus();
      });
    }
  }, [isElectron]);

  // Carrega tarefas ao iniciar
  useEffect(() => {
    if (isElectron && window.electronAPI) {
      window.electronAPI.getTasks().then((loaded: Task[]) => {
        setTasks(Array.isArray(loaded) ? loaded : []);
        setHydrated(true);
        console.log('Tarefas carregadas do electron-store:', loaded);
      });
    } else {
      const saved = localStorage.getItem(STORAGE_KEY);
      setTasks(saved ? JSON.parse(saved) : []);
      setHydrated(true);
      console.log('Tarefas carregadas do localStorage:', saved);
    }
  }, [isElectron]);

  // Salva tarefas sempre que houver mudança
  useEffect(() => {
    if (!hydrated) return;
    if (isElectron && window.electronAPI) {
      window.electronAPI.setTasks(tasks);
      console.log('Salvando no electron-store:', tasks);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      console.log('Salvando no localStorage:', tasks);
    }
  }, [tasks, hydrated, isElectron]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          text: newTask,
          completed: false,
        },
      ]);
      setNewTask('');
    }
  };

  const addTaskWithAnimation = () => {
    addTask();
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 flex flex-col items-center justify-start border border-gray-700/50">
      <h1 className="text-xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
        Simple Task
      </h1>
      <div className="flex gap-1 mb-4 w-full max-w-xs mx-auto">
        <textarea
          ref={inputRef}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onInput={(e) => {
            const ta = e.currentTarget;
            ta.style.height = '40px';
            ta.style.height = ta.scrollHeight + 'px';
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              addTaskWithAnimation();
            }
          }}
          placeholder="Adicionar nova tarefa..."
          className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-400 resize-none min-h-[40px] max-h-32"
        />
        <button
          onClick={addTaskWithAnimation}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          +
        </button>
      </div>
      <div className="flex-1 w-full max-w-xs min-h-0 overflow-y-overlay tasks-scroll">
        <DragDropContext
          onDragEnd={(result: DropResult) => {
            if (!result.destination) return;
            const activeTasks = tasks.filter((t) => !t.completed);
            const completedTasks = tasks.filter((t) => t.completed);
            const [removed] = activeTasks.splice(result.source.index, 1);
            activeTasks.splice(result.destination.index, 0, removed);
            setTasks([...activeTasks, ...completedTasks]);
          }}
        >
          <TaskList
            tasks={tasks.filter((t) => !t.completed)}
            editingId={editingId}
            editingText={editingText}
            setEditingId={setEditingId}
            setEditingText={setEditingText}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
          <CompletedTasks
            tasks={tasks.filter((t) => t.completed)}
            editingId={editingId}
            editingText={editingText}
            setEditingId={setEditingId}
            setEditingText={setEditingText}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        </DragDropContext>
      </div>
    </div>
  );
}
