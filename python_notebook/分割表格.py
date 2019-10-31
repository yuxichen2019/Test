# -*- coding: utf-8 -*- 
# 2019/10/31 13:49 
# Test
# 123.py 
# hanwenlu


# Excel表格放在同目录下的file目录，并新建一个new文件夹存放拆分后的Excel表格。

import os
import math
import xlrd
import xlwt

dir = os.getcwd() + '\\123.xlsx\\'


def get_file_list(file_dir):
    for root, dirs, files in os.walk(file_dir):
        return files


def split_xls(name):
    limit = 10000
    print(name)
    limit = int(limit)
    data = xlrd.open_workbook(dir + name)
    # 获取sheet
    table = data.sheets()[0]
    # 行数
    nrows = table.nrows
    print('总行数{}'.format(nrows))
    # 列数
    ncols = table.ncols
    sheets = math.ceil(nrows / limit)
    print('拆分文件数量:{}'.format(sheets))
    workbook = xlwt.Workbook(encoding='ascii')
    for i in range(int(sheets)):
        if i == 0:
            start_row = 0
        else:
            start_row = i * limit
        if i == sheets - 1:
            end_row = nrows
        else:
            end_row = (i + 1) * limit
        # print(start_row)
        # print(end_row)

        new_arr = []
        new_arr.append(['型号', '未含税价'])
        for row in range(start_row, end_row):
            if i == 0 and row == 0:
                continue
            sku = table.cell_value(row, 0)
            price = table.cell_value(row, 1)
            new_arr.append([sku, price])
        # print(new_arr)

        new_workbook = xlwt.Workbook()
        new_worksheet = new_workbook.add_sheet('Sheet1', cell_overwrite_ok=True)
        for new_row in range(0, len(new_arr)):
            new_worksheet.write(new_row, 0, new_arr[new_row][0])
            new_worksheet.write(new_row, 1, new_arr[new_row][1])

        old_name = name.split('.')
        new_name = old_name[0] + '-' + str(i) + '.xls'
        new_workbook.save(os.getcwd() + '\\new\\' + new_name)
    print('************************************')


if __name__ == '__main__':
    file_list = get_file_list(dir)
    for name in file_list:
        split(name)
