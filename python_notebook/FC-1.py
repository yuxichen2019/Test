# -*- coding: utf-8 -*- 
# 2019/10/25 17:46 
# Test
# FC-1.py 
# hanwenlu

class A(object):

   def foo(self, x):
       print("executing foo(%s, %s)" % (self,x))

   @classmethod
   def class_foo(cls, x):
       print("executing class_foo(%s, %s)" % (cls,x))

   @staticmethod
   def static_foo(x):
       print("executing static_foo(%s)" % (x))

a = A()

A.class_foo(6)