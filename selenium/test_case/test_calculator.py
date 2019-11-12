# -*- coding: utf-8 -*- 
# 2019/11/11 17:04 
# Test
# test_calculator.py 
# company
'''
 如果其中一步出错了，后面的就不再运行了
from calculator import Calculator
def test_add():
    c = Calculator(3,5)
    result = c.add()
    assert result == 8,'加法运算失败!!!!'
def test_sub():
    c = Calculator(8,4)
    result = c.sub()
    assert result == 4,'减法运算失败！！！'
def test_mul():
    c = Calculator(3,4)
    r = c.mul()
    assert r == 11,'乘法运算失败！！！'
def test_div():
    c =  Calculator(10,5)
    r = c.div()
    assert r == 2,'除法运算失败！！！！'

if __name__ == '__main__':
    test_add()
    test_sub()
    test_mul()
    test_div()

'''


# import unittest
# from calculator import Calculator
#
# class TestCalculator(unittest.TestCase):
#     def setUp(self):                        #执行每条用例的前置后置动作
#         print('test start......')
#     def tearDown(self):
#         print('test end......')
#
#     def test_add(self):
#         c = Calculator(3, 5)
#         result = c.add()
#         self.assertEqual(result,8)
#
#     def test_sub(self):
#         c = Calculator(8, 3)
#         result = c.sub()
#         self.assertEqual(result,5)
#
#     def test_mul(self):
#         c = Calculator(4, 4)
#         r = c.mul()
#         self.assertEqual(r,12)
#
#     def test_div(self):
#         c = Calculator(10, 5)
#         r = c.div()
#         self.assertEqual(r,2)
#
# # if __name__ == '__main__':
# #     unittest.main()
# '''
#     单元测试的规则：
#     1.创建一个测试类，这里为TsetCalculator,必须要继承unittest模块的TestCase类。
#     2.创建一个测试方法，该方法必须以test开头。
#     接下来的测试步骤与前面测试代码相同。
#     首先，调用被测试类，传入初始化数据。
#     其次，调用被测试方法，得到计算结果。通过unittest提供的assertEqual()方法来判断  断言。该方法有TestCase父类提供，由于继承了该类，所以可以由self调用。
#     最后，调用unittest的main方法来执行用例，他会按前面的两条规则执行。
# '''
# if __name__ == '__main__':
#     #创建测试套件
#     suit = unittest.TestSuite()
#     suit.addTest(TestCalculator('test_add'))
#     suit.addTest(TestCalculator('test_sub'))
#     suit.addTest(TestCalculator('test_mul'))
#     suit.addTest(TestCalculator('test_div'))

#     #创建测试运行器
#     runner = unittest.TextTestRunner()
#     runner.run(suit)



import unittest
from calculator import Calculator
#一个测试类对应一个被测试功能
class TestAdd(unittest.TestCase):
    '''add()方法测试'''
    def test_add_integer(self):
        '''整数相加测试'''
        c = Calculator(3,5)
        self.assertEqual(c.add(),8)
    def test_add_decimals(self):
        '''小数相加测试'''
        c = Calculator(3.2,3.6)
        self.assertEqual(c.add(),6.8)
    def test_add_string(self):
        '''字符串整数相加测试'''
        c=Calculator('6','8')
        self.assertIn(c.add(),'236899')

class TestSub(unittest.TestCase):
    '''sub方法测试'''
    pass

if __name__ == '__main__':
    unittest.main()