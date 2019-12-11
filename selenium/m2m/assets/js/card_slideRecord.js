ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var self = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TDistributeBatch/manage/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			pageSize:50,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '客户',
				txt: 'customerId',
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
				name: '划拨',
				txt: 'distributeType',
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': 1,
						'name': '回划'
					},
					{
						'code': 2,
						'name': '划拨'
					},
				]
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
				name: '业务类型',
				txt: 'businessType',
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': 1,
						'name': '语音卡'
					},
					{
						'code': 2,
						'name': '流量卡'
					},
				]
			},
			{
				name: 'ICCID或MSISDN',
				txt: 'iccidOrMsisdn',
				type: 'txt',
				width: '120px'
			},
		],
		//搜索栏额外按钮
		searchBtn: {
			//导出
			export: {
				name: 'Excel导出',
				colType: 'opt1',
				cbFn: function(self) {
					self.lg_getSelectParasFn(); //序列化搜索参数
					exportFn(self)
				}			
			}
		},
		//表格内容
		table: {
			//各选项
			options: {
				closeInterlace: true,
				isChangeTime: ['creatTime'],
				dpWith: {
					creatTime: 10
				},
				shim: {
					'distributeType': {
						'1': '回划',
						'2': '划拨',
					},
					'businessType': {
						"1": '语音卡',
						"2": '流量卡',
					},
					'operator': {
						1: '移动',
						2: '联通',
						3: '电信'
					},
				},
			},
			tlName: [
				'划拨类型', '运营商', '业务类型', '卡片数量（张）', '划拨途径', 
				'卡板费/元', '操作时间', '操作人', '备注',
			], //表头名字 
			tlTxt: [
				'distributeType', 'operator', 'businessType', 'cardCount', 'distributeChannelName', 
				'cardFee', 'creatTime','oprateName' ,'remark'
			], //表头字段
			//操作项
			operation: [{
				name: '详情',
				colType: '',
				cbFn: function(curData, self) {
					detailsFn(curData, self)
				}
			}],

		},
		//分页
		pageOption: {
			//各选项
		}
	});


	//导出
	function exportFn(self) {
		//请求地址
		var queryUrl = commonUrl + "/admin/TDistributeBatch/export.action";
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