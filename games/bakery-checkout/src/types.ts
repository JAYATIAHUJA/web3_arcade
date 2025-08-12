export interface Wallet {
  id: string;
  seedPhrase: string;
  publicKey: string;
  createdAt: Date;
}

export interface CompletedWallet extends Wallet {
  order: PastryType[];
  completedAt: Date;
  pointsEarned: number;
}

export interface GameState {
  score: number;
  level: number;
  customersServed: number;
  timeLeft: number;
  isPlaying: boolean;
  gameOver: boolean;
  questProgress: number;
}

export type PastryType = 'croissant' | 'donut' | 'cookie' | 'cake' | 'bagel' | 'muffin';

export interface PastryInfo {
  emoji: string;
  name: string;
  price: number;
  color: string;
}