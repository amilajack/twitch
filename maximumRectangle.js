// Given n non-negative integers representing 
// the histogram's bar height where the width of each bar is 1, find 
// the area of largest rectangle in the histogram.

// Input: [2,1,5,6,2,3]
// Output: 10
const { performance } = require('perf_hooks');

// O(n^3)
const largestRectangle = (a) => {
    let maxArea = 0;
    for (let left = 0; left < a.length; left++) {
        for (let right = left; right < a.length; right++) {
            let min = Number.POSITIVE_INFINITY;
            for (let i = left; i <= right; i++) {
                min = Math.min(min, a[i]);
            }
            let area = min * (right - left + 1);
            maxArea = Math.max(area, maxArea);
        }
    }
    return maxArea;
}

// O(n^2)
const largestRectangleQuad = (a) => {
    let maxArea = 0;
    for (let i = 0; i < a.length; i++) {
        const h = a[i];
        let left = i;
        while (left >= 0) {
            if (a[left] < h) {
                break;
            }
            left--;
        }
        let right = i;
        while (right < a.length) {
            if (a[right] < h) {
                break;
            }
            right++;
        }
        const area = h * (right - left - 1);
        maxArea = Math.max(maxArea, area);
    }
    return maxArea;
}

console.log(largestRectangle([2, 1, 5, 6, 2, 3])); // 10
console.log(largestRectangle([2, 1, 0, 6, 2, 3])); //6
console.log(largestRectangle([2, 1, 0, 8, 2, 3])); //8
console.log(largestRectangle([2, 1, 0, 6, 2, 2, 2, 2, 2, 2])); //14
// n = 1000, 1000000000

console.log(largestRectangleQuad([2, 1, 5, 6, 2, 3])); // 10
console.log(largestRectangleQuad([2, 1, 0, 6, 2, 3])); //6
console.log(largestRectangleQuad([2, 1, 0, 8, 2, 3])); //8
console.log(largestRectangleQuad([2, 1, 0, 6, 2, 2, 2, 2, 2, 2])); //14
// n = 1000, 1000000

const test = (a) => {
    let before = performance.now();
    let quad = largestRectangleQuad(a);
    let after = performance.now();
    let seconds = Math.floor((after - before) / 1000);

    console.log(`Quadratic for ${a.length} elements took ${seconds} seconds.`);

    before = performance.now();
    let cube = largestRectangle(a);
    after = performance.now();
    seconds = Math.floor((after - before) / 1000);
    console.log(`Cubic for ${a.length} elements took ${seconds} seconds.`);

    if (quad !== cube) {
        console.log(`${a}, ${quad} != ${cube}`);
        throw new Error();
    }
    console.log('done')
}

const randomArray = (n) => {
    let a = [];
    for (let i = 0; i < n; i++) {
        a.push(Math.floor(Math.random() * 1000));
    }
    return a;
}

test([2, 1, 5, 6, 2, 3]);
test([2, 1, 22, 4, 3, 1, 6, 2, 4, 2, 4, 65, 6, 2, 3]);
test(randomArray(20));
test(randomArray(200));







// Given an array of integers, find the nearest smaller number for every 
// element such that the smaller element is on left side.