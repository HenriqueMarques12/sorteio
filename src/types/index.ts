export interface Participant {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

export interface LotteryResult {
  id: string;
  winner: Participant;
  timestamp: Date;
  participantCount: number;
}

export interface ExcelData {
  headers: string[];
  rows: any[][];
}