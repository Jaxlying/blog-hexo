---
title: 解决gradle构建java是没有清单属性错误
date: 2016-11-18 20:26:55
tags: ['java']
categories: ['后端']
---
试着自己写了个gradle构建脚本，构建成功之后运行jar包报错没有清单属性。
查资料发现简单点来说就是没有配置主入口。
```
jar {
    manifest {
        attributes 'Main-Class': 'package name'
    }
}
```
配置之后运行ok。
