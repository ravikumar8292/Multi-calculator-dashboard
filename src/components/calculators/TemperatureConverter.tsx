import React, { useState } from 'react';

const TemperatureConverter: React.FC = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [result, setResult] = useState<number | null>(null);

  const convertTemperature = (value: number, from: string, to: string): number => {
    if (from === to) return value;

    let celsius: number;

    switch (from) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5/9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      case 'rankine':
        celsius = (value - 491.67) * 5/9;
        break;
      default:
        celsius = value;
    }

    switch (to) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return celsius * 9/5 + 32;
      case 'kelvin':
        return celsius + 273.15;
      case 'rankine':
        return (celsius + 273.15) * 9/5;
      default:
        return celsius;
    }
  };

  const convert = () => {
    const valueNum = parseFloat(value);
    if (isNaN(valueNum)) {
      setResult(null);
      return;
    }

    const convertedValue = convertTemperature(valueNum, fromUnit, toUnit);
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Temperature Converter</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Temperature Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter temperature"
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
              <option value="celsius">Celsius (°C)</option>
              <option value="fahrenheit">Fahrenheit (°F)</option>
              <option value="kelvin">Kelvin (K)</option>
              <option value="rankine">Rankine (°R)</option>
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
              <option value="celsius">Celsius (°C)</option>
              <option value="fahrenheit">Fahrenheit (°F)</option>
              <option value="kelvin">Kelvin (K)</option>
              <option value="rankine">Rankine (°R)</option>
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
            <p className="text-sm text-gray-600 mb-1">Converted Temperature:</p>
            <p className="text-2xl font-bold text-green-600">
              {result.toFixed(2)}°{toUnit === 'celsius' ? 'C' : toUnit === 'fahrenheit' ? 'F' : toUnit === 'kelvin' ? 'K' : 'R'}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {value}°{fromUnit === 'celsius' ? 'C' : fromUnit === 'fahrenheit' ? 'F' : fromUnit === 'kelvin' ? 'K' : 'R'} = {result.toFixed(2)}°{toUnit === 'celsius' ? 'C' : toUnit === 'fahrenheit' ? 'F' : toUnit === 'kelvin' ? 'K' : 'R'}
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-xs text-blue-800">
            <strong>Quick Reference:</strong><br/>
            Water freezes: 0°C = 32°F = 273.15K<br/>
            Water boils: 100°C = 212°F = 373.15K<br/>
            Room temperature: ~20°C = 68°F = 293.15K
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
