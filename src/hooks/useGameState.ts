import { useState, useCallback, useEffect } from 'react';
import type { ApiCollection } from '../api/types';
import type { GameState } from '../game/types';
import { generateMansion, isWall, getRoomAt, getMonsterType } from '../game/mansion';
import { apiClient } from '../api/client';
import { audioEngine } from '../engine/audio';

export function useGameState(collection: ApiCollection) {
  const [state, setState] = useState<GameState>(() => {
    const mansion = generateMansion(collection.endpoints);
    
    return {
      player: {
        position: { x: mansion.rooms[0].position.x, y: mansion.rooms[0].position.y },
        velocity: { x: 0, y: 0 },
        currentRoom: null,
        urnPieces: 0,
        flashlightOn: false,
      },
      rooms: mansion.rooms,
      mansion: {
        width: mansion.width,
        height: mansion.height,
        layout: mansion.layout,
      },
      currentRequest: null,
      lastResponse: null,
      lastError: null,
      score: 0,
      gameOver: false,
      victory: false,
    };
  });

  const movePlayer = useCallback((dx: number, dy: number) => {
    setState(prev => {
      const newX = prev.player.position.x + dx * 0.1;
      const newY = prev.player.position.y + dy * 0.1;
      
      // Check collision with walls
      if (isWall(prev.mansion.layout, Math.floor(newX), Math.floor(newY))) {
        return prev;
      }
      
      audioEngine.playMove();
      
      return {
        ...prev,
        player: {
          ...prev.player,
          position: { x: newX, y: newY },
        },
      };
    });
  }, []);

  const toggleFlashlight = useCallback(() => {
    setState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        flashlightOn: !prev.player.flashlightOn,
      },
    }));
    audioEngine.playFlashlight();
  }, []);

  const updateMonsters = useCallback(() => {
    setState(prev => {
      const updatedRooms = prev.rooms.map(room => {
        if (!room.monster?.active) return room;
        
        // Simple AI: move towards player
        const dx = prev.player.position.x - room.monster.position.x;
        const dy = prev.player.position.y - room.monster.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0.1) {
          const moveX = (dx / distance) * room.monster.speed * 0.05;
          const moveY = (dy / distance) * room.monster.speed * 0.05;
          
          return {
            ...room,
            monster: {
              ...room.monster,
              position: {
                x: room.monster.position.x + moveX,
                y: room.monster.position.y + moveY,
              },
            },
          };
        }
        
        return room;
      });
      
      return { ...prev, rooms: updatedRooms };
    });
  }, []);

  // Check if player is in a room and trigger API request
  useEffect(() => {
    const currentRoom = getRoomAt(
      state.rooms,
      {
        x: Math.floor(state.player.position.x),
        y: Math.floor(state.player.position.y),
      }
    );

    if (currentRoom && !currentRoom.visited && !state.currentRequest) {
      // Player entered an unvisited room - make API request
      audioEngine.playEnterRoom();
      
      setState(prev => ({
        ...prev,
        currentRequest: {
          endpointId: currentRoom.id,
          loading: true,
        },
      }));

      apiClient.makeRequest(currentRoom.endpoint, collection.auth, collection.variables)
        .then(({ response, error }) => {
          setState(prev => {
            const updatedRooms = prev.rooms.map(room => {
              if (room.id === currentRoom.id) {
                if (response) {
                  // Success!
                  audioEngine.playSuccess();
                  return {
                    ...room,
                    visited: true,
                    hasUrnPiece: false, // Collected
                  };
                } else if (error) {
                  // Error - spawn monster
                  audioEngine.playError();
                  audioEngine.playMonster();
                  const errorCode: number | 'timeout' = error.isTimeout ? 'timeout' : (error.status || 500);
                  return {
                    ...room,
                    visited: true,
                    monster: {
                      type: getMonsterType(errorCode),
                      position: { ...room.position },
                      errorCode,
                      active: true,
                      speed: 1,
                    },
                  };
                }
              }
              return room;
            });

            const urnPieces = response ? prev.player.urnPieces + 1 : prev.player.urnPieces;
            const victory = urnPieces === prev.rooms.length;

            return {
              ...prev,
              rooms: updatedRooms,
              player: {
                ...prev.player,
                urnPieces,
              },
              currentRequest: null,
              lastResponse: response || prev.lastResponse,
              lastError: error || prev.lastError,
              victory,
            };
          });
        });
    }
  }, [state.player.position, state.rooms, state.currentRequest, collection]);

  return {
    state,
    actions: {
      movePlayer,
      toggleFlashlight,
      updateMonsters,
    },
  };
}
