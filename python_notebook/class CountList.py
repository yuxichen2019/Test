# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/11/5 22:54
# 文件名：class CountList.py
# 开发工具：PyCharm

class CountList:
    def __init__(self,*args):
        self.values = [x for x in args]
        self.count = {}.fromkeys(range(len(self.values)),0)
        # 使用列表的下标作为字典的键，，注意不能用元素做键，因为元素有可能重复


    def __len__(self):
        return len(self.values)

    def __getitem__(self,key):
        self.count[key] += 1
        return self.values[key]

