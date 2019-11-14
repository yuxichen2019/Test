import time


class Record:
    def __init__(self, val, name):
        self.val = val
        self.name = name
        self.filename = 'record.txt'

    # 转义符 换行       f.write()一行的方式
    def __get__(self, instance, owner):
        with open(self.filename, 'a', encoding='utf-8') as f:
            f.write('%s 变量于北京时间 %s 正在被访问,%s = %s\n' % \
                    (self.name, time.ctime(), self.name, str(self.val)))
        return self.val

    def __set__(self, instance, value):
        # filename = '%s_record.txt' % self.name
        with open(self.filename, 'a', encoding='utf-8') as f:
            f.write('%s 变量于北京时间 %s 正在被修改,%s = %s\n' % \
                    (self.name, time.ctime(), self.name, str(value)))
        self.val = value


class Test:
    x = Record(10, 'x')
    y = Record(8.8, 'y')
