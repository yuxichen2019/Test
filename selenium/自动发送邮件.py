# -*- coding: utf-8 -*- 
# 2019/12/04 11:23 
# Test
# 自动发送邮件.py 
# company
#

# import smtplib
# from email.mime.text import MIMEText
# from email.header import Header
#
# subject = "python email test"
# #编写HTML格式的正文
# msg = MIMEText('<html><h1>这是一封测试邮件2</h1></html>','html','utf-8')
# msg['Subject'] = Header(subject,'utf-8')
#
# #发送邮件
# msg['From'] = '707148142@qq.com'
# msg['To'] = '215432581@qq.com'
#
# smtp = smtplib.SMTP()
# smtp.connect("smtp.qq.com")
# smtp.login('707148142@qq.com','pbbykbhwabavbdia')
# smtp.sendmail(msg['From'],msg['To'],msg.as_string())
# smtp.quit()



#      发送附件的邮件
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
#
# subject = 'Python send email test'
# #附件
# with open(r'E:\yuxichen\Test\selenium\test_report\log.txt','rb') as f:
#     send_att = f.read()
# print(send_att)
#
# att = MIMEText(send_att,"text",'utf-8')
# #Content-Type指定附件内容类型，application/octet-stream表示二进制流
# att["Content-Type"] = 'application/octet-stream'
# #Content-Disposition指定显示附件的文件；attachment;filename="log.txt" 指定附件文件名
# att["Content-Disposition"] = 'attachment;filename="log.txt"'
#
# msg = MIMEMultipart()
# msg['Subject']=subject
# msg.attach(att)  #attch指定附件信息
#
# msg['From'] = '707148142@qq.com'
# msg['To'] = '215432581@qq.com'
#
# smtp = smtplib.SMTP()
# smtp.connect("smtp.qq.com")
# smtp.login('707148142@qq.com','pbbykbhwabavbdia')
# smtp.sendmail(msg['From'],msg['To'],msg.as_string())
# smtp.quit()

#yagmail发送邮件
import yagmail

yag = yagmail.SMTP(user='yuxichen2020@126.com',password='yuxichen2020',host='smtp.126.com')

contents = ['This is the body,and here is just text http://somedoman/image.png','You can find an audio file attached.']

#yag.send('707148142@qq.com','subject',contents) #需要发送多个人，就吧各个地址list

#如果要发送附件
yag.send('707148142@qq.com','subject',contents,[r'E:\yuxichen\Test\selenium\test_report\2019-11-27 17_33_39result.html'])