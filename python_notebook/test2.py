# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/10/27 21:39
# 文件名：test2.py
# 开发工具：PyCharm

class NonNeg:
    def __init__(self,default=0):
        self.default = default

    def __get__(self, instance, owner):
        return  self.default

    def __set__(self, instance, value):
        if value <= 0:
            print('set failure~~~')
        else:
            self.default = value

    def __delete__(self, instance):
        pass
class Movie:
    rating = NonNeg()   #描述符就是将某种特殊类型的类指派给另一个类的类属性。特殊属性的类里边至少要定义__get__,__set__,__delete__三个特殊方法中的任意一个。
    score = NonNeg()

if __name__ == '__main__':
    m = Movie()
    print('rating:',m.rating)
    print('score:',m.score)
    m.rating = 80
    print('rating:',m.rating)
    m.score = -80
    print('score:',m.score)