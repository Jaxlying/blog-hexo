---
title: 对spring-mvc的理解
date: 2016-11-21 22:32:45
tags: ['java','spring','spring-mvc']
categories:
---
首先说spring-boot，spring-boot是一个快速搭建基于spring应用的一个框架（框架这个词或许不对），这里我
使用spring—boot搭建一个spring项目。
<!-- 关于‘如何创建一个spring-boot项目’的方法很多，因为最近在看gradle，出于练习所以我
使用gradle创建一个spring-boot项目。在gradle中加入需要的依赖。 -->
去[这里](http://start.spring.io)生成一个项目，加入web的依赖，然后下载下来，使用ide
打开它。

简单看一下目录结构。
![mulu](/images/article/springmvc1.png)

* Hello world
更改 /src/main/java/com/example/DemoApplication.java

```
package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

	@RequestMapping("/hello")
	public String hello(){
		return "Hello World";
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}
```
然后运行项目，打开浏览器，访问 http://localhost:8080 就可以在浏览器看到Hello World。

关于main方法
```
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
```
1. SpringApplication 是spring boot中的应用类，该类的run方法会创建应用并且自动扫描依赖，因为我在创建
spring-boot项目的时候添加了spring-webmvc的依赖，spring boot会自动处理该依赖，并且创建一个内嵌的
Servlet容器用于处理http的各种请求。
2. Servlet容器会将接收来的http请求分给@Controller或@RestController类进行处理。

```
	@RequestMapping("/hello")
	public String hello(){
		return "Hello World";
	}
```
@RequestMapping注解表明该方法去处理对应的url请求。上述代码，用于处理访问http://localhost:8080/hello
的请求

挖个坑，未完。