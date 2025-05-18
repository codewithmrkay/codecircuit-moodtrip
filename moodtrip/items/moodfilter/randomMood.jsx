import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import MysteryCard from '../mysteryCard/mysteryCard.jsx';

gsap.registerPlugin(Draggable);

function RandomMood({ onMoodUpdate }) { // Accept callback function from parent
  const blueBoxRef = useRef(null);
  const redBoxRef = useRef(null);
  const cardRef = useRef(null);
  const punchPlayedRef = useRef(false);
  const [selectedMood, setSelectedMood] = useState(""); // Store mood state

  useEffect(() => {
    const blue = blueBoxRef.current;
    const red = redBoxRef.current;
    const maxX = blue.offsetWidth - red.offsetWidth;

    if (red) {
      Draggable.create(red, {
        type: 'x',
        bounds: { minX: 0, maxX },
        inertia: false,
        onDragEnd() {
          if (this.x >= maxX - 2) {
            if (!punchPlayedRef.current) {
              const punchAudio = new Audio('/punch.mp3');
              punchAudio.play();
              punchPlayedRef.current = true;
            }
            if (cardRef.current) {
              cardRef.current.handleFlip(true);
            }
          } else {
            if (cardRef.current) {
              cardRef.current.handleFlip(false);
            }
            punchPlayedRef.current = false;
          }
        },
      });
    }
  }, []);

  // Callback function to receive mood from `MysteryCard`
  const handleMoodChange = (mood) => {
    setSelectedMood(mood); // Update state in this component
    onMoodUpdate(mood); // Send mood up to parent
  };

  return (
    <div className="max-w-[900px] mx-auto mt-10 flex rounded-lg overflow-hidden">
      <div ref={blueBoxRef} className="w-3/5 sm:w-4/5 relative overflow-hidden h-[250px] flex items-center">
        <div ref={redBoxRef} className="flex flex-col items-center justify-center w-[100px] h-[100px] cursor-pointer">
          <span className="text-[90px] leading-none">🤜</span>
        </div>
      </div>
      <div className="w-2/5 sm:w-1/5 flex items-center justify-center">
        <MysteryCard ref={cardRef} onMoodChange={handleMoodChange} />
      </div>
    </div>
  );
}

export default RandomMood;
