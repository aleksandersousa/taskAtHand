import { TodoModel } from '../../models';
import { Modal, TextField } from '../index';
import { Container, Wrapper } from './styles';
import { NewTaskModalProps } from './typing';

const NewTaskModal: React.FC<NewTaskModalProps> = ({
  show,
  titleRef,
  descRef,
  onSetTodo,
  onConfirm,
  onClose,
}) => {
  const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const handleSave = () => {
    const title = window.localStorage.getItem('Título');
    const desc = window.localStorage.getItem('Descrição');

    if (title === '' || desc === '') {
      alert('Existem campos vazios!');
      return;
    }

    const newTodo: TodoModel = {
      id: uid(),
      title: title as string,
      desc: desc as string,
      status: 'nova',
      isVisible: true,
      isComplete: false,
    };

    onSetTodo(newTodo);
    onConfirm(newTodo);
    onClose();
  };

  return (
    <Container>
      <Modal
        show={show}
        onConfirm={handleSave}
        onClose={onClose}
        title="Adicionar nova tarefa"
        width="28rem"
        height="28rem"
      >
        <Wrapper>
          <TextField
            customRef={titleRef}
            label="Título"
            height="5rem"
            paddingTop="1rem"
          />
          <TextField
            customRef={descRef}
            label="Descrição"
            height="7rem"
            textArea
            paddingTop="1.5rem"
          />
        </Wrapper>
      </Modal>
    </Container>
  );
};

export default NewTaskModal;
