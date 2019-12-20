# -*- coding: utf-8 -*- 
# 2019/10/24 14:16 
# Test
# Download_File.py 
# hanwenlu

#导出状态变更记录

from selenium import webdriver
from time import sleep


options = webdriver.ChromeOptions()

prefs = {'profile.default_content_settings.popups':0,#禁止弹出下载窗口
         'download.default_directory': r'E:\yuxichen\file' } #设置下载路径
options.add_experimental_option('prefs',prefs)

#  这里将课本的 chrome_options=options 改为options=options
dr = webdriver.Chrome(options=options)

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
dr.find_element_by_xpath("/html/body/div/div[1]/div/div[4]/div[3]/div[5]/p/span").click()
sleep(1)
dr.find_element_by_xpath("//div[@id='dataCon']/div[2]/div[1]/div/div[11]").click()


#
#测试
# driver.get("http://sahitest.com/demo/saveAs.htm")
# sleep(5)
#
# driver.find_element_by_xpath('//a[text()="testsaveas.zip"]').click()
