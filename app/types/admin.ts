// Tipos para el panel de administración

export interface Document {
  id: string;
  title: string;
  author: string;
  email: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  pdfSize: string;
  downloads: number;
  aiUsage: number;
  summary?: string;
  keywords?: string[];
  source?: string;
  doi?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'free' | 'plus' | 'admin';
  tokensUsed: number;
  tokensLimit: number;
  documentsUploaded: number;
  avatar?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  email: string;
  action: 'approved' | 'rejected';
  timestamp: string;
}

export interface CategoryStats {
  name: string;
  count: number;
}

export interface DashboardMetrics {
  totalDocuments: number;
  totalDocumentsTrend: number;
  approvedLastMonth: number;
  approvedTrend: number;
  rejectedLastMonth: number;
  rejectedTrend: number;
  activeUsers: number;
  activeUsersTrend: number;
}
