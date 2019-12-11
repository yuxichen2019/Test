ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var tbInstance = ss.dataTable({ //64,369
		appendTo: $('#dataCon_cs')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TBagImplementLog/queryByPageInfo.action',
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
				name: '订单号',
				txt: 'orderNo',
				type: 'txt',
				width: '180px'
			}, 
			{
				name: 'ICCID或MSISDN',
				txt: 'iccid',
				type: 'txt',
				width: '200px'
			}, 
			{
				name: '客户多级查询',
				txt: 'superCustomer',
				type: 'blurrySel',
				width: '200px',
				data: {
					url: commonUrl + '/admin/TWxTrade/getCustomerList.action',
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
				name: '客户精准查询',
				txt: 'customerId',
				type: 'blurrySel',
				width: '200px',
				data: {
					url: commonUrl + '/admin/TWxTrade/getCustomerList.action',
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
				name: '运营商',
				txt: 'isp',
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
				name: '充值开始时间',
				txt: 'createTimeStart',
				type: 'datetime',
				width: '200px'
			}, {
				name: '充值结束时间',
				txt: 'createTimeEnd',
				type: 'datetime',
				width: '200px'
			},
			{
				name: '充值渠道',
				txt: 'channelType',
				code: 0,
				type: 'select',
				width: '180px',
				data: [
					{
						'code': 0,
						'name': '接口充值'
					},
					{
						'code': 1,
						'name': '管理端充值'
					},
					{
						'code': 2,
						'name': '客户端充值'
					},
					{
						'code': 3,
						'name': '微信端充值'
					}
					
				]
			},

			{
				name: '充值状态',
				txt: 'orderStatus',
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': 1,
						'name': '成功'
					},
					{
						'code': 2,
						'name': '失败'
					}
				]
			},
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
				sort: [''],
				dpWPer: '2000px',
				dpWith: {
					'orderNo':5, 
					'iccid':5, 
					'msisdn':5,
					'customName':5, 
					'topCustomerName':5,
					'isp':2, 
					'packageName':6,
					'cost':2, 
					'orderMonth':2, 
					'totalPrice':2,
					'channelType':3, 
					'createTime':4, 
					'orderStatus':2, 
					'operatorName':4,
				},
				closeInterlace: true,
				isChangeTime: ['createTime'], //是否进行时间戳转时间 
				showTitle: [
				'orderNo', 'iccid', 'msisdn','customName', 
				'topCustomerName','isp', 'packageName', 'orderMonth', 'totalPrice',
				'channelType', 'createTime', 'orderStatus', 'operatorName',
				],
				shim: {
                    'isp': {
						'1': '移动',
						'2': '联通',
						'3': '电信'
					},
					 'channelType': {
					 	'0': '接口充值',
						'1': '管理端充值',
						'2': '客户端充值',
						'3': '微信端充值'
					},
					 'orderStatus': {
						'1': '成功',
						'2': '失败',
					}
				}
			},
			tlName: [
				'订单号', 
				'ICCID', 
				'MSISDN',
				'客户名称',
				'对应一级用户 ',
				'运营商', 
				'套餐名称', 
				'成本价',
				'有效期(月)', 
				'消费金额',
				'充值渠道', 
				'充值时间', 
				'充值状态', 
				'操作人',
			], //表头名字
			tlTxt: [
				'orderNo', 
				'iccid', 
				'msisdn',
				'customName', 
				'topCustomerName',
				'isp', 
				'packageName',
				'cost', 
				'orderMonth', 
				'totalPrice',
				'channelType', 
				'createTime', 
				'orderStatus', 
				'operatorName',
			], //表头字段
			//操作项
			operation: [],

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
		var params = self.scope.queryObj;
		params['currentPage'] = 1;
		params['pageSize'] = 1000;
		//请求地址
		var queryUrl = commonUrl + "/admin/TBagImplementLog/export.action";
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
				if(data.result=='success'){
					window.location.href = commonUrl+data.data;
				}
				else{
					layer.msg(data.data || data.errorMsg ||'系统异常，请联系客服！')
				}

			},
			error: function(data) {
				layer.close(loading);
				layer.msg('数据获取失败')
			}
		});
	}
})