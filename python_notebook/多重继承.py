# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/10/31 22:32
# 文件名：多重继承.py
# 开发工具：PyCharm


class A():
    def foo(self):

        print('A FOO')

class B():
    def foo(self):
        print('B foo')


class C(A,B):
    pass

c =C()
c.foo()

class D(B,A):
    pass

d = D()
d.foo()