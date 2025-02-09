import React from 'react';
import {
  SidebarContainer,
  Logo,
  NavList,
  NavItem,
  Icon
} from './styles';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSectionChange
}) => {
  return (
    <SidebarContainer>
      <Logo>
        <Icon>🦁</Icon>
        <span>Beast Mode</span>
      </Logo>
      
      <NavList>
        <NavItem
          active={activeSection === 'tasks'}
          onClick={() => onSectionChange('tasks')}
        >
          <Icon>📝</Icon>
          <span>Tasks</span>
        </NavItem>
        
        <NavItem
          active={activeSection === 'rewards'}
          onClick={() => onSectionChange('rewards')}
        >
          <Icon>🎁</Icon>
          <span>Rewards</span>
        </NavItem>
        
        <NavItem
          active={activeSection === 'stats'}
          onClick={() => onSectionChange('stats')}
        >
          <Icon>📊</Icon>
          <span>Stats</span>
        </NavItem>
        
        <NavItem
          active={activeSection === 'settings'}
          onClick={() => onSectionChange('settings')}
        >
          <Icon>⚙️</Icon>
          <span>Settings</span>
        </NavItem>
      </NavList>
    </SidebarContainer>
  );
};
