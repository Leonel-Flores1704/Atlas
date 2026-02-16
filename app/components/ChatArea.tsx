'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Send, User, ChevronLeft, ChevronRight, MessageSquare, BookOpen, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface ChatAreaProps {
  isExpanded: boolean;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  bibliography?: {
    title: string;
    authors: string;
    journal: string;
    year: number;
    doi?: string;
  }[];
}

export function ChatArea({ isExpanded, isMinimized, onToggleMinimize }: ChatAreaProps) {
  const [message, setMessage] = useState('');
  const [expandedBibliography, setExpandedBibliography] = useState<{ [key: number]: boolean }>({});

  const toggleBibliography = (messageId: number) => {
    setExpandedBibliography(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  const messages: Message[] = [
    {
      id: 1,
      sender: 'agent',
      text: 'He analizado los últimos papers sobre biotecnología y he actualizado el panel de análisis con las métricas de impacto más recientes.',
      bibliography: [
        {
          title: 'CRISPR-Cas9 gene editing in human embryos',
          authors: 'Ma, H., et al.',
          journal: 'Nature',
          year: 2024,
          doi: '10.1038/nature.2024.12345',
        },
        {
          title: 'Advances in synthetic biology and bioengineering',
          authors: 'Smith, J., Johnson, K.',
          journal: 'Cell Systems',
          year: 2024,
          doi: '10.1016/j.cels.2024.01.001',
        },
      ],
    },
    {
      id: 2,
      sender: 'agent',
      text: 'Analizando secuencias de datos... He detectado un patrón en el avance tecnológico que podría ser interesante. Revisa el gráfico de Evolución de I+D.',
      bibliography: [
        {
          title: 'Machine learning approaches for drug discovery',
          authors: 'Chen, L., Wang, Y., Zhang, Q.',
          journal: 'Science Advances',
          year: 2025,
          doi: '10.1126/sciadv.2025.abc123',
        },
      ],
    },
  ];

  return (
    <div className={`flex flex-col bg-black border-r border-gray-800 transition-all duration-300 ${
      isMinimized ? 'w-16' : isExpanded ? 'flex-1' : 'w-[460px]'
    }`}>
      {isMinimized ? (
        <div className="flex flex-col items-center pt-4">
          <button 
            onClick={onToggleMinimize}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Expandir chat"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <div className="mt-4">
            <MessageSquare className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold">Chat</h2>
            <button 
              onClick={onToggleMinimize}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              title="Minimizar chat"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                  <Image src="/globe.svg" alt="Agent" width={24} height={24} className="w-6 h-6 rounded-full" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-300 leading-relaxed">{msg.text}</p>
                  
                  {/* Bibliography Section */}
                  {msg.bibliography && msg.bibliography.length > 0 && (
                    <div className="mt-3 bg-gray-900 border border-gray-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-teal-400" />
                        <span className="text-xs font-semibold text-teal-400 uppercase tracking-wide">
                          Referencias
                        </span>
                        <button
                          onClick={() => toggleBibliography(msg.id)}
                          className="ml-2 p-1 hover:bg-gray-800 rounded transition-colors"
                        >
                          {expandedBibliography[msg.id] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </button>
                      </div>
                      {expandedBibliography[msg.id] && (
                        <div className="space-y-2">
                          {msg.bibliography.map((ref, index) => (
                            <div 
                              key={index}
                              className="text-xs text-gray-400 leading-relaxed border-l-2 border-gray-700 pl-3 hover:border-teal-500 transition-colors"
                            >
                              <p className="text-gray-300 font-medium mb-0.5">
                                {ref.title}
                              </p>
                              <p className="text-gray-500">
                                {ref.authors} • <span className="italic">{ref.journal}</span> ({ref.year})
                              </p>
                              {ref.doi && (
                                <a 
                                  href={`https://doi.org/${ref.doi}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 mt-1"
                                >
                                  <span>DOI: {ref.doi}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-4 py-3 border border-gray-700">
              <input
                type="text"
                placeholder="Inicia una consulta sobre ciencia o tecnología..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-300 placeholder:text-gray-600"
              />
              <button className="p-2 hover:bg-gray-800 rounded transition-colors">
                <Send className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded transition-colors">
                <User className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <button className="mt-3 px-4 py-2 bg-teal-500 text-black rounded-lg text-sm font-medium hover:bg-teal-400 transition-colors">
              hola
            </button>
          </div>
        </>
      )}
    </div>
  );
}
