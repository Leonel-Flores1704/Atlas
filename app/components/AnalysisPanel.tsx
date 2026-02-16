'use client';

import { ChevronRight, ChevronLeft, BookOpen, FileText, Quote, Zap, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardMetrics {
  papersAnalyzed: number;
  patents: number;
  citationIndex: string;
  technologicalImpact: number;
  papersAnalyzedTrend?: 'up' | 'down';
  patentsTrend?: 'up' | 'down';
  citationIndexTrend?: 'up' | 'down';
  technologicalImpactTrend?: 'up' | 'down';
}

interface AnalysisPanelProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  metrics: DashboardMetrics;
}

export function AnalysisPanel({ isExpanded, onToggleExpand, metrics }: AnalysisPanelProps) {
  return (
    <div className="w-full h-full bg-black flex flex-col">
      {isExpanded ? (
        <>
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800 flex-shrink-0">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <button 
              onClick={onToggleExpand}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              title="Minimizar dashboard"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6">
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
                value={metrics.papersAnalyzed.toLocaleString()}
                trend={metrics.papersAnalyzedTrend}
              />

              {/* Patentes I+D */}
              <MetricCard
                icon={<FileText className="w-5 h-5" />}
                label="Patentes I+D"
                value={metrics.patents.toString()}
                trend={metrics.patentsTrend}
              />

              {/* Índice de Citas */}
              <MetricCard
                icon={<Quote className="w-5 h-5" />}
                label="Índice de Citas"
                value={metrics.citationIndex}
                trend={metrics.citationIndexTrend}
                subtext="Activar Windows"
                additionalInfo="Ve a Configuración p..."
              />

              {/* Impacto Tecnológico */}
              <MetricCard
                icon={<Zap className="w-5 h-5" />}
                label="Impacto Tecnológico"
                value={metrics.technologicalImpact.toFixed(1)}
                trend={metrics.technologicalImpactTrend}
                subtext="SISTEMA ACTIVO"
              />
            </div>

            {/* Aquí puedes agregar más secciones según necesites */}
            {/* Ejemplo: Gráficos, tablas, más métricas, etc. */}
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
          trend === 'up' ? (
            <TrendingUp className="w-4 h-4 mb-1 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 mb-1 text-red-500" />
          )
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