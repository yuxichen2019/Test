# -*- coding: utf-8 -*- 
# 2019/11/08 18:04 
# Test
# read_json.py 
# company


import json
with open('./data_file/user_info.json','r') as f:
    data = f.read()
print(data)

user_list = json.loads(data)     #json 对象转化为相应的 python 对象
print(user_list)