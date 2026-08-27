// Story tree and decision node definitions derived faithfully from task.py

export const storyData = {
  // --- PROLOGUE / START ---
  start: {
    id: 'start',
    locationId: 'crossroad',
    title: 'The Forked Crossroads',
    subtitle: 'The Journey Begins on Treasure Island',
    icon: 'Compass',
    banner: 'crossroad',
    originalPrompt: "You're at a crossroad, where do you want to go? Type 'left' or 'right'.",
    description: `Welcome to Treasure Island. Your mission is to find the fabled lost treasure buried centuries ago by legendary corsairs.
    
Ahead of you, the dense jungle parts into two distinct pathways. The left path descends toward misty lowlands where you can faintly hear water lapping. The right path leads into a shadowed gorge flanked by crumbling limestone ridges.

Which path will you choose to brave?`,
    soundEffect: 'playChoice',
    ambientMood: 'coastal_forest',
    discoveredItem: {
      id: 'compass',
      name: 'Old Brass Compass',
      icon: 'Compass',
      description: 'A weathered maritime compass pointing true north toward the island heart.'
    },
    choices: [
      {
        id: 'left',
        key: '1',
        text: 'Take the Left Path',
        subtext: 'Descend toward the misty lowlands and sound of water',
        icon: 'Navigation',
        badge: 'Recommended',
        nextId: 'lake',
        actionType: 'navigate'
      },
      {
        id: 'right',
        key: '2',
        text: 'Take the Right Path',
        subtext: 'Venture into the shadowed limestone gorge',
        icon: 'Footprints',
        badge: 'Danger',
        nextId: 'hole',
        actionType: 'danger'
      }
    ]
  },

  // --- DEATH 1: PITFALL HOLE ---
  hole: {
    id: 'hole',
    locationId: 'hole',
    title: 'The Hidden Pitfall',
    subtitle: 'A Fatal Misstep',
    icon: 'Skull',
    isGameOver: true,
    deathType: 'fall',
    soundEffect: 'playDanger',
    originalOutcome: 'You fell in a hole. Game Over.',
    description: `You march boldly down the right path. Suddenly, the damp foliage gives way beneath your boots! 

A concealed hunter pitfall opens beneath you. You plunge deep into the darkness, crashing onto the jagged rocks below. The island's treacherous terrain has claimed another unwary explorer.`,
    statsImpact: { health: 0 }
  },

  // --- NODE 2: THE LAKE ---
  lake: {
    id: 'lake',
    locationId: 'lake',
    title: 'The Mist-Shrouded Lake',
    subtitle: 'Waters of the Sunken Crater',
    icon: 'Waves',
    banner: 'lake',
    originalPrompt: "You've come to a lake. There is an island in the middle of the lake. Type 'wait' to wait for a boat. Type 'swim' to swim across.",
    description: `You reach the shores of an enormous volcanic lake veiled in dense, drifting fog. 

Through the eerie stillness, you spot a mysterious sanctuary island resting at the very center of the water. The depths below look deceptively calm, though ripples hint at ancient predators lurking beneath the surface.

How will you cross the expanse?`,
    soundEffect: 'playSplash',
    ambientMood: 'misty_waters',
    discoveredItem: {
      id: 'boat_token',
      name: "Ferryman's Oar Fragment",
      icon: 'Anchor',
      description: 'A piece of weathered driftwood bearing carved pirate runes.'
    },
    choices: [
      {
        id: 'wait',
        key: '1',
        text: 'Wait for a Boat',
        subtext: 'Signal the shoreline and wait for safe passage',
        icon: 'Clock',
        badge: 'Patience',
        nextId: 'island_house',
        actionType: 'safe'
      },
      {
        id: 'swim',
        key: '2',
        text: 'Swim Across the Lake',
        subtext: 'Dive into the chilly waters and swim for the island',
        icon: 'Droplets',
        badge: 'Hazardous',
        nextId: 'trout',
        actionType: 'danger'
      }
    ]
  },

  // --- DEATH 2: ANGRY TROUT ATTACK ---
  trout: {
    id: 'trout',
    locationId: 'lake',
    title: 'The Murky Depths',
    subtitle: 'Frenzy in the Water',
    icon: 'Fish',
    isGameOver: true,
    deathType: 'beast',
    soundEffect: 'playSplash',
    originalOutcome: 'You got attacked by an angry trout. Game Over.',
    description: `You plunge into the freezing lake waters. Halfway across, ferocious thrashing churns the surface around you! 

An enormous mutant predatory trout, guardian of the sacred lake, lunges with razor-sharp jaws. Overpowered in open water, you are dragged into the watery abyss.`,
    statsImpact: { health: 0 }
  },

  // --- NODE 3: THE HOUSE OF THREE DOORS ---
  island_house: {
    id: 'island_house',
    locationId: 'house',
    title: 'The House of Three Doors',
    subtitle: 'The Island Sanctuary',
    icon: 'Home',
    banner: 'house',
    originalPrompt: 'You arrived at the island unharmed. there is house with 3 doors. One red. one yellow and one blue. Which color do you choose?',
    description: `A weathered wooden boat drifts through the fog, carrying you safely across the lake. You step onto the shores of the island completely unharmed.

Standing before you is an ancient stone lodge overgrown with luminescent moss. In the entrance hall, three imposing wooden doors are set into the stonework: one vivid Red, one gleaming Yellow, and one cobalt Blue.

Which door holds the secret to the legendary treasure?`,
    soundEffect: 'playMapDiscovery',
    ambientMood: 'ancient_sanctuary',
    discoveredItem: {
      id: 'skeleton_key',
      name: 'Old Skeleton Key',
      icon: 'Key',
      description: 'A hand-forged iron key discovered near the island dock.'
    },
    choices: [
      {
        id: 'red',
        key: '1',
        text: 'The Red Door',
        subtext: 'A door radiating a faint crimson heat',
        icon: 'Flame',
        color: '#ef4444',
        badge: 'Crimson',
        nextId: 'fire',
        actionType: 'door_red'
      },
      {
        id: 'yellow',
        key: '2',
        text: 'The Yellow Door',
        subtext: 'A door shimmering with a warm golden hue',
        icon: 'Sparkles',
        color: '#eab308',
        badge: 'Golden',
        nextId: 'victory',
        actionType: 'door_yellow'
      },
      {
        id: 'blue',
        key: '3',
        text: 'The Blue Door',
        subtext: 'A door vibrating with low, ominous growls',
        icon: 'ShieldAlert',
        color: '#3b82f6',
        badge: 'Cobalt',
        nextId: 'beasts',
        actionType: 'door_blue'
      },
      {
        id: 'secret',
        key: '4',
        text: 'Search for a Secret Door',
        subtext: 'Inspect the dark mossy corner for a hidden passage',
        icon: 'EyeOff',
        color: '#a855f7',
        badge: 'Unknown',
        nextId: 'void',
        actionType: 'door_secret'
      }
    ]
  },

  // --- DEATH 3: ROOM OF FIRE ---
  fire: {
    id: 'fire',
    locationId: 'house',
    title: 'The Chamber of Flames',
    subtitle: 'Infernal Trap',
    icon: 'Flame',
    isGameOver: true,
    deathType: 'fire',
    soundEffect: 'playFireCrackle',
    originalOutcome: "It's a room full of fire. Game Over.",
    description: `You push open the Red Door. A blistering wave of roaring heat rushes outward! 

The room is an infernal furnace of roaring flames and molten magma. Before you can retreat, the floor seals behind you and the blazing room engulfs you in fire.`,
    statsImpact: { health: 0 }
  },

  // --- DEATH 4: ROOM OF BEASTS ---
  beasts: {
    id: 'beasts',
    locationId: 'house',
    title: 'The Den of Beasts',
    subtitle: 'Vicious Guardians',
    icon: 'Skull',
    isGameOver: true,
    deathType: 'beast',
    soundEffect: 'playBeastRoar',
    originalOutcome: 'You enter a room of beasts. Game Over.',
    description: `You push open the Blue Door and step into the cold darkness. 

Glowing predator eyes suddenly pierce the shadows. A pack of ravenous island beasts leaps from the corners, cornering you with ferocious snarls. You fought bravely, but the island beasts overwhelmed you.`,
    statsImpact: { health: 0 }
  },

  // --- DEATH 5: NON-EXISTENT DOOR ---
  void: {
    id: 'void',
    locationId: 'house',
    title: 'The Phantom Threshold',
    subtitle: 'Lost in the Void',
    icon: 'Ghost',
    isGameOver: true,
    deathType: 'void',
    soundEffect: 'playDanger',
    originalOutcome: "You chose a door that doesn't exist. Game Over.",
    description: `You attempted to force open a doorway that does not exist in this reality. 

The stone wall crumbles into an endless optical illusion void. You fall through spacetime into the forgotten phantom abyss of Treasure Island.`,
    statsImpact: { health: 0 }
  },

  // --- VICTORY NODE ---
  victory: {
    id: 'victory',
    locationId: 'vault',
    title: 'The Golden Vault of Captain Flint',
    subtitle: 'The Legendary Treasure is Discovered!',
    icon: 'Crown',
    isVictory: true,
    soundEffect: 'playVictory',
    originalOutcome: 'You found the treasure, you win!',
    description: `You push open the Yellow Door. A blinding luminescence washes over you! 

Inside lies the fabled Golden Vault. Piles of ancient Spanish doubloons, ruby crowns, gemstone-encrusted chalices, and pirate chests overflow with limitless wealth.

Against all odds, through wisdom, patience, and true pirate courage, you have conquered Treasure Island!`,
    rewardCoins: 5000,
    discoveredItem: {
      id: 'captains_crown',
      name: "Captain Flint's Gold Crown",
      icon: 'Crown',
      description: 'The legendary golden crown studded with royal emeralds and rubies.'
    },
    statsImpact: { coins: 5000 }
  }
};
