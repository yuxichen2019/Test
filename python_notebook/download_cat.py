# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/11/13 23:05
# 文件名：download_cat.py
# 开发工具：PyCharm

import urllib.request

response = urllib.request.urlopen('http://placekitten.com/g/200/300')
cat_img = response.read()

with open('cat_200_300.jpg','wb') as f:
    f.write(cat_img)