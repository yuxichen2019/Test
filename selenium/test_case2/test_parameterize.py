# -*- coding: utf-8 -*- 
# 2019/12/11 11:56 
# Test
# test_parameterize.py 
# company

import pytest
import math

@pytest.mark.parametrize(
    "base, exponent, expected",        #定义参数名称
    [(2,2,4),
     (2,3,8),
     (1,9,1),
     (0,9,0)],
    ids=["case1","case2","case3","case4"]     #ids默认为None,定义测试用例的名称
    )

def test_pow(base,exponent,expected):
    assert math.pow(base,exponent) == expected  #math模块的pow()用于计算x的y次方

'''
pytest -u test_parameterize.py
       -v 参数用于增加测试用例的冗长
       -q        减少
       -x 如果出现一条测试用例失败，则退出测试
       
pytest ./test_dir 运行测试目录
pytest tets_fixtures_o2.py::TestMultiply::test_numbers_5_6 指定特定类或方法执行
 
pytest -k add test_assert.py  指定执行用例名称包含add的用例

import pytest
if __name__ == '__main__':
    pytest.main(['-s','./test_dir'])
通过main()方法运行测试

'''