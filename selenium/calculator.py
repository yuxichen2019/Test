# -*- coding: utf-8 -*- 
# 2019/11/11 16:48 
# Test
# calculator.py 
# company


class Calculator:
    def __init__(self,a,b):
        self.a = a
        self.b = b

    def add(self):
        return  self.a + self.b

    def sub(self):
        return self.a - self.b

    def mul(self):
        return self.a * self.b

    def div(self):
        return  self.a / self.b


