# -*- coding: utf-8 -*- 
# 2019/12/10 17:32 
# Test
# test_sample.py.py 
# company

import pytest

def inc(x):
    return x + 1

def test_answer():
    assert inc(3) == 5

def add(a,b):
    return a + b

def is_prime(n):
    if n<1:
        return False
    for i in  range(2,n):
        if n % i == 0:
            return False
        return True

def test_add_1():
    assert add(3,4) == 7

def test_add_2():
    assert add(17,22) != 50

def test_add_3():
    assert add(17,22) <= 50

def test_add_4():
    assert add(17,22) >= 38



if __name__ == '__main__':
    pytest.main()