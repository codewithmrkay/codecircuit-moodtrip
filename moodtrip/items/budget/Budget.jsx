import React, { useState } from 'react';

const budgetOptions = [
  { label: "Economy", emoji: "🛵", description: "Save big while having fun!" },
  { label: "Standard", emoji: "🚗", description: "A balanced choice for comfort and savings." },
  { label: "Luxury", emoji: "🚁", description: "Pamper yourself with premium experiences." },
  { label: "Ultra-Luxury", emoji: "🛳️", description: "Live like royalty, no expenses spared!" }
];

const Budget = ({ onBudgetSelect }) => {
  const [selectedBudget, setSelectedBudget] = useState({label: "Economy", emoji: "🛵", description: "Save big while having fun!"});
  const handleSelect = (budget) => {
    setSelectedBudget(budget);
    onBudgetSelect(budget); // Pass selected budget to parent
  };
  return (
    <div className="mt-10 max-w-4xl mx-auto bg-red-200 rounded-lg shadow-xl text-center">
      <h3 className="mb-4 text-3xl font-bold text-black">Select Your Budget</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {budgetOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelect(option)}
            className={`cursor-pointer p-3 rounded-lg transition-transform shadow-md flex flex-col items-center justify-center border-2 ${
              selectedBudget?.label === option.label ? "border-blue-500 scale-105" : "border-transparent"
            } bg-white text-black`}
          >
            <div className="text-4xl">{option.emoji}</div>
            <div className="mt-1 font-semibold text-lg">{option.label}</div>
            <div className="text-xs mt-1 opacity-80">{option.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budget;
