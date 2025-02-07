import React from 'react';
import {
  TabContainer,
  TabList,
  TabButton,
} from './styles';

interface TabManagerProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabManager: React.FC<TabManagerProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <TabContainer>
      <TabList>
        <TabButton
          active={activeTab === 'tasks'}
          onClick={() => onTabChange('tasks')}
        >
          🔥 Tasks
        </TabButton>
        <TabButton
          active={activeTab === 'rewards'}
          onClick={() => onTabChange('rewards')}
        >
          🎁 Rewards
        </TabButton>
      </TabList>
    </TabContainer>
  );
};
