try:
    
    sum = 1 + '1'
    f = open('我是一步.txt')
    print(f.read())
    f.close()

except OSError as reason:
    print('出错啦！！\n错误的原因是：'+str(reason))

except TypeError as reason:
    print('出错啦！！\n错误的原因是：'+str(reason))

