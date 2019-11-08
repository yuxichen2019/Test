# -*- coding: utf-8 -*- 
# 2019/11/06 10:16 
# Test
# test_mail.py 
# company

from time import sleep
from selenium import webdriver
from module import Mail

with(open('./data_file/user_info.txt','r')) as user_file:
    data = user_file.readlines()
users = []
for line in data:
    user = line[:-1].split(':')
    users.append(user)

driver = webdriver.Chrome()
driver.get("http://www.126.com")
driver.maximize_window()
driver.find_element_by_link_text('密码登录').click()

mail = Mail(driver)
#正确的账号密码登陆
mail.login(users[0][0],users[0][1])

#密码为空
#mail.login(users[1][0],users[1][1])
#账号为空
#mail.login(users[2][0],users[2][1])
#账号密码错误
#mail.login(users[4][0],users[4][1])

# sleep(2)
# mail.logout()
# sleep(1)
# driver.quit()






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