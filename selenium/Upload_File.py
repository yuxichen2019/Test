# -*- coding: utf-8 -*- 
# 2019/10/23 15:48 
# Test
# Upload_File.py 
# hanwenlu

#104测试环境下入库一张卡片
#http://192.168.1.104:7300/html/index.html

from selenium import webdriver
from time import sleep
from selenium.webdriver.support.select import Select
import os



dr = webdriver.Chrome()
dr.get('http://192.168.1.104:7300/html/index.html')
dr.maximize_window()
sleep(1)
#登录
dr.find_element_by_xpath("//input[@class='lg_login_user_input']").send_keys('admin')
dr.find_element_by_xpath("//input[@class='lg_login_pw_input']").send_keys('123456')
dr.find_element_by_xpath("//div[@class='lg_login_btn_lg']").click()
sleep(1)

#卡片管理
dr.find_element_by_xpath("/html/body/div/div[1]/div/div[4]/div[3]/p/span[2]").click()
sleep(1)
#流量卡管理
dr.find_element_by_xpath('/html/body/div/div[1]/div/div[4]/div[3]/div[1]/p/span').click()
sleep(1)
dr.find_element_by_xpath("//div[@val='入库']").click()
sleep(1)


sel_s_u = dr.find_element_by_xpath("//select[@id='supplierUuid']")
#sel_c_t = dr.find_element_by_xpath("//*[@id="daoruForm"]/div[2]/div[2]/div")
sel_b_t = dr.find_element_by_xpath("//select[@id='businessType']")
sel_c_s = dr.find_element_by_xpath("//select[@id='cardSize']")
sel_e_p = dr.find_element_by_xpath("//select[@id='expensesPlan']")


Select(sel_s_u).select_by_visible_text('联通')
Select(sel_b_t).select_by_visible_text('流量卡')
Select(sel_c_s).select_by_index(3)
Select(sel_e_p).select_by_value('510WLW025581_PRE-IND_1024M_Merged') #广东联通1年免流

#abspath返回文件的路径
file_path = os.path.abspath(r'E:\yuxichen\file\ruku_iccid.xlsx')
dr.find_element_by_id('daoruFile').send_keys(file_path)
#添加备注信息
dr.find_element_by_xpath('//*[@id="huaboRemark"]').send_keys('自动化测试-入库')
dr.find_element_by_xpath('//*[@id="daoruSave"]').click()
sleep(1)
dr.find_element_by_link_text('确定').click()
sleep(1)



dr.quit()
