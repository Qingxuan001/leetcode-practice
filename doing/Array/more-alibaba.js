/*
 * @Author: huohuoit
 * @Date: 2021-04-21 16:54:28
 * @Description: Get it !
 * @LastEditors: huohuoit
 * @LastEditTime: 2021-04-21 17:08:54
 * @Github: https://github.com/Qingxuan001
 * @FilePath: \series-of-hand-writinge:\个人学习资料\leetcode-practice\doing\Array\more-alibaba.js
 */
// 阿里：编写一个函数计算多个数组的交集
// 要求：
//      输出结果中的每个元素一定是唯一的
const intersection = function (...args) {
    if (args.length === 0) {
        return []
    }
    if (args.length === 1) {
        return args[0]
    }
    return [...new Set(args.reduce((result, arg) => {
        return result.filter(item => arg.includes(item))
    }))]
};