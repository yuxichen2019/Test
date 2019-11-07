# -*- coding: utf-8 -*- 
# 2019/11/06 10:16 
# Test
# test_mail.py 
# company

from time import sleep
from selenium import webdriver
from module import Mail

driver = webdriver.Chrome()
driver.get("http://www.126.com")
driver.maximize_window()
driver.find_element_by_link_text('密码登录').click()

mail = Mail(driver)
mail.login()

sleep(2)
mail.logout()
sleep(1)
driver.quit()






# sleep(2)
# river.find_element_by_link_text('密码登录').click()d
# lg = driver.find_element_by_css_selector('iframe[id^="x-URS-iframe"]')
# driver.switch_to.frame(lg)
#
# driver.find_element_by_name('email').clear()
# driver.find_element_by_name('email').send_keys('Y15112342277')
# driver.find_element_by_name('password').clear()
# driver.find_element_by_name('password').send_keys('yxc123456')
# driver.find_element_by_id('dologin').click()
# sleep(1)
#driver.find_element_by_xpath('//*[@id="_mail_link_6_152"]')


# driver.find_element_by_link_text('退出').click()

# driver.quit()