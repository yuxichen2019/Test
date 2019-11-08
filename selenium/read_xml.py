# -*- coding: utf-8 -*- 
# 2019/11/08 15:00 
# Test
# read_xml.py 
# company

from xml.dom.minidom import parse

#打开xml文件
dom = parse("./data_file/config.xml")
#得到文档元素对象
root= dom.documentElement

#获取标签对之间的数据
# #获取（一组）标签
# tag_name = root.getElementsByTagName('browser')   #垃圾书本，到处出错的    getElementsByTagNam()获取文件中的标签。
# print(tag_name[0].firstChild.data)
# print(tag_name[1].firstChild.data)
# print(tag_name[2].firstChild.data)

#获取标签的属性值
login_info = root.getElementsByTagName('login')
username = login_info[0].getAttribute('username')         #getAttribute获取元素的属性值  与webdriver中的get_attribute()方法作用相似
print(username)
password = login_info[0].getAttribute('password')
print(password)

username = login_info[1].getAttribute('username')
print(username)
password = login_info[1].getAttribute('password')
print(password)