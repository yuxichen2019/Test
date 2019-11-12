# -*- coding: utf-8 -*- 
# 2019/11/12 15:22 
# Test
# 断言方法.py 
# company
import unittest

class TestAssert(unittest.TestCase):
    def test_equal(self):
        self.assertEqual(2+2,4)
        self.assertEqual('python','python')
        self.assertNotEqual('hello','python')

    def test_in(self):
        self.assertIn('hello','hello word')
        self.assertNotIn('hi','hello')

    def test_true(self):
        self.assertTrue(True)
        self.assertFalse(False)

if __name__ == '__main__':
    unittest.main()
