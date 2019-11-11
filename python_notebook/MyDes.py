# _*_ coding:utf-8 _*_
# 开发团队：复仇者联盟
# 开发人员：Administrator
# 开发时间：2019/11/11 22:43
# 文件名：MyDes.py
# 开发工具：PyCharm

# class MyDes:
#     def __init__(self, value = None):
#         self.val = value
#     def __get__(self, instance, owner):
#         return self.val ** 2
#
# class Test:
#     def __init__(self):
#         self.x = MyDes(3)
# if __name__ == '__ main__':
#     test = Test()
#     test.x
#结果是  <__main__.MyDes object at 0x0000000003872788>
#如你所见，访问实例层次上的描述符x，只会返回描述符本身。为了让描述符能够正常工作，它们必须定义在类的层次上。如果你不这样做，那么Python无法自动为你调用__ get__和__ set__方法。
#正确如下：
# class MyDes:
#     def __init__(self, value=None):
#         self.val = value
#
#     def __get__(self, instance, owner):
#         return self.val ** 2
#
# >> >
#
# class Test:
#     x = MyDes(3)
#
# >> > test = Test()
# >> > test.x
# 9




#按要求编写描述符MyDes：当类的属性被访问、修改或设置的时候，分别作出提醒。   https://www.jianshu.com/p/d3b41de6a91a
class MyDes:
    def __init__(self,initval=None,name=None):
        self.initval = initval
        self.name = name
    def __get__(self, instance, owner):
        print('正在获取变量:',self.name)
        return  self.name
    def __set__(self, instance, value):
        print('正在修改变量:',self.name)
        self.name = value
    def __delete__(self, instance):
        print('正在删除变量：',self.name)
        print("┗|｀O′|┛ 嗷~~这个变量没法删除~")