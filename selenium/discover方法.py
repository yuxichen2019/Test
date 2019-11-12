# -*- coding: utf-8 -*- 
# 2019/11/12 18:06 
# Test
# discover方法.py 
# company

import  unittest
test_dir = '.'  #待测试用例名或测试用例目录
suits = unittest.defaultTestLoader.discover(test_dir,pattern='test*.py')

if __name__ == '__main__':
    runner = unittest.TextTestRunner()
    runner.run(suits)