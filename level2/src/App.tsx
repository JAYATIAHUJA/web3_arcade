import React, { useState, useEffect, useCallback } from 'react';
import { Timer, Wallet, ShoppingCart, Trophy, Clock, Star, Map, Award, BookOpen } from 'lucide-react';
import { GameHeader } from './components/GameHeader';
import { StoryIntro } from './components/StoryIntro';
import { LevelComplete } from './components/LevelComplete';
import { PastryMenu } from './components/PastryMenu';
import { WalletArea } from './components/WalletArea';
import { CustomerOrder } from './components/CustomerOrder';
import { WalletLedger } from './components/WalletLedger';
import { EducationalModal } from './components/EducationalModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { generateWallet } from './utils/walletUtils';
import { generateOrder, pastryTypes } from './utils/gameUtils';
import type { Wallet as WalletType, CompletedWallet, GameState, PastryType } from './types';

const INITIAL_TIME = 25;
const POINTS_SUCCESS = 10;
const POINTS_FAILURE = -5;
const WALLETS_TO_WIN = 8; // Boss challenge requirement

function App() {
  const [gamePhase, setGamePhase] = useState<'intro' | 'playing' | 'complete'>('intro');
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    customersServed: 0,
    timeLeft: INITIAL_TIME,
    isPlaying: false,
    gameOver: false,
    questProgress: 0
  });
  
  const [currentWallet, setCurrentWallet] = useState<WalletType | null>(null);
  const [currentOrder, setCurrentOrder] = useState<PastryType[]>([]);
  const [addedPastries, setAddedPastries] = useState<PastryType[]>([]);
  const [completedWallets, setCompletedWallets] = useState<CompletedWallet[]>([]);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showEducational, setShowEducational] = useState(false);
  const [feedback, setFeedback] = useState<{message: string; type: 'success' | 'error' | 'info'} | null>(null);

  const showFeedback = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 2000);
  }, []);

  const startGame = () => {
    setGamePhase('playing');
  };

  const startNewCustomer = useCallback(() => {
    const wallet = generateWallet();
    const order = generateOrder(gameState.level);
    
    setCurrentWallet(wallet);
    setCurrentOrder(order);
    setAddedPastries([]);
    setGameState(prev => ({
      ...prev,
      timeLeft: INITIAL_TIME,
      isPlaying: true,
      questProgress: Math.min(100, (prev.customersServed / WALLETS_TO_WIN) * 100)
    }));
  }, [gameState.level]);

  const handlePastryDrop = useCallback((pastryType: PastryType) => {
    if (!gameState.isPlaying || !currentOrder.length) return;

    // Check if pastry is needed for the order
    if (!currentOrder.includes(pastryType)) {
      showFeedback('Wrong pastry! This customer didn\'t order that.', 'error');
      setGameState(prev => ({ ...prev, score: Math.max(0, prev.score + POINTS_FAILURE) }));
      return;
    }

    // Check if already added enough of this type
    const neededCount = currentOrder.filter(p => p === pastryType).length;
    const addedCount = addedPastries.filter(p => p === pastryType).length;
    
    if (addedCount >= neededCount) {
      showFeedback('Already added enough of those!', 'error');
      return;
    }

    // Add the pastry
    const newAddedPastries = [...addedPastries, pastryType];
    setAddedPastries(newAddedPastries);
    showFeedback('Perfect! Added to wallet.', 'success');

    // Check if order is complete
    if (newAddedPastries.length === currentOrder.length) {
      completeOrder();
    }
  }, [gameState.isPlaying, currentOrder, addedPastries, showFeedback]);

  const completeOrder = useCallback(() => {
    if (!currentWallet) return;

    const completedWallet: CompletedWallet = {
      ...currentWallet,
      order: currentOrder,
      completedAt: new Date(),
      pointsEarned: POINTS_SUCCESS
    };

    setCompletedWallets(prev => [completedWallet, ...prev]);
    setGameState(prev => ({
      ...prev,
      score: prev.score + POINTS_SUCCESS,
      customersServed: prev.customersServed + 1,
      isPlaying: false,
      level: Math.floor((prev.customersServed + 1) / 5) + 1,
      questProgress: Math.min(100, ((prev.customersServed + 1) / WALLETS_TO_WIN) * 100)
    }));

    showFeedback('🎉 Wallet created successfully! +' + POINTS_SUCCESS + ' points', 'success');
    
    // Check if level complete
    if (completedWallets.length + 1 >= WALLETS_TO_WIN) {
      setTimeout(() => {
        setGamePhase('complete');
      }, 2000);
      return;
    }
    
    // Auto-start next customer after delay
    setTimeout(() => {
      startNewCustomer();
    }, 3000);
  }, [currentWallet, currentOrder, startNewCustomer, showFeedback]);

  const failOrder = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      score: Math.max(0, prev.score + POINTS_FAILURE),
      isPlaying: false
    }));
    
    showFeedback('⏰ Time\'s up! Customer left without their wallet.', 'error');
    
    // Auto-start next customer after delay
    setTimeout(() => {
      startNewCustomer();
    }, 2000);
  }, [startNewCustomer, showFeedback]);

  // Timer effect
  useEffect(() => {
    if (!gameState.isPlaying || gameState.timeLeft <= 0) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft - 1;
        if (newTimeLeft <= 0) {
          failOrder();
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: newTimeLeft };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isPlaying, gameState.timeLeft, failOrder]);

  // Start first customer on mount
  useEffect(() => {
    if (gamePhase === 'playing') {
      const timer = setTimeout(() => {
      startNewCustomer();
      }, 1000);
    return () => clearTimeout(timer);
    }
  }, [gamePhase]);

  const resetGame = () => {
    setGameState({
      score: 0,
      level: 1,
      customersServed: 0,
      timeLeft: INITIAL_TIME,
      isPlaying: false,
      gameOver: false,
      questProgress: 0
    });
    setCompletedWallets([]);
    setCurrentWallet(null);
    setCurrentOrder([]);
    setAddedPastries([]);
    setGamePhase('intro');
  };

  if (gamePhase === 'intro') {
    return <StoryIntro onStart={startGame} onEducational={() => setShowEducational(true)} />;
  }

  if (gamePhase === 'complete') {
    return (
      <LevelComplete 
        score={gameState.score}
        walletsCreated={completedWallets.length}
        onRestart={resetGame}
        onNextLevel={() => alert('Next level coming soon!')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <GameHeader 
          gameState={gameState}
          onHowToPlay={() => setShowHowToPlay(true)}
          onEducational={() => setShowEducational(true)}
          onReset={resetGame}
          walletsToWin={WALLETS_TO_WIN}
        />

        {feedback && (
          <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-all duration-500 animate-slideInFromTop ${
            feedback.type === 'success' ? 'bg-green-500' : 
            feedback.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
          }`}>
            {feedback.message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Pastry Menu */}
          <div className="lg:col-span-1 animate-slideInFromLeft">
            <PastryMenu />
          </div>

          {/* Middle Column - Game Area */}
          <div className="lg:col-span-2 space-y-6 animate-fadeInScale">
            <CustomerOrder 
              order={currentOrder}
              timeLeft={gameState.timeLeft}
              isPlaying={gameState.isPlaying}
            />
            
            <WalletArea
              wallet={currentWallet}
              addedPastries={addedPastries}
              onPastryDrop={handlePastryDrop}
              isPlaying={gameState.isPlaying}
            />
          </div>

          {/* Right Column - Ledger */}
          <div className="lg:col-span-1 animate-slideInFromRight">
            <WalletLedger wallets={completedWallets} />
          </div>
        </div>

        <HowToPlayModal 
          isOpen={showHowToPlay}
          onClose={() => setShowHowToPlay(false)}
        />

        <EducationalModal 
          isOpen={showEducational}
          onClose={() => setShowEducational(false)}
        />
      </div>
    </div>
  );
}

export default App;