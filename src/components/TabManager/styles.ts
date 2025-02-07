import styled from 'styled-components';
import { glassmorphism } from '../../styles/theme';

export const TabContainer = styled.div`
  width: 100%;
  ${glassmorphism}
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

export const TabList = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  ${glassmorphism}
  background: ${props => props.active ? 
    'linear-gradient(135deg, #FF3D00 0%, #FF8A00 100%)' : 
    'rgba(30, 30, 30, 0.8)'};
  color: white;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transform: ${props => props.active ? 'translateY(-2px)' : 'none'};
  box-shadow: ${props => props.active ? 
    '0 5px 15px rgba(255, 61, 0, 0.3)' : 
    'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 61, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;
