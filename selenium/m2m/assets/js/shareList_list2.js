﻿﻿
ss.imports(['dataTable'], function(exports) {
	var pfPoolUuid = localStorage.getItem('pfPoolUuid') || '';
	var opPoolName = localStorage.getItem('pfPoolName') || '';
	document.querySelector('#parentPoolName').innerHTML = opPoolName || ''
	var queryData = {
		pfPoolUuid
	}
	var mySelf = ""; //当前所有数据
	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#shareListList2')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TPoolIccid/platform/queryByPageInfo.action', //请求Url
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
				name: '请选择所属池',
				txt: 'poolUuid',
				code: 0,
				type: 'blurrySel',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TPoolIccid/platform/queryPool.action',
					dataType: 'json',
					data: {
						pageSize: 1000000,
						pfPoolUuid: pfPoolUuid
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
//				dpWPer: '120%', 
				dpWith: {
					'iccid': 9,
					'msisdn': 7,
					'poolName': 5,
					'simStatus': 4,
					'activateTime': 8,
					'stopTime': 8,
					'flowLimit': 6,
					'usedFlow': 6,
				},
				closeInterlace: true,
				isChangeTime: ['activateTime'
				],
				showTitle: ['iccid', 'msisdn', 'poolName', 'simStatus', 'activateTime',
					'stopTime', 'flowLimit', 'usedFlow'
				],
				sort: {
					'iccid': true,
				},
				shim: {
					'simStatus': {
						"1": '可激活',
						"2": '已激活',
						"3": "停用",
						"4": '失效'
					},
					'chLimitType': {
						'0': '无限量',
						'1': '降速',
						'2': '停卡',
						'3': '计费使用',
					},
				},
				cbFn: function(curData) {
					document.querySelector('#detailsCard').onclick = function() {
						$('#detailsSet').removeClass('active')
						$(this).addClass('active')
						$('.detailsCard').css('display', 'flex')
						$('.detailsSet').css('display', 'none')
					}
					document.querySelector('#detailsSet').onclick = function() {
						$('#detailsCard').removeClass('active')
						$(this).addClass('active')
						$('.detailsSet').css('display', 'inherit')
						$('.detailsCard').css('display', 'none')
					}
					
					//详情弹窗
					for(var i = 0; i < document.querySelector(".tbCWrap").querySelectorAll("[name='iccid']").length; i++) {
						document.querySelector(".tbCWrap").querySelectorAll("[name='iccid']")[i].setAttribute('index', i);
						document.querySelector(".tbCWrap").querySelectorAll("[name='iccid']")[i].style.cursor = "pointer";
						document.querySelector(".tbCWrap").querySelectorAll("[name='iccid']")[i].style.color = "#009900";
						document.querySelector(".tbCWrap").querySelectorAll("[name='iccid']")[i].style.textDecoration = "underline";
						document.querySelector(".tbCWrap").querySelectorAll("[name='iccid']")[i].onclick = function() {
							var $this = this; //绑定当前this
							var model = {
								id: "myModaldetails" //传入弹窗的ID
							};
							popupAll(model);
							var curIndex = $this.getAttribute('index')
							var iccId = curData.tableData.data[Number(curIndex)].iccid;
							$('#detailsSet').removeClass('active')
							$('#detailsCard').removeClass('active')
							$('#detailsCard').addClass('active')
							$('.detailsCard').css('display', 'flex')
							$('.detailsSet').css('display', 'none')
							//上个详情
							document.querySelector('#lastItem').onclick = function() {
								if(curIndex == '0') {
									layer.msg('已是当前页的第一个');
									return;
								}
								var lastIndex = Number(curIndex) - 1;
								curIndex = lastIndex
								var lastIccId = curData.tableData.data[Number(lastIndex)].iccid;
								cardDetails(lastIccId);
								bagDetails(lastIccId);
							}
							//下个详情
							document.querySelector('#nextItem').onclick = function() {
								if(curIndex == curData.tableData.data.length - 1) {
									layer.msg('已是当前页的最后一个');
									return;
								}
								var nextIndex = Number(curIndex) + 1;
								curIndex = nextIndex
								var nextIccId = curData.tableData.data[Number(nextIndex)].iccid;
								cardDetails(nextIccId);
								bagDetails(nextIccId);
							}
							//卡片详情
							function cardDetails(iccId) {
								$.ajax({
									type: 'POST',
									url: commonUrl + '/admin/TCardStore/pool/queryByPageInfo.action',
									data: JSON.stringify({
										minIccid: iccId,
										maxIccid: iccId
									}),
									beforeSend: function(request) {
										request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
									},
									dataType: 'json',
									success: function(datajson) {
										var data = datajson.data.data[0];
										var dataList = [
											"iccid", //ICCID
											"operator", //运营商
											"createTime", //发卡时间
											"stopTime", //到期时间
											"imsi", //IMSI
											"cardType", //卡片类型
											"msisdn", //MSISDN
											"customerName", //客户
											"activateTime", //激活时间
											"simStatus", //卡片状态
											"shareType", //共享类型
											"imei", //IMEI
											"overageLimit",
											'smsMonthResidual',
											'smsMonthUsed',
											'isCertification',
											'remark',
											'flowMonthResidual',
											'flowMonthUsed',
											'cardSize'
										]
										for(var i = 0; i < dataList.length; i++) {
											if(data) {
												if(dataList[i] == 'createTime' || dataList[i] == 'activateTime' || dataList[i] == 'stopTime') {
													data[dataList[i]] = data[dataList[i]] ? ss.dpDate.normal(data[dataList[i]]) : '-'
												} else if(dataList[i] == 'simStatus') {
													var simStatus = {
														1: '可激活',
														2: '已激活',
														3: "停用",
														4: "失效",
													};
													data[dataList[i]] = simStatus[data[dataList[i]]]
												} else if(dataList[i] == 'cardType') {
													var cardType = {
														1: 'S',
														2: 'X'
													};
													data[dataList[i]] = cardType[data[dataList[i]]]
												} else if(dataList[i] == 'overageLimit') {
													var overageLimit = {
														1: '是',
														2: '否',
													};
													data[dataList[i]] = overageLimit[data[dataList[i]]]
												} else if(dataList[i] == 'overageLimit') {
													var isCertification = {
														0: '无需实名',
														1: '已实名',
														2: '未实名',
													};
													data[dataList[i]] = isCertification[data[dataList[i]]]
												} else if(dataList[i] == 'cardSize') {
													var cardSize = {
														1: '标准大卡',
														2: '二切卡',
														3: '三切卡',
														4: '5.0*6.0mm',
													};
													data[dataList[i]] = cardSize[data[dataList[i]]]
												} else if(dataList[i] == 'operator') {
													var operator = {
														1: '移动',
														2: '联通',
														3: '电信',
													};
													data[dataList[i]] = operator[data[dataList[i]]]
												} else if(dataList[i] == 'isCertification') {
													var isCertification = {
														1: '已实名',
														2: '未实名',
													};
													data[dataList[i]] = isCertification[data[dataList[i]]]
												} else if(dataList[i] == 'shareType') {
													var shareType = {
														2: '共享卡',
														1: '独享卡',
													};
													data[dataList[i]] = shareType[data[dataList[i]]]
												}
												document.querySelector("#myModaldetails").querySelector('[name="' + dataList[i] + '"]').innerHTML = (data[dataList[i]] == null ? "-" : data[dataList[i]]);
											} else {
												document.querySelector("#myModaldetails").querySelector('[name="' + dataList[i] + '"]').innerHTML = '-'
											}

										}

									},
									error: function(xhr, type) {
										alert("错误")
									}
								});
							}
							cardDetails(iccId)

							//套餐详情
							function bagDetails(iccId) {
								$.ajax({
									type: 'POST',
									url: commonUrl + '/admin/TCardStore/pool/getPkgByIccid.action',
									data: JSON.stringify({
										iccid: iccId,
									}),
									beforeSend: function(request) {
										request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
									},
									dataType: 'json',
									success: function(datajson) {
										if(datajson.result == 'success') {
											var detailsData = datajson.data.data;
											var detailsSetWrap = document.getElementById('detailsSetWrap')
											var tableWrap = document.getElementById('tableWrap')
											if(tableWrap) {
												tableWrap.parentNode.removeChild(tableWrap)
											}
											//文字
											ss.crtDom('div', 'tableWrap', '', detailsSetWrap, {
													an: ['id'],
													av: ['tableWrap']
												})
												.appendDom(function(dom) {
													ss.crtDom('table', '', '', dom, {
															cn: ['width'],
															cv: ['100%'],
															an: ['border'],
															av: ['1']
														})
														.appendDom(function(dom) {
															ss.crtDom('tr', '', '', dom, {})
																.appendDom(function(dom) {
																	ss.crtDom('td', '', '序号', dom, {
																		cn: ['width'],
																		cv: ['6%']
																	})
																	ss.crtDom('td', '', '套餐名称', dom, {
																		cn: ['width'],
																		cv: ['15%']
																	})
																	ss.crtDom('td', '', '有效期', dom, {
																		cn: ['width'],
																		cv: ['7%']
																	})
																	ss.crtDom('td', '', '订购时间', dom, {
																		cn: ['width'],
																		cv: ['15%']
																	})
																	ss.crtDom('td', '', '生效时间', dom, {
																		cn: ['width'],
																		cv: ['15%']
																	})
																	ss.crtDom('td', '', '到期时间', dom, {
																		cn: ['width'],
																		cv: ['15%']
																	})
																	ss.crtDom('td', '', '套餐总量', dom, {
																		cn: ['width'],
																		cv: ['10%']
																	})
																	ss.crtDom('td', '', '已用量', dom, {
																		cn: ['width'],
																		cv: ['7%']
																	})
																	ss.crtDom('td', '', '生效状态', dom, {
																		cn: ['width'],
																		cv: ['10%']
																	})
																})
															if(detailsData && detailsData.length > 0) {
																for(var i = 0; i < detailsData.length; i++) {
																	var effectType = {
																		0: '失效',
																		1: '生效中',
																		2: '未生效',
																	};
																	ss.crtDom('tr', '', '', dom, {})
																		.appendDom(function(dom) {
																			ss.crtDom('td', '', i + 1, dom, {})
																			ss.crtDom('td', '', detailsData[i].bagName ? detailsData[i].bagName : '-', dom, {})
																			ss.crtDom('td', '', detailsData[i].orderMonth ? detailsData[i].orderMonth : '-', dom, {})
																			ss.crtDom('td', '', detailsData[i].createTime ? ss.dpDate.normal(detailsData[i].createTime) : '-', dom, {})
																			ss.crtDom('td', '', detailsData[i].startDate ? ss.dpDate.normal(detailsData[i].startDate) : '-', dom, {})
																			ss.crtDom('td', '', detailsData[i].endTime ? ss.dpDate.normal(detailsData[i].endTime) : '-', dom, {})
																			ss.crtDom('td', '', detailsData[i].flowLimit == 0 ? '无限量' : detailsData[i].flowLimit ? detailsData[i].flowLimit.toString() : '-', dom, {})
																			ss.crtDom('td', '', detailsData[i].flowUsed ? detailsData[i].flowUsed : '-', dom, {})
																			ss.crtDom('td', '', (detailsData[i].statu == 0 || detailsData[i].statu) ? effectType[detailsData[i].statu] : '-', dom, {})
																		})
																}
															} else {
																ss.crtDom('tr', '', '', dom, {

																	})
																	.appendDom(function(dom) {
																		ss.crtDom('td', '', '无数据', dom, {
																			an: ['colspan'],
																			av: ['9']
																		})
																	})
															}
														})
												})

										} else {
											layer.msg(datajson.errorMsg)
										}
									},
									error: function(xhr, type) {
										alert("错误")
									}
								});
							}
							bagDetails(iccId)

						}
					}
				}
			},
			tlName: ['ICCID', 'MSISDN', '所属共享池', '卡片状态', '激活时间',
				'到期时间', '本月可用量', '本月已用量','限制用量','超量策略'
			], //表头名字
			tlTxt: ['iccid', 'msisdn', 'poolName', 'simStatus', 'activateTime',
				'stopTime', 'flowLimit', 'usedFlow','chFlowMax','chLimitType'
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
		
		//重置弹窗
		resetView({
			ctx:'#cardAllocation',
			txt:['#iccidBegin','#iccidEnd','#xufeiFile'],
			inner:['#num', '#sim']
		})
		
		var model = {
			id: 'cardAllocation'
		};
		popupAll(model);
		var parentDom = document.querySelector('#cardAllocation')
		//清空数据
		var uuidWrap = parentDom.querySelector('uuidWrap')//共享池名称
		if(uuidWrap){
			var parentD = uuidWrap.parentNode
			parentD.removeChild(uuidWrap)
		}
		parentDom.querySelector('#iccidBegin').value = '';
		parentDom.querySelector('#iccidEnd').value = '';
		parentDom.querySelector('#num').innerHTML = '';
		
		//获取共享池名称数据
		function getCustomer() {
			var fqObj = {
				url: commonUrl + '/admin/TPoolIccid/platform/queryChPoolByPf.action',
				type: 'post',
				data: JSON.stringify({pfPoolUuid})
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
						obj.name = data[i].chPoolName;
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
		getCustomer()
		//是否显示选择文件
		var iccidList = [];
		var chooseData = []
		parentDom.querySelector('#xfFile').style.display = 'block'
		parentDom.querySelector('#iccidWrap').style.display = 'block'

		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page] && self.scope.checkObj[self.pageData.page].length> 0) {
			parentDom.querySelector('#xfFile').style.display = 'none'
			parentDom.querySelector('#iccidWrap').style.display = 'none'
			chooseData = self.scope.checkObj[self.pageData.page]
			parentDom.querySelector('#num').innerHTML = chooseData.length
			for(var i = 0; i < chooseData.length; i++) {
				iccidList.push(chooseData[i].iccid)
			}
		}else{
			parentDom.querySelector('#xfFile').style.display = 'block'
			parentDom.querySelector('#iccidWrap').style.display = 'block'
			chooseData = self.scope.checkObj[self.pageData.page]
			parentDom.querySelector('#num').innerHTML = '' 
			iccidList = []
		}
		

		parentDom.querySelector('#sim').innerHTML = iccidList.toString();
		//通过iccid查询
		function getIccids(params) {
			var fqObj = {
				url: commonUrl + '/admin/TPoolIccid/platform/distributeQueryByIccid.action',
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
					parentDom.querySelector('#sim').innerHTML = iccidList.toString();
					parentDom.querySelector('#num').innerHTML = data.length
					//通过iccid查询SIM卡后不允许再上传SIM
					if(iccidList.length > 0) {
						document.querySelector('#cardAllocation').querySelector('#xfFile').style.display = 'none';
						document.querySelector('#cardAllocation').querySelector('#xufeiText').onclick = function() {
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
			params.pfPoolUuid = pfPoolUuid;
			if(maxIccid == '' && value == ''){
				parentDom.querySelector('#xfFile').style.display = 'block';
				parentDom.querySelector('#sim').innerHTML = '';
				parentDom.querySelector('#num').innerHTML = '';
			}else if(maxIccid != '' && value != ''){
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
			params.pfPoolUuid = pfPoolUuid;
			if(minIccid == '' && value == ''){
				parentDom.querySelector('#xfFile').style.display = 'block';
				parentDom.querySelector('#sim').innerHTML = '';
				parentDom.querySelector('#num').innerHTML = '';
			}else if(minIccid != '' && value != ''){
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
				pfPoolUuid: pfPoolUuid,
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
				url: commonUrl + '/admin/TPoolIccid/platform/cardDistribute.action',
				type: 'post',
				data: JSON.stringify(params)
			}
			self.ajax(
				fqObj,
				//success
				function(data) {
					if(data.result == 'success'){
						self.lg_reloadFn(); //表格重载
						layer.msg('保存成功！'); //提示
						parentDom.querySelector('#sim').value = '';
						parentDom.querySelector(".close").click();
					}else{
						layer.msg(data.errorMsg ||'保存失败！'); //提示
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
		//重置弹窗
		resetView({
			ctx:'#cardLimit',
			txt:['#singleFlowMax','#limitType','#xufeiFile'],
			inner:['#num', '#sim']
		})
		
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
		parentDom.querySelector('#sim').innerHTML = iccidList.toString();

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
				chFlowMax : parentDom.querySelector('#singleFlowMax').value,
				chLimitType: parentDom.querySelector('#limitType').value,
				iccidList: iccidList,
				pfPoolUuid:pfPoolUuid
			}
			for(var i in params) {
				if(params[i] == '' || params[i] == [] || !params[i]) {
					layer.msg('请将必填数据填完');
					return 0;
				}
			}
			var fqObj = {
				url: commonUrl + '/admin/TPoolIccid/platform/cardLimit.action',
				type: 'post',
				data: JSON.stringify(params)
			}
			self.ajax(
				fqObj,
				//success
				function(data) {
					if(data.result == 'success'){
						self.lg_reloadFn(); //表格重载
						layer.msg('保存成功！'); //提示
						parentDom.querySelector('#sim').value = '';
						parentDom.querySelector(".close").click();
					}else{
						layer.msg(data.errorMsg ||'保存失败！'); //提示
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
	//跳转卡片列表列表
	document.querySelector('#mobile').onclick = function(){
		location.hash = 'shareList_list1'
	}
	//	tap切换
	$("#shareListList2 .back").click(function() {
		location.hash = 'shareList'
	})
	//点击搜索是清空sim
	document.getElementsByName("搜索")[0].onclick = function() {
		mySelf.scope.checkObj[mySelf.pageData.page] = [];
	}
})