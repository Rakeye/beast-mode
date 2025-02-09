import React, { useState } from 'react';
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
  PresetContainer,
  PresetButton,
  MotivationalMessage,
  BeastModeButton,
  StopButton,
  RewardIcon,
  RewardSelect,
  TimeInput,
  TaskStats,
  TrackButton
} from './styles';
import type { Reward } from '../RewardManager';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  timestamp: number;
  rewardId?: number;
  predictedMinutes?: number;
  timeSpent?: number;
  isTracking?: boolean;
}

interface TimerState {
  isActive: boolean;
  timeRemaining: number;
  initialTime: number;
  motivationalMessage: string;
  isMessageTransitioning: boolean;
}

interface TaskManagerProps {
  tasks: Task[];
  rewards: Reward[];
  timerState: TimerState;
  onAddTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
  onToggleTaskCompletion: (taskId: number) => void;
  onToggleTaskTracking: (taskId: number) => void;
  onUpdateTimerState: (updates: Partial<TimerState>) => void;
  onStartTimer: () => void;
  onStopTimer: () => void;
}

const PRESET_TIMES = [
  { label: '15', value: 900 },
  { label: '30', value: 1800 },
  { label: '45', value: 2700 },
  { label: '60', value: 3600 }
];

const MOTIVATIONAL_MESSAGES = [
  "UNLEASH THE BEAST! 🦁",
  "CRUSH IT! 💪",
  "BEAST MODE ACTIVATED! 🔥",
  "UNSTOPPABLE! ⚡",
  "DOMINATE! 👊",
  "NO MERCY! 🐯",
  "FULL POWER! ⚔️",
  "MAXIMUM EFFORT! 🦾",
  "ELITE MODE! 🔱"
];

const TaskManager: React.FC<TaskManagerProps> = ({
  tasks,
  rewards,
  timerState,
  onAddTask,
  onDeleteTask,
  onToggleTaskCompletion,
  onToggleTaskTracking,
  onUpdateTimerState,
  onStartTimer,
  onStopTimer
}) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedReward, setSelectedReward] = useState<number | undefined>();
  const [predictedMinutes, setPredictedMinutes] = useState<number>(15);

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      onAddTask({
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false,
        timestamp: Date.now(),
        rewardId: selectedReward,
        predictedMinutes
      });
      setNewTaskText('');
      setSelectedReward(undefined);
      setPredictedMinutes(15);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handlePresetClick = (seconds: number) => {
    if (!timerState.isActive) {
      onUpdateTimerState({
        timeRemaining: seconds,
        initialTime: seconds,
        motivationalMessage: ''
      });
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimeSpent = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const updateMotivationalMessage = () => {
    onUpdateTimerState({ isMessageTransitioning: true });
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
      onUpdateTimerState({
        motivationalMessage: MOTIVATIONAL_MESSAGES[randomIndex],
        isMessageTransitioning: false
      });
    }, 400);
  };

  const handleStartTimer = () => {
    updateMotivationalMessage();
    onStartTimer();
  };

  return (
    <TaskManagerContainer>
      <InputContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <TaskInput
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What do you want to accomplish? Press Enter to add..."
            />
            <AddButton onClick={handleAddTask}>
              <span>+</span> Add Task
            </AddButton>
          </div>
          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <TimeInput
              type="number"
              min="1"
              max="480"
              value={predictedMinutes}
              onChange={(e) => setPredictedMinutes(Math.max(1, Math.min(480, parseInt(e.target.value) || 15)))}
              placeholder="Estimated time (minutes)"
            />
            <RewardSelect
              value={selectedReward || ''}
              onChange={(e) => setSelectedReward(Number(e.target.value) || undefined)}
            >
              <option value="">Select a reward (optional)</option>
              {rewards.map((reward) => (
                <option key={reward.id} value={reward.id}>
                  🎁 {reward.text}
                </option>
              ))}
            </RewardSelect>
          </div>
        </div>
      </InputContainer>

      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
              <TaskText
                completed={task.completed}
                onClick={() => onToggleTaskCompletion(task.id)}
                style={{ cursor: 'pointer' }}
              >
                {task.completed ? '✅' : '⬜️'} {task.text}
              </TaskText>
              <TaskStats>
                {task.predictedMinutes && (
                  <span title="Predicted time">⏱️ {task.predictedMinutes}m</span>
                )}
                <span title="Time spent">⌛ {formatTimeSpent(task.timeSpent || 0)}</span>
                <TrackButton
                  isTracking={task.isTracking}
                  onClick={() => onToggleTaskTracking(task.id)}
                  title={task.isTracking ? 'Stop tracking' : 'Start tracking'}
                >
                  {task.isTracking ? '⏸️' : '▶️'}
                </TrackButton>
              </TaskStats>
              {task.rewardId && (
                <TaskText completed={task.completed} isReward>
                  <RewardIcon>🎁</RewardIcon>
                  {rewards.find(r => r.id === task.rewardId)?.text}
                </TaskText>
              )}
            </div>
            <DeleteButton onClick={() => onDeleteTask(task.id)}>×</DeleteButton>
          </TaskItem>
        ))}
      </TaskList>

      <TimerContainer>
        <TimerDisplay>{formatTime(timerState.timeRemaining)}</TimerDisplay>
        <PresetContainer>
          {PRESET_TIMES.map(({ label, value }) => (
            <PresetButton
              key={label}
              active={timerState.initialTime === value}
              onClick={() => handlePresetClick(value)}
            >
              <span>⏱️</span> {label}
            </PresetButton>
          ))}
        </PresetContainer>
        {timerState.isActive ? (
          <StopButton onClick={onStopTimer}>
            <span>⏹️</span> Stop
          </StopButton>
        ) : (
          <BeastModeButton onClick={handleStartTimer}>
            Beast Mode 🦁
          </BeastModeButton>
        )}
        <MotivationalMessage transitioning={timerState.isMessageTransitioning}>
          {timerState.motivationalMessage}
        </MotivationalMessage>
      </TimerContainer>
    </TaskManagerContainer>
  );
};

export default TaskManager;
