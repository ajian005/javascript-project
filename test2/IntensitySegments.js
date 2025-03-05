/**
 * A class to manage intensity values over segments, starting at 0 everywhere.
 * Supports adding or setting intensity over specific ranges and generating a string representation.
 */
export class IntensitySegments {
    /**
     * Stores points and their corresponding intensity values starting at those points.
     * @private
     */
    #segments = new Map();
  
    /**
     * Increases the intensity by the specified amount in the range [from, to).
     * @param {number} from - The start of the range (inclusive).
     * @param {number} to - The end of the range (exclusive).
     * @param {number} amount - The amount to add to the intensity.
     * @throws {Error} If from is greater than or equal to to.
     */
    add(from, to, amount) {
      if (from >= to) {
        throw new Error('Invalid range: "from" must be less than "to"');
      }
  
      // Insert 'from' if not present, initializing with previous intensity
      if (!this.#segments.has(from)) {
        this.#segments.set(from, this.#getPrevIntensity(from));
      }
  
      // Insert 'to' if not present, preserving the intensity before 'to'
      if (!this.#segments.has(to)) {
        this.#segments.set(to, this.#getPrevIntensity(to));
      }
  
      // Add amount to all points in [from, to)
      for (const [point, value] of this.#segments) {
        if (point >= from && point < to) {
          this.#segments.set(point, value + amount);
        }
      }
    }
  
    /**
     * Sets the intensity to the specified amount in the range [from, to).
     * @param {number} from - The start of the range (inclusive).
     * @param {number} to - The end of the range (exclusive).
     * @param {number} amount - The intensity value to set.
     * @throws {Error} If from is greater than or equal to to.
     */
    set(from, to, amount) {
      if (from >= to) {
        throw new Error('Invalid range: "from" must be less than "to"');
      }
  
      // Insert 'from' if not present, initializing with previous intensity
      if (!this.#segments.has(from)) {
        this.#segments.set(from, this.#getPrevIntensity(from));
      }
  
      // Insert 'to' if not present, preserving the intensity before 'to'
      if (!this.#segments.has(to)) {
        this.#segments.set(to, this.#getPrevIntensity(to));
      }
  
      // Set intensity to amount for all points in [from, to)
      for (const [point] of this.#segments) {
        if (point >= from && point < to) {
          this.#segments.set(point, amount);
        }
      }
    }
  
    /**
     * Returns a string representation of the intensity segments where intensity changes occur.
     * Format: "[[point1, value1], [point2, value2], ...]".
     * @returns {string} The JSON string of intensity change points.
     */
    toString() {
      const keys = [...this.#segments.keys()].sort((a, b) => a - b);
      if (keys.length === 0) {
        return '[]';
      }
  
      const result = [];
      let prevIntensity = 0; // Intensity starts at 0 everywhere
  
      for (const key of keys) {
        const intensity = this.#segments.get(key);
        if (intensity !== prevIntensity) {
          result.push([key, intensity]);
          prevIntensity = intensity;
        }
      }
  
      return JSON.stringify(result);
    }
  
    /**
     * Retrieves the intensity value just before the specified point.
     * @param {number} point - The point to query.
     * @returns {number} The intensity before the point, or 0 if no prior points exist.
     * @private
     */
    #getPrevIntensity(point) {
      const prevKeys = [...this.#segments.keys()].filter((k) => k < point);
      if (prevKeys.length === 0) {
        return 0; // Default intensity is 0
      }
      const maxPrevKey = Math.max(...prevKeys);
      return this.#segments.get(maxPrevKey);
    }
  }



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