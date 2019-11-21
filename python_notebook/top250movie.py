# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/11/14 22:35
# 文件名：top250movie.py
# 开发工具：PyCharm

# 构建beautifulsoup实例
# soup = BeautifulSoup(html,'lxml')
# 第一个参数是要匹配的内容
# 第二个参数是beautifulsoup要采用的模块，即规则


import requests
import bs4
headers = {"user-agent":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"}
res = requests.get('https://movie.douban.com/top250',headers=headers)
#requests.get()用于请求目标网站，类型是一个HTTPresponse类型

print(res.text)

print('--------------------------------------------------------------------')
soup = bs4.BeautifulSoup(res.text,'html.parser')
print(soup)
targets = soup.find_all('div',class_='hd') #find_all()方法找到所有class =‘hd’ 的div标签
print(targets)
for i in targets:
	print(i.a.span.text)



