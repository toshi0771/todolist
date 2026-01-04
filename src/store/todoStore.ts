import { create } from 'zustand';
import type { Todo, TodoState } from '../types/todo';

interface TodoActions {
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
  setInputText: (text: string) => void;
  setEditingTodo: (todo: Todo | null) => void;
  setSelectedTodo: (todo: Todo | null) => void;
}

export const useTodoStore = create<TodoState & TodoActions>((set, get) => ({
  // State
  todos: [],
  inputText: '',
  editingTodo: null,
  selectedTodo: null,

  // Actions
  addTodo: (text: string) => {
    if (text.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
        createdAt: new Date(),
      };
      set((state) => ({
        todos: [...state.todos, newTodo],
        inputText: '',
      }));
    }
  },

  toggleTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },

  deleteTodo: (id: string) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
      selectedTodo: null,
    }));
  },

  updateTodo: (id: string, text: string) => {
    if (text.trim()) {
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, text: text.trim() } : todo
        ),
        editingTodo: null,
        inputText: '',
      }));
    }
  },

  setInputText: (text: string) => {
    set({ inputText: text });
  },

  setEditingTodo: (todo: Todo | null) => {
    set({
      editingTodo: todo,
      inputText: todo ? todo.text : '',
      selectedTodo: null,
    });
  },

  setSelectedTodo: (todo: Todo | null) => {
    set({
      selectedTodo: todo,
      inputText: todo ? todo.text : '',
      editingTodo: null,
    });
  },
}));