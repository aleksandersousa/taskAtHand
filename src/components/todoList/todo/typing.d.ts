import { TodoModel, User } from '../../../models';

export interface TodoProps {
  todo: TodoModel;
  user: { user: User };
  currentUser: User;
  onOpenVisualizeTaskModal: (arg?: unknown) => void;
  onOpenEditTaskModal: (arg?: unknown) => void;
  onConfirmDeleteTaskModal: (arg?: unknown) => void;
  completeTodo: (id: string) => void;
  changeTodoVisibility: (id: string) => void;
}

export interface ActionsProps {
  isBrowser: boolean;
}
