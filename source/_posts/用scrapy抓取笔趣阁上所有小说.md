---
title: 用scrapy抓取笔趣阁上所有小说
toc: true
comment: true
notag: false
date: 2017-01-15 22:30:51
tags: ['python','爬虫','scrapy']
categories:
thumbnail:
---
之前也没有认真写过爬虫项目，这应该算我第一个比较正式的爬虫项目。主要的目的就是练习一下[scrapy](https://scrapy.org/)框架。一个高效强大的爬虫框架。文档在[这里](https://doc.scrapy.org/en/0.24/)

这个爬虫的目的是抓取[笔趣阁](http://www.qu.la/)(因为是盗版网站，链接可能失效)上所有的小说。

首先安装scrapy
```
pip install scrapy
```
我使用的是windows，python版本是3.5，在安装的时候报错，因为缺少vc的支持库，不能编译c的代码，可以通过去微软官方下载[vc++ build tool](http://landinghub.visualstudio.com/visual-cpp-build-tools)解决。

创建项目
```
scrapy startproject biquge
```
成功之后的目录结构:
![目录](/imgs/2017115/1.png)

因为scrapy默认是不能在cmd下进行调试的，我们建立一个入口文件，使他能够在cmd中调试，在工程根目录下建立start.py
```
from scrapy.cmdline import execute
execute(['scrapy', 'crawl', 'biquge'])
```
为了减轻网站的压力，也为了调试迅速，启动缓存。去掉setting.py中最后几行的注释
```
HTTPCACHE_ENABLED = True
HTTPCACHE_EXPIRATION_SECS = 0
HTTPCACHE_DIR = 'httpcache'
HTTPCACHE_IGNORE_HTTP_CODES = []
HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.FilesystemCacheStorage'
```
准备工作就绪，下面开始写爬虫程序。
首先抓取基本的信息，小说的名字，id，作者。
#### 定义字段
在item.py中写入下面的代码
```
class BiqugeItem(scrapy.Item):

    # id
    novel_id = scrapy.Field()
    # 小说名字
    name = scrapy.Field()
    # 小说作者
    author = scrapy.Field()
    # 小说url
    url = scrapy.Field()
    # 小说简介
    content = scrapy.Field()
 ```
#### 编写spider
在spiders文件夹下新建，biqugespider.py，定义爬虫入口
```
import scrapy
from scrapy.http import Request
from biquge.items import BiqugeItem
import re

class BiqugeSpider(scrapy.Spider):
    # 爬虫的名字，和start.py中相对应。
    name = 'biquge'
    
    base_url = 'http://www.qu.la'

    # 爬虫入口
    def start_requests(self):
        start_url = self.base_url + '/xiaoshuodaquan/'
        yield Request(start_url, callback=self.get_novel_url)
```

scrapy的Request()会把response自动返回callback的函数。
定义 get_novel_url
```
    # 获取小说url
    def get_novel_url(self, response):
        base_a = response.xpath('//div[@class="novellist"]/ul/li/a/@href').extract()
        for a in base_a:
            novel_a = self.base_url + a
            yield Request(novel_a, callback=self.get_information_and_chapter, meta={"novel_a": novel_a})
```
可以使用meta参数进行传值，把meta中的结果传到，回掉函数的response中，使用response.meta['name']取值。

接下来获取小说的基本信息。并存在item中。
```
    # 获取基本信息
    def get_information_and_chapter(self, response):
        item = BiqugeItem()
        item['content'] = ''.join(response.xpath('//meta[@property="og:description"]/@content').extract()). \
            replace(' ', ''). \
            replace('\n', '')

        # 保存小说链接
        novel_url = response.meta['novel_a']
        item['url'] = novel_url

        # 提取小说名字
        novel_name = ''.join(response.xpath('//meta[@property="og:novel:book_name"]/@content').extract())
        item['name'] = novel_name

        # 提取小说作者
        item['author'] = ''.join(response.xpath('//meta[@property="og:novel:author"]/@content').extract())

        # 从url中提取小说id
        novel_id = ''.join(re.findall('\d', novel_url))
        item['novel_id'] = novel_id
        yield item
```

我使用mysql来进行存取数据，先建一张表，存小说的基本信息。

```
CREATE TABLE `novel`.`biquge_information` ( `id` INT NOT NULL AUTO_INCREMENT , `novel_id` VARCHAR(255) NOT NULL , `author` VARCHAR(255) NOT NULL , `url` VARCHAR(255) NOT NULL , `novel_name` VARCHAR(255) NOT NULL , `content` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
```

在目录下新建一个包mysqlpipelines 在下面新建 __init__.py pipelines.py  sql.py  
![结构](/imgs/2017115/1.png)

需要安装mysql-connector
```
pip install mysql-connector
```
在setting.py中设置mysql的基本信息。
```
MYSQL_HOST = '127.0.0.1'
MYSQL_USER = 'root'
MYSQL_PASSWORD = ''
MYSQL_PORT = '3306'
MYSQL_DB = 'novel'
```
初始一个mysql游标，并且定义两个方法，其中一个用于插入数据，另外一个用于判断数据是否存在。

```
import mysql.connector
from biquge import settings

cnx = mysql.connector.connect(user=settings.MYSQL_USER, password=settings.MYSQL_PASSWORD,
                              host=settings.MYSQL_HOST, database=settings.MYSQL_DB)
cur = cnx.cursor(buffered=True)


class Sql:
    @classmethod
    def insert_infor(cls, novel_id, author, name, url, content):
        sql = 'INSERT INTO `biquge_information` (`novel_id`, `novel_name`, `author`, `url`, `content`) ' \
              'VALUES (%(novel_id)s, %(novel_name)s, %(author)s, %(url)s, %(content)s)'
        value = {
            'novel_id': novel_id,
            'novel_name': name,
            'author': author,
            'url': url,
            'content': content
        }
        cur.execute(sql, value)
        cnx.commit()

    @classmethod
    def select_novel_id(cls, novel_id):
        sql = 'SELECT EXISTS(SELECT 1 FROM biquge_information WHERE novel_id=%(novel_id)s)'
        value = {
            'novel_id': novel_id
        }
        cur.execute(sql, value)
        return cur.fetchall()[0]
```
编写pipelines.py

```
from .sql import Sql
from biquge.items import BiqugeItem
from biquge.items import ChapterContentItem


class BiqugePipeline(object):

    def process_item(self, item, spider):

        if isinstance(item, BiqugeItem):
            novel_id = item['novel_id']
            ret = Sql.select_novel_id(novel_id)
            if ret[0] == 1:
                print('小说已经存在')
                pass
            else:
                name = item['name']
                author = item['author']
                content = item['content']
                url = item['url']
                print('小说不存在')
                Sql.insert_infor(novel_id, author, name, url, content)
```
运行start.py，爬虫就可以抓取笔趣阁上所有小说的基本信息了。
当然也可以抓取小说章节内容，可是懒癌犯了，就不写了，详见[完整项目](https://github.com/lylllcc/biquge.git)