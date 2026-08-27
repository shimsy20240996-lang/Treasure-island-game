// Inventory and collectible relics data

export const gameItems = {
  compass: {
    id: 'compass',
    name: 'Old Brass Compass',
    icon: 'Compass',
    rarity: 'common',
    obtainedAt: 'start',
    description: 'A tarnished mariner compass found at the island crossroads. The needle vibrates with strange magnetic resonance.'
  },
  boat_token: {
    id: 'boat_token',
    name: "Ferryman's Oar Fragment",
    icon: 'Anchor',
    rarity: 'rare',
    obtainedAt: 'lake',
    description: 'A piece of sturdy driftwood carved with protective sea glyphs by ancient island voyagers.'
  },
  skeleton_key: {
    id: 'skeleton_key',
    name: 'Island House Key',
    icon: 'Key',
    rarity: 'epic',
    obtainedAt: 'island_house',
    description: 'An intricately notched skeleton key discovered beneath the wooden docks.'
  },
  captains_crown: {
    id: 'captains_crown',
    name: "Captain Flint's Crown",
    icon: 'Crown',
    rarity: 'legendary',
    obtainedAt: 'victory',
    description: 'The glorious crown of the dreaded pirate captain, shining with unearthly radiance.'
  }
};
