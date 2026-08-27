// Location nodes and coordinate data for the interactive pirate treasure map

export const mapLocations = {
  crossroad: {
    id: 'crossroad',
    name: 'Crossroads',
    shortName: 'Crossroads',
    x: 140,
    y: 430,
    type: 'land',
    icon: 'Compass',
    description: 'The ancient trailhead where every adventure begins.'
  },
  hole: {
    id: 'hole',
    name: 'The Pitfall',
    shortName: 'Pitfall',
    x: 290,
    y: 480,
    type: 'danger',
    icon: 'Skull',
    description: 'A treacherous concealed pit concealed by foliage.'
  },
  lake: {
    id: 'lake',
    name: 'Mystic Lake',
    shortName: 'Lake',
    x: 310,
    y: 300,
    type: 'water',
    icon: 'Waves',
    description: 'Fog-shrouded crater lake surrounding the central island.'
  },
  house: {
    id: 'house',
    name: 'Sanctuary Lodge',
    shortName: 'House',
    x: 490,
    y: 210,
    type: 'building',
    icon: 'Home',
    description: 'The ancient stone house holding the three colored doors.'
  },
  vault: {
    id: 'vault',
    name: 'Treasure Vault',
    shortName: 'X Marks Spot',
    x: 540,
    y: 90,
    type: 'treasure',
    icon: 'Crown',
    description: 'The final resting place of Captain Flint’s gold.'
  }
};

export const mapPaths = [
  { from: 'crossroad', to: 'lake', status: 'normal', d: 'M 140 430 Q 200 370 310 300' },
  { from: 'crossroad', to: 'hole', status: 'danger', d: 'M 140 430 Q 200 480 290 480' },
  { from: 'lake', to: 'house', status: 'water', d: 'M 310 300 Q 400 270 490 210' },
  { from: 'house', to: 'vault', status: 'treasure', d: 'M 490 210 Q 510 140 540 90' }
];
