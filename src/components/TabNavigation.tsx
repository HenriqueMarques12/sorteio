import React from 'react';
import { Upload, Users, Trophy, History } from 'lucide-react';

interface TabNavigationProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
  participantsCount: number;
  resultsCount: number;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  participantsCount,
  resultsCount 
}) => {
  const tabs = [
    {
      id: 0,
      name: 'Upload',
      icon: Upload,
      description: 'Carregar Excel',
      disabled: false
    },
    {
      id: 1,
      name: 'Participantes',
      icon: Users,
      description: `${participantsCount} carregados`,
      disabled: participantsCount === 0
    },
    {
      id: 2,
      name: 'Sorteio',
      icon: Trophy,
      description: 'Realizar sorteio',
      disabled: participantsCount === 0
    },
    {
      id: 3,
      name: 'Histórico',
      icon: History,
      description: `${resultsCount} sorteios`,
      disabled: resultsCount === 0
    }
  ];

  return (
    <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isDisabled = tab.disabled;
            
            return (
              <button
                key={tab.id}
                onClick={() => !isDisabled && onTabChange(tab.id)}
                disabled={isDisabled}
                className={`
                  relative py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 flex items-center space-x-2
                  ${isActive
                    ? 'border-green-500 text-green-600'
                    : isDisabled
                    ? 'border-transparent text-gray-400 cursor-not-allowed'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : isDisabled ? 'text-gray-400' : 'text-gray-500'}`} />
                <div className="text-left">
                  <div className="font-semibold">{tab.name}</div>
                  <div className="text-xs opacity-75">{tab.description}</div>
                </div>
                
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;