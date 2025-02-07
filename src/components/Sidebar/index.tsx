import React from 'react';
import {
  SidebarContainer,
  Logo,
  NavLinks,
  NavLink
} from './styles';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <SidebarContainer>
      <Logo>
        <span>🦁</span>
        Beast Mode
      </Logo>
      <NavLinks>
        <NavLink
          active={activeTab === 'tasks'}
          onClick={() => onTabChange('tasks')}
        >
          🔥 Tasks
        </NavLink>
        <NavLink
          active={activeTab === 'rewards'}
          onClick={() => onTabChange('rewards')}
        >
          🎁 Rewards
        </NavLink>
      </NavLinks>
    </SidebarContainer>
  );
};
