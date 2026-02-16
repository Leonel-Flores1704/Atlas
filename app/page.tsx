'use client';

import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { AnalysisPanel } from './components/AnalysisPanel';
import { AuthModal } from './components/AuthModal';

export default function Home() {
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(true);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // User session management
  const [user, setUser] = useState<{
    name: string;
    email: string;
    isPlusUser: boolean;
  } | null>({
    name: 'Dr. María García',
    email: 'maria.garcia@scitech.com',
    isPlusUser: false,
  });
  
  // Token management
  const [remainingTokens, setRemainingTokens] = useState(3750);
  const totalTokens = user?.isPlusUser ? 100000 : 5000;

  const toggleDashboardExpansion = () => {
    setIsDashboardExpanded(!isDashboardExpanded);
  };

  const toggleChatMinimized = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  const handleLogin = (email: string, _password: string) => {
    void _password;
    // Simulated login - in production this would call Supabase
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
    // Simulated registration - in production this would call Supabase
    setUser({
      name: name,
      email: email,
      isPlusUser: false,
    });
    setIsAuthModalOpen(false);
    setRemainingTokens(5000); // New users get full tokens
  };

  const handleLogout = () => {
    setUser(null);
    setRemainingTokens(0);
  };

  return (
    <div className="size-full flex bg-black text-white">
      {/* Left Sidebar */}
      <Sidebar 
        remainingTokens={remainingTokens}
        totalTokens={totalTokens}
        isPlusUser={user?.isPlusUser || false}
        user={user}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />
      
      {/* Chat Area */}
      <ChatArea 
        isMinimized={isChatMinimized}
        onToggleMinimize={toggleChatMinimized}
        isExpanded={!isDashboardExpanded} 
      />
      
      {/* Right Panel - Analysis */}
      <AnalysisPanel 
        isExpanded={isDashboardExpanded}
        onToggleExpand={toggleDashboardExpansion}
      />

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
