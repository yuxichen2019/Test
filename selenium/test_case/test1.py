# -*- coding: utf-8 -*- 
# 2019/11/22 22:05 
# Test
# test1.py 
# company

# unittest.skip(reason)
# 无条件跳过装饰的测试，需要说明跳过测试的原因
# unittest.skipIf(condition,reason)
# 如果条件为真，则跳过装饰的测试。
# unittest.skipUnless(condition,reason)
# 如果条件为真，则执行装饰的测试。
# unittest.expectedFailure()
# 不管执行结果是否失败，都将测试标记为失败。


import unittest

class MyTest(unittest.TestCase):
    @unittest.skip('直接跳过测试')
    def test_skip(self):
        print('test aaa')

    @unittest.skipIf(3>2,'当条件为真时跳过测试')
    def test_skip_if(self):
        print('test bbb')

    @unittest.skipUnless(3>2,'当条件为真是执行测试')
    def test_skip_unless(self):
        print('test ccc')

    @unittest.expectedFailure
    def test_expected_failure(self):
        self.assertEqual(2,3)

if __name__ == "__main__":
    unittest.main()
