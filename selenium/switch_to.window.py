# _*_ coding:utf-8 _*_
# 开发团队：明日科技
# 开发人员：Administrator
# 开发时间：2019/10/21 23:12
# 文件名：switch_to.window.py
# 开发工具：PyCharm

#current_window_handle:获取当前窗口句柄
#window_handles:返回所有窗口的句柄到当前会话
#switch_tp.window():切换到相应窗口


import time
from selenium import webdriver


dr=webdriver.Chrome()
dr.implicitly_wait(10)
dr.get('http://www.baidu.com')

#打开百度搜索窗口句柄
search_windows = dr.current_window_handle

dr.find_element_by_link_text('登录').click()
dr.find_element_by_link_text('立即注册').click()

#获得当前所有打开的窗口句柄
all_handles = dr.window_handles

#进入注册窗口
for handle in all_handles:
    if handle != search_windows:
        dr.switch_to.window(handle)
        print(dr.title)
        dr.find_element_by_name('userName').send_keys('fishbaby')
        dr.find_element_by_name('phone').send_keys('15112342277')
        time.sleep(2)
        dr.close()



#回到搜索窗口
dr.switch_to.window(search_windows)
print(dr.title)

dr.quit()