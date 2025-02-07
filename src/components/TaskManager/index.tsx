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
  ProgressBar,
  Progress,
  MotivationalMessage,
  PresetContainer,
  PresetButton,
  StopButton,
  BeastModeButton,
  RewardIcon,
  RewardSelect
} from './styles';
import type { Reward } from '../RewardManager';

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

interface TaskManagerProps {
  tasks: Task[];
  rewards: Reward[];
  timerState: TimerState;
  onAddTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
  onToggleTaskCompletion: (taskId: number) => void;
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
  onUpdateTimerState,
  onStartTimer,
  onStopTimer
}) => {
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedReward, setSelectedReward] = useState<number | undefined>(undefined);

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      onAddTask({
        id: Date.now(),
        text: newTaskText.trim(),
        completed: false,
        timestamp: Date.now(),
        rewardId: selectedReward
      });
      setNewTaskText('');
      setSelectedReward(undefined);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (): number => {
    return ((timerState.initialTime - timerState.timeRemaining) / timerState.initialTime) * 100;
  };

  const handlePresetClick = (minutes: number) => {
    if (!timerState.isActive) {
      const seconds = minutes * 60;
      onUpdateTimerState({
        timeRemaining: seconds,
        initialTime: seconds,
        motivationalMessage: ''
      });
    }
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
        <TaskInput
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
        />
        <RewardSelect
          value={selectedReward || ''}
          onChange={(e) => setSelectedReward(Number(e.target.value) || undefined)}
        >
          <option value="">No Reward</option>
          {rewards.map((reward) => (
            <option key={reward.id} value={reward.id}>
              {reward.emoji} {reward.name}
            </option>
          ))}
        </RewardSelect>
        <AddButton onClick={handleAddTask}>Add Task</AddButton>
      </InputContainer>

      <TimerContainer>
        <TimerDisplay>{formatTime(timerState.timeRemaining)}</TimerDisplay>
        <ProgressBar>
          <Progress width={getProgress()} />
        </ProgressBar>
        <PresetContainer>
          {PRESET_TIMES.map((preset) => (
            <PresetButton
              key={preset.value}
              active={timerState.initialTime === preset.value}
              onClick={() => handlePresetClick(preset.value / 60)}
              disabled={timerState.isActive}
            >
              {preset.label}
            </PresetButton>
          ))}
        </PresetContainer>
        {timerState.isActive ? (
          <StopButton onClick={onStopTimer}>Stop</StopButton>
        ) : (
          <BeastModeButton onClick={handleStartTimer}>Beast Mode 🦁</BeastModeButton>
        )}
        <MotivationalMessage transitioning={timerState.isMessageTransitioning}>
          {timerState.motivationalMessage}
        </MotivationalMessage>
      </TimerContainer>

      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
              <TaskText
                completed={task.completed}
                onClick={() => onToggleTaskCompletion(task.id)}
              >
                {task.text}
              </TaskText>
              {task.rewardId && (
                <TaskText completed={task.completed} isReward>
                  <RewardIcon>
                    {rewards.find(r => r.id === task.rewardId)?.emoji}
                  </RewardIcon>
                  {rewards.find(r => r.id === task.rewardId)?.name}
                </TaskText>
              )}
            </div>
            <DeleteButton onClick={() => onDeleteTask(task.id)}>×</DeleteButton>
          </TaskItem>
        ))}
      </TaskList>
    </TaskManagerContainer>
  );
};

export default TaskManager;
