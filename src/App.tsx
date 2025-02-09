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
  predictedMinutes?: number;
  timeSpent: number; // Total time spent in seconds
  isTracking: boolean; // Whether the task is currently being tracked
  lastTrackingStart?: number; // Timestamp when tracking started
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

  const handleAddTask = (task: Omit<Task, 'timeSpent' | 'isTracking'>) => {
    setTasks([...tasks, { ...task, timeSpent: 0, isTracking: false }]);
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

  const handleToggleTaskTracking = (taskId: number) => {
    const now = Date.now();
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        if (task.isTracking) {
          // Stop tracking and add elapsed time
          const elapsedSeconds = task.lastTrackingStart 
            ? Math.floor((now - task.lastTrackingStart) / 1000)
            : 0;
          return {
            ...task,
            isTracking: false,
            lastTrackingStart: undefined,
            timeSpent: task.timeSpent + elapsedSeconds
          };
        } else {
          // Start tracking
          return {
            ...task,
            isTracking: true,
            lastTrackingStart: now
          };
        }
      } else {
        return task;
      }
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

  useEffect(() => {
    if (timerState.isActive) {
      const trackingInterval = setInterval(() => {
        const now = Date.now();
        setTasks(currentTasks => 
          currentTasks.map(task => {
            if (task.isTracking && task.lastTrackingStart) {
              const elapsedSeconds = Math.floor((now - task.lastTrackingStart) / 1000);
              return {
                ...task,
                timeSpent: task.timeSpent + elapsedSeconds,
                lastTrackingStart: now
              };
            }
            return task;
          })
        );
      }, 1000);

      return () => clearInterval(trackingInterval);
    }
  }, [timerState.isActive]);

  useEffect(() => {
    if (!timerState.isActive) {
      const now = Date.now();
      setTasks(currentTasks =>
        currentTasks.map(task => {
          if (task.isTracking && task.lastTrackingStart) {
            const elapsedSeconds = Math.floor((now - task.lastTrackingStart) / 1000);
            return {
              ...task,
              isTracking: false,
              lastTrackingStart: undefined,
              timeSpent: task.timeSpent + elapsedSeconds
            };
          }
          return task;
        })
      );
    }
  }, [timerState.isActive]);

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
              onToggleTaskTracking={handleToggleTaskTracking}
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
