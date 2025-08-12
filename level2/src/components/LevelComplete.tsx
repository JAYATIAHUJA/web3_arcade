import React from 'react';
import { Trophy, Star, Wallet, ArrowRight, RotateCcw, Award, Sparkles } from 'lucide-react';

interface LevelCompleteProps {
  score: number;
  walletsCreated: number;
  onRestart: () => void;
  onNextLevel: () => void;
}

export function LevelComplete({ score, walletsCreated, onRestart, onNextLevel }: LevelCompleteProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8 animate-slideInFromTop">
          <div className="relative">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-float animate-glow">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center animate-sparkle">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Quest Complete!</h1>
          <p className="text-blue-200 text-lg">You've mastered wallet creation!</p>
        </div>

        {/* Achievement Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20 animate-fadeInScale animate-glow">
          <div className="text-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 animate-float">
              <Award className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">NFT Badge Earned!</h2>
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text font-bold text-xl">
              "Wallet Maker"
            </div>
            <p className="text-purple-200 text-sm mt-2">Proof of your wallet creation mastery</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6 animate-slideInFromLeft">
            <div className="bg-yellow-500/10 rounded-lg p-4 text-center border border-yellow-500/20 hover:bg-yellow-500/20 transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400 animate-sparkle" />
                <span className="text-2xl font-bold text-yellow-300">{score}</span>
              </div>
              <div className="text-yellow-200 text-sm">Final Score</div>
            </div>
            
            <div className="bg-blue-500/10 rounded-lg p-4 text-center border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Wallet className="w-5 h-5 text-blue-400 animate-float" />
                <span className="text-2xl font-bold text-blue-300">{walletsCreated}</span>
              </div>
              <div className="text-blue-200 text-sm">Wallets Created</div>
            </div>
          </div>

          {/* Learning Summary */}
          <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10 animate-slideInFromRight">
            <h3 className="text-lg font-bold text-white mb-4">What You've Learned:</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-green-200">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>How to generate secure seed phrases</span>
              </div>
              <div className="flex items-center gap-3 text-green-200">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Understanding public keys and wallet addresses</span>
              </div>
              <div className="flex items-center gap-3 text-green-200">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>The importance of wallet security</span>
              </div>
              <div className="flex items-center gap-3 text-green-200">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>How wallets store digital assets</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slideInFromTop">
            <button
              onClick={onNextLevel}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 animate-glow"
            >
              <span>Next Quest</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={onRestart}
              className="bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 border border-white/20 hover:scale-105"
            >
              <RotateCcw className="w-5 h-5" />
              Replay Quest
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="text-center animate-fadeInScale">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-white/60 text-sm ml-2">Level 2 Complete!</span>
          </div>
        </div>
      </div>
    </div>
  );
}