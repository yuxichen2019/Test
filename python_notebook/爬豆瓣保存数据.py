# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/11/20 20:51
# 文件名：爬豆瓣保存数据.py
# 开发工具：PyCharm

import requests
import bs4
import re
def open_url(url):
    #使用代理
    #proxies = {"http":"127.0.0.1:8080","http":"127.0.0.1:8080"}
    headers = {"user-agent":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"}
    #res = requests.get(url,headers=headers,proxies=proxies)
    res = requests.get(url,headers=headers)
    return res

def find_movies(res):
    soup = bs4.BeautifulSoup(res.text,'html.parser')
    #电影名
    movies = []
    targets = soup.find_all('div',class_ = 'hd')
    for i in targets:
        movies.append(i.a.span.text + '\t')

    #评分
    ranks = []
    targets = soup.find_all('span',class_='rating_num')
    for i in targets:
        ranks.append('评分：%s\t' % i.text)

    #资料
    message = []
    targets = soup.find_all('div',class_='bd')

    for i in targets:
        try:
            message.append(i.p.text.split('\n')[1].strip() + i.p.text.split('\n')[2].strip())
        except:
            continue
    result = []
    length = len(movies)
    for j in range(length):
        result.append(movies[j] + ranks[j] + message[j] + '\n')
    return result

#找出一共有多少个页面
def find_depth(res):
    soup = bs4.BeautifulSoup(res.text,'html.parser')
    depth =soup.find('span',class_='next').previous_sibling.previous_sibling.text
    return int(depth)

def main():
    host = "https://movie.douban.com/top250"
    res = open_url(host)
    depth = find_depth(res)
    print(depth)
    results = []

    for i in range(depth):
        url = host + '/?start=' + str(25 * i)
        res = open_url(url)
        #print(find_movies(res))
        results.extend(find_movies(res))

    with open('豆瓣TOP250电影.txt','w',encoding='utf-8') as f:
        for each in results:
            f.write(each)

if __name__ == '__main__':
    main()