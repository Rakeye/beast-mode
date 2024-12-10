import styled, { keyframes, css } from 'styled-components';

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.02); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
`;

const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 61, 0, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 61, 0, 0.8); }
  100% { box-shadow: 0 0 5px rgba(255, 61, 0, 0.5); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glassmorphism = css`
  background: rgba(30, 30, 30, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
`;

export const TaskManagerContainer = styled.div`
  padding: 2.5rem;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  ${glassmorphism}
  border-radius: 16px;
  animation: ${fadeIn} 0.6s ease-out;
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    margin: 0 1rem;
    width: calc(100% - 2rem);
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  margin: 0 auto;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 61, 0, 0.5),
      transparent
    );
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

export const TaskInput = styled.input`
  width: 100%;
  padding: 1.2rem 1.5rem;
  font-size: 1.4rem;
  background: rgba(20, 20, 20, 0.8);
  border: 2px solid transparent;
  color: white;
  border-radius: 12px;
  transition: all 0.3s ease;
  ${glassmorphism}

  &:focus {
    outline: none;
    border-color: #FF3D00;
    animation: ${glowAnimation} 2s infinite;
    background: rgba(30, 30, 30, 0.9);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.4rem;
    transition: color 0.3s ease;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
    
    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  &:focus::placeholder {
    color: rgba(255, 61, 0, 0.6);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 1rem 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.9rem 1rem;
  }
`;

export const TaskList = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TaskItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  background: rgba(20, 20, 20, 0.6);
  border-radius: 8px;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.4s ease-out;
  ${glassmorphism}

  &:hover {
    transform: translateX(4px);
    background: rgba(30, 30, 30, 0.8);
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1rem;
  }
`;

export const TaskText = styled.span`
  flex: 1;
  color: white;
  font-size: 1.1rem;
  margin-right: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #FF3D00;
    background: rgba(255, 61, 0, 0.1);
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.4rem;
  }
`;

export const AddButton = styled.button`
  background: linear-gradient(135deg, #FF3D00 0%, #FF8A00 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 61, 0, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 1.6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.7rem 1.4rem;
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
