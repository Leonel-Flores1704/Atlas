'use client';

import React, { useState } from 'react';
import { mockUsers } from '../data/mockData';
import { User } from '../types/admin';

const UserManagement = () => {
  const [users] = useState<User[]>(mockUsers);

  const totalUsers = users.length;
  const plusUsers = users.filter(u => u.type === 'plus').length;
  const adminUsers = users.filter(u => u.type === 'admin').length;

  const getUserTypeBadge = (type: string) => {
    switch (type) {
      case 'plus':
        return <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded text-sm font-semibold flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Plus
        </span>;
      case 'admin':
        return <span className="px-3 py-1 bg-teal-600/20 text-teal-400 rounded text-sm font-semibold flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Administrador
        </span>;
      default:
        return <span className="px-3 py-1 bg-neutral-700 text-neutral-300 rounded text-sm">Gratuito</span>;
    }
  };

  const getTokensPercentage = (used: number, limit: number) => {
    return (used / limit) * 100;
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Gestión de Usuarios</h1>

      {/* Métricas de usuarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600/20 rounded-lg">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <div className="text-3xl font-bold">{totalUsers}</div>
              <div className="text-neutral-400 text-sm">Usuarios Totales</div>
            </div>
          </div>
        </div>

        {/* <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-600/20 rounded-lg">
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div>admin
              <div className="text-3xl font-bold">{plusUsers}</div>
              <div className="text-neutral-400 text-sm">Usuarios Plus</div>
            </div>
          </div>
        </div> */}

        <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-teal-600/20 rounded-lg">
              <svg className="w-6 h-6 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-3xl font-bold">{adminUsers}</div>
              <div className="text-neutral-400 text-sm">Administradores</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-900 border-b border-neutral-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">USUARIO</th>
                {/* <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">TIPO</th> */}
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">TOKENS USADOS</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">DOCUMENTOS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {users.map((user) => {
                const tokensPercentage = getTokensPercentage(user.tokensUsed, user.tokensLimit);
                const isNearLimit = tokensPercentage > 80;
                
                return (
                  <tr key={user.id} className="hover:bg-neutral-750 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center font-semibold text-white">
                          {user.avatar || user.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white flex items-center gap-2">
                            {user.name}
                            {user.type === 'admin' && (
                              <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </h3>
                          <p className="text-sm text-neutral-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* <td className="px-6 py-4">
                      {getUserTypeBadge(user.type)}
                    </td> */}
                    <td className="px-6 py-4">
                      <div className="w-full max-w-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm ${isNearLimit ? 'text-yellow-400' : 'text-neutral-300'}`}>
                            {user.tokensUsed.toLocaleString()} / {user.tokensLimit.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-neutral-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              isNearLimit ? 'bg-yellow-500' : 'bg-gradient-to-r from-teal-500 to-cyan-500'
                            }`}
                            style={{ width: `${Math.min(tokensPercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-300">
                      {user.documentsUploaded}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
