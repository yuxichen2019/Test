# _*_ coding:utf-8 _*_
# 开发团队：明日科技
# 开发人员：Administrator
# 开发时间：2019/10/21 21:17
# 文件名：l_r_shift.py
# 开发工具：PyCharm

class Nstr(str):
    def __lshift__(self, other):
        return self[other::] + self[:other:]

    def __rshift__(self, other):
        return self[:-other:] + self[-other::]






a = Nstr('I Love FishC.com')
print(a << 3)
print(a >> 3)