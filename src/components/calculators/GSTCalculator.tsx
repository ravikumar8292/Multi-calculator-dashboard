import React, { useState } from 'react';

const GSTCalculator: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [calculationType, setCalculationType] = useState<'add' | 'remove'>('add');
  const [originalAmount, setOriginalAmount] = useState<number | null>(null);
  const [gstAmount, setGstAmount] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);

  const calculateGST = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(gstRate);

    if (isNaN(amt) || isNaN(rate) || amt < 0 || rate < 0) {
      setOriginalAmount(null);
      setGstAmount(null);
      setTotalAmount(null);
      return;
    }

    let calculatedGST: number;
    let calculatedOriginal: number;
    let calculatedTotal: number;

    if (calculationType === 'add') {
      calculatedGST = (amt * rate) / 100;
      calculatedOriginal = amt;
      calculatedTotal = amt + calculatedGST;
    } else {
      calculatedOriginal = amt / (1 + rate / 100);
      calculatedGST = amt - calculatedOriginal;
      calculatedTotal = amt;
    }

    setOriginalAmount(calculatedOriginal);
    setGstAmount(calculatedGST);
    setTotalAmount(calculatedTotal);
  };

  const clear = () => {
    setAmount('');
    setGstAmount(null);
    setOriginalAmount(null);
    setTotalAmount(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">GST Calculator</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {calculationType === 'add' ? 'Original Amount (₹)' : 'Total Amount (₹)'}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={calculationType === 'add' ? 'Enter original amount' : 'Enter total amount'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">GST Rate (%)</label>
            <select
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="0">0%</option>
              <option value="0.25">0.25%</option>
              <option value="3">3%</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Calculation Type</label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as 'add' | 'remove')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="add">Add GST</option>
              <option value="remove">Remove GST</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={calculateGST}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Calculate GST
          </button>
          <button
            onClick={clear}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Clear
          </button>
        </div>

        {gstAmount !== null && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">GST Amount ({gstRate}%):</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{gstAmount.toFixed(2)}
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Original Amount:</p>
              <p className="text-xl font-bold text-blue-600">
                ₹{originalAmount?.toFixed(2)}
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
                <strong>Calculation:</strong><br/>
                {calculationType === 'add' 
                  ? `GST = ₹${parseFloat(amount).toFixed(2)} × ${gstRate}% = ₹${gstAmount.toFixed(2)}`
                  : `Original = ₹${parseFloat(amount).toFixed(2)} ÷ (1 + ${gstRate}%) = ₹${originalAmount?.toFixed(2)}`
                }
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-800">
            <strong>GST Rates in India:</strong><br/>
            0% - Essential goods<br/>
            0.25% - Rough diamonds<br/>
            3% - Precious metals<br/>
            5% - Household necessities<br/>
            12% - Standard rate<br/>
            18% - Standard rate<br/>
            28% - Luxury items
          </p>
        </div>
      </div>
    </div>
  );
};

export default GSTCalculator;
