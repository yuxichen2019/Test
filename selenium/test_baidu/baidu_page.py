# -*- coding: utf-8 -*- 
# 2019/12/04 18:01 
# Test
# BaiduPage.py 
# company

from base import BasePage

class  BaiduPage(BasePage):
    """百度Page层，百度页面封装到操作到的元素"""
    url = 'https://www.baidu.com'
    # def __init__(self,driver):
    #     self.driver = driver

    def search_input(self,search_key):
        self.by_id('kw').send_keys(search_key)

    def search_button(self):
        self.by_id('su').click()