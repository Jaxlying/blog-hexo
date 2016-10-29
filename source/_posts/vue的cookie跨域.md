---
title: vue的cookie跨域
date: 2016-10-26 20:40:04
tags: ['vue','前端']
categories:
---
最近在做一个项目，前端用的vue，当用vue-resource时，有一步涉及到cookie跨域。在网
上找了好多，发现都不能用，可能已经被废掉了吧。最后在vue的github issues中找到了解
决办法。
<!-- more -->
```
Vue.http.interceptors.push((request, next) => {
    request.credentials = true
    next()
})
```
