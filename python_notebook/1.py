



# -*- coding: utf-8 -*-
# 2019/10/23 15:48
# Test
# Upload_File.py
# hanwenlu

#104测试环境下入库一张卡片
#http://192.168.1.104:7300/html/index.html


import os
import xlrd

# -*- coding: utf-8 -*-
# 2019/12/25 18:09
# Product
# Mysql.py
# company

import pymysql

class Mysql:
    """
    对pymysql的简单封装
    """
    def __init__(self):
        self.host = '192.168.1.104'
        self.port = 3306
        self.user = "han"
        self.pwd = "SY666.com"
        self.db = "icms"

    def __GetConnect(self):
        """
        得到连接信息
        返回: conn.cursor()
        """
        if not self.db:
            raise(NameError,"没有设置数据库信息")
        self.conn = pymysql.connect(host=self.host,user=self.user,password=self.pwd,database=self.db,charset="utf8")
        cur = self.conn.cursor()
        if not cur:
            raise(NameError,"连接数据库失败")
        else:
            return cur

    def execQuery(self,sql):
        """
        执行查询语句
        返回的是一个包含tuple的list，list的元素是记录行，tuple的元素是每行记录的字段

        调用示例：
                ms = MYSQL(host="localhost",user="sa",pwd="123456",db="PythonWeiboStatistics")
                resList = ms.ExecQuery("SELECT id,NickName FROM WeiBoUser")
                for (id,NickName) in resList:
                    print str(id),NickName
        """
        cur = self.__GetConnect()
        cur.execute(sql)
        resList = cur.fetchall()

        #查询完毕后必须关闭连接
        self.conn.close()
        return resList

    def execNonQuery(self,sql):
        """
        执行非查询语句

        调用示例：
            cur = self.__GetConnect()
            cur.execute(sql)
            self.conn.commit()
            self.conn.close()
        """
        cur = self.__GetConnect()
        cur.execute(sql)
        self.conn.commit()
        self.conn.close()

    # iccid_path = os.path.abspath(r'E:\yuxichen\Product\test_dir\data\ruku_iccid.xlsx')
    #
    #
    # def get_iccid(self):
    #     data = xlrd.open_workbook(self.iccid_path)
    #     table = data.sheets()[0]
    #     self.iccid = table.cell(1, 0).value
    #     return self.iccid

# data = xlrd.open_workbook(iccid_path)
# table = data.sheets()[0]
# iccid = table.cell(1, 0).value
# print(iccid)
# mq =Mysql()
# sql='''
#         SELECT remark FROM `t_card_store` where iccid = '%s'
#         '''
#
#
# data=(mq.get_iccid())
#
# customername = mq.execQuery(sql % data)
# print(customername[0][0])


