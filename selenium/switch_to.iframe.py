# -*- coding: utf-8 -*- 
# 2019/10/21 13:55 
# selenium代码库
# switch_to.iframe.py 
# hanwenlu

from selenium import webdriver

dr = webdriver.Chrome()

dr.get('https://www.126.com')

dr.maximize_window()


dr.find_element_by_id('switchAccountLogin').click()

login_frame = dr.find_element_by_css_selector('iframe[id^="x-URS-iframe"]')

dr.switch_to.frame(login_frame)

dr.find_element_by_name('email').send_keys('582732974@qq.com')

dr.find_element_by_name('password').send_keys('xxxxxxx')
