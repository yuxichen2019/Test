# -*- coding: utf-8 -*- 
# 2019/10/31 18:30 
# Test
# HTML5 VEDIO.py 
# hanwenlu


from time import sleep,ctime
from  selenium import webdriver

dr=webdriver.Chrome()

dr.get('http://videojs.com/')
for i in range(15):
    try:

        video = dr.find_element_by_id('preview-player_html5_api')
        if video.is_displayed():
            break

    except:
        pass

else:
    print('Time Out')
print(ctime())

url = dr.execute_script('return arguments[0].currentSrc;',video)

print(url)

#播放视频
print('start')
dr.execute_script('arguments[0].play()',video)

sleep(15)

print('Stop')
dr.execute_script('arguments[0].pause()',video)

dr.quit()