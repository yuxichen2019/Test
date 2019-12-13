# -*- coding: utf-8 -*- 
# 2019/12/11 16:27 
# Test
# pytest扩展.py 
# company

'''
一.pytest-html
pip install pytest-html

cmd窗口 移动到对应目录下
>pytest ./ --html=./report/result.html

会在当前目录下生成report目录，里面有result.html文件

二.pytest-rerunfailures   在测试用例失败时重试
pip install pytest-rerunfailures
创建test_rerunfailures.py

def test_fail_rerun():
    assert 2+2 ==5

>pytest -v test_rerunfailures.py --reruns 3





三.pytest-parallel
pip install pytest-parallel
创建test_parallel.py ,在每条测试用例中分别设置sleep()来模拟运行时间较长的测试用例

不使用线程运行测试用例
>pytest -q test_parallel.py

pytest -q test_parallel.py --tests-per-worker auto

更多用法：
1运行两个工作线程，每个工作线程一次运行一个测试
pytest --workers 2
2运行4个工人（假设是四核机器），每个工人一个测试
pytest --workers auto
3运行一个线程，一次执行4个测试
pytest --tests-per-worker 4
4.......

'''