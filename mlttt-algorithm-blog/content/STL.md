
## vector

```cpp
#include <vector>
vector<int> a = {1, 3, 5, 6, 8, 4, 3};

// 尾部操作 - O(1)
a.push_back(5);      // 尾部插入
a.pop_back();        // 尾部删除

// 查询操作 - O(1)
int len = a.size();       // 元素个数
int cap = a.capacity();   // 分配容量
bool empty = a.empty();   // 是否为空

// 访问元素 - O(1)
int x = a.front();   // 首元素
int y = a.back();    // 尾元素
cout << a.at(2) << a[2];

// 内存管理
a.reserve(22);       // 预分配容量，避免频繁扩容
a.resize(7);         // 改变大小
a.shrink_to_fit();   // 释放多余空间 - O(n)

// 中间操作 - O(n)
a.insert(a.begin() + 2, -1);  // 插入到a[2]
a.erase(a.begin() + x);       // 删除a[x]
a.clear();               
     // 清空
if (find(vis.begin(), vis.end(), a) == vis.end()) vis.push_back(a);
 //- 这段意思是：在 `vis` 中查找 `a`，如果没找到（即 `find(...) == vis.end()`），就把 `a` 加入 `vis` 并把状态入队。

```


# string字符串

```cpp
#include <string>
string s1;                    // 空字符串
string s2 = "123456789";      
string s3(s2, 2);             // 从第3位开始："3456789"

// 长度和访问
int len = s2.size();          // 或 s2.length()
cout << s2[i];                // 下标访问单个字符

// 字符串拼接与比较
string a1 = "12", a2 = "cd";
string a3 = a1 + a2;          // "12cd"
bool pd = a2 > a3;            // 字典序比较

// 输入输出
cin >> s1;                    // 读到空格/回车
getline(cin, s1);             // 读整行(含空格)
cout << s1;

// 类型转换
int num = stoi("123");        // 字符串 -> 整数
int bnum = stoi("1001", nullptr, 2) // 9

// 修改操作
s1.push_back('a');            // 尾部插入
s1.insert(s1.begin(), 'b');   // 开头插入
s1.erase(pos, len);           // 删除指定范围
s1.clear();                   // 清空

//排序
vector<pair<int, int>> a(n + 1);
sort(a.begin() + 1, a.begin() + n + 1,[](const pair<int,int>&x,const pair<int,int>&y){  
    if(x.first!=y.first)return x.first<y.first;  
    else return x.second>y.second;  
});

```


## tuple元组
* 替代简单结构体 
* 临时打包 
* 返回多个值

```cpp
#include <tuple>

// pair 二元组
pair<string, int> p = make_pair("wang", 1);  // 声明并初始化
int x = p.second;                            // 访问元素

// tuple 元组 - pair 的泛化
tuple<int, int, string> t1(2, 3, "pq");      // 声明三元组并初始化
t1 = make_tuple(1, 1, "Hello");              // 赋值

// 访问元素 - 使用 get<index>
int l1 = get<0>(t1);                         // 获取第一个元素
get<0>(t1) = 1;                              // 修改第一个元素

// 解包 - tie 或结构化绑定 (C++17)
int a, b; string c;
tie(a, b, c) = t1;                           // 依次赋值给变量
auto [xx, yy, zz] = t1;                      // 结构化绑定

// pair 转 tuple
tuple<string, int> t3 {p};                   // pair 转为二元 tuple
```




## queue

* 队尾插入，队首删除
* 只可查询队首 队尾
* 单向流动，排队过程，无法回退
```cpp
#include <queue>
queue<int> q;

// 入队和出队 - O(1)
q.emplace(2);         // 队尾插入, 推荐这种
q.push(2);
q.pop();              // 队首删除

// 访问和查询 - O(1)
int x = q.front();    // 队首元素
int y = q.back();     // 队尾元素
int len = q.size();
bool empty = q.empty();
```

# stack 栈

```cpp
#include <stack>
stack<int> s;

// 基本操作 - O(1)
s.push(x);            // 入栈
int y = s.top();      // 访问栈顶(不删除)
s.pop();              // 出栈

// 查询 - O(1)
int len = s.size();
bool empty = s.empty();

// 单调栈应用(P5788)
for (int i = 1; i <= n; i++) {
    // 找右边第一个更大的数
    while (!s.empty() && 
           a[i] > s.top()) {
        ans[s.top()] = i;    // 记录答案
        s.pop();
    }
    s.push(i);
}
```


## map（键值对，有序）
```cpp
#include <map>
 // 键int，值int（默认按键升序）
map<int, int> mp;  // int -> int 映射
map<char, string> m; // char -> string 映射

// 插入和访问
mp[1] = 2;                     // 建立键值对 1 -> 2
m['a'] = "Hello World!";       // 建立键值对 a -> "Hello World!"
mp.insert({2, 6});             // 插入键值对 2 -> 6

// 查找和删除 - O(log n)
auto it = mp.find(1);          // 查找键为1，不存在返回 mp.end()
mp.erase(1);                   // 删除键为1的键值对
int cnt = mp.count(1);      键是否存在(返回0或1)

// 查询 - O(1)
int len = mp.size();           // 键值对个数
bool empty = mp.empty();       // 是否为空
mp.clear();                    // 清空所有键值对

// 迭代器 - O(1)
auto a = mp.begin();           // 指向第一个元素
auto b = mp.end();             // 指向最后一个元素+1

// 边界查找 - O(log n)
auto lo = mp.lower_bound(2);   // 键值 >= 2 的第一个元素
auto hi = mp.upper_bound(2);   // 键值 > 2 的第一个元素
cout << lo->first << " " << lo->second;  // 输出键和值

    string a, b;
    map<char, int> cnt;
    cin >> a >> b;
    // 统计字符串a中前2个字符
    for (int i = 0; i < 2; i++) cnt[a[i]]++;
    // 统计字符串b中前2个字符
    for (int i = 0; i < 2; i++) cnt[b[i]]++;

    // 正确遍历map的方式：用迭代器
    for (auto it = cnt.begin(); it != cnt.end(); ++it) {
        if (it->second >= 2) {
            cout << it->first;
        }
    }
}
	
```

## deque 双向队列

* 首尾都可以插入删除

```cpp
#include <deque>
deque<int> q;

// 两端插入 - O(1)
q.push_back(2);       // 尾部插入
q.push_front(3);      // 头部插入

// 两端删除 - O(1)
q.pop_back();         // 删除队尾
q.pop_front();        // 删除队首

// 访问和查询 - O(1)
int x = q.front();    // 队首元素
int y = q.back();     // 队尾元素
int len = q.size();   // 元素个数
bool empty = q.empty();

// 中间操作 - O(n)
q.erase(q.begin() + 1);          // 删除指定位置
q.erase(q.begin() + l, 
        q.begin() + r);          // 删除区间[l,r)
q.clear();                       // 清空
```

单调队列（滑动窗口）
```cpp
// 维护窗口最小值
while (!q.empty() && a[i] < q.back())
    q.pop_back();
q.push_back(a[i]);
if (q.front() < i - k + 1)
    q.pop_front();
```


## priority_queue 优先队列

```cpp
// 1. 基础声明（大根堆：队首为最大值）
priority_queue<int> pq;
// 2. 常用操作（O(log n) 时间复杂度）
pq.push(x);          // 插入元素 x
pq.pop();            // 删除队首元素（不返回）
pq.top();            // 获取队首元素（最大值）
pq.empty();          // 判断队列是否为空（空返回 true）
pq.size();           // 返回队列元素个数

// 方式1
#include <functional>
priority_queue<int, vector<int>, greater<int>> min_pq;

// 方式2：插入负数模拟小根堆
priority_queue<int> min_pq;
min_pq.push(-x);  // 插入 x 的负数
int top = -min_pq.top();  // 取出时取反

while (!min_pq.empty()) {
    cout << min_pq.top() << " ";  // 输出：1 3 4（小根堆顺序）
    min_pq.pop();
}

// 示例1：pair 排序（优先按第一元素降序，第二元素升序）
priority_queue<pair<int, int>> pq_pair;  // 默认：first 降序，second 降序

// 自定义小根堆（first 升序，second 升序）
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> min_pq_pair;

// 示例2：自定义结构体（如边的权值+节点）
struct Edge {
    int to, weight;
    // 重载 < 运算符（定义大根堆规则：权值大的优先）
    bool operator<(const Edge& other) const {
        return weight < other.weight; / 注意：priority_queue 是“小于”比较，反向定义
    }
};
priority_queue<Edge> edge_pq;  // 大根堆：权值大的边优先
edge_pq.push({2, 10});
edge_pq.push({1, 20});
cout << edge_pq.top().weight;  // 输出：20

// 示例3：结构体小根堆（两种方式）
// 方式1：重载 > 运算符（C++11 及以上支持）
struct Node {
    int val;
    bool operator>(const Node& other) const {
        return val > other.val;
    }
};
priority_queue<Node, vector<Node>, greater<Node>> min_node_pq;

// 方式2：自定义比较函数（兼容旧编译器）
struct Cmp {
    bool operator()(const Node& a, const Node& b) {
        return a.val > b.val;  // 大的往后放，形成小根堆
    }
};
priority_queue<Node, vector<Node>, Cmp> min_node_pq2;
```


## set集合

```cpp
#include <set>
set<int> s;                   // 默认升序
set<int, greater<int>> s2;    // 降序

// 插入和删除 - O(log n)
s.insert(3);                  // 重复元素不会插入
s.erase(3);                   // 删除元素
s.clear();                    // 清空

// 查找 - O(log n)
auto it = s.find(3);          // 找不到返回 s.end()
int cnt = s.count(3);         // 是否存在(返回0或1)

// 边界查找 - O(log n)
auto lo = s.lower_bound(3);   // >= 3 的第一个
auto hi = s.upper_bound(3);   // > 3 的第一个
cout << *lo;                  // 解引用获取值

// multiset：允许重复
multiset<int> ms = {4, 2, 5, 2, 1};
ms.count(2);                  // 返回 2
// 输出顺序：1 2 2 4 5

//set::insert 返回一个pair，
//其中第二个元素（second）是一个bool，表示是否插入成功（即元素之前不在集合中）。
    // 第一次插入5
    auto result1 = s.insert(5);
    cout << "插入5: " << result1.second << endl;  
    // 输出1（true）
    
    // 第二次插入5
    auto result2 = s.insert(5);
    cout << "再次插入5: " << result2.second << endl;  
    //输出0（false）
```

## array 固定数组

```cpp
#include <array>
array<int, 110> arr{1, 2, 3, 4};  // 固定大小

// 访问元素
int x = arr[1];       // 不检查越界
int y = arr.at(2);    // 检查越界，抛异常
arr.front() = 4;      // 首元素
arr.back() = 6;       // 尾元素

// 填充
arr.fill(5);          // 所有元素赋值为5

// 比较操作
array<int, 110> b{9, 8, 7};
bool pd = arr < b;    // 字典序比较

// size() 和 empty() 意义不大
// 因为大小固定

```

### 其他
```cpp
// unique: 去重（需先排序）
vector<int> v2 = {1, 1, 2, 2, 3, 3};
sort(v2.begin(), v2.end());
v2.erase(unique(v2.begin(), v2.end()), 
         v2.end());
// v2 = {1, 2, 3}
```

```cpp
// count: 计数
vector<int> v3 = {1, 2, 3, 2, 2};
int cnt = count(v3.begin(), v3.end(), 2);
// cnt = 3
```

```cpp
// accumulate: 求和
#include <numeric>
vector<int> v4 = {1, 2, 3, 4, 5};
int sum = accumulate(v4.begin(), v4.end(), 0);//0+开始
// sum = 15

// 自定义累积操作
int product = accumulate(v4.begin(), v4.end(), 1,
    [](int a, int b) { return a * b; });//1*开始
// product = 120
```

### 秩代器

**** 有序序列容器（必须已排序）
```cpp
#include <algorithm>
#include <vector>
#include <set>

std::vector<int> vec = {1, 3, 5, 7, 9};
// 必须先排序
std::sort(vec.begin(), vec.end());
auto it = std::lower_bound(vec.begin(), vec.end(), 5);

std::array<int, 5> arr = {1, 3, 5, 7, 9};
auto it2 = std::lower_bound(arr.begin(), arr.end(), 4);

std::deque<int> dq = {1, 3, 5, 7, 9};
auto it3 = std::lower_bound(dq.begin(), dq.end(), 6);
```


****  关联容器（天然有序）
```cpp
#include <set>
#include <map>

std::set<int> s = {1, 3, 5, 7, 9};
// 使用成员函数版本（更高效）
auto it = s.lower_bound(4);

std::map<int, string> m = {{1, "a"}, {3, "c"}, {5, "e"}};
auto it2 = m.lower_bound(2);

std::multiset<int> ms = {1, 3, 3, 5, 7};
auto it3 = ms.lower_bound(3);
```

****  字符串（当作为字符序列时）
```cpp
#include <string>
#include <algorithm>
std::string str = "acdfg";
// 字符串必须已排序
std::sort(str.begin(), str.end());
auto it = std::lower_bound(str.begin(), str.end(), 'b');
```

****  示例
```cpp
#include <iostream>
#include <vector>
#include <set>
#include <algorithm>
int main() {
    // 示例1：vector（需要先排序）
    std::vector<int> vec = {9, 1, 7, 3, 5};
    std::sort(vec.begin(), vec.end());
    auto it_vec = std::lower_bound(vec.begin(), vec.end(), 4);
    if (it_vec != vec.end()) {//*it 指向的值
        std::cout << "在vector中找到第一个 >=4 的元素: " << *it_vec << std::endl;
    }
    
    // 示例2：set（天然有序）
    std::set<int> s = {1, 3, 5, 7, 9};
    auto it_set = s.lower_bound(4);
    if (it_set != s.end()) {
        std::cout << "在set中找到第一个 >=4 的元素: " << *it_set << std::endl;
    }
    return 0;
}
```

#### 总结
- **有序序列容器**：`vector`, `array`, `deque`, `string`（需要先调用 `sort()`）
- **关联容器**：`set`, `map`, `multiset`, `multimap`（天然有序）
- 对于关联容器，优先使用成员函数版本的 `lower_bound`
- 返回的迭代器指向第一个 **不小于** 给定值的元素


## stl排序

#### `vector<vector<int>>`

#### 1.按内层 vector 的大小（元素个数）排序
```cpp
sort(vec.begin(), vec.end(), [](const vector<int>& a, const vector<int>& b) {
    return a.size() < b.size();   // 升序
});
```

#### 2. 按内层 vector 的元素和排序
```cpp
sort(vec.begin(), vec.end(), [](const vector<int>& a, const vector<int>& b) {
    int sumA = accumulate(a.begin(), a.end(), 0);
    int sumB = accumulate(b.begin(), b.end(), 0);
    return sumA < sumB;   // 升序
});
```

#### 3. 按内层 vector 的第一个元素排序
```cpp
sort(vec.begin(), vec.end(), [](const vector<int>& a, const vector<int>& b) {
    return a[0] < b[0];   // 假设每个内层 vector 非空
});
```

#### 4. 按内层 vector 的最大值排序
```cpp
sort(vec.begin(), vec.end(), [](const vector<int>& a, const vector<int>& b) {
    int maxA = *max_element(a.begin(), a.end());
    int maxB = *max_element(b.begin(), b.end());
    return maxA < maxB;
});
```

#### 5. 多级排序：先按大小，再按第一个元素
```cpp
sort(vec.begin(), vec.end(), [](const vector<int>& a, const vector<int>& b) {
    if (a.size() != b.size()) return a.size() < b.size();
    if (a.empty() || b.empty()) return a.size() < b.size(); // 处理空 vector
    return a[0] < b[0];
});
```

#### 6. 按字典序比较整个内层 vector（逐元素比较）
```cpp
sort(vec.begin(), vec.end(), [](const vector<int>& a, const vector<int>& b) {
    return lexicographical_compare(a.begin(), a.end(), b.begin(), b.end());
});
// 或直接使用 vector 的 operator<（如果定义了）
// sort(vec.begin(), vec.end()); // 默认按字典序升序
```

---

### 自定义结构体（struct）排序

假设有一个结构体 `Student`：
```cpp
struct Student {
    string name;
    int age;
    double score;
    int id;
    vector<int> grades;   // 嵌套容器
};
```

### 1. 按单个字段排序
#### 按 age 升序
```cpp
sort(stu.begin(), stu.end() , [](const Student& a, const Student& b) {
    return a.age < b.age;
});
```

#### 2. 多字段组合排序

#### 先按 age 升序，年龄相同按 score 降序
```cpp
sort(stu.begin(), stu.end(), [](const Student& a, const Student& b) {
    if (a.age != b.age) return a.age < b.age;
    return a.score > b.score;
});
```

#### 使用 `std::tie` 简化多级排序（需 `<tuple>`）
```cpp
sort(stu.begin(), stu.end(), [](const Student& a, const Student& b) {
    return tie(a.age, b.score) < tie(b.age, a.score); // 注意：score 降序需交换位置
});
```
但直接写 if 语句更直观，不易出错。

### 3. 按嵌套容器属性排序

#### 按 grades 的平均分排序
```cpp
sort(stu.begin(), stu.end(), [](const Student& a, const Student& b) {
    double avgA = a.grades.empty() ? 0.0 : accumulate(a.grades.begin(), a.grades.end(), 0.0) / a.grades.size();
    double avgB = b.grades.empty() ? 0.0 : accumulate(b.grades.begin(), b.grades.end(), 0.0) / b.grades.size();
    return avgA > avgB;   // 降序
});
```

#### 按 grades 的最大值排序
```cpp
sort(stu.begin(), stu.end(), [](const Student& a, const Student& b) {
    int maxA = *max_element(a.grades.begin(), a.grades.end());
    int maxB = *max_element(b.grades.begin(), b.grades.end());
    return maxA < maxB;
});
```

#### 按 grades 的大小排序
```cpp
sort(stu.begin(), stu.end(), [](const Student& a, const Student& b) {
    return a.grades.size() < b.grades.size();
});
```

### 4. 按指针或智能指针成员排序

假设结构体中有指针成员：
```cpp
struct Node {
    int* ptr;
    int value;
};
```

#### 按指针指向的值排序
```cpp
sort(nodes.begin(), nodes.end(), [](const Node& a, const Node& b) {
    return *(a.ptr) < *(b.ptr);   // 确保指针非空
});
```

#### 对 `vector<unique_ptr<Student>>` 排序
```cpp
sort(v.begin(), v.end(), [](const unique_ptr<Student>& a, const unique_ptr<Student>& b) {
    return a->age < b->age;   // 按年龄升序
});
```

### 5. 按成员函数的返回值排序

假设 Student 有一个成员函数 `double getGPA() const`：
```cpp
sort(stu.begin(), stu.end(), [](const Student& a, const Student& b) {
    return a.getGPA() > b.getGPA();   // 降序
});
```

---

### `vector<tuple<...>>` 排序

#### 1. 按 tuple 的某个元素排序
```cpp
vector<tuple<int, string, double>> vt;
sort(vt.begin(), vt.end(), [](const auto& a, const auto& b) {
    return get<1>(a) < get<1>(b);   // 按第二个元素（string）升序
});
```

#### 2. 多级排序：先按第一个元素，再按第三个元素
```cpp
sort(vt.begin(), vt.end(), [](const auto& a, const auto& b) {
    if (get<0>(a) != get<0>(b)) return get<0>(a) < get<0>(b);
    return get<2>(a) > get<2>(b);   // 第三个元素降序
});
```

---

###  `vector<array<T, N>>` 排序

`array` 是固定大小的容器，可像普通变量一样比较。
pair同样处理

```cpp
vector<array<int, 3>> va;
sort(va.begin(), va.end());   // 默认按字典序比较整个 array
```

自定义规则（如按第二个元素）：
```cpp
sort(va.begin(), va.end(), [](const array<int,3>& a, const array<int,3>& b) {
    return a[1] < b[1];
});
```
---

### 对 `map` 或 `unordered_map` 的键值对排序（转为 vector）

无法直接对关联容器排序，通常将元素复制到 `vector<pair<Key, Value>>` 再排序。

```cpp
map<string, int> m = {{"apple", 5}, {"banana", 2}, {"cherry", 8}};
vector<pair<string, int>> v(m.begin(), m.end());

// 按键（string）升序
sort(v.begin(), v.end(), [](const auto& a, const auto& b) {
    return a.first < b.first;
});

// 按值（int）降序
sort(v.begin(), v.end(), [](const auto& a, const auto& b) {
    return a.second > b.second;
});
```

---

### 部分排序与稳定排序

### 1. 稳定排序（保持相等元素的相对顺序）
```cpp
stable_sort(v.begin(), v.end(), [](const Student& a, const Student& b) {
    return a.age < b.age;
});
```

### 2. 只排序前 k 个元素
```cpp
partial_sort(v.begin(), v.begin() + k, v.end(), [](const Student& a, const Student& b) {
    return a.score > b.score;   // 找出分数最高的前 k 个
});
```
