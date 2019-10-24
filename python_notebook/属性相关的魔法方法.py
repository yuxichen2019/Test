# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/10/24 23:12
# 文件名：属性相关的魔法方法.py
# 开发工具：PyCharm

class Rectangle:
    def __init__(self,width=1,height=2):
        self.width = width
        self.height = height

    def __setattr__(self, key, value):
        if key == 'square':
            self.width = value
            self.height = value
        else:
            super().__setattr__(key,value)

    def getArea(self):
        return self.width * self.height

r = Rectangle(4,5)
print(r.getArea())

r.square = 10
print(r.getArea())
