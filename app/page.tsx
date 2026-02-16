'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { AnalysisPanel } from './components/AnalysisPanel';
import { AuthModal } from './components/AuthModal';
import { Menu } from 'lucide-react';

export default function Home() {
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(true);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Panel widths
  const [sidebarWidth, setSidebarWidth] = useState(15); // percentage
  const [chatWidth, setChatWidth] = useState(35); // percentage
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<'sidebar' | 'chat' | null>(null);
  
  const [user, setUser] = useState<{
    name: string;
    email: string;
    isPlusUser: boolean;
  } | null>({
    name: 'Dr. María García',
    email: 'maria.garcia@scitech.com',
    isPlusUser: false,
  });
  
  const [remainingTokens, setRemainingTokens] = useState(3750);
  const totalTokens = user?.isPlusUser ? 100000 : 5000;

  const toggleDashboardExpansion = () => {
    setIsDashboardExpanded(!isDashboardExpanded);
  };

  const toggleChatMinimized = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleLogin = (email: string, _password: string) => {
    void _password;
    setUser({
      name: email.split('@')[0],
      email: email,
      isPlusUser: false,
    });
    setIsAuthModalOpen(false);
    setRemainingTokens(2500);
  };

  const handleRegister = (email: string, _password: string, name: string) => {
    void _password;
    setUser({
      name: name,
      email: email,
      isPlusUser: false,
    });
    setIsAuthModalOpen(false);
    setRemainingTokens(5000);
  };

  const handleLogout = () => {
    setUser(null);
    setRemainingTokens(0);
  };

  const handleMouseDown = useCallback((e: React.MouseEvent, panel: 'sidebar' | 'chat') => {
    e.preventDefault();
    isDraggingRef.current = panel;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;
    const percentage = (mouseX / containerWidth) * 100;

    if (isDraggingRef.current === 'sidebar') {
      // Sidebar limits: 12% - 25%
      const newWidth = Math.min(Math.max(percentage, 12), 25);
      setSidebarWidth(newWidth);
    } else if (isDraggingRef.current === 'chat') {
      // Chat limits depend on sidebar width
      const minChatWidth = isChatMinimized ? 5 : 25;
      const maxChatWidth = isChatMinimized ? 5 : 60;
      const chatStartPercentage = isSidebarVisible ? sidebarWidth : 0;
      const chatPercentage = percentage - chatStartPercentage;
      const newWidth = Math.min(Math.max(chatPercentage, minChatWidth), maxChatWidth);
      setChatWidth(newWidth);
    }
  }, [sidebarWidth, isChatMinimized, isSidebarVisible]);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = null;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Adjust widths when panels collapse/expand
  useEffect(() => {
    if (isChatMinimized) {
      setChatWidth(5);
    } else {
      setChatWidth(35);
    }
  }, [isChatMinimized]);

  const effectiveSidebarWidth = isSidebarVisible ? sidebarWidth : 0;
  const dashboardWidth = 100 - effectiveSidebarWidth - chatWidth;

  return (
    <div ref={containerRef} className="size-full flex bg-black text-white relative">
      {/* Hamburger Button - Fixed position when sidebar is hidden */}
      {!isSidebarVisible && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
          title="Mostrar sidebar"
        >
          <Menu className="w-5 h-5 text-gray-300" />
        </button>
      )}

      {/* Sidebar */}
      {isSidebarVisible && (
        <>
          <div style={{ width: `${sidebarWidth}%` }} className="flex-shrink-0 transition-all duration-300">
            <Sidebar 
              remainingTokens={remainingTokens}
              totalTokens={totalTokens}
              isPlusUser={user?.isPlusUser || false}
              user={user}
              onLogout={handleLogout}
              onOpenAuth={() => setIsAuthModalOpen(true)}
              onToggleSidebar={toggleSidebar}
            />
          </div>

          {/* Resize Handle - Sidebar */}
          <div
            onMouseDown={(e) => handleMouseDown(e, 'sidebar')}
            className="w-1 bg-transparent hover:bg-teal-500/50 transition-colors cursor-col-resize relative group flex-shrink-0"
          >
            <div className="absolute inset-y-0 -left-1 -right-1 flex items-center justify-center">
              <div className="w-1 h-16 bg-gray-700 rounded-full group-hover:bg-teal-500 transition-colors" />
            </div>
          </div>
        </>
      )}

      {/* Chat Area */}
      <div style={{ width: `${chatWidth}%` }} className="flex-shrink-0 transition-all duration-300">
        <ChatArea 
          isMinimized={isChatMinimized}
          onToggleMinimize={toggleChatMinimized}
          isExpanded={!isDashboardExpanded} 
        />
      </div>

      {/* Resize Handle - Chat (only when chat is not minimized) */}
      {!isChatMinimized && (
        <div
          onMouseDown={(e) => handleMouseDown(e, 'chat')}
          className="w-1 bg-transparent hover:bg-teal-500/50 transition-colors cursor-col-resize relative group flex-shrink-0"
        >
          <div className="absolute inset-y-0 -left-1 -right-1 flex items-center justify-center">
            <div className="w-1 h-16 bg-gray-700 rounded-full group-hover:bg-teal-500 transition-colors" />
          </div>
        </div>
      )}

      {/* Dashboard */}
      <div style={{ width: `${dashboardWidth}%` }} className="flex-1 transition-all duration-300">
        <AnalysisPanel 
          isExpanded={isDashboardExpanded}
          onToggleExpand={toggleDashboardExpansion}
        />
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
}