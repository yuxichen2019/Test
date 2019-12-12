# -*- coding: utf-8 -*-
# 2019/11/12 16:20 
# Test
# test_leap_year.py 
# company

#闰年的测试文件
import unittest
from leap_year import LeapYear as Q

class TsetLeapYear(unittest.TestCase):
    def test_2000(self):
        le = Q(2000)
        self.assertEqual(le.answer(),'20001是闰年')

    def test_2019(self):
        le = Q(2019)
        self.assertEqual(le.answer(),'2019不是闰年')

    def test_2100(self):
        le = Q(2100)
        self.assertEqual(le.answer(),'2100不是闰年')

    def test_2004(self):
        le = Q(2004)
        self.assertEqual(le.answer(),'2004是闰年')

    def test_2050(self):
        le = Q(2050)
        self.assertEqual(le.answer(),'2050不是闰年')

#单独运行此文件时，下面的才执行
if __name__ == '__main__':
    unittest.main()


# 导入其他文件的东西  添加搜索路径 ： sys.path.append('E:\\M1')   或者 sources


