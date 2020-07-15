# -*- coding: utf-8 -*- 
# 2019/11/01 16:58 
# Test
# slide-to-unlock-handle.py
# hanwenlu


#click_and_hold() : 单机并按下鼠标左键
#move_by_offset() : 移动鼠标，第一个参数X坐标距离，第二个为Y
#reset_action()   : 重置action

#slide-to-unlock-progress 表示滑过之后的背景色
#slide-to-unlock-handle 表示滑块
#方法一：ActionChains

from time import sleep
from selenium import  webdriver
from selenium.webdriver import  ActionChains
from selenium.common.exceptions import UnexpectedAlertPresentException

dr = webdriver.Chrome()
dr.get('https://upay.10010.com/npfweb/npfcellweb/phone_recharge_fill.htm')

dr.maximize_window()

number=dr.find_element_by_xpath('//input[@id="number"]')
number.send_keys(13008803217)
sleep(1)
dr.find_element_by_id('anyAmount').send_keys("1")
dr.find_element_by_id('submitButton').click()

frame = dr.find_element_by_id('tcaptcha_popup')
dr.switch_to.frame(frame)
slider = dr.find_element_by_xpath("//*[@id='tcaptcha_drag_thumb']")
action = ActionChains(dr)
action.click_and_hold(slider).perform()

for index in range(200):
    try:
        action.move_by_offset(50, 0).perform()
        sleep(0.2)
    except UnexpectedAlertPresentException:
        break

    action.reset_actions()
    sleep(0.1)


success_text = dr.switch_to.alert.text
print(success_text)






