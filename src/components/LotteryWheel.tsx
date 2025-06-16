import React, { useState, useEffect } from 'react';
import { Trophy, Sparkles, Star, Zap } from 'lucide-react';
import { Participant } from '../types';

interface LotteryWheelProps {
  participants: Participant[];
  isDrawing: boolean;
  winner: Participant | null;
  onDraw: () => void;
}

const LotteryWheel: React.FC<LotteryWheelProps> = ({ 
  participants, 
  isDrawing, 
  winner, 
  onDraw 
}) => {
  const [displayedName, setDisplayedName] = useState<string>('');
  const [animationFrame, setAnimationFrame] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isDrawing) {
      let speed = 50; // Velocidade inicial rápida
      const slowDown = () => {
        const randomParticipant = participants[Math.floor(Math.random() * participants.length)];
        setDisplayedName(randomParticipant.name);
        setAnimationFrame(prev => prev + 1);
        
        // Diminui a velocidade gradualmente
        speed = Math.min(speed + 10, 300);
        
        if (speed < 300) {
          setTimeout(slowDown, speed);
        }
      };
      
      slowDown();
    } else if (winner) {
      setDisplayedName(winner.name);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDrawing, participants, winner]);

  if (participants.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Carregue participantes para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <Star className="w-4 h-4 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Zap className="w-8 h-8 text-yellow-300 animate-pulse" />
              <h2 className="text-3xl font-bold text-white">Sorteio Mágico</h2>
              <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
            </div>
            <p className="text-purple-100 text-lg">
              {participants.length} participantes prontos para a sorte
            </p>
          </div>
        </div>

        <div className="p-12 bg-gradient-to-br from-gray-50 to-white">
          <div className="relative flex justify-center">
            {/* Outer Ring with Particles */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-3 h-3 rounded-full ${
                    isDrawing ? 'animate-spin' : ''
                  }`}
                  style={{
                    transform: `rotate(${i * 30}deg) translateY(-140px)`,
                    animationDuration: '2s',
                    animationDelay: `${i * 0.1}s`
                  }}
                >
                  <div className={`w-3 h-3 rounded-full ${
                    i % 3 === 0 ? 'bg-yellow-400' : 
                    i % 3 === 1 ? 'bg-pink-400' : 'bg-blue-400'
                  } ${isDrawing ? 'animate-pulse' : ''}`}></div>
                </div>
              ))}
            </div>

            {/* Main Wheel */}
            <div className={`relative w-80 h-80 rounded-full transition-all duration-500 ${
              isDrawing 
                ? 'animate-spin shadow-2xl shadow-purple-500/50' 
                : winner 
                ? 'shadow-2xl shadow-yellow-500/50 scale-105' 
                : 'shadow-xl'
            }`}
            style={{
              background: isDrawing 
                ? 'conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff, #5f27cd, #ff6b6b)'
                : winner
                ? 'conic-gradient(from 0deg, #ffd700, #ffed4e, #ffd700, #ffed4e, #ffd700, #ffed4e)'
                : 'conic-gradient(from 0deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #667eea)',
              animationDuration: isDrawing ? '0.5s' : '2s'
            }}>
              
              {/* Inner Circle */}
              <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center shadow-inner">
                <div className="text-center p-4">
                  {isDrawing ? (
                    <div className="space-y-3">
                      <div className="flex justify-center space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          ></div>
                        ))}
                      </div>
                      <div className="text-lg font-bold text-gray-800">Sorteando...</div>
                      <div className={`text-sm text-gray-600 px-2 transition-all duration-100 ${
                        animationFrame % 2 === 0 ? 'scale-110 text-purple-600' : 'scale-100'
                      }`}>
                        {displayedName}
                      </div>
                    </div>
                  ) : winner ? (
                    <div className="space-y-3 animate-pulse">
                      <Trophy className="w-12 h-12 text-yellow-500 mx-auto animate-bounce" />
                      <div className="text-lg font-bold text-gray-800">🎉 Vencedor! 🎉</div>
                      <div className="text-sm text-gray-600">Parabéns!</div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="relative">
                        <Sparkles className="w-12 h-12 text-purple-500 mx-auto" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                      </div>
                      <div className="text-lg font-bold text-gray-800">Pronto!</div>
                      <div className="text-sm text-gray-600">Clique para sortear</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pointer */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="relative">
                <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-red-500 drop-shadow-lg"></div>
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Winner Display */}
          {winner && !isDrawing && (
            <div className="mt-12 p-8 bg-gradient-to-r from-yellow-100 via-yellow-50 to-orange-100 rounded-2xl border-2 border-yellow-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10"></div>
              <div className="relative text-center">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Trophy className="w-16 h-16 text-yellow-600 animate-bounce" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-4 animate-pulse">
                  🎊 PARABÉNS! 🎊
                </h3>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-yellow-200">
                  <p className="text-2xl text-gray-700 font-bold mb-2">{winner.name}</p>
                  {winner.email && (
                    <p className="text-gray-600 mb-1">📧 {winner.email}</p>
                  )}
                  {winner.phone && (
                    <p className="text-gray-600">📱 {winner.phone}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Draw Button */}
          <div className="mt-12 text-center">
            <button
              onClick={onDraw}
              disabled={isDrawing || participants.length === 0}
              className={`
                relative px-12 py-6 rounded-full font-bold text-xl transition-all duration-300 transform overflow-hidden
                ${isDrawing || participants.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-red-700 hover:scale-105 shadow-2xl hover:shadow-purple-500/50'
                }
              `}
            >
              <div className="relative z-10 flex items-center space-x-3">
                {isDrawing ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <span>Sorteando...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    <span>REALIZAR SORTEIO</span>
                    <Zap className="w-6 h-6" />
                  </>
                )}
              </div>
              
              {!isDrawing && participants.length > 0 && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 animate-pulse"></div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotteryWheel;