# -*- coding: utf-8 -*- 
# 2019/12/11 11:29 
# Test
# test_fixtures_02.py 
# company

def multiply(a,b):
    return a*b

class TestMultiply:
    @classmethod
    def setup_class(cls):
        print('setup_class================>')

    @classmethod
    def teardown_class(cls):
        print('teardown_class===========>')

    def setup_method(self,method):
        print('setup_method------->')

    def teardown_method(self,method):
        print('teardown_method------>')

    def setup(self):
        print('setup-------->')

    def teardown(self):
        print('teardown---->')

    #========测试用例============
    def test_numbers_5_6(self):
        print('test_numbers_5_6')
        assert multiply(5,6 )  == 30

    def test_numbers_b_3(self):
        print('test_string_b_3')
        assert multiply('b', 3) == 'bbb'