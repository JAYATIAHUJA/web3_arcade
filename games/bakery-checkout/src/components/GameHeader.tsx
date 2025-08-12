import React from 'react';
import { Trophy, HelpCircle, RotateCcw, Star, Clock, BookOpen, Target } from 'lucide-react';
import type { GameState } from '../types';

interface GameHeaderProps {
  gameState: GameState;
  onHowToPlay: () => void;
  onEducational: () => void;
  onReset: () => void;
  walletsToWin: number;
}

export function GameHeader({ gameState, onHowToPlay, onEducational, onReset, walletsToWin }: GameHeaderProps) {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 mb-8 border border-purple-500/30 animate-slideInFromTop animate-glow">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl animate-float">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              QuestChain Level 2: Bakery Checkout
            </h1>
            <p className="text-purple-200">Master wallet creation • Serve {walletsToWin} customers to win</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="flex items-center gap-2 text-2xl font-bold text-purple-300">
              <Target className="w-6 h-6" />
              {gameState.customersServed}/{walletsToWin}
            </div>
            <div className="text-sm text-gray-400">Progress</div>
          </div>

          <div className="text-center">
            <div className="flex items-center gap-2 text-2xl font-bold text-yellow-400">
              <Star className="w-6 h-6" />
              {gameState.score}
            </div>
            <div className="text-sm text-gray-400">Score</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {gameState.level}
            </div>
            <div className="text-sm text-gray-400">Level</div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onEducational}
              className="p-2 bg-purple-600/20 hover:bg-purple-600/40 rounded-lg transition-all duration-300 hover:scale-110 border border-purple-500/30"
              title="Learn about wallets"
            >
              <BookOpen className="w-5 h-5 text-purple-300" />
            </button>
            
            <button
              onClick={onHowToPlay}
              className="p-2 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg transition-all duration-300 hover:scale-110 border border-blue-500/30"
              title="How to play"
            >
              <HelpCircle className="w-5 h-5 text-blue-300" />
            </button>
            
            <button
              onClick={onReset}
              className="p-2 bg-gray-600/20 hover:bg-gray-600/40 rounded-lg transition-all duration-300 hover:scale-110 border border-gray-500/30"
              title="Reset game"
            >
              <RotateCcw className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Quest Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">Quest Progress</span>
          <span className="text-sm text-gray-400">{Math.round(gameState.questProgress)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-600 h-3 rounded-full transition-all duration-500 animate-shimmer"
            style={{ width: `${gameState.questProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}