---
title: gradle尝试
date: 2016-11-10 23:51:07
tags: ['java']
categories:
---
以前构建项目的时候都用maven，感觉也很方便，最起码不用手动下载各种依赖包，想用什么
去中央仓库搜一下，然后添加到pom.xml，就能自动帮忙处理依赖问题。
最近入坑安卓，发现安卓的默认构建工具是gradle，感觉google默认用它不是没有道理的，
简单的查了一下gradle，貌似比maven更爽。
gradle有很多特性，网上一搜一大把，这里不过分赘述，只是简单的记一下常用的几个命令
方法，方便以后查阅。

* 安装(windows)
	1. [下载](https://gradle.org/gradle-download/)
	2. 配置环境变量
		1. 添加一个 GRADLE_HOME 环境变量来指明 Gradle 的安装路径
		2. 添加%GRADLE_HOME%/bin到path
* 使用
	```
	gradle -q hello
	```
	-q 代表quiet模式，不会输出日。



