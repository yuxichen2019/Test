# -*- coding: utf-8 -*-
# 2019/11/21 9:59 
# Test
# MD5.py 
# company

#
#
# dict = {"method":"sohan.m2m.iccid.customerBagList","username":"一级客户","timestamp":"1574302713314"}
# a=[]
# for a in dict.keys():
#     a.append(ord(a[0]))
#     if a.count(ord(a[0]))>1:
#

# string=[]
# for x in dict1.items():
#     string.append(x)
#
# print(string)
# for i in string:

import hashlib
import time
import json

millis = str(int(round(time.time() * 1000)))
dic = {
    "method": "sohan.m2m.iccid.customerBagList",
    "username": "一级客户",
    "timestamp": millis,
    "ctime":""
}
def sign(**dic):
    dict1 = {}
    dict2 = {}
    val=0
    for i in dic.keys():
        if dic.get(i) == '' or dic.get(i) == None:
            pass
        else:
            val = int(ord(i[0]))
            #print(i[0],val)
            dict1[i] = val
    stringA = ''
    print(dict1)
    for k in sorted(dict1, key=dict1.__getitem__):
        stringA += (k + '=' + dic[k] + '&')
    stringSignTemp = stringA + 'key=HNlWEvapIcnHIwvWK55lz79j5AKlQQd9'
    print(stringSignTemp)
    md5 = hashlib.md5()
    md5.update(stringSignTemp.encode(encoding='utf-8'))
    sign = md5.hexdigest()
    signValue = sign.upper()
    dic['sign'] = signValue
    for p in sorted(dic):
        if dic.get(p) == '' or dic.get(p) == None:
            pass
        else:
            dict2[p] = dic[p]
    print(json.dumps(dict2, ensure_ascii=False).replace(',', ', '))
sign(**dic)
