/*
 * @Author: huohuoit
 * @Date: 2021-04-22 15:01:48
 * @Description: Get it !
 * @LastEditors: huohuoit
 * @LastEditTime: 2021-04-22 17:03:07
 * @Github: https://github.com/Qingxuan001
 * @FilePath: \series-of-hand-writinge:\个人学习资料\leetcode-practice\doing\Array\leetcode-146.js
 */
// Question：运用你所掌握的数据结构，设计和实现一个  LRU(最近最少使用) 缓存机制 （先点进来回顾一下这是个啥~）

// 首先接收一个 capacity 参数作为缓存的最大容量
// get(key) API：如果关键字(key) 存在于缓存中，则获取关键字的值（总是正数），否则返回 - 1 。
// put(key, value) API：如果关键字已经存在，则变更其数据值；如果关键字不存在，则写入该数据。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据，从而为新数据留出空间。
// 在O(1)时间复杂度内完成上面的两个操作

// 示例：

// 输入
// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
// 输出
// [null, null, null, 1, null, -1, null, -1, 3, 4]