import { useEffect, useState } from 'react';

const AnimatedEmojiHeading = () => {
    const emojis = ['😀', '😊', '😎', '🤔', '😴'];
    const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentEmojiIndex((prev) => (prev + 1) % emojis.length);
        }, 900); // change emoji every 800ms

        return () => clearInterval(interval); // cleanup on unmount
    }, []);

    return (
        <div className='flex items-center justify-center'>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-center mt-8">
                Choose Mood
            </h1>
            <span className="ml-1 text-3xl sm:text-5xl md:text-7xl font-bold text-center mt-8 inline-block animate-bounce">{emojis[currentEmojiIndex]}</span>
        </div>
    );
};

export default AnimatedEmojiHeading;
