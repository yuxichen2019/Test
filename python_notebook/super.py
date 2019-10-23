# -*- coding: utf-8 -*- 
# 2019/10/23 14:14 
# Test
# super.py 
# hanwenlu

class Base(object):
    def __init__(self):
        print('enter Base')
        print('leave Base')

class A(Base):
    def __init__(self):
        print('enter A')
        super().__init__()
        print('leave A')

class B(Base):
    def __init__(self):
        print('enter B')
        super().__init__()
        print('leave B')

class C(A, B):
    def __init__(self):
        print('enter C')
        super().__init__()
        print('leave C')

#C()
#运行结果如下：
# enter C
# enter A
# enter B
# enter Base
# leave Base
# leave B
# leave A
# leave C

#C.mro()
#[<class '__main__.C'>, <class '__main__.A'>, <class '__main__.B'>, <class '__main__.Base'>, <class 'object'>]

# super(cls, inst) 获得的是 cls 在 inst 的 MRO 列表中的下一个类。