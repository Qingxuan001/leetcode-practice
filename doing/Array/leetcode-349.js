/*
 * @Author: huohuoit
 * @Date: 2021-04-20 17:27:03
 * @Description: leetcode-349--两个数组的交集  腾讯
 * @LastEditors: huohuoit
 * @LastEditTime: 2021-04-20 21:28:31
 * @Github: https://github.com/Qingxuan001
 * @FilePath: \series-of-hand-writinge:\个人学习资料\leetcode-practice\doing\Array\leetcode-349.js
 */

// 暴力解
const intersection = function (nums1, nums2) {
    let arr = [];
    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            if (nums1[i] === nums2[j]) {
                arr.push(nums1[i]);
            }
        }
    }
    arr = [...new Set(arr)];  // 去重
    return arr;
};

// 哈希表 + Set 
const getRes = function (set1, set2) {
    if (set1.size > set2.size) return getRes(set2, set1);
    const res = new Set();
    for (const num of set1) {
        if (set2.has(num)) {
            res.add(num);
        }
    }
    return [...res];
}
const intersection = function (nums1, nums2) {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);
    return getRes(set1, set2);
};

// 排序 + 双指针
const intersection = function (nums1, nums2) {
    // 升序
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);
    const len1 = nums1.length;
    const len2 = nums2.length;
    let index1 = 0, index2 = 0;  // 双指针分别指向数组头部
    const res = [];
    while (index1 < len1 && index2 < len2) {
        const data1 = nums1[index1];
        const data2 = nums2[index2];
        if (data1 === data2) {
            // 保证答案数组元素唯一性(注意考虑res为空的情况，直接插入)
            if (!res.length || data1 != res[res.length - 1]) {
                res.push(data1);
            }
            index1++;
            index2++;
        } else if (data1 < data2) {
            index1++;
        } else {
            index2++;
        }
    }
    return res;
};

// Set + filter
const intersection = function (nums1, nums2) {
    return result = [...new Set(nums1)].filter(item => new Set(nums2).has(item));
};