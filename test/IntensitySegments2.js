export class IntensitySegments2 {
    constructor() {
        this.segments = [];
    }
    add(start, end, intensity) {
        // 这里是你的代码逻辑
    }
    toString() {
        return JSON.stringify(this.segments);
    }
}

module.exports = IntensitySegments2; // 导出类

const segments = new IntensitySegments2();
segments.add(10, 30, 1);
console.log(segments.toString());