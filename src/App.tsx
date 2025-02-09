import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import TaskManager from './components/TaskManager';
import { RewardManager } from './components/RewardManager';
import { Sidebar } from './components/Sidebar';
import { GlobalStyle, theme } from './styles/theme';
import { AppContainer, MainContent } from './styles/AppStyles';
import type { Reward } from './components/RewardManager';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  timestamp: number;
  rewardId?: number;
}

interface TimerState {
  isActive: boolean;
  timeRemaining: number;
  initialTime: number;
  motivationalMessage: string;
  isMessageTransitioning: boolean;
}

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('tasks');
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [timerState, setTimerState] = useState<TimerState>({
    isActive: false,
    timeRemaining: 1800,
    initialTime: 1800,
    motivationalMessage: '',
    isMessageTransitioning: false
  });
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        if (!task.completed && task.rewardId) {
          handleToggleRewardUsed(task.rewardId);
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const handleAddReward = (reward: Reward) => {
    setRewards([...rewards, reward]);
  };

  const handleDeleteReward = (id: number) => {
    setRewards(rewards.filter(reward => reward.id !== id));
  };

  const handleToggleRewardUsed = (id: number) => {
    setRewards(rewards.map(reward =>
      reward.id === id ? { ...reward, used: !reward.used } : reward
    ));
  };

  const handleUpdateTimerState = (updates: Partial<TimerState>) => {
    setTimerState(current => ({ ...current, ...updates }));
  };

  const handleStartTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    handleUpdateTimerState({ isActive: true });
    
    timerRef.current = setInterval(() => {
      setTimerState(current => {
        if (current.timeRemaining <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          if (audioRef.current) {
            audioRef.current.play();
          }
          return {
            ...current,
            isActive: false,
            timeRemaining: 0
          };
        }
        return {
          ...current,
          timeRemaining: current.timeRemaining - 1
        };
      });
    }, 1000);
  };

  const handleStopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    handleUpdateTimerState({
      isActive: false,
      timeRemaining: timerState.initialTime
    });
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <audio ref={audioRef} src="/lion-roar.flac" preload="auto" />
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <MainContent>
          {activeSection === 'tasks' ? (
            <TaskManager
              tasks={tasks}
              rewards={rewards}
              timerState={timerState}
              onAddTask={handleAddTask}
              onDeleteTask={handleDeleteTask}
              onToggleTaskCompletion={handleToggleTaskCompletion}
              onUpdateTimerState={handleUpdateTimerState}
              onStartTimer={handleStartTimer}
              onStopTimer={handleStopTimer}
            />
          ) : activeSection === 'rewards' ? (
            <RewardManager
              rewards={rewards}
              onAddReward={handleAddReward}
              onDeleteReward={handleDeleteReward}
              onToggleRewardUsed={handleToggleRewardUsed}
            />
          ) : activeSection === 'stats' ? (
            <div>Stats Coming Soon!</div>
          ) : (
            <div>Settings Coming Soon!</div>
          )}
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
