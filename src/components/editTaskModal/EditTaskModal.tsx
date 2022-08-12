import React, { useEffect } from 'react';
import { TodoModel } from '../../models';
import { Modal, TextField } from '../index';
import { Container, Wrapper } from './styles';
import { EditTaskModalProps } from './typing';

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  show,
  todo,
  titleRef,
  descRef,
  onSetTodo,
  onConfirm,
  onClose,
}) => {
  useEffect(() => {
    window.localStorage.setItem('Título', todo.title);
    window.localStorage.setItem('Descrição', todo.desc);
    window.dispatchEvent(new Event('storage'));
  }, [todo]);

  const handleSave = () => {
    const title = titleRef.current.value;
    const desc = descRef.current.value;

    if (title === '' || desc === '') {
      alert('Existem campos vazios!');
      return;
    }

    const updatedTodo: TodoModel = {
      ...todo,
      title,
      desc,
    };

    onConfirm(todo, updatedTodo);
    onSetTodo(updatedTodo);
    onClose();
  };

  return (
    <Container>
      <Modal
        show={show}
        onConfirm={handleSave}
        onClose={onClose}
        title="Editar tarefa"
        width="28rem"
        height="28rem"
      >
        <Wrapper>
          <TextField
            customRef={titleRef}
            label="Título"
            height="5rem"
            paddingTop="1rem"
            disableLabel
          />
          <TextField
            customRef={descRef}
            label="Descrição"
            height="7rem"
            paddingTop="1.5rem"
            textArea
            disableLabel
          />
        </Wrapper>
      </Modal>
    </Container>
  );
};

export default EditTaskModal;
