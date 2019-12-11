ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];

	function ajaxFn(urlStr, param) {
		var data = [];
		$.ajax({
			url: commonUrl + urlStr,
			type: 'post',
			contentType: 'application/json;charset=utf-8',
			async: false,
			data: param || {},
			success: function(res) {
				if(res.result == 'success') {
					data = res.data;
				} else {
					layer.msg(res.errorMsg || '数据获取失败');
				}
			},
			error: function(err) {
				layer.msg(err);
			}
		})
		return data;
	}
	//统计数据
	var summaryData = ajaxFn('/admin/TWxTradeProfits/countProfit.action', {}) || {};
	//月，周数据显示
	var fieldArr = [{
			key: 'tradeNum',
			name: '交易单数',
			unit: '单'
		},
		{
			key: 'amount',
			name: '交易金额',
			unit: '元'
		},
		{
			key: 'profit',
			name: '分润金额',
			unit: '元'
		}
	]

	function renderData(parentClass, data) {
		for(var i = 0; i < fieldArr.length; i++) {
			var parentDom = document.querySelector('.' + parentClass)
			parentDom.querySelector('.' + fieldArr[i].key).innerHTML = data[fieldArr[i].key] + fieldArr[i].unit;
		}

	}
	//周数据回显
	renderData('weekData', summaryData.weekly);
	//月数据回显
	renderData('monthData', summaryData.monthly);
	//余额回显
	document.querySelector('.balance_box').querySelector('.balance').innerHTML = summaryData.count.amount + '元';

	//查看明细
	function weekDate() {
		var day = new Date();
		var num = day.getDay() - 1;
		day.setDate(day.getDate() - num); //本周第一天
		var str = ss.dpDate.normalYMD(day);
		day.setDate(day.getDate() + 6); //本周最后一天
		var str1 = ss.dpDate.normalYMD(day);
		return str + '至' + str1;
	}
	function monthDate() {
		var day = new Date();
		day.setDate(1); //本月第一天
		var str = ss.dpDate.normalYMD(day);
		day.setMonth(day.getMonth() + 1); //下个月
		day.setDate(day.getDate() - 1); //下个月第一天减1得到本月最后一天
		var str1 = ss.dpDate.normalYMD(day);
		return str + '至' + str1;
	}
	var detail_week = ajaxFn('/admin/TWxTradeProfits/countWeekProfitDetail.action') || [];
	var detail_month = ajaxFn('/admin/TWxTradeProfits/countMonthProfitDetail.action') || [];
	var checkViewArr = document.querySelectorAll('.checkView');
	for(var i = 0; i < checkViewArr.length; i++) {
		checkViewArr[i].onclick = function() {
			var type = 1;
			if(this.classList.value.indexOf('month') > 0) {
				type = 2;
			}

			checkModal(type)
		}
	}

	function checkModal(type) {
		var model = {
			id: 'myModal_check'
		};
		popupAll(model);
		
		document.querySelector('.dateView').innerHTML = type == 1 ? weekDate():monthDate();
		var checkData = type == 1 ? detail_week : detail_month;
		//明细导出
		document.querySelector('.exportBtn').onclick = function(){
			var urlS = type==1? '/admin/TWxTradeProfits/exportProfitWeeklyDetail.action':'/admin/TWxTradeProfits/exportProfitMohthLyDetail.action';
			exportFn(urlS);
		}
		
		renderTable(checkData);
	}
	//渲染表格内容
	function renderTable(data) {
		var bodyDom = document.querySelector('.self_table_body');
		bodyDom.innerHTML = '';
		if(data.length < 1) {
			ss.crtDom('div', 'nodata', '无数据', bodyDom, {});
		} else {
			for(var i = 0; i < data.length; i++) {
				ss.crtDom('div', 'item', '', bodyDom, {})
					.appendDom(function(dom) {
						ss.crtDom('div', 'cell', data[i].customerName, dom, {});
						ss.crtDom('div', 'cell', data[i].tradeNum, dom, {});
						ss.crtDom('div', 'cell', data[i].amount, dom, {});
						ss.crtDom('div', 'cell', data[i].profit, dom, {});
					})
			}
		}
	}

	//数据表格
	var tbInstance = ss.dataTable({ //64,369
		appendTo: $('#summaryData')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TWxTradeProfits/countProfitDetailByCustomer.action',
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项    
		searchOption: [{
				name: '客户名称',
				txt: 'customerName',
				type: 'txt',
				width: '200px'
			},
			{
				name: '客户级别',
				txt: 'customerLevel',
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': 1,
						'name': '一级客户'
					},
					{
						'code': 2,
						'name': '二级客户'
					},
					{
						'code': 3,
						'name': '三级客户'
					}
				]
			}
		], //搜索栏额外按钮
		searchBtn: {
			export: {
				name: '导出',
				colType: 'opt2',
				cbFn: function(self) {
					var params = self.scope.queryObj;
					exportFn("/admin/TWxTradeProfits/exportProfitDetail.action",params);
				}
			}
		},
		//表格内容
		table: {
			//各选项
			options: {
				sort: [''],
				//				dpWPer: '120%',
				dpWith: {
					grade: 6
				},
				closeInterlace: true,
				isChangeTime: [], //是否进行时间戳转时间 
				showTitle: [

				],
				//动态别名转换
				urlData: {},
				shim: {
					'grade': {
						1: '一级客户',
						2: '二级客户',
						3: '三级客户'
					}
				}
			},
			tlName: [
				'客户名称', '客户级别', '交易单数', '交易金额', '分润金额（元）', '分润账户余额', '提现冻结金额'
			], //表头名字
			tlTxt: [
				'customerName', 'grade', 'tradeNum', 'amount', 'profit', 'balance', 'frozen'
			], //表头字段
			//操作项
			operation: [{
				name: '提现记录',
				colType: '',
				cbFn: function(curData, self) {
					localStorage.setItem('summary_uuid',curData.customerId);
				    ss.relation_tabTitleFn('withdrawCheck');//tab栏各项关联menu菜单
					window.location.href = "#withdrawCheck";
				}
			}],

		},
		//分页
		pageOption: {
			//各选项
		}
	});
	//导出
	function exportFn(url,params) {
		var loading = layer.load(1, {
			  shade: [0.1,'#fff'] //0.1透明度的白色背景
			});
		//发送请求
		$.ajax({
			url: commonUrl + url,
			type: 'post',
			data: JSON.stringify(params || {}),
			dataType: 'json',
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			success: function(data) {
				layer.close(loading);
				if(data.result == 'success') {
					window.location.href = '' + data.data;
				} else {
					layer.msg(data.data || data.errorMsg || '系统异常，请联系客服！')
				}

			},
			error: function(data) {
				layer.close(loading);
				layer.msg('数据获取失败')
			}
		});
	}
});