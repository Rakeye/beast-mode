import styled from 'styled-components';
import { glassmorphism } from '../../styles/theme';

export const SidebarContainer = styled.nav`
  width: 250px;
  background: rgba(20, 20, 20, 0.7);
  ${glassmorphism}
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 60px;
    padding: 0 1rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 1000;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #FF3D00;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
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

export const NavLink = styled.button<{ active: boolean }>`
  background: ${({ active }) => active ? 'rgba(255, 61, 0, 0.2)' : 'transparent'};
  color: ${({ active }) => active ? '#FF3D00' : 'white'};
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 61, 0, 0.1);
    transform: translateX(5px);
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
`;
