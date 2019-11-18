# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/11/18 22:34
# 文件名：proxy_eg.py
# 开发工具：PyCharm

import urllib.request
import random
url = 'https://www.whatismyip.com/'
iplist = ['120.83.107.249:9999','117.95.192.67:9999','61.145.8.175:9999']
proxy_support = urllib.request.ProxyHandler({'http':random.choice(iplist)})
opener = urllib.request.build_opener(proxy_support)
opener.addheaders=[('user-agent','Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36')]
urllib.request.install_opener(opener)
response = urllib.request.urlopen(url)
html = response.read().decode('utf-8')
print(html)