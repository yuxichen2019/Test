ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TSmsSend/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify({
				sendFrom: 2
			}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '接收号码',
				txt: 'sentTo',
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
					url: commonUrl + '/admin/TCustomer/smsSend/queryByPageInfo.action',
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
				name: '发送开始时间',
				txt: 'startTime',
				type: 'date',
				width: '180px',
				isLine: true
			},
			{
				name: '发送结束时间',
				txt: 'endTime',
				type: 'date',
				width: '180px'
			}

		], //搜索栏额外按钮
		searchBtn: {
			export: {
				name: '导出',
				colType: 'opt2',
				cbFn: function(self) {
					exportFn(self);
				}
			},
			smsSend: {
				name: '短信发送',
				colType: 'add',
				dataType: 'json',
				cbFn: function() {
					smsSendFn()
				}
			},
			reflesh: {
				name: '刷新',
				colType: 'add',
				dataType: 'json',
				cbFn: function(curData, self) {
					$.ajax({
						type: 'POST',
						url: commonUrl + '/admin/TSmsSend/refreshSMS.action',
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
			},
		},
		//表格内容
		table: {
			//各选项
			options: {
				isCheckbox: true,
				//				sort: ['iccid'],
				//				dpWPer: '125%',
				dpWith: {
					sentTo: 9,
					iccid: 10,
					sentTime: 8,
					receivedTime: 8
				},
				closeInterlace: true,
				isChangeTime: ['sentTime', 'receivedTime'],
				showTitle: [
					'sentTo', 'iccid', 'customerName', 'smsContent', 'smsStatu', 'sentTime', 'receivedTime', 'senderName'
				],
				shim: {},
				cbFn: function(_self) {},
				urlData: {
					smsStatus: {
						url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							dickey: 'sms_status'
						},
						numberType: 'int',
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
				}
			},
			tlName: [
				'接收号码', 'iccid', '所属客户', '短信内容', '短信状态', '发送时间', '接收时间', '创建人'
			], //表头名字
			tlTxt: [
				'sentTo', 'iccid', 'customerName', 'smsContent', 'smsStatus', 'sentTime', 'receivedTime', 'senderName'
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
		parentDom.querySelector("#sentContent").value = ''
		parentDom.querySelector("#sentTo").value = '';
		parentDom.querySelector('#sentToNum').innerHTML = 0;
		var sentToArr = [];
		//默认选择text
		parentDom.querySelector('#huaboText').innerHTML = "选择";
		parentDom.querySelector('#huaboText').title = "选择";
		//模板数据
		$.ajax({
			type: 'POST',
			url: commonUrl + '/admin/TSmsModel/smsSend/queryByPageInfo.action',
			data: JSON.stringify({
				currentPage: 1,
				pageSize: 10000
			}),
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			dataType: 'json',
			success: function(datajson) {
				var data = datajson.data.data || [];
				var selectData = [];
				for(var i = 0; i < data.length; i++) {
					var obj = {};
					obj.code = data[i].uuid;
					obj.name = data[i].modelName;
					obj.curdata = data[i];
					selectData.push(obj);
				}
				var selectObj = {};
				selectObj.name = '模板名称';
				selectObj.txt = 'uuid';
				selectObj.data = selectData;
				selectObj.parentDom = parentDom;
				selectObj.appendTo = parentDom.querySelector('#selectWrap');
				selectObj.cbFn = function(self){
					var curCode = self.scope.code;
					var allModal = self.sourceObj.data || [];
					var curObj = {};
					for(var i=0;i<allModal.length;i++){
						if(allModal[i].code == curCode){
							curObj = allModal[i].curdata;
						}
					}
					parentDom.querySelector("#sentContent").value = curObj.modelMsg;
				}
				//渲染模糊查询下拉
				ss.blurrySel({
					selectObj
				});
			},
			error: function(xhr, type) {
				alert("错误")
			}
		});
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
						newSentToArr = data['data'];
						parentDom.querySelector("#sentTo").value = newSentToArr.join(",");
						parentDom.querySelector('#sentToNum').innerHTML = data['data'].length;
						layer.msg('文件选择成功');
					} else {
						layer.msg(data && data['errorMsg']);
					}
				}
			};
			$('#msmForm').ajaxSubmit(options);
		}
		var newSentToArr = [];
		parentDom.querySelector('#sentTo').onchange = function() {
			newSentToArr = [];
			this.value = this.value.replace("，", ",");
			var sentToArr = this.value.split(',');
			for(var i = 0; i < sentToArr.length; i++) {
				if(sentToArr[i] !== '') {
					newSentToArr.push(sentToArr[i]);
				}
			}
			parentDom.querySelector('#sentToNum').innerHTML = newSentToArr.length;
		}
		//		点击确定
		parentDom.querySelector("#stateSave").onclick = function() {
			var params = {
				sendList: newSentToArr,
				smsContent: parentDom.querySelector("#sentContent").value
			}
			for(var i in params) {
				if(params[i] == '' || params[i] == []) {
					layer.msg('请将必填数据填完');
					return 0;
				}
			}
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TSmsSend/sendMsg.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						layer.msg('短信发送成功')
						instance.lg_reloadFn();
						parentDom.querySelector(".close").click();
//						parentDom.querySelector("#sentContent").value = ''
//						parentDom.querySelector("#sentTo").value = '';
//						parentDom.querySelector('#sentToNum').innerHTML = 0;
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
		var queryUrl = commonUrl + "/admin/TSmsSend/exportDataList.action";
		//请求参数
		var params = self.scope.queryObj;
		params.sendFrom = 2;
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