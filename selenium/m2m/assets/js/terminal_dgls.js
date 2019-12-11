ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon_cs')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TWxTrade/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [
			{
				name: '客户多级查询',
				txt: 'superCustomer',
				type: 'blurrySel',
				width: '200px',
				data: {
					url: commonUrl + '/admin/TWxTrade/getCustomerList.action',
					dataType: 'json',
					data: {
						"pageSize": 1000000
					},
					rely: {
						name: "customerName",
						code: "uuid"
					},
					digitalModel: {
						data: {
							location: ['data']
						}
					}
				},
			},
			{
				name: '客户精准查询',
				txt: 'customerId',
				type: 'blurrySel',
				width: '200px',
				data: {
					url: commonUrl + '/admin/TWxTrade/getCustomerList.action',
					dataType: 'json',
					data: {
						"pageSize": 1000000
					},
					rely: {
						name: "customerName",
						code: "uuid"
					},
					digitalModel: {
						data: {
							location: ['data']
						}
					}
				},
			},
			
			{
				name: '收款账号',
				txt: 'payee',
				type: 'select',
				width: '200px',
				data: {
					url: commonUrl + '/admin/TWxTrade/getPayeeList.action',
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
							location: ['data']
						}
					}
				},
			},
			{
				name: '订单状态',
				txt: 'tradeStatus',
				type: 'select',
				width: '200px',
				data: [
//					{
//						name: '创建中',
//						code: '1'
//					},
					{
						name: '支付成功',
						code: '2'
					},
					{
						name: '支付失败',
						code: '3'
					},
					{
						name: '推送成功',
						code: '4'
					},
					{
						name: '推送失败',
						code: '5'
					},
					{
						name: '订单成功',
						code: '6'
					},
					{
						name: '订单失败',
						code: '7'
					},
					{
						name: '申请退款成功',
						code: '8'
					},
					{
						name: '申请退款失败',
						code: '9'
					},
					{
						name: '退款成功',
						code: '10'
					},
					{
						name: '退款失败',
						code: '11'
					},
				]
			},
			{
				name: '套餐名称',
				txt: 'bagName',
				type: 'txt',
			}, 
			{
				name: '微信订单号',
				txt: 'wxTradeNo',
				type: 'txt',
			}, 
				{
				name: '运营商',
				txt: 'operator',
				type: 'select',
				width: '120px',
				data: [{
						name: '移动',
						code: '1'
					},
					{
						name: '联通',
						code: '2'
					},
					{
						name: '电信',
						code: '3'
					},
				]
			},
			{
				name: 'ICCID',
				txt: 'iccid',
				type: 'txt',
				width: '120px'
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
			}
		], //搜索栏额外按钮
		searchBtn: {
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
				dpWPer: '2200px',
				dpWith: {
					'iccid':5,
					'customerName':5,
					'topCustomerName':5,
					'customerBagName':6,
					'isp':2,
					'payeeName':5,
					'costPrice':3,
					'customerPrice':3, 
					'tradeAmount':3, 
					'tradeStatus':3,
					'payTime':5, 
					'wxTradeNo':6, 
					'tradeNo':5
				},
				closeInterlace: true,
				isChangeTime: ['payTime'],
				showTitle: [
					'iccid', 
					'customerName',
					'topCustomerName',
					'customerBagName', 
					'isp',
					'payeeName', 
					'costPrice',
					'customerPrice', 
					'tradeAmount', 
					'tradeStatus',
					'payTime', 
					'wxTradeNo', 
					'tradeNo',
				],
				shim:{
					'isp':{
						'1':'移动',
						'2':'联通',
						'3':'电信',
					},
					'tradeStatus':{
						'-2':'订单不存在',
						'-1':'未支付',
						'2':'支付成功',
						'3':'支付失败',
						'4':'推送成功',
						'5':'推送失败',
						'6':'订单成功',
						'7':'订单失败',
						'8':'申请退款成功',
						'9':'申请退款失败',
						'10':'退款成功',
						'11':'退款失败'
					}
				}
			},
			tlName: [
				'ICCID',
				'客户名称', 
				'对应一级用户',
				'套餐名称', 
				'运营商',
				'收款账号', 
				'平台价格（元）',
				'下级定价（元）',
				'终端售价（元）', 
				'订单状态', 
				'充值时间', 
				'微信订单号', 
				'系统订单号',
			], //表头名字
			tlTxt: [
				'iccid', 
				'customerName',
				'topCustomerName',
				'customerBagName', 
				'isp',
				'payeeName', 
				'costPrice',
				'customerPrice', 
				'tradeAmount', 
				'tradeStatus',
				'payTime', 
				'wxTradeNo', 
				'tradeNo',
			], //表头字段
			//操作项
			operation: [ 
				
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
		var queryUrl = commonUrl + "/admin/TWxTrade/exportOrderHistory.action";
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
				if(data.result == 'success' && data.data && data.data !== '' ) {
					window.location.href = '' + data.data;
				} else {
					layer.msg(data.errorMsg || '导出失败')
				}
			},
			error: function(data) {
				layer.close(loading);
				layer.msg('数据获取失败')
				layer.close(data);
			}
		});
	}
})