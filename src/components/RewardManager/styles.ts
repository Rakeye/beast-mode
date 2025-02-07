import styled from 'styled-components';
import { glassmorphism } from '../../styles/theme';

export const RewardManagerContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  ${glassmorphism}
  background: rgba(20, 20, 20, 0.7);
  padding: 2rem;
  border-radius: 16px;

  h2 {
    margin: 0 0 1.5rem;
    color: #FFD700;
    font-size: 1.5rem;
    text-align: center;
  }
`;

export const RewardForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

interface RewardInputProps {
  as?: 'input' | 'textarea';
}

export const RewardInput = styled.input<RewardInputProps>`
  width: 100%;
  padding: 1rem 1.2rem;
  font-size: 16px;
  background: rgba(20, 20, 20, 0.8);
  border: 2px solid transparent;
  color: white;
  border-radius: 12px;
  transition: all 0.3s ease;
  ${glassmorphism}

  &:focus {
    outline: none;
    border-color: #FFD700;
    background: rgba(30, 30, 30, 0.9);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  ${({ as }) => as === 'textarea' && `
    min-height: 80px;
    resize: vertical;
  `}
`;

export const RewardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RewardItem = styled.div<{ used: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 1.2rem;
  background: rgba(20, 20, 20, 0.6);
  border-radius: 8px;
  transition: all 0.3s ease;
  opacity: ${props => props.used ? 0.7 : 1};
  
  &:hover {
    background: rgba(30, 30, 30, 0.8);
  }
`;

export const RewardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

export const RewardText = styled.span<{ used: boolean; isNote?: boolean }>`
  font-size: ${props => props.isNote ? '14px' : '16px'};
  color: ${props => {
    if (props.used) return '#888';
    if (props.isNote) return '#aaa';
    return '#FFD700';
  }};
  transition: all 0.3s ease;
  font-style: ${props => props.isNote ? 'italic' : 'normal'};
`;

export const RewardPrice = styled.span<{ used: boolean }>`
  font-size: 14px;
  color: ${props => props.used ? '#888' : '#4CAF50'};
  transition: all 0.3s ease;
`;

export const RewardLink = styled.a<{ used: boolean }>`
  font-size: 14px;
  color: ${props => props.used ? '#888' : '#3498db'};
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: ${props => props.used ? '#888' : '#2980b9'};
    text-decoration: underline;
  }
`;

export const AddButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
  color: black;
  border: none;
  padding: 1rem;
  font-size: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  transition: all 0.3s ease;
  border-radius: 4px;
  
  &:hover {
    color: white;
    background: rgba(255, 61, 0, 0.2);
  }
`;
