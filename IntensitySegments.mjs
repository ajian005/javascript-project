// 定义 IntensitySegments 类来管理强度分段
export class IntensitySegments {
    // 构造函数，初始化一个空的分段数组
    constructor() {
        this.segments = [];
    }

    /**
     * 向指定范围 [from, to) 内的强度增加 amount
     * @param {number} from - 范围的起始点
     * @param {number} to - 范围的结束点
     * @param {number} amount - 要增加的强度值
     */
    add(from, to, amount) {
        this._updateRange(from, to, (current) => current + amount);
    }

    /**
     * 将指定范围 [from, to) 内的强度设置为 amount
     * @param {number} from - 范围的起始点
     * @param {number} to - 范围的结束点
     * @param {number} amount - 要设置的强度值
     */
    set(from, to, amount) {
        this._updateRange(from, to, () => amount);
    }

    /**
     * 将分段信息转换为字符串表示
     * @returns {string} - 分段信息的字符串表示
     */
    toString() {
        return JSON.stringify(this.segments);
    }

    /**
     * 辅助方法，用于更新指定范围 [from, to) 内的强度
     * @param {number} from - 范围的起始点
     * @param {number} to - 范围的结束点
     * @param {function} updateFn - 更新强度的函数
     */
    _updateRange(from, to, updateFn) {
        let newSegments = [];
        let i = 0;
        let currentValue = 0;

        // 处理起始点之前的分段
        while (i < this.segments.length && this.segments[i][0] < from) {
            newSegments.push([...this.segments[i]]);
            currentValue = this.segments[i][1];
            i++;
        }

        // 处理范围起始点
        if (newSegments.length === 0 || newSegments[newSegments.length - 1][0] < from) {
            newSegments.push([from, updateFn(currentValue)]);
        } else {
            newSegments[newSegments.length - 1][1] = updateFn(currentValue);
        }

        // 处理范围内的分段
        while (i < this.segments.length && this.segments[i][0] < to) {
            currentValue = this.segments[i][1];
            newSegments.push([this.segments[i][0], updateFn(currentValue)]);
            i++;
        }

        // 处理范围结束点
        if (newSegments.length === 0 || newSegments[newSegments.length - 1][0] < to) {
            newSegments.push([to, currentValue]);
        }

        // 处理剩余的分段
        while (i < this.segments.length) {
            newSegments.push([...this.segments[i]]);
            i++;
        }

        // 去除相邻的相同强度分段
        this.segments = this._removeAdjacentDuplicates(newSegments);
    }

    /**
     * 辅助方法，用于去除相邻的相同强度分段
     * @param {Array<Array<number>>} segments - 分段数组
     * @returns {Array<Array<number>>} - 去除相邻相同强度后的分段数组
     */
    _removeAdjacentDuplicates(segments) {
        if (segments.length === 0) return [];
        let result = [segments[0]];
        for (let i = 1; i < segments.length; i++) {
            if (segments[i][1] !== result[result.length - 1][1]) {
                result.push(segments[i]);
            }
        }
        return result;
    }
}

// 测试用例
function runTests() {
    // 第一个 add 测试序列
    const segments1 = new IntensitySegments();
    console.log(segments1.toString()); // 预期输出: "[]"
    segments1.add(10, 30, 1);
    console.log(segments1.toString()); // 预期输出: "[[10,1],[30,0]]"
    segments1.add(20, 40, 1);
    console.log(segments1.toString()); // 预期输出: "[[10,1],[20,2],[30,1],[40,0]]"
    segments1.add(10, 40, -2);
    console.log(segments1.toString()); // 预期输出: "[[10,-1],[20,0],[30,-1],[40,0]]"

    // 第二个 add 测试序列
    const segments2 = new IntensitySegments();
    console.log(segments2.toString()); // 预期输出: "[]"
    segments2.add(10, 30, 1);
    console.log(segments2.toString()); // 预期输出: "[[10,1],[30,0]]"
    segments2.add(20, 40, 1);
    console.log(segments2.toString()); // 预期输出: "[[10,1],[20,2],[30,1],[40,0]]"
    segments2.add(10, 40, -1);
    console.log(segments2.toString()); // 预期输出: "[[20,1],[30,0]]"
    segments2.add(10, 40, -1);
    console.log(segments2.toString()); // 预期输出: "[[10,-1],[20,0],[30,-1],[40,0]]"

    // 第一个 set 测试序列
    const segments3 = new IntensitySegments();
    console.log(segments3.toString()); // 预期输出: "[]"
    segments3.set(10, 30, 2);
    console.log(segments3.toString()); // 预期输出: "[[10,2],[30,0]]"
    segments3.set(20, 40, 3);
    console.log(segments3.toString()); // 预期输出: "[[10,2],[20,3],[30,3],[40,0]]"
    segments3.set(10, 40, 1);
    console.log(segments3.toString()); // 预期输出: "[[10,1],[40,0]]"

    // 第二个 set 测试序列
    const segments4 = new IntensitySegments();
    segments4.add(10, 30, 1);
    segments4.add(20, 40, 1);
    console.log(segments4.toString()); // 预期输出: "[[10,1],[20,2],[30,1],[40,0]]"
    segments4.set(15, 25, 3);
    console.log(segments4.toString()); // 预期输出: "[[10,1],[15,3],[25,2],[30,1],[40,0]]"
    segments4.set(25, 35, 0);
    console.log(segments4.toString()); // 预期输出: "[[10,1],[15,3],[25,0],[35,0],[40,0]]"
}

// 运行测试用例
runTests();
