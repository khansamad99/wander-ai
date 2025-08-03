// Airport codes mapping and resolution utilities

export interface AirportInfo {
  code: string;
  city: string;
  country: string;
  name: string;
}

// Comprehensive airport code mapping for major cities
export const AIRPORT_MAPPING: Record<string, AirportInfo> = {
  // Major US Cities
  'NEW YORK': { code: 'JFK', city: 'New York', country: 'USA', name: 'John F. Kennedy International Airport' },
  'NYC': { code: 'JFK', city: 'New York', country: 'USA', name: 'John F. Kennedy International Airport' },
  'MANHATTAN': { code: 'LGA', city: 'New York', country: 'USA', name: 'LaGuardia Airport' },
  'LOS ANGELES': { code: 'LAX', city: 'Los Angeles', country: 'USA', name: 'Los Angeles International Airport' },
  'LA': { code: 'LAX', city: 'Los Angeles', country: 'USA', name: 'Los Angeles International Airport' },
  'CHICAGO': { code: 'ORD', city: 'Chicago', country: 'USA', name: "O'Hare International Airport" },
  'MIAMI': { code: 'MIA', city: 'Miami', country: 'USA', name: 'Miami International Airport' },
  'SAN FRANCISCO': { code: 'SFO', city: 'San Francisco', country: 'USA', name: 'San Francisco International Airport' },
  'SF': { code: 'SFO', city: 'San Francisco', country: 'USA', name: 'San Francisco International Airport' },
  'SEATTLE': { code: 'SEA', city: 'Seattle', country: 'USA', name: 'Seattle-Tacoma International Airport' },
  'ATLANTA': { code: 'ATL', city: 'Atlanta', country: 'USA', name: 'Hartsfield-Jackson Atlanta International Airport' },
  'BOSTON': { code: 'BOS', city: 'Boston', country: 'USA', name: 'Logan International Airport' },
  'WASHINGTON': { code: 'DCA', city: 'Washington D.C.', country: 'USA', name: 'Ronald Reagan Washington National Airport' },
  'DC': { code: 'DCA', city: 'Washington D.C.', country: 'USA', name: 'Ronald Reagan Washington National Airport' },
  'DALLAS': { code: 'DFW', city: 'Dallas', country: 'USA', name: 'Dallas/Fort Worth International Airport' },
  'HOUSTON': { code: 'IAH', city: 'Houston', country: 'USA', name: 'George Bush Intercontinental Airport' },
  'PHOENIX': { code: 'PHX', city: 'Phoenix', country: 'USA', name: 'Phoenix Sky Harbor International Airport' },
  'DENVER': { code: 'DEN', city: 'Denver', country: 'USA', name: 'Denver International Airport' },
  'LAS VEGAS': { code: 'LAS', city: 'Las Vegas', country: 'USA', name: 'McCarran International Airport' },
  'VEGAS': { code: 'LAS', city: 'Las Vegas', country: 'USA', name: 'McCarran International Airport' },

  // Major European Cities
  'LONDON': { code: 'LHR', city: 'London', country: 'UK', name: 'Heathrow Airport' },
  'PARIS': { code: 'CDG', city: 'Paris', country: 'France', name: 'Charles de Gaulle Airport' },
  'MADRID': { code: 'MAD', city: 'Madrid', country: 'Spain', name: 'Adolfo Suárez Madrid–Barajas Airport' },
  'ROME': { code: 'FCO', city: 'Rome', country: 'Italy', name: 'Leonardo da Vinci International Airport' },
  'BARCELONA': { code: 'BCN', city: 'Barcelona', country: 'Spain', name: 'Barcelona–El Prat Airport' },
  'AMSTERDAM': { code: 'AMS', city: 'Amsterdam', country: 'Netherlands', name: 'Amsterdam Airport Schiphol' },
  'BERLIN': { code: 'BER', city: 'Berlin', country: 'Germany', name: 'Berlin Brandenburg Airport' },
  'MUNICH': { code: 'MUC', city: 'Munich', country: 'Germany', name: 'Munich Airport' },
  'FRANKFURT': { code: 'FRA', city: 'Frankfurt', country: 'Germany', name: 'Frankfurt Airport' },
  'ZURICH': { code: 'ZUR', city: 'Zurich', country: 'Switzerland', name: 'Zurich Airport' },
  'VIENNA': { code: 'VIE', city: 'Vienna', country: 'Austria', name: 'Vienna International Airport' },
  'COPENHAGEN': { code: 'CPH', city: 'Copenhagen', country: 'Denmark', name: 'Copenhagen Airport' },
  'STOCKHOLM': { code: 'ARN', city: 'Stockholm', country: 'Sweden', name: 'Stockholm Arlanda Airport' },
  'OSLO': { code: 'OSL', city: 'Oslo', country: 'Norway', name: 'Oslo Airport' },

  // Major Asian Cities
  'TOKYO': { code: 'NRT', city: 'Tokyo', country: 'Japan', name: 'Narita International Airport' },
  'BEIJING': { code: 'PEK', city: 'Beijing', country: 'China', name: 'Beijing Capital International Airport' },
  'SHANGHAI': { code: 'PVG', city: 'Shanghai', country: 'China', name: 'Shanghai Pudong International Airport' },
  'HONG KONG': { code: 'HKG', city: 'Hong Kong', country: 'Hong Kong', name: 'Hong Kong International Airport' },
  'SINGAPORE': { code: 'SIN', city: 'Singapore', country: 'Singapore', name: 'Singapore Changi Airport' },
  'SEOUL': { code: 'ICN', city: 'Seoul', country: 'South Korea', name: 'Incheon International Airport' },
  'BANGKOK': { code: 'BKK', city: 'Bangkok', country: 'Thailand', name: 'Suvarnabhumi Airport' },
  'MUMBAI': { code: 'BOM', city: 'Mumbai', country: 'India', name: 'Chhatrapati Shivaji Maharaj International Airport' },
  'DELHI': { code: 'DEL', city: 'Delhi', country: 'India', name: 'Indira Gandhi International Airport' },
  'BANGALORE': { code: 'BLR', city: 'Bangalore', country: 'India', name: 'Kempegowda International Airport' },
  'CHENNAI': { code: 'MAA', city: 'Chennai', country: 'India', name: 'Chennai International Airport' },
  'KOLKATA': { code: 'CCU', city: 'Kolkata', country: 'India', name: 'Netaji Subhas Chandra Bose International Airport' },
  'HYDERABAD': { code: 'HYD', city: 'Hyderabad', country: 'India', name: 'Rajiv Gandhi International Airport' },

  // Major Middle Eastern Cities
  'DUBAI': { code: 'DXB', city: 'Dubai', country: 'UAE', name: 'Dubai International Airport' },
  'DOHA': { code: 'DOH', city: 'Doha', country: 'Qatar', name: 'Hamad International Airport' },
  'RIYADH': { code: 'RUH', city: 'Riyadh', country: 'Saudi Arabia', name: 'King Khalid International Airport' },
  'TEL AVIV': { code: 'TLV', city: 'Tel Aviv', country: 'Israel', name: 'Ben Gurion Airport' },
  'ISTANBUL': { code: 'IST', city: 'Istanbul', country: 'Turkey', name: 'Istanbul Airport' },

  // Major African Cities
  'CAIRO': { code: 'CAI', city: 'Cairo', country: 'Egypt', name: 'Cairo International Airport' },
  'JOHANNESBURG': { code: 'JNB', city: 'Johannesburg', country: 'South Africa', name: 'O.R. Tambo International Airport' },
  'CAPE TOWN': { code: 'CPT', city: 'Cape Town', country: 'South Africa', name: 'Cape Town International Airport' },

  // Major Australian/Oceanian Cities
  'SYDNEY': { code: 'SYD', city: 'Sydney', country: 'Australia', name: 'Kingsford Smith Airport' },
  'MELBOURNE': { code: 'MEL', city: 'Melbourne', country: 'Australia', name: 'Melbourne Airport' },
  'BRISBANE': { code: 'BNE', city: 'Brisbane', country: 'Australia', name: 'Brisbane Airport' },
  'PERTH': { code: 'PER', city: 'Perth', country: 'Australia', name: 'Perth Airport' },
  'AUCKLAND': { code: 'AKL', city: 'Auckland', country: 'New Zealand', name: 'Auckland Airport' },

  // Major South American Cities
  'SAO PAULO': { code: 'GRU', city: 'São Paulo', country: 'Brazil', name: 'São Paulo/Guarulhos International Airport' },
  'RIO DE JANEIRO': { code: 'GIG', city: 'Rio de Janeiro', country: 'Brazil', name: 'Rio de Janeiro/Galeão International Airport' },
  'RIO': { code: 'GIG', city: 'Rio de Janeiro', country: 'Brazil', name: 'Rio de Janeiro/Galeão International Airport' },
  'BUENOS AIRES': { code: 'EZE', city: 'Buenos Aires', country: 'Argentina', name: 'Ezeiza International Airport' },
  'LIMA': { code: 'LIM', city: 'Lima', country: 'Peru', name: 'Jorge Chávez International Airport' },
  'BOGOTA': { code: 'BOG', city: 'Bogotá', country: 'Colombia', name: 'El Dorado International Airport' },

  // Major Canadian Cities
  'TORONTO': { code: 'YYZ', city: 'Toronto', country: 'Canada', name: 'Toronto Pearson International Airport' },
  'VANCOUVER': { code: 'YVR', city: 'Vancouver', country: 'Canada', name: 'Vancouver International Airport' },
  'MONTREAL': { code: 'YUL', city: 'Montreal', country: 'Canada', name: 'Montréal-Pierre Elliott Trudeau International Airport' },
  'CALGARY': { code: 'YYC', city: 'Calgary', country: 'Canada', name: 'Calgary International Airport' },
};

/**
 * Resolves a city name or airport code to a valid 3-letter IATA code
 */
export function resolveAirportCode(input: string): string {
  if (!input) return '';
  
  const normalizedInput = input.trim().toUpperCase();
  
  // If it's already a 3-letter code, return as-is
  if (/^[A-Z]{3}$/.test(normalizedInput)) {
    return normalizedInput;
  }
  
  // Look up in our mapping
  if (AIRPORT_MAPPING[normalizedInput]) {
    return AIRPORT_MAPPING[normalizedInput].code;
  }
  
  // Try partial matches (e.g., "New" for "New York")
  for (const [key, value] of Object.entries(AIRPORT_MAPPING)) {
    if (key.includes(normalizedInput) || normalizedInput.includes(key)) {
      return value.code;
    }
  }
  
  // If no match found, return the input (will be handled by AI fallback)
  return normalizedInput;
}

/**
 * Gets airport information for a given code or city name
 */
export function getAirportInfo(input: string): AirportInfo | null {
  const normalizedInput = input.trim().toUpperCase();
  
  // Direct lookup
  if (AIRPORT_MAPPING[normalizedInput]) {
    return AIRPORT_MAPPING[normalizedInput];
  }
  
  // Search by code
  for (const value of Object.values(AIRPORT_MAPPING)) {
    if (value.code === normalizedInput) {
      return value;
    }
  }
  
  return null;
}

/**
 * Validates if an input can be resolved to a valid airport code
 */
export function isValidAirportInput(input: string): boolean {
  const resolved = resolveAirportCode(input);
  return resolved.length === 3 && /^[A-Z]{3}$/.test(resolved);
}

/**
 * Gets suggestions for airport codes based on partial input
 */
export function getAirportSuggestions(input: string, limit: number = 5): AirportInfo[] {
  if (!input || input.length < 2) return [];
  
  const normalizedInput = input.trim().toUpperCase();
  const suggestions: AirportInfo[] = [];
  
  // Exact matches first
  for (const [key, value] of Object.entries(AIRPORT_MAPPING)) {
    if (key.startsWith(normalizedInput) || value.code.startsWith(normalizedInput)) {
      suggestions.push(value);
    }
  }
  
  // Partial matches
  if (suggestions.length < limit) {
    for (const [key, value] of Object.entries(AIRPORT_MAPPING)) {
      if (!suggestions.includes(value) && 
          (key.includes(normalizedInput) || value.city.toUpperCase().includes(normalizedInput))) {
        suggestions.push(value);
      }
      if (suggestions.length >= limit) break;
    }
  }
  
  return suggestions.slice(0, limit);
}

/**
 * AI-based airport code resolution using a simple heuristic approach
 * This can be enhanced with actual AI API calls in the future
 */
export async function resolveAirportCodeWithAI(cityName: string): Promise<string> {
  const normalized = cityName.trim().toUpperCase();
  
  // Try our mapping first
  const mappedCode = resolveAirportCode(normalized);
  if (mappedCode.length === 3) {
    return mappedCode;
  }
  
  // Simple heuristic fallbacks for common patterns
  const heuristics: Record<string, string> = {
    // Common abbreviations
    'NYC': 'JFK',
    'LA': 'LAX',
    'SF': 'SFO',
    'DC': 'DCA',
    'CHI': 'ORD',
    'MIA': 'MIA',
    'BOS': 'BOS',
    'SEA': 'SEA',
    'DEN': 'DEN',
    'PHX': 'PHX',
    
    // International common names
    'LONDON': 'LHR',
    'PARIS': 'CDG',
    'TOKYO': 'NRT',
    'SYDNEY': 'SYD',
    'TORONTO': 'YYZ',
    'DUBAI': 'DXB',
    'SINGAPORE': 'SIN',
    'HONG KONG': 'HKG',
    'MUMBAI': 'BOM',
    'DELHI': 'DEL',
    'BANGALORE': 'BLR',
    'CHENNAI': 'MAA',
    'HYDERABAD': 'HYD',
    'KOLKATA': 'CCU',
  };
  
  if (heuristics[normalized]) {
    return heuristics[normalized];
  }
  
  // If all else fails, generate a reasonable fallback
  // This could be enhanced with actual AI API calls
  console.warn(`Could not resolve airport code for: ${cityName}, using fallback`);
  
  // Use major hub airports as fallbacks based on common city patterns
  if (normalized.includes('NEW YORK') || normalized.includes('MANHATTAN')) return 'JFK';
  if (normalized.includes('LOS ANGELES') || normalized.includes('HOLLYWOOD')) return 'LAX';
  if (normalized.includes('SAN FRANCISCO') || normalized.includes('SILICON')) return 'SFO';
  if (normalized.includes('CHICAGO') || normalized.includes('ILLINOIS')) return 'ORD';
  if (normalized.includes('MIAMI') || normalized.includes('FLORIDA')) return 'MIA';
  if (normalized.includes('LONDON') || normalized.includes('UK')) return 'LHR';
  if (normalized.includes('PARIS') || normalized.includes('FRANCE')) return 'CDG';
  if (normalized.includes('TOKYO') || normalized.includes('JAPAN')) return 'NRT';
  if (normalized.includes('DELHI') || normalized.includes('NEW DELHI')) return 'DEL';
  if (normalized.includes('MUMBAI') || normalized.includes('BOMBAY')) return 'BOM';
  
  // Final fallback - return a major hub
  return 'JFK'; // Default to JFK as a major international hub
}