import { useState, useCallback } from 'react';
import { Participant, LotteryResult } from '../types';

export const useLottery = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [results, setResults] = useState<LotteryResult[]>([]);

  const performDraw = useCallback(async (participants: Participant[]): Promise<Participant> => {
    if (participants.length === 0) {
      throw new Error('Nenhum participante disponível para sorteio');
    }

    setIsDrawing(true);

    // Simula o tempo de sorteio com animação
    await new Promise(resolve => setTimeout(resolve, 3000));

    const randomIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[randomIndex];

    const result: LotteryResult = {
      id: Date.now().toString(),
      winner,
      timestamp: new Date(),
      participantCount: participants.length
    };

    setResults(prev => [result, ...prev]);
    setIsDrawing(false);

    return winner;
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
  }, []);

  return {
    performDraw,
    isDrawing,
    results,
    clearResults
  };
};