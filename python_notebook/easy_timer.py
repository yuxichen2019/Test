# _*_ coding:utf-8 _*_
# 开发团队：明日科技
# 开发人员：Administrator
# 开发时间：2019/10/20 17:51
# 文件名：easy_timer.py
# 开发工具：PyCharm

import time as t
class MyTimer():

    def __init__(self):
        self.unit = ['年', '月', '天', '小时', '分钟', '秒']
        self.prompt = '未开始计时！'
        self.lasted = []
        self.begin = 0
        self.end = 0

    def __str__(self):
        return self.prompt

    __repr__ = __str__

    def start(self):
        self.begin = t.localtime()

        self.prompt = '请先调用stop停止计时..'
        print('开始计时')

    def stop(self):
        if not self.begin:
            print('请先调用start开始计时..')
        else:
            self.end = t.localtime()
            self._calc()
            print('结束计时')

    def _calc(self):
        self.lasted = []
        self.prompt = '总共运行了'
        for i in range(6):
            self.lasted.append(self.end[i] - self.begin[i])
            if self.lasted[i]:
                self.prompt += (str(self.lasted[i]) + self.unit[i])
        # 为下一轮计算初始化变量
        # self.begin = 0
        # self.end = 0

    def __add__(self, other):
        prompt = '两者总共运行了'
        result = []
        for q in range(6):

            result.append(self.lasted[q] + other.lasted[q])
            if result[q]:
                prompt += (str(result[q]) + self.unit[q])
        return prompt

#123
#456
#789