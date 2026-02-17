'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { AnalysisPanel } from './components/AnalysisPanel';
import { AuthModal } from './components/AuthModal';
import { Menu } from 'lucide-react';

// Todos tus interfaces aquí
interface Reference {
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  url?: string;
  abstract?: string;
  citationCount?: number;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  tokensUsed?: number;
  references?: Reference[];
  timestamp?: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  date: string;
  messages: Message[];
  createdAt: Date;
}

interface DashboardMetrics {
  papersAnalyzed: number;
  patents: number;
  citationIndex: string;
  technologicalImpact: number;
  papersAnalyzedTrend?: 'up' | 'down';
  patentsTrend?: 'up' | 'down';
}

// IMPORTANTE: export default DEBE estar aquí
export default function Home() {
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(true);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [sidebarWidth, setSidebarWidth] = useState(15);
  const [chatWidth, setChatWidth] = useState(65);
  
  const [currentChatId, setCurrentChatId] = useState<string>('chat-1');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: 'chat-1',
      title: 'Nuevo Chat',
      date: 'Ahora',
      messages: [],
      createdAt: new Date(),
    },
  ]);

  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetrics>({
    papersAnalyzed: 0,
    patents: 0,
    citationIndex: '0',
    technologicalImpact: 0,
  });
  const confidenceScoresRef = useRef<number[]>([]);
  
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
  const getTotalTokens = (isPlusUser: boolean) => isPlusUser ? 100000 : 5000;
  const totalTokens = getTotalTokens(user?.isPlusUser || false);

  const calculateTokens = (text: string): number => {
    return Math.ceil(text.length / 4);
  };

  const consumeTokens = (amount: number): boolean => {
    if (remainingTokens >= amount) {
      setRemainingTokens(prev => prev - amount);
      return true;
    }
    return false;
  };

  const generateChatTitle = (firstMessage: string): string => {
    const words = firstMessage.split(' ').slice(0, 5).join(' ');
    return words.length > 40 ? words.substring(0, 40) + '...' : words;
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      setChatHistory(prev => 
        prev.map(chat => 
          chat.id === currentChatId 
            ? { ...chat, messages: [...messages] }
            : chat
        )
      );
    }

    const newChatId = `chat-${Date.now()}`;
    const newChat: ChatHistory = {
      id: newChatId,
      title: 'Nuevo Chat',
      date: 'Ahora',
      messages: [],
      createdAt: new Date(),
    };

    setChatHistory(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);
    setMessages([]);
    
    if (isChatMinimized) {
      setIsChatMinimized(false);
    }
  };

  const handleLoadChat = (chatId: string) => {
    if (messages.length > 0) {
      setChatHistory(prev => 
        prev.map(chat => 
          chat.id === currentChatId 
            ? { ...chat, messages: [...messages] }
            : chat
        )
      );
    }

    const selectedChat = chatHistory.find(chat => chat.id === chatId);
    if (selectedChat) {
      setCurrentChatId(chatId);
      setMessages(selectedChat.messages);
      
      if (isChatMinimized) {
        setIsChatMinimized(false);
      }
    }
  };

  const handleSendMessage = (messageText: string) => {
    const userTokens = calculateTokens(messageText);
    
    if (!consumeTokens(userTokens)) {
      alert('No tienes suficientes tokens. Por favor, actualiza tu plan.');
      return;
    }

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: messageText,
      tokensUsed: userTokens,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);

    if (messages.length === 0) {
      const newTitle = generateChatTitle(messageText);
      setChatHistory(prev => 
        prev.map(chat => 
          chat.id === currentChatId 
            ? { ...chat, title: newTitle }
            : chat
        )
      );
    }

    setTimeout(() => {
      const agentResponseText = 'Entendido. Estoy procesando tu consulta...';
      const agentTokens = calculateTokens(agentResponseText);
      
      if (!consumeTokens(agentTokens)) {
        return;
      }

      const agentMessage: Message = {
        id: messages.length + 2,
        sender: 'agent',
        text: agentResponseText,
        tokensUsed: agentTokens,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const handleDeleteChat = (chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    if (chatId === currentChatId) {
      handleNewChat();
    }
  };

  const handleResponseReceived = useCallback((response: { confidence: string; sources: { title: string; area: string | null; category: string | null; score: number }[] }) => {
    const sources = response.sources || [];
    const newPapers = sources.length;
    const newPatents = sources.filter(s =>
      s.category?.toLowerCase().includes('patente') ||
      s.area?.toLowerCase().includes('i+d') ||
      s.area?.toLowerCase().includes('innovación')
    ).length;

    const confidenceMap: Record<string, number> = { high: 10, medium: 7, low: 4, none: 1 };
    const score = confidenceMap[response.confidence] || 0;
    confidenceScoresRef.current.push(score);

    const avgImpact = confidenceScoresRef.current.reduce((a, b) => a + b, 0) / confidenceScoresRef.current.length;

    setDashboardMetrics(prev => {
      const totalCitations = prev.papersAnalyzed + newPapers;
      return {
        papersAnalyzed: totalCitations,
        patents: prev.patents + newPatents,
        citationIndex: totalCitations >= 1000 ? `${(totalCitations / 1000).toFixed(1)}k` : totalCitations.toString(),
        technologicalImpact: parseFloat(avgImpact.toFixed(1)),
        papersAnalyzedTrend: newPapers > 0 ? 'up' : prev.papersAnalyzedTrend,
        patentsTrend: newPatents > 0 ? 'up' : prev.patentsTrend,
      };
    });
  }, []);

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
    const isPlusUser = email.includes('plus');
    const newUser = {
      name: email.split('@')[0],
      email: email,
      isPlusUser: isPlusUser,
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    setRemainingTokens(isPlusUser ? 100000 : 5000);
  };

  const handleRegister = (email: string, _password: string, name: string) => {
    void _password;
    const newUser = {
      name: name,
      email: email,
      isPlusUser: false,
    };
    setUser(newUser);
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
      const newWidth = Math.min(Math.max(percentage, 12), 25);
      setSidebarWidth(newWidth);
    } else if (isDraggingRef.current === 'chat') {
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

  useEffect(() => {
    if (isChatMinimized) {
      setChatWidth(5);
    } else {
      setChatWidth(65);
    }
  }, [isChatMinimized]);

  const effectiveSidebarWidth = isSidebarVisible ? sidebarWidth : 0;
  const dashboardWidth = 100 - effectiveSidebarWidth - chatWidth;

  // IMPORTANTE: El return DEBE estar aquí
  return (
    <div ref={containerRef} className="w-full h-screen flex bg-black text-white relative overflow-hidden">
      {!isSidebarVisible && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
          title="Mostrar sidebar"
        >
          <Menu className="w-5 h-5 text-gray-300" />
        </button>
      )}

      {isSidebarVisible && (
        <>
          <div style={{ width: `${sidebarWidth}%` }} className="h-full flex-shrink-0 transition-all duration-300">
            <Sidebar 
              remainingTokens={remainingTokens}
              totalTokens={totalTokens}
              isPlusUser={user?.isPlusUser || false}
              user={user}
              onLogout={handleLogout}
              onOpenAuth={() => setIsAuthModalOpen(true)}
              onToggleSidebar={toggleSidebar}
              onNewChat={handleNewChat}
              chatHistory={chatHistory}
              currentChatId={currentChatId}
              onLoadChat={handleLoadChat}
              onDeleteChat={handleDeleteChat}
            />
          </div>

          <div
            onMouseDown={(e) => handleMouseDown(e, 'sidebar')}
            className="w-1 h-full bg-transparent hover:bg-teal-500/50 transition-colors cursor-col-resize relative group flex-shrink-0"
          >
            <div className="absolute inset-y-0 -left-1 -right-1 flex items-center justify-center">
              <div className="w-1 h-16 bg-gray-700 rounded-full group-hover:bg-teal-500 transition-colors" />
            </div>
          </div>
        </>
      )}

      <div style={{ width: `${chatWidth}%` }} className="h-full flex-shrink-0 transition-all duration-300">
        <ChatArea
          isMinimized={isChatMinimized}
          onToggleMinimize={toggleChatMinimized}
          isExpanded={!isDashboardExpanded}
          onResponseReceived={handleResponseReceived}
        />
      </div>

      {!isChatMinimized && (
        <div
          onMouseDown={(e) => handleMouseDown(e, 'chat')}
          className="w-1 h-full bg-transparent hover:bg-teal-500/50 transition-colors cursor-col-resize relative group flex-shrink-0"
        >
          <div className="absolute inset-y-0 -left-1 -right-1 flex items-center justify-center">
            <div className="w-1 h-16 bg-gray-700 rounded-full group-hover:bg-teal-500 transition-colors" />
          </div>
        </div>
      )}

      <div style={{ width: `${dashboardWidth}%` }} className="h-full flex-1 transition-all duration-300">
        <AnalysisPanel 
          isExpanded={isDashboardExpanded}
          onToggleExpand={toggleDashboardExpansion}
          metrics={dashboardMetrics}
        />
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
}
// IMPORTANTE: NO debe haber código después del cierre de la función