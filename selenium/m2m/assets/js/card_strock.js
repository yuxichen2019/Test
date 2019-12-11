ss.imports(['dataTable', 'blurrySel'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon_cs')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TCardStore/cardstrock/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify({}),
			pageSize: 50, //没值时，则默认是根据屏幕高度判断，保证一页 
		},
		//搜索栏选项
		searchOption: [{
				name: 'iccid',
				txt: 'iccid',
				type: 'txt',
				width: '200px'
			},
			{
				name: 'iccid开始段',
				txt: 'minIccid',
				type: 'txt',
				width: '200px'
			}, {
				name: 'iccid结束段',
				txt: 'maxIccid',
				type: 'txt',
				width: '200px'
			}, {
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
				name: '发卡开始时间',
				txt: 'createTimeStart',
				type: 'date',
				width: '120px',
				isLine: true,
			},
			{
				name: '发卡结束时间',
				txt: 'createTimeEnd',
				type: 'date',
				width: '120px',
			},
			{
				name: '激活开始时间',
				txt: 'activateTimeStart',
				type: 'date',
				width: '120px',
				isLine: true,
			},
			{
				name: '激活结束时间',
				txt: 'activateTimeEnd',
				type: 'date',
				width: '120px',
			}
		], //搜索栏额外按钮
		searchBtn: {
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TCardStore/cardstrock/addEntity.action',
				items: {
					iccid: {
						name: 'ICCID',
						type: 'txt',
						verify: true
					},
					supplierUuid: {
						name: '供应商',
						type: 'select',
						verify: true,
						data: {
							url: commonUrl + '/admin/TSuppliers/cardstrock/queryByPageInfo.action',
							data: {
								currentPage: 1,
								pageSize: 10000
							},
							dataType: 'json',
							rely: {
								name: 'supplierName',
								code: 'uuid'
							},
							digitalModel: {
								data: {
									location: ['data', 'data']
								}
							}
						}
					},
					cardType: {
						name: '卡片类型',
						type: 'select',
						verify: true,
						data: [{
								name: 'MP0',
								code: '1'
							},
							{
								name: 'MP1',
								code: '2'
							},
							{
								name: 'MP2',
								code: '3'
							}, {
								name: 'MS0',
								code: '4'
							},
							{
								name: 'MS1',
								code: '5'
							},
							{
								name: 'MS2',
								code: '6'
							},
						]
					},
					businessType: {
						name: '业务类型',
						type: 'select',
						verify: true,
						data: [{
								name: '语音卡',
								code: '1'
							},
							{
								name: '流量卡',
								code: '2'
							}
						]
					}
				}
			},
			import: {
				name: '导入',
				colType: 'opt2',
				cbFn: function(self) {
					importFn(self);
				}
			},
			export: {
				name: '导出',
				colType: 'opt2',
				cbFn: function(self) {
					exportFn(self);
				}
			},
			repointer: {
				name: '回划',
				cbFn: function(self) {
					pointerFn(self)
				}
			},
			slider: {
				name: '划拨',
				cbFn: function(self) {
					sliderFn(self)
				}
			},
			renewalFee: {
				name: '订购套餐',
				cbFn: function(self) {
					renewalFeeFn(self)
				}
			},
			mainBag: {
				name: '主套餐变更',
				cbFn: function(self) {
					mainBagFn(self)
				}
			},
			//			reflesh: {
			//				name: '批量刷新',
			//				colType: 'opt2',
			//				cbFn: function(self) {
			//					refleshFn(self);
			//				}
			//			},
		},
		//表格内容
		table: {
			//各选项
			options: {
				isCheckbox: true,
				sort: ['iccid'],
				dpWPer: '160%',
				dpWith: {
					createTime: 10,
				},
				closeInterlace: true,
				dpWith: {
					'iccid': 9,
					'supplierName': 6,
					'customerName': 6,
					'imei': 7,
					'imsi': 7,
					'ONLINE': 4,
					'simStatus': 4,
					'activateTime': 8,
					'stopTime': 8,
					'isBind': 5,
					'createTime': 8,
					'cardType': 4,
					'voiceMonthUsed': 6,
					'voiceMonthResidual': 6,
					'activationType': 5,
				},
				isChangeTime: ['activateTime', 'stopTime',
					'createTime'
				],
				showTitle: ['iccid', 'supplierName', 'customerName',
					'imei', 'imsi', 'ONLINE', 'simStatus', 'activateTime',
					'stopTime', 'isBind', 'createTime', 'cardType', 'activationType',
					'voiceMonthUsed', 'voiceMonthResidual',
				],
				shim: {
					'cardType': {
						'1': 'MP0',
						'2': 'MP1',
						'3': 'MP2',
						'4': 'MS0',
						'5': 'MS1',
						'6': 'MS2',
					},
					'simStatus': {
						"1": '可激活',
						"2": '已激活',
						"3": "停用",
						"4": '失效'
					},
					'activationType': {
						'1': '手动激活',
						'2': '自动激活'
					}
				}
			},
			tlName: ['ICCID', '运营商', '客户',
				'IMEI', 'IMSI', '在线状态', '激活状态', '激活时间',
				'卡到期时间', '是否绑定', '卡片类型', '激活类型',
				'本月已用流量', '本月可用流量', '发卡时间'
			], //表头名字
			tlTxt: ['iccid', 'supplierName', 'customerName',
				'imei', 'imsi', 'ONLINE', 'simStatus', 'activateTime',
				'stopTime', 'isBind', 'cardType', 'activationType',
				'voiceMonthUsed', 'voiceMonthResidual', 'createTime'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				{
					name: '刷新',
					colType: '',
					cbFn: function(curData, self) {
						refleshFn(curData, self)
					}
				},
				{
					name: '激活',
					colType: '',
					cbFn: function(curData, self) {
						activeFn(curData, self)
					}
				},
				//				{
				//					name: '划拨',
				//					cbFn: function(curData, self) {
				//						pointerFn(curData, self)
				//					}
				//				},
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});

	function importFn() {
		/*建立模态框对象*/
		var modalBox = {};
		//		获取勾选的卡号数量
		modalBox.ischeck = document.querySelector(".tbCWrap").querySelectorAll("[ischeck='true']");
		//		选中卡号iccid的集合
		modalBox.iccidList = [];
		/*获取模态框*/
		modalBox.modal = document.getElementById("myModaldaoru");
		/*获得关闭按钮*/
		modalBox.closeBtn = document.getElementById("daoruClose");
		modalBox.cancelBtn = document.getElementById("daoruCancel");
		/*模态框显示*/
		modalBox.show = function() {
			this.modal.style.display = "block";
		};
		/*模态框关闭*/
		modalBox.close = function() {
			this.modal.style.display = "none";
		};
		/*当用户点击模态框内容之外的区域，模态框也会关闭*/
		modalBox.outsideClick = function() {
			var modal = this.modal;
			window.onclick = function(event) {
				if(event.target == modal) {
					modal.style.display = "none";
				}
			}
		};
		/*模态框初始化*/
		modalBox.init = function() {
			var that = this;
			that.show();
			this.closeBtn.onclick = function() {
				that.close();
			}
			this.cancelBtn.onclick = function() {
				that.close();
			}
			this.outsideClick();
		}
		modalBox.init();

		//		获取供应商
		var params = {
			currentPage: 1,
			pageSize: 10000
		}
		$.ajax({
			type: 'POST',
			url: commonUrl + '/admin/TSuppliers/voice/queryByPageInfo.action',
			data: JSON.stringify(params),
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			dataType: 'json',
			success: function(datajson) {
				if(datajson.result == 'success') {
					var appName = datajson.data.data
					var option = "<option value=''>请选择供应商</option>";
					//				清空套餐下拉框
					document.querySelector("#supplierUuid").innerHTML = "";
					if(datajson.result == "error") {
						document.querySelector("#supplierUuid").innerHTML = option;
						return;
					}
					if(datajson.data == []) {
						document.querySelector("#supplierUuid").innerHTML = option;
						return;
					}
					var option = "<option value=''>请选择供应商</option>"
					for(var i = 0; i < appName.length; i++) {
						var customerUuid = appName[i].uuid
						var customerName = appName[i].supplierName
						if(appName[i]) {
							option += "<option value=" + customerUuid + ">" + customerName + "</option>"
						}
					}
					document.querySelector("#supplierUuid").innerHTML = option;
				} else {
					ss.layer.msg(datajson.errorMsg)
				}
			},
			error: function(xhr, type) {
				alert("错误")
			}
		});

		// 默认选择文件text
		document.getElementById('daoruText').innerHTML = "选择";
		document.getElementById('daoruText').title = "选择";

		document.querySelector("#daoruFile").onchange = function() {
			var file = this.files[0];
			console.log(file)
			//判断所选择文件是否为excel文件类型
			if(/\.xlsx|\.xlsm|\.xls|\.csv/.test(file.name)) {
				document.getElementById('daoruText').innerHTML = file.name;
				document.getElementById('daoruText').title = file.name;
			} else {
				layer.msg('非excel文件，请重新选择');
				return;
			}
		}

		//保存
		document.getElementById('daoruSave').onclick = function() {
			var supplierUuid = document.querySelector("#supplierUuid").value;
			var businessType = document.querySelector("#businessType").value;
			var cardType = document.querySelector("#cardType").value;
			var cardSize = document.querySelector("#cardSize").value;
			var daoruFile = document.querySelector("#daoruFile").value;
			var huaboRemark = document.querySelector("#huaboRemark").value;
			if(!supplierUuid || !businessType || !cardType || !daoruFile || !cardSize) {
				layer.msg('请将必填数据填写完成')
				return;
			}
			var options = {
				type: 'post',
				url: commonUrl + '/admin/TCardStore/import.action',
				dataType: 'json',
				beforeSend: function() {
					ss.c3Loading.show();
				},
				success: function(d) {
					if(d.result == 'success') {
						layer.alert('导入成功！编号为：' + d.data + ',请到系统管理-导入日志记录查询导入情况！');
						document.querySelector("#supplierUuid").value = "";
						document.querySelector("#businessType").value = "";
						document.querySelector("#cardType").value = "";
						document.querySelector("#daoruFile").value = "";
						document.getElementById('daoruText').innerHTML = "选择";
						document.getElementById('daoruText').title = "选择";
						instance.lg_reloadFn();
						modalBox.close()
					};
					if(d.result == 'error') {
						layer.msg(d.errorMsg || '系统异常！');
					};
					ss.c3Loading.hidden();

				}
			};
			$('#daoruForm').ajaxSubmit(options);
		}
	}
	//主套餐变更
	function mainBagFn(self) {
		var iccidCount = 0
		var chooseData = []
		var iccidList = []
		//数据清空
		document.getElementById('number12').innerHTML = '0'
		document.getElementById('selectNum').value = ''
		document.getElementById('sum2').innerHTML = '0'
		document.getElementById('fileWrap12').style.display = 'block'
		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page].length > 0) {
			document.getElementById('fileWrap12').style.display = 'none'
			chooseData = self.scope.checkObj[self.pageData.page]
			iccidCount = chooseData.length
			document.getElementById('number12').innerHTML = chooseData.length
			for(var i = 0; i < chooseData.length; i++) {
				iccidList.push(chooseData[i].iccid)
			}
		}
		//点击手动录单模态框---开始
		/*建立模态框对象*/
		var modalBox = {};
		/*获取模态框*/
		modalBox.modal = document.getElementById("mainBagModal");
		/*获得trigger按钮*/
		modalBox.triggerBtn = document.getElementById("triggerBtn");
		/*获得关闭按钮*/
		modalBox.renewalcloseBtn = document.getElementById("mainBagcloseBtn");
		modalBox.renewalcancelBtn = document.getElementById("mainBagcancelBtn");
		/*模态框显示*/
		modalBox.show = function() {
			console.log(this.modal);
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
			this.renewalcloseBtn.onclick = function() {
				that.close();
			}
			this.renewalcancelBtn.onclick = function() {
				that.close();
			}
			this.outsideClick();
		}
		modalBox.init();
		//点击手动录单模态框---结束
		document.getElementById('choose12').innerHTML = '选择'
		//选择文件
		document.getElementById('file12').onchange = function() {
			var file = this.files[0]
			//判断所选择文件是否为excel文件类型
			if(/\.xlsx|\.xlsm|\.xls|\.csv/.test(file.name)) {
				document.getElementById('choose12').innerHTML = file.name;
				document.getElementById('choose12').title = file.name;
			} else {
				layer.msg('非excel文件，请重新选择');
				return;
			}
			//提交前参数判断 
			if(document.querySelector('#choose12').innerHTML.indexOf('选择') != -1) {
				layer.msg('请先选择文件！');
				return false;
			};
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
						iccidCount = data['data'].length
						document.getElementById('number12').innerHTML = data['data'].length
						layer.msg('文件选择成功');
					} else {
						layer.msg(data && data['errorMsg']);
					}
				}
			};
			$('#form1').ajaxSubmit(options);
		}
		var radioObj = {
			businessType: '1',
			bagSuppliersType: '1',
			flowType: '0'
		}
		var packageId = '';
		var selectNum = '';
		//获取套餐
		function getBag(params, bagUuid, defaultName) {
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TBagPlatform/getpackageList.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(datajson) {
					if(datajson.result == 'success') {
						var data = datajson.data || [];
						bagData = data;
						var selectData = [];
						for(var i = 0; i < data.length; i++) {
							var obj = {};
							obj.code = data[i].uuid;
							obj.name = data[i].bagPlatformName;
							selectData.push(obj);
						}
						var selectObj = {};
						selectObj.name = '套餐';
						selectObj.txt = 'packageId';
						selectObj.data = selectData;
						if(defaultName && bagUuid) {
							selectObj.defaultVal = bagUuid;
							selectObj.defaultName = defaultName;
						}
						selectObj.parentDom = document.querySelector('#mainBagModal');
						selectObj.appendTo = document.querySelector('#mainBagModal').querySelector('#selectWrap');
						//渲染模糊查询下拉
						ss.blurrySel({
							selectObj
						});

						var selectLi = document.querySelector('#mainBagModal').querySelector('#selectWrap').querySelectorAll('li')
						if(selectLi && selectLi.length > 0) {
							for(var i = 0; i < selectLi.length; i++) {
								selectLi[i].onclick = function() {
									packageId = this.getAttribute('code')
									if(packageId && selectNum) {
										//获取金额
										getSum('#sum2', {
											uuid: packageId,
											selectNum,
											iccidCount
										})
									}
								}
							}
						}
					} else {
						ss.layer.msg(datajson.errorMsg)
					}
				},
				error: function(xhr, type) {
					alert("错误")
				}
			});
		}
		getBag(radioObj)
		//获取数量数据
		getNum("#selectNum2", {
			dickey: 'bag_select_num'
		})
		document.querySelector('#mainBagModal').querySelector('#selectNum2').onchange = function() {
			selectNum = Number(this.value);
			if(packageId && selectNum) {
				//获取金额
				getSum('#sum2', {
					uuid: packageId,
					selectNum,
					iccidCount
				})
			}
			var bagUuid = document.querySelector("#mainBagModal").querySelector("._show").getAttribute('code');
			var defaultName = document.querySelector("#mainBagModal").querySelector("._show").innerHTML;
			getBag(radioObj, bagUuid, defaultName)
		}

		var activationType = $("#activationType1").val('');
		//保存
		document.getElementById('save12').onclick = function() {

			var activeType = 1;
			var params = {
				packageId,
				selectNum,
				iccidList,
				activeType
			}
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/packagechange.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						//表格重载
						instance.lg_reloadFn()
						$('input[type=radio][name="businessType"]:first').prop("checked", true);
						$('input[type=radio][name="bagSuppliersType"]:first').prop("checked", true);
						$('input[type=radio][name="flowType"]:first').prop("checked", true);
						modalBox.close()
						layer.msg('主套餐变更成功')
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

	//订购套餐
	function renewalFeeFn(self) {
		var iccidCount = 0
		var chooseData = []
		var iccidList = []
		//数据清空
		document.getElementById('number1').innerHTML = ''
		document.getElementById('selectNum').value = ''
		document.getElementById('sum').value = ''
		document.getElementById('fileWrap1').style.display = 'block'
		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page].length > 0) {
			document.getElementById('fileWrap1').style.display = 'none'
			chooseData = self.scope.checkObj[self.pageData.page]
			iccidCount = chooseData.length
			document.getElementById('number1').innerHTML = chooseData.length
			for(var i = 0; i < chooseData.length; i++) {
				iccidList.push(chooseData[i].iccid)
			}
		}
		//点击手动录单模态框---开始
		/*建立模态框对象*/
		var modalBox = {};
		/*获取模态框*/
		modalBox.modal = document.getElementById("renewalFeeModal");
		/*获得trigger按钮*/
		modalBox.triggerBtn = document.getElementById("triggerBtn");
		/*获得关闭按钮*/
		modalBox.renewalcloseBtn = document.getElementById("renewalcloseBtn");
		modalBox.renewalcancelBtn = document.getElementById("renewalcancelBtn");
		/*模态框显示*/
		modalBox.show = function() {
			console.log(this.modal);
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
			this.renewalcloseBtn.onclick = function() {
				that.close();
			}
			this.renewalcancelBtn.onclick = function() {
				that.close();
			}
			this.outsideClick();
		}
		modalBox.init();
		//点击手动录单模态框---结束
		document.getElementById('choose1').innerHTML = '选择'
		//选择文件
		document.getElementById('file1').onchange = function() {
			var file = this.files[0]
			//判断所选择文件是否为excel文件类型
			if(/\.xlsx|\.xlsm|\.xls|\.csv/.test(file.name)) {
				document.getElementById('choose1').innerHTML = file.name;
				document.getElementById('choose1').title = file.name;
			} else {
				layer.msg('非excel文件，请重新选择');
				return;
			}
			//提交前参数判断 
			if(document.querySelector('#choose1').innerHTML.indexOf('选择') != -1) {
				layer.msg('请先选择文件！');
				return false;
			};
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
						iccidCount = data['data'].length
						document.getElementById('number1').innerHTML = data['data'].length
						layer.msg('文件选择成功');
					} else {
						layer.msg(data && data['errorMsg']);
					}
				}
			};
			$('#form1').ajaxSubmit(options);
		}
		//获取套餐
		function getBag(params, bagUuid, defaultName) {
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TBagPlatform/getpackageList.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(datajson) {
					if(datajson.result == 'success') {
						var data = datajson.data || [];
						bagData = data;
						var selectData = [];
						for(var i = 0; i < data.length; i++) {
							var obj = {};
							obj.code = data[i].uuid;
							obj.name = data[i].bagPlatformName;
							selectData.push(obj);
						}
						var selectObj = {};
						selectObj.name = '套餐';
						selectObj.txt = 'packageId';
						selectObj.data = selectData;
						if(defaultName && bagUuid) {
							selectObj.defaultVal = bagUuid;
							selectObj.defaultName = defaultName;
						}
						selectObj.parentDom = document.querySelector('#renewalFeeModal');
						selectObj.appendTo = document.querySelector('#renewalFeeModal').querySelector('#selectWrap');
						//渲染模糊查询下拉
						ss.blurrySel({
							selectObj
						});

						var selectLi = document.querySelector('#renewalFeeModal').querySelector('#selectWrap').querySelectorAll('li')
						if(selectLi && selectLi.length > 0) {
							for(var i = 0; i < selectLi.length; i++) {
								selectLi[i].onclick = function() {
									packageId = this.getAttribute('code')
									if(packageId && selectNum) {
										//获取金额
										getSum('#sum', {
											uuid: packageId,
											selectNum,
											iccidCount
										})
									}
								}
							}
						}
					} else {
						ss.layer.msg(datajson.errorMsg)
					}
				},
				error: function(xhr, type) {
					alert("错误")
				}
			});
		}
		var radioObj = {}
		radioObj.businessType = $("input[name='businessType']:checked").val()
		radioObj.bagSuppliersType = $("input[name='bagSuppliersType']:checked").val()
		radioObj.flowType = $("input[name='flowType']:checked").val()
		//radio事件
		window.change = function(type, current) {
			radioObj[type] = Number(current.value)
			if(type == 'bagSuppliersType' && current.value == '1' || type == 'flowType') {
				document.getElementById('flowType').style.display = 'block'
			} else {
				document.getElementById('flowType').style.display = 'none'
			}
			if((type == 'bagSuppliersType' && current.value == '2') || (type == 'flowType')) {
				if('flowType' in radioObj) {
					//获取套餐数据
					getBag(radioObj)
				} else {
					radioObj.flowType = ''
					//获取套餐数据
					getBag(radioObj)
				}
			}
		}
		if($('input[type=radio][name="flowType"]:checked').val()) {
			//获取套餐数据
			getBag(radioObj)
		}
		//获取数量数据
		getNum("#selectNum", {
			dickey: 'bag_select_num'
		})
		var packageId = '';
		var selectNum = '';
		window.changeP = function(current) {
			packageId = current.value
			if(packageId && selectNum) {
				//获取金额
				getSum('#sum', {
					uuid: packageId,
					selectNum,
					iccidCount
				})
			}
		}
		document.querySelector('#renewalFeeModal').querySelector('#selectNum').onchange = function() {
			selectNum = Number(this.value);
			if(packageId && selectNum) {
				//获取金额
				getSum('#sum', {
					uuid: packageId,
					selectNum,
					iccidCount
				})
			}
			var bagUuid = document.querySelector("#renewalFeeModal").querySelector("._show").getAttribute('code');
			var defaultName = document.querySelector("#renewalFeeModal").querySelector("._show").innerHTML;
			getBag(radioObj, bagUuid, defaultName)
		}

		var activationType = $("#activationType1").val('');
		//保存
		document.getElementById('save1').onclick = function() {
			var activeType1 = $('input[type=radio][name="activeType"]:checked').val();
			var params = {
				activeType: radioObj.activeType ? radioObj.activeType : activeType1,
				packageId,
				selectNum,
				iccidList
			}
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/cardstrock/renewal.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						//表格重载
						instance.lg_reloadFn()
						$('input[type=radio][name="businessType"]:first').prop("checked", true);
						$('input[type=radio][name="bagSuppliersType"]:first').prop("checked", true);
						$('input[type=radio][name="flowType"]:first').prop("checked", true);
						$('input[type=radio][name="activeType"]:first').prop("checked", true);
						modalBox.close()
						layer.msg('卡续费成功')
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
	//划拨
	function sliderFn(self) {
		var chooseData = []
		var iccidList = []
		document.getElementById('number').innerHTML = ''
		document.getElementById('fileWrap3').style.display = 'block'
		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page].length > 0) {
			document.getElementById('fileWrap3').style.display = 'none'
			chooseData = self.scope.checkObj[self.pageData.page]
			document.getElementById('number').innerHTML = chooseData.length
			for(var i = 0; i < chooseData.length; i++) {
				iccidList.push(chooseData[i].iccid)
			}
		}
		//点击手动录单模态框---开始
		/*建立模态框对象*/
		var modalBox = {};
		/*获取模态框*/
		modalBox.modal = document.getElementById("slidermyModal");
		/*获得trigger按钮*/
		modalBox.triggerBtn = document.getElementById("triggerBtn");
		/*获得关闭按钮*/
		modalBox.slidercloseBtn = document.getElementById("slidercloseBtn");
		modalBox.slidercancelBtn = document.getElementById("slidercancelBtn");
		/*模态框显示*/
		modalBox.show = function() {
			console.log(this.modal);
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
			this.slidercloseBtn.onclick = function() {
				that.close();
			}
			this.slidercancelBtn.onclick = function() {
				that.close();
			}
			this.outsideClick();
		}
		modalBox.init();
		//点击手动录单模态框---结束
		document.getElementById('choose').innerHTML = '选择'
		//选择文件
		document.getElementById('file').onchange = function() {
			var file = this.files[0]
			//判断所选择文件是否为excel文件类型
			if(/\.xlsx|\.xlsm|\.xls|\.csv/.test(file.name)) {
				document.getElementById('choose').innerHTML = file.name;
				document.getElementById('choose').title = file.name;
			} else {
				layer.msg('非excel文件，请重新选择');
				return;
			}
			//提交前参数判断
			if(document.querySelector('#file').innerHTML.indexOf('选择') != -1) {
				layer.msg('请先选择文件！');
				return false;
			};
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
						iccidList = data['data']
						document.getElementById('number').innerHTML = data['data'].length
						ss.layer.msg('文件选择成功');
					} else {
						ss.layer.msg(data && data['errorMsg']);
					}
				}
			};
			$('#form').ajaxSubmit(options);
		}
		//获取客户数据
		getCustomer("#slidermyModal")
		var activationType = $("#activationType1").val('');
		//保存
		document.getElementById('save').onclick = function() {
			var customerUuid = document.querySelector("#slidermyModal").querySelector("._show").getAttribute('code');
			var activationType = $("#activationType1").val();
			var iccids = []
			var params = {
				customerUuid,
				activationType: Number(activationType),
				imeiBind: Number($("#_imeiBind").val()),
				iccidList
			}
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/cardstrock/distribute.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						//表格重载
						instance.lg_reloadFn()
						modalBox.close()
						layer.msg('划拨成功')
					} else {
						layer.msg(data.data)
					}
				},
				error: function(xhr, type) {
					alert("错误")
				}
			});
		}
	}
	//回划
	function pointerFn(self) {
		var chooseData = []
		var iccidList = []
		document.getElementById('number2').innerHTML = ''
		document.getElementById('fileWrap2').style.display = 'block'
		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page].length > 0) {
			document.getElementById('fileWrap2').style.display = 'none'
			chooseData = self.scope.checkObj[self.pageData.page]
			document.getElementById('number2').innerHTML = chooseData.length
			for(var i = 0; i < chooseData.length; i++) {
				iccidList.push(chooseData[i].iccid)
			}
		}
		//点击手动录单模态框---开始
		/*建立模态框对象*/
		var modalBox = {};
		/*获取模态框*/
		modalBox.modal = document.getElementById("myModal");
		/*获得trigger按钮*/
		modalBox.triggerBtn = document.getElementById("triggerBtn");
		/*获得关闭按钮*/
		modalBox.closeBtn = document.getElementById("closeBtn");
		modalBox.cancelBtn = document.getElementById("cancelBtn");
		/*模态框显示*/
		modalBox.show = function() {
			console.log(this.modal);
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
			this.cancelBtn.onclick = function() {
				that.close();
			}
			this.outsideClick();
		}
		modalBox.init();
		//点击手动录单模态框---结束
		document.getElementById('choose2').innerHTML = '选择'
		//选择文件
		document.getElementById('file').onchange = function() {
			var file = this.files[0]
			//判断所选择文件是否为excel文件类型
			if(/\.xlsx|\.xlsm|\.xls|\.csv/.test(file.name)) {
				document.getElementById('choose2').innerHTML = file.name;
				document.getElementById('choose2').title = file.name;
			} else {
				layer.msg('非excel文件，请重新选择');
				return;
			}
			//提交前参数判断
			if(document.querySelector('#file').innerHTML.indexOf('选择') != -1) {
				layer.msg('请先选择文件！');
				return false;
			};
			var options = {
				type: 'post',
				url: '/admin/TCardStore/cardstrock/importExcel.action',
				beforeSend: function(request) {
					ss.c3Loading.show();
				},
				complete: function() {
					ss.c3Loading.hidden();
				},
				success: function(data) {
					if(data.result == 'success') {
						iccidList = data['data']
						document.getElementById('number2').innerHTML = data['data'].length
						ss.layer.msg('文件选择成功');
					} else {
						ss.layer.msg(data && data['errorMsg']);
					}
				}
			};
			$('#form').ajaxSubmit(options);
		}
		//获取客户数据
		getCustomer("#myModal")
		var activationType = $("#activationType1").val('');
		//保存
		document.getElementById('save2').onclick = function() {
			var customerUuid = document.querySelector("#myModal").querySelector("._show").getAttribute('code');
			var activationType = $("#activationType1").val();
			var iccids = []
			var params = {
				customerUuid,
				activationType: Number(activationType),
				iccidList
			}
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/cardstrock/reDistribute.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						//表格重载 
						instance.lg_reloadFn()
						modalBox.close()
						layer.msg('回划成功')
					} else {
						layer.msg(data.data)
					}
				},
				error: function(xhr, type) {
					alert("错误")
				}
			});
		}
	}
	//导入Excel+ 新弹窗
	var viewObj_new = {
		ctx: $('#dataCon')[0],
		domWrap: {
			v: ss.getDom('#View_new', this.ctx),
			vShaDow: ss.getDom('.V_shadow', ss.getDom('#View_new', this.ctx)),
			vCon: ss.getDom('.V_con', ss.getDom('#View_new', this.ctx)),
			VConc: ss.getDom('.V_con_c', ss.getDom('#View_new', this.ctx)),
			Vcancel: ss.getDom('.V_con_bt', ss.getDom('#View_new', this.ctx)),
			Vtitle: ss.getDom('.V_con_t', ss.getDom('#View_new', this.ctx)),
			Vsave: ss.getDom('.V_con_bs', ss.getDom('#View_new', this.ctx)),
		},
		dpCss: function() {
			ss.mdfCss(this.domWrap.vShaDow, ['width', ss.paraWrap.clwx, 'height', ss.paraWrap.clhx]);
			ss.mdfCss(this.domWrap.vCon, [
				'width', ss.paraWrap.clw * .6 + 'px',
				'top', ss.paraWrap.clh * .1 + 'px',
				'left', ss.paraWrap.clw * .2 + 'px'
			]);
		},
		dpClick: function() {
			var self = this;
			this.domWrap.Vcancel.onclick = function() {
				self['domWrap']['v'].style.display = 'none';
			};
			this.domWrap.Vsave.onclick = function() {
				if(document.querySelector('[for="deparment_data_new"]').innerHTML.indexOf('选择') != -1) {
					layer.msg('请先选择EXCEL文件！', {
						offset: '100px'
					});
					return false;
				};
				var supplierUuid = $('#supplierUuid').val()
				var customerUuid = $('#customerUuid').val()
				var tagUuid = $('#tagUuid').val()
				var activationType = $('#activationType').val()
				var businessType = $('#businessType').val()
				var cardType = $('#cardType').val()
				if(!supplierUuid && !tagUuid && !activationType && !businessType && !cardType) {
					layer.msg('请将必填数据填写完成')
					return 0
				}
				self['domWrap']['v'].style.display = 'none';
				var options = {
					type: 'post',
					url: commonUrl + '/admin/TCardStore/import.action',
					dataType: 'json',
					beforeSend: function() {
						ss.c3Loading.show();
						importExcelC3();
					},
					success: function(d) {
						if(d.result == 'success') {
							layer.alert('导入成功！编号为：' + d.data + ',请到系统管理-导入日志记录查询导入情况！');
							$('#supplierUuid').val('')
							$('#customerUuid').val('')
							$('#tagUuid').val('')
							$('#activationType').val('')
							$('#businessType').val('')
							$('#cardType').val('')
							document.querySelector('[for="deparment_data_new"]').innerHTML = '请选择EXCEL文件'
							instance.lg_reloadFn();
						};
						if(d.result == 'error') {
							layer.msg(d.errorMsg || '系统异常！');
						};
						ss.c3Loading.hidden();
					}
				};
				$('#form_new').ajaxSubmit(options);
			};
		},
		start: function() {
			this.dpCss();
			this.dpClick();
		}
	}
	viewObj_new.start();
	//新弹窗->点击->函数
	//获取客户
	function getCustomer(id) {
		var params = {
			currentPage: 1,
			pageSize: 10000
		}
		$.ajax({
			type: 'POST',
			url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
			data: JSON.stringify(params),
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			dataType: 'json',
			success: function(datajson) {
				if(datajson.result == 'success') {
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
					selectObj.parentDom = document.querySelector(id);;
					selectObj.appendTo = document.querySelector(id).querySelector('#selectWrap');
					//渲染模糊查询下拉
					ss.blurrySel({
						selectObj
					});
				} else {
					ss.layer(datajson.errorMsg)
				}
			},
			error: function(xhr, type) {
				alert("错误")
			}
		});
	}
	//获取供应商
	function getsupplier(id) {
		var params = {
			currentPage: 1,
			pageSize: 10000
		}
		$.ajax({
			type: 'POST',
			url: commonUrl + '/admin/TSuppliers/queryByPageInfo.action',
			data: JSON.stringify(params),
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			dataType: 'json',
			success: function(datajson) {
				if(datajson.result == 'success') {
					var appName = datajson.data.data
					if(!appName) {
						return 0
					}
					$(id + " option").remove();
					var myreg = /^\d{11}$/;
					var option = "<option value=''>请选择供应商</option>"
					for(var i = 0; i < appName.length; i++) {
						var customerUuid = appName[i].uuid
						var customerName = appName[i].supplierName
						if(appName[i]) {
							option += "<option value=" + customerUuid + ">" + customerName + "</option>"
						}
					}
					$(id).append(option)
				} else {
					ss.layer.msg(datajson.errorMsg)
				}
			},
			error: function(xhr, type) {
				alert("错误")
			}
		});
	}
	//获取数量
	function getNum(id, params) {
		$.ajax({
			type: 'POST',
			url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
			data: JSON.stringify(params),
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			dataType: 'json',
			success: function(datajson) {
				if(datajson.result == 'success') {
					var appName = datajson.data
					if(!appName) {
						return 0
					}
					$(id + " option").remove();
					var myreg = /^\d{11}$/;
					var option = "<option value=''>请选择数量</option>"
					for(var i = 0; i < appName.length; i++) {
						var customerUuid = appName[i].dicvalue
						var customerName = appName[i].dicname
						if(appName[i]) {
							option += "<option value=" + customerUuid + ">" + customerName + "</option>"
						}
					}
					$(id).append(option)
				} else {
					ss.layer.msg(datajson.errorMsg)
				}
			},
			error: function(xhr, type) {
				alert("错误")
			}
		});
	}
	//获取金额
	function getSum(id, params) {
		$.ajax({
			type: 'POST',
			url: commonUrl + '/admin/TBagPlatform/calculate.action',
			data: JSON.stringify(params),
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			dataType: 'json',
			success: function(datajson) {
				if(datajson.result == 'success') {
					var appName = datajson.data
					$(id).html(appName + '元')
				} else {
					ss.layer.msg(datajson.errorMsg)
				}
			},
			error: function(xhr, type) {
				alert("错误")
			}
		});
	}

	//导入excel的缓冲动画
	function importExcelC3() {
		//处理缓冲动画
		var shadowDom = ss.getDom('.c3Loading_shade');
		var circleDom = ss.getDom('.sk-circle');
		var importDom = ss.getDom('[name="import"]');
		ss.mdfCss(shadowDom, [
			'width', importDom.offsetWidth + 21 + 'px',
			'height', importDom.offsetHeight + 20 + 'px',
			'top', importDom.offsetTop - 10 + 'px',
			'left', importDom.offsetLeft - 5 + 'px',
			'borderRadius', '5px',
			'backgroundColor', '#000',
			'opacity', .3
		]);
		ss.crtDom('div', 'c3Txt', '导入中...', circleDom, {
			cn: ['position', 'left', 'top', 'color', 'width', 'fontWeight'],
			cv: ['absolute', '50px', '23px', '#fb8a30', '100px', 600]
		});
		ss.mdfCss(circleDom, [
			'top', importDom.offsetTop - 45 + 'px',
			'left', importDom.offsetLeft + 20 + 'px',
		]);
	};

	//导出
	function exportFn(self) {
		var loading = layer.load(1, {
		  shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
		//请求地址
		var queryUrl = commonUrl + "/admin/TCardStore/cardstrock/export.action";
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
					window.location.href = data.data;
				} else {
					layer.msg(data.errorMsg || '导出失败')
				}
			},
			error: function(data) {
				layer.close(loading);
				layer.msg('数据获取失败')
				layer.close(data);
			}
		});
	}
	//	
	//	function exportFn(self) {
	//		//请求地址
	//		var queryUrl = commonUrl + "/admin/TCardStore/queryByPageInfo.action";
	//		//请求参数
	//		var params = self.scope.queryObj;
	//		params.currentPage = 1;
	//		params.pageSize = 1000;
	//		//		var data = disposeRequestData();
	//		//发送请求
	//		$.ajax({
	//			url: queryUrl,
	//			type: 'post',
	//			data: JSON.stringify(params),
	//			dataType: 'json',
	//			beforeSend: function(request) {
	//				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	//			},
	//			success: function(data) {
	//				var dataContainer = data.data.data;
	//				var option = {};
	//				option.fileName = '卡库';
	//				option.datas = [{
	//					sheetData: [], //数据源
	//					sheetName: 'sheet',
	//					sheetFilter: ['iccid', 'supplierName', 'customerName',
	//						'imei', 'imsi', 'ONLINE', 'simStatus', 'activateTime',
	//						'stopTime', 'isBind', 'cardType', 'activationType',
	//						'flowMonthUsed', 'flowMonthResidual', 'createTime',
	//					],
	//					sheetHeader: ['ICCID', '运营商', '客户',
	//						'IMEI', 'IMSI', '在线状态', '激活状态', '激活时间',
	//						'卡到期时间', '是否绑定', '卡片类型', '激活类型',
	//						'本月已用流量', '本月剩余流量', '创建时间'
	//					]
	//				}];
	//
	//				//对储存的数据进行遍历
	//				//console.log(dataContainer);
	//				var newDataWrap = [];
	//				var disposeData = ['iccid', 'supplierName', 'customerName',
	//					'imei', 'imsi', 'ONLINE', 'simStatus', 'activateTime',
	//					'stopTime', 'isBind', 'cardType', 'activationType',
	//					'flowMonthUsed', 'flowMonthResidual', 'createTime',
	//				];
	//				var simStatus = {
	//					"1": '可激活',
	//					"2": '已激活',
	//					"3": "停用",
	//					"4": '失效'
	//				};
	//				//console.log(disposeData);
	//				for(var a = 0; a < dataContainer.length; a++) {
	//					var tempObj = {};
	//					for(var b = 0; b < disposeData.length; b++) {
	//						//处理激活枚举转换 
	//						if(disposeData[b] == 'simStatus') {
	//							tempObj[disposeData[b]] = simStatus[dataContainer[a][disposeData[b]]];
	//						} else if(disposeData[b] == 'activateTime' || disposeData[b] == 'stopTime' || disposeData[b] == 'createTime'){
	//							tempObj[disposeData[b]] = dataContainer[a][disposeData[b]] ? ss.dpDate.normal(dataContainer[a][disposeData[b]]):'';
	//						}
	//						else {
	//							tempObj[disposeData[b]] = dataContainer[a][disposeData[b]];
	//						}
	//					}
	//					newDataWrap.push(tempObj);
	//				}
	//				//console.log(newDataWrap);
	//				option.datas[0].sheetData = newDataWrap;
	//				var toExcel = new ExportJsonExcel(option);
	//				toExcel.saveExcel();
	//			},
	//			error: function(data) {
	//				layer.msg('数据获取失败')
	//				layer.close(data);
	//			}
	//		});
	//	}
	//激活
	function activeFn(curData, self) {
		//请求地址
		var queryUrl = commonUrl + "/admin/TCardStore/active.action";
		//请求参数
		var params = {
			'iccid': curData.iccid
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
			success: function(data) {
				if(data.result == 'success') {
					self.lg_reloadFn()
					layer.msg('激活成功')
				} else {
					layer.msg(data.errorMsg)
				}
			},
			error: function(data) {
				layer.msg('数据获取失败')
				layer.close(data);
			}
		});
	}
	//刷新
	function refleshFn(curData, self) {
		//请求地址
		var queryUrl = commonUrl + "/admin/TCardStore/refresh.action";
		var iccidArr = []
		iccidArr.push(curData.iccid)
		//请求参数
		var params = {
			'pageSize': self.tableData.pageSize.toString(),
			'iccids': iccidArr
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
			success: function(data) {
				if(data.result == 'success') {
					self.lg_reloadFn()
					layer.msg('刷新成功')
				} else {
					layer.msg(data.errorMsg)
				}
			},
			error: function(data) {
				layer.msg('数据获取失败')
				layer.close(data);
			}
		});
	}
})