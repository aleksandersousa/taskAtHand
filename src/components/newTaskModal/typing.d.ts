import { Ref } from "react";
import { TodoModel } from "../../models";

export interface NewTaskModalProps {
  show: boolean;
  titleRef: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null | undefined | ((instance: HTMLTextAreaElement | null) => void) | React.RefObject<HTMLTextAreaElement> | null | undefined;
  descRef: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null | undefined | ((instance: HTMLTextAreaElement | null) => void) | React.RefObject<HTMLTextAreaElement> | null | undefined;
  customRef?: Ref;
  onSetTodo: (todo: TodoModel) => void;
  onConfirm: (todo: TodoModel) => void;
  onClose: () => void;
}
