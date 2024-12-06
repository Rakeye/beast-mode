import styled, { keyframes } from 'styled-components';

const glowAnimation = keyframes`
  0% { text-shadow: 0 0 10px #FF3D00; }
  50% { text-shadow: 0 0 20px #FF3D00, 0 0 30px #FF3D00; }
  100% { text-shadow: 0 0 10px #FF3D00; }
`;

export const HeaderContainer = styled.header`
  text-align: center;
  padding: 2rem 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.h1`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  animation: ${glowAnimation} 2s infinite;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.accent};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;
