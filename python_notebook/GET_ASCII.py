# -*- coding: utf-8 -*- 
# 2019/10/21 15:38 
# yuxichen
# GET_ASCII.py 
# hanwenlu

class Nint(int):
    def __new__(cls,arg=0):
        if isinstance(arg,str):
            total = 0
            for i in arg:
                total += ord(i)
                arg = total

        return int.__new__(cls,arg)

print(Nint(1))
print(Nint('A'))
print(Nint('asd'))