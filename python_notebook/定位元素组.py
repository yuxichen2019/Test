#定位一组元素

from time import sleep
from selenium import webdriver
driver = webdriver.Chrome()

driver.get('https://www.baidu.com')

driver.find_element_by_id('kw').send_keys('selenium')

driver.find_element_by_id('su').click()
sleep(2)

texts = driver.find_elements_by_xpath('//div[@tpl="se_com_default"]/h3/a')


for t in texts:
    print(t.text)

