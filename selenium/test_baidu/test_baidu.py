# -*- coding: utf-8 -*- 
# 2019/11/27 14:43 
# Test
# test_baidu.py 
# company

import unittest
from time import sleep
from selenium import webdriver
from baidu_page import BaiduPage

class TestBaidu(unittest.TestCase):
    '''百度搜索测试'''
    @classmethod
    def setUpClass(cls):
        cls.driver= webdriver.Chrome()
        #cls.base_url = 'https://www.baidu.com'
    # def baidu_search(self,search_key):
    #     self.driver.get(self.base_url)
    #     self.driver.find_element_by_id('kw').send_keys(search_key)
    #     self.driver.find_element_by_id('su').click()
    #     sleep(2)

    # def test_search_key_selenium(self):
    #     '''百度关键字selenium'''
    #     search_key = 'selenium'
    #     self.baidu_search(search_key)
    #     self.assertEqual(self.driver.title,search_key+'_百度搜索')
    #
    # def test_search_key_python(self):
    #     '''百度关键字python'''
    #     search_key = 'python'
    #     self.baidu_search(search_key)
    #     self.assertEqual(self.driver.title,search_key+'_百度搜索')
    def test_baidu_search_case1(self):
        page=BaiduPage(self.driver)
        page.open()
        page.search_input('selenium')
        page.search_button()
        sleep(2)
        self.assertEqual(page.get_title(),"selenium_百度搜索")

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

if __name__ == '__main__':
    unittest.main(verbosity=2)