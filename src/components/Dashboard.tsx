import React, { useState } from 'react';
import { CalculatorType, CalculatorItem, CalculatorCategory } from '../types';
import NormalCalculator from './calculators/NormalCalculator';
import ScientificCalculator from './calculators/ScientificCalculator';
import PercentageCalculator from './calculators/PercentageCalculator';
import CurrencyConverter from './calculators/CurrencyConverter';
import LengthConverter from './calculators/LengthConverter';
import WeightConverter from './calculators/WeightConverter';
import TemperatureConverter from './calculators/TemperatureConverter';
import BighaKathaConverter from './calculators/BighaKathaConverter';
import KathaSquareFeetConverter from './calculators/KathaSquareFeetConverter';
import AcreHectareConverter from './calculators/AcreHectareConverter';
import SquareMeterSquareFeetConverter from './calculators/SquareMeterSquareFeetConverter';
import EMICalculator from './calculators/EMICalculator';
import InterestCalculator from './calculators/InterestCalculator';
import GSTCalculator from './calculators/GSTCalculator';
import DiscountCalculator from './calculators/DiscountCalculator';
import BMICalculator from './calculators/BMICalculator';
import CaloriesCalculator from './calculators/CaloriesCalculator';
import AgeCalculator from './calculators/AgeCalculator';

const calculatorComponents: Record<CalculatorType, React.ComponentType<any>> = {
  normal: NormalCalculator,
  scientific: ScientificCalculator,
  percentage: PercentageCalculator,
  currency: CurrencyConverter,
  length: LengthConverter,
  weight: WeightConverter,
  temperature: TemperatureConverter,
  'bigha-katha': BighaKathaConverter,
  'katha-squarefeet': KathaSquareFeetConverter,
  'acre-hectare': AcreHectareConverter,
  'squaremeter-squarefeet': SquareMeterSquareFeetConverter,
  emi: EMICalculator,
  interest: InterestCalculator,
  gst: GSTCalculator,
  discount: DiscountCalculator,
  bmi: BMICalculator,
  calories: CaloriesCalculator,
  age: AgeCalculator,
};

const categories: CalculatorCategory[] = [
  {
    id: 'basic',
    name: 'Basic Calculators',
    icon: '🧮',
    calculators: [
      { id: 'normal', name: 'Normal Calculator', description: 'Basic arithmetic operations', component: NormalCalculator },
      { id: 'scientific', name: 'Scientific Calculator', description: 'Advanced mathematical functions', component: ScientificCalculator },
      { id: 'percentage', name: 'Percentage Calculator', description: 'Calculate percentages easily', component: PercentageCalculator },
    ],
  },
  {
    id: 'conversion',
    name: 'Conversion Calculators',
    icon: '🔄',
    calculators: [
      { id: 'currency', name: 'Currency Converter', description: 'Convert between currencies', component: CurrencyConverter },
      { id: 'length', name: 'Length Converter', description: 'Convert km, m, cm, etc.', component: LengthConverter },
      { id: 'weight', name: 'Weight Converter', description: 'Convert kg, gram, pound', component: WeightConverter },
      { id: 'temperature', name: 'Temperature Converter', description: 'Convert Celsius, Fahrenheit', component: TemperatureConverter },
    ],
  },
  {
    id: 'land',
    name: 'Land Calculators',
    icon: '🏞️',
    calculators: [
      { id: 'bigha-katha', name: 'Bigha to Katha', description: 'Convert Bigha to Katha', component: BighaKathaConverter },
      { id: 'katha-squarefeet', name: 'Katha to Square Feet', description: 'Convert Katha to Square Feet', component: KathaSquareFeetConverter },
      { id: 'acre-hectare', name: 'Acre to Hectare', description: 'Convert Acre to Hectare', component: AcreHectareConverter },
      { id: 'squaremeter-squarefeet', name: 'Square Meter to Square Feet', description: 'Convert Square Meter to Square Feet', component: SquareMeterSquareFeetConverter },
    ],
  },
  {
    id: 'finance',
    name: 'Finance Calculators',
    icon: '💰',
    calculators: [
      { id: 'emi', name: 'EMI Calculator', description: 'Calculate loan EMI', component: EMICalculator },
      { id: 'interest', name: 'Interest Calculator', description: 'Calculate simple/compound interest', component: InterestCalculator },
      { id: 'gst', name: 'GST Calculator', description: 'Calculate GST amounts', component: GSTCalculator },
      { id: 'discount', name: 'Discount Calculator', description: 'Calculate discounts', component: DiscountCalculator },
    ],
  },
  {
    id: 'health',
    name: 'Health Calculators',
    icon: '❤️',
    calculators: [
      { id: 'bmi', name: 'BMI Calculator', description: 'Calculate Body Mass Index', component: BMICalculator },
      { id: 'calories', name: 'Calories Calculator', description: 'Calculate daily calorie needs', component: CaloriesCalculator },
      { id: 'age', name: 'Age Calculator', description: 'Calculate age from date of birth', component: AgeCalculator },
    ],
  },
];

const Dashboard: React.FC = () => {
  const [selectedCalculator, setSelectedCalculator] = useState<CalculatorType | null>(null);
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['basic'])); // Default expand first category

  const handleCalculatorSelect = (calculatorId: CalculatorType, categoryId: string) => {
    setSelectedCalculator(calculatorId);
    // setSelectedCategory(categoryId);
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const SelectedCalculatorComponent = selectedCalculator ? calculatorComponents[selectedCalculator] : null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:block fixed left-0 top-0 h-screen overflow-y-auto z-10">
        <div className="p-6">
          <div className="flex items-center mb-8">
            <span className="text-3xl mr-3">🧮</span>
            <h1 className="text-xl font-bold text-gray-900">Multi-Calculator</h1>
          </div>
          
          <nav className="space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between px-3 py-3 text-left hover:bg-gray-50 rounded-md transition-colors group"
                >
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center">
                    <span className="mr-2 text-lg">{category.icon}</span>
                    {category.name}
                  </h3>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      expandedCategories.has(category.id) ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Content */}
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    expandedCategories.has(category.id) ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <ul className="py-2 space-y-1">
                    {category.calculators.map((calculator: CalculatorItem) => (
                      <li key={calculator.id}>
                        <button
                          onClick={() => handleCalculatorSelect(calculator.id, category.id)}
                          className={`w-full text-left px-6 py-2 rounded-md text-sm transition-colors ${
                            selectedCalculator === calculator.id
                              ? 'bg-blue-100 text-blue-700 font-medium border-l-2 border-blue-500'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          {calculator.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content - with left margin to account for fixed sidebar */}
      <main className="flex-1 overflow-auto md:ml-64">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm border-b md:hidden">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🧮</span>
                <h1 className="text-lg font-bold text-gray-900">Multi-Calculator</h1>
              </div>
              {selectedCalculator && (
                <button
                  onClick={() => setSelectedCalculator(null)}
                  className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Calculator Content */}
        <div className="p-4 md:p-8">
          {!selectedCalculator ? (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome to Multi-Calculator Dashboard
                </h2>
                <p className="text-lg text-gray-600">
                  Select a calculator from the sidebar to get started
                </p>
              </div>

              {/* Mobile Calculator Grid */}
              <div className="md:hidden space-y-6">
                {categories.map((category) => (
                  <div key={category.id} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center mb-3">
                      <span className="text-xl mr-2">{category.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    </div>
                    <div className="space-y-2">
                      {category.calculators.map((calculator: CalculatorItem) => (
                        <button
                          key={calculator.id}
                          onClick={() => handleCalculatorSelect(calculator.id, category.id)}
                          className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200"
                        >
                          <h4 className="font-medium text-gray-900 text-sm">{calculator.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{calculator.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Welcome Cards */}
              <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
                {categories.map((category) => (
                  <div key={category.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{category.icon}</span>
                      <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Choose from {category.calculators.length} different calculators
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {category.calculators.slice(0, 4).map((calculator: CalculatorItem) => (
                        <button
                          key={calculator.id}
                          onClick={() => handleCalculatorSelect(calculator.id, category.id)}
                          className="p-2 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 text-sm"
                        >
                          <h4 className="font-medium text-gray-900">{calculator.name}</h4>
                        </button>
                      ))}
                      {category.calculators.length > 4 && (
                        <button
                          onClick={() => handleCalculatorSelect(category.calculators[0].id, category.id)}
                          className="p-2 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200 text-sm text-gray-500"
                        >
                          +{category.calculators.length - 4} more...
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <button
                  onClick={() => setSelectedCalculator(null)}
                  className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Dashboard
                </button>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                {SelectedCalculatorComponent && <SelectedCalculatorComponent />}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
