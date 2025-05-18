import React, { useState } from 'react';

const peopleOptions = [
  { label: "Solo", emoji: "🧍", description: "Enjoy your personal adventure!" },
  { label: "Couple", emoji: "👫", description: "Romantic getaway for two!" },
  { label: "Family", emoji: "👨‍👩‍👧‍👦", description: "Quality time with loved ones!" },
  { label: "Group", emoji: "🎉", description: "Fun trip with friends!" }
];

const NoOfPeople = ({ onPeopleSelect }) => {
  const [selectedPeople, setSelectedPeople] = useState(  { label: "Solo", emoji: "🧍", description: "Enjoy your personal adventure!" }
  );
  const handleSelect = (people) => {
    setSelectedPeople(people);
    console.log(selectedPeople)
    onPeopleSelect(people); // Pass selected value to parent
  };
  return (
    <div className="mt-20 max-w-4xl mx-auto bg-red-200 rounded-lg shadow-xl text-center">
      <h3 className="mb-4 text-3xl font-bold text-black">Select No. of People</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {peopleOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => handleSelect(option)}
            className={`cursor-pointer p-3 rounded-lg transition-transform shadow-md flex flex-col items-center justify-center border-2 ${
              selectedPeople?.label === option.label ? "border-blue-500 scale-105" : "border-transparent"
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

export default NoOfPeople;
