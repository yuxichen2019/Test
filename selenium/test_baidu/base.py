# -*- coding: utf-8 -*- 
# 2019/12/05 9:55 
# Test
# base.py 
# company

class BasePage():
    """
    基础Page层，封装一些常用方法
    """
    def __init__(self,driver):
        self.driver =  driver

    def open(self,url=None):
        if url is None:
            # 如果url为空，则打开子类的中定义的url。
            self.driver.get(self.url)
        else:
            self.driver.get(url)
    def by_id(self,id):
        return self.driver.find_element_by_id(id)

    def by_name(self,name):
        return self.driver.find_element_by_name(name)

    def by_class(self,class_name):
        return self.driver.find_element_by_class_name(class_name)

    def by_xpath(self,xpath):
        return self.driver.find_element_by_xpath(xpath)

    def by_css(self,css):
        return self.driver.find_element_by_css_selector(css)

    def get_title(self):
        return self.driver.title

    #获取页面的text,仅适用xpath定位
    def get_text(self,xpath):
        return self.by_xpath(xpath).text
    def js(self,script):
        self.driver.execute_script(script)
