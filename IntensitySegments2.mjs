export class IntensitySegments2 {
    constructor() {
        this.segments = [];
    }

    add(from, to, amount) {
        this._updateRange(from, to, (current) => current + amount);
    }

    set(from, to, amount) {
        this._updateRange(from, to, () => amount);
    }

    toString() {
        return JSON.stringify(this.segments);
    }

    _updateRange(from, to, updateFn) {
        let newSegments = [];
        let i = 0;
        let lastValue = 0;

        // 处理起始点之前的分段
        while (i < this.segments.length && this.segments[i][0] < from) {
            newSegments.push([...this.segments[i]]);
            lastValue = this.segments[i][1];
            i++;
        }

        // 获取 from 之前的最后一个值
        let valueBeforeFrom = newSegments.length > 0 ? newSegments[newSegments.length - 1][1] : 0;
        
        // 处理更新范围内的点
        let pointsToProcess = [];
        while (i < this.segments.length && this.segments[i][0] < to) {
            pointsToProcess.push(this.segments[i]);
            i++;
        }

        // 获取 to 之后的第一个值
        let valueAfterTo = i < this.segments.length ? this.segments[i][1] : 0;

        // 添加 from 点
        if (newSegments.length === 0 || newSegments[newSegments.length - 1][0] !== from) {
            newSegments.push([from, updateFn(valueBeforeFrom)]);
        } else {
            newSegments[newSegments.length - 1][1] = updateFn(valueBeforeFrom);
        }

        // 处理中间的点
        for (let point of pointsToProcess) {
            if (point[0] > from && point[0] < to) {
                newSegments.push([point[0], updateFn(point[1])]);
            }
        }

        // 添加 to 点
        if (!newSegments.some(seg => seg[0] === to)) {
            newSegments.push([to, valueAfterTo]);
        }

        // 添加剩余的点
        while (i < this.segments.length) {
            if (!newSegments.some(seg => seg[0] === this.segments[i][0])) {
                newSegments.push([...this.segments[i]]);
            }
            i++;
        }

        // 按位置排序并移除重复点
        newSegments.sort((a, b) => a[0] - b[0]);
        this.segments = this._removeAdjacentDuplicates(newSegments);
    }

    _removeAdjacentDuplicates(segments) {
        if (segments.length <= 1) return segments;
        
        let result = [];
        let prev = segments[0];
        result.push(prev);
        
        for (let i = 1; i < segments.length; i++) {
            if (segments[i][1] !== prev[1]) {
                result.push(segments[i]);
                prev = segments[i];
            }
        }
        
        return result;
    }
}

// 测试用例保持不变
function runTests() {
    const segments1 = new IntensitySegments2();
    segments1.add(10, 30, -1);
    segments1.add(20, 40, 1);
    segments1.add(10, 40, -1);
    console.log(segments1.toString()); // "[[10,-1],[20,0],[30,-1],[40,-2]]"

    const segments2 = new IntensitySegments2();
    segments2.add(10, 30, -1);
    segments2.add(20, 40, 1);
    segments2.add(10, 40, -1);
    console.log(segments2.toString()); // "[[10,-1],[20,0],[30,-1],[40,-2]]"

    const segments3 = new IntensitySegments2();
    segments3.set(10, 20, 2);
    segments3.set(20, 30, 3);
    segments3.set(30, 40, 3);
    console.log(segments3.toString()); // "[[10,2],[20,3],[30,3],[40,0]]"

    const segments4 = new IntensitySegments2();
    segments4.set(10, 20, 1);
    segments4.set(30, 40, 0);
    console.log(segments4.toString()); // "[[10,1],[20,0],[30,0],[40,0]]"
}

runTests();