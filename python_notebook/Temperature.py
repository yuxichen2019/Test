# _*_ coding:utf-8 _*_
# 开发团队：明日科技
# 开发人员：Administrator
# 开发时间：2019/10/24 21:14
# 文件名：Temperature.py
# 开发工具：PyCharm

class Celsius:
    def __init__(self, value=37):
        self.value = float(value)

    def __get__(self, instance, owner):
        return self.value

    def __set__(self, instance, value):
        self.value = float(value)

class Fahrenheit:
    def __get__(self, instance, owner):
        return instance.cel * 1.8 + 32

    def __set__(self, instance, value):
        instance.cel = (float(value) - 32) / 1.8

class Temperature:
    cel = Celsius()
    fah = Fahrenheit()