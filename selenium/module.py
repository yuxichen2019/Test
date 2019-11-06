# -*- coding: utf-8 -*- 
# 2019/11/06 18:26 
# Test
# module.py 
# company

#存放登录和退出动作


class Mail:
    def __init__(self,driver):
        self.driver = driver

    def login(self):
        '''登录'''

        lg = driver.find_element_by_css_selector('iframe[id^="x-URS-iframe"]')
        driver.switch_to.frame(lg)
        driver.find_element_by_name('email').clear()
        driver.find_element_by_name('email').send_keys('Y15112342277')
        driver.find_element_by_name('password').clear()
        driver.find_element_by_name('password').send_keys('yxc123456')
        driver.find_element_by_id('dologin').click()

    def logout(self):

        self.driver.find_element_by_link_text('退出').click()


