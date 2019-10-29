# -*- coding: utf-8 -*- 
# 2019/10/28 13:41 
# Test
# GetSign.py 
# hanwenlu




# class GetSign:
#     def __init__(self,arraylist,methon,timestamp,store_id,total_amount,client_trade_no,barCode):
#         self.arraylist = []
#         self.method='sohan.trade.create'
#         self.timestamp=1352847384
#         self.store_id=1
#         self.total_amount=1
#         self.client_trade_no=29839821639846
#         self.barCode=120061098828009406
#
#     def


import hashlib
#import json
#
# class Mydict(dict):
#     def __str__(self):
#         return json.loads(self)

apikey = "vRMyfGB9DNvUUOEO53D8nXsomOqWoDsi"  # 验证密钥，由开发提供

body = {
        "method":"sohan.m2m.iccidinfo.query",
        "timestamp":"1551428606305",
        "iccid":"89860619140006250086",
    #"iccids":["89860619140006250086","8986061910002394785"],
        "username":"客户演示"
    #"Operator":"2"

        }

# 列表生成式，生成key=value格式
a = ["".join(i) for i in body.items() if i[1] and i[0] != "sgin"]
print(a)
print(sorted(a))
# 参数名ASCII码从小到大排序
strA = "".join(sorted(a))
print(strA)

# 在strA后面拼接上apiKey得到striSignTemp字符串
striSignTemp = strA+apikey

# 将strSignTemp字符串转换为小写字符串后进行MD5运算

# MD5加密
def jiamimd5(src):
    m = hashlib.md5()
    m.update(src.encode('UTF-8'))
    return m.hexdigest()

sign = jiamimd5(striSignTemp)
print(sign)

# 得到sign签名后新的body值
body["sign"] = sign


#inp_dict = json.loads(body)
# body1 = Mydict(body)
print(body)

