import React from 'react';
import { Cpu, MonitorDot, CircuitBoard, Battery, HardDrive } from 'lucide-react';

interface PartProps {
  name: string;
  level: number;
  cost: number;
  icon: React.ReactNode;
  onUpgrade: () => void;
  hashRate: number;
}

const Part: React.FC<PartProps> = ({ name, level, cost, icon, onUpgrade, hashRate }) => (
  <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl border border-white/20 hover:border-white/40 transition-all">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="text-blue-400 w-8 h-8">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-white">{name}</h3>
          <p className="text-sm text-blue-300">Level {level}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-green-400">{hashRate.toFixed(1)} H/s</p>
        <p className="text-xs text-gray-400">+{(hashRate * 0.3).toFixed(1)} H/s</p>
      </div>
    </div>
    <button
      onClick={onUpgrade}
      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
    >
      <span>Upgrade</span>
      <span className="text-blue-200">${cost.toFixed(2)}</span>
    </button>
  </div>
);

const MiningRig: React.FC<{
  parts: {
    cpu: number;
    gpu: number;
    motherboard: number;
    psu: number;
    ram: number;
  };
  onUpgrade: (part: string) => void;
  hashRates: {
    cpu: number;
    gpu: number;
    motherboard: number;
    psu: number;
    ram: number;
  };
}> = ({ parts, onUpgrade, hashRates }) => {
  const getUpgradeCost = (level: number) => Math.floor(100 * Math.pow(1.5, level));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <Part
        name="CPU"
        level={parts.cpu}
        cost={getUpgradeCost(parts.cpu)}
        icon={<Cpu className="w-full h-full" />}
        onUpgrade={() => onUpgrade('cpu')}
        hashRate={hashRates.cpu * parts.cpu}
      />
      <Part
        name="GPU"
        level={parts.gpu}
        cost={getUpgradeCost(parts.gpu)}
        icon={<MonitorDot className="w-full h-full" />}
        onUpgrade={() => onUpgrade('gpu')}
        hashRate={hashRates.gpu * parts.gpu}
      />
      <Part
        name="Motherboard"
        level={parts.motherboard}
        cost={getUpgradeCost(parts.motherboard)}
        icon={<CircuitBoard className="w-full h-full" />}
        onUpgrade={() => onUpgrade('motherboard')}
        hashRate={hashRates.motherboard * parts.motherboard}
      />
      <Part
        name="Power Supply"
        level={parts.psu}
        cost={getUpgradeCost(parts.psu)}
        icon={<Battery className="w-full h-full" />}
        onUpgrade={() => onUpgrade('psu')}
        hashRate={hashRates.psu * parts.psu}
      />
      <Part
        name="RAM"
        level={parts.ram}
        cost={getUpgradeCost(parts.ram)}
        icon={<HardDrive className="w-full h-full" />}
        onUpgrade={() => onUpgrade('ram')}
        hashRate={hashRates.ram * parts.ram}
      />
    </div>
  );
};

export default MiningRig;