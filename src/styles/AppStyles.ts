import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #121212;
  color: white;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: 1rem;
    margin-top: 60px; // Space for fixed mobile header
  }
`;
