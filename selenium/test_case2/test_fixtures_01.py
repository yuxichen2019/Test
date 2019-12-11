# -*- coding: utf-8 -*- 
# 2019/12/11 10:27 
# Test
# test_fixtures_02.py 
# company
#Fixture用来对测试方法，测试函数，测试类和整个测试文件进行初始化或还原测试环境。
#创建功能函数
def multiply(a,b):
    return a * b


#=========fixture==========
def setup_module(module):                 #当前文件中，所有用例执行之前执行。1
    print('setup_module================>')

def teardown_module(module):              #当前文件中，所有用例执行之后执行。
    print('teardown_module=================>')

def setup_function(function):               #在每个测试函数之前执行 2
    print('set_function---------------->')

def teardown_function(function):          #在每个测试函数之后执行
    print('teardown_function--------------->')

def setup():                              #3
    print('setup---------->')

def teardown():                           #
    print('teardown----------->')

#==========测试用例============
def test_multiply_3_4():
    print('test_number_3_4')
    assert multiply(3,4) == 12

def test_multiply_a_3():
    print('test_string_a_3')
    assert multiply('a',3) == 'aaa'