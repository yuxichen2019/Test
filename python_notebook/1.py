# -*- coding: utf-8 -*- 
# 2019/12/19 10:22 
# Test
# 1.py 
# company


from selenium import webdriver
from selenium.webdriver.support.select import Select
from time import sleep

list=[]
dr = webdriver.Chrome()
dr.get('http://192.168.1.104:7300/html/index.html')
dr.find_element_by_id('lg_user_input').send_keys('admin')
dr.find_element_by_id('lg_pw_input').send_keys('123456')
dr.find_element_by_class_name('lg_login_btn_lg').click()
sleep(2)
dr.find_element_by_xpath('/html/body/div/div[1]/div/div[4]/div[1]/div[2]/p/span').click()
sleep(2)
# dr.find_element_by_name('add').click()
# sleep(1)
# dr.find_element_by_xpath('/html/body/div[3]/div[2]/div[4]/div[2]/div').click()
# dr.find_element_by_xpath('/html/body/div[3]/div[2]/div[4]/div[2]/div/div/p[2]').click()
# dr.find_element_by_xpath('/html/body/div[3]/div[2]/div[6]/div[2]/div').click()
# dr.find_element_by_xpath('/html/body/div[3]/div[2]/div[6]/div[2]/div/div/p[3]').click()
# dr.find_element_by_class_name('viewC_btnSave').click()
text=dr.find_elements_by_xpath('//*[@id="dataCon_cus"]/div[2]/div[2]/div/div[3]')

for i in text:
    list.append(i.text)

for j in list:
    if '测试客户' in j:
        assert False
    else:
        assert True