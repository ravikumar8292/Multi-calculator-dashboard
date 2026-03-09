import React, { useState } from 'react';

const CaloriesCalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('1.2');
  const [bmr, setBmr] = useState<number | null>(null);
  const [dailyCalories, setDailyCalories] = useState<number | null>(null);

  const calculateCalories = () => {
    const ageValue = parseInt(age);
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    const activityMultiplier = parseFloat(activityLevel);

    if (isNaN(ageValue) || isNaN(weightValue) || isNaN(heightValue) || 
        ageValue <= 0 || weightValue <= 0 || heightValue <= 0) {
      setBmr(null);
      setDailyCalories(null);
      return;
    }

    let bmrValue: number;

    if (gender === 'male') {
      bmrValue = 88.362 + (13.397 * weightValue) + (4.799 * heightValue) - (5.677 * ageValue);
    } else {
      bmrValue = 447.593 + (9.247 * weightValue) + (3.098 * heightValue) - (4.330 * ageValue);
    }

    const dailyCaloriesValue = bmrValue * activityMultiplier;

    setBmr(bmrValue);
    setDailyCalories(dailyCaloriesValue);
  };

  const clear = () => {
    setAge('');
    setWeight('');
    setHeight('');
    setBmr(null);
    setDailyCalories(null);
  };

  const getActivityDescription = (level: string): string => {
    switch (level) {
      case '1.2': return 'Sedentary (little or no exercise)';
      case '1.375': return 'Lightly active (1-3 days/week)';
      case '1.55': return 'Moderately active (3-5 days/week)';
      case '1.725': return 'Very active (6-7 days/week)';
      case '1.9': return 'Extra active (very hard exercise/physical job)';
      default: return '';
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Daily Calories Calculator</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age (years)</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as 'male' | 'female')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

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
            <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1.2">Sedentary</option>
              <option value="1.375">Lightly Active</option>
              <option value="1.55">Moderately Active</option>
              <option value="1.725">Very Active</option>
              <option value="1.9">Extra Active</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">{getActivityDescription(activityLevel)}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={calculateCalories}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Calculate Calories
          </button>
          <button
            onClick={clear}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Clear
          </button>
        </div>

        {bmr !== null && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Basal Metabolic Rate (BMR):</p>
              <p className="text-2xl font-bold text-purple-600">
                {bmr.toFixed(0)} calories/day
              </p>
              <p className="text-xs text-gray-500 mt-1">Calories needed at rest</p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Daily Calories Needed:</p>
              <p className="text-2xl font-bold text-green-600">
                {dailyCalories?.toFixed(0)} calories/day
              </p>
              <p className="text-xs text-gray-500 mt-1">To maintain current weight</p>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-xs text-gray-600">
                <strong>Weight Management:</strong><br/>
                • To lose weight: {(dailyCalories! - 500).toFixed(0)} calories/day<br/>
                • To gain weight: {(dailyCalories! + 500).toFixed(0)} calories/day<br/>
                • (500 calories ≈ 0.5 kg per week)
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-800">
            <strong>Formulas Used:</strong><br/>
            <strong>Men:</strong> BMR = 88.362 + (13.397 × weight) + (4.799 × height) - (5.677 × age)<br/>
            <strong>Women:</strong> BMR = 447.593 + (9.247 × weight) + (3.098 × height) - (4.330 × age)<br/>
            Daily Calories = BMR × Activity Level
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaloriesCalculator;
