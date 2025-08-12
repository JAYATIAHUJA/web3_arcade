import React from 'react';
import { X, Wallet, Clock, Trophy } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto border border-purple-500/30 animate-fadeInScale">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">How to Play</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110"
          >
            <X className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-900/30 rounded-lg p-6 border border-blue-500/30 backdrop-blur-sm animate-slideInFromTop">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="w-8 h-8 text-blue-400 animate-float" />
              <h3 className="text-xl font-bold text-blue-200">QuestChain Level 2: Wallet Creation</h3>
            </div>
            <p className="text-blue-100">
              Welcome to Level 2 of your Web3 learning journey! This quest teaches the basics of 
              cryptocurrency wallets through an interactive bakery simulation. Each customer needs 
              a wallet to store their pastries, just like how crypto wallets store digital assets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-900/30 rounded-lg p-6 border border-green-500/30 backdrop-blur-sm animate-slideInFromLeft">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold animate-float">1</div>
                <h4 className="font-bold text-green-200">Accept Quest</h4>
              </div>
              <p className="text-green-100 text-sm">
                Each customer shows their order and gets a new wallet. Look at what pastries they want and the wallet details.
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/30 backdrop-blur-sm animate-slideInFromRight">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold animate-float">2</div>
                <h4 className="font-bold text-purple-200">Study Wallet</h4>
              </div>
              <p className="text-purple-100 text-sm">
                Examine the wallet's seed phrase and public key. Learn how these components work together for security.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <div className="bg-orange-900/30 rounded-lg p-6 border border-orange-500/30 backdrop-blur-sm animate-slideInFromLeft">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold animate-float">3</div>
                <h4 className="font-bold text-orange-200">Fill Wallet</h4>
              </div>
              <p className="text-orange-100 text-sm">
                Drag the correct pastries from the menu into the wallet. This simulates how tokens are stored in real wallets.
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <div className="bg-red-900/30 rounded-lg p-6 border border-red-500/30 backdrop-blur-sm animate-slideInFromRight">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-8 h-8 text-red-400 animate-float" />
                <h4 className="font-bold text-red-200">Complete Quest</h4>
              </div>
              <p className="text-red-100 text-sm">
                Complete each wallet before time runs out. Serve 8 customers to earn your NFT badge!
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
          <div className="bg-yellow-900/30 rounded-lg p-6 border border-yellow-500/30 backdrop-blur-sm animate-slideInFromTop">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-yellow-400 animate-float" />
              <h3 className="text-xl font-bold text-yellow-200">Quest Rewards & Learning</h3>
            </div>
            <div className="space-y-3 text-yellow-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-sparkle"></div>
                <span><strong>+10 points</strong> for each completed wallet</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-sparkle"></div>
                <span><strong>NFT Badge:</strong> "Wallet Maker" for completing the quest</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-sparkle"></div>
                <span><strong>Seed Phrase:</strong> A secret backup for the wallet (like a password)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-sparkle"></div>
                <span><strong>Public Key:</strong> The wallet's address for receiving items</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-sparkle"></div>
                <span><strong>Ledger:</strong> Keeps track of all completed wallets (like a blockchain record)</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg p-6">
          <div className="bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-lg p-6 animate-glow">
            <h4 className="font-bold text-lg mb-2">Ready for Your Quest?</h4>
            <p className="text-purple-100">
              Complete this level to earn your "Wallet Maker" NFT badge and unlock the next quest 
              in your Web3 learning journey! 🎯✨
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 animate-glow"
          >
            Got it! Let's Start the Quest
          </button>
        </div>
      </div>
    </div>
  );
}
  )
}