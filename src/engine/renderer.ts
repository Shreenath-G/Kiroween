import { ATARI_COLORS, MONSTER_COLORS } from '../utils/colors';
import type { GameState, Monster } from '../game/types';
import { TILE_SIZE, PLAYER_SIZE, MONSTER_SIZE } from '../game/types';

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private cameraX = 0;
  private cameraY = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;
    
    // Disable image smoothing for crisp pixels
    this.ctx.imageSmoothingEnabled = false;
  }

  render(state: GameState): void {
    // Center camera on player
    this.cameraX = state.player.position.x * TILE_SIZE - this.width / 2;
    this.cameraY = state.player.position.y * TILE_SIZE - this.height / 2;

    // Clear screen
    this.ctx.fillStyle = ATARI_COLORS.BLACK;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Render based on flashlight state
    if (state.player.flashlightOn) {
      this.renderWithLight(state);
    } else {
      this.renderInDarkness(state);
    }

    // Render HUD
    this.renderHUD(state);
  }

  private renderInDarkness(state: GameState): void {
    const { player, rooms, mansion } = state;
    const visionRadius = 3; // tiles

    // Only render nearby tiles
    for (let y = 0; y < mansion.height; y++) {
      for (let x = 0; x < mansion.width; x++) {
        const dx = x - player.position.x;
        const dy = y - player.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= visionRadius) {
          const screenX = x * TILE_SIZE - this.cameraX;
          const screenY = y * TILE_SIZE - this.cameraY;
          
          // Fade based on distance
          const alpha = 1 - (distance / visionRadius);
          
          if (mansion.layout[y][x] === 1) {
            // Wall
            this.ctx.fillStyle = this.withAlpha(ATARI_COLORS.DARK_BLUE, alpha);
            this.ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
          } else if (mansion.layout[y][x] === 2) {
            // Room marker
            this.ctx.fillStyle = this.withAlpha(ATARI_COLORS.DARK_YELLOW, alpha);
            this.ctx.fillRect(screenX + 8, screenY + 8, 16, 16);
          }
        }
      }
    }

    // Render monsters in vision
    rooms.forEach(room => {
      if (room.monster?.active) {
        const dx = room.monster.position.x - player.position.x;
        const dy = room.monster.position.y - player.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= visionRadius) {
          this.renderMonster(room.monster);
        }
      }
    });

    // Render player (always visible)
    this.renderPlayer(player);
  }

  private renderWithLight(state: GameState): void {
    const { mansion, rooms, player } = state;

    // Render all tiles
    for (let y = 0; y < mansion.height; y++) {
      for (let x = 0; x < mansion.width; x++) {
        const screenX = x * TILE_SIZE - this.cameraX;
        const screenY = y * TILE_SIZE - this.cameraY;
        
        if (mansion.layout[y][x] === 1) {
          // Wall
          this.ctx.fillStyle = ATARI_COLORS.LIGHT_BLUE;
          this.ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
          this.ctx.strokeStyle = ATARI_COLORS.BLUE;
          this.ctx.strokeRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
        } else if (mansion.layout[y][x] === 2) {
          // Room marker
          const room = rooms.find(r => r.position.x === x && r.position.y === y);
          if (room) {
            this.ctx.fillStyle = room.visited ? ATARI_COLORS.DARK_GREEN : ATARI_COLORS.DARK_YELLOW;
            this.ctx.fillRect(screenX + 4, screenY + 4, 24, 24);
          }
        }
      }
    }

    // Render monsters
    rooms.forEach(room => {
      if (room.monster?.active) {
        this.renderMonster(room.monster);
      }
    });

    // Render urn pieces
    rooms.forEach(room => {
      if (room.hasUrnPiece && !room.visited) {
        const screenX = room.position.x * TILE_SIZE - this.cameraX;
        const screenY = room.position.y * TILE_SIZE - this.cameraY;
        this.ctx.fillStyle = ATARI_COLORS.BRIGHT_YELLOW;
        this.ctx.fillRect(screenX + 10, screenY + 10, 12, 12);
      }
    });

    // Render player
    this.renderPlayer(player);
  }

  private renderPlayer(player: any): void {
    const screenX = player.position.x * TILE_SIZE - this.cameraX;
    const screenY = player.position.y * TILE_SIZE - this.cameraY;
    
    // Draw eyes (two circles)
    this.ctx.fillStyle = ATARI_COLORS.BRIGHT_GREEN;
    const eyeSize = PLAYER_SIZE / 3;
    const eyeOffset = PLAYER_SIZE / 4;
    
    // Left eye
    this.ctx.beginPath();
    this.ctx.arc(
      screenX + TILE_SIZE / 2 - eyeOffset,
      screenY + TILE_SIZE / 2,
      eyeSize,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
    
    // Right eye
    this.ctx.beginPath();
    this.ctx.arc(
      screenX + TILE_SIZE / 2 + eyeOffset,
      screenY + TILE_SIZE / 2,
      eyeSize,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  }

  private renderMonster(monster: Monster): void {
    const screenX = monster.position.x * TILE_SIZE - this.cameraX;
    const screenY = monster.position.y * TILE_SIZE - this.cameraY;
    
    const color = MONSTER_COLORS[monster.errorCode as keyof typeof MONSTER_COLORS] || ATARI_COLORS.RED;
    
    // Simple monster shape (varies by type)
    this.ctx.fillStyle = color;
    
    switch (monster.type) {
      case 'ghost':
        // Wavy ghost shape
        this.ctx.beginPath();
        this.ctx.arc(screenX + TILE_SIZE / 2, screenY + TILE_SIZE / 2, MONSTER_SIZE / 2, 0, Math.PI * 2);
        this.ctx.fill();
        break;
      case 'demon':
        // Angular demon
        this.ctx.fillRect(screenX + 4, screenY + 4, MONSTER_SIZE, MONSTER_SIZE);
        break;
      case 'zombie':
        // Shambling rectangle
        this.ctx.fillRect(screenX + 8, screenY + 6, MONSTER_SIZE - 4, MONSTER_SIZE);
        break;
      case 'vampire':
        // Triangle
        this.ctx.beginPath();
        this.ctx.moveTo(screenX + TILE_SIZE / 2, screenY + 4);
        this.ctx.lineTo(screenX + 4, screenY + TILE_SIZE - 4);
        this.ctx.lineTo(screenX + TILE_SIZE - 4, screenY + TILE_SIZE - 4);
        this.ctx.closePath();
        this.ctx.fill();
        break;
      case 'wraith':
        // Fading circle
        this.ctx.globalAlpha = 0.6;
        this.ctx.beginPath();
        this.ctx.arc(screenX + TILE_SIZE / 2, screenY + TILE_SIZE / 2, MONSTER_SIZE / 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.globalAlpha = 1;
        break;
    }
  }

  private renderHUD(state: GameState): void {
    const padding = 10;
    
    // Background for HUD
    this.ctx.fillStyle = this.withAlpha(ATARI_COLORS.BLACK, 0.7);
    this.ctx.fillRect(0, 0, this.width, 40);
    
    // Score and urn pieces
    this.ctx.fillStyle = ATARI_COLORS.WHITE;
    this.ctx.font = '16px monospace';
    this.ctx.fillText(`URN PIECES: ${state.player.urnPieces}/${state.rooms.length}`, padding, 25);
    
    // Flashlight indicator
    if (state.player.flashlightOn) {
      this.ctx.fillStyle = ATARI_COLORS.BRIGHT_YELLOW;
      this.ctx.fillText('💡 FLASHLIGHT ON', this.width - 200, 25);
    }
    
    // Loading indicator
    if (state.currentRequest?.loading) {
      this.ctx.fillStyle = ATARI_COLORS.YELLOW;
      this.ctx.fillText('REQUESTING...', this.width / 2 - 60, 25);
    }
  }

  private withAlpha(color: string, alpha: number): string {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }
}
