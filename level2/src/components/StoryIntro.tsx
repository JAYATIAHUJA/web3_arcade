import React from 'react';
import { Play, BookOpen, Map, Sparkles, Wallet, Users } from 'lucide-react';

interface StoryIntroProps {
  onStart: () => void;
  onEducational: () => void;
}

export function StoryIntro({ onStart, onEducational }: StoryIntroProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* QuestChain Header */}
        <div className="text-center mb-8 animate-slideInFromTop">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl animate-float">
              <Map className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white animate-shimmer bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text">QuestChain</h1>
          </div>
          <p className="text-blue-200 text-lg">Learn Web3 Through Epic Adventures</p>
        </div>

        {/* Level Badge */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20 animate-fadeInScale animate-glow">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-4 rounded-full animate-float">
              <Wallet className="w-12 h-12 text-white" />
            </div>
            <div className="text-center">
              <div className="text-white/60 text-sm font-medium">LEVEL 2</div>
              <h2 className="text-3xl font-bold text-white mb-2">Bakery Checkout Quest</h2>
              <p className="text-blue-200">Master the Art of Wallet Creation</p>
            </div>
          </div>

          {/* Story */}
          <div className="bg-white/5 rounded-xl p-6 mb-6 border border-white/10 animate-slideInFromLeft">
            <div className="flex items-start gap-4">
              <div className="bg-purple-500/20 p-3 rounded-lg animate-float">
                <Sparkles className="w-6 h-6 text-purple-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-3">Your Quest Begins...</h3>
                <div className="space-y-3 text-blue-100">
                  <p>
                    Welcome to the mystical <strong>Crypto Bakery</strong>, where every customer needs a special 
                    magical wallet to store their precious pastries! As the newest Wallet Apprentice, 
                    your mission is to learn the ancient art of wallet creation.
                  </p>
                  <p>
                    Each wallet contains two powerful elements: a <strong>Secret Seed Phrase</strong> (the magical 
                    key) and a <strong>Public Address</strong> (where others can send pastries). Master this 
                    skill to become a true Web3 Hero!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quest Objectives */}
          <div className="grid md:grid-cols-2 gap-4 mb-8 animate-slideInFromRight">
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20 hover:bg-green-500/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-green-400 animate-float" />
                <h4 className="font-bold text-green-300">Main Quest</h4>
              </div>
              <p className="text-green-100 text-sm">Create wallets for 8 customers to complete the level</p>
            </div>
            
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <Wallet className="w-5 h-5 text-blue-400 animate-float" />
                <h4 className="font-bold text-blue-300">Learning Goal</h4>
              </div>
              <p className="text-blue-100 text-sm">Understand seed phrases, public keys, and wallet security</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideInFromTop">
            <button
              onClick={onStart}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 animate-glow"
            >
              <Play className="w-6 h-6" />
              Start Quest
            </button>
            
            <button
              onClick={onEducational}
              className="bg-white/10 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 border border-white/20 hover:scale-105"
            >
              <BookOpen className="w-6 h-6" />
              Learn About Wallets
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="text-center animate-fadeInScale">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-white/60 text-sm ml-2">Level 2 of 10</span>
          </div>
        </div>
      </div>
    </div>
  );
}