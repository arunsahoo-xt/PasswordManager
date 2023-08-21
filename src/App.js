
import './App.css';

import RandomPassword from './RandomPassword';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';


function App() {


  const theme = createTheme({

    palette: {
      primary: {
        main: '#2a3eb1',
      },
      secondary: pink,
    },

  });

  return (
    <ThemeProvider theme={theme}>


      <div className="App">
        <RandomPassword />
      </div>

    </ThemeProvider>
  );
}

export default App;
