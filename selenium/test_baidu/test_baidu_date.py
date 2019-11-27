# -*- coding: utf-8 -*- 
# 2019/11/27 17:40 
# Test
# test_baidu_date.py 
# company

import csv
import codecs
import unittest
from time import sleep
from itertools import islice
from selenium import webdriver

class TestBaidu(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.base_url = "https://www.baidu.com"


    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def baidu_search(self,search_key):
        self.driver.get(self.base_url)
        self.driver.find_element_by_id('kw').send_keys(search_key)
        self.driver.find_element_by_id('su').click()
        sleep(3)

    def test_search(self):
        with codecs.open(r'E:\yuxichen\Test\selenium\data_file\baidu_data.csv','r','utf-8') as f:
            data = csv.reader(f)
            for line in islice(data,1,None):
                print(line)
                search_key = line[1]
                self.baidu_search(search_key)

if __name__ == '__main__':
    unittest.main(verbosity=2)

    # 这里的verbosity是一个选项, 表示测试结果的信息复杂度，有三个值
    # 0(静默模式): 你只能获得总的测试用例数和总的结果
    # 比如
    # 总共100个
    # 失败20
    # 成功80
    # 1(默认模式): 非常类似静默模式
    # 只是在每个成功的用例前面有个“.” 每个失败的用例前面有个 “F”
    # 2(详细模式): 测试结果会显示每个测试用例的所有相关的信息
    # 并且
    # 你在命令行里加入不同的参数可以起到一样的效果
    # 加入 - -quiet
    # 参数
    # 等效于
    # verbosity = 0
    # 加入 - -verbose参数等效于
    # verbosity = 2
    # 什么都不加就是
    # verbosity = 1