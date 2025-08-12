import React, { useState } from 'react';
import { Wallet, Eye, EyeOff, Copy, Check } from 'lucide-react';
import { pastryTypes } from '../utils/gameUtils';
import type { Wallet as WalletType, PastryType } from '../types';

interface WalletAreaProps {
  wallet: WalletType | null;
  addedPastries: PastryType[];
  onPastryDrop: (pastryType: PastryType) => void;
  isPlaying: boolean;
}

export function WalletArea({ wallet, addedPastries, onPastryDrop, isPlaying }: WalletAreaProps) {
  const [showSeed, setShowSeed] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const pastryType = e.dataTransfer.getData('text/plain') as PastryType;
    if (pastryType && isPlaying) {
      onPastryDrop(pastryType);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const maskSeedPhrase = (seed: string) => {
    const words = seed.split(' ');
    return words.map((word, index) => 
      index < 3 || index > words.length - 4 ? word : '***'
    ).join(' ');
  };

  if (!wallet) {
    return (
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-purple-500/30">
        <div className="text-center text-gray-400">
          <Wallet className="w-16 h-16 mx-auto mb-4 text-gray-500 animate-float" />
          <p className="text-lg">Waiting for customer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl border border-purple-500/30 overflow-hidden animate-glow">
      {/* Wallet Header */}
      <div className="bg-gradient-to-r from-purple-700 to-blue-700 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-shimmer"></div>
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-8 h-8 animate-float" />
          <div>
            <h3 className="text-xl font-bold">Customer Wallet</h3>
            <p className="text-purple-100">ID: {wallet.id}</p>
          </div>
        </div>

        {/* Wallet Details */}
        <div className="space-y-3">
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Public Key</span>
              <button
                onClick={() => copyToClipboard(wallet.publicKey, 'publicKey')}
                className="p-1 hover:bg-white/20 rounded transition-all duration-300 hover:scale-110"
              >
                {copiedField === 'publicKey' ? 
                  <Check className="w-4 h-4" /> : 
                  <Copy className="w-4 h-4" />
                }
              </button>
            </div>
            <div className="font-mono text-sm break-all">
              {wallet.publicKey}
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Seed Phrase</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setShowSeed(!showSeed)}
                  className="p-1 hover:bg-white/20 rounded transition-all duration-300 hover:scale-110"
                >
                  {showSeed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => copyToClipboard(wallet.seedPhrase, 'seedPhrase')}
                  className="p-1 hover:bg-white/20 rounded transition-all duration-300 hover:scale-110"
                >
                  {copiedField === 'seedPhrase' ? 
                    <Check className="w-4 h-4" /> : 
                    <Copy className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>
            <div className="font-mono text-xs break-all">
              {showSeed ? wallet.seedPhrase : maskSeedPhrase(wallet.seedPhrase)}
            </div>
          </div>
        </div>
      </div>

      {/* Drop Zone */}
      <div className="p-6">
        <h4 className="text-lg font-semibold text-white mb-4">
          Pastries in Wallet
        </h4>
        
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`
            min-h-40 border-3 border-dashed rounded-xl p-6 backdrop-blur-sm
            transition-all duration-200
            ${isPlaying 
              ? 'border-green-400 bg-green-900/20 hover:bg-green-900/30 hover:border-green-300 animate-glow' 
              : 'border-gray-600 bg-gray-700/20'
            }
          `}
        >
          {addedPastries.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {addedPastries.map((pastryType, index) => (
                <div
                  key={index}
                  className={`
                    bg-gray-700/50 backdrop-blur-sm
                    rounded-lg p-4 text-center border border-purple-500/30
                    animate-[fadeInScale_0.3s_ease-out]
                    hover:scale-105 transition-transform duration-200
                  `}
                >
                  <div className="text-3xl mb-2">
                    <span className="animate-sparkle">{pastryTypes[pastryType].emoji}</span>
                  </div>
                  <div className="text-sm font-medium text-white">
                    {pastryTypes[pastryType].name}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              {isPlaying ? (
                <>
                  <div className="text-4xl mb-4 animate-float">🎯</div>
                  <p className="text-lg font-medium text-white">Drop pastries here!</p>
                  <p className="text-sm">Drag items from the menu to fulfill the order</p>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-4 animate-float">💼</div>
                  <p className="text-lg text-white">Wallet is ready</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}