// Authentic Atari 2600 color palette (NTSC)
// Limited to the actual colors available on the system

export const ATARI_COLORS = {
  // Grays and blacks (for darkness)
  BLACK: '#000000',
  DARK_GRAY: '#404040',
  GRAY: '#6C6C6C',
  LIGHT_GRAY: '#909090',
  
  // Greens (for the player eyes and some UI)
  DARK_GREEN: '#003C00',
  GREEN: '#00A800',
  BRIGHT_GREEN: '#58F898',
  
  // Blues (for walls and atmosphere)
  DARK_BLUE: '#000084',
  BLUE: '#0000D8',
  LIGHT_BLUE: '#78B4F8',
  
  // Reds (for monsters and errors)
  DARK_RED: '#880000',
  RED: '#E40058',
  BRIGHT_RED: '#F83800',
  
  // Yellows/Oranges (for items and highlights)
  DARK_YELLOW: '#A85400',
  YELLOW: '#F8B800',
  BRIGHT_YELLOW: '#F8F8A8',
  ORANGE: '#F87858',
  
  // Purples (for special effects)
  PURPLE: '#8800BC',
  LIGHT_PURPLE: '#D8A0F8',
  
  // White (for text and highlights)
  WHITE: '#F8F8F8',
} as const;

export type AtariColor = typeof ATARI_COLORS[keyof typeof ATARI_COLORS];

// Color themes for different game states
export const COLOR_THEMES = {
  NORMAL: {
    background: ATARI_COLORS.BLACK,
    walls: ATARI_COLORS.DARK_BLUE,
    player: ATARI_COLORS.BRIGHT_GREEN,
    text: ATARI_COLORS.WHITE,
  },
  FLASHLIGHT: {
    background: ATARI_COLORS.DARK_GRAY,
    walls: ATARI_COLORS.LIGHT_BLUE,
    player: ATARI_COLORS.BRIGHT_GREEN,
    text: ATARI_COLORS.BRIGHT_YELLOW,
  },
  ERROR: {
    background: ATARI_COLORS.DARK_RED,
    walls: ATARI_COLORS.RED,
    player: ATARI_COLORS.BRIGHT_GREEN,
    text: ATARI_COLORS.WHITE,
  },
  SUCCESS: {
    background: ATARI_COLORS.DARK_GREEN,
    walls: ATARI_COLORS.GREEN,
    player: ATARI_COLORS.BRIGHT_YELLOW,
    text: ATARI_COLORS.WHITE,
  },
} as const;

// Monster colors based on HTTP error codes
export const MONSTER_COLORS = {
  404: ATARI_COLORS.PURPLE,        // Not Found Ghost
  500: ATARI_COLORS.BRIGHT_RED,    // Server Error Demon
  401: ATARI_COLORS.ORANGE,        // Unauthorized Zombie
  403: ATARI_COLORS.DARK_RED,      // Forbidden Vampire
  timeout: ATARI_COLORS.DARK_GRAY, // Timeout Wraith
} as const;
