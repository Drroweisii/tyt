import React, { useState, useEffect } from 'react';
import MiningRig from './components/MiningRig';
import Stats from './components/Stats';

function App() {
  const [balance, setBalance] = useState(1000);
  const [parts, setParts] = useState({
    cpu: 1,
    gpu: 1,
    motherboard: 1,
    psu: 1,
    ram: 1
  });

  const hashRates = {
    cpu: 0.5,
    gpu: 1.0,
    motherboard: 0.3,
    psu: 0.2,
    ram: 0.4
  };

  const getTotalHashRate = () => {
    return Object.entries(parts).reduce((total, [part, level]) => {
      return total + (hashRates[part as keyof typeof hashRates] * level);
    }, 0);
  };

  useEffect(() => {
    const miningInterval = setInterval(() => {
      setBalance(prev => prev + getTotalHashRate() * 0.1);
    }, 1000);

    return () => clearInterval(miningInterval);
  }, [parts]);

  const handleUpgrade = (part: keyof typeof parts) => {
    const upgradeCost = Math.floor(100 * Math.pow(1.5, parts[part]));
    
    if (balance >= upgradeCost) {
      setBalance(prev => prev - upgradeCost);
      setParts(prev => ({
        ...prev,
        [part]: prev[part] + 1
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Crypto Miner</h1>
        <Stats 
          balance={balance} 
          hashRate={getTotalHashRate()} 
        />
        <MiningRig 
          parts={parts} 
          onUpgrade={handleUpgrade} 
          hashRates={hashRates}
        />
      </div>
    </div>
  );
}

export default App;