# -*- coding: utf-8 -*-
# 2019/10/23 14:40 
# Test
# XiaLaKuang.py 
# hanwenlu

# Select类：用于定位<select>标签。
# select_by_value():通过value值定位下拉选项
# select_by_visible_text():通过text值定位下拉选项
# select_by_index():根据下拉选项的索引进行选择。第一个选项为0，第二个为1

from time import sleep
from selenium import webdriver
from selenium.webdriver.support.select import Select

dr = webdriver.Chrome()
dr.get('http://www.baidu.com')
dr.maximize_window()
sleep(1)

link = dr.find_element_by_link_text('设置').click()
dr.find_element_by_link_text('搜索设置').click()
sleep(2)

sel = dr.find_element_by_xpath("//select[@id='nr']")

#假如选择 value = '20'的

Select(sel).select_by_value('20')
sleep(2)


Select(sel).select_by_visible_text('每页显示50条')
sleep(2)

Select(sel).select_by_index(0)
sleep(2)

dr.find_element_by_xpath('//a[@class="prefpanelgo"]').click()

sleep(1)
alret = dr.switch_to.alert

alret_text = alret.text

print(alret_text)
sleep(1)
alret.accept()

dr.quit()