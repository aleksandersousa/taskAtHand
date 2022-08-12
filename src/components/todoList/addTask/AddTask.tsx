import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { Container, TextButton } from './styles';
import { AddTaskProps } from './typing';

const AddTask: React.FC<AddTaskProps> = ({ onClick }) => {
  const resetTexts = () => {
    window.localStorage.setItem('Título', '');
    window.localStorage.setItem('Descrição', '');
    window.dispatchEvent(new Event('storage'));
  };

  const handleClick = () => {
    resetTexts();
    onClick();
  };

  return (
    <Container onClick={handleClick}>
      <IconButton disableFocusRipple disableRipple>
        <AddOutlined className="iconAdd" />
        <TextButton>Adicionar tarefa</TextButton>
      </IconButton>
    </Container>
  );
};

export default AddTask;
