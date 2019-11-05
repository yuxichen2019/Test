# -*- coding: utf-8 -*- 
# 2019/11/05 16:49 
# Test
# 窗口截图save_screenshot().py 
# company


from selenium import webdriver

driver = webdriver.Chrome()
driver.get('https://www.baidu.com')

#截取当前窗口，指定截图图片的保存位置，建议png格式
driver.save_screenshot('./file/baidu_img.png')