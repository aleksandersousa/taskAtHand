import { TodoModel } from "../../models";

export interface ConfirmDeleteTaskModalProps {
  show: boolean;
  todo: TodoModel;
  onConfirm: (todo: TodoModel) => void;
  onClose: () => void;
}
