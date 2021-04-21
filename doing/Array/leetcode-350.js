/*
 * @Author: huohuoit
 * @Date: 2021-04-21 16:01:54
 * @Description: leetcode-350--两个数组的交集2
 * @LastEditors: huohuoit
 * @LastEditTime: 2021-04-21 16:52:12
 * @Github: https://github.com/Qingxuan001
 * @FilePath: \series-of-hand-writinge:\个人学习资料\leetcode-practice\doing\Array\leetcode-350.js
 */

// Question：给定两个数组，编写一个函数来计算它们的交集。

// 示例：

// 输入：nums1 = [1, 2, 2, 1]，nums2 = [2, 2]

// 输出：[2，2]

// 输出结果中每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致。不考虑顺序。

// hash
const intersect = function (nums1, nums2) {
    const map = {};
    const res = []; // 结果数组
    // 检查数组大小做交换
    if(nums1.length > nums2.length) {
        let temp = nums2;
        nums2 = nums1;
        nums1 = temp;
    }
    for (const num1 of nums1) {
        if (map[num1]) {  // 如果元素已经存在，则增加对应的计数
            map[num1]++;
        } else {          // // 元素不存在，计数为1
            map[num1] = 1;
        }
    }
    for (const num2 of nums2) {
        if (map[num2] > 0) {  // 如果nums2的这个数在nums1出现过
            res.push(num2);   // 把这个数推入res
            map[num2]--;      // 同时减少 map 中对应元素的计数
        }
    }
    return res;
};

// 双指针
const intersect = function (nums1, nums2) {
    let index1 = 0, index2 = 0;
    let res = [];
    nums1 = nums1.sort((a, b) => a - b);
    nums2 = nums2.sort((a, b) => a - b);
    while (index1 < nums1.length && index2 < nums2.length) {
        if(nums1[index1] === nums2[index2]) {
            res.push(nums1[index1]);
            index1++;
            index2++;
        } else if (nums1[index1] < nums2[index2]) {
            index1++;
        } else {
            index2++;
        }
    }
    return res;
};