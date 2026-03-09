import React, { useState } from 'react';

const InterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [interestType, setInterestType] = useState<'simple' | 'compound'>('simple');
  const [compoundFrequency, setCompoundFrequency] = useState<'yearly' | 'half-yearly' | 'quarterly' | 'monthly'>('yearly');
  const [interest, setInterest] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const getFrequencyValue = (frequency: string): number => {
    switch (frequency) {
      case 'yearly': return 1;
      case 'half-yearly': return 2;
      case 'quarterly': return 4;
      case 'monthly': return 12;
      default: return 1;
    }
  };

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
      setInterest(null);
      setTotalAmount(null);
      return;
    }

    let calculatedInterest: number;
    let calculatedTotalAmount: number;

    if (interestType === 'simple') {
      calculatedInterest = p * r * t;
      calculatedTotalAmount = p + calculatedInterest;
    } else {
      const n = getFrequencyValue(compoundFrequency);
      calculatedTotalAmount = p * Math.pow(1 + r / n, n * t);
      calculatedInterest = calculatedTotalAmount - p;
    }

    setInterest(calculatedInterest);
    setTotalAmount(calculatedTotalAmount);
  };

  const clear = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setInterest(null);
    setTotalAmount(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Interest Calculator</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Principal Amount (₹)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter principal amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Interest Rate (%)</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Period (years)</label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter time period"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest Type</label>
            <select
              value={interestType}
              onChange={(e) => setInterestType(e.target.value as 'simple' | 'compound')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="simple">Simple Interest</option>
              <option value="compound">Compound Interest</option>
            </select>
          </div>

          {interestType === 'compound' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Compounding Frequency</label>
              <select
                value={compoundFrequency}
                onChange={(e) => setCompoundFrequency(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="yearly">Yearly</option>
                <option value="half-yearly">Half-Yearly</option>
                <option value="quarterly">Quarterly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={calculateInterest}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Calculate Interest
          </button>
          <button
            onClick={clear}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Clear
          </button>
        </div>

        {interest !== null && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">
                {interestType === 'simple' ? 'Simple' : 'Compound'} Interest:
              </p>
              <p className="text-2xl font-bold text-green-600">
                ₹{interest.toFixed(2)}
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Total Amount:</p>
              <p className="text-xl font-bold text-blue-600">
                ₹{totalAmount?.toFixed(2)}
              </p>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-xs text-gray-600">
                <strong>Breakdown:</strong><br/>
                Principal: ₹{parseFloat(principal).toFixed(2)}<br/>
                Interest: ₹{interest.toFixed(2)}<br/>
                Total: ₹{totalAmount?.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-800">
            <strong>Formulas:</strong><br/>
            Simple Interest: SI = P × R × T<br/>
            Compound Interest: CI = P × (1 + R/n)^(n×T) - P<br/>
            Where P = Principal, R = Rate, T = Time, n = Compounding frequency
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterestCalculator;
