ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var self = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/LockAndActivelog/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			pageSize:10,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [
			{
				name: 'ICCID',
				txt: 'iccid',
				type: 'txt',
				width: '180px'
			},
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
				name: '变更类型',
				txt: 'changeType',
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': 1,
						'name': '已停卡'
					},
					{
						'code': 2,
						'name': '已激活'
					}
				]
			},
			{
				name: '筛选状态',
				txt: 'statu',
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': 1,
						'name': '激活成功'
					},
					{
						'code': 2,
						'name': '激活失败'
					}
				]
			},
			{
				name: '请输入触发描述',
				txt: 'describe',
				type: 'txt',
				width: '180px'
			},
			{
				name: '开始时间',
				txt: 'dateBegin',
				type: 'date',
				width: '180px',
				isLine: true,
			},
			{
				name: '结束时间',
				txt: 'dateEnd',
				type: 'date',
				width: '180px',
			}
		],
		//搜索栏额外按钮
		searchBtn: {
//			//导出
			export: {
				name: '导出',
				colType: 'opt1',
				cbFn: function(self,data) {
					exportFn(self);
				}			
			}
		},
		//表格内容
		table: {
			//各选项
			options: {
				closeInterlace: true,
				isChangeTime: ['lockDate'],
				dpWith: {
					'changeDate':4,
					'iccid':4,
					'customerName':2,
					'operate':2,
					'changeType':2,
					'status':2,
					'reason':3
				},
				showTitle:[
					'changeDate', 'iccid',  'customerName', 'operate', 'changeType', 'status', 'reason', 'remark'
				],
				isChangeTime: ['changeDate'],
				shim: {
					'operate': {
						'1': '移动',
						'2': '联通',
						'3': '电信'
					},
					'changeType': {
						"1": '已停卡',
						"2": '已激活'
					},
					'status': {
						"1": '变更成功',
						"2": '变更失败'
					}
				},
			},

			tlName: [
				'变更时间', 'ICCID',  '客户名称', '运营商', '变更类型', '状态', '触发描述'
			], //表头名字 
			tlTxt: [
				'changeDate', 'iccid', 'customerName', 'operate', 'changeType', 'status', 'reason'
			], //表头字段
			//操作项
			operation: [
//				{
//					name: '详情',
//					colType: '',
//					cbFn: function(curData, self) {
//						detailsFn(curData, self)
//					}
//				}
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
		var queryUrl = commonUrl + "/admin/LockAndActivelog/export.action";
		//请求参数
		var params = self.scope.queryObj;
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
				console.log(data)
				if(data.result == 'success') {
					window.location.href = '' + data.data;
				} else {
					layer.msg(data.errorMsg || '导出失败')
				}
			},
			error: function(data) {
				layer.msg('数据获取失败')
				layer.close(data);
			}
		});
	}


	function detailsFn(curData, self) {
		//点击手动录单模态框---开始
		/*建立模态框对象*/
		var modalBox = {};
		/*获取模态框*/
		modalBox.modal = document.getElementById("myModaldetails");
		/*获得关闭按钮*/
		modalBox.closeBtn = document.getElementById("detialsClose");
		/*模态框显示*/
		modalBox.show = function() {
			this.modal.style.display = "block";
		}
		/*模态框关闭*/
		modalBox.close = function() {
			this.modal.style.display = "none";
		}
		/*当用户点击模态框内容之外的区域，模态框也会关闭*/
		modalBox.outsideClick = function() {
			var modal = this.modal;
			window.onclick = function(event) {
				if(event.target == modal) {
					modal.style.display = "none";
				}
			}
		}

		/*模态框初始化*/
		modalBox.init = function() {
			var that = this;
			that.show();
			this.closeBtn.onclick = function() {
				that.close();
			}
			this.outsideClick();
		}
		modalBox.init();
		//点击手动录单模态框---结束

		//获取客户数据 
		$.ajax({
			type: 'POST',
			url: commonUrl + '/admin/TDistributeBatch/manage/cardDetail.action',
			data: JSON.stringify({
				currentPage: 1,
				pageSize: 10000,
				uuid: curData.uuid
			}),
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			dataType: 'json',
			success: function(res) {
				if(res.result == 'success') {
					var detailsData = res.data;
					var details_body = document.getElementById('details_body')
					var tableWrap = document.getElementById('tableWrap')
					if(tableWrap){
						tableWrap.parentNode.removeChild(tableWrap)
					}
					//文字
					ss.crtDom('div', 'tableWrap', '', details_body, {
						an:['id'],
						av:['tableWrap']
						})
						.appendDom(function(dom) {
							ss.crtDom('table', '', '', dom, {
									an: ['border'],
									av: ['1']
								})
								.appendDom(function(dom) {
									ss.crtDom('tr', '', '', dom, {})
										.appendDom(function(dom) {
											ss.crtDom('td', '', 'ICCID', dom, {})
											ss.crtDom('td', '', 'MSISDN', dom, {})
										})
									if(detailsData && detailsData.length > 0) {
										for(var i = 0; i < detailsData.length; i++) {
											ss.crtDom('tr', '', '', dom, {})
												.appendDom(function(dom) {
													ss.crtDom('td', '', detailsData[i].iccid, dom, {})
													ss.crtDom('td', '', detailsData[i].msisdn, dom, {})
												})
										}
									}
								})
						})
				} else {
					layer.msg(res.errorMsg || '数据获取失败')
				}
			},
			error: function(xhr, type) {
				alert("错误")
			}
		});
		//导出
		document.getElementById('export').onclick = function() {
			//请求地址
			var queryUrl = commonUrl + "/admin/TDistributeBatch/manage/cardExport.action";
			//请求参数
			var params = {
				uuid: curData.uuid
			}
			var loading = layer.load(1, {
			  shade: [0.1,'#fff'] //0.1透明度的白色背景
			});
			//		///var data = disposeRequestData();
			//发送请求
			$.ajax({
				url: queryUrl,
				type: 'post',
				data: JSON.stringify(params),
				dataType: 'json',
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				success: function(res) {
					layer.close(loading);
					if(res.result == 'success') {
						var data = res.data
						window.location.href = commonUrl + data
					} else {
						layer.msg(res.errorMsg || '操作失败')
					}
				},
				error: function(data) {
					layer.close(loading);
					layer.msg('数据获取失败')
					layer.close(data);
				}
			});
		}
	}

})