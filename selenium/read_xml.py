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
#获取（一组）标签
tag_name = root.getElementsByTagName('os')

print(tag_name[0].firstChild.data)
print(tag_name[1].firstChild.data)
print(tag_name[2].firstChild.data)
