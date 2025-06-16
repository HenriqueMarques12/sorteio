import React, { useRef } from 'react';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  error: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isProcessing, error }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    const excelFile = files.find(file => 
      file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
    );
    
    if (excelFile) {
      onFileSelect(excelFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-all duration-300 ${
          isProcessing ? 'opacity-50 pointer-events-none' : 'cursor-pointer hover:bg-green-50'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
          disabled={isProcessing}
        />
        
        <div className="flex flex-col items-center">
          {isProcessing ? (
            <div className="animate-spin w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full mb-4"></div>
          ) : (
            <div className="relative mb-4">
              <FileSpreadsheet className="w-16 h-16 text-green-600 mb-2" />
              <Upload className="w-6 h-6 text-green-400 absolute -top-1 -right-1 animate-bounce" />
            </div>
          )}
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {isProcessing ? 'Processando arquivo...' : 'Upload do arquivo Excel'}
          </h3>
          
          <p className="text-gray-600 mb-4">
            {isProcessing 
              ? 'Aguarde enquanto processamos seus dados'
              : 'Arraste e solte seu arquivo aqui ou clique para selecionar'
            }
          </p>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Formatos aceitos:</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">.xlsx</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">.xls</span>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-red-800">Erro no processamento</h4>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;