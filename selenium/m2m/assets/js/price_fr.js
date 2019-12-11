ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//销售金额和客户分润数据
	var _scope = {
		sumTradeAmount:'',sumProfit:''
	};
	
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TPriceShareRecord/queryByPageInfo.action', //请求Url
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
				name: '套餐名称',
				txt: 'bagCustomerName',
				type: 'txt',
			},
			{
				name: '客户多级查询',
				txt: 'superCustomer',
				type: 'blurrySel',
				data:{
					url:commonUrl + '/admin/TCustomer/priceRevision/queryByPageInfo.action',
					dataType:'json',
					data:{
						pageSize:10000,
					},
					rely: { 
						name:"customerName",
						code:"uuid" 
					},
					digitalModel: {
						data: {
							location: ['data','data']
						}
					}
				},
				width: '180px'
			},
			{
				name: '客户精准查询',
				txt: 'customerUuid',
				type: 'blurrySel',
				data:{
					url:commonUrl + '/admin/TCustomer/priceRevision/queryByPageInfo.action',
					dataType:'json',
					data:{
						pageSize:10000
					},
					rely: { 
						name:"customerName",
						code:"uuid"
					},
					digitalModel: {
						data: {
							location: ['data','data']
						}
					}
				},
				width: '180px'
			},
			{
				name: '运营商',
				txt: 'operator',
				type: 'select',
				width: '120px',
				data: [
					{
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
				name: '调价类型',
				txt: 'priceShareType',
				type: 'select',
				width: '160px',
				data:[
					{
						name: '分润套餐价格调整',
						code: '1'
					}
				]
			}, 
			
			{
				name: '开始时间',
				txt: 'startTime',
				type: 'datetime',
				width: '200px'
			}, {
				name: '结束时间',
				txt: 'endTine',
				type: 'datetime',
				width: '200px'
			}
		], //搜索栏额外按钮
		searchBtn: {
//			export: {
//				name: '导出',
//				colType: 'opt2',
//				cbFn: function(self) {
//					exportFn(self);
//				}
//			}
		},
		//表格内容
		table: {
			//各选项
			options: {
				sort: [],
				dpWPer: '1600px', 
				closeInterlace: true,
				isChangeTime: ['changeTime'], //是否进行时间戳转时间
				dpWith: {
					'changeTime':7,
					'bagUuid':7, 
					'operator':3,
					'customer':4,
					'superCustomer':4, 
					'priceShareType':5,
					'salePriceBefore':4,
					'salePriceAfter':4, 
					
					'sharePriceBefore':4,
					'sharePriceAfter':4,
					
					'costPriceBefore':4,
					'costPriceAfter':4,
					'author':3
				},
				showTitle: [
					'changeTime',
					'bagUuid', 
					'operator',
					'customer',
					'superCustomer', 
					'priceShareType',
					'salePriceBefore',
					'salePriceAfter', 
					
					'sharePriceBefore',
					'sharePriceAfter',
					
					'costPriceBefore',
					'costPriceAfter',
				],
				shim:{
					priceShareType:{
						1:'分润套餐价格调整'
					},
					operator:{
						1:"移动",
						2:"联通",
						3:"电信"
					},
//					superCustomer:{
//						1:'客户端售价',
//						2:'终端售价'
//					}
				},
				//表格渲染完的回调
				cbFn: function(self) {
				}
			},
			tlName: [
				'操作时间',//changeTime
				'套餐名称', //bagUuid
				'运营商',  //operator
				'套餐归属客户', //customer
				'对应一级客户', //superCustomer
				'调价类型',  //priceShareType
				'终端价格调整前',//salePriceBefore
				'终端价格调整后', //salePriceAfter
				
				'分润金额调整前',//sharePriceBefore
				'分润金额调整后', //sharePriceAfter
				
				'成本价调整前',//costPriceBefore
				'成本价调整后', //costPriceAfter
				
				'操作账户' //author
			], //表头名字
			tlTxt: [
				'changeTime',
				'bagUuid', 
				'operator',
				'customer',
				'superCustomer', 
				'priceShareType',
				'salePriceBefore',
				'salePriceAfter', 
				
				'sharePriceBefore',
				'sharePriceAfter',
				
				'costPriceBefore',
				'costPriceAfter',
				
				'author'
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
		//请求地址
		var queryUrl = commonUrl + "/admin/TWxTradeProfits/export.action";
		//请求参数
		var params = self.scope.queryObj;
		params.currentPage = 1;
		params.pageSize = 1000;
		self.eAjax({
			url: queryUrl,
			type: 'post',
			data: params
		},{
			isJson:1,
			success:function(data){
				if(data.result == 'success') {
					window.location.href = commonUrl + data.data;
				} else {
					layer.msg(data.errorMsg || '导出失败')
				}
			}
		})

	}
})