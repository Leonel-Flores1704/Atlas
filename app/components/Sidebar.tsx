'use client';

import { FlaskConical, Plus, Crown, MessageSquare, FolderPlus, Folder, ChevronRight } from 'lucide-react';
import { TokenCounter } from './TokenCounter';
import { UserMenu } from './UserMenu';

interface SidebarProps {
  onOpenSubscription: () => void;
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
}

export function Sidebar({ onOpenSubscription, remainingTokens, totalTokens, isPlusUser, user, onLogout, onOpenAuth }: SidebarProps) {
  return (
    <div className="w-[200px] bg-black border-r border-gray-800 flex flex-col p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <FlaskConical className="w-5 h-5 text-teal-400" />
          <h1 className="font-semibold">SciTech Agent</h1>
        </div>
        <p className="text-xs text-gray-500">IA para Ciencia</p>
      </div>

      {/* User Menu or Login Button */}
      <div className="mb-4">
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

      {/* Token Counter */}
      {user && (
        <div className="mb-4">
          <TokenCounter 
            remainingTokens={remainingTokens}
            totalTokens={totalTokens}
            isPlusUser={isPlusUser}
          />
          {!isPlusUser && (
            <button
              onClick={onOpenSubscription}
              className="mt-2 w-full flex items-center justify-center gap-2 border border-yellow-500/40 text-yellow-300 hover:bg-yellow-500/10 rounded-lg px-3 py-2 transition-colors"
            >
              <Crown className="w-4 h-4" />
              <span className="text-sm">Mejorar a Plus</span>
            </button>
          )}
        </div>
      )}

      {/* New Chat Button */}
      <button className="flex items-center gap-2 text-teal-400 border border-teal-400 rounded-lg px-3 py-2 mb-4 hover:bg-teal-400/10 transition-colors">
        <Plus className="w-4 h-4" />
        <span className="text-sm">Nuevo Chat</span>
      </button>

      {/* Create Project Button */}
      <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-2 mb-6 transition-colors">
        <FolderPlus className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-300">Crear Proyecto</span>
      </button>

      {/* Projects Section */}
      <div className="mb-6 flex-1 overflow-y-auto">
        <h3 className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Proyectos</h3>
        <div className="space-y-2">
          <ProjectItem 
            name="Biotecnología Avanzada"
            chatCount={5}
          />
          <ProjectItem 
            name="Análisis Genómico"
            chatCount={3}
          />
          <ProjectItem 
            name="Nanotecnología"
            chatCount={7}
          />
        </div>
      </div>

      {/* Chat History Section */}
      <div className="overflow-y-auto">
        <h3 className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Historial de Chats</h3>
        <div className="space-y-2">
          <ChatHistoryItem 
            title="Análisis de CRISPR-Cas9"
            date="Hoy"
          />
          <ChatHistoryItem 
            title="Optimización de proteínas"
            date="Ayer"
          />
          <ChatHistoryItem 
            title="Secuenciación de ADN"
            date="2 días"
          />
          <ChatHistoryItem 
            title="Síntesis de nanopartículas"
            date="3 días"
          />
          <ChatHistoryItem 
            title="Machine Learning en biología"
            date="1 semana"
          />
        </div>
      </div>
    </div>
  );
}

function ProjectItem({ name, chatCount }: { name: string; chatCount: number }) {
  return (
    <button className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-800 transition-colors w-full text-left group">
      <Folder className="w-4 h-4 text-teal-400 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-300 truncate">{name}</p>
        <p className="text-xs text-gray-500">{chatCount} chats</p>
      </div>
      <ChevronRight className="w-3 h-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

function ChatHistoryItem({ title, date }: { title: string; date: string }) {
  return (
    <button className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-800 transition-colors w-full text-left group">
      <MessageSquare className="w-4 h-4 text-gray-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-300 truncate">{title}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </button>
  );
}
