import { createGlobalStyle, DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#FF3D00',
    secondary: '#1E1E1E',
    accent: '#FFD600',
    background: '#121212',
    text: '#FFFFFF',
    error: '#FF0000',
    success: '#00FF00'
  },
  fonts: {
    heading: '"Roboto Condensed", sans-serif',
    body: '"Roboto", sans-serif'
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px'
  }
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Roboto+Condensed:wght@700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
    text-transform: uppercase;
  }

  button {
    cursor: pointer;
    font-family: ${({ theme }) => theme.fonts.heading};
    text-transform: uppercase;
    border: none;
    outline: none;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }
`;
