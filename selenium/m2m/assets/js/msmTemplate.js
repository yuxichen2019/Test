ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TSmsModel/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '模板名称',
				txt: 'modelName',
				type: 'txt',
				width: '200px'
			},
			{
				name: '模板内容',
				txt: 'modelMsg',
				type: 'txt',
				width: '200px'
			},
			{
				name: '创建人',
				txt: 'createName',
				type: 'txt',
				width: '200px'
			},
			{
				name: '创建开始时间',
				txt: 'createTimeStart',
				type: 'date',
				width: '180px',
				isLine: true
			},
			{
				name: '创建结束时间',
				txt: 'createTimeEnd',
				type: 'date',
				width: '180px'
			}
		], //搜索栏额外按钮
		searchBtn: {
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TSmsModel/addEntity.action',
				items: {
					modelName: {
						name: '模板名称',
						type: 'txt',
						verify: true
					},
					modelMsg: {
						name: '模板内容',
						type: 'area',
						verify: true
					},
				}
			},
//			export: {
//				name: '导出',
//				colType: 'opt2',
//				cbFn: function(self) {
//					exportFn(self);
//				}
//			},
//			reflesh: {
//				name: '刷新',
//				colType: 'add',
//				dataType: 'json',
//				cbFn: function(curData, self) {
//					refleshFn(curData, self)
//				}
//			},
		},
		//表格内容
		table: {
			//各选项
			options: {
//				isCheckbox: true,
				//				sort: ['iccid'],
				//				dpWPer: '125%',
				dpWith: {
					
				},
				closeInterlace: true,
				isChangeTime: ['createTime'],
				showTitle: [
					'modelName', 'modelMsg', 'createTime', 'createName'
				],
				shim: {},
				cbFn: function(_self) {},
			},
			tlName: [
				'模板名称', '模板内容', '创建时间', '创建人',
			], //表头名字
			tlTxt: [
				'modelName', 'modelMsg', 'createTime', 'createName'
			], //表头字段 
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				//编辑和删除为默认，其它按钮需txt
				{
					name: '编辑',
					flag: 'edit',
					url: commonUrl + '/admin/TSmsModel/editEntity.action',
					dataType: 'json',
					items: {
						modelName: {
						name: '模板名称',
						type: 'txt',
						verify: true
						},
						modelMsg: {
							name: '模板内容',
							type: 'area',
							verify: true
						},
					},
					data: {
						uuid: ''
					},
				},
			],
		},
		//分页
		pageOption: {
			//各选项
		}
	});
	//批量删除
	function deleteFn(self) {
		var uuidList = []
		if(self.scope.checkObj && self.scope.checkObj[1].length > 0) {
			chooseData = self.scope.checkObj[1]
			for(var i = 0; i < chooseData.length; i++) {
				uuidList.push(chooseData[i].uuid)
			}
		};
		//没值则提示
		if(!uuidList.length) {
			ss.layer.msg('请先勾选！');
			return;
		};
		layer.confirm('确定删除吗?', function(index) {
			//是否json类型提交
			var fqObj = {
				url: commonUrl + '/admin/TNameCertification/deleteBatch.action',
				type: 'post',
				data: JSON.stringify({
					uuidList: uuidList
				})
			};
			var isJsonTF = true
			self.ajax(
				fqObj,
				//success
				function(data) {
					layer.close(index); //关闭询问窗
					layer.msg('删除成功!');
					self.lg_reloadFn(); //表格重载
				},
				//complete
				function(data) {
					layer.close(index); //关闭询问窗
				},
				//beforeSend
				function(request) {
					isJsonTF &&
						request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				}
			);
		});
	}
	//导出
	function exportFn(self) {
		console.log(self)
		//请求地址
		var queryUrl = commonUrl + "/admin/TSmsSend/exportDataList.action";
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
					layer.msg(data.errorMsg || '数据导出失败')
				}
			},
			error: function(data) {
				layer.msg('数据获取失败')
				layer.close(data);
			}
		});
	}
})