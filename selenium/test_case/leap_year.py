# -*- coding: utf-8 -*- 
# 2019/11/12 16:01 
# Test
# leap_year.py 
# company


#判断某年是否为闰年
class LeapYear:
    def __init__(self, year):
        self.year = int(year)

    def answer(self):
        year = self.year
        if year % 100 == 0:
            if year % 400 == 0:
                return "{0}是闰年".format(year)

            else:
                return "{0}不是闰年".format(year)

        else:
            if year % 4 == 0:
                return "{0}是闰年".format(year)
            else:
                return "{0}不是闰年".format(year)
