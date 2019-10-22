# _*_ coding:utf-8 _*_
# 开发团队：明日科技
# 开发人员：Administrator
# 开发时间：2019/10/21 20:51
# 文件名：jianquzifu.py
# 开发工具：PyCharm

class Nstr(str):
    def __sub__(self, other):


        return self.replace(other,'')


a = Nstr('I Love FishC.comiiiiiiiiiiiiiiiii!!')
b = Nstr('i')
print(a-b)