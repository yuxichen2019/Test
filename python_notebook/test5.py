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


#策略模式
#单例模式可以直接使用模块级变量来实现
class SingleClass:
    def __init__(self,x = 0):
        self.x = 0

sc = SingleClass()

def tsc():
    print(sc.x)
    sc.x = 10
    print(sc.x)

def tsc2():
    print(sc.x)
    sc.x = 8
    print(sc.x)

if  __name__ == "__main__":
    tsc()
    tsc2()




class Singleton:
    def __new__(cls,*args,**kwargs):
        if not hasattr(cls,'_sgl'):#测试cls这个类有没有_sgl这个属性，如果没有就执行父类的new方法来实例化 并
            cls._sgl = super().__new__(cls,*args,**kwargs)

        return cls._sgl

if __name__ == '__main__':
    sa = Singleton()
    sb = Singleton()
    print(id(sa))
    print(id(sb))
#无论实例化多少次这个类，他总是指向同一个id——————单实例



#普通工厂模式可以直接通过传入‘类名’作为参数实现
class Ab():
    a = 3

class Ac():
    a = 3

class MyFactory():
    def get_instance(self,ins):
        return  ins()  #返回的是对ins这个类的实例化

if __name__ == '__main__':
    my = MyFactory()

    print(type(my.get_instance(Ab)))
    print(type(my.get_instance(Ac)))


#类作为参数传递
class Moveable:
    def move(self):
        print('move....')

class MoveOnFeet(Moveable):
    def move(self):
        print('Move on feet/..')

class MoveOnWheel(Moveable):
    def move(self):
        print('Move on wheel/..')

class MoveObj:
    def set_move(self,moveable):
        self.moveable = moveable()
    def move(self):
        self.moveable.move() #调用是实际上是 上面类的move方法

class Test:#不继承Moveable
    def move(self):
        print('I an flying~~~~~~~~~~')

if __name__ == '__main__':
    m = MoveObj()
    m.set_move(Moveable)
    m.move()
    m.set_move(MoveOnFeet)
    m.move()
    m.set_move(MoveOnWheel)
    m.move()
    m.set_move(Test)
    m.move()


#函数（方法）作为参数传递
def movea():
    print('Move a..')

def moveb():
    print('move b..')

class MoveObj:
    def set_move(self,moveable): #此时 参数就是一个方法，所以下面也不需要 .move了额
        self.moveable = moveable
    def move(self):
        self.moveable

if __name__ == '__main__':
    m = MoveObj()
    m.set_move(movea())
    m.move()
    m.set_move(moveb())
    m.move()


#装饰模式
#
class BeDeco:
    def be_edit_fun(self):
        print('Source fun')

    def be_keep_fun(self):
        print('Keep fun')

class Decorater:
    def __init__(self,dec):#dec 是被装饰的类的名字
        self._dec = dec()  #在此类中建一个私有属性（被装饰类的实例化）
    def be_edit_fun(self): #定义被装饰类中需要被修改的方法
        print('Start....')
        self._dec.be_edit_fun()

    def be_keep_fun(self):#不做修改
        self._dec.be_keep_fun()
if __name__ == '__main__':
    bd = BeDeco()
    bd.be_edit_fun()
    bd.be_keep_fun()

    dr = Decorater(BeDeco)
    dr.be_edit_fun()
    dr.be_keep_fun()




class Water:
    def __init__(self):
        self.name = 'Water'
    def show(self):
        print(self.name)

class Deco:#定义被装饰类
    def show(self):
        print(self.name)

class Sugar(Deco):
    def __init__(self,water):  #参数为water的实例
        self.name = 'Sugar'
        self.water = water
    def show(self):
        print(self.name)
        print(self.water.name)

class Salt(Deco):
    def __init__(self,water):
        self.name = 'Salt'
        self.water = water
    def show(self):
        print(self.name)
        print(self.water.name)

if __name__ == '__main__':
    w = Water()
    s = Sugar(w)#Sugar这个类装饰了Water
    s.show()


    s = Salt(w)
    s.show()