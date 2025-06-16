import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-black shadow-2xl border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <img
              src="https://supabase.resolvenergiasolar.com/storage/v1/object/public/parceiros//Logo-resolve-1024x279.webp"
              alt="Resolve Energia Solar"
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;