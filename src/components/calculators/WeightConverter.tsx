import React, { useState } from 'react';

const WeightConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kilogram');
  const [toUnit, setToUnit] = useState('gram');
  const [result, setResult] = useState<number | null>(null);

  const conversionFactors: { [key: string]: number } = {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.453592,
    ounce: 0.0283495,
    ton: 1000,
    quintal: 100,
    stone: 6.35029,
  };

  const convert = () => {
    const valueNum = parseFloat(value);
    if (isNaN(valueNum) || valueNum < 0) {
      setResult(null);
      return;
    }

    const valueInKg = valueNum * conversionFactors[fromUnit];
    const convertedValue = valueInKg / conversionFactors[toUnit];
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Weight Converter</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter weight value"
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
              <option value="kilogram">Kilogram (kg)</option>
              <option value="gram">Gram (g)</option>
              <option value="milligram">Milligram (mg)</option>
              <option value="pound">Pound (lb)</option>
              <option value="ounce">Ounce (oz)</option>
              <option value="ton">Ton (t)</option>
              <option value="quintal">Quintal (q)</option>
              <option value="stone">Stone (st)</option>
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
              <option value="kilogram">Kilogram (kg)</option>
              <option value="gram">Gram (g)</option>
              <option value="milligram">Milligram (mg)</option>
              <option value="pound">Pound (lb)</option>
              <option value="ounce">Ounce (oz)</option>
              <option value="ton">Ton (t)</option>
              <option value="quintal">Quintal (q)</option>
              <option value="stone">Stone (st)</option>
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
            <p className="text-sm text-gray-600 mb-1">Converted Weight:</p>
            <p className="text-2xl font-bold text-green-600">
              {result.toFixed(6)} {toUnit}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {value} {fromUnit} = {result.toFixed(6)} {toUnit}
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-xs text-blue-800">
            <strong>Quick Reference:</strong><br/>
            1 kg = 1000 g = 2.20462 lb<br/>
            1 lb = 16 oz = 0.453592 kg<br/>
            1 ton = 1000 kg = 10 quintal
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeightConverter;
