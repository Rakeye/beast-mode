import styled from 'styled-components';

export const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 60px;
    padding: 2rem 0.5rem;
  }
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    justify-content: center;
    padding: 0;
    
    span {
      display: none;
    }
  }
`;

export const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

export const NavLink = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  background: ${props => props.active ? 'rgba(255, 61, 0, 0.1)' : 'transparent'};
  
  &:hover {
    background: rgba(255, 61, 0, 0.05);
    transform: translateX(4px);
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    justify-content: center;
    
    span {
      display: none;
    }
  }
`;
