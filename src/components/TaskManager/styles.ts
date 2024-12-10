import styled, { keyframes, css } from 'styled-components';

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-10px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

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
  font-family: 'Roboto Condensed', sans-serif;
  
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
`;

export const TaskInput = styled.input`
  width: 100%;
  padding: 1.2rem 1.5rem;
  font-size: 18px;
  line-height: 1.5;
  background: rgba(20, 20, 20, 0.8);
  border: 2px solid transparent;
  color: white;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-family: 'Roboto Condensed', sans-serif;
  ${glassmorphism}

  &:focus {
    outline: none;
    border-color: #FF3D00;
    animation: ${glowAnimation} 2s infinite;
    background: rgba(30, 30, 30, 0.9);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-size: 18px;
    transition: color 0.3s ease;
  }

  &:focus::placeholder {
    color: rgba(255, 61, 0, 0.6);
  }
`;

export const PresetContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const PresetButton = styled.button`
  background: rgba(255, 61, 0, 0.1);
  color: white;
  border: 2px solid rgba(255, 61, 0, 0.3);
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  font-family: 'Industry', sans-serif;
  font-weight: 700;
  
  span {
    font-size: 0.8rem;
    opacity: 0.8;
    text-transform: uppercase;
    margin-top: 0.2rem;
  }
  
  &:hover {
    background: rgba(255, 61, 0, 0.2);
    border-color: rgba(255, 61, 0, 0.5);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const BeastModeButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 
    'linear-gradient(135deg, #D32F2F 0%, #C62828 100%)' : 
    'linear-gradient(135deg, #FF3D00 0%, #FF8A00 100%)'};
  color: white;
  border: none;
  width: 180px;
  height: 180px;
  font-size: 1.4rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-family: 'Industry', sans-serif;
  font-weight: 900;
  letter-spacing: 2px;
  animation: ${pulseAnimation} ${props => props.active ? '2s' : '0s'} infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: pre-line;
  line-height: 1.4;
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 5px 15px rgba(255, 61, 0, 0.4);
  }
  
  &:active {
    transform: translateY(0) scale(1);
  }
`;

export const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  margin-top: 2rem;
`;

export const TimerDisplay = styled.div`
  font-family: 'Goldman', monospace;
  font-size: 72px;
  font-weight: 700;
  color: white;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 56px;
  }
  
  @media (max-width: 480px) {
    font-size: 48px;
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
  background: linear-gradient(90deg, #FF3D00, #FF8A00);
  transition: width 1s linear;
`;

export const MotivationalMessage = styled.div`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin: 20px 0;
  height: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.4s ease-out;

  &.fade-out {
    opacity: 0;
  }
`;

export const AddButton = styled.button`
  background: linear-gradient(135deg, #FF3D00 0%, #FF8A00 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-family: 'Industry', sans-serif;
  font-weight: 700;
  letter-spacing: 0.5px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 61, 0, 0.4);
  }
  
  &:active {
    transform: translateY(0);
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
`;

export const TaskText = styled.span`
  flex: 1;
  color: white;
  font-size: 16px;
  line-height: 1.5;
  margin-right: 1rem;
  font-family: 'Roboto Condensed', sans-serif;
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
  font-family: 'Industry', sans-serif;

  &:hover {
    color: #FF3D00;
    background: rgba(255, 61, 0, 0.1);
    transform: scale(1.1);
  }
`;

export const StopButton = styled.button`
  background: rgba(255, 61, 0, 0.1);
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 61, 0, 0.3);
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Industry', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  margin-top: 1rem;
  
  &:hover {
    background: rgba(255, 61, 0, 0.2);
    color: rgba(255, 255, 255, 0.9);
  }
`;
