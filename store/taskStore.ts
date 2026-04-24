import { create } from "zustand";
import { useAuthStore } from "./authStore";

const API_URL = "https://taski-backend-swyf.onrender.com/api";

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string | null;
  completed: boolean;
  completedAt: string | null;
  createdAt: string;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (title: string, description: string, dueDate: Date | null) => Promise<boolean>;
  updateTask: (id: string, title: string, description: string, dueDate: Date | null) => Promise<boolean>;
  toggleComplete: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  clearError: () => void;
}

const getHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/tasks`, { headers: getHeaders() });
      const data = await res.json();
      if (!res.ok) {
        set({ error: data.message, isLoading: false });
        return;
      }
      set({ tasks: data.data, isLoading: false });
    } catch {
      set({ error: "Network error.", isLoading: false });
    }
  },

  createTask: async (title, description, dueDate) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          title,
          description,
          dueDate: dueDate ? dueDate.toISOString() : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        set({ error: data.message, isLoading: false });
        return false;
      }
      set((state) => ({ tasks: [data.data, ...state.tasks], isLoading: false }));
      return true;
    } catch {
      set({ error: "Network error.", isLoading: false });
      return false;
    }
  },

  updateTask: async (id, title, description, dueDate) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({
          title,
          description,
          dueDate: dueDate ? dueDate.toISOString() : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        set({ error: data.message, isLoading: false });
        return false;
      }
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === id ? data.data : t)),
        isLoading: false,
      }));
      return true;
    } catch {
      set({ error: "Network error.", isLoading: false });
      return false;
    }
  },

  toggleComplete: async (id) => {
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t._id === id ? { ...t, completed: !t.completed } : t
      ),
    }));
    try {
      const res = await fetch(`${API_URL}/tasks/${id}/complete`, {
        method: "PATCH",
        headers: getHeaders(),
      });
      if (!res.ok) {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t._id === id ? { ...t, completed: !t.completed } : t
          ),
        }));
      }
    } catch {
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t._id === id ? { ...t, completed: !t.completed } : t
        ),
      }));
    }
  },

  deleteTask: async (id) => {
    const previous = get().tasks;
    set((state) => ({ tasks: state.tasks.filter((t) => t._id !== id) }));
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) set({ tasks: previous });
    } catch {
      set({ tasks: previous });
    }
  },

  clearError: () => set({ error: null }),
}));