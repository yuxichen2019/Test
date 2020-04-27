#错误示例：

class Person(object):
    def __init__(self, name):
        self.name = name

    @staticmethod  # 把eat方法变为静态方法
    def eat(self):
        print("%s is eating" % self.name)


d = Person("xiaoming")
d.eat()

#运行报错 TypeError: eat() missing 1 required positional argument: 'self'
#因为用静态方法把eat这个方法与Person这个类截断了, eat方法就没有了类的属性了，所以获取不到self.name这个变量。

#正确示例：

class Person(object):
    def __init__(self, name):
        self.name = name

    @staticmethod  # 把eat方法变为静态方法
    def eat(x):
        print("%s is eating" % x)

d = Person("xiaoming")
d.eat("jack")

# 就把eat方法当作一个独立的函数给他传参就行了

