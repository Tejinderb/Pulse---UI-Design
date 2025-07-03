'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

const topMovers = [
  {
    id: 1,
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$2,594.26',
    change: '+6.1%',
    isPositive: true,
    icon: '⟠',
    sparkline: [2400, 2450, 2380, 2520, 2480, 2550, 2594],
  },
  {
    id: 2,
    symbol: 'SOL',
    name: 'Solana',
    price: '$155.12',
    change: '+4.1%',
    isPositive: true,
    icon: '◎',
    sparkline: [140, 145, 142, 150, 148, 152, 155],
  },
  {
    id: 3,
    symbol: 'ADA',
    name: 'Cardano',
    price: '$0.6040',
    change: '+8.8%',
    isPositive: true,
    icon: '₳',
    sparkline: [0.55, 0.57, 0.56, 0.59, 0.58, 0.60, 0.604],
  },
  {
    id: 4,
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$109,959',       
    change: '+2.168%',        
    isPositive: true,
    icon: '🪙',             
    sparkline: [109000, 109200, 109100, 109800, 109500, 109800, 109959],
  },
  {
    id: 5,
    symbol: 'DOT',
    name: 'Polkadot',
    price: '$3.63',
    change: '+9.1%',
    isPositive: true,
    icon: '●',
    sparkline: [3.2, 3.3, 3.25, 3.5, 3.4, 3.6, 3.63],
  },
  {
    id: 6,
    symbol: 'MATIC',
    name: 'Polygon',
    price: '$0.8420',
    change: '+5.2%',
    isPositive: true,
    icon: '⬟',
    sparkline: [0.78, 0.80, 0.79, 0.82, 0.81, 0.83, 0.842],
  },
];

// Duplicate for seamless scrolling


function MiniSparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <div className="flex items-end space-x-px h-4 w-12">
      {data.map((value, index) => (
        <div
          key={index}
          className="w-1 bg-green-400/70 rounded-t-sm"
          style={{
            height: `${((value - min) / range) * 100}%`,
            minHeight: '2px',
          }}
        />
      ))}
    </div>
  );
}

export function TopMovers() {
  return (
    <div className="mb-3">
      <div className="flex items-center space-x-2 mb-3">
        <h2 className="text-xs font-semibold text-white">Top Movers</h2>
        <TrendingUp className="w-4 h-4 text-green-400" />
        {/* <div className="w-1.5 h-1.5 bg-green-400 rounded-full pulse-animation"></div> */}
      </div>

      <div className="overflow-auto">
        <div className="flex space-x-3 animate-scroll">
          {topMovers.map((mover, index) => (
            <div
              key={`${mover.id}-${index}`}
              className="flex-shrink-0 w-15 p-3 h-15 glass-effect rounded-xl hover:bg-gray-900/60 transition-all cursor-pointer apple-button border border-gray-800/30"
            >
              <div className="flex justify-between mb-1">
                <div className="flex items-center space-x-3 ">
                  <span className="text-small">{mover.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white text-sm flex items-center">{mover.symbol}
                    <div className={`text-xs flex px-2 items-center space-x-1 ${
                        mover.isPositive ? 'text-green-400' : 'text-red-400'
                        }`}>
                            {mover.isPositive ? (
                            <TrendingUp className="w-3 h-3" />
                            ) : (
                            <TrendingDown className="w-3 h-3" />
                            )}
                        <span className="text-xs">{mover.change}</span>
                    </div>
                  </h3>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div>
                  <div className="text-sm font-medium text-white px-5">{mover.price}</div>
                </div>
                <MiniSparkline data={mover.sparkline} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}