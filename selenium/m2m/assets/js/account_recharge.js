ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon_cs')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TAccountLog/queryByPageInfo.action', //请求Url
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
				txt: 'customName',
				type: 'txt',
				width: '200px',
//				data: {
//					url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
//					dataType: 'json',
//					data: {
//						"pageSize": 1000
//					},
//					rely: {
//						name: "customerName",
//						code: "uuid"
//					},
//					digitalModel: {
//						data: {
//							location: ['data', 'data']
//						}
//					}
//				},
			},
			{
				name: '充值开始时间',
				txt: 'startTime',
				type: 'datetime',
				width: '200px'
			}, {
				name: '充值结束时间',
				txt: 'endTime',
				type: 'datetime',
				width: '200px'
			}, {
				name: '付款方式',
				txt: 'payType',
				code: 0,
				type: 'select',
				width: '180px',
				data: {
					url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
					data: {
						dickey: 'pay_type'
					},
					rely: {
						name: 'dicname',
						code: 'dicvalue'
					},
					dataType: 'json',
					digitalModel: {
						data: {
							location: ['data']
						}
					}
				},
			}
		], //搜索栏额外按钮
		searchBtn: {
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				addType: 'form',
				url: commonUrl + '/admin/TAccount/recharge.action',
				items: {
					customId: {
						name: '客户名称',
						type: 'blurrySel',
						verify: true,
						width:'80%',
						data: {
							url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
							dataType: 'json',
							data: {
								"pageSize": 1000
							},
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
						cbFn: function(dom, self,code) {
							var _customIdDom = ss.getDom('_customId');
							_customIdDom || ss.crtDom('input', '', '', dom.parentNode, {
								cn: ['display'],
								cv: ['none'],
								an: ['type', 'name', 'id', 'value'],
								av: ['hidden', 'customId', '_customId', code]
							});
							_customIdDom && (_payTypeDom.value = code);

						}
					},
					payType: {
						name: '付款方式',
						type: 'select',
						verify: true,
						data: {
							url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
							data: {
								dickey: 'pay_type'
							},
							rely: {
								name: 'dicname',
								code: 'dicvalue'
							},
							dataType: 'json',
							digitalModel: {
								data: {
									location: ['data']
								}
							}
						},
						cbFn: function(dom, self) {
							console.log(dom)
							var _payTypeDom = ss.getDom('_payType');
							_payTypeDom || ss.crtDom('input', '', '', dom.parentNode, {
								cn: ['display'],
								cv: ['none'],
								an: ['type', 'name', 'id', 'value'],
								av: ['hidden', 'payType', '_payType', dom.getAttribute('code')]
							});
							_payTypeDom && (_payTypeDom.value = dom.getAttribute('code'));

						}
					},
					payName: {
						name: '打款户名',
						type: 'txt',
						verify: true
					},
					amount: {
						name: '充值金额',
						type: 'num',
						dot:2,
						verify: true
					},
					attachment: {
						name: '付款附件',
						type: 'pic',
						isOneData: true
					},
					remark: {
						name: '备注',
						type: 'area'
					},
				}
			},
			export: {
				name: '导出',
				colType: 'opt2',
				cbFn: function(self) {
					exportFn(self);
				}
			}
		},
		//表格内容
		table: {
			//各选项
			options: {
				sort: [],
				dpWPer: '',
				dpWith: {
					orderOn: 15,
					createTime: 8,
					operationBalance: 4
				},
				closeInterlace: true,
				isChangeTime: ['createTime'],
				showTitle: [],
				urlData: {
					payType: {
						url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
						dataType: 'json',
						data: {
							dickey: 'pay_type'
						},
						rely: {
							name: 'dicname',
							code: 'dicvalue'
						},
						digitalModel: {
							data: {
								location: ['data']
							}
						}
					}
				}
			},
			tlName: [
				'充值编码', '客户名称', '付款方式', '充值时间', '充值金额',
				'管理员', '备注'
			], //表头名字
			tlTxt: [
				'orderOn', 'customName', 'payType', 'createTime', 'operationBalance',
				'operatorName', 'remak'
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
					isChangeTime:['createTime'],
					items: {
						orderOn: '充值编码',
						customName: '客户名称',
						payType: '付款方式',
						createTime: '充值时间',
						operationBalance: '充值金额',
						operatorName: '管理员',
						remak: '备注'
					},
					shim:{
						payType:{
							url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
							dataType: 'json',
							type: 'post',
							data: {
								dickey: 'pay_type'
							},
							rely: {
								name: 'dicname',
								code: 'dicvalue'
							}
						}
					},
					cbFn: function(curData, self, dom) {
						//						document.getElement
						//						var dom = document.getElement
						//						debugger
					}
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
		var loading = layer.load(1, {
			  shade: [0.1,'#fff'] //0.1透明度的白色背景
			});
		//请求地址
		var queryUrl = commonUrl + "/admin/TAccountLog/export.action";
		//请求参数
		var params = self.scope.queryObj;
		params.currentPage = 1;
		params.pageSize = 1000;
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
				layer.close(loading);
				if(data.result == 'success') {
					window.location.href = '' + data.data;
				} else {
					layer.msg(data.errorMsg || '导出失败')
				}
//				var dataContainer = data.data.data;
//				var option = {};
//				option.fileName = '卡库';
//				option.datas = [{
//					sheetData: [], //数据源
//					sheetName: 'sheet',
//					sheetFilter: ['iccid', 'supplierName', 'customerName',
//						'imei', 'imsi', 'ONLINE', 'simStatus', 'activateTime',
//						'stopTime', 'isBind', 'cardType', 'activationType',
//						'flowMonthUsed', 'flowMonthResidual', 'createTime',
//					],
//					sheetHeader: ['ICCID', '供应商', '客户',
//						'IMEI', 'IMSI', '在线状态', '激活状态', '激活时间',
//						'卡到期时间', '是否绑定', '卡片类型', '激活类型',
//						'本月已用流量', '本月剩余流量', '创建时间'
//					]
//				}];
//
//				//对储存的数据进行遍历
//				//console.log(dataContainer);
//				var newDataWrap = [];
//				var disposeData = ['iccid', 'supplierName', 'customerName',
//					'imei', 'imsi', 'ONLINE', 'simStatus', 'activateTime',
//					'stopTime', 'isBind', 'cardType', 'activationType',
//					'flowMonthUsed', 'flowMonthResidual', 'createTime',
//				];
//				var simStatus = {
//					"1": '可激活',
//					"2": '已激活',
//					"3": "停用",
//					"4": '失效'
//				};
//				//console.log(disposeData);
//				for(var a = 0; a < dataContainer.length; a++) {
//					var tempObj = {};
//					for(var b = 0; b < disposeData.length; b++) {
//						//处理激活枚举转换 
//						if(disposeData[b] == 'simStatus') {
//							tempObj[disposeData[b]] = simStatus[dataContainer[a][disposeData[b]]];
//						} else {
//							tempObj[disposeData[b]] = dataContainer[a][disposeData[b]];
//						}
//					}
//					newDataWrap.push(tempObj);
//				}
//				//console.log(newDataWrap);
//				option.datas[0].sheetData = newDataWrap;
//				var toExcel = new ExportJsonExcel(option);
//				toExcel.saveExcel();
			},
			error: function(data) {
				layer.close(loading);
				layer.msg('数据获取失败')
				layer.close(data);
			}
		});
	}
})