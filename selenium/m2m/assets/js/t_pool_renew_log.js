ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	var superiorCustomer = [];

	//右侧表格    
	//数据表格
	var self = ss.dataTable({ //64,369
		appendTo: $('#dataCon_cus')[0], //追加元素

		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TPoolRenewLog/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [
			{
				name: '请输入共享池名称',
				txt: 'pfPoolName',
				type: 'txt',
				width: '200px'
			},
			{
				name: '请选择客户名称',
				txt: 'customerId',
				code: 0,
				type: 'blurrySel',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TPoolPlatform/getCustomerList.action',
					dataType: 'json',
					data: {
						isp: 2
					},
					rely: {
						name: 'customerName',
						code: 'uuid'
					},
					digitalModel: {
						data: {
							location: ['data']
						}
					}
				}
			},
			{
				name: '续订状态',
				txt: 'state',
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': 1,
						'name': '待处理'
					},
					{
						'code': 2,
						'name': '已处理'
					},
					{
						'code': 3,
						'name': '处理失败'
					},
					{
						'code': 4,
						'name': '取消'
					}
				]
			}
			
		],
		//搜索栏额外按钮
		searchBtn: {
			
		},
		//表格内容 
		table: {
			//各选项
			options: {
				isCheckbox: true,
				closeInterlace: true,
				dpWPer: '100%',
				dpWith: {
					'pfPoolName': 9,
					'customerName':9,
					'startDate': 9,
					'endDate': 9,
					'state': 6,
					'renewType': 6,
					'remak':9,
					'createTime':9
				},
				showTitle:['pfPoolName', 'startDate', 'endDate', 'state', 'renewType',
					'remak','createTime'
				],
				isChangeTime: ['startDate','endDate','createTime'], //是否进行时间戳转时间
				shim: {
					'state': {
						'1': '待处理',
						'2': '已处理 ',
						'3': '处理失败',
						'4': '取消',
					},
					'renewType':{
						'1': '自动续订',
						'2': '手动续订 '
					}
				}
			},
			tlName: ['共享池名称', '客户名称','开始时间','结束时间', '处理状态', '续订类型', 
				'备注','创建时间'
			], //表头名字
			tlTxt: ['pfPoolName', 'customerName','startDate', 'endDate', 'state', 'renewType',
				'remak','createTime'
			],
			//操作项
			operation: [				
				{
					name: '取消',
					colType: 'opt3',
					rely: {
						state: '1'
					},					
					cbFn:function(curData,self){
						console.log(curData)
						ss.layer.confirm(
							'是否取消续订？', 
							{
						  		btn: ['是','否'] //按钮
							}, 
							function(){
								self.eAjax({
							        url:commonUrl + '/admin/TPoolRenewLog/updateStateById.action',
							        type:'post',
							        data:{
							        	uuid:curData.uuid,
							        	state:4
							        },
								}, 
							    {
							    	success:function(data){
							    		layer.closeAll();
							    		if(data.result == 'success'){
							    			ss.layer.msg('取消续订成功！');
							    			self.lg_reloadFn();
							    		}
							    	},
							    	isJson:true
								});
							}, 
							function(){
								console.log(222)
							}
						);
					}
				},
				{
					name: '恢复',
					colType: 'opt2',
					rely: {
						state: '4'
					},					
					cbFn:function(curData,self){
						console.log(curData)
						ss.layer.confirm(
							'是否恢复续订？', 
							{
						  		btn: ['是','否'] //按钮
							}, 
							function(){
								self.eAjax({
							        url:commonUrl + '/admin/TPoolRenewLog/updateStateById.action',
							        type:'post',
							        data:{
							        	uuid:curData.uuid,
							        	state:1
							        },
								}, 
							    {
							    	success:function(data){
							    		layer.closeAll();
							    		if(data.result == 'success'){
							    			ss.layer.msg('恢复续订成功！');
							    			self.lg_reloadFn();
							    		}
							    	},
							    	isJson:true
								});
							}, 
							function(){
								console.log(222)
							}
						);
					}
				}
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});


})