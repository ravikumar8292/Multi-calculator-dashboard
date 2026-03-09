import React, { useState } from 'react';

const PercentageCalculator: React.FC = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [operation, setOperation] = useState<'whatPercent' | 'percentOf' | 'increase' | 'decrease'>('whatPercent');

  const calculate = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2)) {
      setResult(null);
      return;
    }

    let calculatedResult: number;

    switch (operation) {
      case 'whatPercent':
        calculatedResult = (num1 / num2) * 100;
        break;
      case 'percentOf':
        calculatedResult = (num1 * num2) / 100;
        break;
      case 'increase':
        calculatedResult = num1 + (num1 * num2) / 100;
        break;
      case 'decrease':
        calculatedResult = num1 - (num1 * num2) / 100;
        break;
      default:
        calculatedResult = 0;
    }

    setResult(calculatedResult);
  };

  const clear = () => {
    setValue1('');
    setValue2('');
    setResult(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Percentage Calculator</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Operation Type</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="whatPercent">What percentage is X of Y?</option>
            <option value="percentOf">X% of Y</option>
            <option value="increase">Increase X by Y%</option>
            <option value="decrease">Decrease X by Y%</option>
          </select>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {operation === 'whatPercent' ? 'Value (X)' : 
               operation === 'percentOf' ? 'Percentage (X%)' : 
               'Original Value (X)'}
            </label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder="Enter first value"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {operation === 'whatPercent' ? 'Total (Y)' : 
               operation === 'percentOf' ? 'Value (Y)' : 
               'Percentage (Y%)'}
            </label>
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              placeholder="Enter second value"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={calculate}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={clear}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Clear
          </button>
        </div>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-gray-600 mb-1">Result:</p>
            <p className="text-2xl font-bold text-blue-600">
              {operation === 'whatPercent' ? `${result.toFixed(2)}%` : result.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {operation === 'whatPercent' ? `${value1} is ${result.toFixed(2)}% of ${value2}` :
               operation === 'percentOf' ? `${value1}% of ${value2} = ${result.toFixed(2)}` :
               operation === 'increase' ? `${value1} increased by ${value2}% = ${result.toFixed(2)}` :
               `${value1} decreased by ${value2}% = ${result.toFixed(2)}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PercentageCalculator;
