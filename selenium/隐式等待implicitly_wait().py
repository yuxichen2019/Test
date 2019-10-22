from time import ctime
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

driver =webdriver.Chrome()

driver.implicitly_wait(10)
driver.get('https://www.baidu.com')

try:
    print(ctime())
    driver.find_element_by_id('kw22')

except  NoSuchElementException as e:
    print(e)

finally:
    print(ctime())

driver.quit()
