ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TSmsReceived/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '发送号码',
				txt: 'msisdn',
				type: 'txt',
				width: '200px'
			},
			{
				name: 'iccid',
				txt: 'iccid',
				type: 'txt',
				width: '200px'
			},
			{
				name: '所属客户',
				txt: 'customerUuid',
				type: 'blurrySel',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TCustomer/smsReceived/queryByPageInfo.action',
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
			},
			{
				name: '短信内容',
				txt: 'smsContent',
				type: 'txt',
				width: '200px'
			},
			{
				name: '接收开始时间',
				txt: 'startTime',
				type: 'date',
				width: '180px',
				isLine: true
			},
			{
				name: '接收结束时间',
				txt: 'endTime',
				type: 'date',
				width: '180px'
			},
			//			{
			//				name: '到达开始时间',
			//				txt: 'createTimeBegin',
			//				type: 'date',
			//				width: '180px',
			//				isLine:true
			//			},
			//			{
			//				name: '到达结束时间',
			//				txt: 'createTimeEnd',
			//				type: 'date',
			//				width: '180px'
			//			},
		], //搜索栏额外按钮
		searchBtn: {
			export: {
				name: '导出 ',
				colType: 'opt2',
				cbFn: function(self) {
					exportFn(self);
				}
			},
			reflesh: {
				name: '刷新',
				colType: 'add',
				dataType: 'json',
				cbFn: function(self) {
					
					var iccidList = [];
					var checkDatas = self.scope.checkObj || [];
					for(var x in checkDatas) {
						checkDatas[x].forEach(function(item) {
							iccidList.push(item.iccid);
						})
					};
					
					$.ajax({
						type: 'POST',
						url: commonUrl + '/admin/TSmsReceived/refreshReceivedSMS.action',
						data:JSON.stringify(iccidList),
						beforeSend: function(request) {
							request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
						},
						dataType: 'json',
						success: function(datajson) {
							if(datajson.result == 'success') {
								instance.lg_reloadFn();
								layer.msg(datajson.data);
							} else {
								layer.msg(datajson.data || '刷新错误')
							}
						},
						error: function(xhr, type) {
							alert("错误")
						}
					});
				}
			}
		},
		//表格内容
		table: {
			//各选项
			options: {
				isCheckbox: true,
				//				sort: ['iccid'],
				//				dpWPer: '125%',
				dpWith: {
					msisdn: 9,
					iccid: 11,
					receivedTime: 8
				},
				closeInterlace: true,
				isChangeTime: ['receivedTime'],
				showTitle: [
					'msisdn', 'iccid', 'customerUuid', 'smsContent', 'createTime', 'receivedTime', 'smsStatus'
				],
				shim: {

				},
				cbFn: function(_self) {},
			},
			tlName: [
				'发送号码', 'iccid', '所属客户', '短信内容', '接收时间'
			], //表头名字
			tlTxt: [
				'msisdn', 'iccid', 'customerName', 'smsContent', 'receivedTime'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
			],
		},
		//分页
		pageOption: {
			//各选项
		}
	});
	//发送短信
	function smsSendFn() {
		var model = {
			id: "smsSend" //传入弹窗的ID
		};
		popupAll(model);
		var parentDom = document.querySelector('#smsSend');
		var sentToArr = [];
		//默认选择text
		parentDom.querySelector('#huaboText').innerHTML = "选择";
		parentDom.querySelector('#huaboText').title = "选择";
		//选择文件
		parentDom.querySelector('#huaboFile').onchange = function() {
			var file = this.files[0]
			//判断所选择文件是否为excel文件类型
			if(/\.xlsx|\.xlsm|\.xls|\.csv/.test(file.name)) {
				parentDom.querySelector('#huaboText').innerHTML = file.name;
				parentDom.querySelector('#huaboText').title = file.name;
			} else {
				layer.msg('非excel文件，请重新选择');
				return;
			}
			var options = {
				type: 'post',
				url: '/admin/TCardStore/importExcel.action',
				beforeSend: function(request) {
					ss.c3Loading.show();
				},
				complete: function() {
					ss.c3Loading.hidden();
				},
				success: function(data) {
					if(data.result == 'success') {
						sentToArr = data['data'];
						parentDom.querySelector("#sentTo").innerHTML = paramsAll.iccid.join(",");
						parentDom.querySelector('#sentToNum').innerHTML = data['data'].length;
						layer.msg('文件选择成功');
					} else {
						layer.msg(data && data['errorMsg']);
					}
				}
			};
			$('#msmForm').ajaxSubmit(options);
		}
		//		点击确定
		parentDom.querySelector("#stateSave").onclick = function() {
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/smsStatusChange.action',
				data: JSON.stringify({
					sendToArr: parentDom.querySelector("#sentTo").value,
					msmModel: parentDom.querySelector("#modelName").value,
					msmContent: parentDom.querySelector("#sentContent").value,
				}),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						layer.msg('短信发送成功')
						instance.lg_reloadFn();
						parentDom.querySelector(".close").click();
					} else {
						layer.msg(data.errorMsg)
					}
				},
				error: function(xhr, type) {
					alert("错误")
				}
			});
		}
	}
	//导出
	function exportFn(self) {
		var loading = layer.load(1, {
			  shade: [0.1,'#fff'] //0.1透明度的白色背景
			});
		//请求地址
		var queryUrl = commonUrl + "/admin/TSmsReceived/export.action";
		//		var queryUrl = commonUrl + "/index/unicomCallBack/testExport";
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
				layer.close(loading);
				if(data.result == 'success') {
					window.location.href = '' + data.data;
				} else {
					layer.msg(data.errorMsg || '数据导出失败')
				}
			},
			error: function(data) {
				layer.close(loading);
				layer.msg('数据获取失败')
				layer.close(data);
			}
		});
	}
})