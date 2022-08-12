import { FilterList } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useRef, useState } from 'react';
import {
  NewTaskModal,
  VisualizeTaskModal,
  EditTaskModal,
  ConfirmDeleteTaskModal,
  Filter,
} from '../index';
import Todo from './todo/Todo';
import AddTask from './addTask/AddTask';
import { Container, Header, IconText, Title, Wrapper } from './styles';
import { saveTodo } from '../../services/httpCalls';
import { State, TodoListProps } from './typing';
import { TodoModel, User } from '../../models';
import { FilterState } from '../filter/typing';

const TodoList: React.FC<TodoListProps> = ({ list }) => {
  const [loggedUser, setLoggedUser] = useState<{ user: User } | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [todos, setTodos] = useState(list || []);
  const [todo, setTodo] = useState<TodoModel>({
    id: -1,
    title: '',
    desc: '',
    status: 'nova',
    isVisible: true,
    isComplete: false,
  });
  const [state, setState] = useState({
    showNewTaskModal: false,
    showVisualizeTaskModal: false,
    showEditTaskModal: false,
    showConfirmDeleteTaskModal: false,
  });

  // controla os text fields dos modals
  const titleRef = useRef();
  const descRef = useRef();

  const _setState = (name: State, value: boolean) => {
    setState(prevState => {
      prevState[name] = value;
      return { ...prevState };
    });
  };

  const addTodo = async (t: TodoModel) => {
    const newTodos = [t, ...todos];
    setTodos(newTodos);

    const user: { user: User } = JSON.parse(
      window.localStorage.getItem('user') as string
    );
    user.user.password = window.localStorage.getItem('password') as string;
    user.user.list = todos;
    user.user.list.push(t);

    await saveTodo(`/users/${user.user.id as string}`, user.user).catch(err =>
      console.log(err)
    );
  };

  const updateTodo = (t: TodoModel, newValue: TodoModel) => {
    const updatedArr = todos.map(item => (item.id === t.id ? newValue : item));
    setTodos(updatedArr);

    const user = JSON.parse(window.localStorage.getItem('user') as string);
    user.user.password = window.localStorage.getItem('password');
    user.user.list = updatedArr;

    saveTodo(`/users/${user.user.id as string}`, user.user).catch(err =>
      console.log(err)
    );
  };

  const removeTodo = (t: TodoModel) => {
    const removedArr = [...todos].filter(item => item.id !== t.id);
    setTodos(removedArr);

    const user = JSON.parse(window.localStorage.getItem('user') as string);
    user.user.password = window.localStorage.getItem('password');
    user.user.list = removedArr;

    saveTodo(`/users/${user.user.id as string}`, user.user).catch(err =>
      console.log(err)
    );
  };

  const completeTodo = (id: string) => {
    const updatedTodos = todos.map(t => {
      if (t.id === id) {
        t.isComplete = !t.isComplete;
        t.status = t.isComplete ? 'concluída' : 'nova';
      }
      return t;
    });
    setTodos(updatedTodos);

    const user = JSON.parse(window.localStorage.getItem('user') as string);
    user.user.password = window.localStorage.getItem('password');
    user.user.list = updatedTodos;

    saveTodo(`/users/${user.user.id as string}`, user.user).catch(err =>
      console.log(err)
    );
  };

  const changeTodoVisibility = (id: string) => {
    const updatedTodos = todos.map(t => {
      if (t.id === id) {
        t.isVisible = !t.isVisible;
      }
      return t;
    });
    setTodos(updatedTodos);

    const user = JSON.parse(window.localStorage.getItem('user') as string);
    user.user.password = window.localStorage.getItem('password');
    user.user.list = updatedTodos;

    saveTodo(`/users/${user.user.id as string}`, user.user).catch(err =>
      console.log(err)
    );
  };

  // listener para alterar os usuarios
  window.addEventListener('setUser', () => {
    setLoggedUser(JSON.parse(window.localStorage.getItem('user') as string));
    setCurrentUser(JSON.parse(window.localStorage.getItem('currentUser') as string));
  });

  const openFilter = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const closeFilter = () => {
    setAnchorEl(null);
  };

  const sortTodos = (sortBy: FilterState | undefined) => {
    let tempTodos: TodoModel[] = [];

    const sortByStatus = (status: string) => {
      const sortedArr = todos;

      if (status === 'complete') {
        sortedArr.sort((a, b) => Number(b.isComplete) - Number(a.isComplete));
      } else if (status === 'new') {
        sortedArr.sort((a, b) => Number(a.isComplete) - Number(b.isComplete));
      }

      return sortedArr;
    };

    const sortByVisibility = (visibility: string) => {
      const sortedArr = todos;

      if (visibility === 'show') {
        sortedArr.sort((a, b) => Number(b.isVisible) - Number(a.isVisible));
      } else if (visibility === 'hide') {
        sortedArr.sort((a, b) => Number(a.isVisible) - Number(b.isVisible));
      }

      return sortedArr;
    };

    if (sortBy?.value === 'new') {
      tempTodos = sortByStatus('new');
    } else if (sortBy?.value === 'complete') {
      tempTodos = sortByStatus('complete');
    } else if (sortBy?.value === 'show') {
      tempTodos = sortByVisibility('show');
    } else if (sortBy?.value === 'hide') {
      tempTodos = sortByVisibility('hide');
    }

    setTodos(tempTodos);
  };

  return (
    <Container>
      <Header>
        <Title>Minha lista</Title>
        <IconButton onClick={e => openFilter(e)}>
          <FilterList aria-describedby="filter" />
          <IconText>Filtros</IconText>
        </IconButton>
      </Header>
      <Wrapper>
        {todos.map(t => (
          <Todo
            key={t.id}
            todo={t}
            user={loggedUser as { user: User }}
            currentUser={currentUser as User}
            onOpenVisualizeTaskModal={() => {
              setTodo(t);
              _setState('showVisualizeTaskModal', true);
            }}
            onOpenEditTaskModal={() => {
              window.localStorage.setItem('Título', t.title);
              window.localStorage.setItem('Descrição', t.desc);
              setTodo(t);
              _setState('showEditTaskModal', true);
            }}
            onConfirmDeleteTaskModal={() => {
              setTodo(t);
              _setState('showConfirmDeleteTaskModal', true);
            }}
            completeTodo={completeTodo}
            changeTodoVisibility={changeTodoVisibility}
          />
        ))}
      </Wrapper>
      {currentUser?.id === loggedUser?.user.id && (
        <AddTask onClick={() => _setState('showNewTaskModal', true)} />
      )}
      <NewTaskModal
        show={state.showNewTaskModal}
        titleRef={
          titleRef as unknown as
            | ((instance: HTMLInputElement | null) => void)
            | React.RefObject<HTMLInputElement>
            | null
            | undefined
            | ((instance: HTMLTextAreaElement | null) => void)
            | React.RefObject<HTMLTextAreaElement>
            | null
            | undefined
        }
        descRef={
          descRef as unknown as
            | ((instance: HTMLInputElement | null) => void)
            | React.RefObject<HTMLInputElement>
            | null
            | undefined
            | ((instance: HTMLTextAreaElement | null) => void)
            | React.RefObject<HTMLTextAreaElement>
            | null
            | undefined
        }
        onSetTodo={setTodo}
        onClose={() => _setState('showNewTaskModal', false)}
        onConfirm={addTodo}
      />
      <VisualizeTaskModal
        show={state.showVisualizeTaskModal}
        todo={todo}
        onClose={() => _setState('showVisualizeTaskModal', false)}
      />
      <EditTaskModal
        show={state.showEditTaskModal}
        todo={todo}
        titleRef={titleRef}
        descRef={descRef}
        onSetTodo={setTodo}
        onClose={() => _setState('showEditTaskModal', false)}
        onConfirm={updateTodo}
      />
      <ConfirmDeleteTaskModal
        show={state.showConfirmDeleteTaskModal}
        todo={todo}
        onClose={() => _setState('showConfirmDeleteTaskModal', false)}
        onConfirm={removeTodo}
      />
      <Filter
        anchorEl={anchorEl}
        user={loggedUser}
        currentUser={currentUser}
        onConfirm={sortTodos}
        onClose={closeFilter}
      />
    </Container>
  );
};

export default TodoList;
