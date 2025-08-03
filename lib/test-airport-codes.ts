// Test airport code resolution functionality

import { resolveAirportCode, resolveAirportCodeWithAI, getAirportSuggestions, isValidAirportInput } from './airport-codes';

export interface TestCase {
  input: string;
  expectedCode: string;
  description: string;
}

export const TEST_CASES: TestCase[] = [
  // Major Indian cities (the original problem)
  { input: 'Delhi', expectedCode: 'DEL', description: 'Delhi to DEL' },
  { input: 'DELHI', expectedCode: 'DEL', description: 'DELHI (uppercase) to DEL' },
  { input: 'Mumbai', expectedCode: 'BOM', description: 'Mumbai to BOM' },
  { input: 'Bangalore', expectedCode: 'BLR', description: 'Bangalore to BLR' },
  { input: 'Chennai', expectedCode: 'MAA', description: 'Chennai to MAA' },
  { input: 'Hyderabad', expectedCode: 'HYD', description: 'Hyderabad to HYD' },
  { input: 'Kolkata', expectedCode: 'CCU', description: 'Kolkata to CCU' },

  // Major international cities
  { input: 'Paris', expectedCode: 'CDG', description: 'Paris to CDG' },
  { input: 'PARIS', expectedCode: 'CDG', description: 'PARIS (uppercase) to CDG' },
  { input: 'London', expectedCode: 'LHR', description: 'London to LHR' },
  { input: 'New York', expectedCode: 'JFK', description: 'New York to JFK' },
  { input: 'Los Angeles', expectedCode: 'LAX', description: 'Los Angeles to LAX' },
  { input: 'Tokyo', expectedCode: 'NRT', description: 'Tokyo to NRT' },
  { input: 'Singapore', expectedCode: 'SIN', description: 'Singapore to SIN' },
  { input: 'Dubai', expectedCode: 'DXB', description: 'Dubai to DXB' },

  // Common abbreviations
  { input: 'NYC', expectedCode: 'JFK', description: 'NYC to JFK' },
  { input: 'LA', expectedCode: 'LAX', description: 'LA to LAX' },
  { input: 'SF', expectedCode: 'SFO', description: 'SF to SFO' },

  // Already valid airport codes
  { input: 'ATL', expectedCode: 'ATL', description: 'ATL should remain ATL' },
  { input: 'LAX', expectedCode: 'LAX', description: 'LAX should remain LAX' },
  { input: 'DEL', expectedCode: 'DEL', description: 'DEL should remain DEL' },
  { input: 'CDG', expectedCode: 'CDG', description: 'CDG should remain CDG' },

  // Mixed case
  { input: 'paris', expectedCode: 'CDG', description: 'paris (lowercase) to CDG' },
  { input: 'New york', expectedCode: 'JFK', description: 'New york (mixed case) to JFK' },
  { input: 'los angeles', expectedCode: 'LAX', description: 'los angeles (lowercase) to LAX' },
];

export async function runAirportCodeTests(): Promise<{
  passed: number;
  failed: number;
  results: Array<{ test: TestCase; actual: string; passed: boolean; aiResolved?: string }>
}> {
  console.log('🧪 Running Airport Code Resolution Tests...\n');
  
  const results = [];
  let passed = 0;
  let failed = 0;

  for (const testCase of TEST_CASES) {
    try {
      // Test regular resolution
      const actualCode = resolveAirportCode(testCase.input);
      const testPassed = actualCode === testCase.expectedCode;
      
      if (testPassed) {
        passed++;
        console.log(`✅ ${testCase.description}: ${testCase.input} → ${actualCode}`);
      } else {
        // Try AI resolution as fallback
        const aiResolvedCode = await resolveAirportCodeWithAI(testCase.input);
        const aiTestPassed = aiResolvedCode === testCase.expectedCode;
        
        if (aiTestPassed) {
          passed++;
          console.log(`✅ ${testCase.description}: ${testCase.input} → ${aiResolvedCode} (via AI)`);
          results.push({
            test: testCase,
            actual: actualCode,
            passed: true,
            aiResolved: aiResolvedCode
          });
        } else {
          failed++;
          console.log(`❌ ${testCase.description}: ${testCase.input} → ${actualCode} (expected ${testCase.expectedCode})`);
          results.push({
            test: testCase,
            actual: actualCode,
            passed: false,
            aiResolved: aiResolvedCode
          });
        }
        continue;
      }
      
      results.push({
        test: testCase,
        actual: actualCode,
        passed: testPassed
      });
      
    } catch (error) {
      failed++;
      console.log(`❌ ${testCase.description}: Error - ${error}`);
      results.push({
        test: testCase,
        actual: 'ERROR',
        passed: false
      });
    }
  }

  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
  console.log(`Success Rate: ${Math.round((passed / TEST_CASES.length) * 100)}%`);

  return { passed, failed, results };
}

export function testAirportSuggestions(input: string = 'Del'): void {
  console.log(`\n🔍 Testing airport suggestions for: "${input}"`);
  const suggestions = getAirportSuggestions(input, 5);
  
  console.log(`Found ${suggestions.length} suggestions:`);
  suggestions.forEach((airport, index) => {
    console.log(`  ${index + 1}. ${airport.city} (${airport.code}) - ${airport.name}`);
  });
}

export function testValidation(): void {
  console.log('\n✅ Testing input validation...');
  
  const testInputs = ['Delhi', 'PARIS', 'ATL', 'Invalid City', 'NYC', 'random text'];
  
  testInputs.forEach(input => {
    const isValid = isValidAirportInput(input);
    const resolved = resolveAirportCode(input);
    console.log(`"${input}" → ${resolved} (valid: ${isValid})`);
  });
}

// Browser console helper
if (typeof window !== 'undefined') {
  (window as any).testAirportCodes = runAirportCodeTests;
  (window as any).testAirportSuggestions = testAirportSuggestions;
  (window as any).testAirportValidation = testValidation;
  
  console.log(`
🎯 Airport Code Testing Available:
- testAirportCodes() - Run full test suite
- testAirportSuggestions('Delhi') - Test suggestions
- testAirportValidation() - Test validation
  `);
}