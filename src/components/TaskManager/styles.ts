import styled, { keyframes } from 'styled-components';
import { glassmorphism } from '../../styles/theme';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glowAnimation = keyframes`
  0%, 100% { box-shadow: 0 0 2px rgba(255, 61, 0, 0.2); }
  50% { box-shadow: 0 0 5px rgba(255, 61, 0, 0.5); }
`;

export const TaskManagerContainer = styled.div`
  padding: 2rem;
  border-radius: 20px;
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const TaskInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.1rem;
  padding: 0.5rem;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-bottom-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  padding: 1.5rem;
  border-radius: 12px;
  min-height: 100px;
`;

export const TaskItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(4px);
  }
`;

export const TaskText = styled.div<{ completed?: boolean; isReward?: boolean }>`
  color: ${props => props.completed ? 'rgba(255, 255, 255, 0.5)' : props.theme.colors.text};
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  flex: 1;
  font-size: ${props => props.isReward ? '0.9rem' : '1rem'};
  opacity: ${props => props.isReward ? 0.8 : 1};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.completed ? 'rgba(255, 255, 255, 0.7)' : props.theme.colors.text};
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
  gap: 1.5rem;
  margin: 2rem 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  position: relative;
`;

export const TimerDisplay = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-shadow: 0 0 20px rgba(255, 61, 0, 0.3);
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
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
  margin: 1rem 0;
`;

export const PresetButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(255, 61, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 61, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export const BeastModeButton = styled.button`
  background: linear-gradient(135deg, #FF3D00 0%, #FF8A00 100%);
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${pulseAnimation} 2s infinite ease-in-out;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(255, 61, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 61, 0, 0.4);
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
  font-size: 1.1rem;
  margin-right: 4px;
`;

export const RewardSelect = styled.select`
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: ${props => props.theme.colors.text};
  padding: 0.8rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary};
  }
  
  option {
    background: #1E1E1E;
    color: ${props => props.theme.colors.text};
    padding: 8px;
  }
`;

export const TimeInput = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: ${props => props.theme.colors.text};
  padding: 0.8rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  width: 150px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary};
  }
  
  &::-webkit-inner-spin-button {
    opacity: 1;
  }
`;

export const TaskStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
  padding-left: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  
  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

export const TrackButton = styled.button<{ isTracking?: boolean }>`
  background: none;
  border: none;
  color: ${props => props.isTracking ? props.theme.colors.primary : props.theme.colors.text};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.1);
  }
`;
