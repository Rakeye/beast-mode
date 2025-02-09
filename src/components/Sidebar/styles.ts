import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 60px;
    padding: 1rem 0.5rem;
  }
`;

export const Logo = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0 1rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    justify-content: center;
    padding: 0;
    
    span {
      display: none;
    }
  }
`;

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NavItem = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    justify-content: center;
    
    span {
      display: none;
    }
  }
`;

export const Icon = styled.span`
  font-size: 1.25rem;
  min-width: 24px;
  text-align: center;
`;
