# -*- coding: utf-8 -*- 
# 2019/10/24 14:16 
# Test
# Download_File.py 
# hanwenlu

#导出状态变更记录

from selenium import webdriver
from time import sleep
import os
import requests
import json

# options = webdriver.ChromeOptions()
# prefs = {'profile.default_content_settings.popups':0,#禁止弹出下载窗口
#          'download.default_directory': r'E:\yuxichen\Product\test_dir\data\down_file' } #设置下载路径
# options.add_experimental_option('prefs',prefs)
#
# #  这里将课本的 chrome_options=options 改为options=options
# dr = webdriver.Chrome(options=options)
#apim2m.sy666.com/index/m2m/api/v1
# dr.get('http://192.168.1.104:7300/html/index.html')
# dr.maximize_window()
# sleep(1)
# #登录
# dr.find_element_by_xpath("//input[@class='lg_login_user_input']").send_keys('admin')
# dr.find_element_by_xpath("//input[@class='lg_login_pw_input']").send_keys('123456')
# dr.find_element_by_xpath("//div[@class='lg_login_btn_lg']").click()
# sleep(1)
#
# #卡片管理
# dr.find_element_by_xpath("/html/body/div/div[1]/div/div[4]/div[3]/p/span[2]").click()
# sleep(1)
#
# dr.find_element_by_xpath("/html/body/div/div[1]/div/div[4]/div[3]/div[1]/p/span").click()
# sleep(1)
#
#
# dr.find_element_by_name('export').click()
# sleep(2)
#
# file_path = r'E:\yuxichen\Product\test_dir\data\down_file'
#
# list=os.listdir(file_path)
# print(list[-1])
#
# print(os.path.join(file_path,list[-1]))


headers = {    "Content-Type":"application/json" }
url= 'http://192.168.6.99:7300/index/m2m/api/v1'
data_json=json.dumps({
    "iccid":"89860619050008947664",
    "method":"sohan.m2m.iccid.deactivate",
    "sign":"84FB4DAF697852EDD74E778137EA53D8",
    "timestamp":"1578385382980",
    "username":"客户演示"
})
res = requests.post(url, data=data_json, headers=headers)
print(res.text)
