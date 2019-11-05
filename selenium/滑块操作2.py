# -*- coding: utf-8 -*- 
# 2019/11/05 11:52 
# Test
# 滑块操作2.py 
# company




#上下滑动选择日期
#通过TouchActions类中的scroll_from_element()方法上下滑动选择日期
#on_element 滑动的元素
#xoffset  X坐标距离
#yoffset  y坐标距离
# 方法二:TouchActions

from time import sleep
from selenium import webdriver


driver = webdriver.Chrome()
driver.get('http://www.jq22.com/yanshi4976')
driver.maximize_window()
sleep(2)
driver.switch_to.frame('iframe')
driver.find_element_by_id('appDate').click()

# dwwos = dr.find_element_by_class_name('dwwo')
# print(dwwos)
# year = dwwos[0]
# month = dwwos[1]
# day = dwwos[2]
year = driver.find_element_by_xpath('/html/body/div[3]/div/div[2]/div[2]/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[1]')
month = driver.find_element_by_xpath('/html/body/div[3]/div/div[2]/div[2]/div[2]/div/table/tbody/tr/td[2]/div/div[2]')
day = driver.find_element_by_xpath('/html/body/div[3]/div/div[2]/div[2]/div[2]/div/table/tbody/tr/td[3]/div/div[2]/div[1]')

action = webdriver.TouchActions(driver)
action.scroll_from_element(year,0,5).perform()
action.scroll_from_element(month,0,30).perform()
action.scroll_from_element(day,0,30).perform()

