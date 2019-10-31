# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/10/28 22:34
# 文件名：washer.py
# 开发工具：PyCharm

class Washer:

    company = 'meide'

    def __init__(self,water = 0,scour = 0):
        self._water = water
        self.scour = scour
        self.year = 2015


    @staticmethod
    def spins_ml(spin):
       # print(Washer.company)
       # print(self.year)  会报错   静态方法只能调用类属性，不能访问实例属性
        return spin * 0.4

    @classmethod  #类方法
    def get_washer(cls,water,scour):
        return cls(water,cls.spins_ml(scour))

    @property
    def water(self):
        return self._water

    @water.setter
    def water(self,water):
        if 0<water<500:
            self._water = water
        else:
            print(' SET failure!!')

    @property  #静态方法，直接  类名的实例.方法名  不用加括号 就可以调用
    def total_year(self):
        return  2019 - self.year

    def set_water(self,water):
        self.water = water

    def set_scour(self,scour):
        self.scour = scour

    def add_water(self):
        print('Add_water:',self.water)

    def add_scour(self):
        print('Add_scour:',self.scour)

    def start_wash(self):
        self.add_water()
        self.add_scour()
        print('Start wash~~~~~~~~~~~~~')


if __name__ == '__main__':
    # w = Washer()
    # print(w.water)
    # w.water=123
    # print(w.scour)
    # print(w.total_year)
    # print(Washer.spins_ml(8))
    # w = Washer()
    # print(w.spins_ml(10))
    #
    # w = Washer(200,Washer.spins_ml(10))
    # w.start_wash()

    w = Washer.get_washer(100,9)
    w.start_wash()


