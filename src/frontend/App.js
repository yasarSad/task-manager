import Theme from './theme';
import Routes from './Routes';
import { ThemeProvider, CssBaseline } from '@mui/material';

function App() {
  return (
   <ThemeProvider theme={Theme}>
    <CssBaseline/>
    <div className="app-container">
        <Routes/>
    </div>
   </ThemeProvider>
  );
}

export default App;
