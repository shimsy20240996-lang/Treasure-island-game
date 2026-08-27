import { storyData } from '../data/story';

export const calculateProgress = (currentNodeId, discoveredLocations = []) => {
  if (!currentNodeId) return 0;
  if (currentNodeId === 'victory') return 100;
  if (currentNodeId === 'island_house') return 75;
  if (currentNodeId === 'lake') return 40;
  if (currentNodeId === 'start') return 10;
  // For game-over nodes, show what progress was made before death
  if (['fire', 'beasts', 'void'].includes(currentNodeId)) return 75;
  if (['trout'].includes(currentNodeId)) return 40;
  if (['hole'].includes(currentNodeId)) return 15;
  return Math.min(100, Math.round((discoveredLocations.length / 4) * 100));
};

export const formatTimePlayed = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getStoryNode = (nodeId) => {
  return storyData[nodeId] || storyData['start'];
};
