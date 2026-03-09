import React, { useState } from 'react';

const EMICalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [emi, setEmi] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
      setEmi(null);
      setTotalInterest(null);
      setTotalAmount(null);
      return;
    }

    const emiAmount = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);
    const totalAmountValue = emiAmount * t;
    const totalInterestValue = totalAmountValue - p;

    setEmi(emiAmount);
    setTotalInterest(totalInterestValue);
    setTotalAmount(totalAmountValue);
  };

  const clear = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setEmi(null);
    setTotalInterest(null);
    setTotalAmount(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">EMI Calculator</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Principal Amount (₹)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="Enter loan amount"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Loan Tenure (months)</label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter loan period in months"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={calculateEMI}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Calculate EMI
          </button>
          <button
            onClick={clear}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Clear
          </button>
        </div>

        {emi !== null && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Monthly EMI:</p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{emi.toFixed(2)}
              </p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Total Interest:</p>
              <p className="text-xl font-bold text-green-600">
                ₹{totalInterest?.toFixed(2)}
              </p>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Total Amount:</p>
              <p className="text-xl font-bold text-purple-600">
                ₹{totalAmount?.toFixed(2)}
              </p>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-xs text-gray-600">
                <strong>Breakdown:</strong><br/>
                Principal: ₹{parseFloat(principal).toFixed(2)}<br/>
                Interest: ₹{totalInterest?.toFixed(2)}<br/>
                Total: ₹{totalAmount?.toFixed(2)}<br/>
                Monthly: ₹{emi.toFixed(2)} × {time} months
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-800">
            <strong>Formula:</strong> EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)<br/>
            Where P = Principal, r = Monthly interest rate, n = Number of months
          </p>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
