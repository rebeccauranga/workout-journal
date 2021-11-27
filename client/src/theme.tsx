import { ThemeOptions, createTheme } from '@mui/material/styles';

export const theme: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f7b7',
    },
    secondary: {
      main: '#d688fa',
    },
    background: {
      default: "#303030",
      paper: "#424242",
    }
  },
  typography: {
    // fontSize: 17,
    fontWeightLight: 100,
    fontFamily: 'Outfit',
  },
  shape: {
    borderRadius: 4,
  },
});