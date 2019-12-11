ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon_cs')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TCardStore/queryByPageInfo.action', //请求Url
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
				txt: 'iccid',
				type: 'txt',
				width: '200px'
			},
			{
				name: '运营商',
				txt: 'operator',
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
			},
			{
				name: '订单时间',
				txt: 'iccdStart',
				type: 'txt',
				width: '200px'
			}, {
				name: '订单时间',
				txt: 'iccdEnd',
				type: 'txt',
				width: '200px'
			}
		], //搜索栏额外按钮
		searchBtn: {
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TCardStore/addEntity.action',
				items: {
					iccid: {
						name: 'ICCID',
						type: 'txt',
						verify: true
					},
					supplierUuid: {
						name: '供应商',
						type: 'select',
						verify: true,
						data: {
							url: commonUrl + '/admin/TSuppliers/queryByPageInfo.action',
							data: {
								currentPage: 1,
								pageSize: 10000
							},
							dataType: 'json',
							rely: {
								name: 'supplierName',
								code: 'uuid'
							},
							digitalModel: {
								data: {
									location: ['data', 'data']
								}
							}
						}
					},
					cardType: {
						name: '卡片类型',
						type: 'select',
						verify: true,
						data: [{
								name: 'MP0',
								code: '1'
							},
							{
								name: 'MP1',
								code: '2'
							},
							{
								name: 'MP2',
								code: '3'
							}, {
								name: 'MS0',
								code: '4'
							},
							{
								name: 'MS1',
								code: '5'
							},
							{
								name: 'MS2',
								code: '6'
							},
						]
					},
					businessType: {
						name: '业务类型',
						type: 'select',
						verify: true,
						data: [{
								name: '语音卡',
								code: '1'
							},
							{
								name: '流量卡',
								code: '2'
							}
						]
					}
				}
			},
		},
		//表格内容
		table: {
			//各选项
			options: {
				isCheckbox: true,
				sort: ['iccid'],
				dpWPer: '125%',
				dpWith: {
					createTime: 10,
				},
				closeInterlace: true,
				showTitle: [
					'iccid', 'supplierName', 'customerName',
					'imei', 'imsi', 'ONLINE', 'simStatus', 'activateTime',
					'stopTime', 'isBind', 'cardType', 'activationType',
					'flowMonthUsed', 'flowMonthResidual', 'createTime'
				],
				shim: {
					'cardType': {
						'1': 'MP0',
						'2': 'MP1',
						'3': 'MP2',
						'4': 'MS0',
						'5': 'MS1',
						'6': 'MS2',
					},
					'simStatus': {
						"1": '可激活',
						"2": '已激活',
						"3": "停用",
						"4": '失效'
					},
					'activationType': {
						'1': '手动激活',
						'2': '自动激活'
					}
				}
			},
			tlName: ['ICCID', '供应商', '客户',
				'IMEI', 'IMSI', '在线状态', '激活状态', '激活时间',
				'卡到期时间', '是否绑定', '卡片类型', '激活类型',
				'本月已用流量', '本月剩余流量', '创建时间'
			], //表头名字
			tlTxt: ['iccid', 'supplierName', 'customerName',
				'imei', 'imsi', 'ONLINE', 'simStatus', 'activateTime',
				'stopTime', 'isBind', 'cardType', 'activationType',
				'flowMonthUsed', 'flowMonthResidual', 'createTime'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				{
					name: '查看',
					dataType: 'json',
					saveCbFn: function(queryObj) {
						JSON.parse(queryObj.data).phone.replace(/，/g, ',')
						return queryObj
					},
					items: {
						iccid: 'iccid',
						supplierName: '供应商',
						customerName: '客户'
					}
				},
				 {
                    name:'编辑',
                    url:commonUrl+'/admin/TSuppliers/editEntity.action',
                    dataType:'json',
                    items:{
						iccid: {name: 'iccid',type: 'txt',verify:true,},
						supplierName: {
							name: '供应商',type: 'select',verify:true,
							data:[
								{name:'移动',code:'1'},
								{name:'联通',code:'2'},
								{name:'电信',code:'3'},
							]
						},
						customerName: {name: '客户',type: 'txt',verify:true,},
                    },
                  	data:{uuid:''},
                },
                {
                    name:'删除',
                    colType:'del',
                    dataType:'json',
                    url:commonUrl+'/admin/TSuppliers/deleteEnttiybyUuid.action',
                    data:{uuid:''}
                },
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});
	//导出
	function exportFn(self) {
		//请求地址
		var queryUrl = commonUrl + "/admin/TCardStore/queryByPageInfo.action";
		//请求参数
		var params = {
			'currentPage': 1,
			'pageSize': 1000
		}
		//		var data = disposeRequestData();
		//发送请求
		$.ajax({
			url: queryUrl,
			type: 'post',
			data: JSON.stringify(params),
			dataType: 'json',
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			success: function(data) {
				var dataContainer = data.data.data;
				var option = {};
				option.fileName = '卡库';
				option.datas = [{
					sheetData: [], //数据源
					sheetName: 'sheet',
					sheetFilter: ['iccid', 'supplierName', 'customerName',
						'imei', 'imsi', 'ONLINE', 'simStatus', 'activateTime',
						'stopTime', 'isBind', 'cardType', 'activationType',
						'flowMonthUsed', 'flowMonthResidual', 'createTime',
					],
					sheetHeader: ['ICCID', '供应商', '客户',
						'IMEI', 'IMSI', '在线状态', '激活状态', '激活时间',
						'卡到期时间', '是否绑定', '卡片类型', '激活类型',
						'本月已用流量', '本月剩余流量', '创建时间'
					]
				}];

				//对储存的数据进行遍历
				//console.log(dataContainer);
				var newDataWrap = [];
				var disposeData = ['iccid', 'supplierName', 'customerName',
					'imei', 'imsi', 'ONLINE', 'simStatus', 'activateTime',
					'stopTime', 'isBind', 'cardType', 'activationType',
					'flowMonthUsed', 'flowMonthResidual', 'createTime',
				];
				var simStatus = {
					"1": '可激活',
					"2": '已激活',
					"3": "停用",
					"4": '失效'
				};
				//console.log(disposeData);
				for(var a = 0; a < dataContainer.length; a++) {
					var tempObj = {};
					for(var b = 0; b < disposeData.length; b++) {
						//处理激活枚举转换 
						if(disposeData[b] == 'simStatus') {
							tempObj[disposeData[b]] = simStatus[dataContainer[a][disposeData[b]]];
						} else {
							tempObj[disposeData[b]] = dataContainer[a][disposeData[b]];
						}
					}
					newDataWrap.push(tempObj);
				}
				//console.log(newDataWrap);
				option.datas[0].sheetData = newDataWrap;
				var toExcel = new ExportJsonExcel(option);
				toExcel.saveExcel();
			},
			error: function(data) {
				layer.msg('数据获取失败')
				layer.close(data);
			}
		});
	}
})