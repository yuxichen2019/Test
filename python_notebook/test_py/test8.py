# -*- coding: utf-8 -*- 
# 2019/11/14 17:28 
# Test
# test8.py 
# company

# import pickle
# my_list=[123,3.14,'小甲鱼',['abc']]
# pickle_file = open('E:\\my_list.pkl','wb')
# pickle.dump(my_list,pickle_file)
# pickle_file.close()
#
# pickle_file = open('E:\\my_list.pkl','rb')
# my_list=pickle.load(pickle_file)
# print(my_list)
#打包wb  解包rb

import os
import pickle

class MyDes:
    saved = []
    def __init__(self,name = None):
        self.name = name
        self.filename = self.name + '.pkl'

    def __get__(self, instance, owner):
        if self.name not in MyDes.saved:
            raise AttributeError('%s属性还没有赋值！' % self.name)   #AttributeError 找不到属性值
        with open(self.filename,'rb') as f:
            value = pickle.load(f)
        return value

    def __set__(self, instance, value):
        with open(self.filename,'wb') as f:
            pickle.dump(value,f)
            MyDes.saved.append(self.name)

    def __delete__(self, instance):
        os.remove(self.filename)
        MyDes.saved.remove(self.name)