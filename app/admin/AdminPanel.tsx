'use client';

import React, { useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import DocumentReview from '../components/DocumentReview';
import DocumentLibrary from '../components/DocumentLibrary';
import UserManagement from '../components/UserManagement';

type AdminView = 'dashboard' | 'review' | 'library' | 'users';

const AdminPanel = () => {
  const [currentView, setCurrentView] = useState<AdminView>('review');
  const [pendingCount] = useState(12);

  const menuItems = [
    {
      id: 'review' as AdminView,
      label: 'Revisar Documentos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      badge: pendingCount
    },
    {
      id: 'dashboard' as AdminView,
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: 'library' as AdminView,
      label: 'Biblioteca',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      )
    },
    {
      id: 'users' as AdminView,
      label: 'Usuarios',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'review':
        return <DocumentReview />;
      case 'library':
        return <DocumentLibrary />;
      case 'users':
        return <UserManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] border-r border-[#333] flex flex-col">
        <div className="p-4 border-b border-[#333]">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <h1 className="text-lg font-semibold text-white">Panel Admin</h1>
          </div>
          <div className="text-sm font-medium text-white">Admin</div>
          <div className="text-xs text-gray-400">admin@scitech.com</div>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all text-sm ${
                currentView === item.id
                  ? 'bg-teal-500/20 text-teal-500'
                  : 'text-gray-400 hover:bg-[#262626] hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#333]">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:bg-[#262626] hover:text-white rounded-lg transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-black">
        {renderView()}
      </main>
    </div>
  );
};

export default AdminPanel;
  