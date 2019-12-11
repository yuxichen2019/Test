# -*- coding: utf-8 -*- 
# 2019/12/11 15:01 
# Test
# conftest.py 
# company

import pytest

#设置钩子函数
@pytest.fixture()
def test_url():
    return 'http://www.baidu.com'


