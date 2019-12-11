﻿﻿
ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	var queryData = {
		isp: 2
	}
	//平台套餐名的模糊查询下拉框渲染
	function crtDomNewFn(self, renderData, name, parentDom, type) {
		var dtSelf = self;
		var addViewData = [];
		var editViewData = [];
		if(type == 'add') {
			addViewData = self.sourceObj.searchBtn.add.items;
		} else {
			var operationData = self.sourceObj.table.edit.operation;
			for(var i = 0; i < operationData.length; i++) {
				if(operationData[i].name == '编辑') {
					editViewData = operationData[i].items;
					break;
				}
			}
		}
		//循环下拉数据renderData 看所选套餐是否属于该数据
		if(parentDom.querySelector('._show')) {
			var defaultVal = parentDom.querySelector('._show').getAttribute('code') || '';
			var defaultName = parentDom.querySelector('._show').innerHTML || '';
		}
		var flag = false;
		if(defaultVal != '' && defaultName != '') {
			for(var j = 0; j < renderData.length; j++) {
				if(renderData[j].code == defaultVal) {
					flag = true;
					return;
				}
			}
			//不属于 清空数据
			if(!flag) {
				defaultVal = '';
				defaultName = '';
			}
		}
		var dtVagueSleSelf = new ss.dtVagueSle({
			name: name, //选项名
			appendTo: parentDom, //追加元素
			data: renderData, //依赖数据
			defaultVal: defaultVal,
			defaultName: defaultName,
			hv: 30,
			cbFn: function(self) {
				if(type == 'add') {
					dtSelf['scope']['addParaObj'][parentDom.parentNode.getAttribute('name')] = self['scope']['code'];
					var indexVal = parentDom.parentNode.getAttribute('name');
					addViewData[indexVal].cbFn && addViewData[indexVal].cbFn(parentDom.parentNode, self, self['scope']['code'], dtSelf);
				} else {
					dtSelf['scope']['editParaObj'][parentDom.parentNode.getAttribute('name')] = self['scope']['code'];
					var indexVal = parentDom.parentNode.getAttribute('name');
					editViewData[indexVal].cbFn && addViewData[indexVal].cbFn(parentDom.parentNode, self, self['scope']['code'], dtSelf);
				}
			}, //点击回调
			clearFn: function(self) {}, //清空回调
		});
	}
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#shareList')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TPoolPlatform/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify(queryData),
//			pageSize:2,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
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
					data: queryData,
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
				name: '请选择供应商',
				txt: 'supplierId',
				code: 0,
				type: 'select',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TPoolPlatform/getAvailableSuppliers.action',
					dataType: 'json',
					data: queryData,
					rely: {
						name: 'supplierName',
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
				name: '运营商共享池',
				txt: 'operatorId',
				code: 0,
				type: 'select',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TPoolPlatform/getAvailableOPools.action',
					dataType: 'json',
					data: queryData,
					rely: {
						name: 'opPoolName',
						code: 'uuid'
					},
					digitalModel: {
						data: {
							location: ['data']
						}
					}
				}
			}
			
		], //搜索栏额外按钮
		searchBtn: {
			//默认
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TPoolPlatform/createPoolPlatform.action',
				items: {
					pfPoolName: {
						name: '共享池名称',
						type: 'txt',
						verify: true
					},
					customerUuid: {
						name: '客户名称',
						type: 'blurrySel',
						width: '80%',
						verify: true,
						data: {
							url: commonUrl + '/admin/TPoolPlatform/getCustomerList.action',
							dataType: 'json',
							data: {},
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
					supplierId: {
						name: '供应商',
						type: 'select',
						verify: true,
						data: {
							url: commonUrl + '/admin/TPoolPlatform/getAvailableSuppliers.action',
							dataType: 'json',
							data: queryData,
							rely: {
								name: 'supplierName',
								code: 'uuid'
							},
							digitalModel: {
								data: {
									location: ['data']
								}
							}
						},
						cbFn: function(dom, self) {
							//根据供应商的套餐
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							self.eAjax({
								url: commonUrl + '/admin/TPoolPlatform/getAvailableOPools.action',
								type: 'post',
								data: {
									isp:queryData.isp,
									//供应商
									singleBagCode: dom.getAttribute('code'),
									//页数大小
									pageSize: 10000
								},
							}, {
								success: function(data) {
									if(data.data.length <= 0) {
										ss.layer.msg('该供应商下没绑定共享池！');
										crtDomNewFn(
											self, [],
											'运营商共享池', parent.querySelector('[txt="opPoolUuid"]'), 'add');
										return;
									}
									var _endData = data.data;
									//整理成下拉框需要的数据
									var _tempArr = [];
									_endData.forEach(function(item) {
										_tempArr.push({
											name: item.opPoolName,
											code: item.uuid,
											curdata: item
										});
									});
									crtDomNewFn(
										self,
										_tempArr,
										'运营商共享池',
										parent.querySelector('[txt="opPoolUuid"]'),
										'add'
									);
								},
								isJson: true
							});

						},
					},
					opPoolUuid: {
						name: '运营商共享池',
						type: 'blurrySel',
						width: '80%',
						data: {
							url: commonUrl + '/admin/TPoolPlatform/getAvailableOPools.action',
							dataType: 'json',
							data: queryData,
							rely: {
								name: "opPoolName",
								code: "uuid"
							},
							digitalModel: {
								data: {
									location: ['data']
								}
							}
						},
						verify: true
					},
					poolLimitType: {
						name: '池超量策略',
						type: 'select',
						data: [{
								'code': 0,
								'name': '无限量'
							},
							{
								'code': 1,
								'name': '降速'
							},
							{
								'code': 2,
								'name': '停卡'
							},
							{
								'code': 3,
								'name': '计费使用'
							},
						],
						verify: true
					},
//					payType: {
//						name: '支付方式',
//						type: 'select',
//						data: [{
//								'code': 1,
//								'name': '预付费'
//							},
//							{
//								'code': 2,
//								'name': '后付费'
//							}
//						],
//						verify: true
//					},
					isp: {
						name: 'isp',
						value: 2,
						type: 'txt',
						styles: {
							styleCn: ['display'],
							styleCv: ['none']
						},
						verify: false,
					},
					//					remark: {
					//						name: '备注',
					//						type: 'area',
					//						verify: true,
					//					},
				},

			},
			//续费
			xufei: {
				name: '订购套餐',
				colType: 'opt2',
				cbFn: function(self) {
					continues(self);
				}
			},
			//修改
			amend: {
				name: '修改套餐',
				colType: 'opt2',
				cbFn: function(self) {
					modifyBag(self);
				}
			},
			//预警
			alertSetting: {
				name: '预警设置',
				colType: 'opt2',
				cbFn: function(self) {
					alertSetting(self, commonUrl);
				}
			},
			xuding: {
				name: '续订',
				colType: 'opt2',
				cbFn: function(self) {
					console.log(self)
					if(!self.scope.checkObj || self.scope.checkObj[self.pageData.page].length == 0){
						ss.layer.msg('请勾选需要续订套餐！');
						return
					}
					var renew = self.scope.checkObj[self.pageData.page];
					for(var i=0;i<renew.length;i++){
						if(!renew[i].packageName || renew[i].packageName=="-"){
							ss.layer.msg('当前共享池未订购套餐！');
							return
						}
						
					};
					ss.layer.prompt(
						{
							title: '确认续订', 
							area: ['500px', '340px'],
							content: `<div><p>备注:</p><textarea name="txt_remark" id="remark" style="width:400px;height:80px;"></textarea></div>`,
					  		btn: ['确定','取消'], //按钮
						
							yes:function(index, layero){
								var dataJson = self.scope.checkObj[self.pageData.page];
								var parms = [];
								console.log(dataJson)
								//								obj.uuid = dataJson[i].uuid;
//								console.log(dataJson)
								var objData={};
								for(var i=0;i<dataJson.length;i++){
									objData={}
									objData.pfPoolName = dataJson[i].pfPoolName;  
									objData.uuid = dataJson[i].uuid;
									objData.remak = $('#remark').val();
									parms.push(objData)
								}
								
								self.eAjax({
							        url:commonUrl + '/admin/TPoolPlatform/addRenewPool.action',
							        type:'post',
							        data:parms
//									data:{
//										logList:JSON.stringify(parms),
//										remak:$('#remark').val()
//									}
								}, 
							    {
							    	success:function(data){
							    		layer.closeAll();
							    		if(data.result == 'success'){
							    			ss.layer.msg('续订成功！');
							    			self.lg_reloadFn();
							    		}
							    	},
							    	isJson:true
								});
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
				dpWPer: '160%',
				dpWith: {
					'pfPoolName': 9,
					'customerName': 9,
					'supplierName': 9,
					'poolOperatorName': 9,
					'packageName': 9,
					'totalCardNum':6,
					'totalActivityCard':7,
					'totalFlowLimit':6,
					'totalUsedFlow':6,
					'totalUnusedFlow':7,
					'totalIncreaseCapacity': 8,
					'usedIncreaseCapacity': 8,
					'createTime': 9,
					'poolLimitType': 8,
					'remark': 8
				},
				closeInterlace: true,
				isChangeTime: ['createTime'],
				showTitle: ['pfPoolName', 'customerName', 'supplierName', 'poolOperatorName', 'packageName',
			'totalCardNum','totalActivityCard','totalFlowLimit','totalUsedFlow','totalUnusedFlow',
				'totalIncreaseCapacity', 'usedIncreaseCapacity', 'createTime', 'poolLimitType', 'remark'
			],
				sort: {},
				shim: {
					'poolLimitType': {
						'0': '无限量',
						'1': '降速',
						'2': '停卡',
						'3': '计费使用',
					}
				},
				cbFn: function(curData) {
					console.log(curData)
					if(curData.scope.checkObj){
						curData.scope.checkObj[curData.pageData.page]=[];
					}
					
					//详情弹窗
					for(var i = 0; i < document.querySelector(".tbCWrap").querySelectorAll("[name='pfPoolName']").length; i++) {
						document.querySelector(".tbCWrap").querySelectorAll("[name='pfPoolName']")[i].style.cursor = "pointer";
						document.querySelector(".tbCWrap").querySelectorAll("[name='pfPoolName']")[i].style.color = "#009900";
						document.querySelector(".tbCWrap").querySelectorAll("[name='pfPoolName']")[i].style.textDecoration = "underline";
						document.querySelector(".tbCWrap").querySelectorAll("[name='pfPoolName']")[i].setAttribute('index', i)
						document.querySelector(".tbCWrap").querySelectorAll("[name='pfPoolName']")[i].onclick = function() {
							var curObj = curData.tableData.data[this.getAttribute('index')]
							localStorage.setItem('pfPoolUuid', curObj.uuid)
							localStorage.setItem('pfPoolName', curObj.pfPoolName)
							location.hash = "shareList_list1";
						}
					}
				}
			},

			tlName: ['共享池名称', '客户名称', '供应商', '运营商共享池', '套餐名称',
				'总卡数（张）', '生效卡数（张）', '可用量（G）', '已用量（G）','剩余用量（G）', 
				'扩容可用量（G）', '扩容已用量（G）', '创建日期', '池超量策略', '预警百分比（%）','预警电话', '备注'
			], //表头名字
			tlTxt: ['pfPoolName', 'customerName', 'supplierName', 'poolOperatorName', 'packageName',
			'totalCardNum','totalActivityCard','totalFlowLimit','totalUsedFlow','totalUnusedFlow',
				'totalIncreaseCapacity', 'usedIncreaseCapacity', 'createTime', 'poolLimitType', 'warnPercent','linkPhone','remark'
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
	//预警设置
	function alertSetting(self, commonUrl) {
		var uuid = '';
		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page].length > 0) {
			var chooseData = self.scope.checkObj[self.pageData.page]
			uuid = chooseData[0].uuid
		}else{
			layer.msg('请勾选你要设置的卡')
			return;
		}
		var model = {
			id: 'alertSetting'
		};
		popupAll(model);
		var parentDom = document.querySelector('#alertSetting');
		parentDom.querySelector('#save').onclick = function() {
			var warnPercent = Number(parentDom.querySelector('#warnPercent').value)
			var linkPhone = Number(parentDom.querySelector('#linkPhone').value);
			if(linkPhone == '' || warnPercent == '') {
				layer.msg('请填完相关预警信息');
				return;
			}
			$.ajax({
				url: commonUrl + '/admin/TPoolPlatform/editPoolPlatformWarnPercent.action',
				type: 'post',
				data: JSON.stringify({
					warnPercent,
					linkPhone,
					uuid
				}),
				dataType: 'json',
				beforeSend: function(request) {
					request.setRequestHeader("content-type", "application/json;chaset=UTF-8");
				},
				success: function(res) {
					if(res.result == 'success') {
						layer.msg('设置成功');
						self.scope.checkObj[self.pageData.page] = []
						parentDom.querySelector(".close").click();
						instance.lg_reloadFn()
					} else {
						layer.msg(res.errorMsg || '设置失败');
						parentDom.querySelector(".close").click();
					}
				},
				error: function(err) {

				}
			})
		}
	}

	//修改套餐
	function modifyBag(self) {
		if(!self.scope.checkObj){
			ss.layer.msg('请勾选一个需要修改的套餐！');
			console.log("a")
			return			
		}
		if(self.scope.checkObj[self.pageData.page]==undefined){
			ss.layer.msg('请勾选一个需要修改的套餐！');			
			console.log("b")
			return
		}
		if(self.scope.checkObj[self.pageData.page].length==0){
			ss.layer.msg('请勾选一个需要修改的套餐！');
			console.log("c")
			return
		}
		if(self.scope.checkObj[self.pageData.page].length != 1){
			ss.layer.msg('请勾选一个需要修改的套餐！');
			console.log("d")
			return
		}
		var model = {
			id: 'modifyBag'
		};
		popupAll(model);
		var parentDom = document.querySelector('#modifyBag');
		//清空数据
		var uuidWrap = parentDom.querySelector('uuidWrap') //共享池名称
		if(uuidWrap) {
			var parentD = uuidWrap.parentNode
			parentD.removeChild(uuidWrap)
		}
		var packageIdWrap = parentDom.querySelector('packageIdWrap') //套餐名称
		if(packageIdWrap) {
			var parentD = packageIdWrap.parentNode
			parentD.removeChild(packageIdWrap)
		}
		parentDom.querySelector('#perLimit').value = '';
		parentDom.querySelector('#buyNum').value = '';
		parentDom.querySelector('#price').value = '';
		var defaultUuid = '';
		var defaultName = '';
		var singleBagCode = '';
		var customerUuid = '';
		var excludeBagId = '';

		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page].length > 0) {
			chooseData = self.scope.checkObj[self.pageData.page]
			defaultUuid = chooseData[0].uuid;
			defaultName = chooseData[0].pfPoolName;
			singleBagCode = chooseData[0].singleBagCode;
			excludeBagId = chooseData[0].singleBagCode;
			customerUuid = chooseData[0].customerUuid
			var params = {
				singleBagCode: singleBagCode,
				bagType: 1
			}
			//获取当前套餐
			getPackage(params, 2,self);
		}
		//获取共享池名称数据
		function getCustomer(defaultUuid, defaultName) {
			var fqObj = {
				url: commonUrl + '/admin/TPoolPlatform/getAvailablePoolPlatform.action',
				type: 'post',
				data: JSON.stringify({})
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
						obj.curdata = data[i];
						selectData.push(obj);
					}
					var selectObj = {};
					selectObj.name = '共享池名称';
					selectObj.txt = 'uuid';
					selectObj.data = selectData;
					if(defaultUuid && defaultName) {
						selectObj.defaultVal = defaultUuid;
						selectObj.defaultName = defaultName;
					}
					selectObj.parentDom = parentDom.querySelector('#poolName');
					selectObj.appendTo = parentDom.querySelector('#poolName').querySelector('#selectWrap');
					//渲染模糊查询下拉
					ss.blurrySel({
						selectObj
					});
					var selectLi = parentDom.querySelector('#poolName').querySelector('#selectWrap').querySelectorAll('li')
					if(selectLi && selectLi.length > 0) {
						for(var i = 0; i < selectLi.length; i++) {
							selectLi[i].onclick = function() {
								customerUuid = JSON.parse(this.getAttribute('curdata')).customerUuid
								singleBagCode = JSON.parse(this.getAttribute('curdata')).singleBagCode
								excludeBagId = JSON.parse(this.getAttribute('curdata')).singleBagCode
								var params = {
									customerUuid: customerUuid,
									excludeBagId: excludeBagId,
									bagType: 1
								}
								var params1 = {
									singleBagCode: singleBagCode,
									bagType: 1
								}
								//获取套餐列表
								getPackage(params, 1)
								//获取当前套餐
								getPackage(params1, 2,self)
							}
						}
					}
				},
				//complete
				function() {},
				//beforeSend
				function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				}
			);
		}
		getCustomer(defaultUuid, defaultName)

		var params = {
			customerUuid: customerUuid,
			excludeBagId: excludeBagId,
			bagType: 1
		}
		//请求获取套餐
		function getPackage(params, type,self) {
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TPoolPlatform/getAvailableBagListForEdit.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(datajson) {
					
					if(self){
						if(type == 2 && datajson.data && datajson.data[0]) {
//							parentDom.querySelector('#curBag').innerHTML = datajson.data[0].bagCustomerName;
							parentDom.querySelector('#curBag').innerHTML = self.scope.checkObj[self.pageData.page][0].packageName
							return;
						}
					}else{
						if(type == 2 && datajson.data && datajson.data[0]) {
							parentDom.querySelector('#curBag').innerHTML = datajson.data[0].bagCustomerName;
							return;
						}
					}
					var data = datajson.data || [];
					bagData = data;
					var selectData = [];
					for(var i = 0; i < data.length; i++) {
						var obj = {};
						obj.code = data[i].uuid;
						obj.name = data[i].bagCustomerName;
						obj.curdata = data[i];
						selectData.push(obj);
					}
					var selectObj = {};
					selectObj.name = '套餐名称';
					selectObj.txt = 'packageId';
					selectObj.data = selectData;
					selectObj.parentDom = parentDom;
					selectObj.appendTo = parentDom.querySelector('#packageName').querySelector('#selectWrap');
					//渲染模糊查询下拉
					ss.blurrySel({
						selectObj
					});

					var selectLi = parentDom.querySelector('#packageName').querySelector('#selectWrap').querySelectorAll('li')
					if(selectLi && selectLi.length > 0) {
						for(var i = 0; i < selectLi.length; i++) {
							selectLi[i].onclick = function() {
								var curdata = JSON.parse(this.getAttribute('curdata'));
								parentDom.querySelector('#perLimit').innerHTML = curdata.flowLimit;
								parentDom.querySelector('#buyNum').innerHTML = curdata.monthnum;
								parentDom.querySelector('#price').innerHTML = curdata.salePrice;
							}
						}
					}
				},
				error: function(xhr, type) {
					alert("错误")
				}
			});
		}
		getPackage(params, 1);
		//确定按钮
		parentDom.querySelector('#xufeiSave').onclick = function() {
			var renewType = radioVal('renewType');
			var uuid = parentDom.querySelector('#poolName').querySelector("._show").getAttribute('code') || ''
			var singleBagCode = parentDom.querySelector('#packageName').querySelector("._show").getAttribute('code') || ''
			var params = {
				renewType,
				uuid,
				singleBagCode
			}
			for(var i in params) {
				if(params[i] == '' || params[i] == []) {
					layer.msg('请将必填数据填完');
					return 0;
				}
			}

			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TPoolPlatform/editPoolPlatformBag.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						//表格重载
						self.scope.checkObj[self.pageData.page] = []
						instance.lg_reloadFn()
						parentDom.querySelector('#curBag').innerHTML = '';
						$('input[type=radio][name="renewType"]:first').prop("checked", true);
						layer.msg('修改套餐成功')
						parentDom.querySelector(".close").click();
					} else {
						layer.msg(data.errorMsg)
						parentDom.querySelector(".close").click();
					}
				},
				error: function(xhr, type) {
					alert("错误")
				}
			});
		}

	}
	//订购套餐
	function continues(self) {
		var model = {
			id: 'myModalxufei'
		};
		popupAll(model);
		var parentDom = document.querySelector('#myModalxufei');
		//清空数据
		var uuidWrap = parentDom.querySelector('uuidWrap') //共享池名称
		if(uuidWrap) {
			var parentD = uuidWrap.parentNode
			parentD.removeChild(uuidWrap)
		}
		var packageIdWrap = parentDom.querySelector('packageIdWrap') //套餐名称
		if(packageIdWrap) {
			var parentD = packageIdWrap.parentNode
			parentD.removeChild(packageIdWrap)
		}
		var defaultUuid = '';
		var defaultName = '';
		var customerUuid = '';
		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page].length > 0) {
			chooseData = self.scope.checkObj[self.pageData.page]
			defaultUuid = chooseData[0].uuid;
			defaultName = chooseData[0].pfPoolName;
			customerUuid = chooseData[0].customerUuid
		}

		//获取共享池名称数据
		function getCustomer(defaultUuid, defaultName) {
//			$.ajax({
//				type:"post",
//				url:commonUrl + '/admin/TPoolPlatform/getAvailablePoolPlatform.action',
//				data: JSON.stringify({}),
//				beforeSend: function(request) {
//					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//				},
//				dataType: 'json',
//				success: function(datajson) {
//				   debugger
//				},
//				error: function(xhr, type) {
//					debugger
//					alert("错误")
//				}
//			});
			
			var fqObj = {
				url: commonUrl + '/admin/TPoolPlatform/getAvailablePoolPlatform.action',
				type: 'post',
				data: JSON.stringify({})
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
						obj.curdata = data[i];
						selectData.push(obj);
					}
					var selectObj = {};
					selectObj.name = '共享池名称';
					selectObj.txt = 'uuid';
					selectObj.data = selectData;
					if(defaultUuid && defaultName) {
						selectObj.defaultVal = defaultUuid;
						selectObj.defaultName = defaultName;
					}
					selectObj.parentDom = parentDom.querySelector('#poolName');
					selectObj.appendTo = parentDom.querySelector('#poolName').querySelector('#selectWrap');
					//渲染模糊查询下拉
					ss.blurrySel({
						selectObj
					});
					var selectLi = parentDom.querySelector('#poolName').querySelector('#selectWrap').querySelectorAll('li')
					if(selectLi && selectLi.length > 0) {
						for(var i = 0; i < selectLi.length; i++) {
							selectLi[i].onclick = function() {
								customerUuid = JSON.parse(this.getAttribute('curdata')).customerUuid
								var params = {
									customerUuid: customerUuid,
									bagType: radioVal('bagType') || ''
								}
								getPackage(params)
							}
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
		getCustomer(defaultUuid, defaultName)

		$('input[type=radio][name=bagType]').change(function() {
			var params = {
				customerUuid: customerUuid,
				bagType: this.value
			}
			getPackage(params)
			var defaultUuid = parentDom.querySelector('#poolName').querySelector("._show").getAttribute('code');
			var defaultName = parentDom.querySelector('#poolName').querySelector("._show").innerHTML;
			getCustomer(defaultUuid, defaultName);
		});
		$('input[type=radio][name=effectType]').change(function() {
			var defaultUuid = parentDom.querySelector('#poolName').querySelector("._show").getAttribute('code');
			var defaultName = parentDom.querySelector('#poolName').querySelector("._show").innerHTML;
			getCustomer(defaultUuid, defaultName);
		})
		$('input[type=radio][name=renewType]').change(function() {
			var defaultUuid = parentDom.querySelector('#poolName').querySelector("._show").getAttribute('code');
			var defaultName = parentDom.querySelector('#poolName').querySelector("._show").innerHTML;
			getCustomer(defaultUuid, defaultName);
		})

		var params = {
			customerUuid: customerUuid,
			bagType: radioVal('bagType') || ''
		}
		//请求获取套餐
		function getPackage(params) {
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TPoolPlatform/getAvailableBagList.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(datajson) {
					var data = datajson.data || [];
					bagData = data;
					var selectData = [];
					for(var i = 0; i < data.length; i++) {
						var obj = {};
						obj.code = data[i].uuid;
						obj.name = data[i].bagCustomerName;
						obj.curdata = data[i];
						selectData.push(obj);
					}
					var selectObj = {};
					selectObj.name = '套餐名称';
					selectObj.txt = 'packageId';
					selectObj.data = selectData;
					selectObj.parentDom = parentDom;
					selectObj.appendTo = parentDom.querySelector('#packageName').querySelector('#selectWrap');
					//渲染模糊查询下拉
					ss.blurrySel({
						selectObj
					});

					var selectLi = parentDom.querySelector('#packageName').querySelector('#selectWrap').querySelectorAll('li')
					if(selectLi && selectLi.length > 0) {
						for(var i = 0; i < selectLi.length; i++) {
							selectLi[i].onclick = function() {
								var curdata = JSON.parse(this.getAttribute('curdata'));
								parentDom.querySelector('#perLimit').innerHTML = curdata.flowLimit;
								parentDom.querySelector('#buyNum').innerHTML = curdata.monthnum;
								parentDom.querySelector('#price').innerHTML = curdata.salePrice;
							}
						}
					}
				},
				error: function(xhr, type) {
					alert("错误")
				}
			});
		}
		getPackage(params);
		//确定按钮
		parentDom.querySelector('#xufeiSave').onclick = function() {
			var effectType = radioVal('effectType');
			var renewType = radioVal('renewType');
			var bagType = radioVal('bagType');
			var uuid = parentDom.querySelector('#poolName').querySelector("._show").getAttribute('code') || ''
			var singleBagCode = parentDom.querySelector('#packageName').querySelector("._show").getAttribute('code') || ''
			var params = {
				effectType,
				renewType,
				bagType,
				uuid,
				singleBagCode
			}
			for(var i in params) {
				if(params[i] == '' || params[i] == []) {
					layer.msg('请将必填数据填完');
					return 0;
				}
			}

			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TPoolPlatform/packageOrder.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						//表格重载
						self.scope.checkObj[self.pageData.page] = []
						instance.lg_reloadFn()
						$('input[type=radio][name="effectType"]:first').prop("checked", true);
						$('input[type=radio][name="bagType"]:first').prop("checked", true);
						$('input[type=radio][name="renewType"]:first').prop("checked", true);
						layer.msg('订购套餐成功')
						parentDom.querySelector(".close").click();
					} else {
						layer.msg(data.errorMsg)
						parentDom.querySelector(".close").click();
					}
				},
				error: function(xhr, type) {
					alert("错误")
				}
			});
		}
	}
	//获取radio选中值
	function radioVal(name) {
		var radio = document.getElementsByName(name);
		var selectvalue = null; //  selectvalue为radio中选中的值
		for(var i = 0; i < radio.length; i++) {
			if(radio[i].checked == true) {
				selectvalue = radio[i].value;
				break;
			}
		}
		return selectvalue
	}
	//	tap切换
	$("#shareList .unicom").click(function() {
		$('#mobile').removeClass('active');
		$('#unicom').addClass('active');
		queryData = {
			isp: 2
		};
		instance.sourceObj.dataOption.data = JSON.stringify(queryData)
		instance.sourceObj.searchBtn.add.items.supplierId.data.data = queryData;
		instance.sourceObj.searchBtn.add.items.opPoolUuid.data.data = queryData;
		instance.sourceObj.searchBtn.add.items.isp.value = 2;
		instance.sourceObj.searchOption[1].data.data = queryData;
		instance.sourceObj.searchOption[2].data.data = queryData;
		instance.sourceObj.searchOption[3].data.data = queryData;
		instance.rd_searchFn()
		instance.lg_reloadFn();
	})
	//	tap切换
	$("#shareList .mobile").click(function() {
		$('#unicom').removeClass('active');
		$('#mobile').addClass('active');
		queryData = {
			isp: 2
		};
		instance.sourceObj.dataOption.data = JSON.stringify(queryData)
		instance.sourceObj.searchBtn.add.items.supplierId.data.data = queryData;
		instance.sourceObj.searchBtn.add.items.opPoolUuid.data.data = queryData;
		instance.sourceObj.searchBtn.add.items.isp.value = 2;
		instance.sourceObj.searchOption[1].data.data = queryData;
		instance.sourceObj.searchOption[2].data.data = queryData;
		instance.sourceObj.searchOption[3].data.data = queryData;
		instance.rd_searchFn()
		instance.lg_reloadFn();
	})
})