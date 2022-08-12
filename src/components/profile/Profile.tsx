import { Link } from 'react-router-dom';
import { Container, Email, Name } from './styles';
import { ProfileProps } from './typing';

const Profile: React.FC<ProfileProps> = ({ id, name, email }) => {
  return (
    <Link to={`/profile/${id}`}>
      <Container>
        <Name>{name}</Name>
        <Email>{email}</Email>
      </Container>
    </Link>
  );
};

export default Profile;
