
#  完全背包问题

* 你有一个背包，最多能容纳的体积是V。
现在有n种物品，==每种物品有任意多个==，第i种物品的体积为vi​ ,价值为wi
（1）求这个背包至多能装多大价值的物品？
（2）若背包恰好装满，求至多能装多大价值的物品？

```cpp
void solve() {  
    int n, V;  
    cin >> n >> V;  
    vector<int> v(n + 1), w(n + 1);  
    for (int i = 1; i <= n; i++)cin >> v[i] >> w[i];  
    vector<int> dp(V + 1, 0);  
    for (int i = 1; i <= n; i++) {  
        for (int j = v[i]; j <= V; j++) {  
            dp[j] = max(dp[j], dp[j - v[i]] + w[i]);  
        }  
    }  
      
    vector<int> dp1(V + 1, -inf);  
    dp1[0] = 0;  
    for (int i = 1; i <= n; i++) {  
        for (int j = v[i]; j <= V; j++) {  
            if (dp1[j - v[i]] != -inf) {  
                dp1[j] = max(dp1[j], dp1[j - v[i]] + w[i]);  
            }  
        }  
    } 
 // 转移条件 dp1[j - v[i]] != -inf：
 //只有当体积 j - v[i] 可以恰好装满时，才能用它来转移。
 // 例如：体积 j = 5，物品体积 v[i] = 2，那么 j -        v[i] = 3。
 // 如果 dp1[3] = -inf，表示无法恰好装满体积 3，那么不能用它来装这个物品。
 //如果 dp1[3] = 7，表示可以恰好装满体积 3，那么可以装这个物品，体积变成 5，价值变成 7 + w[i]。

    cout << dp[V] << '\n';  
    cout << ((dp1[V] < 0) ? 0 : dp1[V]) << '\n';   //注意！！！
    / 错误：cout << (dp1[V] < 0) ? 0 : dp1[V] << '\n';
    //C++ 里，<< 的优先级比 ? : 高
    //错误写法 会先输出 dp1[V] < 0 的布尔值（0 或 1），然后根据这个布尔值去决定输出 0 还是 dp1[V] << '\n'。
}
```

# 01背包

* 你有一个背包，最大容量为V，现有 n件物品，第 i 件物品的体积为 vi​价值为wi​。研究人员提出以下两种装填方案：  
（1). 不要求装满背包，求能获得的最大总价值；  
  (2)​ 要求最终**恰好装满**背包，求能获得的最大总价值。若不存在使背包恰好装满的装法，则答案记为 0

```cpp

void solve() {
    int n, V;
    cin >> n >> V;
    vector<int> v(n + 1), w(n + 1);
    for (int i = 1; i <= n; i++)cin >> v[i] >> w[i];
    vector<int> dp(V + 1, 0);
    for (int i = 1; i <= n; i++) {
        for (int j = V; j >= v[i]; j--) {
            dp[j] = max(dp[j], dp[j - v[i]] + w[i]);
        }
    }

    vector<int> dp1(V + 1, -inf);
    dp1[0] = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = V; j >= v[i]; j--) {
            if (dp1[j - v[i]] != -inf) {
                dp1[j] = max(dp1[j], dp1[j - v[i]] + w[i]);
            }
        }
    }

    cout << dp[V] << '\n';
    cout << ((dp1[V] < 0) ? 0 : dp1[V]) << '\n'; //注意！！！
}

```

#总结 
* 1. 物品限制：01背包每种物品仅1个（选/不选），完全背包每种物品无限个（可重复选）；

* 2. 遍历顺序：01背包用容量逆序（防重复选），完全背包用容量正序（允许重复选）；

* 3. 状态依赖：01背包依赖上一轮旧状态，完全背包可依赖本轮新状态；

* 4. 场景差异：01背包对应“不可重复选”场景（如选装备），完全背包对应“可重复选”场景（如硬币找零）。


# 最长上升子序列

### 普通

```cpp

//最长递增子序列（LIS）的经典动态规划实现，核心是用 dp 数组记录“以每个元素为结尾的最长递增子序列长度”，最后取最大值就是整个序列的LIS长度。

void solve() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    vector<int> dp(n, 1);
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (a[i] > a[j])dp[i] = max(dp[i], dp[j] + 1);
        }
    }
    int ans = *max_element(dp.begin(), dp.end());
    cout << ans << '\n';
}
#补充
// 方法 1：使用迭代器
auto it = max_element(dp.begin(), dp.end());
int max_len = *it;

// 方法 2：直接解引用
int max_len = *max_element(dp.begin(), dp.end());
```

### 优化

```cpp
void solve (){
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) {
        cin >> nums[i];
    }
      // 存“最小末尾”是为了给后续元素留更大空间（末尾越小，越容易接更大的数）
    vector<int> tail;          
    vector<int> tail; // 存储各长度子序列的最小末尾元素
    for (int x : nums) {
        // 二分查找第一个 >= x 的位置（严格上升，用lower_bound）
        auto it = lower_bound(tail.begin(), tail.end(), x);
        if (it == tail.end()) {
            tail.push_back(x); // x 是最大的，子序列长度+1
        } else {
            *it = x; // 替换为更小的末尾元素，优化后续可能性
        }
    }
    
    cout << tail.size() << endl; 
    }// tail长度即答案

```


# 数位dp

##  前置操作

```cpp
#include <bits/stdc++.h>
using namespace std;
using i64 = long long;
const i64 mod = 998244353;

vector<int> dig; 
// 存储数字n的每一位（高位→低位）
// 把数字n拆成数位数组dig
void init(i64 n) {
    dig.clear();
    if (n == 0) dig.push_back(0);
    while (n) {
        dig.push_back(n % 10);
        n /= 10;
    }
    reverse(dig.begin(), dig.end());
}
```

## 数位dp(进位)

 前提准备：
 1. pp[0~9]：数字0-9的概率/计数（七段管题是概率，纯计数题全为1）
 2. num[0~3]：C的四位拆分 [个位, 十位, 百位, 千位]
 3. mod：模数（如998244353，计数题可省略）
 4. 
```cpp
constexpr i64 mod = 998244353; 
vector<vector<i64>> dp(5, vector<i64>(2, 0));
dp[0][0] = 1; 
// 初始状态：未处理，无进位，概率/计数=1
//dp[i][j]：处理完前i位（0=未开始，1=个位，2=十位，3=百位，4=千位），进位j(0/1)的概率/计数
// 逐位处理：从个位→十位→百位→千位（共4位）

for (int i = 0; i < 4; i++) {
    vector<vector<i64>> ndp(5, vector<i64>(2, 0)); // 新状态，每次重置
    for (int j = 0; j < 2; j++) { // 枚举当前进位：0/1
        if (dp[i][j] == 0) continue; // 无贡献，跳过
        // 枚举当前位A、B的数字（0-9）
        for (int a = 0; a < 10; a++) {
            for (int b = 0; b < 10; b++) {
                int sum = a + b + j;    // 当前位和 = A位 + B位 + 上一位进位
                int cur_digit = sum % 10; // 当前位结果（要匹配C的对应位）
                int new_carry = sum / 10; // 新进位（0/1，两数相加最大进位1）
                if (cur_digit == num[i]) { // 匹配C的第i位，才转移
                    ndp[i+1][new_carry] = (ndp[i+1][new_carry] + dp[i][j] * pp[a] % mod * pp[b] % mod) % mod;
                    // 纯计数题去掉模运算和pp：ndp[i+1][new_carry] += dp[i][j];
                }
            }
        }
    }
    swap(dp,ndp); // 更新状态为新状态
}

i64 ans = dp[4][0]; // 答案：处理完4位，最终无进位的概率/计数
```


## 模板1：不含指定数字

题型：统计 [0,n] 中不包含数字4的数的个数（最入门）

```cpp
vector<vector<i64>> memo;
// dfs(pos, limit)：处理到第pos位，是否受上限位数限制（limit=1受限制，0不受）

i64 dfs(int pos, bool limit) {
    if (pos == dig.size()) return 1; // 遍历完所有位，找到1个合法数
    if (memo[pos][limit] != -1) return memo[pos][limit]; // 记忆化直接返回
    
    int maxd = limit ? dig[pos] : 9; // 当前位能选的最大值
    
    i64 res = 0;
    for (int d = 0; d <= maxd; d++) {
        if (d == 4) continue; // 核心条件：跳过数字4
        bool new_limit = limit && (d == maxd); // 新的限制状态
        res += dfs(pos + 1, new_limit);
        // res = (res + dfs(pos+1, new_limit)) % mod; // 模运算按需加
    }
    return memo[pos][limit] = res;
}

i64 calc(i64 n) {
    init(n);
    memo.assign(dig.size(), vector<i64>(2, -1)); // 状态：pos(位数) × limit(2种)
    return dfs(0, true);
}
// 调用示例：统计[l,r]中不含4的数 → calc(r) - calc(l-1)
```

拓展：不含连续数字62
只需在dfs加前一位数字参数，状态改为
```cpp
memo [pos][pre][limit]
//循环中判断pre==6 && d==2跳过即可。
```


## 模板2：数字和型 - 数字各位和为k

题型：统计 [0,n] 中各位数字之和等于k的数的个数
```cpp

vector<vector<vector<i64>>> memo;
int target; // 目标和k
// dfs(pos, sum, limit)：处理到pos位，当前数字和为sum，是否受限制
i64 dfs(int pos, int sum, bool limit) {
    if (pos == dig.size()) return sum == target ? 1 : 0; // 遍历完，和为k则合法
    if (memo[pos][sum][limit] != -1) return memo[pos][sum][limit];
    
    int maxd = limit ? dig[pos] : 9;
    i64 res = 0;
    for (int d = 0; d <= maxd; d++) {
        if (sum + d > target) break; // 关键！！剪枝：和超过k，直接跳过
        bool new_limit = limit && (d == maxd);
        res += dfs(pos + 1, sum + d, new_limit);
    }
    return memo[pos][sum][limit] = res;
}

i64 calc(i64 n, int k) {
    target = k;
    init(n);
    // 状态：pos × sum(最大和为9*位数，如10位数最大81) × limit
    memo.assign(dig.size(), vector<i64>(9*dig.size()+1, vector<i64>(2, -1)));
    return dfs(0, 0, true);
}
// 调用示例：calc(r, 10) - calc(l-1, 10) → [l,r]中和为10的数
```

## 模板3：前导零型 - 不含前导零的合法数
（如回文数/无连续0）

题型：统计 [0,n] 中无前导零的回文数（高频）
```cpp
vector<vector<vector<vector<i64>>>> memo;
// dfs(pos, pre, lead, limit)：pos位，前一位pre，是否前导零lead，是否受限制limit
i64 dfs(int pos, int pre, bool lead, bool limit) {
    if (pos == dig.size()) return lead ? 0 : 1; // 前导零不算合法数
    if (memo[pos][pre][lead][limit] != -1) return memo[pos][pre][lead][limit];
    
    int maxd = limit ? dig[pos] : 9;
    i64 res = 0;
    for (int d = 0; d <= maxd; d++) {
        if (lead) { // 前导零状态下，当前位选0，继续前导零
            res += dfs(pos + 1, d, true, limit && (d == maxd));
        } else { // 非前导零，核心条件：当前位=前一位（回文）
            if (d == pre) {
                res += dfs(pos + 1, d, false, limit && (d == maxd));
            }
        }
    }
    return memo[pos][pre][lead][limit] = res;
}

i64 calc(i64 n) {
    init(n);
    // 状态：pos × pre(0-9) × lead(2) × limit(2)
    memo.assign(dig.size(), vector<i64>(10, vector<i64>(2, vector<i64>(2, -1))));
    return dfs(0, 0, true, true);
}
```

核心参数：lead（前导零标记），前导零的数不算合法数（如0012不算回文数，121才算）


## 模板4：进位型 
两数相加A+B=C
题型：统计 [0,n]×[0,m] 中A+B=C的数对/概率（带进位）
```cpp
// 适配：四位数A+B=C，pp[0-9]为数字0-9的概率/计数
i64 add_calc(int C, vector<i64>& pp) {
    vector<int> num(4, 0); // C的四位拆分：[个位,十位,百位,千位]
    num[0] = C % 10; num[1] = (C/10)%10; num[2] = (C/100)%10; num[3] = C/1000;
    // dp[i][j]：处理前i位，进位j(0/1)的概率/计数
    vector<vector<i64>> dp(5, vector<i64>(2, 0));
    dp[0][0] = 1; // 初始：未处理，无进位，值为1
    
    for (int i = 0; i < 4; i++) {
        vector<vector<i64>> ndp(5, vector<i64>(2, 0));
        for (int j = 0; j < 2; j++) { // 枚举上一位进位
            if (dp[i][j] == 0) continue;
            for (int a = 0; a < 10; a++) { // 枚举A的当前位
                for (int b = 0; b < 10; b++) { // 枚举B的当前位
                    int sum = a + b + j;
                    int cur = sum % 10; // 当前位结果
                    int carry = sum / 10; // 新进位
                    if (cur == num[i]) { // 匹配C的当前位
                        ndp[i+1][carry] = (ndp[i+1][carry] + dp[i][j] * pp[a] % mod * pp[b] % mod) % mod;
                    }
                }
            }
        }
        dp.swap(ndp);
    }
    return dp[4][0]; // 处理完4位，无最终进位
}
```

## 操作序列最大可达值


```cpp
void solve() {  
    int n;  
    cin >> n;  
    vector<int> a(n + 1), b(n + 1);  
    for (int i = 1; i <= n; ++i) cin >> a[i];  
    for (int i = 1; i <= n; ++i) cin >> b[i];  
  
    vector<int> dp(mxv);  
    dp[0] = 1;  
    for (int i = 1; i <= n; i++) {  
        vector<int> ndp(mxv);  
        for (int j = 0; j < mxv; j++) {  
            if (dp[j]) {  
                int aa = max(0, j - a[i]), bb = j ^ b[i];  
                ndp[aa] = 1;  
                ndp[bb] = 1;  
            }  
        }  
        swap(dp, ndp);  
    }  
  
    int ans = 0;  
    for (int i = mxv - 1; i >= 0; i--) {  
        if (dp[i]) {  
            ans = i;  
            break;  
        }  
    }   
    cout << ans << '\n';  
}
```

## DP合并计数：右向左 + 模10

```cpp

void solve() {  
    int n;  
    cin >> n;  
    vector<int> a(n);  
  
    for (int i = 0; i < n; i++) {  
        cin >> a[i];  
        if (n == 1 && a[0] >= 10) {  
            for (int i = 0; i < 10; i++) cout << 0 << ' ';  
            return;  
        }  
        a[i] %= 10;  
    }  
  
    vector<i64> dp(10, 0);  
  
    // 初始化：最后一个数字，方案数为1  
    dp[a[n - 1]] = 1;  
  
    // 从右向左处理数组（因为每次操作最后两个数）  
    for (int i = n - 2; i >= 0; i--) {  
        // 新状态数组  
        vector<i64> np(10, 0);  
        // 遍历所有可能的结果（0-9）  
        for (int d = 0; d < 10; ++d) {  
            // 优化：如果dp[d]为0，跳过  
            if (dp[d] == 0) continue;  
  
            // 两种操作结果  
            int ad = (a[i] + d) % 10;  // 加法取个位  
            int mu = (a[i] * d) % 10;  // 乘法取个位  
  
            // 状态转移：方案数累加  
            np[ad] = (np[ad] + dp[d]) % mod;  
            np[mu] = (np[mu] + dp[d]) % mod;  
        }  
          
        // 更新dp数组（三种方式等价）  
        dp = move(np);  // 移动语义，高效  
        // swap(dp, np); // 交换方式，同样高效  
        // dp = np;      // 复制方式，效率较低  
    }  
  
    for (int i = 0; i < 10; ++i)  cout << dp[i] << ' ';  
}
```
