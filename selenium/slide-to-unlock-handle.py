# -*- coding: utf-8 -*- 
# 2019/11/01 16:58 
# Test
# slide-to-unlock-handle.py 
# hanwenlu


#click_and_hold() : 单机并按下鼠标左键
#move_by_offset() : 移动鼠标，第一个参数X坐标距离，第二个为Y
#reset_action()   : 重置action

from time import sleep
from selenium import  webdriver
from  selenium.webdriver import  ActionChains
from selenium.common.exceptions import UnexpectedAlertPresentException

dr = webdriver.Chrome()
dr.get('https://www.helloweba.com/demo/2017/unlock/')

slider = dr.find_element_by_xpath('/html/body/div/div/div/div[1]/div[1]/div[3]')
action = ActionChains(dr)
action.click_and_hold(slider).perform()

for index in range(200):
    try:
        #移动鼠标，x,y
        action.move_by_offset(2,0).perform()

    except UnexpectedAlertPresentException:
        break

    action.reset_actions()
    sleep(0.1)


success_text = dr.switch_to.alert.text
print(success_text)