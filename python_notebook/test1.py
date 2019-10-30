# -*- coding: utf-8 -*- 
# 2019/10/21 17:46 
# yuxichen
# test1.py 
# hanwenlu

class Person(object):
    """人类"""
    def __init__(self,name):
        super(Person,self).__init__()
        self.name = name
        self.gun = None #用来保存枪的引用
        self.hp = 100

    def __str__(self):
        if self.gun:
            return "%s的血量:%d,他有枪%s"%(self.name,self.hp,self.gun)
        else:
            if self.hp>0:
                return "%s的血量:%d,他没有枪" % (self.name, self.hp)
            else:
                return "%s 已挂！！！"%(self.name)


    def kou_ban_ji(self,diren):
        """让枪发射子弹去打敌人"""
        self.gun.fire(diren)

    def diao_xue(self, sha_shang_li):
        """根据相应的杀伤力掉血"""
        self.hp -=sha_shang_li

    def anzhuang_zidan(self,dan_jia_temp,zi_dan_temp):
        """把子弹装到弹夹中"""
        dan_jia_temp.baocun_zidan(zi_dan_temp)

    def anzhuang_danjia(self,gun_temp,dan_jia_temp):
        """把弹夹安装到枪中"""
        gun_temp.baocun_danjia(dan_jia_temp)

    def naqiang(self,gun_temp):
        """拿起枪的动作 """
        self.gun =gun_temp



class Gun(object):
    """枪类"""
    def __init__(self,name):
        super(Gun,self).__init__()
        self.name = name #用来记录枪的类型
        self.danjia = None
    def baocun_danjia(self,dan_jia_temp):
        self.danjia =dan_jia_temp

    def __str__(self):
        return "枪的信息:%s"%(self.name)

    def fire(self,diren):
        """枪从弹夹中获取子弹"""
        zidan_temp = self.danjia.tanchu_zidan()
        if zidan_temp:
            zidan_temp.dazhong(diren)
        else:
            print("弹夹中没子弹了")


class Danjia(object):
    """弹夹"""
    def __init__(self,max_num):
        super(Danjia,self).__init__()
        self.max_num = max_num #用来记录弹夹的最大容量
        self.zidan_list = []#用来记录所有的子弹的引用

    def baocun_zidan(self,zi_dan_temp):
        """将子弹保存"""
        self.zidan_list.append(zi_dan_temp)

    def __str__(self,):
        return "弹夹的信息为:%d/%d"%(len(self.zidan_list),self.max_num)

    def tanchu_zidan(self):
        if self.zidan_list:
            return  self.zidan_list.pop()
        else:
            return None


class Zidan(object):
    """子弹"""
    def __init__(self,sha_shang_li):
        super(Zidan,self).__init__()
        self.sha_shang_li = sha_shang_li #用来记录子弹的威力

    def dazhong(self,diren):
        """"""
        diren.diao_xue(self.sha_shang_li)


def main():
    """用来控制整个程序的流程"""
    # 1.创建老王对象
    laowang = Person("老王")
    # 2.创建枪对象
    ak47 = Gun("Ak47")
    # 3.创建弹夹对象
    dan_jan = Danjia(20)
    # 4.创建一些子弹
    for i in range(15):
        zi_dan = Zidan(10)
        # 5.老王把子弹安装到弹夹中
        laowang.anzhuang_zidan(dan_jan, zi_dan)

    # 6.老王把弹夹安装到枪中
    laowang.anzhuang_danjia(ak47,dan_jan)

    #测试
    print(dan_jan)
    print(ak47)

    # 7.老王拿枪
    laowang.naqiang(ak47)
    print(laowang)
    # 8.创建一个敌人
    geibi_laosong = Person("李刚")
    print(geibi_laosong)
    # 9.老王开枪打敌人
    laowang.kou_ban_ji(geibi_laosong)
    print(geibi_laosong)
    print(laowang)

    laowang.kou_ban_ji(geibi_laosong)
    print(geibi_laosong)
    print(laowang)

if __name__=='__main__':
    main()
















class Zidan(object):
    def __init__(self,power):
        super().__init__()
        self.power = power

    def dazhongren(self,diren):
        diren.diaoxue(self.power)