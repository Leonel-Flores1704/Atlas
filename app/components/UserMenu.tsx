'use client';

import { useState } from 'react';
import { User, Settings, LogOut } from 'lucide-react';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    isPlusUser: boolean;
  } | null;
  onLogout: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full p-2 hover:bg-gray-800 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-black" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-medium truncate">{user.name}</p>
          <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-3 border-b border-gray-800">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
            {user.isPlusUser && (
              <div className="mt-2 inline-flex items-center gap-1 bg-teal-500/20 px-2 py-1 rounded-full">
                <span className="text-xs font-semibold text-teal-400">PLUS</span>
              </div>
            )}
          </div>
          
          <button
            onClick={() => {
              setIsOpen(false);
              // Handle settings action
            }}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-800 transition-colors text-left"
          >
            <Settings className="w-4 h-4 text-gray-400" />
            <span className="text-sm">Configuración</span>
          </button>
          
          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-800 transition-colors text-left text-red-400"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Cerrar Sesión</span>
          </button>
        </div>
      )}
    </div>
  );
}