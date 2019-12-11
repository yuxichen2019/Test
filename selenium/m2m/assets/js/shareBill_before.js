﻿﻿
ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	var queryData = {
		billType: 1
	}
	//数据表格
	var instance = ss.dataTable({ //64,369 
		appendTo: $('#shareBillBefore')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TPoolBillTotal/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify(queryData),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [
			//			{
			//				name: '账单周期',
			//				txt: 'operator',
			//				code: 0,
			//				type: 'select',
			//				width: '180px',
			//				data: [{
			//						'code': 1,
			//						'name': '移动'
			//					},
			//					{
			//						'code': 2,
			//						'name': '联通'
			//					},
			//					{
			//						'code': 3,
			//						'name': '电信'
			//					}
			//				]
			//			},
			{
				name: '客户名称',
				txt: 'customerUuid',
				code: 0,
				type: 'blurrySel',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
					dataType: 'json',
					data: {
						pageSize: 1000000,
					},
					rely: {
						name: 'customerName',
						code: 'uuid'
					},
					digitalModel: {
						data: {
							location: ['data', 'data']
						}
					}
				}
			},
			//			{
			//				name: '共享池名称',
			//				txt: 'name',
			//				type: 'txt',
			//				width: '200px'
			//			},

			{
				name: '运营商',
				txt: 'supId',
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': 1,
						'name': '移动'
					},
					{
						'code': 2,
						'name': '联通'
					},
					{
						'code': 3,
						'name': '电信'
					}
				]
			}
		], //搜索栏额外按钮
		searchBtn: {},
		//表格内容
		table: {
			//各选项
			options: {
				isCheckbox: true,
//				dpWPer: '110%',
				dpWith: {
					'billNo':9,
					'calculateCycle':6, 
					'customerUuid':6, 
					'poolUuid':8, 
					'supId':6, 
					'totalCardNum':6,
				    'totalFee':7, 
				    'totalFeeEx':7, 
				    'totalBillFee':7
				},
				closeInterlace: true,
				//				isChangeTime: [],

				showTitle: [
					'billNo', 'calculateCycle', 'customerUuid', 'poolUuid', 'supId', 'totalCardNum',
					'totalFee', 'totalFeeEx', 'totalBillFee'
				],
				shim: {
					supId: {
						'1': '移动',
						'2': '联通',
						'3': '电信',
					}
				},
				urlData: {
					customerUuid: {
						url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {},
						rely: {
							name: "customerName",
							code: "uuid"
						},
						digitalModel: {
							data: {
								location: ['data', 'data']
							}
						}
					},
					poolUuid: {
						url: commonUrl + '/admin/TPoolPlatform/getAvailablePoolPlatform.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {},
						rely: {
							name: "pfPoolName",
							code: "uuid"
						},
						digitalModel: {
							data: {
								location: ['data']
							}
						}
					},
				},
				//				sort: {
				//					'iccid': true,
				//				},
				//				shim: {
				//					
				//					'operator': {
				//						1: '移动',
				//						2: '联通',
				//						3: '电信'
				//					}
				//				},
				cbFn: function(curData) {
					window.setTimeout(function() {
						//详情弹窗
						for(var i = 0; i < document.querySelector(".tbCWrap").querySelectorAll("[name='billNo']").length; i++) {
							document.querySelector(".tbCWrap").querySelectorAll("[name='billNo']")[i].style.cursor = "pointer";
							document.querySelector(".tbCWrap").querySelectorAll("[name='billNo']")[i].style.color = "#009900";
							document.querySelector(".tbCWrap").querySelectorAll("[name='billNo']")[i].style.textDecoration = "underline";
							document.querySelector(".tbCWrap").querySelectorAll("[name='billNo']")[i].setAttribute('index', i)
							document.querySelector(".tbCWrap").querySelectorAll("[name='billNo']")[i].onclick = function() {
								var curObj = curData.tableData.data[this.getAttribute('index')]
								localStorage.setItem('curObj', JSON.stringify(curObj))
								location.hash = "shareBill_before_list";
							}
						}
					}, 500)
				}
			},

			tlName: ['账单编号', '计费周期', '客户名称', '共享池名称', '运营商', '计费卡片数量',
				'套餐总金额（元）', '扩容总金额（元）', '账单总金额（元）',
			], //表头名字 
			tlTxt: ['billNo', 'calculateCycle', 'customerUuid', 'poolUuid', 'supId', 'totalCardNum',
				'totalFee', 'totalFeeEx', 'totalBillFee'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				//				{
				//					name: '详情',
				//					colType: '',
				//					cbFn: function(curData, self) {
				//						refleshFn(curData, self)
				//					}
				//				}
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});

	//	tap切换
	$("#shareBillBefore .unicom").click(function() {
		$('#mobile').removeClass('active');
		$('#unicom').addClass('active');
		queryData = {
			billType: 2
		};
		instance.sourceObj.dataOption.data = JSON.stringify(queryData)
		instance.lg_reloadFn();
	})
	//	tap切换
	$("#shareBillBefore .mobile").click(function() {
		$('#unicom').removeClass('active');
		$('#mobile').addClass('active');
		queryData = {
			billType: 1
		};
		instance.sourceObj.dataOption.data = JSON.stringify(queryData)
		instance.lg_reloadFn();
	})
})