import React, { useState } from 'react';

const BighaKathaConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('bigha');
  const [toUnit, setToUnit] = useState('katha');
  const [result, setResult] = useState<number | null>(null);

  const conversionFactors: { [key: string]: number } = {
    bigha: 1,
    katha: 0.0625,
    acre: 0.625,
    hectare: 0.2529,
    squaremeter: 2529.29,
    squarefeet: 27225,
    decimal: 62.5,
  };

  const convert = () => {
    const valueNum = parseFloat(value);
    if (isNaN(valueNum) || valueNum < 0) {
      setResult(null);
      return;
    }

    const valueInBigha = valueNum * conversionFactors[fromUnit];
    const convertedValue = valueInBigha / conversionFactors[toUnit];
    setResult(convertedValue);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
  };

  const clear = () => {
    setValue('');
    setResult(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Bigha to Katha Converter</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Land Area Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter land area"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Unit</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="bigha">Bigha</option>
              <option value="katha">Katha</option>
              <option value="acre">Acre</option>
              <option value="hectare">Hectare</option>
              <option value="squaremeter">Square Meter</option>
              <option value="squarefeet">Square Feet</option>
              <option value="decimal">Decimal</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              onClick={swapUnits}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Unit</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="bigha">Bigha</option>
              <option value="katha">Katha</option>
              <option value="acre">Acre</option>
              <option value="hectare">Hectare</option>
              <option value="squaremeter">Square Meter</option>
              <option value="squarefeet">Square Feet</option>
              <option value="decimal">Decimal</option>
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
            <p className="text-sm text-gray-600 mb-1">Converted Area:</p>
            <p className="text-2xl font-bold text-green-600">
              {result.toFixed(4)} {toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {value} {fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)} = {result.toFixed(4)} {toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-800">
            <strong>Important:</strong> Conversion rates may vary by region. These values are commonly used in Bihar, Jharkhand, and parts of Uttar Pradesh.
          </p>
          <p className="text-xs text-yellow-700 mt-1">
            <strong>Reference:</strong> 1 Bigha = 20 Katha = 27,225 sq ft ≈ 0.2529 hectare
          </p>
        </div>
      </div>
    </div>
  );
};

export default BighaKathaConverter;
