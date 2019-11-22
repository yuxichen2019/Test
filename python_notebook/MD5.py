# -*- coding: utf-8 -*-
# 2019/11/21 9:59 
# Test
# MD5.py 
# company

import hashlib
import time
import json

millis = str(int(round(time.time() * 1000)))
dic = {
    "username": "广联",
    "timestamp": millis,
    "iccid":"89860619000012298059",
    "method":"sohan.m2m.bag.doubleBag"
}
def sign(**dic):
    dict1 = {}
    dict2 = {}
    #过滤值为空的
    for i in dic.keys():
        if dic.get(i) == '' or dic.get(i) == None:
            pass
        else:
            dict1[i] = dic[i]
    #print('dict1:',dict1)
    stringA = ''
    for k in sorted(dict1):
        stringA += (k + '=' + dic[k] + '&')
    #print(stringA)
    stringSignTemp = stringA + 'key=MBKObITf817FqgyYjX06FSQWRCE1RFXF'
    #print(stringSignTemp)
    md5 = hashlib.md5()
    md5.update(stringSignTemp.encode(encoding='utf-8'))
    #md5.hexdigest()返回的是十六进制
    sign = md5.hexdigest()
    #转为大写
    signValue = sign.upper()
    dict1['sign'] = signValue
    for p in sorted(dict1):
        dict2[p]=dict1[p]
    print(json.dumps(dict2,ensure_ascii=False)) #ensure_ascii=False对中文不转化
    #print(json.dumps(dict2,indent=4,ensure_ascii=False))
sign(**dic)
