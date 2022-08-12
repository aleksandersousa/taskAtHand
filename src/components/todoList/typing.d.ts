import { TodoModel } from "../../models";

export interface TodoListProps {
  list: TodoModel[];
}

export type State = 'showNewTaskModal' | 'showVisualizeTaskModal' | 'showEditTaskModal' | 'showConfirmDeleteTaskModal'
