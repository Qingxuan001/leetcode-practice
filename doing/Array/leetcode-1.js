/*
 * @Author: huohuoit
 * @Date: 2021-03-31 19:33:21
 * @Description: leetcode　001两数之和
 * @LastEditors: huohuoit
 * @LastEditTime: 2021-03-31 20:50:30
 * @Github: https://github.com/Qingxuan001
 * @FilePath: \series-of-hand-writinge:\个人学习资料\leetcode-practice\doing\Array\leetcode-1.js
 */

// 1、暴力法
//      使用两层循环，外层循环计算当前元素与 targettarget 之间的差值，内层循环寻找该差值，若找到该差值，则返回两个元素的下标。
//      时间复杂度：O(n^2)
const twoSum = function (nums, target) {
    const len = nums.length;
    for (let i = 0; i < len; i++) {
        let preItem = nums[i];
        // j = i + 1 的目的是减少重复计算和避免两个元素下标相同
        for (let j = i + 1; j < len; j++) {
            let reaItem = nums[j];
            if (preItem + reaItem === target)
                return [i, j];
        }
    }
};
// 2、数组法
//      减少查询时间
//      时间复杂度：O(n)
const twoSum = function (nums, target) {
    let temp = [];
    for (let i = 0; i < nums.length; i++) {
        let dif = target - nums[i];
        if (temp[dif] != undefined) {
            return [temp[dif], i];
        }
        temp[nums[i]] = i;
    }
};
//  3、map
//      时间复杂度：O(n)
const twoSum = (nums, target) => {
    // 1. 构造 Map 数据结构
    const map = new Map(); // 存储方式 {key, index}
    // 2. 遍历数组
    for (let i = 0; i < nums.length; i++) {
        // 2.1 如果找到 target - nums[i] 的值
        let diff = target - nums[i];
        if (map.has(diff)) {
            // 返回下标数组
            return [map.get(diff), i];
        } else {
            // 2.2 如果没找到则把[该数组元素值，该元素在原数组的下标值]存入 map 结构
            map.set(nums[i], i);
        }
    }
};

// 4、 一层循环 + indexOf
const twoSum = (nums, target) => {
    for (let i = 0; i < nums.length; i++) {
        let diff = nums.indexOf(target - nums[i]);
        if (diff != -1 && diff != i) {  // 不存在差值会返回 -1，且题目要求不能出现同一元素
            return [i, diff]
        }
    }
}