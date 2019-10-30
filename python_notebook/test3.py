# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/10/30 23:21
# 文件名：test3.py
# 开发工具：PyCharm

class Animal:
    name = '老虎'

    def __init__(self, name='老虎', age=5):
        self.name = name
        self.age = age
        self.weight = 200

    def eat(self):
        self.height = 100
        return '我需要吃东西！'

    @classmethod
    def sleep(cls):
        return '我需要睡觉'


class Dog(Animal):
    def __init__(self, age):
        self.age = age


a = Animal()
d = Dog(8)
print(Animal.__dict__.keys())
print(a.__dict__.keys())
print(Dog.__dict__.keys())
print(d.__dict__.keys()






class Animal:
    name = '老虎'

    def __init__(self):
        pass


class Dog(Animal):
    age = 10

    def __init__(self, height):
        self.height = height

    def __getattr__(self, propertyname):
        if propertyname == 'weight':
            return 200
        else:
            raise AttributeError


d = Dog(150)
print(d.height)
print(d.age)
print(d.name)
print(d.weight)



# 总结：对象属性的访问优先级顺序为：
#
# ①.实例属性
#
# ②.类属性
#
# ③.父类的类属性
#
# ④.__getattr__()方法