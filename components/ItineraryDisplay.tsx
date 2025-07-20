"use client";

interface ItineraryDisplayProps {
  formData: any;
  onBack: () => void;
}

export default function ItineraryDisplay({ formData, onBack }: ItineraryDisplayProps) {
  // Calculate estimated costs based on form data
  const flightCostMultiplier = {
    economy: 1,
    premium: 1.5,
    business: 3,
    first: 5
  };
  
  const baseFlight = 450;
  const flightCost = baseFlight * (flightCostMultiplier[formData.transportPreferences?.flightClass || 'economy'] || 1);
  const hotelCostPerNight = formData.accommodationType?.includes('hostel') ? 50 : 
                           formData.accommodationType?.includes('boutique') ? 180 : 120;
  const totalEstimatedCost = flightCost * 2 + (hotelCostPerNight * (formData.days - 1)) + (formData.days * 50);

  // Hardcoded itinerary data
  const itinerary = {
    overview: {
      origin: formData.origin,
      destination: formData.destination,
      duration: formData.days,
      dates: formData.dates || "Flexible dates",
      budget: `$${formData.minBudget} - $${formData.maxBudget}`,
      totalEstimatedCost: `$${Math.round(totalEstimatedCost)}`,
      travelers: {
        adults: formData.adults || 1,
        children: formData.children || 0,
        infants: formData.infants || 0
      },
      pace: formData.pace || "moderate",
      tripPurpose: formData.tripPurpose || "vacation"
    },
    transportation: {
      outbound: {
        type: "Flight",
        details: `${formData.transportPreferences?.preferDirectFlights ? 'Direct' : 'Connecting'} flight from ${formData.origin} to ${formData.destination}`,
        duration: "7h 30m",
        cost: `$${Math.round(flightCost)}`,
        airline: "Air France",
        class: formData.transportPreferences?.flightClass || "economy"
      },
      return: {
        type: "Flight",
        details: `${formData.transportPreferences?.preferDirectFlights ? 'Direct' : 'Connecting'} flight from ${formData.destination} to ${formData.origin}`,
        duration: "8h 15m",
        cost: `$${Math.round(flightCost * 1.05)}`,
        airline: "Air France",
        class: formData.transportPreferences?.flightClass || "economy"
      },
      local: formData.transportPreferences?.needRentalCar ? 
        `Rental Car (${formData.days} days): $${formData.days * 45}` : 
        `Metro Pass (${formData.days} days): $${formData.days * 7}`
    },
    accommodation: {
      name: "Hotel Le Marais",
      location: "Central Paris, 3rd Arrondissement",
      type: "3-star boutique hotel",
      costPerNight: "$120",
      totalCost: `$${120 * (formData.days - 1)}`,
      amenities: ["Free WiFi", "Breakfast included", "24/7 reception", "Near metro station"]
    },
    dailyItinerary: [
      {
        day: 1,
        title: "Arrival & Eiffel Tower",
        activities: [
          { time: "Morning", activity: "Arrive at CDG Airport, transfer to hotel", cost: "$35" },
          { time: "Afternoon", activity: "Visit Eiffel Tower and Trocadéro Gardens", cost: "$28" },
          { time: "Evening", activity: "Seine River cruise at sunset", cost: "$15" },
          { time: "Dining", activity: "Dinner at Café de l'Homme (view of Eiffel Tower)", cost: "$60" }
        ]
      },
      {
        day: 2,
        title: "Louvre & Historic Paris",
        activities: [
          { time: "Morning", activity: "Louvre Museum (pre-booked tickets)", cost: "$20" },
          { time: "Afternoon", activity: "Walk through Tuileries Garden to Place de la Concorde", cost: "Free" },
          { time: "Evening", activity: "Explore Le Marais district", cost: "Free" },
          { time: "Dining", activity: "Traditional French bistro in Le Marais", cost: "$45" }
        ]
      },
      {
        day: 3,
        title: "Versailles Day Trip",
        activities: [
          { time: "Morning", activity: "Train to Palace of Versailles", cost: "$8" },
          { time: "Afternoon", activity: "Tour palace and gardens", cost: "$22" },
          { time: "Evening", activity: "Return to Paris, walk Champs-Élysées", cost: "$8" },
          { time: "Dining", activity: "Dinner near Arc de Triomphe", cost: "$50" }
        ]
      }
    ],
    foodRecommendations: [
      "Croissants at Du Pain et des Idées",
      "Steak frites at L'Entrecôte",
      "Macarons at Ladurée",
      "Wine and cheese at La Belle Hortense"
    ]
  };

  // Generate days based on formData.days
  const allDays = [...itinerary.dailyItinerary];
  if (formData.days > 3) {
    for (let i = 4; i <= formData.days; i++) {
      allDays.push({
        day: i,
        title: `Day ${i} - Explore More of Paris`,
        activities: [
          { time: "Morning", activity: "Visit Montmartre and Sacré-Cœur", cost: "Free" },
          { time: "Afternoon", activity: "Musée d'Orsay or Latin Quarter", cost: "$16" },
          { time: "Evening", activity: "Enjoy local neighborhood", cost: "Free" },
          { time: "Dining", activity: "Local restaurant recommendation", cost: "$40" }
        ]
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Your Customized Itinerary
        </h1>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Form
        </button>
      </div>

      {/* Overview Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Trip Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">From</p>
            <p className="font-medium text-gray-900">{itinerary.overview.origin}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">To</p>
            <p className="font-medium text-gray-900">{itinerary.overview.destination}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-medium text-gray-900">{itinerary.overview.duration} days</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Travel Dates</p>
            <p className="font-medium text-gray-900">{itinerary.overview.dates}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Budget Range</p>
            <p className="font-medium text-gray-900">{itinerary.overview.budget}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Estimated Total Cost</p>
            <p className="font-medium text-green-600">{itinerary.overview.totalEstimatedCost}</p>
          </div>
        </div>
      </div>

      {/* Transportation */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transportation</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-900">Outbound Journey</h3>
            <p className="text-gray-700">{itinerary.transportation.outbound.details}</p>
            <p className="text-sm text-gray-600">
              {itinerary.transportation.outbound.airline} • {itinerary.transportation.outbound.duration} • 
              <span className="font-medium text-blue-600"> {itinerary.transportation.outbound.cost}</span>
            </p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-900">Return Journey</h3>
            <p className="text-gray-700">{itinerary.transportation.return.details}</p>
            <p className="text-sm text-gray-600">
              {itinerary.transportation.return.airline} • {itinerary.transportation.return.duration} • 
              <span className="font-medium text-blue-600"> {itinerary.transportation.return.cost}</span>
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-700">Local Transportation: {itinerary.transportation.local}</p>
          </div>
        </div>
      </div>

      {/* Accommodation */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Accommodation</h2>
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{itinerary.accommodation.name}</h3>
        <p className="text-gray-700 mb-2">{itinerary.accommodation.location}</p>
        <p className="text-gray-600 mb-3">{itinerary.accommodation.type}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {itinerary.accommodation.amenities.map((amenity, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
              {amenity}
            </span>
          ))}
        </div>
        <p className="text-lg">
          <span className="text-gray-600">Cost: </span>
          <span className="font-semibold text-gray-900">{itinerary.accommodation.costPerNight}/night</span>
          <span className="text-gray-600"> • Total: </span>
          <span className="font-semibold text-green-600">{itinerary.accommodation.totalCost}</span>
        </p>
      </div>

      {/* Daily Itinerary */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Day-by-Day Itinerary</h2>
        <div className="space-y-6">
          {allDays.slice(0, formData.days).map((day) => (
            <div key={day.day} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Day {day.day}: {day.title}
              </h3>
              <div className="space-y-2">
                {day.activities.map((activity, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-1">
                      <span className="font-medium text-gray-700">{activity.time}: </span>
                      <span className="text-gray-600">{activity.activity}</span>
                    </div>
                    <span className="text-blue-600 font-medium ml-4">{activity.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Food Recommendations */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Must-Try Food & Dining</h2>
        <ul className="space-y-2">
          {itinerary.foodRecommendations.map((food, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-gray-700">{food}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
          Save Itinerary
        </button>
        <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-all duration-300">
          Export as PDF
        </button>
      </div>
    </div>
  );
}