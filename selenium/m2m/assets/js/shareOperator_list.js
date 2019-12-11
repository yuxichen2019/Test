﻿﻿
ss.imports(['dataTable'], function(exports) {
	var opPoolUuid = localStorage.getItem('opPoolUuid') || '';
	var opPoolName = localStorage.getItem('opPoolName') || '';
	document.querySelector('#parentPoolName').innerHTML = opPoolName || '';
	var mySelf = ""; //当前所有数据
	var queryData = {
		opPoolUuid
	}

	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#shareOperatorList')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TPoolIccid/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify(queryData),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '请输入ICCID或MSISDN',
				txt: 'iccidOrMsisdn',
				type: 'txt',
				width: '200px'
			},
			{
				name: '请选择客户',
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
				name: '请选择所属池',
				txt: 'poolUuid',
				code: 0,
				type: 'blurrySel',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TPoolIccid/queryPool.action',
					dataType: 'json',
					data: {
						pageSize: 1000000,
						opPoolUuid: opPoolUuid
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
				name: '请选择卡片状态',
				txt: 'simStatus',
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': 1,
						'name': '可激活'
					},
					{
						'code': 2,
						'name': '已激活'
					},
					{
						'code': 3,
						'name': '已停用'
					}
				]
			}
		], //搜索栏额外按钮
		searchBtn: {
			cardJoin: {
				name: '卡片入池',
				colType: 'opt2',
				cbFn: function(self) {
					cardJoin(self);
					mySelf = self;
				}
			},
			cardAllocation: {
				name: '卡片分配',
				colType: 'opt2',
				cbFn: function(self) {
					cardAllocation(self, commonUrl);
					mySelf = self;
				}
			},
			cardLimit: {
				name: '卡片限制',
				colType: 'opt2',
				cbFn: function(self) {
					cardLimit(self, commonUrl);
					mySelf = self;
				}
			},
		},
		//表格内容
		table: {
			//各选项
			options: {
				isCheckbox: true,
				dpWPer: '120%',
				dpWith: {
					'iccid': 10,
					//					'msisdn': 7,
					//					'customerName': 8,
					//					'poolName': 5,
					//					'simStatus': 4,
					//					'activateTime': 8,
					//					'stopTime': 8,
					//					'flowLimit': 9,
					//					'usedFlow': 9,
					//					'pfFlowMax': 8,
					//					'pfLimitType': 8
				},
				closeInterlace: true,
				isChangeTime: ['createTime', 'activateTime',
					'packageEndTime',
					'insertTime'
				],
				showTitle: ['iccid', 'msisdn', 'customerName', 'poolName', 'simStatus', 'activateTime',
					'stopTime', 'flowLimit', 'usedFlow', 'pfFlowMax', 'pfLimitType'
				],
				sort: {
					'iccid': true,
					//					'imsi': true,
					//					'msisdn': true,
					//					'createTime': true,
					//					'activateTime': true,
					//					'packageEndTime': true,
					//					'flowMonthUsed': true,
					//					'flowMonthResidual': true,
				},
				shim: {
					'chLimitType': {
						'0': '无限量',
						'1': '降速',
						'2': '停卡',
						'3': '计费使用',
					},
					'simStatus': {
						"1": '可激活',
						"2": '已激活',
						"3": "停用",
						"4": '失效'
					}
				},
				cbFn: function(curData) {}
			},
			tlName: ['ICCID', 'MSISDN', '所属客户', '所属共享池', '卡片状态', '激活时间',
				'到期时间', '本月可用量', '本月已用量', '限制用量', '超量策略'
			], //表头名字
			tlTxt: ['iccid', 'msisdn', 'customerName', 'poolName', 'simStatus', 'activateTime',
				'stopTime', 'flowLimit', 'usedFlow', 'chFlowMax', 'chLimitType'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				//				{
				//					name: '详情',
				//					colType: '',
				//					cbFn: function(curData, self) {
				//						refleshFn(curData, self)
				//					}
				//				}
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});
	//卡片分配
	function cardAllocation(self, commonUrl) {
		var model = {
			id: 'cardAllocation'
		};
		popupAll(model);
		var parentDom = document.querySelector('#cardAllocation')
		//清空数据
		var customerUuidWrap = parentDom.querySelector('customerUuidWrap') //客户名称
		if(customerUuidWrap) {
			var parentD = customerUuidWrap.parentNode
			parentD.removeChild(customerUuidWrap)
		}
		var uuidWrap = parentDom.querySelector('uuidWrap') //共享池名称
		if(uuidWrap) {
			var parentD = uuidWrap.parentNode
			parentD.removeChild(uuidWrap)
		}
		parentDom.querySelector('#iccidBegin').value = '';
		parentDom.querySelector('#iccidEnd').value = '';
		parentDom.querySelector('#num').innerHTML = '';

		//获取客户数据 
		function getCustomerData() {
			
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
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
						obj.name = data[i].customerName;
						selectData.push(obj);
					}
					var selectObj = {};
					selectObj.name = '客户名称';
					selectObj.txt = 'customerUuid';
					selectObj.data = selectData;
					selectObj.parentDom = parentDom.querySelector('#customerName');
					selectObj.appendTo = parentDom.querySelector('#customerName').querySelector('#selectWrap');
					selectObj.cbFn = function(self) {
						var params = {
							customerUuid: self.scope['code'],							
							opPoolUuid : opPoolUuid
						}
						getCustomer(params)
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
		}
		getCustomerData();
		var customerUuid = ''
		if(parentDom.querySelector('#customerName').querySelector("._show")) {
			customerUuid = parentDom.querySelector('#customerName').querySelector("._show").getAttribute('code')
		}
		var params = {
			customerUuid : customerUuid,
			opPoolUuid : opPoolUuid
		}
		//获取共享池名称数据
		function getCustomer(params) {
			var fqObj = {
				url: commonUrl + '/admin/TPoolIccid/queryPoolByCustomer.action',
				type: 'post',
				data: JSON.stringify(params)
			}
			self.ajax(
				fqObj,
				//success
				function(res) {
					var data = res.data || []
					var selectData = [];
					for(var i = 0; i < data.length; i++) {
						var obj = {};
						obj.code = data[i].uuid;
						obj.name = data[i].pfPoolName;
						selectData.push(obj);
					}
					var selectObj = {};
					selectObj.name = '共享池名称';
					selectObj.txt = 'uuid';
					selectObj.data = selectData;
					selectObj.parentDom = parentDom.querySelector('#poolName');
					selectObj.appendTo = parentDom.querySelector('#poolName').querySelector('#selectWrap');
					//渲染模糊查询下拉
					ss.blurrySel({
						selectObj
					});
				},
				//complete
				function() {},
				//beforeSend
				function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				}
			);
		}
		getCustomer(params)
		//是否显示选择文件
		var iccidList = [];
		var chooseData = []
		parentDom.querySelector('#xfFile').style.display = 'block'
		parentDom.querySelector('#iccidWrap').style.display = 'block'
		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page].length > 0) {
			parentDom.querySelector('#xfFile').style.display = 'none'
			parentDom.querySelector('#iccidWrap').style.display = 'none'
			chooseData = self.scope.checkObj[self.pageData.page]
			parentDom.querySelector('#num').innerHTML = chooseData.length
			for(var i = 0; i < chooseData.length; i++) {
				iccidList.push(chooseData[i].iccid)
			}
		}

		parentDom.querySelector('#sim').value = iccidList.toString();
		//通过iccid查询
		function getIccids(params) {
			var fqObj = {
				url: commonUrl + '/admin/TPoolIccid/distributeQueryByIccid.action',
				type: 'post',
				data: JSON.stringify(params)
			}
			self.ajax(
				fqObj,
				//success
				function(data) {
					var data = data && data.data || []
					iccidList = [];
					for(var i = 0; i < data.length; i++) {
						iccidList.push(data[i].iccid)
					}
					parentDom.querySelector('#sim').value = iccidList.toString();
					parentDom.querySelector('#num').innerHTML = data.length
					//通过iccid查询SIM卡后不允许再上传SIM
					if(iccidList.length > 0) {
						document.querySelector('#cardAllocation').querySelector('#xfFile').style.display = 'none';
						document.querySelector('#cardAllocation').querySelector('#fenpeiText').onclick = function() {
							layer.msg('已选择了SIM卡');
						}
					}
				},
				//complete
				function() {

				},
				//beforeSend
				function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				}
			);
		}
		//通过iccid查询
		parentDom.querySelector('#iccidBegin').onchange = function() {
			var value = this.value
			var params = {
				minIccid: value
			}
			var maxIccid = parentDom.querySelector('#iccidEnd').value
			if(maxIccid != '') {
				params.maxIccid = maxIccid
			}
			params.pageSize = 1000000;
			params.opPoolUuid = opPoolUuid;
			if(maxIccid == '' && value == '') {
				parentDom.querySelector('#xfFile').style.display = 'block';
				parentDom.querySelector('#sim').value = '';
				parentDom.querySelector('#num').innerHTML = '';
			} else if(maxIccid != '' && value != '') {
				getIccids(params)
			}
		}
		//通过iccid查询
		parentDom.querySelector('#iccidEnd').onchange = function() {
			var value = this.value
			var minIccid = parentDom.querySelector('#iccidBegin').value
			var params = {
				maxIccid: value
			}
			if(minIccid != '') {
				params.minIccid = minIccid
			}
			params.pageSize = 1000000;
			params.opPoolUuid = opPoolUuid;
			if(minIccid == '' && value == '') {
				parentDom.querySelector('#xfFile').style.display = 'block';
				parentDom.querySelector('#sim').value = '';
				parentDom.querySelector('#num').innerHTML = '';
			} else if(minIccid != '' && value != '') {
				getIccids(params)
			}
		}

		//		默认选择text
		parentDom.querySelector('#fenpeiText').innerHTML = "选择";
		parentDom.querySelector('#fenpeiText').title = "选择";
		//选择文件
		parentDom.querySelector('#fenpeiFile').onchange = function() {
			var file = this.files[0]
			console.log(file)
			//判断所选择文件是否为excel文件类型
			if(/\.xlsx|\.xlsm|\.xls|\.csv/.test(file.name)) {
				parentDom.querySelector('#fenpeiText').innerHTML = file.name;
				parentDom.querySelector('#fenpeiText').title = file.name;
			} else {
				layer.msg('非excel文件，请重新选择');
				return;
			}
			var options = {
				type: 'post',
				url: '/admin/TCardStore/renewal-read.action', 
				beforeSend: function(request) {
					ss.c3Loading.show();
				},
				complete: function() {
					ss.c3Loading.hidden();
				},
				success: function(data) {
					if(data.result == 'success') {
						iccidList = data['data']
						parentDom.querySelector('#sim').value = '';
						parentDom.querySelector('#sim').value = iccidList.toString();
						parentDom.querySelector('#num').innerHTML = data['data'].length
						layer.msg('文件选择成功');
					} else {
						layer.msg(data && data['errorMsg']);
					}
				}
			};
			$('#kpfpForm').ajaxSubmit(options);
		}

		//保存
		document.querySelector('#cardAllocation').querySelector('#save').onclick = function() {
			var params = {
				opPoolUuid: opPoolUuid,
				customerUuid: parentDom.querySelector('#customerName').querySelector("._show").getAttribute('code'),
				iccidList: iccidList,
				poolUuid: parentDom.querySelector('#poolName').querySelector("._show").getAttribute('code')
			}
			for(var i in params) {
				if(params[i] == '' || params[i] == [] || !params[i]) {
					layer.msg('请将必填数据填完');
					return 0;
				}
			}
			var fqObj = {
				url: commonUrl + '/admin/TPoolIccid/cardDistribute.action',
				type: 'post',
				data: JSON.stringify(params)
			}
			self.ajax(
				fqObj,
				//success
				function(data) {
					if(data.result == 'success') {
						self.lg_reloadFn(); //表格重载
						layer.msg('保存成功！'); //提示
						parentDom.querySelector('#sim').value = '';
						parentDom.querySelector(".close").click();
					} else {
						layer.msg(data.errorMsg || '保存失败！'); //提示
						parentDom.querySelector(".close").click();
					}
				},
				//complete
				function() {

				},
				//beforeSend
				function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				}
			);
		}
	}

	//卡片限制
	function cardLimit(self, commonUrl) {

		var model = {
			id: 'cardLimit'
		};
		popupAll(model);
		var parentDom = document.querySelector('#cardLimit');
		//清空数据
		parentDom.querySelector('#singleFlowMax').value = '';
		parentDom.querySelector('#limitType').value = '';
		parentDom.querySelector('#num').innerHTML = '';
		//是否显示选择文件
		var iccidList = [];
		var chooseData = []
		parentDom.querySelector('#xfFile').style.display = 'block'
		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page].length > 0) {
			parentDom.querySelector('#xfFile').style.display = 'none'
			chooseData = self.scope.checkObj[self.pageData.page]
			parentDom.querySelector('#num').innerHTML = chooseData.length
			for(var i = 0; i < chooseData.length; i++) {
				iccidList.push(chooseData[i].iccid)
			}
		}
		parentDom.querySelector('#sim').value = iccidList.toString();

		//		默认选择text
		parentDom.querySelector('#xufeiText').innerHTML = "选择";
		parentDom.querySelector('#xufeiText').title = "选择";
		//选择文件
		parentDom.querySelector('#xufeiFile').onchange = function() {
			var file = this.files[0]
			//判断所选择文件是否为excel文件类型
			if(/\.xlsx|\.xlsm|\.xls|\.csv/.test(file.name)) {
				parentDom.querySelector('#xufeiText').innerHTML = file.name;
				parentDom.querySelector('#xufeiText').title = file.name;
			} else {
				layer.msg('非excel文件，请重新选择');
				return;
			}
			var options = {
				type: 'post',
				url: '/admin/TCardStore/renewal-read.action',
				beforeSend: function(request) {
					ss.c3Loading.show();
				},
				complete: function() {
					ss.c3Loading.hidden();
				},
				success: function(data) {
					if(data.result == 'success') {
						iccidList = data['data']
						parentDom.querySelector('#sim').value = '';
						parentDom.querySelector('#sim').value = iccidList.toString();
						parentDom.querySelector('#num').innerHTML = data['data'].length
						layer.msg('文件选择成功');
					} else {
						layer.msg(data && data['errorMsg']);
					}
				}
			};
			$('#xzForm').ajaxSubmit(options);
		}

		//保存
		parentDom.querySelector('#save').onclick = function() {
			var params = {
				singleFlowMax: parentDom.querySelector('#singleFlowMax').value,
				singleLimitType: parentDom.querySelector('#limitType').value,
				iccidList: iccidList,
				opPoolUuid: opPoolUuid
			}
			for(var i in params) {
				if(params[i] == '' || params[i] == [] || !params[i]) {
					layer.msg('请将必填数据填完');
					return 0;
				}
			}
			var fqObj = {
				url: commonUrl + '/admin/TPoolIccid/cardLimit.action',
				type: 'post',
				data: JSON.stringify(params)
			}
			self.ajax(
				fqObj,
				//success
				function(data) {
					if(data.result == 'success') {
						self.lg_reloadFn(); //表格重载
						layer.msg('保存成功！'); //提示
						parentDom.querySelector('#sim').value = '';
						self.scope.checkObj[self.pageData.page] = [];
						parentDom.querySelector(".close").click();
					} else {
						layer.msg(data.errorMsg || '保存失败！'); //提示
						parentDom.querySelector(".close").click();
					}
				},
				//complete
				function() {

				},
				//beforeSend
				function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				}
			);
		}

	}

	//卡片入池
	function cardJoin(self) {
		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page].length > 0) {
			layer.msg('亲，已选数据已入池');
			return;
		}
		var model = {
			id: 'cardJoin'
		};
		popupAll(model);

		var parentDom = document.querySelector('#cardJoin')
		//清空数据
		parentDom.querySelector('#iccidBegin').value = '';
		parentDom.querySelector('#iccidEnd').value = '';
		parentDom.querySelector('#num').innerHTML = '';

		parentDom.querySelector('#poolName').innerHTML = opPoolName
		//是否显示选择文件
		var iccidList = [];
		parentDom.querySelector('#xfFile').style.display = 'block'
		parentDom.querySelector('#iccidWrap').style.display = 'block'

		parentDom.querySelector('#sim').value = iccidList.toString();
		//通过iccid查询
		function getIccids(params) {
			var fqObj = {
				url: commonUrl + '/admin/TPoolIccid/queryByIccid.action',
				type: 'post',
				data: JSON.stringify(params)
			}
			self.ajax(
				fqObj,
				//success
				function(data) {
					var data = data.data && data.data.data || []
					iccidList = [];
					for(var i = 0; i < data.length; i++) {
						iccidList.push(data[i].iccid)
					}
					parentDom.querySelector('#sim').value = iccidList.toString();
					parentDom.querySelector('#num').innerHTML = data.length
					//通过iccid查询SIM卡后不允许再上传SIM
					if(iccidList.length > 0) {
						parentDom.querySelector('#xfFile').style.display = 'none';
						parentDom.querySelector('#xufeiText').onclick = function() {
							layer.msg('已选择了SIM卡');
						}
					}
				},
				//complete
				function() {

				},
				//beforeSend
				function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				}
			);
		}
		//通过iccid查询
		parentDom.querySelector('#iccidBegin').onchange = function() {
			var value = this.value
			var params = {
				minIccid: value
			}
			var maxIccid = parentDom.querySelector('#iccidEnd').value
			if(maxIccid != '') {
				params.maxIccid = maxIccid
			}
			params.pageSize = 1000000
			if(maxIccid == '' && value == '') {
				parentDom.querySelector('#xfFile').style.display = 'block';
				parentDom.querySelector('#sim').value = '';
				parentDom.querySelector('#num').innerHTML = '';
			} else if(maxIccid != '' && value != '') {
				getIccids(params)
			}
		}
		//通过iccid查询
		parentDom.querySelector('#iccidEnd').onchange = function() {
			var value = this.value
			var minIccid = parentDom.querySelector('#iccidBegin').value
			var params = {
				maxIccid: value
			}
			if(minIccid != '') {
				params.minIccid = minIccid
			}
			params.pageSize = 1000000
			if(minIccid == '' && value == '') {
				parentDom.querySelector('#xfFile').style.display = 'block';
				parentDom.querySelector('#sim').value = '';
				parentDom.querySelector('#num').innerHTML = '';
			} else if(minIccid != '' && value != '') {
				getIccids(params)
			}
		}

		//		默认选择text
		parentDom.querySelector('#xufeiText').innerHTML = "选择";
		parentDom.querySelector('#xufeiText').title = "选择";
		//选择文件
		parentDom.querySelector('#xufeiFile').onchange = function() {
			var file = this.files[0]
			//判断所选择文件是否为excel文件类型
			if(/\.xlsx|\.xlsm|\.xls|\.csv/.test(file.name)) {
				parentDom.querySelector('#xufeiText').innerHTML = file.name;
				parentDom.querySelector('#xufeiText').title = file.name;
			} else {
				layer.msg('非excel文件，请重新选择');
				return;
			}
			var options = {
				type: 'post',
				url: '/admin/TCardStore/renewal-read.action',
				beforeSend: function(request) {
					ss.c3Loading.show();
				},
				complete: function() {
					ss.c3Loading.hidden();
				},
				success: function(data) {
					if(data.result == 'success') {
						iccidList = data['data']
						parentDom.querySelector('#sim').value = '';
						parentDom.querySelector('#sim').value = iccidList.toString();
						parentDom.querySelector('#num').innerHTML = data['data'].length
						layer.msg('文件选择成功');
					} else {
						layer.msg(data && data['errorMsg']);
					}
				}
			};
			$('#fpForm').ajaxSubmit(options);
		}

		//保存
		parentDom.querySelector('#save').onclick = function() {
			var params = {
				iccidList: iccidList,
				poolUuid: opPoolUuid
			}
			for(var i in params) {
				if(params[i] == '' || params[i] == [] || !params[i]) {
					layer.msg('请将必填数据填完');
					return 0;
				}
			}
			var fqObj = {
				url: commonUrl + '/admin/TPoolIccid/cardInPool.action',
				type: 'post',
				data: JSON.stringify(params)
			}
			self.ajax(
				fqObj,
				//success
				function(data) {
					if(data.result == 'success') {
						self.lg_reloadFn(); //表格重载
						layer.msg('保存成功！'); //提示
						parentDom.querySelector('#sim').value = '';
						parentDom.querySelector(".close").click();
					} else {
						layer.msg(data.errorMsg || '保存失败！'); //提示
						parentDom.querySelector(".close").click();
					}
				},
				//complete
				function() {

				},
				//beforeSend
				function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				}
			);
		}
	}

	//	tap切换
	$("#shareOperatorList .back").click(function() {
		window.history.go(-1);
	})

	//点击搜索是清空sim
	document.getElementsByName("搜索")[0].onclick = function() {
		mySelf.scope.checkObj[mySelf.pageData.page] = [];
	}
})