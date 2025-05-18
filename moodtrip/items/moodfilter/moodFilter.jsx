
import React, { useState, useEffect } from 'react';
import AnimateHeading from "./headingMood.jsx"
import RandomMood from "./randomMood.jsx"
const moods = [
  { label: "Chill", emoji: "🌴" },
  { label: "Party", emoji: "🎉" },
  { label: "Romantic", emoji: "💖" },
  { label: "Peaceful", emoji: "🧘" },
  { label: "Adventure", emoji: "🏔️" }
];

const MoodFilter = ({ onMoodChange }) => {
  const [selectedMood, setSelectedMood] = useState("");
  useEffect(() => {
    onMoodChange(selectedMood);
  }, [selectedMood]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <AnimateHeading/>
      {/* Mood filter buttons */}
      <div className="mt-3 sm:mt-5 md:mt-10 flex flex-wrap justify-center gap-4 mb-6">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setSelectedMood(mood.label)}
            className={`flex items-center gap-2 border rounded-full py-2 px-4 transition-colors
              ${selectedMood === mood.label 
                ? 'bg-blue-100 text-black border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
          >
            <span className="text-xl animate-pulse">{mood.emoji}</span>
            <span>{mood.label}</span>
          </button>
        ))}
      </div>
      <div className='mt-10 flex items-center justify-center text-4xl'>
        <h3>Or Drag To Punch Confusion</h3>
      </div>
      <RandomMood onMoodUpdate={setSelectedMood} />
    </div>
  );
};

export default MoodFilter;
