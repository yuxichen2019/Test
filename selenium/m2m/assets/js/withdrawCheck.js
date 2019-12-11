ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	var defaultUuid = '';
	//分润汇总页面跳转数据显示
	if(localStorage.getItem('summary_uuid')) {
		defaultUuid = localStorage.getItem('summary_uuid');
		localStorage.removeItem('summary_uuid');
		ss.layoutFnWrap['lg_shwoTtFn']('提现审核', 'withdrawCheck', ss.layoutFnWrap['self']);
	}
	//数据表格
	var tbInstance = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TShareProfitExamine/queryByPageInfo.action',
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify({
				customerId: defaultUuid
			}),
			async: false,
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项    
		searchOption: [{
				name: '客户名称',
				txt: 'customerId',
				type: 'blurrySel',
				width: '200px',
				data: {
					url: commonUrl + '/admin/TShareProfitExamine/getCustomer.action',
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
				name: '申请开始时间',
				txt: 'createTimeStart',
				type: 'datetime',
				width: '200px'
			},
			{
				name: '申请结束时间',
				txt: 'createTimeEnd',
				type: 'datetime',
				width: '200px'
			},
			{
				name: '审批状态',
				txt: 'status',
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': 0,
						'name': '成功'
					},
					{
						'code': 1,
						'name': '失败'
					},
					{
						'code': 2,
						'name': '待审核'
					}
				]
			}
		], //搜索栏额外按钮
		searchBtn: {

		},
		//表格内容
		table: {
			//各选项
			options: {
				sort: [''],
				//				dpWPer: '120%',
				dpWith: {

				},
				closeInterlace: true,
				isChangeTime: ['createTime','updateTime'], //是否进行时间戳转时间 
				showTitle: [

				],
				//动态别名转换
				urlData: {

				},
				shim: {
					status: {
						'0': '成功',
						'1': '失败',
						'2': '待审核',
					}
				},
				color: {
					status: {
						'0': 'green',
						'1': 'red',
						'2': 'orange',
					}
				}
			},
			tlName: [
				'申请时间', '客户名称', '申请提现金额', '分润账户余额','提现账号',
				'申请备注', '审核时间', '审核备注', '状态', '审核人'
			], //表头名字
			tlTxt: [
				'createTime', 'customerName', 'cash', 'shareProfitBalance','receivingAccount',
				'applyRemark', 'updateTime', 'examineRemark', 'status', 'operateName'
			], //表头字段
			//操作项
			operation: [{
					name: '审批',
					flag: 'edit',
					editType: 'form',
					rely: {
						status: '2'
					},
					colType: '',
					url: commonUrl + '/admin/TShareProfitExamine/changeStatus.action',
					dataType: 'json',
					//扩展点击前处理文件的回调
					beforeRenderDpDataFn: function(curData) {
						var _curData = curData;
						_curData.createTime = ss.dpDate.normal(_curData.createTime);
						return _curData;
					},
					//渲染完回调
					mountFn: function(self, curData) {
						var viewDom = self.domWrap.viewC_con;
						//隐藏uuid
						ss.mdfCss(viewDom.children[0], ['display', 'none']);
						//修改客户名称
						var customerDom = viewDom.children[1].children[1];
						ss.mdfCss(customerDom.children[0], ['display', 'none']);
						ss.crtDom('span', '', curData.customerName, customerDom);
					},
					items: {
						uuid: {
							name: 'uuid',
							type: 'txt',
							hidden: true,
							readonly: true
						},
						customerId: {
							name: '客户名称',
							type: 'txt',
							readonly: true
						},
						cash: {
							name: '提现金额',
							type: 'txt',
							readonly: true
						},
						createTime: {
							name: '申请时间',
							type: 'txt',
							readonly: true
						},
						status: {
							name: '审批状态',
							type: 'select',
							data: [{
									name: '成功',
									code: '0'
								},
								{
									name: '失败',
									code: '1'
								},
								{
									name: '待审核',
									code: '2'
								},
							],
							verify: true
						},
						//						updateTime: {
						//							name: '审批时间',
						//							type: 'time',
						//						},
						enclosure: {
							name: '附件',
							type: 'pic',
							isOneData: true,
							verify: true
						},
						examineRemark: {
							name: '备注',
							type: 'area',
						},
					},
					data: {
						uuid: ''
					},
				},
				{
					name: '详情',
					flag: 'dtl',
					rely: {
						status: '0'
					},
					dataType: 'json',
					saveCbFn: function(queryObj) {
						JSON.parse(queryObj.data).phone.replace(/，/g, ',')
						return queryObj
					},
					isChangeTime: ['createTime'],
					items: {
						customerName: '客户名称',
						cash: '提现金额',
						createTime: '申请时间',
						status: '审批状态',
						enclosure: '附件',
						examineRemark: '备注'
					},
					isPic: ['enclosure'],
					shim: {
						status: {
							0: '成功',
							1: '失败',
							2: '待审核'
						}
					},
					cbFn: function(curData, self, dom) {}
				},
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});
});