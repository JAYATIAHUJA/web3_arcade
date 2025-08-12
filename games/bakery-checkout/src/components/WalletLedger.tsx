import React from 'react';
import { BookOpen, Wallet, Calendar, Star } from 'lucide-react';
import type { CompletedWallet } from '../types';

interface WalletLedgerProps {
  wallets: CompletedWallet[];
}

export function WalletLedger({ wallets }: WalletLedgerProps) {
  const totalValue = wallets.reduce((sum, wallet) => sum + wallet.pointsEarned, 0);

  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl border border-purple-500/30 max-h-[600px] flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-purple-400 animate-float" />
          <h3 className="text-xl font-bold text-white">Wallet Ledger</h3>
        </div>
        
        {wallets.length > 0 && (
          <div className="bg-purple-900/30 rounded-lg p-3 border border-purple-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-purple-300 font-medium">Total Created:</span>
              <span className="text-purple-200 font-bold">{wallets.length}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-purple-300 font-medium">Total Points:</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-purple-400 animate-sparkle" />
                <span className="text-purple-200 font-bold">{totalValue}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {wallets.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Wallet className="w-16 h-16 mx-auto mb-4 text-gray-500 animate-float" />
            <p className="text-lg font-medium text-white">No wallets created yet</p>
            <p className="text-sm">Complete customer orders to see wallets here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {wallets.map((wallet, index) => (
              <div
                key={wallet.id}
                className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:bg-gray-700/70 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 backdrop-blur-sm animate-slideInFromRight"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-purple-400" />
                    <span className="font-mono text-sm text-gray-300">
                      {wallet.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400">
                    <Star className="w-4 h-4 animate-sparkle" />
                    <span className="font-bold">+{wallet.pointsEarned}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="text-xs text-gray-400 uppercase font-semibold">Public Key</div>
                    <div className="font-mono text-xs text-gray-300 truncate">
                      {wallet.publicKey}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400 uppercase font-semibold">Seed (Partial)</div>
                    <div className="font-mono text-xs text-gray-300">
                      {wallet.seedPhrase.split(' ').slice(0, 3).join(' ')} • • • 
                      {wallet.seedPhrase.split(' ').slice(-2).join(' ')}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-400">
                      {wallet.completedAt.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}