'use client';

import Image from 'next/image';
import { Plus, MessageSquare, X, Trash2 } from 'lucide-react';
import { TokenCounter } from './TokenCounter';
import { UserMenu } from './UserMenu';

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

interface ChatHistory {
  id: string;
  title: string;
  date: string;
  messages: Message[];
  createdAt: Date;
}

interface SidebarProps {
  remainingTokens: number;
  totalTokens: number;
  isPlusUser: boolean;
  user: {
    name: string;
    email: string;
    isPlusUser: boolean;
  } | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  onToggleSidebar: () => void;
  onNewChat: () => void;
  chatHistory: ChatHistory[];
  currentChatId: string;
  onLoadChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export function Sidebar({ 
  remainingTokens, 
  totalTokens, 
  isPlusUser, 
  user, 
  onLogout, 
  onOpenAuth, 
  onToggleSidebar,
  onNewChat,
  chatHistory,
  currentChatId,
  onLoadChat,
  onDeleteChat,
}: SidebarProps) {
  return (
    <div className="w-full h-full bg-black border-r border-gray-800 flex flex-col p-4">
      {/* Header with Close Button */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Image src="/Atlas.svg" alt="Atlas logo" width={150} height={150} className="w-10 h-10" />
            <h1 className="font-semibold">Atlas</h1>
          </div>
          <button
            onClick={onToggleSidebar}
            className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
            title="Ocultar sidebar"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <p className="text-xs text-gray-500">IA para Ciencia</p>
      </div>

      {/* Token Counter */}
      {user && (
        <div className="mb-4">
          <TokenCounter 
            remainingTokens={remainingTokens}
            totalTokens={totalTokens}
            isPlusUser={isPlusUser}
          />
        </div>
      )}

      {/* New Chat Button */}
      <button 
        onClick={onNewChat}
        className="flex items-center gap-2 text-teal-400 border border-teal-400 rounded-lg px-3 py-2 mb-6 hover:bg-teal-400/10 transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm">Nuevo Chat</span>
      </button>

      {/* Chat History Section - Ahora ocupa todo el espacio disponible */}
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
          Historial de Chats ({chatHistory.length})
        </h3>
        <div className="space-y-2">
          {chatHistory.map((chat) => (
            <ChatHistoryItem
              key={chat.id}
              title={chat.title}
              date={chat.date}
              isActive={chat.id === currentChatId}
              onClick={() => onLoadChat(chat.id)}
              onDelete={() => onDeleteChat(chat.id)}
            />
          ))}
        </div>
      </div>

      {/* User Menu or Login Button - AT BOTTOM */}
      <div className="mt-auto pt-4 border-t border-gray-800">
        {user ? (
          <UserMenu user={user} onLogout={onLogout} />
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2.5 transition-colors"
          >
            <span className="text-sm">Iniciar Sesión</span>
          </button>
        )}
      </div>
    </div>
  );
}

function ChatHistoryItem({ 
  title, 
  date, 
  isActive,
  onClick,
  onDelete 
}: { 
  title: string; 
  date: string;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}) {
  return (
    <div className={`flex items-center gap-2 px-2 py-1.5 rounded transition-colors w-full group ${
      isActive ? 'bg-teal-500/20 border border-teal-500/50' : 'hover:bg-gray-800'
    }`}>
      <button
        onClick={onClick}
        className="flex items-center gap-2 flex-1 min-w-0"
      >
        <MessageSquare className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-teal-400' : 'text-gray-500'}`} />
        <div className="flex-1 min-w-0">
          <p className={`text-sm truncate ${isActive ? 'text-teal-300' : 'text-gray-300'}`}>{title}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="p-1 hover:bg-red-500/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        title="Eliminar chat"
      >
        <Trash2 className="w-3 h-3 text-red-400" />
      </button>
    </div>
  );
}