import { Link } from 'react-router-dom';
import Burger from './burger/Burger';
import { Container } from './styles';

const Navbar: React.FC = () => {
  return (
    <Container>
      <Link to="/">
        <p>Task@Hand</p>
      </Link>
      <Burger />
    </Container>
  );
};

export default Navbar;
