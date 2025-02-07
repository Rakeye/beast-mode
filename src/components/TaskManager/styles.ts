import styled, { keyframes } from 'styled-components';
import { glassmorphism } from '../../styles/theme';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glowAnimation = keyframes`
  0%, 100% { box-shadow: 0 0 2px rgba(255, 61, 0, 0.2); }
  50% { box-shadow: 0 0 5px rgba(255, 61, 0, 0.5); }
`;

export const TaskManagerContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  ${glassmorphism}
  padding: 2rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 12px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TaskInput = styled.input`
  flex: 1;
  padding: 1rem 1.2rem;
  font-size: 1rem;
  background: rgba(30, 30, 30, 0.8);
  border: 2px solid transparent;
  border-radius: 12px;
  color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TaskItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(30, 30, 30, 0.8);
  border-radius: 12px;
  animation: ${fadeIn} 0.3s ease-out;
  ${glassmorphism}
  
  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`;

export const TaskText = styled.span<{ completed: boolean; isReward?: boolean }>`
  flex: 1;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  opacity: ${props => props.completed ? 0.7 : 1};
  color: ${props => props.isReward ? '#FFD700' : 'white'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.error};
    background: rgba(255, 0, 0, 0.1);
  }
`;

export const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 61, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

export const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(30, 30, 30, 0.8);
  border-radius: 16px;
  ${glassmorphism}
`;

export const TimerDisplay = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0 0 10px rgba(255, 61, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

export const Progress = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  transition: width 1s linear;
`;

export const PresetContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const PresetButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'rgba(255, 61, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 61, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

export const BeastModeButton = styled.button`
  background: linear-gradient(135deg, #FF3D00 0%, #FF8A00 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 61, 0, 0.4);
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`;

export const StopButton = styled.button`
  background: rgba(255, 0, 0, 0.2);
  color: white;
  border: 2px solid ${({ theme }) => theme.colors.error};
  padding: 0.8rem 2rem;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 0, 0, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
  }
`;

export const MotivationalMessage = styled.div<{ transitioning: boolean }>`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  opacity: ${props => props.transitioning ? 0 : 1};
  transform: translateY(${props => props.transitioning ? '10px' : '0'});
  transition: all 0.5s ease;
  min-height: 1.5em;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const RewardIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

export const RewardSelect = styled.select`
  padding: 0.8rem 1rem;
  background: rgba(30, 30, 30, 0.8);
  border: 2px solid transparent;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
  }
`;
