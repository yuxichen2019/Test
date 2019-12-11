(function(win){
	var commonUrl = '';
	var _cd = {
		
		//套餐类型
		bagPlatformType:[
			{
				name: '主套餐',
				code: '3'
			},
			{
				name: '叠加包',
				code: '4'
			},
		],
		
		//共享池套餐类型
		bagPlatformPoolType:[
			{
				name: '主套餐',
				code: '3'
			},
			{
				name: '扩容包',
				code: '4'
			},
		],
		re_bagPlatformType:{
			'3': '主套餐',
			'4': '叠加包',
		},
		re_bagPlatformPoolType:{
			'3': '主套餐',
			'4': '扩容包',
		},
		//上下架
		
		
		
		
		//运营商
		operatorName:[
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
			}
		],
		re_operatorName:{
			'1': '移动',
			'2': '联通',
			'3': '电信',
		},
		
		re_businessType:{
			'1': '流量包',
			'2': '语音包',
		},
		//动态获取
		//客户套餐顶级-客户
		customerUuid_tcdj:{
			url: commonUrl + '/admin/TCustomer/customerTcdj/queryByPageInfo.action',
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
		//共享池
		//共享池-客户
		customerUuid: {
			url: commonUrl + '/admin/TCustomer/poolBagCustomer/queryByPageInfo.action',
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
		//共享池-套餐名
		bagPlatformUuid:{
			url: commonUrl + '/admin/TPoolPlatformBag/poolBagCustomer/queryByPageInfo.action',
			dataType: 'json',
			data: {
				"pageSize": 1000
			},
			rely: {
				name: "bagPlatformName",
				code: "uuid"
			},
			digitalModel: {
				data: {
					location: ['data', 'data']
				}
			}
		},
		//状态
		bagStatus:{
			url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
			dataType: 'json',
			data: {
				dickey: 'bag_status',
			},
			rely: {
				name: "dicname",
				code: "dicvalue"
			},
			digitalModel: {
				data: {
					location: ['data']
				}
			}
		},
		//包体类型
		flowType:{
			url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: {
				dickey: 'flow_type',
			},
			rely: {
				name: "dicname",
				code: "dicvalue"
			},
			digitalModel: {
				data: {
					location: ['data']
				}
			}
		},
		//订购月数
		monthnum:{
			url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
			dataType: 'json',
			data: {
				dickey: 'bag_select_num',
			},
			rely: {
				name: "dicname",
				code: "dicvalue"
			},
			digitalModel: {
				data: {
					location: ['data']
				}
			}
		},
		//客户共享-别名转换
		
		
		
		
		
		
		
	}
	win._cd = _cd;
}(window))







	
window.resetView = function(obj){
	var ctx = obj.ctx ? document.querySelector(obj.ctx) : document;
	obj.txt && obj.txt.length>0 && (
		function(){
			obj.txt.forEach(function(item){
				ctx.querySelector(item).value = '';
			})
		}()
	);
	obj.sel && obj.sel.length>0 && (
		function(){
			obj.sel.forEach(function(item){
				ctx.querySelector(item).value = '';
			})
		}()
	);
	obj.inner && obj.inner.length>0 && (
		function(){
			obj.inner.forEach(function(item){
				ctx.querySelector(item).innerHTML = '';
			})
		}()
	);
	
			

}
	



