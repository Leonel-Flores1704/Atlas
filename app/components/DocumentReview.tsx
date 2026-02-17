'use client';

import React, { useState } from 'react';
import { mockDocuments } from '../data/mockData';
import { Document } from '../types/admin';

const DocumentReview = () => {
  const [documents] = useState<Document[]>(mockDocuments);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(documents[0]); // Seleccionar el primero por defecto
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  const filteredDocs = filter === 'all' 
    ? documents 
    : documents.filter(doc => doc.status === filter);

  const pendingCount = documents.filter(d => d.status === 'pending').length;
  const approvedCount = documents.filter(d => d.status === 'approved').length;
  const rejectedCount = documents.filter(d => d.status === 'rejected').length;

  const handleApprove = (docId: string) => {
    console.log('Aprobar documento:', docId);
    alert('Documento aprobado (mock)');
  };

  const handleReject = (docId: string) => {
    console.log('Rechazar documento:', docId);
    alert('Documento rechazado (mock)');
  };

  return (
    <div className="flex h-full gap-6 p-8">
      {/* Columna izquierda - 30% - Lista de documentos */}
      <div className="w-[30%] flex flex-col">
        <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-6 flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-6 text-white">Revisión de Documentos</h2>

          {/* Tarjetas de métricas - 3 columnas */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button
              onClick={() => setFilter('pending')}
              className={`bg-[#262626] border rounded-xl p-4 transition-all ${
                filter === 'pending' ? 'border-yellow-600' : 'border-[#333]'
              }`}
            >
              <div className="text-3xl font-bold text-yellow-500 mb-1">{pendingCount}</div>
              <div className="text-xs text-gray-400">Pendientes</div>
            </button>

            <button
              onClick={() => setFilter('approved')}
              className={`bg-[#262626] border rounded-xl p-4 transition-all ${
                filter === 'approved' ? 'border-emerald-600' : 'border-[#333]'
              }`}
            >
              <div className="text-3xl font-bold text-emerald-500 mb-1">{approvedCount}</div>
              <div className="text-xs text-gray-400">Aprobados</div>
            </button>

            <button
              onClick={() => setFilter('rejected')}
              className={`bg-[#262626] border rounded-xl p-4 transition-all ${
                filter === 'rejected' ? 'border-red-600' : 'border-[#333]'
              }`}
            >
              <div className="text-3xl font-bold text-red-500 mb-1">{rejectedCount}</div>
              <div className="text-xs text-gray-400">Rechazados</div>
            </button>
          </div>

          {/* Lista de documentos */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-[#262626] scrollbar-track-transparent">
            {filteredDocs.length === 0 ? (
              <div className="text-center py-12 text-gray-400 text-sm">
                No hay documentos {filter === 'pending' ? 'pendientes' : filter === 'approved' ? 'aprobados' : 'rechazados'}.
              </div>
            ) : (
              filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`bg-[#262626] border rounded-xl p-4 cursor-pointer transition-all ${
                    selectedDoc?.id === doc.id ? 'border-teal-600' : 'border-[#333] hover:border-gray-600'
                  }`}
                >
                  <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2">{doc.title}</h3>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {doc.author}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {doc.date}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {doc.category}
                  </div>
                  
                  <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${
                    doc.status === 'pending' ? 'bg-yellow-600/20 text-yellow-500' :
                    doc.status === 'approved' ? 'bg-emerald-600/20 text-emerald-500' :
                    'bg-red-600/20 text-red-500'
                  }`}>
                    {doc.status === 'pending' ? 'Pendiente' : doc.status === 'approved' ? 'Aprobado' : 'Rechazado'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Columna derecha - 70% - Detalle del documento */}
      <div className="w-[70%]">
        {selectedDoc ? (
          <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#262626] scrollbar-track-transparent">
            <h2 className="text-3xl font-bold mb-2 text-white">{selectedDoc.title}</h2>
            <p className="text-gray-400 mb-6">Por {selectedDoc.author}</p>
            
            <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                PDF • {selectedDoc.pdfSize}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {selectedDoc.date}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Subido por: {selectedDoc.email}
              </div>
            </div>

            <div className="inline-block px-4 py-1.5 rounded-full bg-teal-600/20 text-teal-400 text-sm mb-8">
              {selectedDoc.category}
            </div>

            <h3 className="text-xl font-semibold mb-4 text-white">Resumen</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              {selectedDoc.summary || 'No hay resumen disponible.'}
            </p>

            {selectedDoc.keywords && selectedDoc.keywords.length > 0 && (
              <>
                <h3 className="text-xl font-semibold mb-4 text-white">Palabras Clave</h3>
                <div className="flex flex-wrap gap-3 mb-8">
                  {selectedDoc.keywords.map((keyword, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-[#262626] rounded-full text-sm text-white"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </>
            )}

            {selectedDoc.source && (
              <>
                <h3 className="text-xl font-semibold mb-4 text-white">Fuente</h3>
                <p className="text-gray-300 mb-8">{selectedDoc.source}</p>
                {selectedDoc.doi && (
                  <p className="text-gray-400 text-sm mb-8">DOI: {selectedDoc.doi}</p>
                )}
              </>
            )}

            {selectedDoc.status === 'pending' && (
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => handleApprove(selectedDoc.id)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Aprobar Documento
                </button>
                <button
                  onClick={() => handleReject(selectedDoc.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Rechazar Documento
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-8 h-full flex items-center justify-center text-gray-500">
            Selecciona un documento para ver los detalles
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentReview;