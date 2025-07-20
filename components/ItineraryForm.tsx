"use client";

import { useState } from "react";

interface ItineraryFormProps {
  onSubmit: (data: ExtendedFormData) => void;
}

interface ExtendedFormData {
  // Basic Info
  origin: string;
  destination: string;
  days: number;
  dates?: string;
  minBudget: number;
  maxBudget: number;
  
  // Travel Preferences
  travelStyle: string[];
  pace: string;
  interests: string[];
  
  // Group Details
  adults: number;
  children: number;
  infants: number;
  
  // Accommodation & Transport
  accommodationType: string[];
  transportPreferences: {
    flightClass: string;
    preferDirectFlights: boolean;
    needRentalCar: boolean;
  };
  
  // Additional Preferences
  dietaryRestrictions: string[];
  accessibility: string[];
  tripPurpose: string;
}

const TRAVEL_STYLES = [
  { id: "adventure", label: "Adventure", icon: "🏔️" },
  { id: "relaxation", label: "Relaxation", icon: "🏖️" },
  { id: "cultural", label: "Cultural", icon: "🏛️" },
  { id: "romantic", label: "Romantic", icon: "💕" },
  { id: "family", label: "Family-friendly", icon: "👨‍👩‍👧‍👦" },
  { id: "business", label: "Business", icon: "💼" },
];

const INTERESTS = [
  { id: "museums", label: "Museums & Art", icon: "🎨" },
  { id: "nature", label: "Nature & Wildlife", icon: "🌿" },
  { id: "nightlife", label: "Nightlife", icon: "🌃" },
  { id: "shopping", label: "Shopping", icon: "🛍️" },
  { id: "food", label: "Food & Cuisine", icon: "🍽️" },
  { id: "photography", label: "Photography", icon: "📸" },
  { id: "history", label: "History", icon: "📚" },
  { id: "beach", label: "Beach & Water", icon: "🏄" },
];

const ACCOMMODATION_TYPES = [
  { id: "hotel", label: "Hotels" },
  { id: "hostel", label: "Hostels" },
  { id: "airbnb", label: "Airbnb" },
  { id: "resort", label: "Resorts" },
  { id: "boutique", label: "Boutique Hotels" },
];

export default function ItineraryForm({ onSubmit }: ItineraryFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ExtendedFormData>({
    origin: "",
    destination: "",
    days: 1,
    dates: "",
    minBudget: 100,
    maxBudget: 1000,
    travelStyle: [],
    pace: "moderate",
    interests: [],
    adults: 1,
    children: 0,
    infants: 0,
    accommodationType: ["hotel"],
    transportPreferences: {
      flightClass: "economy",
      preferDirectFlights: false,
      needRentalCar: false,
    },
    dietaryRestrictions: [],
    accessibility: [],
    tripPurpose: "vacation",
  });

  const totalSteps = 4;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof ExtendedFormData] as any,
          [child]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value
      }));
    }
  };

  const handleArrayToggle = (field: keyof ExtendedFormData, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.origin || !formData.destination) {
          alert("Please fill in both origin and destination");
          return false;
        }
        if (formData.days < 1 || formData.days > 30) {
          alert("Number of days must be between 1 and 30");
          return false;
        }
        if (formData.minBudget > formData.maxBudget) {
          alert("Minimum budget cannot be greater than maximum budget");
          return false;
        }
        return true;
      case 2:
        if (formData.travelStyle.length === 0) {
          alert("Please select at least one travel style");
          return false;
        }
        return true;
      case 3:
        if (formData.accommodationType.length === 0) {
          alert("Please select at least one accommodation type");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps && validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`w-full h-1 mx-2 transition-all duration-300 ${
                    step < currentStep ? "bg-blue-600" : "bg-gray-200"
                  }`}
                  style={{ width: "60px" }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm">
          <span className={currentStep >= 1 ? "text-blue-600 font-medium" : "text-gray-500"}>
            Basic Info
          </span>
          <span className={currentStep >= 2 ? "text-blue-600 font-medium" : "text-gray-500"}>
            Preferences
          </span>
          <span className={currentStep >= 3 ? "text-blue-600 font-medium" : "text-gray-500"}>
            Group & Stay
          </span>
          <span className={currentStep >= 4 ? "text-blue-600 font-medium" : "text-gray-500"}>
            Review
          </span>
        </div>
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Where are you traveling?</h2>
      
      <div>
        <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
          Origin Place *
        </label>
        <input
          type="text"
          id="origin"
          name="origin"
          value={formData.origin}
          onChange={handleInputChange}
          required
          placeholder="e.g., New York, USA"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div>
        <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
          Destination *
        </label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleInputChange}
          required
          placeholder="e.g., Paris, France"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div>
        <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-2">
          Number of Days *
        </label>
        <input
          type="number"
          id="days"
          name="days"
          value={formData.days}
          onChange={handleInputChange}
          required
          min="1"
          max="30"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div>
        <label htmlFor="dates" className="block text-sm font-medium text-gray-700 mb-2">
          Preferable Dates/Months (Optional)
        </label>
        <input
          type="text"
          id="dates"
          name="dates"
          value={formData.dates}
          onChange={handleInputChange}
          placeholder="e.g., June 2024 or 15-20 June 2024"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="minBudget" className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Budget ($) *
          </label>
          <input
            type="number"
            id="minBudget"
            name="minBudget"
            value={formData.minBudget}
            onChange={handleInputChange}
            required
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <div>
          <label htmlFor="maxBudget" className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Budget ($) *
          </label>
          <input
            type="number"
            id="maxBudget"
            name="maxBudget"
            value={formData.maxBudget}
            onChange={handleInputChange}
            required
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">What's your travel style?</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Travel Style (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TRAVEL_STYLES.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => handleArrayToggle("travelStyle", style.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                formData.travelStyle.includes(style.id)
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="text-2xl mb-1">{style.icon}</div>
              <div className="text-sm font-medium">{style.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="pace" className="block text-sm font-medium text-gray-700 mb-2">
          Travel Pace
        </label>
        <select
          id="pace"
          name="pace"
          value={formData.pace}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="relaxed">Relaxed - Plenty of free time</option>
          <option value="moderate">Moderate - Balanced schedule</option>
          <option value="fast">Fast-paced - Pack in everything</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Interests (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {INTERESTS.map((interest) => (
            <button
              key={interest.id}
              type="button"
              onClick={() => handleArrayToggle("interests", interest.id)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                formData.interests.includes(interest.id)
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="text-xl mb-1">{interest.icon}</div>
              <div className="text-xs font-medium">{interest.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="tripPurpose" className="block text-sm font-medium text-gray-700 mb-2">
          Purpose of Trip
        </label>
        <select
          id="tripPurpose"
          name="tripPurpose"
          value={formData.tripPurpose}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="vacation">Vacation</option>
          <option value="honeymoon">Honeymoon</option>
          <option value="business">Business</option>
          <option value="family">Family Trip</option>
          <option value="solo">Solo Adventure</option>
          <option value="friends">Friends Getaway</option>
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Who's traveling & where to stay?</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Number of Travelers
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="adults" className="block text-xs text-gray-600 mb-1">
              Adults (18+)
            </label>
            <input
              type="number"
              id="adults"
              name="adults"
              value={formData.adults}
              onChange={handleInputChange}
              min="1"
              max="20"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="children" className="block text-xs text-gray-600 mb-1">
              Children (2-17)
            </label>
            <input
              type="number"
              id="children"
              name="children"
              value={formData.children}
              onChange={handleInputChange}
              min="0"
              max="10"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div>
            <label htmlFor="infants" className="block text-xs text-gray-600 mb-1">
              Infants (0-2)
            </label>
            <input
              type="number"
              id="infants"
              name="infants"
              value={formData.infants}
              onChange={handleInputChange}
              min="0"
              max="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Accommodation Type (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ACCOMMODATION_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleArrayToggle("accommodationType", type.id)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                formData.accommodationType.includes(type.id)
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="text-sm font-medium">{type.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Transportation Preferences
        </label>
        <div className="space-y-3">
          <div>
            <label htmlFor="flightClass" className="block text-xs text-gray-600 mb-1">
              Flight Class
            </label>
            <select
              id="flightClass"
              name="transportPreferences.flightClass"
              value={formData.transportPreferences.flightClass}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="economy">Economy</option>
              <option value="premium">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="preferDirectFlights"
              name="transportPreferences.preferDirectFlights"
              checked={formData.transportPreferences.preferDirectFlights}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="preferDirectFlights" className="ml-2 text-sm text-gray-700">
              Prefer direct flights (may increase cost)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="needRentalCar"
              name="transportPreferences.needRentalCar"
              checked={formData.transportPreferences.needRentalCar}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="needRentalCar" className="ml-2 text-sm text-gray-700">
              Need rental car at destination
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Review your trip details</h2>
      
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">From</p>
            <p className="font-medium text-gray-900">{formData.origin || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">To</p>
            <p className="font-medium text-gray-900">{formData.destination || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-medium text-gray-900">{formData.days} days</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Budget</p>
            <p className="font-medium text-gray-900">${formData.minBudget} - ${formData.maxBudget}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Travelers</p>
            <p className="font-medium text-gray-900">
              {formData.adults} adults
              {formData.children > 0 && `, ${formData.children} children`}
              {formData.infants > 0 && `, ${formData.infants} infants`}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Trip Purpose</p>
            <p className="font-medium text-gray-900 capitalize">{formData.tripPurpose}</p>
          </div>
        </div>
        
        {formData.travelStyle.length > 0 && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Travel Style</p>
            <div className="flex flex-wrap gap-2">
              {formData.travelStyle.map(style => (
                <span key={style} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full capitalize">
                  {style}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {formData.interests.length > 0 && (
          <div>
            <p className="text-sm text-gray-600 mb-2">Interests</p>
            <div className="flex flex-wrap gap-2">
              {formData.interests.map(interest => (
                <span key={interest} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full capitalize">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Ready to generate your itinerary!</span> Our AI will create a personalized travel plan based on your preferences.
        </p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      {renderProgressBar()}
      
      <form onSubmit={handleSubmit}>
        {renderCurrentStep()}
        
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Back
            </button>
          )}
          
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="ml-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              Generate My Itinerary
            </button>
          )}
        </div>
      </form>
    </div>
  );
}