# -*- coding: utf-8 -*- 
# 2019/11/06 18:26 
# Test
# module.py 
# company

#存放登录和退出动作


class Mail:
    def __init__(self,driver):
        self.driver = driver

    def login(self,username,password):
        '''登录'''

        lg = self.driver.find_element_by_css_selector('iframe[id^="x-URS-iframe"]')
        self.driver.switch_to.frame(lg)
        self.driver.find_element_by_name("email").clear()
        self.driver.find_element_by_name("email").send_keys(username)
        self.driver.find_element_by_name('password').clear()
        self.driver.find_element_by_name('password').send_keys(password)
        self.driver.find_element_by_id('dologin').click()

    def logout(self):

        self.driver.find_element_by_link_text('退出').click()


