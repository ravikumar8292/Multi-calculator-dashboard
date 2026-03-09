import React, { useState } from 'react';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '^':
        return Math.pow(firstValue, secondValue);
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const performScientificOperation = (op: string) => {
    const inputValue = parseFloat(display);
    let result: number;

    switch (op) {
      case 'sin':
        result = Math.sin(inputValue * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(inputValue * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(inputValue * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(inputValue);
        break;
      case 'ln':
        result = Math.log(inputValue);
        break;
      case 'sqrt':
        result = Math.sqrt(inputValue);
        break;
      case 'square':
        result = inputValue * inputValue;
        break;
      case 'cube':
        result = inputValue * inputValue * inputValue;
        break;
      case '1/x':
        result = 1 / inputValue;
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        result = inputValue;
    }

    setDisplay(String(result));
    setWaitingForNewValue(true);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Scientific Calculator</h2>
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="bg-gray-800 text-white text-right text-2xl font-mono p-4 rounded mb-4 min-h-[60px] flex items-center justify-end">
          {display}
        </div>
        <div className="grid grid-cols-5 gap-1">
          <button
            onClick={() => performScientificOperation('sin')}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            sin
          </button>
          <button
            onClick={() => performScientificOperation('cos')}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            cos
          </button>
          <button
            onClick={() => performScientificOperation('tan')}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            tan
          </button>
          <button
            onClick={() => performScientificOperation('log')}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            log
          </button>
          <button
            onClick={() => performScientificOperation('ln')}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            ln
          </button>
          
          <button
            onClick={() => performScientificOperation('sqrt')}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            √
          </button>
          <button
            onClick={() => performScientificOperation('square')}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            x²
          </button>
          <button
            onClick={() => performScientificOperation('cube')}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            x³
          </button>
          <button
            onClick={() => performScientificOperation('1/x')}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            1/x
          </button>
          <button
            onClick={() => performOperation('^')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            x^y
          </button>
          
          <button
            onClick={() => performScientificOperation('pi')}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            π
          </button>
          <button
            onClick={() => performScientificOperation('e')}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            e
          </button>
          <button
            onClick={clear}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            C
          </button>
          <button
            onClick={() => performOperation('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            ÷
          </button>
          <button
            onClick={() => performOperation('*')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            ×
          </button>
          
          <button
            onClick={() => inputNumber('7')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded transition-colors"
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded transition-colors"
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded transition-colors"
          >
            9
          </button>
          <button
            onClick={() => performOperation('-')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            −
          </button>
          <button
            onClick={performCalculation}
            className="row-span-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            =
          </button>
          
          <button
            onClick={() => inputNumber('4')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded transition-colors"
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded transition-colors"
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded transition-colors"
          >
            6
          </button>
          <button
            onClick={() => performOperation('+')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded transition-colors"
          >
            +
          </button>
          
          <button
            onClick={() => inputNumber('1')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded transition-colors"
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded transition-colors"
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded transition-colors"
          >
            3
          </button>
          <button
            onClick={() => inputNumber('0')}
            className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded transition-colors"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded transition-colors"
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
