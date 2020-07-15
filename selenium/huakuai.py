# -*- coding: utf-8 -*- 
# 2020/07/14 16:26 
# Test
# huakuai.py 
# company
import random
import time
import cv2
import numpy as np
from selenium import webdriver
from urllib import request
from selenium.webdriver.common.action_chains import ActionChains


brower = webdriver.Chrome()


def loadpage():
    url = "https://upay.10010.com/npfweb/npfcellweb/phone_recharge_fill.htm"
    brower.get(url)
    brower.maximize_window()

    time.sleep(1)

    number = brower.find_element_by_xpath('//input[@id="number"]')
    number.send_keys(13008803219)
    time.sleep(1)
    brower.find_element_by_id('anyAmount').send_keys(1)
    brower.find_element_by_id('submitButton').click()

    frame = brower.find_element_by_id('tcaptcha_popup')
    brower.switch_to.frame(frame)


    time.sleep(3)
    while True:
        try:
            getPic()
        except:
            print("跳转成功----")
            break
    time.sleep(5)


def getPic():
    # 用于找到登录图片的大图
    s2 = r'//img[@id="slideBkg"]'
    # 用来找到登录图片的小滑块
    s3 = r'//img[@id="slideBlock"]'
    bigimg = brower.find_element_by_xpath(s2).get_attribute("src")
    smallimg = brower.find_element_by_xpath(s3).get_attribute("src")
    # print(smallimg + '\n')
    # print(bigimg)
    # 背景大图命名
    backimg = "backimg.png"
    # 滑块命名
    slideimg = "slideimg.png"
    # 下载背景大图保存到本地
    request.urlretrieve(bigimg, backimg)
    # 下载滑块保存到本地
    request.urlretrieve(smallimg, slideimg)
    # 获取图片并灰度化
    block = cv2.imread(slideimg, 0)
    template = cv2.imread(backimg, 0)
    # 二值化后的图片名称
    blockName = "block.jpg"
    templateName = "template.jpg"
    # 将二值化后的图片进行保存
    cv2.imwrite(blockName, block)
    cv2.imwrite(templateName, template)
    block = cv2.imread(blockName)
    block = cv2.cvtColor(block, cv2.COLOR_RGB2GRAY)
    block = abs(255 - block)
    cv2.imwrite(blockName, block)
    block = cv2.imread(blockName)
    template = cv2.imread(templateName)
    # 获取偏移量
    result = cv2.matchTemplate(block, template, cv2.TM_CCOEFF_NORMED)  # 查找block在template中的位置，返回result是一个矩阵，是每个点的匹配结果
    x, y = np.unravel_index(result.argmax(), result.shape)
    # print("x方向的偏移", int(y * 0.4 + 36), 'x:', x, 'y:', y)
    # 获取滑块
    i = int(y * 0.4 + 36)

    element = brower.find_element_by_xpath(s3)
    ActionChains(brower).click_and_hold(on_element=element).perform()

    while i > 0:
        # 如果距离大于10,可以移动的快一些
        if i > 10:
            x = random.randint(10, 18)
            ActionChains(brower).move_by_offset(x, 0).perform()
            i -= x
        # 如果距离小于10,移动的慢一些
        if i <= 15:
            x = random.randint(1, 3)
            ActionChains(brower).move_by_offset(x, 0).perform()
            i -= x

    ActionChains(brower).release(on_element=element).perform()
    time.sleep(1)


if __name__ == '__main__':


    loadpage()