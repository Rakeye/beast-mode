import React, { useState, useEffect } from 'react';
import {
  TaskManagerContainer,
  InputContainer,
  TaskInput,
  TaskList,
  TaskItem,
  TaskText,
  DeleteButton,
  AddButton,
  BeastModeButton,
  TimerDisplay,
  TimerContainer,
  TimerControls,
  TimerButton,
  ProgressBar,
  Progress,
  MotivationalMessage,
} from './styles';

interface TaskItem {
  id: number;
  text: string;
  completed: boolean;
  timeEstimate?: number;
  createdAt: number;
}

const TIMER_PRESETS = [
  { label: '20 min', value: 1200 },
  { label: '30 min', value: 1800 },
  { label: '45 min', value: 2700 },
  { label: '60 min', value: 3600 },
];

const MOTIVATIONAL_MESSAGES = [
  "DESTROY YOUR LIMITS! 💪",
  "BEAST MODE ACTIVATED! 🔥",
  "UNSTOPPABLE FORCE! ⚡",
  "CRUSH IT! 🦁",
  "NO PAIN NO GAIN! 💯",
];

const STORAGE_KEY = 'beastmode_tasks';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        // Sort tasks by creation time, newest first
        return parsedTasks.sort((a: TaskItem, b: TaskItem) => b.createdAt - a.createdAt);
      } catch (e) {
        console.error('Error parsing saved tasks:', e);
        return [];
      }
    }
    return [];
  });

  const [newTask, setNewTask] = useState('');
  const [isBeastMode, setIsBeastMode] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [initialTime, setInitialTime] = useState(1800);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);

  const handleAddTask = React.useCallback(() => {
    if (newTask.trim()) {
      const task: TaskItem = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: Date.now()
      };
      setTasks(prevTasks => [task, ...prevTasks]); // Add new tasks to the top
      setNewTask('');
    }
  }, [newTask]);

  const handleKeyPress = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  }, [handleAddTask]);

  const toggleTaskComplete = React.useCallback((taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const deleteTask = React.useCallback((taskId: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const updateMotivationalMessage = React.useCallback(() => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
    setMotivationalMessage(MOTIVATIONAL_MESSAGES[randomIndex]);
  }, []);

  const startTimer = React.useCallback((duration: number) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setInitialTime(duration);
    setTimeRemaining(duration);
    setIsBeastMode(true);
    updateMotivationalMessage();

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          setIsBeastMode(false);
          if (audioRef.current) {
            audioRef.current.play().catch(console.error);
          }
          return 0;
        }
        if (prev % 300 === 0) { // Update message every 5 minutes
          updateMotivationalMessage();
        }
        return prev - 1;
      });
    }, 1000);
  }, [updateMotivationalMessage]);

  const stopTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsBeastMode(false);
    setTimeRemaining(initialTime);
  }, [initialTime]);

  const getProgress = React.useCallback(() => {
    return ((initialTime - timeRemaining) / initialTime) * 100;
  }, [initialTime, timeRemaining]);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <TaskManagerContainer>
      <InputContainer>
        <TaskInput
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="ADD YOUR NEXT CONQUEST!"
        />
        <AddButton onClick={handleAddTask}>ADD TASK</AddButton>
      </InputContainer>

      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id} completed={task.completed}>
            <TaskText>{task.text}</TaskText>
            <DeleteButton 
              onClick={() => deleteTask(task.id)}
              title="Delete task"
              style={{ marginLeft: '0.5rem' }}
            >
              ❌
            </DeleteButton>
            <DeleteButton 
              onClick={() => toggleTaskComplete(task.id)}
              title={task.completed ? 'Task Completed!' : 'Click to complete'}
            >
              {task.completed ? '🏆' : '💪'}
            </DeleteButton>
          </TaskItem>
        ))}
      </TaskList>

      {tasks.length > 0 && (
        <TimerContainer>
          <TimerDisplay isActive={isBeastMode}>{formatTime(timeRemaining)}</TimerDisplay>
          
          {isBeastMode && (
            <>
              <ProgressBar>
                <Progress progress={getProgress()} />
              </ProgressBar>
              <MotivationalMessage>{motivationalMessage}</MotivationalMessage>
            </>
          )}

          {!isBeastMode && (
            <TimerControls>
              {TIMER_PRESETS.map(preset => (
                <TimerButton
                  key={preset.value}
                  onClick={() => startTimer(preset.value)}
                  variant="secondary"
                >
                  {preset.label}
                </TimerButton>
              ))}
            </TimerControls>
          )}

          <BeastModeButton 
            onClick={() => isBeastMode ? stopTimer() : startTimer(1800)}
            active={isBeastMode}
          >
            {isBeastMode ? 'STOP\nBEAST MODE' : 'ACTIVATE\nBEAST MODE'}
          </BeastModeButton>
        </TimerContainer>
      )}
    </TaskManagerContainer>
  );
};

export default TaskManager;
