# -*- coding: utf-8 -*- 
# 2019/12/11 15:01 
# Test
# conftest.py 
# company

#测试配置文件,只作用于当前目录及子目录

import pytest

#设置钩子函数
@pytest.fixture()
def test_url():
    return 'http://www.baidu.com'

