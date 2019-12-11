ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var self = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TFenpeiBatch/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			pageSize:50,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '流量池',
				txt: 'poolUuid',
				code: 0,
				type: 'blurrySel',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TFenpeiBatch/getPool.action',
					dataType: 'json',
					data: {
						pageSize: 1000000,
					},
					rely: {
						name: 'poolName',
						code: 'poolUuid'
					},
					digitalModel: {
						data: {
							location: ['data']
						}
					}
				}
			},
			{
				name: '分配类型',
				txt: 'fenpeiType',
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': 1,
						'name': '入池'
					},
					{
						'code': 2,
						'name': '一级分配'
					},
					{
						'code': 3,
						'name': '二级分配'
					},
				]
			},
			{
				name: 'ICCID或MSISDN',
				txt: 'iccid',
				type: 'txt',
				width: '120px'
			},
		],
		//搜索栏额外按钮
		searchBtn: {

		},
		//表格内容
		table: {
			//各选项
			options: {
				closeInterlace: true,
				isChangeTime: ['createTime'],
				dpWith: {
					createTime: 8
				},
				shim: {
					'fenpeiType': {
						'1': '入池',
						'2': '一级分配',
						'3': '二级分配',
					},
				},
			},
			tlName: [
				'分配类型', '卡片数量（张）', '分配途径', '操作时间', '备注',
			], //表头名字 
			tlTxt: [
				'fenpeiType', 'cardCount', 'fenpeiChannelName', 'createTime','remark'
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

	function detailsFn(curData, self) {
		var model = {
			id: "myModaldetails" //传入弹窗的ID
		};
		popupAll(model);
		$.ajax({
			type: 'POST',
			url: commonUrl + '/admin/TFenpeiBatch/getIccid.action',
			data: {uuid: curData.uuid
			},
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
			},
//			dataType: 'json',
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
										})
									if(detailsData && detailsData.length > 0) {
										for(var i = 0; i < detailsData.length; i++) {
											ss.crtDom('tr', '', '', dom, {})
												.appendDom(function(dom) {
													ss.crtDom('td', '', detailsData[i], dom, {})
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
			var queryUrl = commonUrl + "/admin/TFenpeiBatch/cardExport.action?uuid=" + curData.uuid;
			//请求参数
			var params = {
				uuid: curData.uuid
			}
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
					if(res.result == 'success') {
						var data = res.data
						window.location.href = commonUrl + data
					} else {
						layer.msg(res.errorMsg || '操作失败')
					}
				},
				error: function(data) {
					layer.msg('数据获取失败')
					layer.close(data);
				}
			});
		}
	}

})