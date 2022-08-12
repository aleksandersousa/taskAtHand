import { Ref } from "react";
import { TodoModel } from "../../models";

export interface VisualizeTaskModalProps {
  show: boolean;
  todo: TodoModel;
  customRef?: Ref;
  onClose: () => void;
}

export interface TextProps {
  title: string;
  desc: string;
}
