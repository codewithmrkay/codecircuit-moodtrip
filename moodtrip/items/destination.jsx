import React, { useEffect, useState } from 'react';

const DestinationDisplay = () => {
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const storedPlan = localStorage.getItem("travelPlan");
    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }
    console.log("Stored travel plan:", plan);
  }, []);

  if (!plan) {
    return <div>Loading travel plan...</div>;
  }

  // For example, display data from the first destination.
  const destination = plan.travel_plan.destinations[0];

  return (
    <div>
      <h2>{destination.city}</h2>
      <p>{destination.description}</p>
      <p>{destination.address}</p>
      {/* More UI to display hotel options, daily plan, etc. */}
    </div>
  );
};

export default DestinationDisplay;
