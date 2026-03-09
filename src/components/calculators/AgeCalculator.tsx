import React, { useState } from 'react';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [years, setYears] = useState<number | null>(null);
  const [months, setMonths] = useState<number | null>(null);
  const [days, setDays] = useState<number | null>(null);
  const [totalDays, setTotalDays] = useState<number | null>(null);
  const [totalHours, setTotalHours] = useState<number | null>(null);

  const calculateAge = () => {
    if (!birthDate) {
      setYears(null);
      setMonths(null);
      setDays(null);
      setTotalDays(null);
      setTotalHours(null);
      return;
    }

    const birth = new Date(birthDate);
    const current = currentDate ? new Date(currentDate) : new Date();

    if (birth > current) {
      setYears(null);
      setMonths(null);
      setDays(null);
      setTotalDays(null);
      setTotalHours(null);
      return;
    }

    let yearsDiff = current.getFullYear() - birth.getFullYear();
    let monthsDiff = current.getMonth() - birth.getMonth();
    let daysDiff = current.getDate() - birth.getDate();

    if (daysDiff < 0) {
      monthsDiff--;
      const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0);
      daysDiff += lastMonth.getDate();
    }

    if (monthsDiff < 0) {
      yearsDiff--;
      monthsDiff += 12;
    }

    const timeDiff = current.getTime() - birth.getTime();
    const daysDiffTotal = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursDiffTotal = Math.floor(timeDiff / (1000 * 60 * 60));

    setYears(yearsDiff);
    setMonths(monthsDiff);
    setDays(daysDiff);
    setTotalDays(daysDiffTotal);
    setTotalHours(hoursDiffTotal);
  };

  const clear = () => {
    setBirthDate('');
    setCurrentDate('');
    setYears(null);
    setMonths(null);
    setDays(null);
    setTotalDays(null);
    setTotalHours(null);
  };

  const getNextBirthday = () => {
    if (!birthDate) return null;
    
    const birth = new Date(birthDate);
    const current = new Date();
    const nextBirthday = new Date(current.getFullYear(), birth.getMonth(), birth.getDate());
    
    if (nextBirthday < current) {
      nextBirthday.setFullYear(current.getFullYear() + 1);
    }
    
    return nextBirthday;
  };

  const getDaysUntilNextBirthday = () => {
    const nextBirthday = getNextBirthday();
    if (!nextBirthday) return null;
    
    const current = new Date();
    const timeDiff = nextBirthday.getTime() - current.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Age Calculator</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={currentDate || new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Date (optional)</label>
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to use today's date</p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={calculateAge}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Calculate Age
          </button>
          <button
            onClick={clear}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Clear
          </button>
        </div>

        {years !== null && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Your Age:</p>
              <p className="text-3xl font-bold text-blue-600">
                {years} Years, {months} Months, {days} Days
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Total Days:</p>
                <p className="text-lg font-bold text-green-600">
                  {totalDays?.toLocaleString()}
                </p>
              </div>

              <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Total Hours:</p>
                <p className="text-lg font-bold text-purple-600">
                  {totalHours?.toLocaleString()}
                </p>
              </div>
            </div>

            {getDaysUntilNextBirthday() !== null && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-xs text-gray-600 mb-1">Days until next birthday:</p>
                <p className="text-lg font-bold text-yellow-600">
                  {getDaysUntilNextBirthday()} days
                </p>
              </div>
            )}

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-xs text-gray-600">
                <strong>Key Milestones:</strong><br/>
                • 1,000 days: {(1000 / 365.25).toFixed(1)} years<br/>
                • 10,000 days: {(10000 / 365.25).toFixed(1)} years<br/>
                • 20,000 days: {(20000 / 365.25).toFixed(1)} years<br/>
                • 30,000 days: {(30000 / 365.25).toFixed(1)} years
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeCalculator;
