'use client';

import { useState, useEffect } from 'react';
import {
  Home,
  Users,
  TrendingUp,
  Newspaper,
  Bell,
  BarChart3,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const navigation = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'influencers', label: 'Influencers', icon: Users },
  { id: 'assets', label: 'Assets', icon: TrendingUp },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'market', label: 'MarketView', icon: BarChart3 },
];

export function Sidebar({
  activeTab,
  setActiveTab,
  isMobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(prev => !prev);

  // ✅ Reset collapsed state saat masuk ukuran mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(false); // Always expanded in mobile
      }
    };

    handleResize(); // Run once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Sidebar container */}
      <div className={`
        fixed lg:sticky top-0 left-0 z-40 w-64 bg-black/80 border-r border-gray-800/50 
        h-screen lg:min-h-screen lg:h-auto flex flex-col transform transition-transform duration-300 ease-in-out
        ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'} 
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
      `}>
        {/* Header */}
        <div className="p-3 border-b border-gray-800/50 flex items-center justify-center">
          <div className='flex w-full justify-between'>
            <div className="flex items-center">
              <img src="/logo.png" alt="Pulse Logo" width={40} height={40} className="rounded-lg" />
              {!isCollapsed && <span className="text-xl font-bold text-white sidebar-logo-text sidebar-logo-text-visible">Pulse</span>}
            </div>

            <div className='hidden lg:flex lg:items-center space-x-3'>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="text-gray-400 hover:text-white hover:bg-gray-800/50"
              >
                {isCollapsed ? <Menu size={16} /> : <X size={16} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3">
          <ul className="space-y-2">
            {navigation.map(({ id, label, icon: Icon }) => {
              const isActive = activeTab === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => {
                      setActiveTab(id);
                      if (onMobileClose) onMobileClose();
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 
                      ${isActive
                        ? 'bg-gray-800/60 text-white border border-gray-700/50 shadow'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/40'}
                    `}
                  >
                    <Icon size={20} />
                    {!isCollapsed && <span className="font-medium sidebar-label whitespace-nowrap">{label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800/50 text-center text-xs text-gray-500">
          {!isCollapsed && (
            <>
              <div>Pulse v2.0</div>
              <div className="flex justify-center items-center space-x-1 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full pulse-animation" />
                <span>Live</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onMobileClose}
        />
      )}
    </>
  );
}