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
  TimerDisplay,
  TimerContainer,
  ProgressBar,
  Progress,
  MotivationalMessage,
  PresetContainer,
  PresetButton,
  StopButton,
  BeastModeButton
} from './styles';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  timestamp: number;
}

const MOTIVATIONAL_MESSAGES = [
  "CRUSH IT! 💪",
  "NO MERCY! 🔥",
  "BEAST MODE ACTIVATED! 🦁",
  "UNSTOPPABLE! ⚡️",
  "DOMINATE! 👊",
  "LEVEL UP! 🚀",
  "MAXIMUM EFFORT! 💯",
  "PURE POWER! 💪",
  "LEGENDARY! 🏆",
  "ELITE MODE! 🔱"
];

const TIMER_PRESETS = [
  { label: '15', value: 900 },
  { label: '30', value: 1800 },
  { label: '45', value: 2700 },
  { label: '60', value: 3600 },
];

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [initialTime, setInitialTime] = useState(1800);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [isMessageTransitioning, setIsMessageTransitioning] = useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks:', error);
        setTasks([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        timestamp: Date.now(),
      };
      setTasks([task, ...tasks]);
      setNewTask('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const toggleTaskComplete = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const updateMotivationalMessage = () => {
    setIsMessageTransitioning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
      setMotivationalMessage(MOTIVATIONAL_MESSAGES[randomIndex]);
      setIsMessageTransitioning(false);
    }, 400); // Match the duration of the fade-out animation
  };

  const handleTimeSelect = (duration: number) => {
    setSelectedTime(prev => prev === duration ? null : duration);
  };

  const startTimer = () => {
    if (selectedTime === null) return;
    
    setInitialTime(selectedTime);
    setTimeRemaining(selectedTime);
    setIsTimerActive(true);
    updateMotivationalMessage();
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          if (audioRef.current) {
            audioRef.current.play();
          }
          setIsTimerActive(false);
          setSelectedTime(null);
          return 0;
        }
        if (prev % 300 === 0) { // Update message every 5 minutes
          updateMotivationalMessage();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsTimerActive(false);
    setTimeRemaining(initialTime);
  };

  const getProgress = () => {
    return ((initialTime - timeRemaining) / initialTime) * 100;
  };

  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
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
          placeholder="Add your next conquest!"
        />
        <AddButton onClick={handleAddTask}>Add Task</AddButton>
      </InputContainer>

      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id}>
            <TaskText>{task.text}</TaskText>
            <div>
              <DeleteButton 
                onClick={() => toggleTaskComplete(task.id)}
                title={task.completed ? 'Task Completed!' : 'Click to complete'}
              >
                {task.completed ? '🏆' : '💪'}
              </DeleteButton>
              <DeleteButton 
                onClick={() => handleDeleteTask(task.id)}
                title="Delete task"
              >
                ❌
              </DeleteButton>
            </div>
          </TaskItem>
        ))}
      </TaskList>

      <TimerContainer>
        {!isTimerActive ? (
          <>
            <PresetContainer>
              {TIMER_PRESETS.map((preset) => (
                <PresetButton
                  key={preset.value}
                  onClick={() => handleTimeSelect(preset.value)}
                  selected={selectedTime === preset.value}
                >
                  {preset.label}
                  <span>min</span>
                </PresetButton>
              ))}
            </PresetContainer>
            <BeastModeButton 
              onClick={startTimer}
              disabled={selectedTime === null}
            >
              ACTIVATE{'\n'}BEAST MODE
            </BeastModeButton>
          </>
        ) : (
          <>
            <TimerDisplay>{formatTime(timeRemaining)}</TimerDisplay>
            <ProgressBar>
              <Progress width={getProgress()} />
            </ProgressBar>
            <MotivationalMessage className={isMessageTransitioning ? 'fade-out' : ''}>
              {motivationalMessage}
            </MotivationalMessage>
            <StopButton onClick={stopTimer}>
              STOP BEAST MODE
            </StopButton>
          </>
        )}
      </TimerContainer>
    </TaskManagerContainer>
  );
};

export default TaskManager;
