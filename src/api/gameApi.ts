import axios from 'axios';
import { GameState, UpgradeResponse } from '../types/game';

const API_URL = 'https://us-east-1.aws.data.mongodb-api.com/app/crypto-miner-xxxxx/endpoint';

export const fetchGameState = async (): Promise<GameState> => {
  try {
    const response = await axios.get(`${API_URL}/getState`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch game state:', error);
    // Return default state if fetch fails
    return {
      balance: 1000,
      parts: {
        cpu: 1,
        gpu: 1,
        motherboard: 1,
        psu: 1,
        ram: 1
      },
      hashRates: {
        cpu: 1.0,
        gpu: 1.5,
        motherboard: 0.8,
        psu: 0.6,
        ram: 0.7
      },
      lastUpdated: new Date().toISOString()
    };
  }
};

export const saveGameState = async (state: GameState): Promise<void> => {
  try {
    await axios.post(`${API_URL}/saveState`, state);
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
};

export const performUpgrade = async (
  part: string,
  currentState: GameState
): Promise<UpgradeResponse> => {
  try {
    const response = await axios.post(`${API_URL}/upgrade`, {
      part,
      currentState
    });
    return response.data;
  } catch (error) {
    console.error('Failed to perform upgrade:', error);
    throw new Error('Upgrade failed');
  }
};