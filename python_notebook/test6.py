# -*- coding: utf-8 -*- 
# 2019/11/13 9:10 
# Test
# test6.py 
# company

class MyDes:
    def __init__(self,initval=None,name=None):
        self.val = initval
        self.name = name

    def __get__(self, instance, owner):
        #print('正在获取变量：%s' % self.name)
        print('正在获取变量：',self.name)
        return self.val

    def __set__(self, instance, value):
        print('正在修改变量：',self.name)
        self.name=value

    def __delete__(self, instance):
        print('正在删除变量：',self.name)
        print('哦！无法删除~~')



class Test:
    x = MyDes(10,'x')




