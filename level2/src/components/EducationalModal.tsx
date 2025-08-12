import React from 'react';
import { X, Wallet, Key, Shield, Eye, Copy, AlertTriangle } from 'lucide-react';

interface EducationalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EducationalModal({ isOpen, onClose }: EducationalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto border border-purple-500/30 animate-fadeInScale">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Understanding Crypto Wallets</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-all duration-300 hover:scale-110"
          >
            <X className="w-6 h-6 text-gray-300" />
          </button>
        </div>

        <div className="space-y-8">
          {/* What is a Wallet */}
          <div className="bg-blue-900/30 rounded-lg p-6 border border-blue-500/30 backdrop-blur-sm animate-slideInFromLeft">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="w-8 h-8 text-blue-400 animate-float" />
              <h3 className="text-xl font-bold text-blue-200">What is a Crypto Wallet?</h3>
            </div>
            <p className="text-blue-100 mb-4">
              A crypto wallet is like a digital bank account that stores your cryptocurrencies and NFTs. 
              Unlike traditional bank accounts, you have complete control over your wallet - no bank or 
              company can freeze or access it without your permission.
            </p>
            <div className="bg-blue-800/30 rounded-lg p-4 border border-blue-500/20">
              <p className="text-blue-200 text-sm">
                <strong>Think of it like this:</strong> If cryptocurrency is digital money, then a wallet 
                is your digital wallet or purse that holds that money safely.
              </p>
            </div>
          </div>

          {/* Seed Phrase */}
          <div className="bg-green-900/30 rounded-lg p-6 border border-green-500/30 backdrop-blur-sm animate-slideInFromRight">
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-8 h-8 text-green-400 animate-float" />
              <h3 className="text-xl font-bold text-green-200">Seed Phrase (Recovery Phrase)</h3>
            </div>
            <p className="text-green-100 mb-4">
              A seed phrase is a list of 12-24 words that acts as the master key to your wallet. 
              It's like the ultimate password that can restore access to your wallet if you lose your device.
            </p>
            
            <div className="bg-green-800/30 rounded-lg p-4 mb-4 border border-green-500/20">
              <p className="text-green-200 font-mono text-sm">
                Example: "apple banana cherry dragon elephant forest garden house island jungle kitchen lemon"
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-700/50 rounded-lg p-4 border border-green-500/30">
                <h4 className="font-bold text-green-300 mb-2">✅ Do:</h4>
                <ul className="text-green-200 text-sm space-y-1">
                  <li>• Write it down on paper</li>
                  <li>• Store it in a safe place</li>
                  <li>• Keep multiple copies</li>
                  <li>• Never share it with anyone</li>
                </ul>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4 border border-red-500/30">
                <h4 className="font-bold text-red-300 mb-2">❌ Don't:</h4>
                <ul className="text-red-200 text-sm space-y-1">
                  <li>• Store it digitally (photos, notes)</li>
                  <li>• Share it online or with others</li>
                  <li>• Store it on your computer</li>
                  <li>• Ignore backing it up</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Public Key */}
          <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/30 backdrop-blur-sm animate-slideInFromLeft">
            <div className="flex items-center gap-3 mb-4">
              <Copy className="w-8 h-8 text-purple-400 animate-float" />
              <h3 className="text-xl font-bold text-purple-200">Public Key (Wallet Address)</h3>
            </div>
            <p className="text-purple-100 mb-4">
              Your public key is like your wallet's mailing address. It's a long string of letters and 
              numbers that others use to send you cryptocurrency or NFTs. It's completely safe to share.
            </p>
            
            <div className="bg-purple-800/30 rounded-lg p-4 mb-4 border border-purple-500/20">
              <p className="text-purple-200 font-mono text-sm break-all">
                Example: 0x742d35Cc6634C0532925a3b8D4C2C4e4C4e4C4e4C4e4
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="bg-gray-700/50 rounded-lg p-4 border border-purple-500/30">
              <p className="text-purple-200 text-sm">
                <strong>Real-world analogy:</strong> Your public key is like your home address - 
                you can safely give it to anyone who needs to send you mail (or crypto), but they 
                can't use it to break into your house (access your funds).
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="bg-red-900/30 rounded-lg p-6 border border-red-500/30 backdrop-blur-sm animate-slideInFromRight">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-red-400 animate-float" />
              <h3 className="text-xl font-bold text-red-200">Wallet Security</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-red-300 mb-3">🔒 Keep Private:</h4>
                <ul className="text-red-200 text-sm space-y-2">
                  <li>• Seed phrase (recovery words)</li>
                  <li>• Private keys</li>
                  <li>• Wallet passwords</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-green-300 mb-3">🌐 Safe to Share:</h4>
                <ul className="text-green-200 text-sm space-y-2">
                  <li>• Public address/key</li>
                  <li>• Transaction hashes</li>
                  <li>• Wallet balance (if you want)</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-100 rounded-lg p-4 mt-4">
            <div className="bg-red-800/30 rounded-lg p-4 mt-4 border border-red-500/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400 animate-float" />
                <span className="font-bold text-red-300">Important:</span>
              </div>
              <p className="text-red-200 text-sm">
                If someone gets your seed phrase, they can steal all your crypto. There's no customer 
                service to call - your funds would be gone forever. Always keep it secret and secure!
              </p>
            </div>
          </div>

          {/* Game Connection */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-700 text-white rounded-lg p-6 animate-glow">
            <h4 className="font-bold text-lg mb-3">How This Connects to the Game</h4>
            <p className="text-purple-100 mb-4">
              In our Bakery Checkout game, each customer gets a wallet to store their pastries (like tokens). 
              You'll see how wallets are created with seed phrases and public keys, just like in real crypto!
            </p>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
              <p className="text-purple-100 text-sm">
                <strong>Learning Goal:</strong> By the end of this level, you'll understand the basics 
                of wallet creation and security - essential knowledge for anyone entering the Web3 world!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 animate-glow"
          >
            Ready to Start Learning!
          </button>
        </div>
      </div>
    </div>
  );
}
  )
}