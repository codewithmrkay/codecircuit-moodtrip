import React, { useState } from 'react';
import gsap from 'gsap';

const regions = ["Asia", "Europe", "US"];

const MagnetRegion = ({ onRegionSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleMouseEnter = (e) => {
    // Animate the inner magnet child and fade the outer (parent) container
    const innerEl = e.currentTarget.querySelector('.magnet-child');
    gsap.to(innerEl, { scale: 1.2, duration: 0.3, ease: "power2.out" });
    gsap.to(e.currentTarget, { opacity: 0.8, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseMove = (e) => {
    const innerEl = e.currentTarget.querySelector('.magnet-child');
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotation = x * 0.1;
    gsap.to(innerEl, {
      x: x * 0.4,
      y: y * 0.4,
      rotation,
      duration: 0.3,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = (e) => {
    const innerEl = e.currentTarget.querySelector('.magnet-child');
    gsap.to(innerEl, { scale: 1, x: 0, y: 0, rotation: 0, duration: 0.3, ease: "power2.out" });
    gsap.to(e.currentTarget, { opacity: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleSelect = (region) => {
    setSelected(region);
    onRegionSelect(region);
  };

  return (
    <div className="w-60 p-8 md:w-80 bg-gray-100 rounded-md shadow-lg">
      <h3 className="mb-4 text-2xl font-bold">Select Region</h3>
      <ul className="space-y-6">
        {regions.map((region, index) => (
          <li
            key={index}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleSelect(region)}
            className="cursor-pointer p-2 md:p-8 bg-transparent  rounded-lg transition-all"
          >
            <div className="magnet-child p-2 md:p-4 bg-white bg-opacity-50 backdrop-blur-sm rounded-lg text-center">
              {region}
            </div>
          </li>
        ))}
      </ul>
      {selected && (
        <div className="mt-6 text-lg  p-2 bg-blue-100 rounded-lg md:text-xl text-center">
          Selected Region: <span className="font-semibold text-center w-full">{selected}</span>
        </div>
      )}
    </div>
  );
};

export default MagnetRegion;
