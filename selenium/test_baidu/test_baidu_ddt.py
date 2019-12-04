# -*- coding: utf-8 -*- 
# 2019/11/29 9:13 
# Test
# test_baidu.py 
# company

import unittest
from time import sleep
from selenium import webdriver
from ddt import ddt,data,file_data,unpack

@ddt
class Testbaidu(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.base_url = 'https://www.baidu.com'

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def baidu_search(self,search_key):
        self.driver.get(self.base_url)
        self.driver.find_element_by_id('kw').send_keys(search_key)
        self.driver.find_element_by_id('su').click()
        sleep(2)

#     #参数化方式一
#     @data(["case1","selenium"],["case2","python"],["case3","java"])
#     @unpack
#     def test_search1(self,case,search_key):
#         print('第一组测试用例：',case)
#         self.baidu_search(search_key)
#         self.assertEqual(self.driver.title,search_key+'_百度搜索')
#
#     #参数化方式二
#     @data(("case1","selenium"),("case2","python"),("case3","java"))
#     @unpack
#     def test_search2(self,case,search_key):
#         print('第二组测试用例：',case)
#         self.baidu_search(search_key)
#         self.assertEqual(self.driver.title,search_key+'_百度搜索')
#
#
# # wo cao 运行的时候光标的位置放在 test_login 方法里面了，加了ddt后，运行时要先识别装饰的类。若将光标放在某一个方法后面的话，测试用例只会执行当前的方法，ddt识别不到类，就会报错。将光标放到外面，则运行通过，或者加main方法，再运行，也不会报错
#     #参数化方式三
#     @data({"search_key":"selenium"},{"search_key":"python"},{"search_key":"java"})
#     @unpack
#     def test_search3(self,search_key):
#         print('第三组测试用例：',search_key)
#         self.baidu_search(search_key)
#         self.assertEqual(self.driver.title,search_key+'_百度搜索')


    @file_data('ddt_data_file.json')
    def test_search4(self,search_key):
        print('第四组测试用例：',search_key)
        self.baidu_search(search_key)
        self.assertEqual(self.driver.title,search_key+'_百度搜索')
if __name__ == '__main__':
    unittest.main(verbosity=2)

