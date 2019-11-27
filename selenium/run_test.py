# -*- coding: utf-8 -*- 
# 2019/11/27 14:11 
# Test
# run_test.py.py 
# company
import time
import unittest
from HTMLTestRunner import HTMLTestRunner

test_dir = './test_baidu'
# defaultTestLoader()类，通过该类下面的discover()方法可自动根据测试目录start_dir匹配查找测试用例文件（test*.py），并将查找到的测试用例组装到测试套件，因此可以直接通过run()方法执行
suit = unittest.defaultTestLoader.discover(test_dir,pattern='test*.py')

if __name__ == '__main__':
    #生成HTML格式的报告
    now_time = time.strftime('%Y-%m-%d %H_%M_%S')
    print(now_time+'result.html')
    fp = open('./test_report/'+ now_time +'result.html','wb')
    #fp = open('./test_report/result.html', 'wb')
    runner = HTMLTestRunner(stream=fp,title='百度搜索测试报告',description="运行环境：win10,Chrome浏览器")
    runner.run(suit)
    fp.close()