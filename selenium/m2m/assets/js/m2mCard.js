﻿﻿﻿
ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon_mc')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TCardStore/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify({}),
			pageSize: 50, //没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '客户',
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
				name: 'ICCID或MSISDN',
				txt: 'iccidOrMsisdn',
				type: 'txt',
				width: '200px'
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
			}
		], //搜索栏额外按钮
		searchBtn: {
			//			import: {
			//				name: '导入',
			//				colType: 'opt2',
			//				cbFn: function(self) {
			//					cliFn_new(self);
			//				}
			//			},
			searchAdv: {
				name: '高级搜索',
				colType: 'opt2',
				cbFn: function(self) {
					specialSearch(self, commonUrl);
				}
			},
			reflesh3: {
				name: '入库',
				colType: 'opt1',
				cbFn: function(self) {
					importFn(self);
				}
			},
			export: {
				name: '导出',
				colType: 'opt1',
				cbFn: function(self) {
					exportFn(self);
				}
			},
			reflesh1: {
				name: '划拨',
				colType: 'opt2',
				cbFn: function(self) {
					pointerFn(self);
				}
			},
			reflesh2: {
				name: '订购套餐',
				colType: 'opt2',
				cbFn: function(self) {
					continues(self);
				}
			},
//			mainBag: {
//				name: '主套餐变更',
//				cbFn: function(self) {
//					mainBagFn(self)
//				}
//			},
			stateChange: {
				name: '状态变更',
				colType: 'opt2',
				cbFn: function(self) {
					stateFn(self, commonUrl)
				}
			},
			openMSM: {
				name: '开通短信',
				colType: 'opt2',
				cbFn: function(self) {
					openMSMFn(self, commonUrl)
				}
			},
			remarkChange: {
				name: '修改备注',
				colType: 'opt2',
				cbFn: function(self) {
					remarkFn(self, commonUrl)
				}
			},
			remark: {
				name: '刷新网络',
				colType: 'opt2',
				cbFn: function(self) {
					cancelLtFn(self, commonUrl)
				}
			},
			resetBag: {
				name: '套餐重置',
				colType: 'opt2',
				cbFn: function(self) {
					resetBagFn(self, commonUrl)
				}
			},
			reflesh: {
				name: '刷新',
				colType: 'opt2',
				cbFn: function(curData, self) {
					refleshFn(curData, self);
				}
			},
		},
		//表格内容
		table: {
			//各选项
			options: {
				isCheckbox: true,
				dpWPer: '1800px',
				dpWith: {
					'iccid':5, 
					'msisdn':5, 
					'customerName':5, 
					'currentActiveBag':5,
					'stopTime':3, 
					'imei':4,
					'imeiBind':3, 
					'simStatus':3,
					'flowMonthUsed':3, 
					'flowMonthResidual':3, 
					'remark':5
				},
				closeInterlace: true,
				isChangeTime: ['createTime', 'activateTime',
					'stopTime',
					'insertTime'
				],
				toDate: true,
				showTitle: [
					'iccid', 
					'msisdn', 
					'customerName', 
					'currentActiveBag',
					'stopTime', 
					'imei',
					'imeiBind', 
					'simStatus',
					'flowMonthUsed', 
					'flowMonthResidual', 
					'remark'
				],
				sort: {
					'iccid': true,
					'imsi': true,
					'msisdn': true,
					'stopTime': true,
					'flowMonthUsed': true,
					'flowMonthResidual': true,
//					'createTime': true,
//					'activateTime': true,
//					'packageEndTime': true,
//					'smsTotalCount': true,
//					'smsUsedCount': true
				},
				shim: {
					'cardType': {
						'1': 'S',
						'2': 'X',
						'3': 'W'
					},
					'simStatus': {
						"1": '可激活',
						"2": '已激活',
						"3": "停用",
						"4": "失效",
						"5": "库存"
					},
					'activationType': {
						'1': '手动激活',
						'2': '自动激活'
					},
					'operator': {
						1: '移动',
						2: '联通',
						3: '电信'
					},
					'online': {
						0: '离线',
						1: '在线'
					},
					'shareType': {
						2: '共享卡',
						1: '独享卡',
					},
					'smsStatus': {
						1: '关闭',
						2: '开通'
					},
					'settlementType':{
						1:'月结日结算',
						2:'激活日结算'
					},
					'imeiBind':{
						1:'绑定IMEI池',
						2:'不绑定IMEI',
						3:'绑定单IMEI'
					},
					'payType': {
						1: '预付费',
						2: '后付费'
					}
					
				}, 
				cbFn: function(curData) {
					jdFn()
					//单IMEI码编辑
					var curUls = curData.domWrap.tbCWrap.querySelectorAll('ul');
//					for(var i = 0; i < curUls.length; i++) {
//						ss.mdfCss(curUls[i], ['position', 'relative']);
//						//单IMEI码编辑
//						var curPriceDom = curUls[i].querySelector('[name="imeiBindCode"]');
//						//IMEI绑定的类型
//						var imeiBindDom = curUls[i].querySelector('[name="imeiBind"]');
//						console.log(curUls[i])
//						if(imeiBindDom.getAttribute('title')==3) {
//							curPriceDom.style.position = "relative"
//							ss.mdfCss(curPriceDom, ['position', 'relative']);
//							modefyPrice(curPriceDom, i, 'salePrice', 1, curData);
//						}
//
//					}
					 
					
					//刷新页面
					var iccidsArr = [];
					var allData = curData.tableData.data || [];
					for(var i = 0; i < allData.length; i++) {
						iccidsArr.push(allData[i].iccid)
					}

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
									url: commonUrl + '/admin/TCardStore/queryByPageInfo.action',
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
											"sourceType", //卡片类型
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
											'cardSize',
											'settlementType',  //结算类型
											'activationType', //激活类型
											'payType',  //支付方式
											'costPlan',
											'phone'
										]
										
										iccidMap = data["iccid"];
										for(var i = 0; i < dataList.length; i++) {
//											
//											if(i==0){
//												iccidMap = data["iccid"];
//												
//											}
											if(data) {
												if(dataList[i] == 'createTime' || dataList[i] == 'activateTime' || dataList[i] == 'stopTime') {
													data[dataList[i]] = data[dataList[i]] ? ss.dpDate.normal(data[dataList[i]]) : '-'
												}
												else if(dataList[i] == 'phone'){
													var phoneList = data.phoneList;
													if(phoneList && phoneList.length>0){
														data[dataList[i]] = phoneList.join(',')
														if(phoneList.length>3){
															ss.getDom('#_phone_wrap').style.borderRight = '1px solid #fff';
														}
													}
													else{
														data[dataList[i]] = '-'
													}
												}
												else if(dataList[i] == 'simStatus') {
													var simStatus = {
														1: '可激活',
														2: '已激活',
														3: "停用",
														4: "失效",
														5: "库存"
													};
													data[dataList[i]] = simStatus[data[dataList[i]]]
												}else if(dataList[i] == 'settlementType') {
													var settlementType = {
														1:'月结日结算',
														2:'激活日结算'
													};
													data[dataList[i]] = settlementType[data[dataList[i]]]
												} 
												else if(dataList[i] == 'sourceType') {
													var sourceType = {
														1: 'S',
														2: 'X',
														3: 'W',
//														4: 'MS0',
//														5: 'MS1',
//														6: 'MS2',
													};
													data[dataList[i]] = sourceType[data[dataList[i]]]
												} 
												else if(dataList[i] == 'overageLimit') {
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
												} else if(dataList[i] == 'activationType') {
													var activationType = {
														1: '手动激活',
														2: '自动激活',
													};
													data[dataList[i]] = activationType[data[dataList[i]]]
												} else if(dataList[i] == 'payType') {
													var payType = {
														1: '预付费',
														2: '后付费',
													};
													data[dataList[i]] = payType[data[dataList[i]]]
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
									url: commonUrl + '/admin/TCardStore/getPkgByIccid.action',
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
			tlName: [
			'ICCID', 
			'MSISDN', 
			'客户',
			'套餐',
			'在线状态',
			'到期日期',
			'IMEI',
			'IMEI绑定',
//			'单IMEI绑定码',
			"卡片状态",
			'本月已用流量', 
			'本月可用流量',
			'备注',
			
			
//			'运营商', 
//			'发卡日期', 
//			'激活日期',
//			'IMSI',
			
//			'在线状态', 
//			'激活方式', 
//			'共享类型',
//			"结算类型",
//			'付费方式',
//			'入库日期', 
//			'短信功能', 
//			'短信可用条数', 
//			'短信已用条数', 
			
			], //表头名字 
			
			tlTxt: [
			'iccid', 
			'msisdn', 
			'customerName', 
			'currentActiveBag',
			'online',
			'stopTime', 
			'imei',
			'imeiBind',
//			'imeiBindCode',
			'simStatus', 
			'flowMonthUsed', 
			'flowMonthResidual',
			'remark',
//			'operator', 
//			'createTime', 
//			'activateTime',
//			'imsi', 
			
//			'online', 
//			'activationType', 
//			'shareType',
//			"settlementType",
//			'payType',
//			'insertTime', 
//			'smsStatus', 
//			'smsTotalCount', 
//			'smsUsedCount', 
			
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
	
//	$(".detailsCard .map").click(function(){
//												alert(123)
//											})
	var iccidMap = "";
	$("#map").click(function(){
		window.open('map.html?iccid='+iccidMap)
	})

	function maps(){
		alert(123)
	}
	//编辑单IMEI
	function modefyPrice(curPriceDom, i, field, type, self) {
		var urlObj = {
			1: commonUrl + '/admin/TBagCustomer/editEntity.action',
			2: commonUrl + '/admin/TBagCustomerRetail/editEntity.action'
		}
		//创建输入框
		var curInputDom = ss.crtDom('input','imeiBindCode0'+i, '', curPriceDom, {
			cn: [
				'position', 'height', 'lineHeight', 'border', 'top', 'display', 'left',
				'borderRadius', 'fontSize', 'display','width'
			],
			cv: [
				'absolute', '28px', '26px', '1px solid #ccc', '4px', 'block', '10px',
				'4px', '13px', 'none','90%'
			],
			an: ['type', 'value', '_index'],
			av: ['number', curPriceDom.innerHTML?Number(curPriceDom.innerHTML):'', i]
		});
		//创建按钮
		ss.crtDom('div', '', '编辑', curPriceDom, {
			cn: [
				'position', 'top', 'right', 'height', 'lineHeight',
				'padding', 'backgroundColor', 'transform', 'color',
				'borderRadius', 'cursor', 'border', 'userSelect'
			],
			cv: [
				'absolute', '50%', '15px', '26px', '24px',
				'0px 10px', 'rgb(244, 248, 250)', 'translateY(-50%)', 'rgb(117, 117, 117)',
				'5px', 'pointer', '1px solid rgb(222, 228, 241)', 'none'
			],
			an: ['_index'],
			av: [i]
		}, [
			'click',
			function(dom) {
				var tableData = self.tableData.data;
				var curObj = tableData[dom.getAttribute('_index')];
				var uuid = curObj['uuid'];
				var _className = '.imeiBindCode0'+dom.getAttribute('_index');
				var _code = ss.getDom(_className).value;
				if(dom.getAttribute('issel') == 'true') {

					self.eAjax({
						url: commonUrl + '/admin/TCardStore/editEntity.action',
						type: 'post',
						data: {
							iccid: curObj.iccid,
							imeiBindCode: _code
						},
					}, {
						success: function(data) {
							if(data.result == 'success') {
								self.lg_reloadFn();
								ss.layer.msg('编辑成功!');
							}
						},
						isJson: true
					})

					dom.innerHTML = '编辑';
					dom.setAttribute('issel', 'false');
				} else {
					var _inputDom = dom.parentNode.querySelector(_className);
					ss.mdfCss(_inputDom, ['display', 'block']);
					dom.innerHTML = '确定';
					dom.setAttribute('issel', 'true');
				};
			}
		])
	}
	
	
	
	var paramsAll = {
		iccid: [], //选中的iccid列表
		uuid: "", //供应商uuid

	}
	//导出
	function exportFn(self) {
		console.log(self)
		var loading = layer.load(1, {
		  shade: [0.1,'#fff'] //0.1透明度的白色背景
		});
		//请求地址
		var queryUrl = commonUrl + "/admin/TCardStore/export.action";
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
	//入库
	function importFn(curData) {
		$("#cardType").click(function(){
			return
		})
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
		$("#myModaldaoru #costPlan").html('')
//		var expenHTML = "<option value=''>请选择运营商套餐</option>";
		
//		运营商套餐
		function operatorFn(uuid){
			var parm = {}
			if(uuid){
				parm.suppliersName = uuid;
			}
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TBagSuppliers/queryByPageInfo.action',
				data: JSON.stringify(parm),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(datajson) {				
					if(datajson.result == 'success') {
						var expen = datajson.data.data;
						var expenHTML = "<option value=''>请选择运营商套餐</option>";
						if(expen.length>0){
							for(var i=0; i<expen.length; i++){
								expenHTML+='<option value="'+expen[i].expensesPlan+'">'+expen[i].bagSuppliersName+'</option>'
							}						
						}
					}
					$("#myModaldaoru #expensesPlan").html(expenHTML)
				},
				error: function(xhr, type) {
					alert("错误")
				}
			});
		}
		operatorFn()
		//		获取供应商
		var params = {
			currentPage: 1,
			pageSize: 10000
		}
		var sourceType = {} //变换卡片类型
		$.ajax({
			type: 'POST',
			url: commonUrl + '/admin/TSuppliers/queryByPageInfo.action',
			data: JSON.stringify(params),
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			dataType: 'json',
			success: function(datajson) {
				console.log(datajson)
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
						sourceType[appName[i].uuid] = appName[i].sourceType
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

//		获取卡片类型
		$.ajax({
			type: 'POST',
			url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
			data: JSON.stringify({dickey:"source_type"}),
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			dataType: 'json',
			success: function(datajson) {
				console.log(datajson)
				if(datajson.result == 'success') {
					var appName = datajson.data
					var option = "<option value=''>请选择卡片类型</option>";
					//				清空套餐下拉框
					document.querySelector("#cardType").innerHTML = "";
					if(datajson.result == "error") {
						document.querySelector("#cardType").innerHTML = option;
						return;
					}
					if(datajson.data == []) {
						document.querySelector("#cardType").innerHTML = option;
						return;
					}
					var option = "<option value=''>请选择卡片类型</option>"
					console.log(appName)
			for(var i = 0; i < appName.length; i++) {
				var customerUuid = appName[i].dicvalue
				var customerName = appName[i].dicname
				if(appName[i]) {
					option += "<option value=" + customerUuid + ">" + customerName + "</option>"
				}
			}
			document.querySelector("#cardType").innerHTML = option;
		} else {
			ss.layer.msg(datajson.errorMsg)
		}
			},
			error: function(xhr, type) {
				alert("错误")
			}
		});
		
		
		$("#supplierUuid").change(function(){
			$("#cardType").val(sourceType[$(this).val()]);
			operatorFn($(this).val())
		})
		
		
		
		// 默认选择文件text
		document.getElementById('daoruText').innerHTML = "选择";
		document.getElementById('daoruText').title = "选择";
		document.querySelector("#daoruFile").value = '';

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
			var expensesPlan = document.querySelector("#expensesPlan").value;
			if(!supplierUuid || !businessType || !cardType || !daoruFile || !cardSize || !expensesPlan) {
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
						layer.alert('稍后查看导入日志记录！');
						document.querySelector("#supplierUuid").value = "";
						document.querySelector("#businessType").value = "";
						document.querySelector("#cardType").value = "";
						document.querySelector("#daoruFile").value = "";
						document.querySelector("#expensesPlan").value = "";						
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
			console.log(options)
			$('#daoruForm').ajaxSubmit(options);
			
//			var datajson={};
//			datajson.supplierUuid = document.querySelector("#supplierUuid").value;
//			datajson.businessType = document.querySelector("#businessType").value;
//			datajson.cardType = document.querySelector("#cardType").value;
//			datajson.cardSize = document.querySelector("#cardSize").value;
//			datajson.daoruFile = document.querySelector("#daoruFile").value;
//			datajson.huaboRemark = document.querySelector("#huaboRemark").value;
//			datajson.expensesPlan = document.querySelector("#expensesPlan").value;
			
//			$.ajax({
//				type: 'POST',
//				url: commonUrl + '/admin/TCardStore/import.action',
//				data: JSON.stringify(datajson),
//				beforeSend: function(request) {
//					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//				},
//				dataType: 'json',
//				success: function(datajson) {				
//					if(d.result == 'success') {
//						layer.alert('导入成功！编号为：' + d.data + ',请到系统管理-导入日志记录查询导入情况！');
//						document.querySelector("#supplierUuid").value = "";
//						document.querySelector("#businessType").value = "";
//						document.querySelector("#cardType").value = "";
//						document.querySelector("#daoruFile").value = "";
//						document.querySelector("#expensesPlan").value = "";						
//						document.getElementById('daoruText').innerHTML = "选择";
//						document.getElementById('daoruText').title = "选择";
//						instance.lg_reloadFn();
//						modalBox.close()
//					};
//					if(d.result == 'error') {
//						layer.msg(d.errorMsg || '系统异常！');
//					};
//					ss.c3Loading.hidden();
//				},
//				error: function(xhr, type) {
//					alert("错误")
//				}
//			});
		}
	}


	//划拨->校验
	function judgeImeiFn(){
		//划拨数量>2：隐藏绑定单IMEI项(弹窗打开便校验)
		var huaboNum1Val = ss.getDom('#huaboNum1').innerHTML;
		var imeiBindDom = ss.getDom('#_m2mC_imeiBind_opt3');
		if(huaboNum1Val && Number(huaboNum1Val)>1){
			ss.getDom('#_m2mC_imeiBind').value = '';
			imeiBindDom.style.display = 'none';
			document.querySelector('#hb_imeiBindCode_wrap').style.display = 'none';
		}
		else{
			imeiBindDom.style.display = 'block';
		}
	}

	//	划拨
	function pointerFn(self) {
		var parentDom = document.querySelector("#myModalhuabo");
		//重置弹窗
		resetView({
			ctx:'#myModalhuabo',
			txt:['#mfi_minIccid','#mfi_maxIccid','#smsTotalCount','#huaboRemark1','#huaboFile', '#hb_imeiBindCode'],
			sel:['#huaboActive','#settlementType','#_m2mC_imeiBind','#isCertification','#smsStatus']
		});
		parentDom.querySelector('#hb_imeiBindCode_wrap').style.display = 'none';

		
		//标识：文件|iccid
		var _SIGN = null;
		
		paramsAll.iccid = []; //清空划拨的iccid的列表
		var model = {
			id: "myModalhuabo" //传入弹窗的ID
		};
		popupAll(model);

		//是否显示选择文件
		var iccidList = [];
		var chooseData = []
		parentDom.querySelector('#huaboNum1').innerHTML = ''
		parentDom.querySelector('#hbFile1').style.display = 'block'
		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page].length > 0) {
			//->勾选则隐藏选择文件 | iccid号段
			parentDom.querySelector('#hbFile1').style.display = 'none'//隐藏文件
			parentDom.querySelector('#hbIccid').style.display = 'none'
			
			_SIGN = 0;//勾选划拨
			
			chooseData = self.scope.checkObj[self.pageData.page]
			parentDom.querySelector('#huaboNum1').innerHTML = chooseData.length
			for(var i = 0; i < chooseData.length; i++) {
				iccidList.push(chooseData[i].iccid)
			}
		}
		else {
			//->没勾选则选择文件
			parentDom.querySelector('#hbFile1').style.display = 'block'
			parentDom.querySelector('#hbIccid').style.display = 'block'
		}
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
						iccidList = data['data']
						parentDom.querySelector('#huaboNum1').innerHTML = data['data'].length
						layer.msg('文件选择成功');
						_SIGN = 1;//文件划拨
						judgeImeiFn();//根据导入数量->控制IMEI单的显示
					} else {
						layer.msg(data && data['errorMsg']);
					}
				}
			};
			$('#huaboForm').ajaxSubmit(options);
		}
		
		//iccid号段输入
		var iccidObj = {
			minIccid:'', maxIccid:''
		};
		var domArr = [ss.getDom('#mfi_minIccid'),ss.getDom('#mfi_maxIccid')];
		domArr.forEach(function(itemDom){
			itemDom.oninput=function(){
				_SIGN = 2;//iccid划拨
				parentDom.querySelector('#hbFile1').style.display = 'none'
				if(this.getAttribute('flag')=='min'){
					iccidObj['minIccid'] = this.value
				}
				else{
					iccidObj['maxIccid'] = this.value
				};
			};
			itemDom.onblur = function(){
				var minVal = ss.getDom('#mfi_minIccid').value;
				var maxVal = ss.getDom('#mfi_maxIccid').value;
				
				if(!minVal || !maxVal) return
				
//				if(String(minVal).length!=19 && String(minVal).length!=20){
//					ss.layer.msg('iccid开始端请输入19或20位！')
//					return
//				} 
//				if(String(maxVal).length!=19 && String(maxVal).length!=20){
//					ss.layer.msg('iccid结束端请输入19或20位！')
//					return
//				}
				//满足条件->获取数据
				instance.eAjax({
					url:'/admin/TCardStore/getIccidRange.action',
					data:{
						minIccid:iccidObj.minIccid,
						maxIccid:iccidObj.maxIccid
					},
					type:'post'
				},{
					isJson: true,
					success: function(data){
						iccidList = data['data']
						parentDom.querySelector('#huaboNum1').innerHTML = data['data'].length
						ss.layer.msg('iccid号段获取成功')
					}
				})
				
			}
		});
		
		//获取客户数据 
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
				selectObj.parentDom = parentDom;
				selectObj.appendTo = parentDom.querySelector('#selectWrap');
				//渲染模糊查询下拉
				ss.blurrySel({
					selectObj
				});
			},
			error: function(xhr, type) {
				alert("错误")
			}
		});
		//短信条数
		parentDom.querySelector('#smsTotalCount').onchange = function() {
			if(this.value < 0) {
				layer.msg('短信条数不能输入负数，请重新输入');
				this.value = '';
				return;
			}
		};
		//设备IMEI绑定->值为绑定单IMEI选项则显示：绑定单IMEI码
		var _imeiBind = '';
		parentDom.querySelector('#_m2mC_imeiBind').onchange = function(e){
			//赋值
			_imeiBind = this.value;
			parentDom.querySelector('#hb_imeiBindCode_wrap').style.display = _imeiBind==3?'block':'none';
		};
		
		judgeImeiFn();
		
		//保存点击
		parentDom.querySelector('#huaboSave').onclick = function() {

			var params = {
				customerUuid: parentDom.querySelector("._show").getAttribute('code'), //选择客户
				activationType: parentDom.querySelector("#huaboActive").value, //激活类型
				settlementType: parentDom.querySelector("#settlementType").value, //激活类型
				iccidList: iccidList, //iccid
				imeiBind: Number($("#_m2mC_imeiBind").val()),
				isCertification: Number($("#isCertification").val()),
				payType: Number($("#payType").val()),
				remark: parentDom.querySelector("#huaboRemark1").value,
				smsTotalCount: parentDom.querySelector("#smsTotalCount").value,
				cardUnitPrice: parentDom.querySelector("#cardUnitPrice").value,
				smsStatus: parentDom.querySelector("#smsStatus").value,
			};

			if( _SIGN===1 && params.iccidList.length < 1) {
				layer.msg('请选择划拨卡号');
				return;
			}
			for(var i in params) {
				if(i == 'smsTotalCount' || i == 'smsStatus') {
					continue;
				}
				if(i !== 'remark') {
					if(i == 'isCertification') {
						params[i] = params[i].toString()
					}
					if(params[i] == '' || params[i] == []) {
						layer.msg('请将必填数据填完');
						return 0;
					}
				}
			}
			//新增校验：绑定单IMEI->必须填写绑定码
			var hb_imeiBindCode = parentDom.querySelector("#hb_imeiBindCode").value;
			if(_imeiBind==3 && !hb_imeiBindCode && hb_imeiBindCode!==0){
				layer.msg('请填写单IMEI绑定码');
				return;
			}
			if(_imeiBind==3){
				params.imeiBindCode = hb_imeiBindCode;
			}
			var loading = layer.load(1, {
				shade: [0.1, '#000'] //0.1透明度的白色背景
			});

			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/distribute.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					//最后数据加载完 让 loading层消失
					layer.close(loading);
					if(data.result == 'success') {
						//表格重载
						if(self.scope.checkObj) {
							self.scope.checkObj[self.pageData.page] = []
						}
						instance.lg_reloadFn()
						layer.msg('划拨成功');
						parentDom.querySelector(".close").click();
					} else {
						//划拨失败提示
						var _errMsg = data.errorCode;
						var _msg = data.errorMsg || ( 
							_errMsg ? 
							(
								_errMsg.indexOf(':')>-1 ? 
								_errMsg.split(':')[1]
									:
									(
										_errMsg.indexOf('：')>-1 ? 
										_errMsg.split('：')[1]
											:
										'操作失败'
									)
							)
								:
							data.data
						);
						layer.msg(_msg);
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
		var customId = document.querySelector('.dtsWrap').querySelector(".customerUuid").querySelector('._show').getAttribute('code')
		if(!customId) {
			layer.msg('请先选择客户');
			return;
		}
		/*建立模态框对象*/
		var modalBox = {};
		//		续费总金额
		modalBox.costprice = 0;
		//		获取勾选的卡号数量
		modalBox.ischeck = document.querySelector(".tbCWrap").querySelectorAll("[ischeck='true']");
		//		选中卡号iccid的集合
		modalBox.iccidList = [];
		/*获取模态框*/
		modalBox.modal = document.getElementById("myModalxufei");
		/*获得关闭按钮*/
		modalBox.closeBtn = document.getElementById("xufeiClose");
		modalBox.cancelBtn = document.getElementById("xufeiCancel");
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
			this.cancelBtn.onclick = function() {
				that.close();
			}
			this.outsideClick();
		}
		modalBox.init();
		//是否显示选择文件
		var iccidList = [];
		var chooseData = []
		document.getElementById('xufeiNum1').innerHTML = '0'
		document.getElementById('xfFile').style.display = 'block'
		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page].length > 0) {
			document.getElementById('xfFile').style.display = 'none'
			chooseData = self.scope.checkObj[self.pageData.page]
			document.getElementById('xufeiNum1').innerHTML = chooseData.length
			for(var i = 0; i < chooseData.length; i++) {
				iccidList.push(chooseData[i].iccid)
			}
		}

		//		默认选择text
		document.getElementById('xufeiText').innerHTML = "选择";
		document.getElementById('xufeiText').title = "选择";
		//选择文件
		document.getElementById('xufeiFile').onchange = function() {
			var file = this.files[0]
			//判断所选择文件是否为excel文件类型
			if(/\.xlsx|\.xlsm|\.xls|\.csv/.test(file.name)) {
				document.getElementById('xufeiText').innerHTML = file.name;
				document.getElementById('xufeiText').title = file.name;
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
						document.getElementById('xufeiNum1').innerHTML = data['data'].length
						layer.msg('文件选择成功');
					} else {
						layer.msg(data && data['errorMsg']);
					}
				}
			};
			$('#xufeiForm').ajaxSubmit(options);
		}
		//选择月份
		$.ajax({
			type: 'POST',
			url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
			data: JSON.stringify({
				dickey: 'bag_select_num'
			}),
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			dataType: 'json',
			success: function(datajson) {
				var option = "<option value='0'>请选择数量</option>"
				if(datajson.result == "error") {
					layer.msg(datajson.errorMsg)
					document.querySelector("#xufeiNum").innerHTML = option;
					return;
				}
				if(datajson.data == []) {
					layer.msg('没有数量')
					document.querySelector("#xufeiNum").innerHTML = option;
					return;
				}
				var appName = datajson.data

				for(var i = 0; i < appName.length; i++) {
					var customerUuid = appName[i].dicvalue
					var customerName = appName[i].dicname
					if(appName[i]) {
						option += "<option value=" + customerUuid + ">" + customerUuid + "</option>"
					}
				}
				document.querySelector("#xufeiNum").innerHTML = option;

			},
			error: function(xhr, type) {
				alert("错误")
			}
		});
		//		获取卡片类型
		$.ajax({
			type: 'POST',
			url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
			data: JSON.stringify({dickey:"source_type"}),
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			dataType: 'json',
			success: function(datajson) {
				if(datajson.result == 'success') {
					var appName = datajson.data
					var option = "<option value=''>请选择卡片类型</option>";
					//				清空套餐下拉框
					document.querySelector("#sourceType").innerHTML = "";
					if(datajson.result == "error") {
						document.querySelector("#sourceType").innerHTML = option;
						return;
					}
					if(datajson.data == []) {
						document.querySelector("#sourceType").innerHTML = option;
						return;
					}
					var option = "<option value=''>请选择卡片类型</option>"
					console.log(appName)
					for(var i = 0; i < appName.length; i++) {
						var customerUuid = appName[i].dicvalue
						var customerName = appName[i].dicname
						if(appName[i]) {
							option += "<option value=" + customerUuid + ">" + customerName + "</option>"
						}
					}
					document.querySelector("#sourceType").innerHTML = option;
				} else {
					ss.layer.msg(datajson.errorMsg)
				}
			},
			error: function(xhr, type) {
				alert("错误")
			}
		});
//		卡片类型变化事件
		$("#sourceType").on("change",function(){
			redioAjax()
		})
		
		//		重置弹窗
		document.querySelector("#business1").click();
		document.querySelector("#bagSuppliersType1").click();
		document.querySelector("#contract1").click();

		//获取所有复选框的变化事件
		var redioAll = document.querySelector("#redioAll");
		var redioCheckd = redioAll.querySelectorAll("[type='radio']");
		for(var i = 0; i < redioCheckd.length; i++) {
			redioCheckd[i].onchange = function() {
				//				显示和隐藏包体类型
				if(this.getAttribute("id") == "bagSuppliersType1") {
					redioAll.querySelector("#contract").style.display = "block";

				}
				if(this.getAttribute("id") == "bagSuppliersType2") {
					redioAll.querySelector("#contract").style.display = "none";
				}
				//包体类型切换事件
				if(this.getAttribute('name') == 'flowType') {
					var curFlowType = this.getAttribute('value');
					ss.getDom('#contract').setAttribute('curfolwtype', curFlowType);
					var xufeiNumDom = ss.getDom('#xufeiNum');
					var dgWNDom = ss.getDom('#dg_writeNumWrap');
					curFlowType == 0 ?
						(ss.mdfCss(xufeiNumDom, ['display', 'block']), ss.mdfCss(dgWNDom, ['display', 'none'])) :
						(ss.mdfCss(xufeiNumDom, ['display', 'none']), ss.mdfCss(dgWNDom, ['display', 'block']));
					if(dgWNDom) {
						dgWNDom.value = ''
					}
				}
				redioAjax()
			}
		}
		//		请求获取套餐
		var bagData = [];
		
		function redioAjax(bagUuid, defaultName) {
			var redioData = {}
			for(var i = 0; i < redioCheckd.length; i++) {
				if(redioCheckd[i].checked == true) {
					redioData[redioCheckd[i].name] = redioCheckd[i].value;
				}
			}
			if(redioAll.querySelector("#bagSuppliersType2").checked) {
				redioData["flowType"] = "";
			}
			redioData.customId = customId;
			redioData.sourceType = $("#sourceType").val();
			console.log(redioData)
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TBagCustomer/getpackageList.action',
				data: JSON.stringify(redioData),
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
					selectObj.parentDom = document.querySelector('#myModalxufei');
					selectObj.appendTo = document.querySelector('#myModalxufei').querySelector('#selectWrap');
					selectObj.cbFn = function(self) {
						selectPrice(self.scope['code']) //计算价格
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
		redioAjax();

		//选择套餐变化时
		document.querySelector("#xufeuPrice").innerHTML = modalBox.costprice; //总价初始化
		//模糊下拉选择事件
		document.querySelector("#xufeiNum").onchange = function() {
			var bagUuid = document.querySelector("#myModalxufei").querySelector("._show").getAttribute('code');
			selectPrice(bagUuid)
		}
		//数量为输入值时
		var parentDom = document.querySelector("#myModalxufei");
		var dg_writeNumWrap = document.querySelector("#myModalxufei").querySelector("#dg_writeNumWrap");
		if(dg_writeNumWrap) {
			dg_writeNumWrap.value = '';
			dg_writeNumWrap.onchange = function() {
				var bagUuid = document.querySelector("#myModalxufei").querySelector("._show").getAttribute('code');
				if(bagUuid) {
					selectPrice(bagUuid, this.value)
				}
			}
		}

		function selectPrice(bagUuid, value) {
			//循环套餐数据 取对应的套餐价格
			var salePrice = 0;
			for(var i = 0; i < bagData.length; i++) {
				if(bagData[i].uuid == bagUuid) {
					salePrice = bagData[i].salePrice;
					break;
				}
			}
			var ischeck = document.querySelector("#xufeiNum1").innerHTML //数量
			var month
			if(value) {
				month = value;
			} else {
				month = document.querySelector("#xufeiNum").value; //套餐月份
			}
			modalBox.costprice = ischeck * salePrice * month;
			document.querySelector("#xufeuPrice").innerHTML = modalBox.costprice.toFixed(2);
		}


		

			
		//		确定按钮
		document.getElementById('xufeiSave').onclick = function() {
			var params = {
				"iccidList": iccidList, //选中的iccid
				"packageId": document.querySelector("#myModalxufei").querySelector("._show").getAttribute('code'), //套餐id
				"selectNum": document.querySelector("#xufeiNum").value, //月份
				"activeType": 0 //生效模式
			}
			//重置->生效模式赋值
			for(var i = 0; i < document.querySelectorAll("[name='effect']").length; i++) {
				if(document.querySelectorAll("[name='effect']")[i].checked == true) {
					params.activeType = document.querySelectorAll("[name='effect']")[i].value
				}
			}
			//重置->数量
			if(ss.getDom('#contract').getAttribute('curfolwtype') == 0) {
				params.selectNum = document.querySelector("#xufeiNum").value;
			} else {
				//非月包：季包1 | 半年包2 | 年包3
				var _wn = ss.getDom('#dg_writeNumWrap').value;
				params.selectNum = _wn
				//				switch(Number(ss.getDom('#contract').getAttribute('curfolwtype'))){
				//					case 1:
				//					  	params.selectNum = Number(_wn)*3
				//				    break;
				//					case 2:
				//					  	params.selectNum = Number(_wn)*6
				//					break;
				//					case 3:
				//					  	params.selectNum = Number(_wn)*12
				//					break;
				//				}
			}

			for(var i in params) {
				if(params[i] == '' || params[i] == []) {
					layer.msg('请将必填数据填完');
					return 0;
				}
			}
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/renewal.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					ss.c3Loading.show();
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				complete: function() {
					ss.c3Loading.hidden();
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						//表格重载
						if(self.scope.checkObj) {
							self.scope.checkObj[self.pageData.page] = []
						}
						instance.lg_reloadFn()
						$('input[type=radio][name="businessType"]:first').prop("checked", true);
						$('input[type=radio][name="bagSuppliersType"]:first').prop("checked", true);
						$('input[type=radio][name="flowType"]:first').prop("checked", true);
						$('input[type=radio][name="activeType"]:first').prop("checked", true);
						modalBox.close()
						if(data.data!=null){
							layer.msg(data.data)
						}else{
							layer.msg('卡续费成功')
						}
						
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

	//批量刷新
	function refleshFn(self) {
		console.log(self)
		if(document.querySelector(".dtcWrap").querySelector("[ischeck='true']") == undefined) {
			layer.msg('请勾选你要刷新的卡')
			return;
		}
		var ischeck = document.querySelector(".tbCWrap").querySelectorAll("[ischeck='true']");
		//请求地址
		var queryUrl = commonUrl + "/admin/TCardStore/refresh.action";
		var params = {}
		var iccidList = [];
		var chooseData = []
		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page].length > 0) {
			document.getElementById('xfFile').style.display = 'none'
			chooseData = self.scope.checkObj[self.pageData.page]
			document.getElementById('xufeiNum1').innerHTML = chooseData.length
			for(var i = 0; i < chooseData.length; i++) {
				iccidList.push(chooseData[i].iccid)
			}
		}

		//请求参数
		params.pageSize = self.tableData.pageSize.toString();
		params.iccids = iccidList
		params.currentPage = self.pageData.page;
		//发送请求
		$.ajax({
			url: queryUrl,
			type: 'post',
			data: JSON.stringify(params),
			dataType: 'json',
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				ss.c3Loading.show();
			},
			complete: function() {
				ss.c3Loading.hidden();
			},
			success: function(data) {
				if(data.result == 'success') {
					self.scope.checkObj[self.pageData.page] = []
					self.lg_reloadFn({}, params.currentPage)
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
	};

	//高级查询
	function specialSearch(self, commonUrl) {
		var model = {
			id: "myModalsearch" //传入弹窗的ID
		};
		//		获取客户数据 
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
				selectObj.parentDom = document.querySelector('#myModalsearch');
				selectObj.appendTo = document.querySelector('#myModalsearch').querySelector('#selectWrap');
				//渲染模糊查询下拉
				ss.blurrySel({
					selectObj
				});
			},
			error: function(xhr, type) {
				alert("错误")
			}
		});
		popupAll(model);
		var boxObj = {
			boxDom: document.querySelector("#myModalsearch"), //获取当前模态框的最高层
			initData: {
				minIccid: "", //最小ICCID
				maxIccid: "", //最大ICCID
				minMsisdn: "", //最小MSISDN
				maxMsisdn: "", //最大MSISDN				
				operator: "", //运营商
				simStatus: "", //卡片状态
				shareType: "", //共享类型
				sourceType: "", //卡片类型
				remark: "", //备注关键词
				imei: "", //IMEI号码
				minImsi: "", //最小IMSI
				maxImsi: "", //最大IMSI
				createTimeStart: "", //发卡开始时间
				createTimeEnd: "", //发卡结束时间
				activateTimeStart: "", //激活开始时间
				activateTimeEnd: "", //激活结束时间
				stopTimeStart: "", //到期开始时间
				stopTimeEnd: "", //到期结束时间
				settlementType:"", //结算类型
				imeiBind:"", //是否绑定imei卡
				customerUuid: "" //客户名称
				
			}, //查询模态框初始化所有参数
			searchData: {} //查询模态框传参的所有参数
		}

		boxObj.boxDom.querySelector("#searchSave").onclick = function() {
			for(var k in boxObj.initData) {
				if(k == "customerUuid") {
					boxObj.initData[k] = boxObj.boxDom.querySelector("._show").getAttribute('code');
				} else {
					boxObj.initData[k] = boxObj.boxDom.querySelector("#" + k).value;
				}
			};

			var success = function success(data) {
				layer.msg('查询成功')
				//				boxObj.boxDom.querySelector(".empty").click();
				boxObj.boxDom.querySelector(".close").click();
			}
			self.scope.queryObj = boxObj.initData;
			self.lg_reloadFn(boxObj.initData, "", success)
		}

		boxObj.boxDom.querySelector(".empty").onclick = function() {
			for(var k in boxObj.initData) {
//				console.log(document.querySelector("#" + k).value)
				boxObj.boxDom.querySelector("#" + k).value = "";
				boxObj.initData[k] = "";
			}
		}

	}

	//修改备注
	function remarkFn(self, commonUrl) {
		paramsAll.iccid = []; //清空划拨的iccid的列表
		var boxObj = {
			boxDom: document.querySelector("#myModalremark"), //获取当前模态框的最高层
			ischeck: document.querySelector(".tbCWrap").querySelectorAll("[ischeck='true']"), //		获取勾选的卡号数量
			supplierUuid: [] //运营商id
		};
		//		判断是否有勾选 是否是同样的运营商
		if(boxObj.ischeck.length > 0) {
			console.log(boxObj)
			document.querySelector("#stateNum1").innerHTML = boxObj.ischeck.length;
			for(var i = 0; i < boxObj.ischeck.length; i++) {
				//获取固定运营商uuid
				var oldUuid = self.scope.checkObj[self.pageData.page][0]['supplierUuid'];
				//获取变化的运营商uuid；
				var newUuid = self.scope.checkObj[self.pageData.page][i]['supplierUuid'];
				paramsAll.iccid.push(self.scope.checkObj[self.pageData.page][i]['iccid']);
				if(oldUuid != newUuid) {
					layer.msg("必须是相同的供应商")
					return;
				}
				paramsAll.uuid = oldUuid;
			}
		} else {
			layer.msg("请选择变更卡")
			return
		}

		var model = {
			id: "myModalremark" //传入弹窗的ID
		};
		popupAll(model);
		for(var i = 0; i < self['scope']['checkObj'].length; i++) {
			boxObj.supplierUuid.push(self['scope']['checkObj'][i]['supplierUuid']);
		}
		document.querySelector("#stateSim1").innerHTML = paramsAll.iccid.join(",\n");
		//点击确定
		document.querySelector("#remarkSave").onclick = function() {
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/remarkChange.action',
				data: JSON.stringify({
					iccidList: paramsAll.iccid,
					remark: document.querySelector("#remarkChange").value
				}),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						layer.msg('修改备注成功')
						self.scope.checkObj[self.pageData.page] = []
						boxObj.boxDom.querySelector(".close").click();
						document.querySelector("[name='搜索']").click();

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
	
	//	取消位置
	function cancelLtFn(curData, commonUrl) {
		var parentDom = document.querySelector("#myModalLocation");
		//重置弹窗
		resetView({
			ctx: '#myModalLocation',
			txt: ['#huaboLtFile'],
		})
		ss.getDom('#huaboNumLt').innerHTML = '0';

		//标识：文件|iccid
		var _SIGN = null;
		var paramsAll = {};
		paramsAll.iccid = []; //清空划拨的iccid的列表

		var boxObj = {
			boxDom: document.querySelector("#myModalLocation"), //获取当前模态框的最高层
			ischeck: document.querySelector(".tbCWrap").querySelectorAll("[ischeck='true']"), //		获取勾选的卡号数量
			supplierUuid: [] //运营商id
		};
		var model = {
			id: "myModalLocation" //传入弹窗的ID
		};

		boxObj.boxDom.querySelector('#lc_iccid').innerHTML = '--'
		
		//判断是否有勾选 是否是同样的运营商
		if(boxObj.ischeck.length > 0) {
			document.querySelector("#huaboNumLt").innerHTML = boxObj.ischeck.length;
			_SIGN = 0; //勾选划拨
			for(var i = 0; i < boxObj.ischeck.length; i++) {
				//->勾选则隐藏选择文件 | iccid号段
				parentDom.querySelector('#hbFile1Lt').style.display = 'none'
				//获取固定运营商uuid
				var oldUuid = curData.scope.checkObj[instance.pageData.page][0]['supplierUuid'];
				//获取变化的运营商uuid；
				var newUuid = curData.scope.checkObj[instance.pageData.page][i]['supplierUuid'];
				paramsAll.iccid.push(curData.scope.checkObj[instance.pageData.page][i]['iccid']);
				if(oldUuid != newUuid) {
					layer.msg("必须是相同的供应商")
					return;
				}
				paramsAll.uuid = oldUuid;
				boxObj.boxDom.querySelector('#lc_iccid').innerHTML = paramsAll.iccid.join(',')
			}
		} else {
			//->没勾选则选择文件
			parentDom.querySelector('#hbFile1Lt').style.display = 'block'
		}

		//		//调用弹窗显示
		popupAll(model);

		//是否显示选择文件
		var iccidList = [];
		var chooseData = []

		//默认选择text
		parentDom.querySelector('#huaboTextLt').innerHTML = "选择";
		parentDom.querySelector('#huaboTextLt').title = "选择";
		//选择文件
		parentDom.querySelector('#huaboLtFile').onchange = function() {
			var file = this.files[0]
			console.log(file)
			//判断所选择文件是否为excel文件类型
			if(/\.xlsx|\.xlsm|\.xls|\.csv/.test(file['name'])) {
				parentDom.querySelector('#huaboTextLt').innerHTML = file['name'];
				parentDom.querySelector('#huaboTextLt').title = file['name'];
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
						paramsAll.iccid = data['data']
						boxObj.boxDom.querySelector('#lc_iccid').innerHTML = paramsAll.iccid.join(',')
						parentDom.querySelector('#huaboNumLt').innerHTML = data['data'].length
						layer.msg('文件选择成功');
						_SIGN = 1; //文件划拨
					} else {
						layer.msg(data && data['errorMsg']);
					}
				}
			};
			$('#huaboFormLt').ajaxSubmit(options);
		};		
		
		//		保存 
		document.getElementById('huaboSaveLt').onclick = function() {
			var parentDom = document.querySelector("#myModalLocation");
			var params = {
				iccidList: paramsAll.iccid, //iccid
			};

			if(_SIGN === 1 && params.iccidList.length < 1) {
				layer.msg('请选择划拨卡号');
				return;
			}
			if(params.iccidList.length>2000){
				layer.msg('一次取消位置不能超过2000张')
				return;
			}
			
			var loading = layer.load(1, {
				shade: [0.1, '#000'] //0.1透明度的白色背景
			});
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/sendCancelLocation.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					//最后数据加载完 让 loading层消失
					layer.close(loading);
					if(data.result == 'success') {
						layer.msg('取消成功')
						boxObj.boxDom.querySelector(".close").click();
						document.querySelector("[name='搜索']").click();

					} else { 
						layer.msg(data.errorMsg || data.data)
					}
				},
				error: function(xhr, type) {
					alert("错误")
				}
			});
		}

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
					$(id).val(appName + '元')
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
	//主套餐变更
	function mainBagFn(self) {
		var customId = document.querySelector('.dtsWrap').querySelector(".customerUuid").querySelector('._show').getAttribute('code')
		if(!customId) {
			layer.msg('请先选择客户');
			return;
		}
		var iccidCount = 0
		var chooseData = []
		var iccidList = []
		//数据清空
		document.getElementById('number12').innerHTML = '0'
		document.getElementById('selectNum2').value = ''
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
		var model = {
			id: "mainBagModal" //传入弹窗的ID
		};
		popupAll(model);

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
		//获取套餐数据
		function getBag(params, bagUuid, defaultName) {
			params.customId = customId;
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TBagCustomer/getpackageList.action',
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
							obj.name = data[i].bagCustomerName;
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
						selectObj.cbFn = function(self) {
							packageId = self.scope['code']
							selectPrice(self.scope['code'])
						}
						//渲染模糊查询下拉
						ss.blurrySel({
							selectObj
						});
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
			selectNum = Number(this.value)
			var bagUuid = document.querySelector("#mainBagModal").querySelector("._show").getAttribute('code');
			selectPrice(bagUuid)
		}
		//计算金额
		function selectPrice(bagUuid) {
			//循环套餐数据 取对应的套餐价格
			var salePrice = 0;
			for(var i = 0; i < bagData.length; i++) {
				if(bagData[i].uuid == bagUuid) {
					salePrice = bagData[i].salePrice;
					break;
				}
			}
			var ischeck = document.querySelector('#mainBagModal').querySelector('#number12').innerHTML //数量
			var month = document.querySelector('#mainBagModal').querySelector("#selectNum2").value; //套餐月份
			//			modalBox.costprice = ischeck * salePrice * month;
			document.querySelector('#mainBagModal').querySelector("#sum2").innerHTML = (ischeck * salePrice * month).toFixed(2);
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
						if(self.scope.checkObj) {
							self.scope.checkObj[self.pageData.page] = []
						}
						instance.lg_reloadFn()
						$('input[type=radio][name="businessType"]:first').prop("checked", true);
						$('input[type=radio][name="bagSuppliersType"]:first').prop("checked", true);
						$('input[type=radio][name="flowType"]:first').prop("checked", true);
						//						modalBox.close()
						document.querySelector('#mainBagModal').style.display = 'none';
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
	//重置套餐
	function resetBagFn(self, commonUrl) {
		var parentDom = document.querySelector("#myModalResetBag")
		paramsAll.iccid = []; //清空划拨的iccid的列表
		var boxObj = {
			boxDom: parentDom, //获取当前模态框的最高层
			ischeck: document.querySelector(".tbCWrap").querySelectorAll("[ischeck='true']"), //		获取勾选的卡号数量
			supplierUuid: [] //运营商id
		};
		var model = {
			id: "myModalResetBag" //传入弹窗的ID
		};
		popupAll(model);
		parentDom.querySelector('#stateNum').innerHTML = 0;
		parentDom.querySelector("#stateSim").innerHTML = '';
		if(parentDom.querySelector('#stateSim').hasAttribute('readonly')) {
			parentDom.querySelector('#stateSim').removeAttribute('readonly');
		}
		//		判断是否有勾选 是否是同样的运营商
		if(boxObj.ischeck.length > 0) {
			parentDom.querySelector('#hbFile1').style.display = 'none'; //是否显示选择文件
			//输入框是否可手动输入
			parentDom.querySelector('#stateSim').style.outline = 'none';
			parentDom.querySelector('#stateSim').setAttribute('readonly', 'readonly');
			parentDom.querySelector("#stateNum").innerHTML = boxObj.ischeck.length;
			for(var i = 0; i < boxObj.ischeck.length; i++) {
				//获取固定运营商uuid
				var oldUuid = self.scope.checkObj[self.pageData.page][0]['supplierUuid'];
				//获取变化的运营商uuid；
				var newUuid = self.scope.checkObj[self.pageData.page][i]['supplierUuid'];
				paramsAll.iccid.push(self.scope.checkObj[self.pageData.page][i]['iccid']);
				if(oldUuid != newUuid) {
					layer.msg("必须是相同的供应商")
					return;
				}
				paramsAll.uuid = oldUuid;
			}
		}

		//默认选择text
		parentDom.querySelector('#huaboText').innerHTML = "选择";
		parentDom.querySelector('#huaboText').title = "选择";
		parentDom.querySelector('#huaboFile').value = '';
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
						paramsAll.iccid = data['data'];
						parentDom.querySelector("#stateSim").innerHTML = paramsAll.iccid.join(",");
						parentDom.querySelector('#stateNum').innerHTML = data['data'].length;
						//输入框是否可手动输入
						parentDom.querySelector('#stateSim').style.outline = 'none';
						parentDom.querySelector('#stateSim').setAttribute('readonly', 'readonly');
						layer.msg('文件选择成功');
					} else {
						layer.msg(data && data['data']);
					}
				}
			};
			$('#msmForm').ajaxSubmit(options);
		}
		if(self['scope']['checkObj']) {
			for(var i = 0; i < self['scope']['checkObj'].length; i++) {
				boxObj.supplierUuid.push(self['scope']['checkObj'][i]['supplierUuid']);
			}
		}
		parentDom.querySelector("#stateSim").onchange = function() {
			paramsAll.iccid = [];
			this.value = this.value.replace("，", ",");
			var sentToArr = this.value.split(',');
			for(var i = 0; i < sentToArr.length; i++) {
				if(sentToArr[i] !== '') {
					paramsAll.iccid.push(sentToArr[i]);
				}
			}
			parentDom.querySelector('#stateNum').innerHTML = paramsAll.iccid.length;

		}
		parentDom.querySelector("#stateSim").innerHTML = paramsAll.iccid.join(",\n");
		//		点击确定
		parentDom.querySelector("#stateSave").onclick = function() {
			if(paramsAll.iccid.length <= 0) {
				layer.msg('请将必填数据填完');
				return;
			}
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/reSetCard.action',
				data: JSON.stringify({
					iccidList: paramsAll.iccid,
				}),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						layer.msg('操作成功')
						if(self.scope.checkObj) {
							self.scope.checkObj[self.pageData.page] = [];
						}
						instance.lg_reloadFn();
						boxObj.boxDom.querySelector(".close").click();
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
	//开通短信
	function openMSMFn(self, commonUrl) {
		var parentDom = document.querySelector("#myModalOpenMSM")
		paramsAll.iccid = []; //清空划拨的iccid的列表
		var boxObj = {
			boxDom: parentDom, //获取当前模态框的最高层
			ischeck: document.querySelector(".tbCWrap").querySelectorAll("[ischeck='true']"), //		获取勾选的卡号数量
			supplierUuid: [] //运营商id
		};
		var model = {
			id: "myModalOpenMSM" //传入弹窗的ID
		};
		popupAll(model);
		if(parentDom.querySelector('#stateSim').hasAttribute('readonly')) {
			parentDom.querySelector('#stateSim').removeAttribute('readonly');
		}
		parentDom.querySelector('#stateNum').innerHTML = 0;
		//		判断是否有勾选 是否是同样的运营商
		if(boxObj.ischeck.length > 0) {
			parentDom.querySelector('#hbFile1').style.display = 'none'; //是否显示选择文件
			parentDom.querySelector("#stateNum").innerHTML = boxObj.ischeck.length;
			//输入框是否可手动输入
			parentDom.querySelector('#stateSim').style.outline = 'none';
			parentDom.querySelector('#stateSim').setAttribute('readonly', 'readonly');
			for(var i = 0; i < boxObj.ischeck.length; i++) {
				//获取固定运营商uuid
				var oldUuid = self.scope.checkObj[self.pageData.page][0]['supplierUuid'];
				//获取变化的运营商uuid；
				var newUuid = self.scope.checkObj[self.pageData.page][i]['supplierUuid'];
				paramsAll.iccid.push(self.scope.checkObj[self.pageData.page][i]['iccid']);
				if(oldUuid != newUuid) {
					layer.msg("必须是相同的供应商")
					return;
				}
				paramsAll.uuid = oldUuid;
			}
		}

		//默认选择text
		parentDom.querySelector('#huaboText').innerHTML = "选择";
		parentDom.querySelector('#huaboText').title = "选择";
		parentDom.querySelector('#huaboFile').value = '';
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
						paramsAll.iccid = data['data'];
						parentDom.querySelector("#stateSim").innerHTML = paramsAll.iccid.join(",");
						parentDom.querySelector('#stateNum').innerHTML = data['data'].length;
						//输入框是否可手动输入
						parentDom.querySelector('#stateSim').style.outline = 'none';
						parentDom.querySelector('#stateSim').setAttribute('readonly', 'readonly');
						layer.msg('文件选择成功');
					} else {
						layer.msg(data && data['data']);
					}
				}
			};
			$('#msmForms').ajaxSubmit(options);
		}

		if(self['scope']['checkObj']) {
			for(var i = 0; i < self['scope']['checkObj'].length; i++) {
				boxObj.supplierUuid.push(self['scope']['checkObj'][i]['supplierUuid']);
			}
		}
		parentDom.querySelector("#stateSim").onchange = function() {
			paramsAll.iccid = [];
			this.value = this.value.replace("，", ",");
			var sentToArr = this.value.split(',');
			for(var i = 0; i < sentToArr.length; i++) {
				if(sentToArr[i] !== '') {
					paramsAll.iccid.push(sentToArr[i]);
				}
			}
			parentDom.querySelector('#stateNum').innerHTML = paramsAll.iccid.length;

		}
		parentDom.querySelector("#stateSim").innerHTML = paramsAll.iccid.join(",\n");
		parentDom.querySelector("#smsTotalCount").onchange = function() {
			if(this.value < 0) {
				layer.msg('短信条数不能输入负数，请重新输入');
				this.value = '';
				return;
			}
		}
		//		点击确定
		parentDom.querySelector("#stateSave").onclick = function() {
			if(paramsAll.iccid.length <= 0) {
				layer.msg('请将必填数据填完');
				return;
			}
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/smsStatusChange.action',
				data: JSON.stringify({
					iccidList: paramsAll.iccid,
					smsStatus: parseInt(parentDom.querySelector("#smsStatus").value),
					smsTotalCount: parseInt(parentDom.querySelector("#smsTotalCount").value),
				}),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						layer.msg('操作成功')
						if(self.scope.checkObj) {
							self.scope.checkObj[self.pageData.page] = [];
						}
						instance.lg_reloadFn();
						boxObj.boxDom.querySelector(".close").click();
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
	//状态变更
	function stateFn(self, commonUrl) {
		var parentDom = document.querySelector("#myModalstate")
		paramsAll.iccid = []; //清空划拨的iccid的列表
		var boxObj = {
			boxDom: parentDom, //获取当前模态框的最高层
			ischeck: document.querySelector(".tbCWrap").querySelectorAll("[ischeck='true']"), //		获取勾选的卡号数量
			supplierUuid: [] //运营商id
		};
		//		判断是否有勾选 是否是同样的运营商
		if(boxObj.ischeck.length > 0) {
			parentDom.querySelector("#stateNum").innerHTML = boxObj.ischeck.length;
			for(var i = 0; i < boxObj.ischeck.length; i++) {
				//获取固定运营商uuid
				var oldUuid = self.scope.checkObj[self.pageData.page][0]['supplierUuid'];
				//获取变化的运营商uuid；
				var newUuid = self.scope.checkObj[self.pageData.page][i]['supplierUuid'];
				paramsAll.iccid.push(self.scope.checkObj[self.pageData.page][i]['iccid']);
				if(oldUuid != newUuid) {
					layer.msg("必须是相同的供应商")
					return;
				}
				paramsAll.uuid = oldUuid;
			}
		} else {
			layer.msg("请选择变更卡")
			return
		}

		var model = {
			id: "myModalstate" //传入弹窗的ID
		};
		popupAll(model);
		for(var i = 0; i < self['scope']['checkObj'].length; i++) {
			boxObj.supplierUuid.push(self['scope']['checkObj'][i]['supplierUuid']);
		}
		parentDom.querySelector("#stateSim").innerHTML = paramsAll.iccid.join(",\n");
		//		var params = {
		//			iccidList: paramsAll.iccid,
		//			simStatus: parseInt(document.querySelector("#stateSelect").value)
		//		}

		//		点击确定
		parentDom.querySelector("#stateSave").onclick = function() {
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/simStatusChange.action',
				data: JSON.stringify({
					iccidList: paramsAll.iccid,
					simStatus: parseInt(parentDom.querySelector("#stateSelect").value)
				}),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						layer.msg(data.data || '更改状态成功')
						self.scope.checkObj[self.pageData.page] = [];
						instance.lg_reloadFn();
						boxObj.boxDom.querySelector(".close").click();
						parentDom.querySelector("[name='搜索']").click();

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
	
	//权限判断是否显示按钮
	function jdFn(dataJson,index){
		if(!ss.jurisdiction){
			return;
		}
		var dataJd = (dataJson || ss.jurisdiction);
        var dataArrIndex = (index || 0)
		dataJd.forEach(function(item,index){
			if(dataArrIndex == 0){
				if(item["sourceCode"] == "_mu_m2mCard_flow_info"){
					jdFn(item.heeler,1)
					return;
				}
				if(index == dataJd.length){
					document.querySelector(".searchWrap").querySelector("[name='stateChange']").style.display="none";
					return;
				}
			}
			if(dataArrIndex == 1){
				if(item["name"].indexOf("状态变更") != -1 && item['selected']==1){
					document.querySelector(".searchWrap").querySelector("[name='stateChange']").style.display="none"
					return;
				}
			}
        })
		
   }
	//时间插件
	laydate.render({
		elem: '#createTimeStart'
	});
	laydate.render({
		elem: '#createTimeEnd'
	});
	laydate.render({
		elem: '#activateTimeStart'
	});
	laydate.render({
		elem: '#activateTimeEnd'
	});
	laydate.render({
		elem: '#stopTimeStart'
	});
	laydate.render({
		elem: '#stopTimeEnd'
	});
})