from time import sleep,ctime
from selenium import webdriver

driver = webdriver.Chrome()
driver.get('https://www.baidu.com')

print(ctime())

for i  in range(5):
    try:
        e = driver.find_element_by_id('kw2')

        if e.is_displayed():
            break

    except:
        pass
    sleep(1)

else:
    
    print('timeout')

print(ctime())
driver.quit()
