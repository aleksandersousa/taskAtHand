import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './theme/GlobalStyles';
import RoutesLogic from './routes';
import theme from './theme/schema.json';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme.data.light}>
      <GlobalStyles />
      <RoutesLogic />
    </ThemeProvider>
  );
}

export default App;
