import React, { useState } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import FileUpload from './components/FileUpload';
import ParticipantsList from './components/ParticipantsList';
import LotteryWheel from './components/LotteryWheel';
import ResultsHistory from './components/ResultsHistory';
import { useExcelProcessor } from './hooks/useExcelProcessor';
import { useLottery } from './hooks/useLottery';
import { Participant } from './types';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [winner, setWinner] = useState<Participant | null>(null);
  
  const { processExcelFile, isProcessing, error, clearError } = useExcelProcessor();
  const { performDraw, isDrawing, results, clearResults } = useLottery();

  const handleFileSelect = async (file: File) => {
    try {
      clearError();
      setWinner(null);
      const processedParticipants = await processExcelFile(file);
      setParticipants(processedParticipants);
      // Avança automaticamente para a aba de participantes após o upload
      setActiveTab(1);
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      setParticipants([]);
    }
  };

  const handleDraw = async () => {
    try {
      setWinner(null);
      const drawnWinner = await performDraw(participants);
      setWinner(drawnWinner);
    } catch (error) {
      console.error('Erro no sorteio:', error);
    }
  };

  const handleTabChange = (tab: number) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Sistema de Sorteio com Excel
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Faça upload do seu arquivo Excel com a lista de participantes e realize sorteios de forma rápida, justa e transparente.
              </p>
            </div>
            
            <FileUpload
              onFileSelect={handleFileSelect}
              isProcessing={isProcessing}
              error={error}
            />
          </div>
        );
      
      case 1:
        return <ParticipantsList participants={participants} />;
      
      case 2:
        return (
          <LotteryWheel
            participants={participants}
            isDrawing={isDrawing}
            winner={winner}
            onDraw={handleDraw}
          />
        );
      
      case 3:
        return <ResultsHistory results={results} onClear={clearResults} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      
      <TabNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        participantsCount={participants.length}
        resultsCount={results.length}
      />
      
      <main className="container mx-auto px-4 py-12">
        <div className="min-h-[600px]">
          {renderTabContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p className="text-lg">© 2025 Resolve Energia Solar - Sistema de Sorteio</p>
            <p className="text-sm mt-2 opacity-75">Desenvolvido com tecnologia de ponta para sorteios justos e transparentes</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;