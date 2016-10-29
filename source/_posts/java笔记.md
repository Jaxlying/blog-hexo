---
title: java笔记
date: 2016-10-28 14:40:51
tags: ['java']
categories:
---
记录一些常用的但是我记不住的java用法。
<!-- more -->

* 结束某线程
	使用interrupt()方法。但调用之后不会结束线程会抛出InterruptedException异常，
	捕获该异常并使用break退出死循环。

* 接口的default方法
	```
	interface IF{
	    void fun1();
	    void fun2();
	    default void fun3(){
    		//code
    	}
	}
	```

* 精准测量程序运行时间
	```
	long start =  System.currentTimeMillis();
	//code
	long time =  System.currentTimeMillis() - start;
	```