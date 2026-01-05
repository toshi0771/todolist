export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoState {
  todos: Todo[];
  inputText: string;
  editingTodo: Todo | null;
  selectedTodo: Todo | null;
}