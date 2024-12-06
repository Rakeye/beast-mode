import styled, { css } from 'styled-components';

export const TaskManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

export const TaskInput = styled.input`
  padding: 1rem;
  font-size: 1.2rem;
  background: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 4px;
  width: 100%;
  margin-bottom: 1rem;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
  }
`;

export const AddTaskButton = styled.button`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  border-radius: 4px;
  width: 100%;
  font-weight: bold;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Task = styled.div<{ completed: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 4px;
  border-left: 4px solid ${({ theme, completed }) => 
    completed ? theme.colors.success : theme.colors.primary};
  transition: all 0.3s ease;
  
  ${({ completed }) => completed && css`
    text-decoration: line-through;
    opacity: 0.7;
  `}

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    
    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const BeastModeButton = styled.button<{ active: boolean }>`
  padding: 2rem;
  font-size: 2rem;
  background: ${({ active, theme }) => active ? theme.colors.error : theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  width: 300px;
  height: 300px;
  margin: 2rem auto;
  font-weight: bold;
  box-shadow: 0 0 20px ${({ active, theme }) => active ? theme.colors.error : theme.colors.primary};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px ${({ active, theme }) => active ? theme.colors.error : theme.colors.primary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 200px;
    height: 200px;
    font-size: 1.5rem;
    padding: 1rem;
  }
`;

export const TimerDisplay = styled.div`
  font-size: 4rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  text-align: center;
  color: ${({ theme }) => theme.colors.accent};
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.accent};
  margin: 1rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 3rem;
  }
`;
