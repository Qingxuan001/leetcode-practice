/*
 * @Author: huohuoit
 * @Date: 2021-04-22 15:01:48
 * @Description: leetcode-146--LRU缓存机制
 * @LastEditors: huohuoit
 * @LastEditTime: 2021-04-23 11:43:56
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


// 哈希表 + 双向链表

// 创建节点类
class ListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}
// 定义 LRUCache 
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity  // 缓存的容量
        this.hash = {}            // 哈希表
        this.count = 0            // 缓存数目
        this.dummyHead = new ListNode() // 虚拟头结点
        this.dummyTail = new ListNode() // 虚拟尾节点
        // 初始化虚拟头尾节点的联系
        this.dummyHead.next = this.dummyTail
        this.dummyTail.prev = this.dummyHead
    }
    // get 方法
    get (key) {
        let node = this.hash[key];  // 从哈希表中获取对应的节点
        if (node === null) return -1; // 如果哈希表中没有该节点，返回-1
        // 将该节点移动到头部（标志着最近使用）
        this.removeFromList(node); // 先从链表中删除节点
        this.addToHead(node);      // 再添加到链表的头部      
        return node.value;          // 返回该节点的值 value
    }
    // put 方法
    put (key, value) {
        let node = this.hash[key];  // 从哈希表中获取对应的节点
        if (node === null) {        // 如果哈希表中没有该节点（的 key）
            if (this.count === this.capacity) {  // 且缓存容量已满
                this.removeOldNode();            // 将最久未使用的节点删除
            }
            let newNode = new ListNode(key, value)  // 缓存容量没满，创建新节点
            this.hash[key] = newNode;  // 将新节点存入哈希表
            this.addToHead(newNode);   // 并将新节点添加到双链表头部（更新的节点 即为 最近使用的节点）
            this.count++;            // 注意缓存的数据要加一
        } else {    // 哈希表中有该节点（的 key）
            node.value = value; // 将节点的值替换
            // 同时将该节点移动到头部（标志着最近使用）
            this.removeFromList(node); // 先从链表中删除节点
            this.addToHead(node);      // 再添加到链表的头部
        }
    }
    // 删除某个节点
    removeFromList (node) {
        let temp1 = node.prev;     // 暂存它的后继节点
        let temp2 = node.next;     // 暂存它的前驱节点
        temp1.next = temp2;      // 前驱节点的next指向后继节点
        temp2.prev = temp1;     // 后继节点的prev指向前驱节点
    }
    // 移动节点到头部
    addToHead (node) {                 // 插入到虚拟头结点和真实头结点之间
        node.prev = this.dummyHead;      // node的prev指针，指向虚拟头结点
        node.next = this.dummyHead.next; // node的next指针，指向原来的真实头结点
        this.dummyHead.next.prev = node; // 原来的真实头结点的prev，指向node
        this.dummyHead.next = node;      // 虚拟头结点的next，指向node
    }
    // 删除最近未使用的节点
    removeOldNode () {
        let tail = this.popTail();     // 将它从链表尾部删除
        delete this.hash[tail.key];    // 哈希表中也将它删除
        this.count--;                  // 缓存数目-1
    }
    popTail () {                      // 删除链表尾节点
        let tail = this.dummyTail.prev; // 通过虚拟尾节点找到它
        this.removeFromList(tail);      // 删除该真实尾节点
        return tail;                    // 返回被删除的节点
    }
}

// ES6 Map
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
    }
    get (key) {
        let value = this.map.get(key);
        if (value === undefined) return -1;
        this.map.delete(key);   // 获取 = （最近）被使用，先删除
        this.map.set(key, value);  // 再重新插入，（最后的）表示最近被使用
        return value;
    }
    put (key, value) {
        if (this.map.has(key)) {
            this.map.delete(key);
        }
        this.map.set(key, value);
        if (this.map.size > this.capacity) {
            // this.map.entries() 返回一个迭代器，这里只调用了一次next()
            // 则 next().value 返回迭代器的第一个键值对(最久未使用),如[0, 'a'],所以我们取key值 value[0]
            this.map.delete(this.map.entries().next().value[0]);
            // 当然这里也可以用 keys()直接拿到键值
            // this.map.delete(this.map.keys.next().value);
        }
    }
}