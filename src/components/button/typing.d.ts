interface ButtonProps {
  text: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  cancel?: boolean;
  onClick?: () => void;
}

interface ContainerProps {
  cancel?: boolean;
}
