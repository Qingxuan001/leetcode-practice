/*
 * @Author: huohuoit
 * @Date: 2021-03-30 15:20:57
 * @Description: leetcode-88--合并两个有序数组
 * @LastEditors: huohuoit
 * @LastEditTime: 2021-03-31 19:57:28
 * @Github: https://github.com/Qingxuan001
 * @FilePath: \series-of-hand-writinge:\个人学习资料\leetcode-practice\doing\Array\leetcode-88.js
 */

// Question：给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 num1 成为一个有序数组

// Method 1: 直接合并后排序
const merge = function (nums1, m, nums2, n) {
    if (n === 0) return;    // 被合并数组没有元素直接返回
    nums1.splice(m, nums1.length - m, ...nums2);    // 先将 nums2 放在 nums1 后面
    // 也可如下：
    // for (let i = 0; i <= n; i++) {
    //     nums1[m + i] = nums2[i];
    // }
    nums1.sort((a, b) => a - b);    // 递增顺序排序
};

// 归并排序-归并
const myMerge = function (nums1, nums2) {
    let arr = [];
    while (nums1.length || nums2.length) {
        // 考虑一下边缘情况
        if (nums1.length === 0) {
            arr.push(nums2.shift());
            continue;
        }
        if (nums2.length === 0) {
            arr.push(nums1.shift());
            continue;
        }
        // 取出两个数组的头部元素
        const a = nums1[0];
        const b = nums2[0];
        // 比较大小
        if (a > b) {
            arr.push(nums2.shift());
        } else {
            arr.push(nums1.shift());
        }
    }
    return arr;
};

// Method 2: 双指针法（从后往前）
const merge = function (nums1, m, nums2, n) {
    let cur = m + n - 1;   // 定义写指针，指向当前用于填入元素的位置，初始化指向 nums1 的末尾
    while (cur >= 0) {
        if (n === 0) return;
        // 边缘情况处理
        if (m < 1) {
            nums1[cur--] = nums2[--n];
            continue;
        }
        if (n < 1) {
            nums1[current--] = nums1[--m];
            continue;
        }
        // 具体处理
        if (nums1[m - 1] > nums2[n - 1]) {
            nums1[current--] = nums1[--m];
        } else {
            nums1[current--] = nums2[--n];
        }
    }
}
// 更好的处理
const merge = function (nums1, m, nums2, n) {
    // 定义三个指针
    let len1 = m - 1,
        len2 = n - 1,
        len = m + n - 1
    while (len2 >= 0) { // nums2 有元素时
        if (len1 < 0) { // nums1 没有元素时
            nums1[len--] = nums2[len2--]
            continue
        }
        nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--]
    }
};