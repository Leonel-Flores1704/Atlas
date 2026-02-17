'use client';

import React, { useState } from 'react';
import { mockDocuments } from '../data/mockData';
import { Document } from '../types/admin';

const DocumentLibrary = () => {
  const [documents] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved'>('all');

  const categories = ['Todos', ...Array.from(new Set(documents.map(d => d.category)))];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'Todos' || doc.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <span className="text-green-400">✓ Aprobado</span>;
      case 'rejected':
        return <span className="text-red-400">✗ Rechazado</span>;
      case 'pending':
        return <span className="text-yellow-400">⏱ Pendiente</span>;
      default:
        return <span className="text-neutral-400">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-2">Biblioteca de Documentos</h1>
      <p className="text-neutral-400 mb-8">Vista completa de todos los documentos en el sistema</p>

      {/* Filtros y búsqueda */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Búsqueda */}
          <div className="md:col-span-1">
            <input
              type="text"
              placeholder="Buscar por título o autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Filtro de categoría */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Filtro de estado */}
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                statusFilter === 'all' 
                  ? 'bg-teal-600 text-white' 
                  : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setStatusFilter('approved')}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                statusFilter === 'approved' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
              }`}
            >
              Aprobados
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de documentos */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-900 border-b border-neutral-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">DOCUMENTO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">CATEGORÍA</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">ESTADO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">DESCARGAS</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">USO IA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {filteredDocuments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-neutral-400">
                    No se encontraron documentos que coincidan con los filtros.
                  </td>
                </tr>
              ) : (
                filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-neutral-750 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-semibold text-white mb-1">{doc.title}</h3>
                        <p className="text-sm text-neutral-400">{doc.author}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-neutral-700 rounded-full text-sm text-neutral-300">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(doc.status)}
                    </td>
                    <td className="px-6 py-4 text-neutral-300">
                      {doc.downloads.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-neutral-300">{doc.aiUsage} veces</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats footer */}
      <div className="mt-6 text-sm text-neutral-400">
        Mostrando {filteredDocuments.length} de {documents.length} documentos
      </div>
    </div>
  );
};

export default DocumentLibrary;
