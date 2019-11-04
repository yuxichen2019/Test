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
import selenium.webdriver.support.ui as ui
driver = webdriver.Chrome()


# try:
#     print(ctime())
#     dr.find_element_by_id('switchAccountLogin')
#
# except  NoSuchElementException as e:
#     print(e)
#
# finally:
#     print(ctime())

#dr.find_element_by_xpath('/html/body/div[2]/div[3]/div/div[3]/div[3]/div[4]/a[1]').click()
#dr.find_element_by_id("switchAccountLogin").click()
#//*[@id="switchAccountLogin"]
wait = ui.WebDriverWait(driver,10)
driver.get('https://www.126.com')
wait.until(lambda driver: driver.find_element_by_id("switchAccountLogin"))

driver.find_element_by_id('switchAccountLogin').click()

login_frame = driver.find_element_by_css_selector('iframe[id^="x-URS-iframe"]')

driver.switch_to.frame(login_frame)

driver.find_element_by_name('email').send_keys('582732974@qq.com')

driver.find_element_by_name('password').send_keys('xxxxxxx')

driver.find_element_by_id('dologin').click()

#回到最外层的页面
driver.switch_to.default_content()

driver.quit()