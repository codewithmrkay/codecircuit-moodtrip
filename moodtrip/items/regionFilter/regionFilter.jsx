import React, { useEffect, useState } from 'react'
const regions = [
    { value: "asia", label: "Asia", emoji: "🌏" },
    { value: "europe", label: "Europe", emoji: "🇪🇺" },
    { value: "north-america", label: "North America", emoji: "🇺🇸" }
];
function regionFilter({ onRegionChange }) {
    const [selectedRegion, setSelectedRegion] = useState("");
    useEffect(() => {
        onRegionChange(selectedRegion);
        console.log(selectedRegion);
    }, [selectedRegion]);
    return (
        <div>
            <div className="flex justify-center">
                <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-64 bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-700 shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
               transition duration-200 ease-in-out hover:shadow-md"
                >
                    <option value="" disabled hidden>
                        🌍 Select region
                    </option>
                    {regions.map((region) => (
                        <option key={region.value} value={region.label}>
                            {region.emoji} {region.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default regionFilter