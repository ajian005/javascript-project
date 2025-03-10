class IntensitySegments {
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
        let prevValue = 0;

        // 处理 from 之前的点
        while (i < this.segments.length && this.segments[i][0] < from) {
            newSegments.push([...this.segments[i]]);
            prevValue = this.segments[i][1];
            i++;
        }

        // 获取 from 位置的值
        let valueAtFrom = i > 0 && this.segments[i-1][0] < from ? this.segments[i-1][1] : 0;
        
        // 添加 from 点
        if (!newSegments.length || newSegments[newSegments.length-1][0] !== from) {
            newSegments.push([from, updateFn(valueAtFrom)]);
        } else {
            newSegments[newSegments.length-1][1] = updateFn(valueAtFrom);
        }

        // 处理 from 到 to 之间的点
        while (i < this.segments.length && this.segments[i][0] < to) {
            let currentPos = this.segments[i][0];
            newSegments.push([currentPos, updateFn(this.segments[i][1])]);
            i++;
        }

        // 获取 to 之后的值
        let valueAfterTo = i < this.segments.length ? this.segments[i][1] : 0;
        
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

        // 清理并移除重复值
        this.segments = this._cleanSegments(newSegments);
    }

    _cleanSegments(segments) {
        if (!segments.length) return [];
        
        // 按位置排序
        segments.sort((a, b) => a[0] - b[0]);
        
        let result = [];
        let prevValue = null;
        
        for (let [pos, value] of segments) {
            if (result.length === 0) {
                result.push([pos, value]);
            } else {
                let lastSegment = result[result.length - 1];
                if (value !== lastSegment[1]) {
                    result.push([pos, value]);
                } else if (pos === segments[segments.length - 1][0]) {
                    // 确保最后一个点保留
                    if (result.length > 1 && result[result.length - 1][1] === result[result.length - 2][1]) {
                        result.pop();
                    }
                    result.push([pos, value]);
                }
            }
        }

        // 移除值为0的首尾点（如果后面没有非零值）
        if (result.length > 1 && result[0][1] === 0 && result[1][1] === 0) {
            result.shift();
        }
        
        return result;
    }
}

// 测试用例
function runTests() {
    // 第一个 add 测试序列
    const segments1 = new IntensitySegments();
    console.log(segments1.toString()); // "[]"
    segments1.add(10, 30, 1);
    console.log(segments1.toString()); // "[[10,1],[30,0]]"
    segments1.add(20, 40, 1);
    console.log(segments1.toString()); // "[[10,1],[20,2],[30,1],[40,0]]"
    segments1.add(10, 40, -2);
    console.log(segments1.toString()); // "[[10,-1],[20,0],[30,-1],[40,0]]"

    // 第二个 add 测试序列
    const segments2 = new IntensitySegments();
    console.log(segments2.toString()); // "[]"
    segments2.add(10, 30, 1);
    console.log(segments2.toString()); // "[[10,1],[30,0]]"
    segments2.add(20, 40, 1);
    console.log(segments2.toString()); // "[[10,1],[20,2],[30,1],[40,0]]"
    segments2.add(10, 40, -1);
    console.log(segments2.toString()); // "[[20,1],[30,0]]"
    segments2.add(10, 40, -1);
    console.log(segments2.toString()); // "[[10,-1],[20,0],[30,-1],[40,0]]"

    // 第一个 set 测试序列
    const segments3 = new IntensitySegments();
    console.log(segments3.toString()); // "[]"
    segments3.set(10, 30, 2);
    console.log(segments3.toString()); // "[[10,2],[30,0]]"
    segments3.set(20, 40, 3);
    console.log(segments3.toString()); // "[[10,2],[20,3],[30,3],[40,0]]"
    segments3.set(10, 40, 1);
    console.log(segments3.toString()); // "[[10,1],[40,0]]"

    // 第二个 set 测试序列
    const segments4 = new IntensitySegments();
    segments4.add(10, 30, 1);
    segments4.add(20, 40, 1);
    console.log(segments4.toString()); // "[[10,1],[20,2],[30,1],[40,0]]"
    segments4.set(15, 25, 3);
    console.log(segments4.toString()); // "[[10,1],[15,3],[25,2],[30,1],[40,0]]"
    segments4.set(25, 35, 0);
    console.log(segments4.toString()); // "[[10,1],[15,3],[25,0],[35,0],[40,0]]"
}

runTests();