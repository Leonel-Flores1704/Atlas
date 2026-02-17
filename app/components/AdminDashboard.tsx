'use client';

import React from 'react';
import { mockMetrics, mockActivity, mockCategoryStats } from '../data/mockData';

const AdminDashboard = () => {
  const metrics = mockMetrics;
  const activity = mockActivity;
  const categoryStats = mockCategoryStats;

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Dashboard Administrativo</h1>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Documentos Totales */}
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-green-500 text-sm">+{metrics.totalDocumentsTrend}%</span>
          </div>
          <div className="text-3xl font-bold mb-2">{metrics.totalDocuments.toLocaleString()}</div>
          <div className="text-neutral-400 text-sm">Documentos Totales</div>
        </div>

        {/* Aprobados */}
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-green-500 text-sm">+{metrics.approvedTrend}%</span>
          </div>
          <div className="text-3xl font-bold mb-2">{metrics.approvedLastMonth}</div>
          <div className="text-neutral-400 text-sm">Aprobados (Último mes)</div>
        </div>

        {/* Rechazados */}
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-green-500 text-sm">{metrics.rejectedTrend}%</span>
          </div>
          <div className="text-3xl font-bold mb-2">{metrics.rejectedLastMonth}</div>
          <div className="text-neutral-400 text-sm">Rechazados (Último mes)</div>
        </div>

        {/* Usuarios Activos */}
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-green-500 text-sm">+{metrics.activeUsersTrend}%</span>
          </div>
          <div className="text-3xl font-bold mb-2">{metrics.activeUsers}</div>
          <div className="text-neutral-400 text-sm">Usuarios Activos</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Actividad Reciente */}
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <h2 className="text-2xl font-semibold mb-6">Actividad Reciente</h2>
          <div className="space-y-4">
            {activity.map((item) => (
              <div key={item.id} className="border-b border-neutral-700 pb-4 last:border-0">
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-neutral-400 text-sm mb-2">{item.email}</p>
                <span className={`inline-block px-3 py-1 rounded text-sm ${
                  item.action === 'approved' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {item.action === 'approved' ? 'Documento aprobado' : 'Documento rechazado'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Documentos por Categoría */}
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <h2 className="text-2xl font-semibold mb-6">Documentos por Categoría</h2>
          <div className="space-y-4">
            {categoryStats.map((category, index) => {
              const maxCount = Math.max(...categoryStats.map(c => c.count));
              const percentage = (category.count / maxCount) * 100;
              
              return (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">{category.name}</span>
                    <span className="text-neutral-400">{category.count} total</span>
                  </div>
                  <div className="w-full bg-neutral-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
