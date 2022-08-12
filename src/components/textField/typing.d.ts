import { TodoModel } from "../../models";

export interface TextFieldProps {
  label?: string;
  height?: string;
  paddingTop?: string;
  marginBottom?: string;
  focus?: boolean;
  customRef?: ((instance: HTMLInputElement | null) => void) | React.RefObject<HTMLInputElement> | null | undefined | ((instance: HTMLTextAreaElement | null) => void) | React.RefObject<HTMLTextAreaElement> | null | undefined;
  type?: string;
  textArea?: booelan;
  disableLabel?: boolean;
}

export interface ContainerProps {
  height?: string;
  marginBottom?: string;
  disableLabel?: boolean;
  paddingTop?: string;
}

export interface LabelProps {
  disableLabel?: boolean;
}
