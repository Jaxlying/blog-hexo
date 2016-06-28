---
title: linux开发环境搭建
date: 2016-06-05 23:16:19
tags: ['linux']
categories: linux
---
以下记录我在linux系统下搭建开发环境的时候所安装的软件，防止哪天重装系统的时候不知道该装点啥软件

1. 科学上网
    1. [shadowsocks](https://github.com/shadowsocks/shadowsocks-qt5/wiki/%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97)小飞机
    2. [lantern](https://getlantern.org/) 蓝灯也不错。不用配置服务器。
2. 终端强化工具zsh(强烈推荐)
    ```
    sudo dnf install zsh
    ```
    <!-- more -->
    这是有人写好的配置文件[oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)
2. 浏览器
    2. [google-chrome](https://www.google.com/chrome/)(强烈推荐，虽然比较吃内存，但真的很强大)
    1. firefox
        linux一般都自带吧。下载插件foxyproxy配合小飞机使用更佳。
        代理的话我的谷歌可以直接用系统代理，火狐不能我也不知道为啥。
3. 输入法
    1. redhat的一般都自带智能拼音。
    2. 搜狗拼音
      1. [deb包](http://pinyin.sogou.com/linux/?r=pinyin)
      2. rpm
      ```
      sudo dnf config-manager --add-repo=http://repo.fdzh.org/FZUG/FZUG.repo
      sudo dnf install fzug-release -y
      sudo dnf install sogoupinyin sogoupinyin-selinux -y
      ```
      安装之后需要重启
      ```
      $ reboot
      ```
4. 文本编辑器
    1. [atom](https://atom.io/)
    [sublime](https://www.sublimetext.com/)在linux下无法切换中文输入法，虽然有办法可以解决但还是用现成的吧。而且相比于sublime atom默认配置更佳完善
4. IDE
    java:[idea](https://www.jetbrains.com/idea/)   
    php: [phpstrom](https://www.jetbrains.com/phpstorm/)   
    暂时就用这两个
5. 启动器
    实在觉的unity的启动器太丑了
    1. docky
    ```
    sudo dnf install docky
    ```
6. 前段开发环境
    1. 下载编译安装最新的nodejs+npm
    ```
    sudo wget http://nodejs.org/dist/node-latest.tar.gz
    sudo tar -zxvf node-latest.tar.gz
    sudo cd node-v*
    sudo ./configure
    sudo make
    sudo make install
    ```
    2. [yeoman](http://yeoman.io/)
    ```
    sudo npm install -g yo generator-webapp gulp-cli grunt-cli
    ```
    包括生成器脚手架


以后再补充
