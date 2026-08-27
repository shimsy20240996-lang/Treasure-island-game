import { useState, useEffect, useCallback, useRef } from 'react';
import { storyData } from '../data/story';
import sound from '../utils/audio';

const STORAGE_KEY = 'TREASURE_ISLAND_SAVE_V2';
const SETTINGS_KEY = 'TREASURE_ISLAND_SETTINGS_V2';

const defaultSettings = {
  masterVolume: 0.8,
  musicVolume: 0.6,
  sfxVolume: 0.8,
  isMuted: false,
  isMusicMuted: false,
  isSfxMuted: false,
  reducedMotion: false,
  highContrast: false,
  typewriterSpeed: 'normal' // 'slow', 'normal', 'fast', 'instant'
};

const initialGameState = {
  screen: 'menu', // 'menu' | 'intro' | 'game' | 'gameover' | 'victory'
  currentNodeId: 'start',
  health: 100,
  coins: 0,
  inventory: ['compass'],
  discoveredLocations: ['crossroad'],
  completedLocations: [],
  history: [],
  timePlayed: 0,
  choicesMade: 0,
  deathsCount: 0,
  victoriesCount: 0,
  unlockedAchievements: ['first_step']
};

export const useGameState = () => {
  // Load saved settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // Load saved game or default
  const [gameState, setGameState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only return if it is in valid state
        if (parsed && parsed.currentNodeId && storyData[parsed.currentNodeId]) {
          return { ...initialGameState, ...parsed, screen: 'menu' };
        }
      }
    } catch (e) {
      console.warn('Failed to load save state:', e);
    }
    return initialGameState;
  });

  const [hasSave, setHasSave] = useState(false);
  const timerRef = useRef(null);

  // Check if save exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.currentNodeId && parsed.currentNodeId !== 'start') {
          setHasSave(true);
          return;
        }
      }
    } catch (e) {}
    setHasSave(false);
  }, [gameState]);

  // Sync settings to sound engine and localStorage
  useEffect(() => {
    sound.setMasterVolume(settings.masterVolume);
    sound.setMusicVolume(settings.musicVolume);
    sound.setSfxVolume(settings.sfxVolume);
    if (settings.isMuted !== sound.isMuted) sound.toggleMute();
    if (settings.isMusicMuted !== sound.isMusicMuted) sound.toggleMusic();
    if (settings.isSfxMuted !== sound.isSfxMuted) sound.toggleSfx();

    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {}
  }, [settings]);

  // Timer for active gameplay
  useEffect(() => {
    if (gameState.screen === 'game') {
      timerRef.current = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timePlayed: prev.timePlayed + 1
        }));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState.screen]);

  // Save game state automatically
  const saveCurrentGame = useCallback((stateToSave) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentNodeId: stateToSave.currentNodeId,
        health: stateToSave.health,
        coins: stateToSave.coins,
        inventory: stateToSave.inventory,
        discoveredLocations: stateToSave.discoveredLocations,
        completedLocations: stateToSave.completedLocations,
        history: stateToSave.history,
        timePlayed: stateToSave.timePlayed,
        choicesMade: stateToSave.choicesMade,
        deathsCount: stateToSave.deathsCount,
        victoriesCount: stateToSave.victoriesCount,
        unlockedAchievements: stateToSave.unlockedAchievements
      }));
      setHasSave(true);
    } catch (e) {
      console.warn('Could not save game:', e);
    }
  }, []);

  // Start New Game
  const startNewGame = useCallback(() => {
    sound.playClick();
    sound.startOceanAmbience();
    const newState = {
      ...initialGameState,
      screen: 'intro',
      timePlayed: 0,
      choicesMade: 0,
      inventory: ['compass'],
      discoveredLocations: ['crossroad'],
      unlockedAchievements: ['first_step']
    };
    setGameState(newState);
    saveCurrentGame(newState);
  }, [saveCurrentGame]);

  // Continue Saved Game
  const continueGame = useCallback(() => {
    sound.playClick();
    sound.startOceanAmbience();
    const node = storyData[gameState.currentNodeId] || storyData['start'];
    let nextScreen = 'game';
    if (node.isGameOver) nextScreen = 'gameover';
    else if (node.isVictory) nextScreen = 'victory';

    setGameState(prev => ({
      ...prev,
      screen: nextScreen
    }));
  }, [gameState.currentNodeId]);

  // Finish Intro & Enter Game
  const finishIntro = useCallback(() => {
    sound.playChoice();
    setGameState(prev => {
      const next = { ...prev, screen: 'game' };
      saveCurrentGame(next);
      return next;
    });
  }, [saveCurrentGame]);

  // Make a Choice
  const makeChoice = useCallback((choice, nextId) => {
    const targetNode = storyData[nextId] || storyData['start'];

    // Play appropriate sound
    if (targetNode.isGameOver) {
      if (targetNode.soundEffect === 'playSplash') sound.playSplash();
      else if (targetNode.soundEffect === 'playFireCrackle') sound.playFireCrackle();
      else if (targetNode.soundEffect === 'playBeastRoar') sound.playBeastRoar();
      else sound.playDanger();
    } else if (targetNode.isVictory) {
      sound.playVictory();
    } else {
      sound.playChoice();
    }

    setGameState(prev => {
      const newInventory = [...prev.inventory];
      if (targetNode.discoveredItem && !newInventory.includes(targetNode.discoveredItem.id)) {
        newInventory.push(targetNode.discoveredItem.id);
        sound.playCoin();
      }

      const newDiscovered = [...prev.discoveredLocations];
      if (targetNode.locationId && !newDiscovered.includes(targetNode.locationId)) {
        newDiscovered.push(targetNode.locationId);
      }

      const newCompleted = [...prev.completedLocations];
      const prevNode = storyData[prev.currentNodeId];
      if (prevNode && prevNode.locationId && !newCompleted.includes(prevNode.locationId)) {
        newCompleted.push(prevNode.locationId);
      }

      const newAchievements = [...prev.unlockedAchievements];
      if (nextId === 'trout' && !newAchievements.includes('trout_victim')) newAchievements.push('trout_victim');
      if (nextId === 'hole' && !newAchievements.includes('pitfall_diver')) newAchievements.push('pitfall_diver');
      if (nextId === 'fire' && !newAchievements.includes('fire_walker')) newAchievements.push('fire_walker');
      if (nextId === 'beasts' && !newAchievements.includes('beast_tamer')) newAchievements.push('beast_tamer');
      if (nextId === 'island_house' && !newAchievements.includes('patient_voyager')) newAchievements.push('patient_voyager');
      if (targetNode.isVictory && !newAchievements.includes('treasure_hunter')) newAchievements.push('treasure_hunter');

      let newScreen = 'game';
      let newDeaths = prev.deathsCount;
      let newVictories = prev.victoriesCount;
      let newHealth = prev.health;
      let newCoins = prev.coins;

      if (targetNode.isGameOver) {
        newScreen = 'gameover';
        newDeaths += 1;
        newHealth = 0;
      } else if (targetNode.isVictory) {
        newScreen = 'victory';
        newVictories += 1;
        newCoins += (targetNode.rewardCoins || 5000);
      }

      const updated = {
        ...prev,
        screen: newScreen,
        currentNodeId: nextId,
        health: newHealth,
        coins: newCoins,
        inventory: newInventory,
        discoveredLocations: newDiscovered,
        completedLocations: newCompleted,
        unlockedAchievements: newAchievements,
        choicesMade: prev.choicesMade + 1,
        deathsCount: newDeaths,
        victoriesCount: newVictories,
        history: [...prev.history, { from: prev.currentNodeId, to: nextId, choiceId: choice?.id, time: Date.now() }]
      };

      saveCurrentGame(updated);
      return updated;
    });
  }, [saveCurrentGame]);

  // Restart Current Run
  const restartGame = useCallback(() => {
    sound.playClick();
    sound.startOceanAmbience();
    const newState = {
      ...initialGameState,
      screen: 'game',
      currentNodeId: 'start',
      health: 100,
      coins: 0,
      inventory: ['compass'],
      discoveredLocations: ['crossroad'],
      completedLocations: [],
      history: [],
      timePlayed: 0,
      choicesMade: 0,
      deathsCount: gameState.deathsCount,
      victoriesCount: gameState.victoriesCount,
      unlockedAchievements: gameState.unlockedAchievements
    };
    setGameState(newState);
    saveCurrentGame(newState);
  }, [gameState.deathsCount, gameState.victoriesCount, gameState.unlockedAchievements, saveCurrentGame]);

  // Return to Main Menu
  const returnToMenu = useCallback(() => {
    sound.playClick();
    setGameState(prev => ({
      ...prev,
      screen: 'menu'
    }));
  }, []);

  // Update Settings
  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return {
    gameState,
    settings,
    hasSave,
    startNewGame,
    continueGame,
    finishIntro,
    makeChoice,
    restartGame,
    returnToMenu,
    updateSettings
  };
};
