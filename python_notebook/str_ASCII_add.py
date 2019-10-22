# _*_ coding:utf-8 _*_
# 开发团队：明日科技
# 开发人员：Administrator
# 开发时间：2019/10/21 22:05
# 文件名：str_ASCII_add.py
# 开发工具：PyCharm


#第一种方法，先把str转换成int,（参考GET_ASCII.py）因为整形可以直接计算+ — * / //

#第二种方法
class Nstr(str):

    def __init__(self,string):
        if isinstance(string,str):
            self.total = 0
            for i in string:
                self.total += ord(i)



    def __add__(self, other):
        return self.total + other.total

    def __sub__(self, other):
        return self.total - other.total

    def __mul__(self, other):
        return self.total * other.total

    def __truediv__(self, other):
        return self.total / other.total

    def __floordiv__(self, other):
        return self.total // other.total


a=Nstr('FishC')
b=Nstr('love')
print(a+b)
print(a-b)
print(a*b)
print(a/b)
print(a//b)