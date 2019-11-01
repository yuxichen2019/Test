# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/11/2 0:24
# 文件名：test5.py
# 开发工具：PyCharm

class Point:
    def __init__(self,x,y):
        self.x = x
        self.y = y

    def __add__(self,other):
        return Point(self.x + other.x,self.y + other.y)

    def info(self):
        print(self.x,self.y)
#
# class D3Point(Point):
#     def __init__(self,x,y,z):
#         super().__init__(x,y)
#         self.z = z
#
#     def __add__(self, other):
#         return D3Point(self.x + other.x,self.y + other.y,self.z + other.z)
#
#     def info(self):
#         print(self.x,self.y,self.z)



#这个类不继承Point类，结果也一样的
class D3Point:
    def __init__(self,x,y,z):
        self.x = x
        self.y = y
        self.z = z

    def __add__(self, other):
        return D3Point(self.x + other.x,self.y + other.y,self.z + other.z)

    def info(self):
        print(self.x,self.y,self.z)

def myadd(a,b):
    return  a + b

if __name__ ==  '__main__':
    myadd(Point(1,2),Point(3,4)).info()
    myadd(D3Point(1,2,3),D3Point(4,5,6)).info()