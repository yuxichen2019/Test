# _*_ coding:utf-8 _*_
# 开发团队：明日科技
# 开发人员：Administrator
# 开发时间：2019/10/22 22:36
# 文件名：property.py
# 开发工具：PyCharm

#错误示例：

# class Person(object):
#     def __init__(self, name):
#         self.name = name
#     @property  # 把eat方法变为属性方法
#     def eat(self):
#         print("%s is eating" % self.name)
# d = Person("xiaoming")
# d.eat()

#结果：TypeError: 'NoneType' object is not callable
#因为eat此时已经变成一个属性了， 不是方法了， 想调用已经不需要加()号了，直接d.eat就可以了

# class Person(object):
#     def __init__(self, name):
#         self.name = name
#     @property  # 把eat方法变为属性方法
#     def eat(self):
#         print("%s is eating" % self.name)
# d = Person("xiaoming")
# d.eat


class C:
    def __init__(self,size=10):
        self.size = size

    def getSize(self):
        return self.size

    def setSize(self,vaule):
        self.size = vaule

    def delSize(self):

        del self.size

    x=property(getSize,setSize,delSize)

c =C()

c.x