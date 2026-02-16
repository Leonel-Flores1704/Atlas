'use client';

import { ChevronRight, ChevronLeft, BookOpen, FileText, Quote, Zap, TrendingUp } from 'lucide-react';

interface AnalysisPanelProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function AnalysisPanel({ isExpanded, onToggleExpand }: AnalysisPanelProps) {
  return (
    <div className={`w-full h-full bg-black overflow-y-auto transition-all duration-300 ${isExpanded ? 'p-6' : ''}`}>
      {isExpanded ? (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <button 
              onClick={onToggleExpand}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              title="Minimizar dashboard"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Quote Card */}
          <div className="mb-6 p-6 rounded-lg border border-teal-500/30 bg-teal-500/5">
            <p className="text-teal-400 italic text-center">
              Un agente inteligente que convierte la burocracia de datos en conocimiento útil sobre ciencia y tecnología
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Papers Analizados */}
            <MetricCard
              icon={<BookOpen className="w-5 h-5" />}
              label="Papers Analizados"
              value="4,821"
              trend="up"
            />

            {/* Patentes I+D */}
            <MetricCard
              icon={<FileText className="w-5 h-5" />}
              label="Patentes I+D"
              value="142"
              trend="up"
            />

            {/* Índice de Citas */}
            <MetricCard
              icon={<Quote className="w-5 h-5" />}
              label="Índice de Citas"
              value="15.2k"
              subtext="Activar Windows"
              additionalInfo="Ve a Configuración p..."
            />

            {/* Impacto Tecnológico */}
            <MetricCard
              icon={<Zap className="w-5 h-5" />}
              label="Impacto Tecnológico"
              value="8.9"
              subtext="SISTEMA ACTIVO"
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center pt-4">
          <button 
            onClick={onToggleExpand}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Expandir dashboard"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      )}
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: 'up' | 'down';
  subtext?: string;
  additionalInfo?: string;
}

function MetricCard({ icon, label, value, trend, subtext, additionalInfo }: MetricCardProps) {
  return (
    <div className="p-6 rounded-lg border border-gray-800 bg-gray-900/50">
      <div className="flex items-center gap-2 mb-4 text-gray-400">
        {icon}
      </div>
      <div className="text-xs text-gray-500 uppercase mb-2">{label}</div>
      <div className="flex items-end gap-2">
        <div className="text-3xl font-bold">{value}</div>
        {trend && (
          <TrendingUp className={`w-4 h-4 mb-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
        )}
      </div>
      {subtext && (
        <div className="mt-2 text-xs text-teal-400">{subtext}</div>
      )}
      {additionalInfo && (
        <div className="mt-1 text-xs text-gray-600">{additionalInfo}</div>
      )}
    </div>
  );
}