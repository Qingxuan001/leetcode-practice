/*
 * @Author: huohuoit
 * @Date: 2021-04-29 10:46:16
 * @Description: leetcode-141--环形链表 字节 有赞
 * @LastEditors: huohuoit
 * @LastEditTime: 2021-04-29 11:45:55
 * @Github: https://github.com/Qingxuan001
 * @FilePath: \series-of-hand-writinge:\个人学习资料\leetcode-practice\doing\List\leetcode-141.js
 */

// 给定一个链表，判断链表中是否有环。
// https://leetcode-cn.com/problems/linked-list-cycle/

// Method 1：标志法

// 给每个已遍历过的节点加标志位，遍历链表，当出现一个节点已被标志时，则证明单链表有环

const hasCycle = function (head) {
    while (head) {
        if (head.flag) return true
        head.flag = true
        head = head.next
    }
    return false
};

// 时间复杂度：O(n) ，空间复杂度：O(n)

// Method 2：利用 JSON.stringify() 不能序列化含有循环引用的结构

const hasCycle = function (head) {
    try {
        JSON.stringify(head);
        return false;
    }
    catch (err) {
        return true;
    }
};

// 时间复杂度：O(n) ，空间复杂度：O(n)

// Method 3：快慢指针（双指针法）

// 设置快慢两个指针，遍历单链表，快指针一次走两步，慢指针一次走一步，如果单链表中存在环，则快慢指针终会指向同一个节点，否则直到快指针指向 null 时，快慢指针都不可能相遇

const hasCycle = (head) => {
    let fast = head;
    let slow = head;
    while (fast) {
        if (fast.next == null) return false;
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}

// 时间复杂度：O(n) ，空间复杂度：O(1)

// 暴力法
const hasCycle = (head) => {
    let cur1 = head; // cur1指针指向链表节点
    let step1 = 0; // 初始化cur1指针走的步数
    while (cur1) {
        step1++; // 走一步
        let cur2 = head; // 然后创建cur2指针开始从头遍历
        let step2 = 0; // 初始化cur2指针走的步数
        while (cur2) {
            step2++; // 走一步
            if (cur1 == cur2) { // cur1和cur2的元素相同
                if (step1 == step2) { // 如果走的步数一样，即走到了cur1这里
                    break; // 退出内层while
                } else {  // 相遇但步数不一样
                    return true; // cur2多走了几步（一个环）又回到了cur1,说明链表有环
                }
            }
            cur2 = cur2.next; // cur2向后移动一步
        }
        cur1 = cur1.next; // cur1向后移动一步
    }
    return false;
};

// 哈希表
const hasCycle = (head) => {
    let map = new Map();
    while (head) {
        if (map.has(head)) return true;
        map.set(head, true); // 存的是节点的地址引用，而不是节点值
        head = head.next;
    }
    return false;
};