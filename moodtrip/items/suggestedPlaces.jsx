// OtherComponent.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Destination from "./destination.jsx"
const SuggestPlaces = ({ selectedValues }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!selectedValues[0] || !selectedValues[1] || !selectedValues[2] || !selectedValues[3] || !selectedValues[4]) return;
      setIsLoading(true);

      try {
        const res = await axios.post('/api/suggestplaces', {
          mood: selectedValues[0],
          region: selectedValues[1],
          days: selectedValues[2],
          budget: selectedValues[3],
          people: selectedValues[4],
        });
        const data = res.data;
        localStorage.setItem('travelPlan', JSON.stringify(data));

    // check string or json baby
    if (typeof data === 'string') {
      const parsedData = JSON.parse(data);
      console.log('Parsed recommendations:', parsedData);
      setRecommendations(parsedData);
    } else {
      setRecommendations(data);
    }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [selectedValues]);

  return (
    <div>
     <Destination/>
    </div>
    // <div className="container mx-auto p-4">
    //   <h3 className="text-3xl font-bold text-center mb-8">Travel Recommendations</h3>
    //   {error && <p className="text-red-500 text-center">{error}</p>}
    //   {isLoading ? (
    //     <p className="text-center">Loading recommendations...</p>
    //   ) : (
    //     // Check if recommendations is an array before mapping.
    //     Array.isArray(recommendations) && recommendations.length > 0 ? (
    //       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
    //         {recommendations.map((place, index) => (
    //           <div
    //           key={index}
    //           onClick={() => setSelectedIndex(index)}
    //           className={`
    //             cursor-pointer transition-transform duration-300 transform hover:scale-105 
    //             rounded-xl p-6 border shadow-sm
    //             ${selectedIndex === index 
    //               ? 'border-blue-500 bg-blue-50 shadow-md scale-105' 
    //               : 'border-gray-200 bg-white'
    //             }
    //           `}
    //         >
    //           {/* Emoji as large icon */}
    //           <div className="text-6xl mb-4">{place.imageUrl}</div>
    //           <div>
    //             <h2 className="font-bold text-2xl">{place.name}</h2>
    //             <p className="font-bold text-lg">{place.Coutry}</p>
    //             <p className="font-medium text-base text-gray-600">{place.description}</p>
    //           </div>
    //         </div>
    //         ))}
    //       </div>
    //     ) : (
    //       <p className="text-center">No recommendations available.</p>
    //     )
    //   )}
    // </div>
  );
};

export default SuggestPlaces;
