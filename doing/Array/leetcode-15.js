/*
 * @Author: huohuoit
 * @Date: 2021-04-01 14:41:44
 * @Description: Get it !
 * @LastEditors: huohuoit
 * @LastEditTime: 2021-04-01 20:54:27
 * @Github: https://github.com/Qingxuan001
 * @FilePath: \series-of-hand-writinge:\个人学习资料\leetcode-practice\doing\Array\leetcode-15.js
 */

const threeSum = function (nums) {
    if (nums == null || nums.length < 3) return []; // 判断数组元素个数是否满足要求
    // 初始化辅助数组
    let res = [];
    // 1、先将数组原地升序
    nums.sort((a, b) => a - b);
    // 2、第一层 for 循环拿到第一个数
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) break; // 前面已经升序，如果三元组的第一个元素大于0，则三数之和必不等于0，直接退出循环
        if (i > 0 && nums[i] === nums[i - 1]) continue;   // 去除重复情况
        // 这里就回到 两数之和 问题
        let first = nums[i];
        let hashMap = new Map(); // 作 Map 记录（这次放到这里啦！！！）
        // 3、第二层 for 循环(第二个数 nums[j])
        for (let j = i + 1; j < nums.length; j++) {
            // 3.1、拿到第三个数 c = 0 - nums[j] - first
            let third = 0 - nums[j] - first;
            // 去除重复情况
            if (res.length) {
                let [a, b, c] = res[res.length - 1];
                if (b === nums[j] && c === third) continue;
            }
            if (hashMap.has(third)) {
                res.push([first, nums[j], third]);
            }
            hashMap.set(nums[j], j);
        }
    }
    return res;
}

const threeSum = function (nums) {
    if (nums == null || nums.length < 3) return [];
    let res = [];
    let len = nums.length
    nums.sort((a, b) => a - b);
    for (let i = 0; i < len - 2; i++) { // 这里是 len-2 哦！
        if (nums[i] > 0) break;
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let left = i + 1; // 左指针
        let right = len - 1; // 右指针
        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) { // 三数和小于0，则左指针右移
                left++;
            } else if (sum > 0) { // 三数和大于0，则右指针左移
                right--;
            } else {
                res.push([nums[i], nums[left], nums[right]]);
                // 去重：因为数组已经升序，重复的元素是紧贴在一起的，为了避免重复把指针移动到最后一个重复元素的位置
                while (nums[left] === nums[left + 1]) {
                    left++;
                };
                while (nums[right] === nums[right - 1]) {
                    right--;
                };
                // 更新指针位置（同时向内收缩：因为 left right 已经计算过一次是否满足条件，要移动到新的位置上哦！
                left++;
                right--;
                continue;
            }

        }
    }
    return res;
}
