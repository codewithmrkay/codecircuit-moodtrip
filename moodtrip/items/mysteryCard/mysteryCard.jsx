import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import gsap from 'gsap';

const moods = [
    { label: "Chill", emoji: "🌴" },
    { label: "Party", emoji: "🎉" },
    { label: "Romantic", emoji: "💖" },
    { label: "Peaceful", emoji: "🧘" },
    { label: "Adventure", emoji: "🏔️" }
];

const MysteryCard = forwardRef((props, ref) => {
    const cardRef = useRef(null);
    const [flipped, setFlipped] = useState(false);
    const [currentMood, setCurrentMood] = useState(moods[0]);

    const handleFlip = (forceFlipTo) => {
        let targetFlip;
        if (typeof forceFlipTo === 'boolean') {
            if (forceFlipTo === flipped) return;
            targetFlip = forceFlipTo;
        } else {
            targetFlip = !flipped;
        }
        if (targetFlip) {
            const randomMood = moods[Math.floor(Math.random() * moods.length)];
            setCurrentMood(randomMood);
            props.onMoodChange(randomMood.label); // Pass mood label to parent
        }
        const targetRotation = targetFlip ? 180 : 0;
        gsap.to(cardRef.current, {
            duration: 0.6,
            rotationY: targetRotation,
            ease: 'power2.inOut'
        });
        setFlipped(targetFlip);
    };

    useImperativeHandle(ref, () => ({
        handleFlip,
    }));

    useEffect(() => {
        gsap.to(cardRef.current, {
            y: "-20px",
            ease: "sine.inOut",
            duration: 2,
            repeat: -1,
            yoyo: true
        });
    }, []);

    return (
        <div className="w-full h-[200px] flex flex-col items-center justify-center"> <div className="inline-block w-full h-full" style={{ perspective: '1000px' }} > <div ref={cardRef} className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transform: 'rotateY(0deg)' }} > {/* Front Face showing '?' */} <div className=" rounded-xl absolute inset-0 border border-gray-300 flex items-center justify-center text-6xl bg-gray-200 bg-[url(/mystery.gif)]" style={{ backfaceVisibility: 'hidden', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', }} > </div> {/* Back Face showing emoji and label */} <div className="rounded-xl absolute inset-0 bg-gray-100 border border-gray-300 flex flex-col items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} > <div className="text-6xl">{currentMood.emoji}</div> <div className="mt-4 text-lg font-medium">{currentMood.label}</div> </div> </div> </div> </div>
    );
});

export default MysteryCard;
