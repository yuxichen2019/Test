# -*- coding: utf-8 -*- 
# 2019/10/31 17:58 
# Test
# window.scrollTo.py 
# hanwenlu


#window.scrollTo浏览器窗口滚动条的水平和垂直位置


from selenium import webdriver

dr=webdriver.Chrome()
dr.get('http://www.baidu.com')

dr.set_window_size(800,600)
dr.find_element_by_id('kw').send_keys('selenium')

dr.find_element_by_id('su').click()


js = 'window.scrollTo(100,450);'

dr.execute_script(js)