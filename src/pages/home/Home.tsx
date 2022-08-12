import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { Navbar, TodoList } from '../../components';
import { useFetch } from '../../hooks/useFetch';
import { TodoModel } from '../../models';
import { User } from '../../models/User';
import { Container } from './styles';

export default function Home() {
  const user = JSON.parse(window.localStorage.getItem('user') as string);
  const { data, isFetching } = useFetch<User>(`/users/${user?.user?.id as string}`);

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
