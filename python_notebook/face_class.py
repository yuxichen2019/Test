# -*- coding: utf-8 -*-
# 2019/10/24 11:40
# Test
# face_class.py
# hanwenlu


class Person(object):
    def __init__(self, temp_name):
        super().__init__()
        self.name = temp_name
        self.HP = 100
        self.gun = None

    #安装子弹到弹夹
    def install_bullet(self, temp_clip, temp_bullet):
        temp_clip.upper_bullet(temp_bullet)

    #安装弹夹到枪
    def install_clip(self, temp_gun, temp_clip):
        temp_gun.add_clip(self, temp_clip)

    #谁拿起枪
    def take_gun(self, temp_gun):
        self.gun = temp_gun

    #对敌人射击  开火
    def shoot(self, temp_enemy):
        if self.gun:
            self.gun.fire(temp_enemy)
        else:
            print('{}没有枪'.format(self.name))

    def loss_HP(self, temp_power):
        #掉血
        self.HP -= temp_power
        if self.HP <= 0:
            print('{}挂壁了'.format(self.name))

    def __str__(self):
        return '{}\nHP:{}/100\nGUN:{}'.format(self.name, self.HP, self.gun)



#定义枪 的类
class Gun(object):
    def __init__(self, temp_name):
        self.name = temp_name

    def add_clip(self, temp_clip):
        #添加弹夹到枪中
        self.clip = temp_clip

    def fire(self, temp_enemy):
        temp_bullet =self.clip.pop_bullet()
        if temp_bullet:
            temp_bullet.hit(temp_enemy)
        else:
            print('子弹打完咯~~~')

    def __str__(self):
        return '{},{}'.format(self.name, self.clip)


#定义弹夹的类
class Clip(object):
    def __init__(self):
        super(Clip, self).__init__()
        self.max_bullet = 20
        self.bullet_list= []
    #给弹夹上子弹
    def upper_bullet(self, temp_bullet):
        if len(self.bullet_list) < self.max_bullet:
            self.bullet_list.append(temp_bullet)
        else:
            print('弹夹装满啦~~~')

    def pop_bullet(self):
        if self.bullet_list:
            self.bullet_list.pop()
        else:
            print('子弹打完啦~~~')


#定义子弹的类
class Bullet(object):
    def __init__(self, temp_power): #有不同的威力的子弹
            super(Bullet, self).__init__()
            self.power = temp_power

    def hit(self, temp_enemy):
        # 子弹击中敌人，敌人掉血
        temp_enemy.loss_HP(self.power)




