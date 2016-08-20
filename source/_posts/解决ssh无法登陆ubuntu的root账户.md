---
title: 解决ssh无法登陆ubuntu的root账户
date: 2016-08-20 20:57:39
tags: ['linux']
categories: linux
---

我一直使用的是腾讯云的CentOS系统，使用密钥登陆服务器。但是如果是ubuntu的话默认情况是没有
root的，而添加root需要密码，而腾讯云的服务器密钥和密码只能使用一个。如果选择密钥他就会给你
弄个随机的密码。之前一直不知道这件事。 如果知道的话问题就很好解决。
1. 重装系统，设置密码，*不要使用密钥*。
2. 设置root账户。
  ```
  sudo passwd root
  ```
3. 修改配置
  /etc/ssh/sshd_config 修改该配置文件：
  # Authentication:
  LoginGraceTime 120
  PermitRootLogin without-password
  StrictModes yes
  将 PermitRootLogin without-password  修改为 PermitRootLogin yes
4. 重启ssh
  这个版本不同重启的命令也不同，建议直接重启服务器。
