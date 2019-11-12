# -*- coding: utf-8 -*-
# 2019/11/12 16:20 
# Test
# test_leap_year.py 
# company

#闰年的测试文件
import unittest
from leap_year import LeapYear

class TsetLeapYear(unittest.TestCase):
    def test_2000(self):
        le = LeapYear(2000)
        self.assertEqual(le.answer(),'2000不是闰年')

    def test_2019(self):
        le = LeapYear(2019)
        self.assertEqual(le.answer(),'2019是闰年')

    def test_2100(self):
        le = LeapYear(2100)
        self.assertEqual(le.answer(),'2100不是闰年')

    def test_2004(self):
        le = LeapYear(2004)
        self.assertEqual(le.answer(),'2004是闰年')

    def test_2050(self):
        le = LeapYear(2050)
        self.assertEqual(le.answer(),'2050不是闰年')


if __name__ == '__main__':
    unittest.main()
