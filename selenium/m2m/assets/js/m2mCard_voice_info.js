﻿﻿
ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon_mc')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TCardStore/voice/queryByPageInfo.action', //请求Url
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
					url: commonUrl + '/admin/TCustomer/voice/queryByPageInfo.action',
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
//			export: {
//				name: '卡导出',
//				colType: 'opt1',
//				cbFn: function(self) {
//					exportFn(self);
//				}
//			},
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
			stateChange: {
				name: '状态变更',
				colType: 'opt2',
				cbFn: function(self) {
					stateFn(self, commonUrl)
				}
			},
			remarkChange: {
				name: '修改备注',
				colType: 'opt2',
				cbFn: function(self) {
					remarkFn(self, commonUrl)
				}
			},
			reflesh: {
				name: '批量刷新',
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
				dpWPer: '150%',
				dpWith: {
					'iccid': 9,
					'msisdn': 7,
					'customerName': 8,
					'operator': 3,
					'createTime': 5,
					'activateTime': 5,
					'packageEndTime': 5,
					'imsi': 7,
					'imei': 7,
					'simStatus': 4,
					'online': 4,
					'voiceMonthUsed': 6,
					'voiceMonthResidual': 6,
					'activationType': 4,
					'insertTime': 5,
				},
				closeInterlace: true,
				isChangeTime: ['createTime', 'activateTime',
					'packageEndTime',
					'insertTime'
				],
				toDate:true,
				showTitle: ['iccid', 'msisdn', 'customerName', 'operator', 'createTime', 'activateTime',
					'packageEndTime', 'imsi', 'imei',
					'simStatus', 'online', 'activationType',
					'voiceMonthUsed', 'voiceMonthResidual', 'insertTime', 'remark'
				],
				sort: {
					'iccid': true,
					'imsi': true,
					'msisdn': true,
					'createTime': true,
					'activateTime': true,
					'packageEndTime': true,
					'voiceMonthUsed': true,
					'voiceMonthResidual': true,
				},
				shim: {
					'cardType': {
						'1': 'MP1',
						'2': 'MP2',
						'3': 'MP3',
						'4': 'MP4',
						'5': 'MP5',
						'6': 'MP6',
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
					'shareType':{
						2: '共享卡',
						1: '独享卡',
					}
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
									url: commonUrl + '/admin/TCardStore/voice/queryByPageInfo.action',
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
											'voiceMonthResidual',
											'voiceMonthUsed',
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
														4: '失效'
													};
													data[dataList[i]] = simStatus[data[dataList[i]]]
												} else if(dataList[i] == 'cardType') {
													var cardType = {
														1: 'MP1',
														2: 'MP2',
														3: 'MP3',
														4: 'MP4',
														5: 'MP5',
														6: 'MP6',
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
												}else if(dataList[i] == 'shareType') {
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
									url: commonUrl + '/admin/TCardStore/voice/getPkgByIccid.action',
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
																			ss.crtDom('td', '', detailsData[i].flowLimit == 0 ? '无限量': detailsData[i].flowLimit ? detailsData[i].flowLimit.toString() : '-', dom, {})
																			ss.crtDom('td', '', detailsData[i].flowUsed ? detailsData[i].flowUsed : '-', dom, {})
																			ss.crtDom('td', '', detailsData[i].statu ? effectType[detailsData[i].statu] : '-', dom, {})
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

			tlName: ['ICCID', 'MSISDN', '客户', '运营商', '发卡日期', '激活日期',
				'到期日期', 'IMSI', 'IMEI',
				"卡片状态", '在线状态', '激活方式','共享类型',
				'本月已用语音', '本月可用语音', '入库日期', '备注'
			], //表头名字
			tlTxt: ['iccid', 'msisdn', 'customerName', 'operator', 'createTime', 'activateTime',
				'packageEndTime', 'imsi', 'imei',
				'simStatus', 'online', 'activationType','shareType',
				'voiceMonthUsed', 'voiceMonthResidual', 'insertTime', 'remark'
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
	var paramsAll = {
		iccid: [], //选中的iccid列表
		uuid: "", //供应商uuid

	}
	//导出
	function exportFn(self) {
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
				if(data.result=='success'){
					window.location.href = data.data;
				}else{
					layer.msg(data.errorMsg || '导出失败')
				}
			},
			error: function(data) {
				layer.msg('数据获取失败')
				layer.close(data);
			}
		});
	}
	//导入
	function importFn(curData) {
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

	//	划拨
	function pointerFn(self) {
		//点击手动录单模态框---开始
		/*建立模态框对象*/
		var modalBox = {};
		//		获取勾选的卡号数量
		modalBox.ischeck = document.querySelector(".tbCWrap").querySelectorAll("[ischeck='true']");
		//		选中卡号iccid的集合
		modalBox.iccidList = [];
		/*获取模态框*/
		modalBox.modal = document.getElementById("myModalhuabo");
		/*获得关闭按钮*/
		modalBox.closeBtn = document.getElementById("huaboClose");
		modalBox.cancelBtn = document.getElementById("huaboCancel");
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
		//点击手动录单模态框---结束

		//是否显示选择文件
		var iccidList = [];
		var chooseData = []
		document.getElementById('huaboNum1').innerHTML = ''
		document.getElementById('hbFile1').style.display = 'block'
		if(self.scope.checkObj && self.scope.checkObj[self.pageData.page].length > 0) {
			document.getElementById('hbFile1').style.display = 'none'
			chooseData = self.scope.checkObj[self.pageData.page]
			document.getElementById('huaboNum1').innerHTML = chooseData.length
			for(var i = 0; i < chooseData.length; i++) {
				iccidList.push(chooseData[i].iccid)
			}
		}
		//默认选择text
		document.getElementById('huaboText').innerHTML = "选择";
		document.getElementById('huaboText').title = "选择";
		//选择文件
		document.getElementById('huaboFile').onchange = function() {
			var file = this.files[0]
			//判断所选择文件是否为excel文件类型
			if(/\.xlsx|\.xlsm|\.xls|\.csv/.test(file.name)) {
				document.getElementById('huaboText').innerHTML = file.name;
				document.getElementById('huaboText').title = file.name;
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
						console.log(data['data'])
						iccidList = data['data']
						document.getElementById('huaboNum1').innerHTML = data['data'].length
						layer.msg('文件选择成功');
					} else {
						layer.msg(data && data['errorMsg']);
					}
				}
			};
			$('#huaboForm').ajaxSubmit(options);
		}

		//		获取客户数据 
		$.ajax({
			type: 'POST',
			url: commonUrl + '/admin/TCustomer/voice/queryByPageInfo.action',
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
				selectObj.parentDom = document.querySelector('#myModalhuabo');
				selectObj.appendTo = document.querySelector('#myModalhuabo').querySelector('#selectWrap');
				//渲染模糊查询下拉
				ss.blurrySel({
					selectObj
				});
			},
			error: function(xhr, type) {
				alert("错误")
			}
		});
		//保存
		document.getElementById('huaboSave').onclick = function() {
			var params = {
				customerUuid: document.querySelector("#myModalhuabo").querySelector("._show").getAttribute('code'), //选择客户
				activationType: document.querySelector("#huaboActive").value, //激活类型
				iccidList: iccidList, //iccid
				imeiBind: Number($("#_m2mC_imeiBind").val()),
				isCertification: Number($("#isCertification").val()),
				payType: Number($("#payType").val()),
				remark: document.querySelector("#huaboRemark1").value,
			};

			if(params.iccidList.length < 1) {
				layer.msg('请选择划拨卡号');
				return;
			}
			for(var i in params) {
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
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/distribute.action',
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
						modalBox.close()
						layer.msg('划拨成功')
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

	//续费
	function continues(self) {
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
						console.log(data['data'])
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
		//		选择月份
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
						option += "<option value=" + customerUuid + ">" + customerName + "</option>"
					}
				}
				document.querySelector("#xufeiNum").innerHTML = option;

			},
			error: function(xhr, type) {
				alert("错误")
			}
		});

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

				redioAjax()
			}
		}
		//		请求获取套餐
		function redioAjax(bagUuid,defaultName) {
			var redioData = {}
			for(var i = 0; i < redioCheckd.length; i++) {
				if(redioCheckd[i].checked == true) {
					redioData[redioCheckd[i].name] = redioCheckd[i].value;
				}
			}
			if(redioAll.querySelector("#bagSuppliersType2").checked) {
				redioData["flowType"] = "";
			}
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TBagPlatform/getpackageList.action',
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
						obj.name = data[i].bagPlatformName;
						selectData.push(obj);
					}
					var selectObj = {};
					selectObj.name = '套餐';
					selectObj.txt = 'packageId';
					selectObj.data = selectData;
					if(defaultName && bagUuid){
						selectObj.defaultVal = bagUuid;
						selectObj.defaultName = defaultName;
					}
					selectObj.parentDom = document.querySelector('#myModalxufei');
					selectObj.appendTo = document.querySelector('#myModalxufei').querySelector('#selectWrap');
					//渲染模糊查询下拉
					ss.blurrySel({
						selectObj
					});

					var selectLi = document.querySelector('#myModalxufei').querySelector('#selectWrap').querySelectorAll('li')
					if(selectLi && selectLi.length > 0) {
						for(var i = 0; i < selectLi.length; i++) {
							selectLi[i].onclick = function() {
								selectPrice(this.getAttribute('code')) //计算价格
							}
						}
					}
				},
				error: function(xhr, type) {
					alert("错误")
				}
			});
		}
		redioAjax();

		//选择套餐变化时
		document.querySelector("#xufeuPrice").innerHTML = modalBox.costprice; //总价初始化
		document.querySelector("#xufeiNum").onchange = function() {
			var bagUuid = document.querySelector("#myModalxufei").querySelector("._show").getAttribute('code');
			var defaultName = document.querySelector("#myModalxufei").querySelector("._show").innerHTML;
			selectPrice(bagUuid)
			redioAjax(bagUuid,defaultName);
		}

		function selectPrice(bagUuid) {
			//循环套餐数据 取对应的套餐价格
			var costprice = 0;
			for(var i = 0; i < bagData.length; i++) {
				if(bagData[i].uuid == bagUuid) {
					costprice = bagData[i].costprice;
					break;
				}
			}
			var ischeck = document.querySelector("#xufeiNum1").innerHTML //数量
			var month = document.querySelector("#xufeiNum").value; //套餐月份
			modalBox.costprice = ischeck * costprice * month;
			document.querySelector("#xufeuPrice").innerHTML = modalBox.costprice.toFixed(2);
		}

		//		确定按钮
		var saveFlag = false
		document.getElementById('xufeiSave').onclick = function() {
			var params = {
				"iccidList": iccidList, //选中的iccid
				"packageId": document.querySelector("#myModalxufei").querySelector("._show").getAttribute('code'), //套餐id
				"selectNum": document.querySelector("#xufeiNum").value, //月份
				"activeType": 0 //生效模式
			}
			for(var i = 0; i < document.querySelectorAll("[name='effect']").length; i++) {
				if(document.querySelectorAll("[name='effect']")[i].checked == true) {
					params.activeType = document.querySelectorAll("[name='effect']")[i].value
				}
			}
			for(var i in params) {
				if(params[i] == '' || params[i] == []) {
					layer.msg('请将必填数据填完');
					return 0;
				}
			}
			if(saveFlag){
				return
			}
			saveFlag = true
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/renewal.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						//表格重载
						instance.lg_reloadFn()
						self.scope.checkObj[self.pageData.page] = [];
						$('input[type=radio][name="businessType"]:first').prop("checked", true);
						$('input[type=radio][name="bagSuppliersType"]:first').prop("checked", true);
						$('input[type=radio][name="flowType"]:first').prop("checked", true);
						$('input[type=radio][name="activeType"]:first').prop("checked", true);
						modalBox.close()
						layer.msg('卡续费成功')
						saveFlag = false
					} else {
						layer.msg(data.errorMsg)
						saveFlag = false
					}
				},
				error: function(xhr, type) {
					alert("错误")
					saveFlag = false
				}
			});
		}
	}

	//批量刷新
	function refleshFn(self) {
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
					self.scope.checkObj[self.pageData.page] = []
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
	};

	//高级查询
	function specialSearch(self, commonUrl) {
		var model = {
			id: "myModalsearch" //传入弹窗的ID
		};
		//		获取客户数据 
		$.ajax({
			type: 'POST',
			url: commonUrl + '/admin/TCustomer/voice/queryByPageInfo.action',
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
				customerUuid: "", //客户名称
				operator: "", //运营商
				simStatus: "", //卡片状态
				shareType: "", //共享类型
				cardType: "", //卡片类型
				remark: "", //备注关键词
				imei: "", //IMEI号码
				minImsi: "", //最小IMSI
				maxImsi: "", //最大IMSI
				createTimeStart: "", //发卡开始时间
				createTimeEnd: "", //发卡结束时间
				activateTimeStart: "", //激活开始时间
				activateTimeEnd: "", //激活结束时间
				stopTimeStart: "", //到期开始时间
				stopTimeEnd: "" //到期结束时间
			}, //查询模态框初始化所有参数
			searchData: {} //查询模态框传参的所有参数
		}

		boxObj.boxDom.querySelector("#searchSave").onclick = function() {
			for(var k in boxObj.initData) {
				if(k == "customerUuid") {
					boxObj.initData[k] = boxObj.boxDom.querySelector("._show").getAttribute('code');
				}else{
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
			console.log(commonUrl)
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

	//状态变更
	function stateFn(self, commonUrl) {
		paramsAll.iccid = []; //清空划拨的iccid的列表
		var boxObj = {
			boxDom: document.querySelector("#myModalstate"), //获取当前模态框的最高层
			ischeck: document.querySelector(".tbCWrap").querySelectorAll("[ischeck='true']"), //		获取勾选的卡号数量
			supplierUuid: [] //运营商id
		};
		//		判断是否有勾选 是否是同样的运营商
		if(boxObj.ischeck.length > 0) {
			console.log(boxObj)
			document.querySelector("#stateNum").innerHTML = boxObj.ischeck.length;
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
		document.querySelector("#stateSim").innerHTML = paramsAll.iccid.join(",\n");
		//		var params = {
		//			iccidList: paramsAll.iccid,
		//			simStatus: parseInt(document.querySelector("#stateSelect").value)
		//		}

		//		点击确定
		document.querySelector("#stateSave").onclick = function() {
			console.log(commonUrl)
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/simStatusChange.action',
				data: JSON.stringify({
					iccidList: paramsAll.iccid,
					simStatus: parseInt(document.querySelector("#stateSelect").value)
				}),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						layer.msg('更改状态成功')
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