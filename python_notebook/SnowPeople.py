# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/11/4 23:02
# 文件名：SnowPeople.py
# 开发工具：PyCharm


class Shape:
    def __init__(self,cvns,points): #cvns画布对象，points为绘制图形提供坐标
        self.cvns = cvns
        self.points = points
        self.pid = None        #在画布中的ID号
    def delete(self):     #将当前图像删除
        if self.pid:
            self.cvns.delete(self.pid)

class ShapeAngles(Shape):
    def __init__(self,cvns,points,angles=(10,170)):    #多了一个角度属性
        super().__init__(cvns,points)
        self.angles = {'start':angles[0],'extent':angles[1]}

class HatTop(Shape):
    def draw(self):
        self.pid = self.cvns.create_oval(*self.points)
class HatBottom(Shape):
    def draw(self):
        self.pid = self.cvns.create_oval(*self.points)

