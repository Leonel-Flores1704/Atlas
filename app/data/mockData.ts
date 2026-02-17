import { Document, User, ActivityItem, CategoryStats, DashboardMetrics } from '../types/admin';

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'CRISPR-Cas9: Nuevos avances en edición genética',
    author: 'Dr. Jennifer Doudna',
    email: 'maria.garcia@scitech.com',
    category: 'Biotecnología',
    status: 'pending',
    date: '2024-01-15',
    pdfSize: '2.4 MB',
    downloads: 342,
    aiUsage: 89,
    summary: 'Este estudio presenta los últimos avances en tecnología CRISPR-Cas9 para la edición precisa del genoma humano, con aplicaciones potenciales en el tratamiento de enfermedades genéticas. Se detallan mejoras en la especificidad de corte, reducción de efectos off-target, y nuevas variantes de Cas9 con mayor precisión. Los resultados demuestran un 99.2% de precisión en ediciones dirigidas, superando significativamente las generaciones anteriores de la tecnología.',
    keywords: ['CRISPR', 'Edición Genética', 'Biotecnología', 'Terapia Génica', 'Medicina Molecular'],
    source: 'Nature Biotechnology, Vol. 42, Issue 1, 2024',
    doi: '10.1038/nbt.2024.001'
  },
  {
    id: '2',
    title: 'Computación Cuántica: Algoritmos de optimización',
    author: 'Dr. Peter Shor',
    email: 'peter.shor@mit.edu',
    category: 'Física Cuántica',
    status: 'pending',
    date: '2024-01-14',
    pdfSize: '3.1 MB',
    downloads: 256,
    aiUsage: 67,
    summary: 'Investigación sobre nuevos algoritmos cuánticos para problemas de optimización combinatoria.',
    keywords: ['Computación Cuántica', 'Algoritmos', 'Optimización'],
    source: 'Physical Review Letters, 2024',
    doi: '10.1103/PhysRevLett.2024.001'
  },
  {
    id: '3',
    title: 'Nanotecnología en medicina: Sistemas de entrega de fármacos',
    author: 'Dra. Angela Belcher',
    email: 'angela.belcher@mit.edu',
    category: 'Nanotecnología',
    status: 'pending',
    date: '2024-01-13',
    pdfSize: '1.8 MB',
    downloads: 189,
    aiUsage: 45,
    summary: 'Desarrollo de nanopartículas para la entrega dirigida de medicamentos contra el cáncer.',
    keywords: ['Nanotecnología', 'Medicina', 'Fármacos', 'Oncología'],
    source: 'Advanced Materials, 2024',
    doi: '10.1002/adma.2024.001'
  },
  {
    id: '4',
    title: 'Inteligencia Artificial en diagnóstico médico',
    author: 'Dr. Andrew Ng',
    email: 'andrew.ng@stanford.edu',
    category: 'Inteligencia Artificial',
    status: 'approved',
    date: '2024-01-10',
    pdfSize: '4.2 MB',
    downloads: 521,
    aiUsage: 134,
    summary: 'Aplicación de redes neuronales profundas para la detección temprana de enfermedades.',
    keywords: ['IA', 'Machine Learning', 'Diagnóstico', 'Salud'],
    source: 'Journal of Medical AI, 2024',
    doi: '10.1016/jmai.2024.001'
  },
  {
    id: '5',
    title: 'Fusión nuclear: Avances en el reactor ITER',
    author: 'Dr. Bernard Bigot',
    email: 'b.bigot@iter.org',
    category: 'Física Nuclear',
    status: 'approved',
    date: '2024-01-08',
    pdfSize: '5.6 MB',
    downloads: 687,
    aiUsage: 201,
    summary: 'Reporte de progreso en la construcción del reactor de fusión nuclear ITER.',
    keywords: ['Fusión Nuclear', 'Energía', 'ITER', 'Plasma'],
    source: 'Nuclear Fusion Journal, 2024',
    doi: '10.1088/nf.2024.001'
  },
  {
    id: '6',
    title: 'Estudios preliminares sin verificar',
    author: 'Carlos Rodriguez',
    email: 'carlos.rodriguez@scitech.com',
    category: 'Varios',
    status: 'rejected',
    date: '2024-01-05',
    pdfSize: '0.9 MB',
    downloads: 12,
    aiUsage: 3,
    summary: 'Estudio preliminar que requiere mayor validación científica.',
    keywords: ['Preliminar'],
    source: 'Preprint arXiv, 2024',
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. María García',
    email: 'maria.garcia@scitech.com',
    type: 'plus',
    tokensUsed: 45230,
    tokensLimit: 100000,
    documentsUploaded: 15,
    avatar: 'MG'
  },
  {
    id: '2',
    name: 'Carlos Rodriguez',
    email: 'carlos.rodriguez@scitech.com',
    type: 'free',
    tokensUsed: 3250,
    tokensLimit: 5000,
    documentsUploaded: 8,
    avatar: 'CR'
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@scitech.com',
    type: 'admin',
    tokensUsed: 12500,
    tokensLimit: 999999,
    documentsUploaded: 0,
    avatar: 'AU'
  },
  {
    id: '4',
    name: 'Dr. Peter Shor',
    email: 'peter.shor@mit.edu',
    type: 'plus',
    tokensUsed: 67800,
    tokensLimit: 100000,
    documentsUploaded: 23,
    avatar: 'PS'
  }
];

export const mockActivity: ActivityItem[] = [
  {
    id: '1',
    title: 'CRISPR-Cas9: Nuevos avances',
    email: 'maria.garcia@scitech.com',
    action: 'approved',
    timestamp: 'Hace 2 horas'
  },
  {
    id: '2',
    title: 'Estudios preliminares sin verificar',
    email: 'carlos.rodriguez@scitech.com',
    action: 'rejected',
    timestamp: 'Hace 5 horas'
  }
];

export const mockCategoryStats: CategoryStats[] = [
  { name: 'Biotecnología', count: 342 },
  { name: 'Física Cuántica', count: 218 },
  { name: 'Nanotecnología', count: 189 },
  { name: 'Inteligencia Artificial', count: 156 },
  { name: 'Física Nuclear', count: 134 },
  { name: 'Química Orgánica', count: 98 }
];

export const mockMetrics: DashboardMetrics = {
  totalDocuments: 1247,
  totalDocumentsTrend: 12,
  approvedLastMonth: 89,
  approvedTrend: 8,
  rejectedLastMonth: 23,
  rejectedTrend: -5,
  activeUsers: 342,
  activeUsersTrend: 15
};
