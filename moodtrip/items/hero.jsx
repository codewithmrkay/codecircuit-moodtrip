"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import MoodFilter from "./moodfilter/moodFilter.jsx";
import NoOfDays from "./noOfDays/NoOfDays.jsx"
import Budget from "./budget/Budget.jsx"
import NoOfPeople from "./noOfPeople/NoOfPeople.jsx"
import RegionFilter from "./regionFilter/regionFilter.jsx"
import MagnetBtn from "./magnetElem/magnetBtn.jsx"
import MagnetRegion from "./magnetElem/magnetRegion.jsx"
import SuggestPlaces from './suggestedPlaces.jsx'
export default function Hero() {
  //* --getting values like mood and region from moodFilter--*//
  let selectedValues = null; // Initialize selectedValues as null
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDays, setSelectedDays] = useState(3);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState(null);
  useEffect(() => {
    selectedValues = [selectedMood, selectedRegion,selectedDays,selectedBudget?.label,selectedPeople?.label];
    console.log("Selected values:", selectedValues); 
  }, [selectedMood, selectedRegion,selectedDays,selectedBudget,selectedPeople]);
  // *----------------------------------GSAP THE PAPA OF ANIMATION
  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap && window.ScrollSmoother) {
      window.gsap.registerPlugin(window.ScrollTrigger, window.ScrollSmoother);
      window.ScrollSmoother.create({
        wrapper: ".smooth-wrapper",
        content: ".smooth-content",
        smooth: 2, // Adjust smoothing effect (in seconds)
        smoothTouch: 0.1, // Adjust touch smoothing effect (in seconds)
      });
    }
    window.gsap.to(".red-box",{
      x: 300, // moves the red box 300 pixels to the right
      scrollTrigger: {
        trigger: ".red-box",
        start: "top center", // when the top of .red-box hits the center of the viewport
        end: "bottom center", // when the bottom of .red-box hits the center
        scrub: true, // links the animation's progress to the scrollbar movement
        markers: true, // Optional: displays markers for debugging
      },
    });
  }, []);

  return (
    <>
      {/* GSAP and its plugins loaded via CDN */}
      <Script
        src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Draggable.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollSmoother.min.js"
        strategy="beforeInteractive"
      />

      {/* Page structure using Tailwind CSS */}
      <div className="smooth-wrapper overflow-x-hidden">
        <div className="smooth-content">
          <div className="min-h-screen bg-red-200 flex flex-col items-center justify-center">
            <MoodFilter onMoodChange={setSelectedMood} />
          </div>
          <div className="min-h-screen flex items-center bg-red-200 justify-center">
          <MagnetRegion onRegionSelect={setSelectedRegion} />
          </div>
          <div className=" h-auto bg-red-200 flex flex-col items-center justify-start gap-3">
          <NoOfDays onDaysChange={setSelectedDays} />
            <Budget onBudgetSelect={setSelectedBudget}/>
          </div>
          <div className="pb-20 h-auto bg-red-200 flex flex-col items-center justify-start gap-3">
            <NoOfPeople onPeopleSelect={setSelectedPeople}/>
          </div>
          <div className="pb-20 h-auto bg-red-200 flex flex-col items-center justify-start gap-3">
          <SuggestPlaces selectedValues={selectedValues}/>
          </div>
        </div>
      </div>
    </>
  );
}
