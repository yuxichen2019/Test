# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/11/1 23:37
# 文件名：test4.py
# 开发工具：PyCharm

class Animal:
    def move(self):
        print('Animal is  moving....')

class Dog(Animal):
    pass

def move(obj):
    obj.move()

class Cat():
    def move(self):
        print('cat  is   moving')

if __name__ == '__main__':
    dog = Dog()
    print(dog)
    dog.move()

    animal =Animal()
    move(animal )
    print(Cat())
    move(Cat())
