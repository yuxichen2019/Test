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
			listUrl: commonUrl + '/admin/TWxTradeProfits/queryByPageInfo.action', //请求Url
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
				name: 'ICCID',
				txt: 'iccid',
				type: 'txt',
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
				name: '运营商',
				txt: 'operatorName',
				type: 'select',
				width: '120px',
				data: [{
						name: '移动',
						code: '移动'
					},
					{
						name: '联通',
						code: '联通'
					},
					{
						name: '电信',
						code: '电信'
					},
				]
			},
			{
				name: '套餐名称',
				txt: 'bagCustomerName',
				type: 'txt',
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
				dpWPer: '2500px', 
				dpWith: {
					'iccid':4,
					'msisdn':3, 
					'customerName':3,
					'topCustomerName':3,
					'operatorName':3, 
					'bagCustomerName':5, 
					'orderMonth':3,
					'tradeAmount':3, 
					'profit':3, 
					'wxCreateTime':3, 
					'wxTradeNo':7, 
					'tradeNo':4,
					'tradeStatus':3
				},
				closeInterlace: true,
				isChangeTime: [],
//			    showCon:['iccid','customerName','bagCustomerName','wxCreateTime'],
				showTitle: [
					'iccid','customerName','operatorName', 'bagCustomerName', 'orderMonth',
					'tradeAmount', 'profit', 'wxCreateTime', 'wxTradeNo', 'tradeNo','tradeStatus'
				],
				shim:{
					tradeStatus:{
						1:'创建中',2:'支付成功',3:'支付失败',4:'推送成功',5:'推送失败',
						6:'订单成功',7:'订单失败',8:'退款中',9:'退款成功',10:'退款失败'
					},
					operatorName:{
						1:'移动',2:'联通',3:'电信'
					}
				},
				color:{
					tradeStatus:{
						1:'gray',2:'green',3:'red',4:'green',5:'red',
						6:'green',7:'red',8:'gray',9:'green',10:'red'
					}
				},
				//表格渲染完的回调
				cbFn: function(self) {
					//请求
					$.ajax({
						url: commonUrl + "/admin/TWxTradeProfits/querySum.action",
						type: 'post',
						data: JSON.stringify(self.scope.queryObj),
						dataType: 'json',
						beforeSend: function(request) {
							request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
						},
						success: function(data) {
							var _data = data.data.data[0];
							ss.getDom('.dom_sumTradeAmount').innerHTML = _data.sumTradeAmount+'元';
							ss.getDom('.dom_sumProfit').innerHTML = _data.sumProfit+'元';
						},
						error: function(data) {
						}
					});
					
					
					var oneItemData = self.tableData.data && self.tableData.data.length>0 && self.tableData.data[0];
					//创建销售金额|客户分润的信息  
					//存在则先移除
					var psDom = ss.getDom('.profit_summary');
					psDom && psDom.parentNode.removeChild(psDom);
					
					var data = {totalSales: '-',myProfit: '-'};
					var summaryData = [
						{key: 'totalSales',name: '销售金额'},
						{key: 'myProfit',name: '客户分润'}
					];
					var dtContainerDom = document.querySelector('.dtContainer');
					var beforeDom = document.querySelector('.dtcWrap');
					var newDom = ss.crtDom('div', 'profit_summary', '', '', {})
						.appendDom(function(dom) {
							for(var i = 0; i < summaryData.length; i++) {
								ss.crtDom('div', 'item', '', dom, {})
									.appendDom(function(dom) {
										ss.crtDom('span', '', summaryData[i].name + ': ', dom, {})
										ss.crtDom('span', i==0?'dom_sumTradeAmount':'dom_sumProfit', data[summaryData[i].key]+'元', dom, {})
									})
							}
						});
					dtContainerDom.insertBefore(newDom, beforeDom); 
				}
			},
			tlName: [
				'ICCID', '客户名称','对应一级客户','运营商',  '套餐名称', 
				'有效期',
				'销售金额', '客户分润', '充值时间', '微信订单号', '平台订单号','充值状态'
			], //表头名字
			tlTxt: [
				'iccid','customerName','topCustomerName','operatorName', 'bagCustomerName', 
				'orderMonth',
				'tradeAmount', 'profit', 'wxCreateTime', 'wxTradeNo', 'tradeNo','tradeStatus'
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
				layer.close(loading);
				if(data.result == 'success') {
					window.location.href = commonUrl + data.data;
				} else {
					layer.msg(data.errorMsg || '导出失败')
				}
			}
		})

	}
})