# -*- coding: utf-8 -*- 
# 2019/10/22 18:01 
# Test
# super_1.py 
# hanwenlu


#警告框处理
#text:返回alert confirm prompt中的文字信息
#accept（）：接受现有警告框。
#dismiss():解散现有警告框

from time import sleep

from selenium import webdriver

from selenium.webdriver import ActionChains

dr = webdriver.Chrome()
dr.get('https://www.baidu.com')
dr.maximize_window()

above = dr.find_element_by_link_text('设置')
#采用鼠标悬停
ActionChains(dr).move_to_element(above).perform() #执行ActionChains类中存储的所有行为
dr.find_element_by_link_text('搜索设置').click()
sleep(2)

dr.find_element_by_class_name('prefpanelgo').click()

sleep(3)

alret = dr.switch_to.alert

alret_text = alret.text

print(alret_text)

alret.accept()

dr.quit()