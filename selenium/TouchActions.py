# -*- coding: utf-8 -*- 
# 2019/11/04 15:51 
# Test
# TouchActions.py 
# company

#通过TouchActions上下滑动选择日期
#on_element 滑动的元素
#xoffset  X坐标距离
#yoffset  y坐标距离


from time import sleep
from selenium import webdriver

dr = webdriver.Chrome()
dr.get('http://www.jq22.com/yanshi4976')
dr.maximize_window()
sleep(2)
dr.switch_to.frame('iframe')
dr.find_element_by_id('appDate').click()

dwwos = dr.find_element_by_class_name('dwwo')
year = dwwos[0]
month = dwwos[1]
day = dwwos[2]

action = webdriver.TouchActions(dr)
action.scroll_from_element(year,0,5).perform()
action.scroll_from_element(month,0,30).perform()
action.scroll_from_element(day,0,30).perform()

