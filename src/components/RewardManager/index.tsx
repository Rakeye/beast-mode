import React, { useState } from 'react';
import {
  RewardManagerContainer,
  RewardInput,
  RewardList,
  RewardItem,
  RewardText,
  AddButton,
  DeleteButton,
  RewardForm,
  RewardLink,
  RewardDetails,
  RewardPrice,
} from './styles';

export interface Reward {
  id: number;
  text: string;
  used: boolean;
  link?: string;
  price?: string;
  emoji?: string;
  name?: string;
  notes?: string;
}

interface RewardManagerProps {
  rewards: Reward[];
  onAddReward: (reward: Reward) => void;
  onDeleteReward: (id: number) => void;
  onToggleRewardUsed: (id: number) => void;
}

export const RewardManager: React.FC<RewardManagerProps> = ({
  rewards,
  onAddReward,
  onDeleteReward,
  onToggleRewardUsed,
}) => {
  const [newReward, setNewReward] = useState('');
  const [newRewardLink, setNewRewardLink] = useState('');
  const [newRewardPrice, setNewRewardPrice] = useState('');
  const [newRewardNotes, setNewRewardNotes] = useState('');

  const handleAddReward = () => {
    if (newReward.trim()) {
      const reward: Reward = {
        id: Date.now(),
        text: newReward.trim(),
        used: false,
        link: newRewardLink.trim() || undefined,
        price: newRewardPrice.trim() || undefined,
        notes: newRewardNotes.trim() || undefined,
      };
      onAddReward(reward);
      setNewReward('');
      setNewRewardLink('');
      setNewRewardPrice('');
      setNewRewardNotes('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddReward();
    }
  };

  return (
    <RewardManagerContainer>
      <h2>🎁 Reward Bank</h2>
      <RewardForm>
        <RewardInput
          value={newReward}
          onChange={(e) => setNewReward(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Reward name..."
        />
        <RewardInput
          value={newRewardLink}
          onChange={(e) => setNewRewardLink(e.target.value)}
          placeholder="Link (optional)..."
        />
        <RewardInput
          value={newRewardPrice}
          onChange={(e) => setNewRewardPrice(e.target.value)}
          placeholder="Price (optional)..."
        />
        <RewardInput
          value={newRewardNotes}
          onChange={(e) => setNewRewardNotes(e.target.value)}
          placeholder="Notes (optional)..."
          as="textarea"
        />
        <AddButton onClick={handleAddReward}>Add Reward</AddButton>
      </RewardForm>
      <RewardList>
        {rewards.map((reward) => (
          <RewardItem key={reward.id} used={reward.used}>
            <RewardDetails>
              <RewardText used={reward.used}>
                {reward.used ? '🔒' : '💎'} {reward.text}
              </RewardText>
              {reward.price && (
                <RewardPrice used={reward.used}>
                  💰 {reward.price}
                </RewardPrice>
              )}
              {reward.link && (
                <RewardLink 
                  href={reward.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  used={reward.used}
                >
                  🔗 View Reward
                </RewardLink>
              )}
              {reward.notes && (
                <RewardText used={reward.used} isNote>
                  📝 {reward.notes}
                </RewardText>
              )}
            </RewardDetails>
            <div>
              <DeleteButton
                onClick={() => onToggleRewardUsed(reward.id)}
                title={reward.used ? 'Make available' : 'Mark as used'}
              >
                {reward.used ? '🔓' : '🔒'}
              </DeleteButton>
              <DeleteButton
                onClick={() => onDeleteReward(reward.id)}
                title="Delete reward"
              >
                🗑️
              </DeleteButton>
            </div>
          </RewardItem>
        ))}
      </RewardList>
    </RewardManagerContainer>
  );
};
