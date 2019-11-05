# -*- coding: utf-8 -*- 
# 2019/10/21 13:55 
# selenium代码库
# switch_to.iframe.py 
# hanwenlu


#定位内嵌表单的元素
from time import ctime
from selenium import webdriver
from time import sleep
from selenium.common.exceptions import NoSuchElementException

dr = webdriver.Chrome()

dr.get('https://www.126.com')
sleep(2)
dr.maximize_window()


# try:
#     print(ctime())
#     dr.find_element_by_id('switchAccountLogin')
#
# except  NoSuchElementException as e:
#     print(e)
#
# finally:
#     print(ctime())


dr.find_element_by_link_text('密码登录').click()

#dr.find_element_by_xpath('/html/body/div[2]/div[3]/div/div[3]/div[3]/div[4]/a[1]').click()
#dr.find_element_by_class_name('u-login-entry u-126-login-entry').click()  #//*[@id="switchAccountLogin"]

login_frame = dr.find_element_by_css_selector('iframe[id^="x-URS-iframe"]')

dr.switch_to.frame(login_frame)

dr.find_element_by_name('email').send_keys('582732974@qq.com')

dr.find_element_by_name('password').send_keys('xxxxxxx')

dr.find_element_by_id('dologin').click()

#回到最外层的页面
dr.switch_to.default_content()

#dr.quit()