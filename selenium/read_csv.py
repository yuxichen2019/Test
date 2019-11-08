# -*- coding: utf-8 -*- 
# 2019/11/08 11:12 
# Test
# read_csv.py 
# company

#读取csv文件
# import csv
# import codecs
from itertools import islice   #islice(iterable, [start, ] stop [, step]):
# #创建一个迭代器，生成项的方式类似于切片返回值： iterable[start : stop : step]，将跳过前start个项，迭代在stop所指定的位置停止，step指定用于跳过项的步幅。与切片不同，负值不会用于任何start，stop和step，如果省略了start，迭代将从0开始，如果省略了step，步幅将采用1.


#这一段是书上的
# data = csv.reader(codecs.open('./data_file/user_info.csv','r','utf_8_sig'))
#
# users = []
#
# for line in islice(data,1,None):
#
#     users.append(line)
#
# print(users)




from selenium import webdriver
from module import Mail

import csv
with open("./data_file/user_info.csv") as f:
    reader = csv.reader(f)
    users = []
    for line in islice(reader,1,None):

       users.append(line)

    print(users)

driver = webdriver.Chrome()
driver.get("http://www.126.com")
driver.maximize_window()
driver.find_element_by_link_text('密码登录').click()

mail = Mail(driver)
#正确的账号密码登陆
mail.login(users[0][0],users[0][1])

#密码为空
#mail.login(users[1][0],users[1][1])
#账号为空
#mail.login(users[2][0],users[2][1])
#账号密码错误
#mail.login(users[4][0],users[4][1])

# sleep(2)
# mail.logout()
# sleep(1)
# driver.quit()
