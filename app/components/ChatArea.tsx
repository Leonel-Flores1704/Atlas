'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Send, User, ChevronLeft, ChevronRight, MessageSquare, BookOpen, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

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

interface ChatAreaProps {
  isExpanded: boolean;
  isMinimized: boolean;
  onToggleMinimize: () => void;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export function ChatArea({ isExpanded, isMinimized, onToggleMinimize, messages, onSendMessage }: ChatAreaProps) {
  const [message, setMessage] = useState('');
  const [expandedBibliography, setExpandedBibliography] = useState<{ [key: number]: boolean }>({});

  const toggleBibliography = (messageId: number) => {
    setExpandedBibliography(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
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
                      
                      {/* Bibliography Section - Solo para mensajes de IA */}
                      {!isUser && msg.bibliography && msg.bibliography.length > 0 && (
                        <div className="mt-2 bg-gray-900 border border-gray-800 rounded-lg p-3 w-full">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-4 h-4 text-teal-400" />
                            <span className="text-xs font-semibold text-teal-400 uppercase tracking-wide">
                              Referencias
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
                );
              })
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-2 bg-gray-900 rounded-lg px-4 py-3 border border-gray-700">
              <input
                type="text"
                placeholder="Inicia una consulta sobre ciencia o tecnología..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent outline-none text-sm text-gray-300 placeholder:text-gray-600"
              />
              <button 
                onClick={handleSend}
                className="p-2 hover:bg-gray-800 rounded transition-colors disabled:opacity-50"
                disabled={!message.trim()}
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