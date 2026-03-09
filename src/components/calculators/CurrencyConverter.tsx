import React, { useState } from 'react';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);

  const exchangeRates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    INR: 74.5,
    CAD: 1.25,
    AUD: 1.35,
    CHF: 0.92,
    CNY: 6.45,
    MXN: 20.0,
  };

  const convert = () => {
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setResult(null);
      return;
    }

    const usdAmount = amountValue / exchangeRates[fromCurrency];
    const convertedAmount = usdAmount * exchangeRates[toCurrency];
    setResult(convertedAmount);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  const clear = () => {
    setAmount('');
    setResult(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Currency Converter</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Currency</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(exchangeRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              onClick={swapCurrencies}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Currency</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(exchangeRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={convert}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Convert
          </button>
          <button
            onClick={clear}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Clear
          </button>
        </div>

        {result !== null && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-gray-600 mb-1">Converted Amount:</p>
            <p className="text-2xl font-bold text-green-600">
              {result.toFixed(2)} {toCurrency}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Exchange Rate: 1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-800">
            <strong>Note:</strong> Exchange rates are for demonstration purposes only and may not reflect current market rates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
