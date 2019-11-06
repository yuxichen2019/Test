# _*_ coding:utf-8 _*_
# 开发团队：明日科技
# 开发人员：Administrator
# 开发时间：2019/10/24 21:14
# 文件名：Temperature.py
# 开发工具：PyCharm

#描述符相关的魔法方法
#给摄氏度赋值  自动计算出华氏度
#描述符  摄氏度
class Celsius:
    def __init__(self, value=26):
        self.value = float(value)
    def __get__(self, instance, owner):
        return self.value
    def __set__(self, instance, value):
        self.value = float(value)
#描述符 华氏度
class Fahrenheit:
    # self是自己的实例：fah。  instance是拥有者Temperature的实例temp。  owner就是Temperature
    def __get__(self, instance, owner):
        return instance.cel * 1.8 + 32
    def __set__(self, instance, value):
        instance.cel = (float(value) - 32) / 1.8
#温度类
class Temperature:
    cel = Celsius()
    fah = Fahrenheit()

temp = Temperature()
#设置摄氏度30  求华氏度
temp.cel=30
print(temp.fah)
#华氏度86  求摄氏度
temp.fah = 86
print(temp.cel)
