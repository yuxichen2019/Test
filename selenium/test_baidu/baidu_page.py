# -*- coding: utf-8 -*- 
# 2019/12/04 18:01 
# Test
# BaiduPage.py 
# company

'''
from base import BasePage

class  BaiduPage(BasePage):
    """百度Page层，百度页面封装到操作到的元素"""
    url = 'https://www.baidu.com'
    # def __init__(self,driver):
    #     self.driver = driver

    def search_input(self,search_key):
        self.by_id('kw').send_keys(search_key)

    def search_button(self):
        self.by_id('su').click()
'''

#使用poium重写
from poium import Page,PageElement
class BaiduPage(Page):
    """百度Page层，百度页面封装到操作到的元素"""
    search_input = PageElement(id_='kw')
    search_button = PageElement(id_ ='su')
    #PageElement类定义元素定位并赋值给search_input 和search_button,这里仅封装元素的定位，并返回元素对象


"""
poium的更多用法
from poium import Page,PageElement
class SomePage(Page):
    elem_id = PageElement(id_='id')
    elem_name = PageElement(name='name')
    elem_class = PageElement(class_name = 'class')
    elem_tag = PageElement(tag='input')
    elem_link_text= PageElement(link_text='text')
    elem_partial_link_text = PageElement(partial_link_text='text2')
    elem_xpath = PageElement(xpath = '//*[@id="kk"]')
    elem_css = PageElement(css = '#id')

search_input = PageElement(id_='kw',timeout=5,describe='用户名')
"""