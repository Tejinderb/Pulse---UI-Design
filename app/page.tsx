'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { InfluencerIntel } from '@/components/widgets/InfluencerIntel';
import { AssetRadar } from '@/components/widgets/AssetRadar';
import { NewsPulse } from '@/components/widgets/NewsPulse';
import { SmartAlerts } from '@/components/widgets/SmartAlerts';
import { MarketViewAI } from '@/components/widgets/MarketViewAI';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);
}

function AnimatedBackground() {
  const [dots, setDots] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const newDots = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 30,
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="animated-bg">
      {dots.map(dot => (
        <div
          key={dot.id}
          className="dot"
          style={{
            left: `${dot.left}%`,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState(false);

  useScrollReveal();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsSidebarMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-black relative">
      <AnimatedBackground />

      <div className="flex relative z-10">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          isMobileOpen={isSidebarMobileOpen}
          onMobileClose={() => setIsSidebarMobileOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <TopBar
            onToggleMobileSidebar={() => setIsSidebarMobileOpen(!isSidebarMobileOpen)}
          />

          <main className="flex-1 pt-16 lg:pt-0 w-full p-4 lg:p-6 overflow-auto">
            <div className="max-w-full mx-auto">
              {/* Header */}
              <section className="mb-6 scroll-reveal">
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Market Intelligence Dashboard
                </h1>
                <p className="text-gray-400">
                  Real-time insights powered by AI for smarter trading decisions
                </p>
              </section>

              {/* Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="scroll-reveal scroll-reveal-delay-1">
                    <InfluencerIntel />
                  </div>
                  <div className="scroll-reveal scroll-reveal-delay-2">
                    <AssetRadar />
                  </div>
                  <div className="scroll-reveal scroll-reveal-delay-3">
                    <NewsPulse />
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="scroll-reveal scroll-reveal-delay-4">
                    <SmartAlerts />
                  </div>
                  <div className="scroll-reveal scroll-reveal-delay-5">
                    <MarketViewAI />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}