import { Wallet } from '../types';

const SEED_WORDS = [
  'apple', 'banana', 'cherry', 'dragon', 'elephant', 'forest', 'garden', 'house',
  'island', 'jungle', 'kitchen', 'lemon', 'mountain', 'nature', 'ocean', 'purple',
  'queen', 'rainbow', 'summer', 'tiger', 'umbrella', 'village', 'winter', 'yellow'
];

function generateRandomHex(length: number): string {
  const chars = '0123456789abcdef';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generateSeedPhrase(wordCount: number = 12): string {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(SEED_WORDS[Math.floor(Math.random() * SEED_WORDS.length)]);
  }
  return words.join(' ');
}

function generatePublicKey(): string {
  return '0x' + generateRandomHex(40);
}

export function generateWallet(): Wallet {
  return {
    id: generateRandomHex(8),
    seedPhrase: generateSeedPhrase(12),
    publicKey: generatePublicKey(),
    createdAt: new Date()
  };
}