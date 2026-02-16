'use client';

import { Coins, Zap } from 'lucide-react';

interface TokenCounterProps {
  remainingTokens: number;
  totalTokens: number;
  isPlusUser?: boolean;
}

export function TokenCounter({ remainingTokens, totalTokens, isPlusUser = false }: TokenCounterProps) {
  const percentage = (remainingTokens / totalTokens) * 100;
  
  const getColorClass = () => {
    if (percentage > 50) return 'bg-teal-500';
    if (percentage > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTextColorClass = () => {
    if (percentage > 50) return 'text-teal-400';
    if (percentage > 20) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-gray-400" />
          <span className="text-xs font-medium text-gray-400">Tokens disponibles</span>
        </div>
        {isPlusUser && (
          <div className="flex items-center gap-1 bg-teal-500/20 px-2 py-0.5 rounded-full">
            <Zap className="w-3 h-3 text-teal-400" />
            <span className="text-[10px] font-semibold text-teal-400">PLUS</span>
          </div>
        )}
      </div>
      
      <div className="flex items-end justify-between mb-2">
        <div>
          <span className={`text-2xl font-bold ${getTextColorClass()}`}>
            {remainingTokens.toLocaleString()}
          </span>
          <span className="text-xs text-gray-500 ml-1">
            / {totalTokens.toLocaleString()}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {percentage.toFixed(0)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${getColorClass()} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>

    </div>
  );
}
