import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px #FF3D00; }
  50% { box-shadow: 0 0 20px #FF3D00; }
  100% { box-shadow: 0 0 5px #FF3D00; }
`;

export const TaskManagerContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const TaskInput = styled.input`
  width: 100%;
  padding: 1.2rem;
  font-size: 1.4rem;
  background: #1E1E1E;
  border: 2px solid #FF3D00;
  color: white;
  border-radius: 4px;

  &:focus {
    outline: none;
    animation: ${glowAnimation} 1.5s infinite;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const AddTaskButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  font-size: 1.4rem;
  background: #FF3D00;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;

  &:hover {
    background: #FF6E40;
    transform: scale(1.02);
  }
`;

export const TaskList = styled.div`
  margin-top: 2rem;
`;

export const Task = styled.div<{ completed: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem 0;
  background: ${props => props.completed ? '#1B5E20' : '#1E1E1E'};
  border-radius: 4px;
  transition: all 0.3s ease;

  span {
    text-decoration: ${props => props.completed ? 'line-through' : 'none'};
    color: ${props => props.completed ? '#A5D6A7' : 'white'};
  }

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const TimerContainer = styled.div`
  margin: 2rem 0;
  text-align: center;
`;

export const TimerDisplay = styled.div<{ isActive?: boolean }>`
  font-size: 3.5rem;
  font-weight: bold;
  color: ${props => props.isActive ? '#FF3D00' : 'white'};
  margin: 1rem 0;
  animation: ${props => props.isActive ? pulseAnimation : 'none'} 1s infinite;
`;

export const TimerControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

export const TimerButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background: ${props => props.variant === 'primary' ? '#FF3D00' : '#1E1E1E'};
  color: white;
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid #FF3D00'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.variant === 'primary' ? '#FF6E40' : '#2E2E2E'};
    transform: scale(1.05);
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #1E1E1E;
  border-radius: 5px;
  margin: 1rem 0;
  overflow: hidden;
`;

export const Progress = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background: #FF3D00;
  transition: width 1s linear;
`;

export const BeastModeButton = styled.button<{ active: boolean }>`
  width: 200px;
  height: 200px;
  padding: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  background: ${props => props.active ? '#FF3D00' : '#1E1E1E'};
  color: white;
  border: 2px solid #FF3D00;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 2rem auto;
  display: block;
  animation: ${props => props.active ? glowAnimation : 'none'} 1.5s infinite;

  &:hover {
    background: ${props => props.active ? '#FF6E40' : '#2E2E2E'};
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
    font-size: 1.2rem;
  }
`;

export const MotivationalMessage = styled.div`
  font-size: 1.2rem;
  color: #FFD600;
  text-align: center;
  margin: 1rem 0;
  font-weight: bold;
  text-transform: uppercase;
`;
