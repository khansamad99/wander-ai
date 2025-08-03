// API client configuration for WanderAI backend integration
import { resolveAirportCode, resolveAirportCodeWithAI } from './airport-codes';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// API endpoints
export const API_ENDPOINTS = {
  FLIGHTS_SEARCH: `${API_BASE_URL}/api/v1/flights/search`,
  HOTELS_SEARCH: `${API_BASE_URL}/api/v1/hotels/search`,
  ITINERARY_GENERATE: `${API_BASE_URL}/api/v1/itinerary/generate`,
  ITINERARY_COMPLETE: `${API_BASE_URL}/api/v1/itinerary/complete`,
  
  // Legacy endpoints (backwards compatibility)
  LEGACY_FLIGHTS: `${API_BASE_URL}/search_flights/`,
  LEGACY_HOTELS: `${API_BASE_URL}/search_hotels/`,
  LEGACY_COMPLETE: `${API_BASE_URL}/complete_search/`,
  LEGACY_ITINERARY: `${API_BASE_URL}/generate_itinerary/`,
} as const;

// Types for API requests and responses
export interface FlightRequest {
  origin: string;
  destination: string;
  outbound_date: string;
  return_date: string;
}

export interface HotelRequest {
  location: string;
  check_in_date: string;
  check_out_date: string;
}

export interface CompleteSearchRequest {
  flight_request: FlightRequest;
  hotel_request?: HotelRequest;
}

export interface FlightInfo {
  airline: string;
  price: string;
  duration: string;
  stops: string;
  departure: string;
  arrival: string;
  travel_class: string;
  return_date: string;
  airline_logo: string;
}

export interface HotelInfo {
  name: string;
  price: string;
  rating: number;
  location: string;
  link: string;
}

export interface AIResponse {
  flights: FlightInfo[];
  hotels: HotelInfo[];
  ai_flight_recommendation: string;
  ai_hotel_recommendation: string;
  itinerary: string;
}

// API client class
class APIClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // Search for flights with AI recommendations
  async searchFlights(flightRequest: FlightRequest): Promise<AIResponse> {
    return this.request<AIResponse>(API_ENDPOINTS.FLIGHTS_SEARCH, {
      method: 'POST',
      body: JSON.stringify(flightRequest),
    });
  }

  // Search for hotels with AI recommendations
  async searchHotels(hotelRequest: HotelRequest): Promise<AIResponse> {
    return this.request<AIResponse>(API_ENDPOINTS.HOTELS_SEARCH, {
      method: 'POST',
      body: JSON.stringify(hotelRequest),
    });
  }

  // Complete travel search (flights + hotels + itinerary) with airport code resolution
  async completeSearch(completeRequest: CompleteSearchRequest): Promise<AIResponse> {
    // Resolve airport codes before sending request
    const resolvedRequest = {
      ...completeRequest,
      flight_request: {
        ...completeRequest.flight_request,
        origin: await this.resolveAirportCode(completeRequest.flight_request.origin),
        destination: await this.resolveAirportCode(completeRequest.flight_request.destination),
      }
    };

    return this.request<AIResponse>(API_ENDPOINTS.ITINERARY_COMPLETE, {
      method: 'POST',
      body: JSON.stringify(resolvedRequest),
    });
  }

  // Helper method to resolve airport codes
  private async resolveAirportCode(input: string): Promise<string> {
    try {
      // First try the mapping table
      const mappedCode = resolveAirportCode(input);
      if (mappedCode.length === 3 && /^[A-Z]{3}$/.test(mappedCode)) {
        return mappedCode;
      }

      // Fall back to AI resolution
      const aiResolvedCode = await resolveAirportCodeWithAI(input);
      return aiResolvedCode;
    } catch (error) {
      console.warn(`Could not resolve airport code for "${input}":`, error);
      // Return a fallback - use input if it's 3 chars, otherwise default
      return input.length === 3 ? input.toUpperCase() : 'JFK';
    }
  }

  // Generate itinerary from provided data
  async generateItinerary(itineraryRequest: {
    destination: string;
    check_in_date: string;
    check_out_date: string;
    flights: string;
    hotels: string;
  }): Promise<AIResponse> {
    return this.request<AIResponse>(API_ENDPOINTS.ITINERARY_GENERATE, {
      method: 'POST',
      body: JSON.stringify(itineraryRequest),
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; service: string; version: string }> {
    return this.request(`${this.baseURL}/health`);
  }
}

// Export singleton API client instance
export const apiClient = new APIClient();

// Utility functions for date formatting
export const formatDateForAPI = (date: Date): string => {
  // Check if date is valid
  if (!date || isNaN(date.getTime())) {
    console.error('Invalid date passed to formatDateForAPI:', date);
    // Return today's date as fallback
    return new Date().toISOString().split('T')[0];
  }
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

export const addDaysToDate = (date: Date, days: number): Date => {
  // Check if input date is valid
  if (!date || isNaN(date.getTime())) {
    console.error('Invalid date passed to addDaysToDate:', date);
    date = new Date(); // Use current date as fallback
  }
  
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  
  // Check if result date is valid
  if (isNaN(result.getTime())) {
    console.error('Invalid result from addDaysToDate:', result);
    return new Date(); // Return current date as fallback
  }
  
  return result;
};

// Error handling helper
export const handleAPIError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};