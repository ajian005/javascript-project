// 定义 IntensitySegments 类，用于管理强度区间
export class IntensitySegments {
    // 构造函数，初始化存储区间信息的数组
    constructor() {
        this.segments = [];
    }

    // 合并相邻且强度相同的区间，减少冗余
    _mergeSegments() {
        let i = 1;
        while (i < this.segments.length) {
            if (this.segments[i][1] === this.segments[i - 1][1]) {
                this.segments.splice(i, 1);
            } else {
                i++;
            }
        }
        // 移除开头和结尾强度为 0 的区间
        while (this.segments.length > 0 && this.segments[0][1] === 0) {
            this.segments.shift();
        }
        while (this.segments.length > 0 && this.segments[this.segments.length - 1][1] === 0) {
            this.segments.pop();
        }
    }

    // 增加指定区间的强度
    add(from, to, amount) {
        let startIndex = 0;
        // 找到起始位置
        while (startIndex < this.segments.length && this.segments[startIndex][0] < from) {
            startIndex++;
        }
        // 若起始位置不在数组中，插入新的区间
        if (startIndex === 0 || this.segments[startIndex - 1][0] < from) {
            const prevValue = startIndex === 0 ? 0 : this.segments[startIndex - 1][1];
            this.segments.splice(startIndex, 0, [from, prevValue]);
        }

        let endIndex = startIndex;
        // 找到结束位置并更新强度
        while (endIndex < this.segments.length && this.segments[endIndex][0] < to) {
            this.segments[endIndex][1] += amount;
            endIndex++;
        }
        // 若结束位置不在数组中，插入新的区间
        if (endIndex === this.segments.length || this.segments[endIndex][0] > to) {
            const prevValue = endIndex === 0 ? 0 : this.segments[endIndex - 1][1];
            this.segments.splice(endIndex, 0, [to, prevValue - amount]);
        }

        this._mergeSegments();
    }

    // 设置指定区间的强度
    set(from, to, amount) {
        let startIndex = 0;
        // 找到起始位置
        while (startIndex < this.segments.length && this.segments[startIndex][0] < from) {
            startIndex++;
        }
        // 若起始位置不在数组中，插入新的区间
        if (startIndex === 0 || this.segments[startIndex - 1][0] < from) {
            const prevValue = startIndex === 0 ? 0 : this.segments[startIndex - 1][1];
            this.segments.splice(startIndex, 0, [from, prevValue]);
        }

        let endIndex = startIndex;
        // 移除指定区间内的原有区间
        while (endIndex < this.segments.length && this.segments[endIndex][0] < to) {
            this.segments.splice(endIndex, 1);
        }
        // 若结束位置不在数组中，插入新的区间
        if (endIndex === this.segments.length || this.segments[endIndex][0] > to) {
            const prevValue = endIndex === 0 ? 0 : this.segments[endIndex - 1][1];
            this.segments.splice(endIndex, 0, [to, prevValue]);
        }

        // 在起始位置插入新的强度值
        this.segments.splice(startIndex, 0, [from, amount]);

        this._mergeSegments();
    }

    // 将 segments 数组转换为字符串表示
    toString() {
        return JSON.stringify(this.segments);
    }
}

// 测试用例
// 测试 add 方法
const testAdd1 = new IntensitySegments();
console.log('Test add 1: Initial state:', testAdd1.toString()); // Should be "[]"
testAdd1.add(10, 30, 1);
console.log('Test add 1: After first add:', testAdd1.toString()); // Should be: "[[10,1],[30,0]]"
testAdd1.add(20, 40, 1);
console.log('Test add 1: After second add:', testAdd1.toString()); // Should be: "[[10,1],[20,2],[30,1],[40,0]]"
testAdd1.add(10, 40, -2);
console.log('Test add 1: After third add:', testAdd1.toString()); // Should be: "[[10,-1],[20,0],[30,-1],[40,0]]"

const testAdd2 = new IntensitySegments();
console.log('Test add 2: Initial state:', testAdd2.toString()); // Should be "[]"
testAdd2.add(10, 30, 1);
console.log('Test add 2: After first add:', testAdd2.toString()); // Should be "[[10,1],[30,0]]"
testAdd2.add(20, 40, 1);
console.log('Test add 2: After second add:', testAdd2.toString()); // Should be "[[10,1],[20,2],[30,1],[40,0]]"
testAdd2.add(10, 40, -1);
console.log('Test add 2: After third add:', testAdd2.toString()); // Should be "[[20,1],[30,0]]"
testAdd2.add(10, 40, -1);
console.log('Test add 2: After fourth add:', testAdd2.toString()); // Should be "[[10,-1],[20,0],[30,-1],[40,0]]"

// 测试 set 方法
const testSet1 = new IntensitySegments();
console.log('Test set 1: Initial state:', testSet1.toString()); // Should be "[]"
testSet1.set(10, 30, 2);
console.log('Test set 1: After first set:', testSet1.toString()); // Should be "[[10,2],[30,0]]"
testSet1.set(20, 40, 3);
console.log('Test set 1: After second set:', testSet1.toString()); // Should be "[[10,2],[20,3],[40,0]]"
testSet1.set(10, 40, 1);
console.log('Test set 1: After third set:', testSet1.toString()); // Should be "[[10,1],[40,0]]"

// 补充 set 测试用例
const testSet2 = new IntensitySegments();
testSet2.add(10, 30, 1);
testSet2.add(20, 40, 1);
console.log('Test set 2: After adds:', testSet2.toString()); // Should be "[[10,1],[20,2],[30,1],[40,0]]"
testSet2.set(15, 25, 3);
console.log('Test set 2: After set 15 - 25 to 3:', testSet2.toString()); // Should be "[[10,1],[15,3],[25,1],[30,1],[40,0]]"
testSet2.set(20, 35, 0);
console.log('Test set 2: After set 20 - 35 to 0:', testSet2.toString()); // Should be "[[10,1],[15,3],[20,0],[35,1],[40,0]]"
testSet2.set(5, 45, -1);
console.log('Test set 2: After set 5 - 45 to -1:', testSet2.toString()); // Should be "[[5,-1],[45,0]]"

const testSet3 = new IntensitySegments();
testSet3.add(5, 15, 2);
testSet3.add(12, 22, 1);
console.log('Test set 3: After adds:', testSet3.toString()); // Should be "[[5,2],[12,3],[15,1],[22,0]]"
testSet3.set(8, 18, 4);
console.log('Test set 3: After set 8 - 18 to 4:', testSet3.toString()); // Should be "[[5,2],[8,4],[18,1],[22,0]]"
testSet3.set(10, 20, -2);
console.log('Test set 3: After set 10 - 20 to -2:', testSet3.toString()); // Should be "[[5,2],[8,4],[10,-2],[20,0]]"

const testSet4 = new IntensitySegments();
testSet4.add(1, 10, 5);
testSet4.add(8, 15, 3);
console.log('Test set 4: After adds:', testSet4.toString()); // Should be "[[1,5],[8,8],[10,3],[15,0]]"
testSet4.set(3, 12, 1);
console.log('Test set 4: After set 3 - 12 to 1:', testSet4.toString()); // Should be "[[1,5],[3,1],[12,3],[15,0]]"
testSet4.set(5, 13, -2);
console.log('Test set 4: After set 5 - 13 to -2:', testSet4.toString()); // Should be "[[1,5],[3,1],[5,-2],[13,3],[15,0]]"

const testSet5 = new IntensitySegments();
testSet5.add(20, 30, 4);
testSet5.add(25, 35, 2);
console.log('Test set 5: After adds:', testSet5.toString()); // Should be "[[20,4],[25,6],[30,2],[35,0]]"
testSet5.set(22, 32, 0);
console.log('Test set 5: After set 22 - 32 to 0:', testSet5.toString()); // Should be "[[20,4],[22,0],[32,2],[35,0]]"
testSet5.set(18, 38, 3);
console.log('Test set 5: After set 18 - 38 to 3:', testSet5.toString()); // Should be "[[18,3],[38,0]]"

const testSet6 = new IntensitySegments();
testSet6.add(50, 60, 2);
testSet6.add(55, 65, 3);
console.log('Test set 6: After adds:', testSet6.toString()); // Should be "[[50,2],[55,5],[60,3],[65,0]]"
testSet6.set(52, 62, 4);
console.log('Test set 6: After set 52 - 62 to 4:', testSet6.toString()); // Should be "[[50,2],[52,4],[62,3],[65,0]]"
testSet6.set(56, 66, -1);
console.log('Test set 6: After set 56 - 66 to -1:', testSet6.toString()); // Should be "[[50,2],[52,4],[56,-1],[66,0]]"

const testSet7 = new IntensitySegments();
testSet7.add(100, 110, 5);
testSet7.add(105, 115, 2);
console.log('Test set 7: After adds:', testSet7.toString()); // Should be "[[100,5],[105,7],[110,2],[115,0]]"
testSet7.set(102, 112, 3);
console.log('Test set 7: After set 102 - 112 to 3:', testSet7.toString()); // Should be "[[100,5],[102,3],[112,2],[115,0]]"
testSet7.set(106, 116, 0);
console.log('Test set 7: After set 106 - 116 to 0:', testSet7.toString()); // Should be "[[100,5],[102,3],[106,0],[116,0]]"    