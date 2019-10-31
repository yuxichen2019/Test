# -*- coding: utf-8 -*- 
# 2019/10/30 18:29 
# Test
# Cookie.py 
# hanwenlu


from selenium import webdriver
dr = webdriver.Chrome()
dr.get("http://www.baidu.com")


cookie1 = dr.get_cookies()
print(cookie1)

dr.add_cookie({'name':'key_aaaaaaaaa','value':'key_bbbbbbbbbbbb'})


#遍历指定的Cookies
for cookie in dr.get_cookies():
    print('%s ----->  %s' % (cookie['name'],cookie['value']))

dr.quit()