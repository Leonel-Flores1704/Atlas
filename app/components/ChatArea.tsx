'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Send, User, ChevronLeft, ChevronRight, MessageSquare, BookOpen, ExternalLink, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

interface RagResponse {
  answer: string;
  confidence: 'high' | 'medium' | 'low' | 'none';
  sources: Source[];
}

interface ChatAreaProps {
  isExpanded: boolean;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onResponseReceived?: (response: RagResponse) => void;
}

interface Source {
  title: string;
  url: string | null;
  content: string;
  score: number;
  area: string | null;
  category: string | null;
}

interface Message {
  id: number;
  sender: 'user' | 'agent';
  text: string;
  confidence?: 'high' | 'medium' | 'low' | 'none';
  sources?: Source[];
}

const confidenceConfig = {
  high: { label: 'Alta', color: 'text-green-400 bg-green-400/10 border-green-400/30' },
  medium: { label: 'Media', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  low: { label: 'Baja', color: 'text-orange-400 bg-orange-400/10 border-orange-400/30' },
  none: { label: 'Sin confianza', color: 'text-red-400 bg-red-400/10 border-red-400/30' },
};

export function ChatArea({ isExpanded, isMinimized, onToggleMinimize, onResponseReceived }: ChatAreaProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedBibliography, setExpandedBibliography] = useState<{ [key: number]: boolean }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(1);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const toggleBibliography = (messageId: number) => {
    setExpandedBibliography(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  const handleSend = async () => {
    const query = message.trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: nextIdRef.current++,
      sender: 'user',
      text: query,
    };

    setMessages(prev => [...prev, userMsg]);
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error('Request failed');

      const data = await res.json();

      const agentMsg: Message = {
        id: nextIdRef.current++,
        sender: 'agent',
        text: data.answer,
        confidence: data.confidence,
        sources: data.sources?.map((s: Record<string, unknown>) => ({
          title: s.title,
          url: s.url,
          content: s.content,
          score: s.score,
          area: s.area,
          category: s.category,
        })),
      };

      setMessages(prev => [...prev, agentMsg]);
      onResponseReceived?.({ answer: data.answer, confidence: data.confidence, sources: agentMsg.sources || [] });
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: nextIdRef.current++,
          sender: 'agent',
          text: 'Lo siento, ocurrió un error al procesar tu consulta. Verifica que el servidor esté activo e intenta de nuevo.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-black border-r border-gray-800 transition-all duration-300">
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
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <MessageSquare className="w-12 h-12 mb-4" />
                <p className="text-sm">Inicia una conversación</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isUser = msg.sender === 'user';

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isUser ? 'bg-teal-500' : 'bg-yellow-500'
                    }`}>
                      {isUser ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Image src="/Atlas.svg" alt="Agent" width={32} height={32} className="w-5 h-5 rounded-full" />
                      )}
                    </div>

                    {/* Message Content */}
                    <div className={`flex-1 max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                      <div className={`rounded-lg px-4 py-2 ${
                        isUser
                          ? 'bg-teal-500 text-white rounded-tr-none'
                          : 'bg-gray-800 text-gray-300 rounded-tl-none'
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>

                      {/* Confidence Badge */}
                      {!isUser && msg.confidence && (
                        <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded border ${confidenceConfig[msg.confidence].color}`}>
                          Confianza: {confidenceConfig[msg.confidence].label}
                        </span>
                      )}

                      {/* Sources Section */}
                      {!isUser && msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2 bg-gray-900 border border-gray-800 rounded-lg p-3 w-full">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-4 h-4 text-teal-400" />
                            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wide">
                              Fuentes ({msg.sources.length})
                            </span>
                            <button
                              onClick={() => toggleBibliography(msg.id)}
                              className="ml-2 p-1 hover:bg-gray-800 rounded transition-colors"
                            >
                              {expandedBibliography[msg.id] ? (
                                <ChevronUp className="w-4 h-4 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              )}
                            </button>
                          </div>
                          {expandedBibliography[msg.id] && (
                            <div className="space-y-2">
                              {msg.sources.map((source, index) => (
                                <div
                                  key={index}
                                  className="text-xs text-gray-400 leading-relaxed border-l-2 border-gray-700 pl-3 hover:border-teal-500 transition-colors"
                                >
                                  <p className="text-gray-300 font-medium mb-0.5">
                                    {source.title}
                                  </p>
                                  <p className="text-gray-500">
                                    {source.area && <span>{source.area}</span>}
                                    {source.area && source.category && <span> • </span>}
                                    {source.category && <span>{source.category}</span>}
                                    <span className="ml-2 text-teal-400/70">Score: {source.score.toFixed(2)}</span>
                                  </p>
                                  {source.url && (
                                    <a
                                      href={source.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 mt-1"
                                    >
                                      <span>Ver fuente</span>
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
                );
              })
            )}

            {/* Typing indicator */}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                  <Image src="/Atlas.svg" alt="Agent" width={32} height={32} className="w-5 h-5 rounded-full" />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analizando tu consulta...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="sticky bottom-0 p-4 border-t border-gray-800 bg-black shrink-0">
            <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-4 py-3 border border-gray-700">
              <input
                type="text"
                placeholder="Inicia una consulta sobre ciencia o tecnología..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="flex-1 bg-transparent outline-none text-sm text-gray-300 placeholder:text-gray-600 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={loading || !message.trim()}
                className="p-2 hover:bg-gray-800 rounded transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
