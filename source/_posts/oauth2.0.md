---
title: OAuth2.0
date: 2016-07-03 14:44:20
tags: ['java','auth2.0']
categories:
---

### 1. 什么是OAuth
[OAuth](https://zh.wikipedia.org/wiki/OAuth)（开放授权）是一个开放标准，允许用户让第三方应用访问该用户在某一网站上存储的私密的资源（如照片，视频，联系人列表），而无需将用户名和密码提供给第三方应用。用户可以通过令牌访问他们存放在特定服务提供者的数据。每一个令牌授权一个特定的网站，在特定的时段（例如，接下来的2小时内，或者到浏览器关闭之前）内访问特定的资源（例如用户昵称或者用户头像的内容）。这样，OAuth让用户可以授权第三方网站访问他们存储在另外服务提供者的某些特定信息，而非所有内容。<!--more-->
### 2. OAuth2.0的认证流程
<img id= "oauth" src="oauth.png">
在OAuth2.0的处理流程，主要分为以下四个步骤：
* 1、得到授权码code
* 2、获取access_token
* 3、通过access_token,获取OpenID
* 4、通过access_token及OpenID调用API,获取用户授权信息

### 3. 关于接口调用
从上图可知我们在调用易班API的时候必须提供access_token，而access_token的获取必须先经过授权。

以下是授权流程:
![易班认证流程](https://o.yiban.cn/wiki/pic/wiki8_2_3.png)
* 如何授权
> 
https://openapi.yiban.cn/oauth/authorize?client_id=APPID&redirect_uri=CALLBACK&display=html
其中：
  APPID为应用的AppID，在管理中心应用信息中可见
  CALLBACK为授权回调地址，在管理中心应用信息中可见

调用授权接口之后会返回一个verify_request，通过对verify_request进行解密会的到授权信息。
易班轻应用框架服务通过get方式在易班客户端webview或浏览器重定向加载应用实际地址，以提供给应用用户授权状态和基本信息数据。使用了AES-128-CBC对称加密算法。

授权成功的信息:
> 
{
  "visit_time":访问unix时间戳,
  "visit_user":{
    "userid":"易班用户ID",
    "username":"易班用户名",
    "usernick":"易班用户昵称",
    "usersex":"易班用户性别"
  },
  "visit_oauth":{
    "access_token":"授权凭证",
    "token_expires":"有效unix时间戳"
  },
}

未授权时的信息：
> 
{
  "visit_time":访问unix时间戳,
  "visit_user":{
    "userid":"易班用户ID"
  },
  "visit_oauth":false
}

授权成功之后返回的信息中就有access_token


[完整源代码](https://github.com/Jaxlying/ybinterface)

文章参考   
      [RFC 6749](http://www.rfcreader.com/#rfc6749)
      [维基百科](https://zh.wikipedia.org/wiki/OAuth)
      [易班wiki文档](https://o.yiban.cn/wiki/)
