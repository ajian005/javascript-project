import { IntensitySegments } from './intensitySegments.mjs';

// describe('IntensitySegments', () => {
  //it('should handle empty segments', () => {
    const segments = new IntensitySegments();
    expect(segments.toString()).toBe('[]');
  //});

  //it('should handle add operation', () => {
    const segments2 = new IntensitySegments();
    segments2.add(10, 30, 1);
    expect(segments2.toString()).toBe('[[10,1],[30,0]]');
    segments2.add(20, 40, 1);
    expect(segments2.toString()).toBe('[[10,1],[20,2],[30,1],[40,0]]');
    segments2.add(10, 40, -2);
    expect(segments2.toString()).toBe('[[10,-1],[20,0],[30,-1],[40,0]]');
  //});

  //it('should handle another add operation sequence', () => {
    const segments3 = new IntensitySegments();
    segments3.add(10, 30, 1);
    expect(segments3.toString()).toBe('[[10,1],[30,0]]');
    segments3.add(20, 40, 1);
    expect(segments3.toString()).toBe('[[10,1],[20,2],[30,1],[40,0]]');
    segments3.add(10, 40, -1);
    expect(segments3.toString()).toBe('[[20,1],[30,0]]');
    segments3.add(10, 40, -1);
    expect(segments3.toString()).toBe('[[10,-1],[20,0],[30,-1],[40,0]]');
  //});

 // it('should handle set operation', () => {
    const segments4 = new IntensitySegments();
    segments4.set(10, 30, 1);
    expect(segments4.toString()).toBe('[[10,1],[30,0]]');
    segments4.set(20, 40, 2);
    expect(segments4.toString()).toBe('[[10,1],[20,2],[40,0]]');
    segments4.set(10, 40, -1);
    expect(segments4.toString()).toBe('[[10,-1],[40,0]]');
 // });

 // it('should handle set operation with overlapping', () => {
    const segments5 = new IntensitySegments();
    segments5.set(10, 20, 1);
    segments5.set(15, 25, 2);
    expect(segments5.toString()).toBe('[[10,1],[15,2],[25,0]]');
//  });

 // it('should handle set operation with nested', () => {
    const segments6 = new IntensitySegments();
    segments6.set(10, 30, 1);
    segments6.set(15, 25, 2);
    expect(segments6.toString()).toBe('[[10,1],[15,2],[25,1],[30,0]]');
 // });

 // it('should handle set operation with same segment', () => {
    const segments7 = new IntensitySegments();
    segments7.set(10, 20, 1);
    segments7.set(10, 20, 2);
    expect(segments7.toString()).toBe('[[10,2],[20,0]]');
 // });

//  it('should handle set operation with multiple sets', () => {
    const segments8 = new IntensitySegments();
    segments8.set(10, 20, 1);
    segments8.set(20, 30, 2);
    segments8.set(15, 25, 3);
    expect(segments8.toString()).toBe('[[10,1],[15,3],[25,2],[30,0]]');
//  });

//  it('should handle set operation with set to zero', () => {
    const segments9 = new IntensitySegments();
    segments9.set(10, 30, 1);
    segments9.set(15, 25, 0);
    expect(segments9.toString()).toBe('[[10,1],[15,0],[25,1],[30,0]]');
//  });
//});