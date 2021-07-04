/*
 * @Author: huohuoit
 * @Date: 2021-04-28 21:52:10
 * @Description: leetcode-21--合并两个有序链表
 * @LastEditors: huohuoit
 * @LastEditTime: 2021-04-29 10:37:21
 * @Github: https://github.com/Qingxuan001
 * @FilePath: \series-of-hand-writinge:\个人学习资料\leetcode-practice\doing\List\leetcode-21.js
 */

// Question：将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。(l1 和 l2 均按 非递减顺序 排列)

// 示例：

// 输入：l1 = [1, 2, 4], l2 = [1, 3, 4]
// 输出：[1, 1, 2, 3, 5, 4]

// 结构表示
// const l1 = {
//     val: 1,
//     next: {
//         val: 2,
//         next: { val: 4, next: null },
//     },
// };

// const l2 = {
//     val: 1,
//     next: {
//         val: 3,
//         next: { val: 4, next: null },
//     },
// };



// Method 1：递归1
// 我们需要辅助链表 =》 构造链表
const ListNode = function (val, next) {
    this.val = val || 0;
    this.next = next || null;
}

const mergeTwoLists = (l1, l2) => {
    // 递归函数
    const recursion = (newListNode, l1, l2) => {
        // 1 如果链表 l1 l2 都为空，那就结束本次递归
        if (!l1 && !l2) {
            return;
        }
        // 2 如果 l1 或 l2 链表为空，将非空连接加到新链表后面，也结束本次递归
        if (!l1 || !l2) {
            newListNode.next = l1 || l2;
            return;
        }
        // 3 再创建一个辅助链表，用来获取新链表的下一个新节点
        // 这里配合点 4 来看比较容易懂
        newListNode.next = new ListNode();
        newListNode = newListNode.next;

        // 4 排序，同时将采纳了的链表往后挪一位
        if (l1.val >= l2.val) {
            newListNode.val = l2.val;
            l2 = l2.next;
        } else {
            newListNode.val = l1.val;
            l1 = l1.next;
        }
        // 5 继续下一次递归
        recursion(newListNode, l1, l2);
    };

    // 初始化一个新链表（作为结果链表）
    const newListNode = new ListNode();
    // 处理这个链表，和 l1、l2
    recursion(newListNode, l1, l2);
    // 返回结果链表
    return newListNode.next; // 重点：我们初始化的时候，有一个没用的链表，记得往后挪一位
};

// Method 1：递归2
const mergeTwoLists = function (l1, l2) {
    if (l1 === null) {
        return l2;
    } else if (l2 === null) {
        return l1;
    } else if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    }
};

// Method 2：迭代
const ListNode = function (val, next) {
    this.val = val || 0;
    this.next = next || null;
}
const mergeTwoLists = function (l1, l2) {
    const prehead = new ListNode(); // 创建一个哨兵节点(链表)
    let prev = prehead; // 初始化指针 prev 指向哨兵节点
    while(l1 && l2) {
        if(l1.val <= l2.val) {
            prev.next = l1; // 这里同时改变了 prehead.next, prev 仅仅是辅助指针
            l1 = l1.next;
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next; // 将辅助指针 prev 移动到下一位（当前的 prehead.next）
    }
    prev.next = l1 || l2; // 合并后 l1 和 l2 最多只有一个还未被合并完，我们直接通过指针将链表的末尾指向未合并完的链表即可
    return prehead.next; // 返回哨兵节点（链表）之后的所有节点
};