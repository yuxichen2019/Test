# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/11/14 22:35
# 文件名：top250movie.py
# 开发工具：PyCharm

import requests
res = requests.get('https://movie.douban.com/top250')
#requests.get()用于请求目标网站，类型是一个HTTPresponse类型
#print(res.text)

import bs4
soup = bs4.BeautifulSoup(res.text,'html.parser')
print(soup)
targets = soup.find_all('div',class_='hd') #find_all()方法找到所有class =‘hd’ 的div标签
print(targets)
for i in targets:
	print(i.a.span.text)


import requests
import bs4
import re
