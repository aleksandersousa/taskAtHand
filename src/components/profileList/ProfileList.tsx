import { Profile } from '../index';
import { Container } from './styles';
import { ProfileListProps } from './typing';

const ProfileList: React.FC<ProfileListProps> = ({ userList }) => {
  return (
    <Container>
      {userList.map(user => (
        <Profile
          key={user.id}
          id={user.id as string}
          name={user.name as string}
          email={user.email as string}
        />
      ))}
    </Container>
  );
};

export default ProfileList;
