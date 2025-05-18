import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagnetBtn = () => {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;

    const handleMouseEnter = () => {
      gsap.to(btn, { scale: 1.1, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power3.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, { scale: 1, x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    };

    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold shadow-lg"
    >
      Magnet Button
    </button>
  );
};

export default MagnetBtn;
