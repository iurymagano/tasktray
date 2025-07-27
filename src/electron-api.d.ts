export interface ElectronAPI {
  getTasks: () => Promise<Task[]>;
  setTasks: (tasks: Task[]) => Promise<boolean>;
  onFocusInput: (callback: () => void) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
