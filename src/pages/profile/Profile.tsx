import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { Navbar, TodoList } from '../../components';
import { Container } from './styles';
import { User } from '../../models/User';
import { TodoModel } from '../../models';

export default function Profile() {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];

  const { data, isFetching } = useFetch<User>(`/users/${userId}`);

  useEffect(() => {
    if (!isFetching) {
      window.localStorage.setItem('currentUser', JSON.stringify(data));
      window.dispatchEvent(new Event('setUser'));
    }
  }, [isFetching]);

  return (
    <>
      <Navbar />
      <Container>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <TodoList list={data?.list as TodoModel[]} />
        )}
      </Container>
    </>
  );
}
