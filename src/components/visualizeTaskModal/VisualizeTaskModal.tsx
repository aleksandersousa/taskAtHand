import { Modal } from '../index';
import { Container, Description, TextWrapper, Title, Wrapper } from './styles';
import { TextProps, VisualizeTaskModalProps } from './typing';

const Text: React.FC<TextProps> = ({ title, desc }) => {
  return (
    <TextWrapper>
      <Title>{title}</Title>
      <Description>{desc}</Description>
    </TextWrapper>
  );
};

const VisualizeTaskModal: React.FC<VisualizeTaskModalProps> = ({
  show,
  todo,
  onClose,
  customRef,
}) => {
  return (
    <Container>
      <Modal
        show={show}
        title="Visualizar tarefa"
        onClose={onClose}
        width="28rem"
        height="26rem"
        showButtons={false}
      >
        <Wrapper>
          <Text title="Título" desc={todo.title} />
          <Text title="Descrição" desc={todo.desc} />
          <Text title="Status" desc={todo.status} />
          <Text title="Visibilidade" desc={todo.isVisible ? 'pública' : 'privada'} />
        </Wrapper>
      </Modal>
    </Container>
  );
};

export default VisualizeTaskModal;
