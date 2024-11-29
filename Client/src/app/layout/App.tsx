import { Container, createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const preferesDarkMode = useMediaQuery('(prefers-color-scheme: dark');
  const [darkMode, setDarkMode] = useState(preferesDarkMode);
  const modeType = darkMode ? 'dark' : 'light';
  
  function handleThemeChange() {
    setDarkMode(!darkMode)
  }
  
  const darkTheme = createTheme({
    palette: {
      mode: modeType,
      background: {
        default: modeType === 'light' ? '#eaeaea' : '#121212'
      } 
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
