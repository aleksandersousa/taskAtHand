import { TodoModel } from "../../models";

export interface EditTaskModalProps {
  show: boolean;
  todo: TodoModel;
  titleRef: any;
  descRef: any;
  customRef?: Ref;
  onSetTodo: (todo: TodoModel) => void;
  onConfirm: (todo: TodoModel, updatedTodo: TodoModel) => void;
  onClose: () => void;
}
