import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;
