import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { pastryTypes } from '../utils/gameUtils';
import type { PastryType } from '../types';

export function PastryMenu() {
  const handleDragStart = (e: React.DragEvent, pastryType: PastryType) => {
    e.dataTransfer.setData('text/plain', pastryType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-purple-500/30">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="w-6 h-6 text-purple-400 animate-float" />
        <h2 className="text-xl font-bold text-white">Pastry Menu</h2>
      </div>
      
      <div className="space-y-3">
        {Object.entries(pastryTypes).map(([key, pastry]) => (
          <div
            key={key}
            draggable
            onDragStart={(e) => handleDragStart(e, key as PastryType)}
            className={`
              bg-gray-700/50 backdrop-blur-sm
              rounded-xl p-4 cursor-grab active:cursor-grabbing 
              border-2 border-dashed border-gray-600 
              hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20
              transition-all duration-300 
              hover:scale-105 active:scale-95 hover:animate-glow
              group
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl group-hover:animate-float">{pastry.emoji}</span>
                <div>
                  <div className="font-semibold text-white">
                    {pastry.name}
                  </div>
                  <div className="text-sm text-gray-300">
                    ${pastry.price}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400 bg-gray-600/50 px-2 py-1 rounded border border-gray-500/30">
                Drag me!
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
        <p className="text-sm text-purple-200">
          💡 <strong>Tip:</strong> Drag pastries to the wallet area to fulfill customer orders!
        </p>
      </div>
    </div>
  );
}