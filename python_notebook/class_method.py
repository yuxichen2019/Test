# _*_ coding:utf-8 _*_
# 开发团队：明日科技
# 开发人员：Administrator
# 开发时间：2019/10/22 22:32
# 文件名：class_method.py
# 开发工具：PyCharm

#错误示例：
class Person(object):
    def __init__(self, name):
        self.name = name

    @classmethod  # 把eat方法变为类方法
    def eat(self):
        print("%s is eating" % self.name)

d = Person("xiaoming")
d.eat()

#结果：AttributeError: type object 'Person' has no attribute 'name'
#因为self.name这个变量是实例化这个类传进去的，类方法是不能访问实例变量的，只能访问类里面定义的变量



class Person(object):
    name = "杰克"

    def __init__(self, name):
        self.name = name

    @classmethod  # 把eat方法变为类方法
    def eat(self):
        print("%s is eating" % self.name)


d = Person("xiaoming")
d.eat()

