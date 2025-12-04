import type { ApiEndpoint } from '../api/types';
import type { Room, Position } from './types';

// Mansion layout: 0 = empty, 1 = wall, 2 = room
export function generateMansion(endpoints: ApiEndpoint[]): {
  width: number;
  height: number;
  layout: number[][];
  rooms: Room[];
} {
  // Create a grid based on number of endpoints
  const roomCount = endpoints.length;
  const cols = Math.ceil(Math.sqrt(roomCount));
  const rows = Math.ceil(roomCount / cols);
  
  const width = cols * 5 + 2; // Each room is 5x5 tiles, plus borders
  const height = rows * 5 + 2;
  
  // Initialize with walls
  const layout: number[][] = Array(height)
    .fill(0)
    .map(() => Array(width).fill(1));
  
  // Create rooms and corridors
  const rooms: Room[] = [];
  let endpointIndex = 0;
  
  for (let row = 0; row < rows && endpointIndex < endpoints.length; row++) {
    for (let col = 0; col < cols && endpointIndex < endpoints.length; col++) {
      const roomX = col * 5 + 1;
      const roomY = row * 5 + 1;
      
      // Carve out room (3x3 space)
      for (let y = roomY; y < roomY + 3; y++) {
        for (let x = roomX; x < roomX + 3; x++) {
          layout[y][x] = 0;
        }
      }
      
      // Mark center as room
      layout[roomY + 1][roomX + 1] = 2;
      
      // Create corridors to adjacent rooms
      if (col < cols - 1) {
        // Right corridor
        layout[roomY + 1][roomX + 3] = 0;
        layout[roomY + 1][roomX + 4] = 0;
      }
      if (row < rows - 1) {
        // Down corridor
        layout[roomY + 3][roomX + 1] = 0;
        layout[roomY + 4][roomX + 1] = 0;
      }
      
      rooms.push({
        id: endpoints[endpointIndex].id,
        position: { x: roomX + 1, y: roomY + 1 },
        endpoint: endpoints[endpointIndex],
        visited: false,
        hasUrnPiece: true,
      });
      
      endpointIndex++;
    }
  }
  
  return { width, height, layout, rooms };
}

export function isWall(layout: number[][], x: number, y: number): boolean {
  if (y < 0 || y >= layout.length || x < 0 || x >= layout[0].length) {
    return true;
  }
  return layout[y][x] === 1;
}

export function getRoomAt(rooms: Room[], position: Position): Room | null {
  return rooms.find(
    room => room.position.x === position.x && room.position.y === position.y
  ) || null;
}

export function getMonsterType(errorCode: number | 'timeout'): 'ghost' | 'demon' | 'zombie' | 'vampire' | 'wraith' {
  if (errorCode === 'timeout') return 'wraith';
  if (errorCode === 404) return 'ghost';
  if (errorCode >= 500) return 'demon';
  if (errorCode === 401) return 'zombie';
  if (errorCode === 403) return 'vampire';
  return 'ghost';
}
