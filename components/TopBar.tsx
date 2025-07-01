'use client';

import { useState } from 'react';
import { Search, Bell, User, Moon, Sun, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function TopBar() {
  const [isDark, setIsDark] = useState(true);

  return (
    <header className="h-16 glass-effect border-b border-gray-800/50 flex items-center justify-between px-4 lg:px-6 relative z-20">
      <div className="flex items-center space-x-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search assets, influencers, news..."
            className="pl-10 bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-400 focus:border-gray-600 apple-button"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDark(!isDark)}
          className="apple-button text-gray-400 hover:text-white hover:bg-gray-800/50"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="apple-button text-gray-400 hover:text-white hover:bg-gray-800/50"
        >
          <Settings size={18} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="apple-button text-gray-400 hover:text-white hover:bg-gray-800/50 relative"
        >
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full pulse-animation"></span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="apple-button text-gray-400 hover:text-white hover:bg-gray-800/50"
        >
          <User size={18} />
        </Button>
      </div>
    </header>
  );
}