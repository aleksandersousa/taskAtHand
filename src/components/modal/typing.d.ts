export interface ModalProps {
  title?: string;
  width?: string;
  height?: string;
  onConfirm?: () => void;
  onClose: () => void;
  cancelText?: string;
  confirmText?: string;
  children?: JSX.Element | JSX.Element[];
  show: boolean;
  centerTitle?: boolean;
  showButtons?: boolean;
}

export interface BackgroundProps {
  show?: boolean;
}

export interface ContainerProps {
  width?: string;
  height?: string;
  centerTitle?: boolean;
}

export interface TitleProps {
  centerTitle?: boolean;
}

export interface FooterProps {
  showButtons?: boolean;
}
