import React, { useState } from 'react';

const LengthConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kilometer');
  const [toUnit, setToUnit] = useState('meter');
  const [result, setResult] = useState<number | null>(null);

  const conversionFactors: { [key: string]: number } = {
    kilometer: 1000,
    meter: 1,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.34,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254,
  };

  const convert = () => {
    const valueNum = parseFloat(value);
    if (isNaN(valueNum) || valueNum < 0) {
      setResult(null);
      return;
    }

    const valueInMeters = valueNum * conversionFactors[fromUnit];
    const convertedValue = valueInMeters / conversionFactors[toUnit];
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Length Converter</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter length value"
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
              <option value="kilometer">Kilometer (km)</option>
              <option value="meter">Meter (m)</option>
              <option value="centimeter">Centimeter (cm)</option>
              <option value="millimeter">Millimeter (mm)</option>
              <option value="mile">Mile (mi)</option>
              <option value="yard">Yard (yd)</option>
              <option value="foot">Foot (ft)</option>
              <option value="inch">Inch (in)</option>
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
              <option value="kilometer">Kilometer (km)</option>
              <option value="meter">Meter (m)</option>
              <option value="centimeter">Centimeter (cm)</option>
              <option value="millimeter">Millimeter (mm)</option>
              <option value="mile">Mile (mi)</option>
              <option value="yard">Yard (yd)</option>
              <option value="foot">Foot (ft)</option>
              <option value="inch">Inch (in)</option>
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
            <p className="text-sm text-gray-600 mb-1">Converted Length:</p>
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
            1 km = 1000 m = 100000 cm<br/>
            1 mile = 1.609 km = 5280 feet<br/>
            1 yard = 3 feet = 36 inches
          </p>
        </div>
      </div>
    </div>
  );
};

export default LengthConverter;
