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
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className={`
      ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'} 
      sidebar-transition glass-effect flex flex-col relative z-20
    `}>
      {/* Header with Logo and Toggle */}
      <div className="p-4 border-b border-gray-800/50">
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="flex-shrink-0"> <img src="/logo.png" alt="Pulse Logo" width={32} height={32} className="rounded-lg" />
              </div>
              <span className="text-xl font-bold text-white sidebar-logo-text sidebar-logo-text-visible">
                Pulse
              </span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="apple-button text-gray-400 hover:text-white hover:bg-gray-800/50 flex-shrink-0"
            >
              <X size={18} />
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="apple-button text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              <Menu size={18} />
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-2 py-2.5 rounded-lg 
                    apple-button transition-all duration-200 group relative overflow-hidden
                    ${isActive
                      ? 'bg-gray-800/60 text-white border border-gray-700/50 shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                    }
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span className={`
                    font-medium sidebar-label whitespace-nowrap
                    ${isCollapsed ? 'sidebar-label-hidden' : 'sidebar-label-visible'}
                  `}>
                    {item.label}
                  </span>

                  {/* Active indicator */}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800/50">
        <div className={`
          text-xs text-gray-500 text-center sidebar-label
          ${isCollapsed ? 'sidebar-label-hidden' : 'sidebar-label-visible'}
        `}>
          <div className="mb-1">Pulse v2.0</div>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full pulse-animation"></div>
            <span>Live</span>
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

      {/* <= 1024px responsive overlay  */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onMobileClose}
        />
      )}
    </div>
  )
}