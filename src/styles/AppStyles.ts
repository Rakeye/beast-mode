import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  margin-left: 250px; // Match sidebar width
  
  @media (max-width: 768px) {
    margin-left: 60px; // Match collapsed sidebar width
    padding: 1rem;
  }
`;
