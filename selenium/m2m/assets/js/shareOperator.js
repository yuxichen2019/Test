﻿﻿﻿
ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	var queryData = {
		operatorCode:2
	}
	var params = {
		operator: 1,
		pageSize: 10000
	}
	var params1 = {
		operatorName: 1,
		pageSize: 10000
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
		var defaultVal = parentDom.querySelector('._show').getAttribute('code') || '';
		var defaultName = parentDom.querySelector('._show').innerHTML || '';
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
				ss.mdfCss(
					parentDom.parentNode.parentNode.parentNode.parentNode.querySelector('[name="_dom_1"]').children[0], ['display', 'none']
				);
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
		appendTo: $('#shareOperator')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TPoolOperator/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify(queryData),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '请输入共享池名称',
				txt: 'opPoolName',
				type: 'txt',
				width: '200px'
			},
			{
				name: '选择供应商',
				txt: 'suppliersUuid',
				code: 0,
				type: 'blurrySel',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TSuppliers/poolOperator/queryByPageInfo.action',
					dataType: 'json',
					data: params1,
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

			{
				name: '请选择单卡套餐',
				txt: 'bagPlatformUuid',
				code: 0,
				type: 'blurrySel',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TBagSuppliers/poolOperator/queryByPageInfo.action',
					dataType: 'json',
					data: params1,
					rely: {
						name: 'bagSuppliersName',
						code: 'uuid'
					},
					digitalModel: {
						data: {
							location: ['data', 'data']
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
				url: commonUrl + '/admin/TPoolOperator/addEntity.action',
				items: {
					opPoolName: {
						name: '共享池名称',
						type: 'txt',
						verify: true
					},
					suppliersName: {
						name: '供应商',
						type: 'select',
						verify: true,
						data: {
							url: commonUrl + '/admin/TSuppliers/poolOperator/queryByPageInfo.action',
							dataType: 'json',
							data: params1,
							rely: {
								name: 'supplierName',
								code: 'uuid'
							},
							digitalModel: {
								data: {
									location: ['data', 'data']
								}
							}
						},
						cbFn: function(dom, self) {
							//根据供应商的套餐
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							self.eAjax({
								url: commonUrl + '/admin/TBagSuppliers/poolOperator/queryByPageInfo.action',
								type: 'post',
								data: {
									//供应商
									suppliersName: dom.getAttribute('code'),
									//页数大小
									pageSize: 10000
								},
							}, {
								success: function(data) {
									if(data.data.data.length <= 0) {
										ss.layer.msg('该供应商下没绑定套餐！');
										crtDomNewFn(
											self, [],
											'单卡套餐', parent.querySelector('[txt="singleBagCode"]'), 'add');
										return;
									}
									var _endData = data.data.data;
									//整理成下拉框需要的数据
									var _tempArr = [];
									_endData.forEach(function(item) {
										_tempArr.push({
											name: item.bagSuppliersName,
											code: item.uuid,
											curdata: item
										});
									});
									crtDomNewFn(
										self,
										_tempArr,
										'单卡套餐',
										parent.querySelector('[txt="singleBagCode"]'),
										'add'
									);
								},
								isJson: true
							});

						},
					},
					singleBagCode: {
						name: '单卡套餐',
						type: 'blurrySel',
						width: '80%',
						data: {
							url: commonUrl + '/admin/TBagSuppliers/poolOperator/queryByPageInfo.action',
							dataType: 'json',
							data: {
								"pageSize": 1000
							},
							rely: {
								name: "bagSuppliersName",
								code: "uuid"
							},
							digitalModel: {
								data: {
									location: ['data', 'data']
								}
							}
						},
						cbFn: function(dom, self, code, dtSelf) {
							var self = dtSelf;
							//套餐选择时 -> 显示信息
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							//信息展示容器
							var _dom_1 = parent.querySelector('[name="_dom_1"]');
							if(dom.innerHTML.indexOf('单卡套餐') != -1) {
								ss.mdfCss(
									_dom_1.children[0], ['display', 'none']
								);
							} else {
								ss.mdfCss(
									_dom_1.children[0], ['display', 'block']
								);
								//供应商对应的套餐
								var _curName = dom.getAttribute('name');
								var bagData = self.scope.selDatas[_curName];
								var curInfo = {};
								for(var i = 0; i < bagData.length; i++) {
									if(bagData[i].uuid == code) {
										curInfo = bagData[i];
									}
								}
								//对参数赋值
								self['scope']['addParaObj'][_curName] = dom.querySelector('._show').getAttribute('code');
								//需要赋值的dom
								var needTxts = _dom_1.children[0].children;
								var txts = [
									'flowLimit', 'settlementDay',
								];
								for(var j = 0; j < needTxts.length; j++) {
									var html = '';
									if(txts[j] == 'flowLimit') {
										if(curInfo[txts[j]] == 0) {
											html = '无限量'
										} else {
											html = curInfo[txts[j]] || ''
										}
									} else {
										html = curInfo[txts[j]] || ''
									}

									needTxts[j].innerHTML =
										needTxts[j].innerHTML.slice(0, needTxts[j].innerHTML.indexOf('：') + 1) + html
								};
							};
						},
						verify: true
					},
					//空白dom->做详细内容展示
					_dom_1: {
						name: 'dom',
						type: '_dom',
						renderFn: function(dom) {
							ss.crtDom('div', '', '', dom, {
								cn: ['borderTop', 'borderBottom', 'display', 'padding'],
								cv: ['1px dashed #ccc', '1px dashed #ccc', 'none', '10px 0px']
							}).appendDom(function(dom) {
								[{
										name: '单卡流量'
									},
									{
										name: '结算日'
									},
								]
								.forEach(function(item, index) {
									ss.crtDom('div', '', item.name + '：', dom, {
										cn: [
											'display', 'verticalAlign', 'width', 'fontSize', 'textAlign',
											'paddingRight', 'paddingLeft', 'marginTop'
										],
										cv: [
											'inline-block', 'top', (index + 1) % 2 == 0 ? '50%' : '50%', '14px',
											(index + 1) % 2 == 0 ? 'left' : 'right',
											(index + 1) % 2 == 0 ? '0px' : '20px',
											(index + 1) % 2 == 0 ? '20px' : '0px', '5px'
										]
									});
								})

							});
						}
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
				},

			},
			alertSetting: {
				name: '预警设置',
				colType: 'opt2',
				cbFn: function(self) {
					alertSetting(self, commonUrl);
				}
			}
		},
		//表格内容
		table: {
			//各选项
			options: {
				isCheckbox: true,
				isSingle: true,
				dpWPer: '135%',
				dpWith: {
					'opPoolName': 8,
					'suppliersName': 6,
					'bagSuppliersName': 9,
					'flowLimit': 7,
					'totalCardNum': 6,
					'totalActivityCard': 6,
					'totalFlowLimit': 5,
					'totalUsedFlow': 5,
					'totalUnusedFlow': 7,
					'poolLimitType': 5,
					 'warnPercent':7,
					 'linkPhone':8,
					'createTime': 8,
				},
				closeInterlace: true,
				isChangeTime: ['createTime'],
				showTitle: ['opPoolName', 'suppliersName', 'bagSuppliersName',
					'flowLimit', 'totalCardNum', 'totalActivityCard',
					'totalFlowLimit', 'totalUsedFlow', 'totalUnusedFlow',
					'poolLimitType', 'warnPercent','linkPhone', 'createTime'
				],
				sort: {
				},
				shim: {
					'poolLimitType':{
								0:'无限量',
								1:'降速',
								2:'停卡',
								3:'计费使用'
						
					}
				},
//								urlData: {
//									singleBagCode: {
//										url: commonUrl + '/admin/TBagSuppliers/poolOperator/queryByPageInfo.action',
//										type: 'post', //默认post请求
//										dataType: "json",
//										contentType: "application/json",
//										data: {
//											currentPage: 1,
//											pageSize: 10000
//										},
//										rely: {
//											name: 'bagSuppliersName',
//										    code: 'uuid'
//										},
//										digitalModel: {
//											data: {
//												location: ['data', 'data']
//											}
//										}
//									},
//								},
				cbFn: function(curData) {
					//详情弹窗
					for(var i = 0; i < document.querySelector(".tbCWrap").querySelectorAll("[name='opPoolName']").length; i++) {
						document.querySelector(".tbCWrap").querySelectorAll("[name='opPoolName']")[i].style.cursor = "pointer";
						document.querySelector(".tbCWrap").querySelectorAll("[name='opPoolName']")[i].style.color = "#009900";
						document.querySelector(".tbCWrap").querySelectorAll("[name='opPoolName']")[i].style.textDecoration = "underline";
						document.querySelector(".tbCWrap").querySelectorAll("[name='opPoolName']")[i].setAttribute('index', i)
						document.querySelector(".tbCWrap").querySelectorAll("[name='opPoolName']")[i].onclick = function() {
							var curObj = curData.tableData.data[this.getAttribute('index')]
							localStorage.setItem('opPoolUuid', curObj.uuid)
							localStorage.setItem('opPoolName', curObj.opPoolName)
							location.hash = "shareOperator_list";
						}
					}
				}
			},
			tlName: ['共享池名称', '供应商', '单卡套餐',
				'单卡可用量（M）', '总卡数（张）', '生效卡数（张）',
				'可用量（G）', '已用量（G）', '剩余用量（G）',
				'池超量策略', '预警百分比（%）','预警电话',"创建日期"
			], //表头名字
			tlTxt: ['opPoolName', 'suppliersName', 'bagSuppliersName',
				'flowLimit', 'totalCardNum', 'totalActivityCard',
				'totalFlowLimit', 'totalUsedFlow', 'totalUnusedFlow',
				'poolLimitType', 'warnPercent','linkPhone','createTime'
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
				url: commonUrl + '/admin/TPoolOperator/editEntity.action',
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
						parentDom.querySelector(".close").click();
						instance.lg_reloadFn()
					} else {
						layer.msg(res.errorMsg || '保存失败');
						parentDom.querySelector(".close").click();
					}
				},
				error: function(err) {

				}
			})
		}
	}

	//	tap切换
	$("#shareOperator .unicom").click(function() {
		$('#mobile').removeClass('active');
		$('#unicom').addClass('active');
		queryData = {
			operatorCode: 2
		};
		params1 = {
			operatorName: 2,
			pageSize: 10000
		}
		params = {
			operator: 2,
			pageSize: 10000
		}
		
		instance.sourceObj.dataOption.data = JSON.stringify(queryData)
		instance.sourceObj.searchBtn.add.items.suppliersName.data.data = params;
		instance.sourceObj.searchOption[1].data.data = params;
		instance.sourceObj.searchOption[2].data.data = params1;
		instance.rd_searchFn()
		instance.lg_reloadFn();
	})
	//	tap切换
	$("#shareOperator .mobile").click(function() {
		$('#unicom').removeClass('active');
		$('#mobile').addClass('active');
		queryData = {
			operatorCode: 1
		};
		params = {
			operator: 1,
			pageSize: 10000
		}
		params1 = {
			operatorName: 1,
			pageSize: 10000
		}
		instance.sourceObj.dataOption.data = JSON.stringify(queryData)
		instance.sourceObj.searchBtn.add.items.suppliersName.data.data = params;
		instance.sourceObj.searchOption[1].data.data = params;
		instance.sourceObj.searchOption[2].data.data = params1;
		instance.rd_searchFn()
		instance.lg_reloadFn();
	})
})