

---

title: Dijkstra's algorithm
date: 2020-04-28 20:16:41
tags:
- algorithm
- shortest path
categories: algorithm

---

# Dijkstra's Algorithm

> If 10 years from now, when you are doing something quick and dirty, you suddenly visualize that I am looking over your shoulders and say to yourself "Dijkstra would not have liked this.", well, that would be enough immortality for me.    — E.W.Dijkstra
如果十年以后，你以快而脏的方式做什么事的时候，能想象我在你的肩后看着，然后对自己说：「Dijkstra 不会希望这样的。」那么对我来说，这就和永生一样了。
>

适用于单源点最短路径，通常不能计算负权。时间复杂度O(n^2)。

## 思想

### 测试

定义两个集合P、Q，表示已求出和未求出最短路径的顶点集；
从源点s出发，找到距离最近的点a直接放入P，显然s->a就是该点到源点的最短路径；
遍历集合Q中的点，将其命名为b，通过`a->s->b`缩短ab的距离，即判断`as+sb`是否小于`ab`（此过程名为“松弛”），
在Q中找到距离源点第二近的点，此时这个点已经进行过“松弛”，故该点到源点的距离也是最短，
然后重复以上过程，即可得到源点到其它所有点的最短路径。


## 注意

若存在点权，应特别注意源点s。因为在第一步中直接将s添加到P，松弛过程中不会再计算s的点权

## 代码

```c
// 默认源点为s，图为e
for (int i = 1; i <= n; i++) {
    dis[i] = e[s][i];
}
p[s] = true;

for (int i = 1; i <= n; i++) {
    min = INF;
    for (int j = 1; j <= n; j++) {
        if (!p[j] && dis[j] < min) {
            min = dis[j];
            u = j;
        }
    }
    p[u] = true;
    if (u == -1) break;

    for (int v = 1; v <= n; v++) {
        if (!p[v] && e[u][v] != INF) {
            if (dis[v] > dis[u] + e[u][v]) {
                dis[v] = dis[u] + e[u][v];
            }
        }
    }
}

```

## 参考链接

[https://wiki.jikexueyuan.com/project/easy-learn-algorithm/dijkstra.html](https://wiki.jikexueyuan.com/project/easy-learn-algorithm/dijkstra.html)