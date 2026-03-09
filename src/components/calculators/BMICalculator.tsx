import React, { useState } from 'react';

const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const getBMICategory = (bmiValue: number): string => {
    if (bmiValue < 18.5) return 'Underweight';
    if (bmiValue < 25) return 'Normal weight';
    if (bmiValue < 30) return 'Overweight';
    if (bmiValue < 35) return 'Obese Class I';
    if (bmiValue < 40) return 'Obese Class II';
    return 'Obese Class III';
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Underweight': return 'text-blue-600';
      case 'Normal weight': return 'text-green-600';
      case 'Overweight': return 'text-yellow-600';
      case 'Obese Class I': return 'text-orange-600';
      case 'Obese Class II': return 'text-red-600';
      case 'Obese Class III': return 'text-red-800';
      default: return 'text-gray-600';
    }
  };

  const calculateBMI = () => {
    const weightValue = parseFloat(weight);
    let heightValue = parseFloat(height);

    if (isNaN(weightValue) || isNaN(heightValue) || weightValue <= 0 || heightValue <= 0) {
      setBmi(null);
      setCategory('');
      return;
    }

    if (heightUnit === 'ft') {
      heightValue = heightValue * 30.48;
    }

    const heightInMeters = heightValue / 100;
    const bmiValue = weightValue / (heightInMeters * heightInMeters);

    setBmi(bmiValue);
    setCategory(getBMICategory(bmiValue));
  };

  const clear = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setCategory('');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">BMI Calculator</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Height Unit</label>
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value as 'cm' | 'ft')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            >
              <option value="cm">Centimeters</option>
              <option value="ft">Feet</option>
            </select>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={`Enter your height in ${heightUnit === 'cm' ? 'centimeters' : 'feet'}`}
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={calculateBMI}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Calculate BMI
          </button>
          <button
            onClick={clear}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Clear
          </button>
        </div>

        {bmi !== null && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Your BMI:</p>
              <p className="text-3xl font-bold text-blue-600">
                {bmi.toFixed(1)}
              </p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Category:</p>
              <p className={`text-xl font-bold ${getCategoryColor(category)}`}>
                {category}
              </p>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-xs text-gray-600">
                <strong>BMI Categories:</strong><br/>
                • Underweight: BMI &lt; 18.5<br/>
                • Normal weight: 18.5 ≤ BMI &lt; 25<br/>
                • Overweight: 25 ≤ BMI &lt; 30<br/>
                • Obese Class I: 30 ≤ BMI &lt; 35<br/>
                • Obese Class II: 35 ≤ BMI &lt; 40<br/>
                • Obese Class III: BMI ≥ 40
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-800">
            <strong>Note:</strong> BMI is a screening tool and is not diagnostic of body fatness or health. Consult a healthcare provider for a comprehensive health assessment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
