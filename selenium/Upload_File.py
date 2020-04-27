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
sleep(2)

#卡片管理
dr.find_element_by_xpath("//*[text()='卡片管理']").click()
sleep(1)

#流量卡管理
dr.find_element_by_xpath('/html/body/div/div[1]/div/div[4]/div[3]/div[1]/p/span').click()
sleep(1)
# dr.find_element_by_class_name("allwrap").click()
# dr.find_element_by_xpath("//li[@code='eOW1D05c6QmSKal0pxVIG1Vui1xkNFBg']").click()
# dr.find_element_by_name("searchAdv").click()
# dr.find_element_by_id('activateTimeStart').click()
# dr.find_element_by_xpath("//*[@lay-type='year']").click()
# dr.find_element_by_xpath("//*[@lay-ym='2016']").click()
# dr.find_element_by_xpath("//*[@lay-type='month']").click()
# dr.find_element_by_xpath("//*[@lay-ym='11']").click()
# dr.find_element_by_xpath("//td[text()='27']").click()
dr.find_element_by_name('export').click()

#Select(dr.find_element_by_xpath("/html/body/div[1]/div[2]/div[3]/div/div[4]/div/div[2]/div[4]/span[2]/select")).select_by_value("2")
#Select(re).select_by_index(2)
# dr.find_element_by_xpath("//div[@val='入库']").click()
# sleep(1)
#
#
# sel_s_u = dr.find_element_by_xpath("//select[@id='supplierUuid']")
# #sel_c_t = dr.find_element_by_xpath("//*[@id="daoruForm"]/div[2]/div[2]/div")
# sel_b_t = dr.find_element_by_xpath("//select[@id='businessType']")
# sel_c_s = dr.find_element_by_xpath("//select[@id='cardSize']")
# sel_e_p = dr.find_element_by_xpath("//select[@id='expensesPlanCode']")
#
#
# Select(sel_s_u).select_by_value('MQIIfcnO9fRbLIoeBhXzps2Cf83rwIzJ')
# Select(sel_b_t).select_by_visible_text('流量卡')
# Select(sel_c_s).select_by_index(3)
# Select(sel_e_p).select_by_visible_text('广东9元1年免流') #广东联通1年免流
#
# #abspath返回文件的路径
# file_path = os.path.abspath(r'E:\yuxichen\file\ruku_iccid.xlsx')
# dr.find_element_by_id('daoruFile').send_keys(file_path)
# #添加备注信息
# #dr.find_element_by_xpath('//*[@id="huaboRemark"]').send_keys('自动化测试-入库')
#
# #添加备注信息尝试另一种方法：
# text = '自动化测试 入库2'
# js = "document.getElementById('huaboRemark').value = '" + text + "';"
# dr.execute_script(js)
#
#
#
# dr.find_element_by_xpath('//*[@id="daoruSave"]').click()
# sleep(1)
# dr.find_element_by_link_text('确定')
# sleep(1)
#
#
#
# #dr.quit()



