import { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { ExcelData, Participant } from '../types';

export const useExcelProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processExcelFile = useCallback(async (file: File): Promise<Participant[]> => {
    setIsProcessing(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
      
      if (jsonData.length < 2) {
        throw new Error('O arquivo deve conter pelo menos um cabeçalho e uma linha de dados');
      }

      const headers = jsonData[0] as string[];
      const rows = jsonData.slice(1).filter(row => row.some(cell => cell !== undefined && cell !== ''));

      if (rows.length === 0) {
        throw new Error('Nenhum participante válido encontrado no arquivo');
      }

      const participants: Participant[] = rows.map((row, index) => {
        const participant: Participant = {
          id: index + 1,
          name: String(row[0] || `Participante ${index + 1}`)
        };

        headers.forEach((header, headerIndex) => {
          if (headerIndex > 0 && row[headerIndex] !== undefined) {
            const key = header.toLowerCase().replace(/\s+/g, '_');
            participant[key] = row[headerIndex];
            
            if (key.includes('email')) participant.email = String(row[headerIndex]);
            if (key.includes('telefone') || key.includes('phone')) participant.phone = String(row[headerIndex]);
          }
        });

        return participant;
      });

      return participants;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao processar arquivo Excel';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    processExcelFile,
    isProcessing,
    error,
    clearError: () => setError(null)
  };
};