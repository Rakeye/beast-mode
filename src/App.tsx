import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles/theme';
import Header from './components/Header';
import TaskManager from './components/TaskManager';
import { AppContainer } from './styles/AppStyles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Header />
        <TaskManager />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
