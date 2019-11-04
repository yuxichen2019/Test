# -*- coding: utf-8 -*- 
# 2019/10/30 18:29 
# Test
# Cookie.py 
# hanwenlu


#get_cookies():  获得所有的Cookies.
#get_cookie(name)  返回字典中的key为name的Cookies
#add_cookie(cookie_dict):  添加cookie.
#delete_cookie(name,optionString)   删除名字为optionString的Cookies
#delete_all_cookies    删除所有的Cookies

from selenium import webdriver
dr = webdriver.Chrome()
dr.get("http://www.baidu.com")


cookies = dr.get_cookies()
print(cookies)


#添加cookie信息
dr.add_cookie({'name':'key_aaaaaaaaa','value':'key_bbbbbbbbbbbb'})
print(dr.get_cookies())

#遍历指定的Cookies
for cookie in dr.get_cookies():
    print('%s ----->  %s' % (cookie['name'], cookie['value']))

dr.quit()