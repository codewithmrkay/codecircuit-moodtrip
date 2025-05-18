import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const expressions = ["😴", "😌", "😊", "😁", "😃", "😍", "🥳", "🤩"];

const NoOfDays = ({ onDaysChange }) => {
  const [days, setDays] = useState(3);
  const spinnerRef = useRef(null);
  const updateDays = (newDays) => {
    setDays(newDays);
    onDaysChange(newDays); // Pass updated number of days to parent
  };
  const increaseDays = () => {
    if (days < 10) {
      gsap.to(spinnerRef.current, {
        rotation: "+=360",
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => updateDays(days + 1),
      });
    }
  };

  const decreaseDays = () => {
    if (days > 3) {
      gsap.to(spinnerRef.current, {
        rotation: "-=360",
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => updateDays(days - 1),
      });
    }
  };

  return (
    <div className="w-96 p-8 bg-red-200 rounded-lg shadow-xl hover:scale-110 transition-all duration-300 ease-in-out text-center text-gray-800">
  <h3 className="mb-6 text-2xl font-bold">Select How Many Days</h3>
  <div className="flex items-center justify-center space-x-6">
    <button
      onClick={decreaseDays}
      className="cursor-pointer p-4 bg-gray-300 text-gray-800 rounded-full shadow-lg hover:scale-110 transition"
    >
      &lt;
    </button>
    <div ref={spinnerRef} className="text-4xl font-bold">
      {days} {expressions[days - 3]}
    </div>
    <button
      onClick={increaseDays}
      className="cursor-pointer p-4 bg-gray-300 text-gray-800 rounded-full shadow-lg hover:scale-110 transition"
    >
      &gt;
    </button>
  </div>
</div>

  );
};

export default NoOfDays;
