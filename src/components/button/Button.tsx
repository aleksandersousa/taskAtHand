import { Container } from './styles';

const Button: React.FC<ButtonProps> = ({ text, type, disabled, cancel, onClick }) => {
  return (
    <Container onClick={onClick} disabled={disabled} cancel={cancel} type={type}>
      {text}
    </Container>
  );
};

export default Button;
