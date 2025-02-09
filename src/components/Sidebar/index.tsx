import React from 'react';
import { SidebarContainer, Logo, NavLink } from './styles';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <SidebarContainer>
      <Logo>
        <span>🦁</span>
        <span>Beast Mode</span>
      </Logo>
      <NavLink
        href="#"
        active={activeSection === 'tasks'}
        onClick={(e) => {
          e.preventDefault();
          onSectionChange('tasks');
        }}
      >
        <span>🔥</span>
        <span>Tasks</span>
      </NavLink>
      <NavLink
        href="#"
        active={activeSection === 'rewards'}
        onClick={(e) => {
          e.preventDefault();
          onSectionChange('rewards');
        }}
      >
        <span>🎁</span>
        <span>Rewards</span>
      </NavLink>
    </SidebarContainer>
  );
};
