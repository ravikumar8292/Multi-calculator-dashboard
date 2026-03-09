import React, { useState } from 'react';

const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [discountAmount, setDiscountAmount] = useState<number | null>(null);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [savedAmount, setSavedAmount] = useState<number | null>(null);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);

    if (isNaN(price) || isNaN(discount) || price < 0 || discount < 0 || discount > 100) {
      setDiscountAmount(null);
      setFinalPrice(null);
      setSavedAmount(null);
      return;
    }

    const discountAmt = (price * discount) / 100;
    const finalAmt = price - discountAmt;

    setDiscountAmount(discountAmt);
    setFinalPrice(finalAmt);
    setSavedAmount(discountAmt);
  };

  const clear = () => {
    setOriginalPrice('');
    setDiscountPercentage('');
    setDiscountAmount(null);
    setFinalPrice(null);
    setSavedAmount(null);
  };

  const calculateFromDiscountAmount = () => {
    const price = parseFloat(originalPrice);
    const discountAmt = parseFloat(discountPercentage);

    if (isNaN(price) || isNaN(discountAmt) || price < 0 || discountAmt < 0 || discountAmt > price) {
      setDiscountAmount(null);
      setFinalPrice(null);
      setSavedAmount(null);
      return;
    }

    const discountPercent = (discountAmt / price) * 100;
    const finalAmt = price - discountAmt;

    setDiscountAmount(discountAmt);
    setFinalPrice(finalAmt);
    setSavedAmount(discountAmt);
    setDiscountPercentage(discountPercent.toString());
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Discount Calculator</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter original price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
            <input
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              placeholder="Enter discount percentage"
              step="0.1"
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={calculateDiscount}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Calculate Discount
          </button>
          <button
            onClick={clear}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Clear
          </button>
        </div>

        {discountAmount !== null && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Discount Amount:</p>
              <p className="text-2xl font-bold text-green-600">
                ₹{discountAmount.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ({discountPercentage}% off)
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">Final Price:</p>
              <p className="text-xl font-bold text-blue-600">
                ₹{finalPrice?.toFixed(2)}
              </p>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
              <p className="text-sm text-gray-600 mb-1">You Save:</p>
              <p className="text-xl font-bold text-purple-600">
                ₹{savedAmount?.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                ({((savedAmount! / parseFloat(originalPrice)) * 100).toFixed(1)}% of original price)
              </p>
            </div>

            <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-xs text-gray-600">
                <strong>Price Breakdown:</strong><br/>
                Original Price: ₹{parseFloat(originalPrice).toFixed(2)}<br/>
                Discount: -₹{discountAmount.toFixed(2)}<br/>
                Final Price: ₹{finalPrice?.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-800">
            <strong>Quick Discount References:</strong><br/>
            10% = 1/10 of the price<br/>
            20% = 1/5 of the price<br/>
            25% = 1/4 of the price<br/>
            50% = Half the price<br/>
            75% = 3/4 of the price
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscountCalculator;
