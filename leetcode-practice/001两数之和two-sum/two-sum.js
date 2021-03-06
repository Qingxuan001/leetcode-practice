/*
 * @Author: huohuoit
 * @Date: 2021-03-26 14:35:36
 * @Description: Get it !
 * @LastEditors: huohuoit
 * @LastEditTime: 2021-03-31 20:44:31
 * @Github: https://github.com/Qingxuan001
 * @FilePath: \series-of-hand-writinge:\个人学习资料\leetcode-practice\leetcode-practice\001两数之和two-sum\two-sum.js
 */
/* leetcode　001两数之和two-sum JavaScript实现　*/

/** * @param {number[]} nums * @param {number} target * @return {number[]} */
// 1、暴力法
//      使用两层循环，外层循环计算当前元素与 targettarget 之间的差值，内层循环寻找该差值，若找到该差值，则返回两个元素的下标。
//      时间复杂度：O(n^2)
var twoSum = function (nums, target) {
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
var twoSum = function (nums, target) {
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
var twoSum = (nums, target) => {
    // 1. 构造 Map 数据结构
    const map = new Map(); // 存储方式 {key, index}
    // 2. 遍历数组
    for (let i = 0; i < nums.length; i++) {
        // 2.1 如果找到 target - nums[i] 的值
        let diff = target - nums[i];
        if (map.has(diff)) {
            return [map.get(diff), i];
        } else {
            // 2.2 如果没找到则进行设置
            map.set(nums[i], i);
        }
    }
};

