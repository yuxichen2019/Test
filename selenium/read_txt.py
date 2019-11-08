# -*- coding: utf-8 -*- 
# 2019/11/08 10:27 
# Test
# read_txt.py 
# company

#读取txt文件
#readline()一次读取文件的一行，通常比readlines()要慢得多。仅当没有足够内存可以一次读取整个文件时，才应该使用readline()；
#readlines()一次读取整个文件，跟read()一样，自动将文件内容分析称一个行的列表，该列表可以有python的for...in...结构进行处理

with(open('./data_file/user_info.txt','r')) as user_file:
    data = user_file.readlines()
users = []
for line in data:
    user = line[:-1].split(':')  #[:-1]可对字符串进行切片，以省略最后一个字符
    users.append(user)

print(users)

