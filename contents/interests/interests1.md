---
title: 7z 的一些linux命令行操作
date: 2025-08-15
category: linux
summary: 探索机器学习如何改变和创新土木工程领域
---


### 7z 的一些linux命令行操作
7z是一种解压缩软件，因为大多数的linux系统都自带7z或者我们可以sudo 命令快速的安装，因此我们常用7z对linux系统中的文件进行解压缩

Linux安装7z的命令：  
``` bash
sudo apt install p7zip-full

```
注:
p7zip、p7zip-full和p7zip-rar三个版本的区别：
p7zip和p7zip-full之间的区别在于p7zip是较轻的版本，仅支持.7z，而完整版本支持更多7z压缩算法（用于音频文件等）。
p7zip-rar软件包提供对7z的RAR文件的支持，在大多数情况下，安装p7zip-full应该足够了。

 

### command(命令)
``` bash
command即第一个参数：

command	说明
a	添加文件的压缩包，或者创建新的压缩包。
d	从压缩包中删除文件。
e	从压缩包中提取。
t	测试压缩包的是否出错。
u	更新压缩包中的文件。
 
switch(命令对应的参数)
由于command很多，而其对应的switch也不尽相同。

常用的switch
名称	说明	简单例子(只展示参数部分)
-m	压缩方法，有：Zip、GZip、BZip2、7z、XZ..很多	-mx5 见补充
-t	压缩包格式,压缩时可以指定分卷压缩， 有*, #（单独打开一个分卷）, 7z, xz, split, zip, gzip, bzip2, tar, ....	-t7z
-p	设置密码	-p123456
-r	递归子目录，有-r、-r-、-r0	-r src*.cpp src*.h只压缩cpp和h格式的文件
```

---

 #### 一、压缩命令：
``` bash
复制代码
普通压缩    
7z a archive1.zip subdir                //把subdir文件夹或者是文件进行压缩，生成文件archive1.zip

同时压缩多个目录
7z a archive.zip subdirav subdirab      //同时subdirav、subdirab两个文件夹或是文件压缩到archive.zip下

筛选压缩
7z a file.7z subdir*.py                //使用的是简单的*作为通配符。此时file.7z里只有subdir和subdir内的test.py

指定密码压缩
7z a file.7z subdir* -p123456          //压缩subdir内的所有文件，并指定密码为123456.但是没有隐藏内部的文件名（7z是可以隐藏压缩文件内部的文件名的）

指定密码压缩--隐藏文件名版
7z a file.7z subdir* -p123456 -mhe     //和上一个版本的唯一区别是隐藏了压缩文件内部的文件名。

分卷压缩
7z a file.7z subdir* -v1K              //指定分卷大小为1K，还可以指定其他单位（M、G...）。大小写不敏感。

其他
如分卷压缩+指定密码等组合性的指令不做演示。可以根据参数的使用方法自由组合
```
---
 
 #### 二、解压命令：
``` bash
复制代码
普通解压
7z x file.7z                          //解压到当前目录

带路径的解压缩命令（最常用）
7z x asdf.7z                          //x的意思是执行带绝对路径解压动作，这会在当前文件夹下创建一个文件夹asdf，把压缩包里的文件、文件夹不改动结构释放到文件asdf里面，就像我们在
                                      // 图形界面下看到的常经典解压操作一样
解压到指定目录
7z x file.7z -ofile/                  //将file.7z解压到当前目录的file文件夹下（不存在是会自动创建）使用-o解压到指定目录

解压特定文件
7z x file.7z -ofile/ *.py -r         //解压以.py结尾的文件到file文件夹下，注意加上-r。

解压分卷
前提：分卷是完整的
7z x file.7z.001
注意：
分卷在同一目录下（使用这个命令是这样的，其他的不知道）
解压的是第一个分卷即xxx.001

解压带密码的压缩包
7z x file.7z -p123456                //解压file.7z，密码为123456

跳过确认输入的参数
-y：所有确认选项都默认为是（即不出现确认提示），重复文件时会覆盖
-aos：跳过已存在的文件
```
---

 #### 三、删除
``` bash
7z d file.7z *.py -r                //删除file.7z内以.py结尾的文件，注意不要忘了 -r

7z d file.7z *.py -r -p123456       //带密码版
 ```

 

 #### 四、更新
``` bash
7z u file.7z *.py                  //添加.py结尾的文件到file.7z内


7z u file.7z *.py -p123456         //带密码版
```
