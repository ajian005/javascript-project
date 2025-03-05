// Test harness
function runTests() {
    /**
     * Asserts that the actual value equals the expected value, logging the result.
     * @param {string} testName - Name of the test.
     * @param {any} actual - Actual value.
     * @param {any} expected - Expected value.
     */
    const assert = (testName, actual, expected) => {
      const pass = actual === expected;
      console.log(`${testName}: ${pass ? 'PASS' : 'FAIL'}`);
      if (!pass) {
        console.log(`  Expected: ${expected}`);
        console.log(`  Actual: ${actual}`);
      }
    };
  
    // Test Example Sequence 1
    console.log('Running Example Sequence 1');
    let segments = new IntensitySegments();
    assert('Initial state', segments.toString(), '[]');
    segments.add(10, 30, 1);
    assert('After add(10, 30, 1)', segments.toString(), '[[10,1],[30,0]]');
    segments.add(20, 40, 1);
    assert('After add(20, 40, 1)', segments.toString(), '[[10,1],[20,2],[30,1],[40,0]]');
    segments.add(10, 40, -2);
    assert('After add(10, 40, -2)', segments.toString(), '[[10,-1],[20,0],[30,-1],[40,0]]');
  
    // Test Example Sequence 2
    console.log('\nRunning Example Sequence 2');
    segments = new IntensitySegments();
    assert('Initial state', segments.toString(), '[]');
    segments.add(10, 30, 1);
    assert('After add(10, 30, 1)', segments.toString(), '[[10,1],[30,0]]');
    segments.add(20, 40, 1);
    assert('After add(20, 40, 1)', segments.toString(), '[[10,1],[20,2],[30,1],[40,0]]');
    segments.add(10, 40, -1);
    assert('After add(10, 40, -1)', segments.toString(), '[[20,1],[30,0]]');
    segments.add(10, 40, -1);
    assert('After add(10, 40, -1)', segments.toString(), '[[10,-1],[20,0],[30,-1],[40,0]]');
  
    // Additional Test Cases
    console.log('\nRunning Additional Test Cases');
    segments = new IntensitySegments();
  
    // Test empty range (should throw error)
    try {
      segments.add(10, 10, 1);
      console.log('Test empty range: FAIL (did not throw)');
    } catch (e) {
      console.log('Test empty range: PASS (threw error)');
    }
  
    // Test negative numbers
    segments = new IntensitySegments();
    segments.add(-10, 0, 2);
    assert('Add negative range', segments.toString(), '[[-10,2],[0,0]]');
  
    // Test set operation
    segments = new IntensitySegments();
    segments.add(10, 30, 1);
    segments.set(15, 25, 3);
    assert('Set within range', segments.toString(), '[[10,1],[15,3],[25,1],[30,0]]');
  
    // Test zero amount
    segments = new IntensitySegments();
    segments.add(10, 20, 0);
    assert('Add zero amount', segments.toString(), '[]');
    segments.set(10, 20, 0);
    assert('Set zero amount', segments.toString(), '[[10,0]]');
  }
  
  // Run the tests
  runTests();