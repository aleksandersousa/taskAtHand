import { CircularProgress } from '@mui/material';
import { useFetch } from '../../hooks/useFetch';
import { Navbar, ProfileList } from '../../components';
import { Container, Header, Title } from './styles';
import { User } from '../../models';

export default function Profiles() {
  const { data, isFetching } = useFetch<User[] | null>('/users');

  return (
    <>
      <Navbar />
      <Container>
        <Header>
          <Title>Perfis</Title>
        </Header>
        {isFetching ? <CircularProgress /> : <ProfileList userList={data as User[]} />}
      </Container>
    </>
  );
}
