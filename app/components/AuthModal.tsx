'use client';

import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string, name: string) => void;
}

export function AuthModal({ isOpen, onClose, onLogin, onRegister }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      onLogin(email, password);
    } else {
      onRegister(email, password, name);
    }
    // Reset form
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-md w-full border border-gray-800">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4 mb-6">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre completo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Juan Pérez"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pl-11 outline-none focus:border-teal-500 transition-colors"
                    required
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pl-11 outline-none focus:border-teal-500 transition-colors"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pl-11 pr-11 outline-none focus:border-teal-500 transition-colors"
                  required
                  minLength={6}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {mode === 'register' && (
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo 6 caracteres
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-black font-semibold rounded-lg transition-all"
          >
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>

          {/* Toggle Mode */}
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
            >
              {mode === 'login' ? (
                <>
                  ¿No tienes cuenta?{' '}
                  <span className="font-semibold">Regístrate</span>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{' '}
                  <span className="font-semibold">Inicia sesión</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}