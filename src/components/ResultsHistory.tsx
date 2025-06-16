import React from 'react';
import { History, Trophy, Calendar, Users } from 'lucide-react';
import { LotteryResult } from '../types';

interface ResultsHistoryProps {
  results: LotteryResult[];
  onClear: () => void;
}

const ResultsHistory: React.FC<ResultsHistoryProps> = ({ results, onClear }) => {
  if (results.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <History className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Histórico de Sorteios</h2>
            <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium">
              {results.length} sorteios
            </span>
          </div>
          <button
            onClick={onClear}
            className="px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all duration-200 text-sm font-medium"
          >
            Limpar Histórico
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {results.map((result, index) => (
          <div key={result.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {result.winner.name}
                  </h3>
                  {result.winner.email && (
                    <p className="text-sm text-gray-600">{result.winner.email}</p>
                  )}
                  {result.winner.phone && (
                    <p className="text-sm text-gray-600">{result.winner.phone}</p>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {result.timestamp.toLocaleString('pt-BR')}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  {result.participantCount} participantes
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsHistory;