export interface GameState {
  balance: number;
  parts: {
    cpu: number;
    gpu: number;
    motherboard: number;
    psu: number;
    ram: number;
  };
  hashRates: {
    cpu: number;
    gpu: number;
    motherboard: number;
    psu: number;
    ram: number;
  };
  lastUpdated: string;
}

export interface UpgradeResponse {
  success: boolean;
  newState: GameState;
  error?: string;
}