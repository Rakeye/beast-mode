import React, { useState, useCallback, useEffect } from 'react';
import { 
  TaskManagerContainer, 
  TaskInput, 
  AddTaskButton, 
  TaskList,
  Task,
  BeastModeButton,
  TimerDisplay
} from './styles';

interface TaskItem {
  id: number;
  text: string;
  completed: boolean;
  timeEstimate?: number; // in minutes
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isBeastMode, setIsBeastMode] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  let timerInterval: NodeJS.Timeout | null = null;

  const handleAddTask = useCallback(() => {
    if (newTask.trim()) {
      const task: TaskItem = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false
      };
      setTasks(prevTasks => [...prevTasks, task]);
      setNewTask('');
    }
  }, [newTask]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  }, [handleAddTask]);

  const toggleTaskComplete = useCallback((taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const toggleBeastMode = useCallback(() => {
    setIsBeastMode(prev => !prev);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isBeastMode) {
      timerInterval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 0) {
            setIsBeastMode(false);
            return 1800; // Reset to 30 minutes
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isBeastMode]);

  const getTaskEmoji = (completed: boolean) => {
    if (completed) return '🏆';
    return isBeastMode ? '💪' : '⚡';
  };

  const getMotivationalMessage = () => {
    if (tasks.length === 0) return 'ADD YOUR FIRST CONQUEST!';
    if (tasks.every(task => task.completed)) return 'ABSOLUTE BEAST! ADD MORE TASKS!';
    return 'CRUSH YOUR TASKS!';
  };

  return (
    <TaskManagerContainer>
      <div>
        <TaskInput
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={getMotivationalMessage()}
        />
        <AddTaskButton onClick={handleAddTask}>ADD TASK</AddTaskButton>
      </div>

      <TaskList>
        {tasks.map((task) => (
          <Task key={task.id} completed={task.completed}>
            <span>{task.text}</span>
            <button 
              onClick={() => toggleTaskComplete(task.id)}
              title={task.completed ? 'Task Completed!' : 'Click to complete'}
            >
              {getTaskEmoji(task.completed)}
            </button>
          </Task>
        ))}
      </TaskList>

      {tasks.length > 0 && (
        <>
          <TimerDisplay>{formatTime(timeRemaining)}</TimerDisplay>
          <BeastModeButton 
            onClick={toggleBeastMode}
            active={isBeastMode}
          >
            {isBeastMode ? 'STOP BEAST MODE' : 'ACTIVATE BEAST MODE'}
          </BeastModeButton>
        </>
      )}
    </TaskManagerContainer>
  );
};

export default TaskManager;
