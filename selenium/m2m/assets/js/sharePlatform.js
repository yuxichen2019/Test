﻿﻿
ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//模糊查询下拉框渲染
	function crtDomNewFn(self, renderData, name, parentDom, type) {
		var dtSelf = self;
		var addViewData = [];
		var editViewData = [];
		if(type == 'add') {
			addViewData = self.sourceObj.searchBtn.add.items;
		} else {
			var operationData = self.sourceObj.table.operation;
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
					editViewData[indexVal].cbFn && editViewData[indexVal].cbFn(parentDom.parentNode, self, self['scope']['code'], dtSelf);
				}
			}, //点击回调
			clearFn: function(self) {}, //清空回调
		});
	}
	//新增下拉框渲染
	function crtDomFn(self, dataArr, sData, dom, type, cbFn) {
		var defaultVal = dom.parentNode.getAttribute('code');
		var defaultName = dom.parentNode.innerHTML;
		var flag = false;
		if(defaultVal && defaultName) {
			for(var j = 0; j < dataArr.length; j++) {
				if(dataArr[j].code == defaultVal) {
					flag = true;
					return;
				}
			}
			if(!flag) { 
				dom.innerHTML = ''; //清空下拉
				ss.setDomTxt(dom.parentNode, sData); //赋值
				dom.parentNode.style.color = '#757575';
				dom.parentNode.setAttribute('code', ''); //code属性赋值
			}
		}
		dom.innerHTML = ''; //清空下拉
		dataArr.forEach(function(v, i) {
			ss.crtDom('p', '', v.name, dom, {
				cn: ['padding', 'color', 'fontSize', 'overflow', 'textOverflow', 'whiteSpace'],
				cv: ['0px 10px', i === 0 ? '#ccc' : '#333', '13px', 'hidden', 'ellipsis', 'nowrap'],
				an: ['code', '_index', 'curdata'],
				av: [v.code, i, JSON.stringify(v.curdata)]
			}, [
				'mouseenter',
				function(dom) {
					ss.mdfCss(dom, ['backgroundColor', 'rgb(41, 103, 153)', 'color', '#fff'])
				},
				'mouseleave',
				function(dom) {
					var isTF = dom.getAttribute('code') && dom.parentNode.parentNode.getAttribute('code') === dom.getAttribute('code'); //满足选中状态
					ss.mdfCss(dom, ['backgroundColor', isTF ? 'rgb(41, 103, 153)' : '#fff', 'color', isTF ? '#fff' : (dom.getAttribute('code') ? '#333' : '#ccc')]);
				},
				'click',
				function(dom, e) {
					if(type === 'edit') {
						ss.setDomTxt(dom.parentNode.parentNode, dom.innerHTML); //赋值
						dom.parentNode.parentNode.setAttribute('code', dom.getAttribute('code')); //code属性赋值
						self['scope']['editParaObj'][dom.parentNode.parentNode.getAttribute('name')] = dom.getAttribute('code');
						dom.parentNode.style.display = 'none'; //下拉框隐藏
						ss.getDom('.dateSvg', dom.parentNode.parentNode).style.transform = 'rotate(0deg)'; //icon旋转
						ss.mdfCss(dom.parentNode.parentNode, ['boxShadow', 'none', 'border', '1px solid #dee4f1', 'color', dom.getAttribute('code') ? '#000' : '#757575']);
					} else {
						ss.setDomTxt(dom.parentNode.parentNode, dom.innerHTML); //赋值
						dom.parentNode.parentNode.setAttribute('code', dom.getAttribute('code')); //code属性赋值
						self['scope']['addParaObj'][dom.parentNode.parentNode.getAttribute('name')] = dom.getAttribute('code');
						dom.parentNode.style.display = 'none'; //下拉框隐藏
						ss.getDom('.dateSvg', dom.parentNode.parentNode).style.transform = 'rotate(0deg)'; //icon旋转
						ss.mdfCss(dom.parentNode.parentNode, ['boxShadow', 'none', 'border', '1px solid #dee4f1', 'color', dom.getAttribute('code') ? '#000' : '#757575']); //
					}
					cbFn && cbFn(self, dom);
					e.stopPropagation();
				}
			])
		})
	};
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#sharePlatform')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TPoolPlatformBag/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '套餐名称',
				txt: 'bagPlatformName',
				type: 'txt',
				width: '200px'
			},
//			{
//				name: '套餐编码',
//				txt: 'bagPlatformCode',
//				type: 'txt',
//				width: '200px'
//			},
			{
				name: '请选择运营商',
				txt: 'operatorName',
				code: 0,
				type: 'select',
				width: '180px',
				data: _cd.operatorName
			},
			{
				name: '选择供应商',
				txt: 'suppliersName',
				code: 0,
				type: 'blurrySel',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TSuppliers/poolPlatformBag/queryByPageInfo.action',
					dataType: 'json',
					data: {
						pageSize: 1000000,
					},
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
				name: '套餐类型',
				txt: 'bagPlatformType',
				code: 0,
				type: 'select',
				width: '180px',
				data: _cd.bagPlatformPoolType
			}
		], //搜索栏额外按钮
		searchBtn: {
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TPoolPlatformBag/addEntity.action',
				items: {
					bagPlatformName: {
						name: '套餐名称',
						type: 'txt',
						verify: true
					},
					operatorName: {
						name: '运营商',
						type: 'select',
						data: [{
								name: '移动',
								code: '1'
							},
							{
								name: '联通',
								code: '2'
							},
							{
								name: '电信',
								code: '3'
							},
						],
						cbFn: function(dom, self) {
							//根据运营商去筛选供应商
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							self.eAjax({
								url: commonUrl + '/admin/TSuppliers/poolOperator/queryByPageInfo.action',
								type: 'post',
								data: {
									operator: dom.getAttribute('code'),
								},
							}, {
								success: function(data) {
									if(data.data.data.length <= 0) {
										ss.layer.msg('该运营商下没绑定供应商！');
										crtDomFn(
											self, [{
												name: '供应商',
												code: ''
											}],
											'供应商', parent.querySelector('[name="suppliersName"]').querySelector('.selectItems'));
										return;
									}
									var _endData = data.data.data;
									//整理成下拉框需要的数据
									var _tempArr = [];
									_endData.forEach(function(item) {
										_tempArr.push({
											name: item.supplierName,
											code: item.uuid,
											curdata: item
										});
									});
									crtDomFn(
										self, [{
											name: '供应商',
											code: ''
										}].concat(_tempArr),
										'供应商',
										parent.querySelector('[name="suppliersName"]').querySelector('.selectItems'),
										'add',
										function(self, dom) {
											var curData = JSON.parse(dom.getAttribute('curdata'));
											//赋值供应商
											self['scope']['addParaObj']['suppliersName'] = dom.getAttribute('code');
											//根据运营商去筛选供应商
											var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;

											//根据运营商和供应商去获取运营商的套餐
											self.eAjax({
												url: commonUrl + '/admin/TBagSuppliers/queryByPageInfo.action',
												type: 'post',
												data: {
													//运营商
													operatorName: self['scope']['addParaObj'].operatorName,
													//供应商
													suppliersName: dom.getAttribute('code'),
												},
											}, {
												success: function(data) {
													if(data.data.data.length <= 0) {
														ss.layer.msg('该运营商或运营商下没绑定套餐！');
														crtDomNewFn(
															self, [],
															'运营商套餐名称',
															parent.querySelector('[txt="bagSuppliersUuid"]'),
															'add');
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
														'运营商套餐名称',
														parent.querySelector('[txt="bagSuppliersUuid"]'),
														'add'
													);
												},
												isJson: true
											});
											//
										}
									);
								},
								isJson: true
							});

							//根据运营商和供应商去获取运营商的套餐
							self.eAjax({
								url: commonUrl + '/admin/TBagSuppliers/poolPlatformBag/queryByPageInfo.action',
								type: 'post',
								data: {
									//运营商
									operatorName: dom.getAttribute('code'),
									//供应商
									suppliersName: self['scope']['addParaObj'].suppliersName
								},
							}, {
								success: function(data) {
									if(data.data.data.length <= 0) {
										ss.layer.msg('该运营商或供应商下没绑定套餐！');
										crtDomNewFn(
											self, [],
											'运营商套餐名称', parent.querySelector('[txt="bagSuppliersUuid"]'), 'add');
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
										'运营商套餐名称',
										parent.querySelector('[txt="bagSuppliersUuid"]'),
										'add'
									);
								},
								isJson: true
							});

						},
						verify: true,
					},
					suppliersName: {
						name: '供应商',
						type: 'select',
						data: {
							url: commonUrl + '/admin/TSuppliers/poolPlatformBag/queryByPageInfo.action',
							dataType: 'json',
							data: {
								currentPage: 1,
								pageSize: 10000
							},
							rely: {
								name: "supplierName",
								code: "uuid"
							},
							digitalModel: {
								data: {
									location: ['data', 'data']
								}
							}
						},
						cbFn: function(dom, self) {
							//根据运营商去筛选供应商
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;

							//根据运营商和供应商去获取运营商的套餐
							self.eAjax({
								url: commonUrl + '/admin/TBagSuppliers/queryByPageInfo.action',
								type: 'post',
								data: {
									//运营商
									operatorName: self['scope']['addParaObj'].operatorName,
									//供应商
									suppliersName: dom.getAttribute('code'),
								},
							}, {
								success: function(data) {
									if(data.data.data.length <= 0) {
										ss.layer.msg('该运营商或运营商下没绑定套餐！');
										crtDomNewFn(
											self, [],
											'运营商套餐名称', parent.querySelector('[txt="bagSuppliersUuid"]'), 'add');
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
										'运营商套餐名称',
										parent.querySelector('[txt="bagSuppliersUuid"]'),
										'add'
									);
								},
								isJson: true
							});

						},
						verify: true,
					},
					bagSuppliersUuid: {
						name: '运营商套餐名称',
						type: 'blurrySel',
						width: '80%',
						verify: true,
						data: {
							url: commonUrl + '/admin/TBagSuppliers/poolPlatformBag/queryByPageInfo.action',
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
							//运营商套餐选择时 -> 显示信息
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							//信息展示容器
							var _dom_1 = parent.querySelector('[name="_dom_1"]');
							if(dom.innerHTML.indexOf('运营商套餐名称') != -1) {
								ss.mdfCss(
									_dom_1.children[0], ['display', 'none']
								);
							} else {
								//需要显示信息 -> 则去获取字典的数据
								self.eAjax({
									url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
									type: 'post',
									data: {

									},
								}, {
									success: function(data) {
										var _typeObj = {};
										var queryData = data.data;
										for(var q = 0; q < queryData.length; q++) {
											_typeObj[queryData[q].dickey] || (_typeObj[queryData[q].dickey] = {});
											_typeObj[queryData[q].dickey][queryData[q].dicvalue] = queryData[q].dicname;
										}
										ss.mdfCss(
											_dom_1.children[0], ['display', 'block']
										);
										//匹配那个套餐，进行数据渲染
										var _curName = dom.getAttribute('name');
										var _curData = self.scope.selDatas[_curName];
										var _curPData;
										for(var i = 0; i < _curData.length; i++) {
											if(_curData[i].uuid == dom.querySelector('._show').getAttribute('code')) {
												
												_curPData = _curData[i];
												break;
											};
										};

										//需要赋值的dom
										var needTxts = _dom_1.children[0].children;
										console.log(needTxts)
										var txts = [
											'businessType', 'bagSuppliersType',
											'flowType',
											'flowLimit',
										];
										var txtss = [
											'bag_business_type', 'bag_type',
											'flow_type',
											'b'
										]
										for(var j = 0; j < needTxts.length; j++) {
											needTxts[j].innerHTML =
												needTxts[j].innerHTML.slice(0, needTxts[j].innerHTML.indexOf('：') + 1) +
												(
													_typeObj[txtss[j]] ?
													_typeObj[txtss[j]][_curPData[txts[j]]] :
													(
														txts[j] == 'termMonth' ?
														(
															_curPData[txts[j]] ?
															_curPData[txts[j]] + '月' : _curPData['termDay'] + '天'
														) :
														_curPData[txts[j]]
													)
												)
										}

									},
									isJson: true
								});
							};
						}
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
										name: '业务类型'
									}, {
										name: '套餐类型'
									},
									{
										name: '包体类型'
									},
									{
										name: '包含流量'
									}
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
					bagPlatformType: {
						name: '套餐类型',
						type: 'select',
						data: {
							url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
							dataType: 'json',
							data: {
								dickey: 'bag_pool_type',
							},
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
						cbFn: function(dom, self) {
							//套餐类型为主套餐时 -> 限制流量
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							var limitType = parent.querySelector('[name="limitType"]');
							ss.mdfCss(limitType, [
								'display',
								dom.innerHTML.indexOf('主套餐') != -1 ? 'block' : 'none'
							]);
							if(dom.innerHTML.indexOf('主套餐') == -1) {
								//清空添加对象字段
								self['scope']['addParaObj']['limitType'] = '';
							}
						},
						verify: true
					},
					flowType: {
						name: '包体类型',
						type: 'select',
						data:[
						{code:'0',name:'月包'}
						],
//						data: {
//							url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
//							dataType: 'json',
//							data: {
//								dickey: 'flow_type',
//							},
//							rely: {
//								name: "dicname",
//								code: "dicvalue"
//							},
//							digitalModel: {
//								data: {
//									location: ['data']
//								}
//							}
//						},
						verify: true
					},
					flowLimit: {
						name: '包含流量(M)',
						type: 'num',
						verify: true
					},
					bagPlatformStatus: {
						name: '上下架',
						type: 'select',
						data: {
							url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
							dataType: 'json',
							data: {
								dickey: 'bag_status',
							},
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
					},
					limitType: {
						name: '超限策略',
						type: 'select',
						isShow: 'false',
						data: {
							url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
							dataType: 'json',
							data: {
								dickey: 'limit_type',
							},
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
					},
					costprice: {
						name: '成本',
						type: 'num',
						verify: true
					},

				}
			},
			mulGround: {
				name: '上架',
				colType: 'opt1',
				cbFn: function(self) {
					//循环对象，获取id集合
					var _ids = [];
					var checkDatas = self.scope.checkObj;
					for(var x in checkDatas) {
						checkDatas[x].forEach(function(item) {
							_ids.push(item.uuid);
						})
					};
					if(_ids.length <= 0) {
						ss.layer.msg('请先勾选套餐！');
						return;
					};
					//上架
					self.eAjax({
						url: commonUrl + '/admin/TBagPlatform/poolPlatformBag/updateStatus.action',
						type: 'post',
						data: {
							uuids: _ids.join(','),
							bagPlatformStatus: 0
						},
					}, {
						success: function(data) {
							if(data.result == 'success') {
								ss.layer.msg('操作成功！');
								self.scope.checkObj = {}; //重置勾选
								self.lg_reloadFn();
							}
						},
						isJson: true
					});
				}
			},
			mulUndercarriage: {
				name: '下架',
				colType: 'opt2',
				cbFn: function(self) {
					//循环对象，获取id集合
					var _ids = [];
					var checkDatas = self.scope.checkObj;
					for(var x in checkDatas) {
						checkDatas[x].forEach(function(item) {
							_ids.push(item.uuid);
						})
					};
					if(_ids.length <= 0) {
						ss.layer.msg('请先勾选套餐！');
						return;
					};
					//上架
					self.eAjax({
						url: commonUrl + '/admin/TBagPlatform/poolPlatformBag/updateStatus.action',
						type: 'post',
						data: {
							uuids: _ids.join(','),
							bagPlatformStatus: 1
						},
					}, {
						success: function(data) {
							if(data.result == 'success') {
								ss.layer.msg('操作成功！');
								self.scope.checkObj = {}; //重置勾选
								self.lg_reloadFn();
							}
						},
						isJson: true
					});
				}
			}
		},
		//表格内容
		table: {
			//各选项
			options: {
				isCheckbox: true,
				//				dpWPer: '180%',
				dpWith: {
					'bagPlatformName': 9,
					'operatorName': 9,
					'suppliersName': 9,
					'bagPlatformType': 5,
					'flowType': 5,
					'flowLimit': 6,
					'costprice': 6,
					'bagPlatformStatus': 5,
				},
				closeInterlace: true,
				isChangeTime: [],
				showTitle: ['bagPlatformName', 'operatorName', 'suppliersName',
					'bagPlatformType', 'flowType', 'flowLimit',
					'costprice', 'bagPlatformStatus'
				],
				sort: {},
				shim: {
					operatorName: {
						'1': '移动',
						'2': '联通',
						'3': '电信',
					},
				},
				//动态别名转换
				urlData: {
					suppliersName: {
						url: commonUrl + '/admin/TSuppliers/poolPlatformBag/queryByPageInfo.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							currentPage: 1,
							pageSize: 10000
						},
						rely: {
							name: "supplierName",
							code: "uuid"
						},
						digitalModel: {
							data: {
								location: ['data', 'data']
							}
						}
					},
					bagPlatformStatus: {
						url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							dickey: 'bag_status',
						},
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
					bagPlatformType: {
						url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							dickey: 'bag_pool_type',
						},
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
					flowType: {
						url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							dickey: 'flow_type',
						},
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
				},
				cbFn: function(curData) {
					//详情弹窗
					for(var i = 0; i < document.querySelector(".tbCWrap").querySelectorAll("[name='iccid']").length; i++) {
						document.querySelector(".tbCWrap").querySelectorAll("[name='iccid']")[i].style.cursor = "pointer";
						document.querySelector(".tbCWrap").querySelectorAll("[name='iccid']")[i].style.color = "#009900";
						document.querySelector(".tbCWrap").querySelectorAll("[name='iccid']")[i].style.textDecoration = "underline";
						document.querySelector(".tbCWrap").querySelectorAll("[name='iccid']")[i].onclick = function() {
							location.hash = "shareOperator_list";
						}
					}
				}
			},

			tlName: ['套餐名称', '运营商', '供应商',
				'套餐类型', '包体类型', '包含流量(M)',
				'成本(元)', '上下架状态',
			], //表头名字
			tlTxt: ['bagPlatformName', 'operatorName', 'suppliersName',
				'bagPlatformType', 'flowType', 'flowLimit',
				'costprice', 'bagPlatformStatus'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				{
					name: '编辑',
					url: commonUrl + '/admin/TBagPlatform/poolPlatformBag/editEntity.action',
					dataType: 'json',
					items: {
						bagPlatformName: {
							name: '套餐名称',
							type: 'txt',
							verify: true
						},
						operatorName: {
							name: '运营商',
							type: 'select',
							data: [{
									name: '移动',
									code: '1'
								},
								{
									name: '联通',
									code: '2'
								},
								{
									name: '电信',
									code: '3'
								},
							],
							cbFn: function(dom, self) {
								//根据运营商去筛选供应商
								var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
								self.eAjax({
									url: commonUrl + '/admin/TSuppliers/poolOperator/queryByPageInfo.action',
									type: 'post',
									data: {
										operator: dom.getAttribute('code'),
									},
								}, {
									success: function(data) {
										if(data.data.data.length <= 0) {
											ss.layer.msg('该运营商下没绑定供应商！');
											crtDomFn(
												self, [{
													name: '供应商',
													code: ''
												}],
												'供应商', parent.querySelector('[name="suppliersName"]').querySelector('.selectItems'));
											return;
										}
										var _endData = data.data.data;
										//整理成下拉框需要的数据
										var _tempArr = [];
										_endData.forEach(function(item) {
											_tempArr.push({
												name: item.supplierName,
												code: item.uuid,
												curdata: item
											});
										});
										crtDomFn(
											self, [{
												name: '供应商',
												code: ''
											}].concat(_tempArr),
											'供应商',
											parent.querySelector('[name="suppliersName"]').querySelector('.selectItems'),
											'edit',
											function(self, dom) {
												var curData = JSON.parse(dom.getAttribute('curdata'));
												//赋值供应商
												self['scope']['editParaObj']['suppliersName'] = dom.getAttribute('code');
												//根据运营商去筛选供应商
												var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;

												//根据运营商和供应商去获取运营商的套餐
												self.eAjax({
													url: commonUrl + '/admin/TBagSuppliers/queryByPageInfo.action',
													type: 'post',
													data: {
														//运营商
														operatorName: self['scope']['editParaObj'].operatorName,
														//供应商
														suppliersName: dom.getAttribute('code'),
													},
												}, {
													success: function(data) {
														if(data.data.data.length <= 0) {
															ss.layer.msg('该运营商或运营商下没绑定套餐！');
															crtDomNewFn(
																self, [],
																'运营商套餐名称',
																parent.querySelector('[txt="bagSuppliersUuid"]'),
																'edit');
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
															'运营商套餐名称',
															parent.querySelector('[txt="bagSuppliersUuid"]'),
															'edit'
														);
													},
													isJson: true
												});
												//
											}
										);
									},
									isJson: true
								});

								//根据运营商和供应商去获取运营商的套餐
								self.eAjax({
									url: commonUrl + '/admin/TBagSuppliers/poolPlatformBag/queryByPageInfo.action',
									type: 'post',
									data: {
										//运营商
										operatorName: dom.getAttribute('code'),
										//供应商
										suppliersName: self['scope']['editParaObj'].suppliersName
									},
								}, {
									success: function(data) {
										if(data.data.data.length <= 0) {
											ss.layer.msg('该运营商或供应商下没绑定套餐！');
											crtDomNewFn(
												self, [],
												'运营商套餐名称', parent.querySelector('[txt="bagSuppliersUuid"]'), 'edit');
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
											'运营商套餐名称',
											parent.querySelector('[txt="bagSuppliersUuid"]'),
											'edit'
										);
									},
									isJson: true
								});

							},
							verify: true,
						},
						suppliersName: {
							name: '供应商',
							type: 'select',
							data: {
								url: commonUrl + '/admin/TSuppliers/poolPlatformBag/queryByPageInfo.action',
								dataType: 'json',
								data: {
									currentPage: 1,
									pageSize: 10000
								},
								rely: {
									name: "supplierName",
									code: "uuid"
								},
								digitalModel: {
									data: {
										location: ['data', 'data']
									}
								}
							},
							cbFn: function(dom, self) {
								//根据运营商去筛选供应商
								var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;

								//根据运营商和供应商去获取运营商的套餐
								self.eAjax({
									url: commonUrl + '/admin/TBagSuppliers/queryByPageInfo.action',
									type: 'post',
									data: {
										//运营商
										operatorName: self['scope']['editParaObj'].operatorName,
										//供应商
										suppliersName: dom.getAttribute('code'),
									},
								}, {
									success: function(data) {
										if(data.data.data.length <= 0) {
											ss.layer.msg('该运营商或运营商下没绑定套餐！');
											crtDomNewFn(
												self, [],
												'运营商套餐名称', parent.querySelector('[txt="bagSuppliersUuid"]'), 'edit');
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
											'运营商套餐名称',
											parent.querySelector('[txt="bagSuppliersUuid"]'),
											'edit'
										);
									},
									isJson: true
								});

							},
							verify: true,
						},
						bagSuppliersUuid: {
							name: '运营商套餐名称',
							type: 'blurrySel',
							width: '80%',
							verify: true,
							data: {
								url: commonUrl + '/admin/TBagSuppliers/poolPlatformBag/queryByPageInfo.action',
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
								//运营商套餐选择时 -> 显示信息
								var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
								//信息展示容器
								var _dom_1 = parent.querySelector('[name="_dom_1"]');
								if(dom.innerHTML.indexOf('运营商套餐名称') != -1) {
									ss.mdfCss(
										_dom_1.children[0], ['display', 'none']
									);
								} else {
									//需要显示信息 -> 则去获取字典的数据
									self.eAjax({
										url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
										type: 'post',
										data: {

										},
									}, {
										success: function(data) {
											var _typeObj = {};
											var queryData = data.data;
											for(var q = 0; q < queryData.length; q++) {
												_typeObj[queryData[q].dickey] || (_typeObj[queryData[q].dickey] = {});
												_typeObj[queryData[q].dickey][queryData[q].dicvalue] = queryData[q].dicname;
											}
											ss.mdfCss(
												_dom_1.children[0], ['display', 'block']
											);
											//匹配那个套餐，进行数据渲染
											var _curName = dom.getAttribute('name');
											var _curData = self.scope.selDatas[_curName];
											var _curPData;
											for(var i = 0; i < _curData.length; i++) {
												if(_curData[i].uuid == dom.querySelector('._show').getAttribute('code')) {
													_curPData = _curData[i];
													break;
												};
											};

											//需要赋值的dom
											var needTxts = _dom_1.children[0].children;
											var txts = [
												'businessType', 'bagSuppliersType',
												'flowType',
												'flowLimit',
											];
											var txtss = [
												'bag_business_type', 'bag_type',
												'flow_type',
												'b'
											]
											for(var j = 0; j < needTxts.length; j++) {
												needTxts[j].innerHTML =
													needTxts[j].innerHTML.slice(0, needTxts[j].innerHTML.indexOf('：') + 1) +
													(
														_typeObj[txtss[j]] ?
														_typeObj[txtss[j]][_curPData[txts[j]]] :
														(
															txts[j] == 'termMonth' ?
															(
																_curPData[txts[j]] ?
																_curPData[txts[j]] + '月' : _curPData['termDay'] + '天'
															) :
															_curPData[txts[j]]
														)
													)
											}

										},
										isJson: true
									});
								};
							}
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
											name: '业务类型'
										}, {
											name: '套餐类型'
										},
										{
											name: '包体类型'
										},
										{
											name: '包含流量'
										}
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
						bagPlatformType: {
							name: '套餐类型',
							type: 'select',
							data: {
								url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
								dataType: 'json',
								data: {
									dickey: 'bag_pool_type',
								},
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
							cbFn: function(dom, self) {
								//套餐类型为主套餐时 -> 限制流量
								var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
								var limitType = parent.querySelector('[name="limitType"]');
								ss.mdfCss(limitType, [
									'display',
									dom.innerHTML.indexOf('主套餐') != -1 ? 'block' : 'none'
								]);
								if(dom.innerHTML.indexOf('主套餐') == -1) {
									//清空添加对象字段
									self['scope']['addParaObj']['limitType'] = '';
								}
							},
							verify: true
						},
						flowType: {
							name: '包体类型',
							type: 'select',
							data:[
							{code:'0',name:'月包'}
							],
//							data: {
//								url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
//								dataType: 'json',
//								data: {
//									dickey: 'flow_type',
//								},
//								rely: {
//									name: "dicname",
//									code: "dicvalue"
//								},
//								digitalModel: {
//									data: {
//										location: ['data']
//									}
//								}
//							},
							verify: true
						},
						flowLimit: {
							name: '包含流量(M)',
							type: 'num',
							verify: true
						},
						bagPlatformStatus: {
							name: '上下架',
							type: 'select',
							data: {
								url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
								dataType: 'json',
								data: {
									dickey: 'bag_status',
								},
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
						},
						limitType: {
							name: '超限策略',
							type: 'select',
							isShow: 'false',
							data: {
								url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
								dataType: 'json',
								data: {
									dickey: 'limit_type',
								},
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
						},
						costprice: {
							name: '成本',
							type: 'num',
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
	var paramsAll = {
		iccid: [], //选中的iccid列表
		uuid: "", //供应商uuid

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
		function redioAjax() {
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
					var option = "<option value='" + [0, ""] + "'>请选择套餐</option>";
					//				清空套餐下拉框
					document.querySelector("#xufeiPackage").innerHTML = "";
					if(datajson.result == "error") {
						document.querySelector("#xufeiPackage").innerHTML = option;
						return;
					}
					if(datajson.data == []) {
						document.querySelector("#xufeiPackage").innerHTML = option;
						return;
					}

					var appName = datajson.data;
					for(var i = 0; i < appName.length; i++) {
						var uuid = appName[i].uuid; //uuid
						var costprice = appName[i].costprice; //获取套餐价格
						var customerName = appName[i].bagPlatformName; //获取套餐名字
						if(appName[i]) {
							option += "<option value=" + [costprice, uuid] + ">" + customerName + "</option>"
						}
					}
					document.querySelector("#xufeiPackage").innerHTML = option;
					selectPrice() //计算价格
				},
				error: function(xhr, type) {
					alert("错误")
				}
			});
		}
		redioAjax();

		//		选择套餐变化时
		document.querySelector("#xufeuPrice").innerHTML = modalBox.costprice; //总价初始化
		document.querySelector("#xufeiPackage").onchange = function() {
			selectPrice()
		};
		document.querySelector("#xufeiNum").onchange = function() {
			selectPrice()
		}

		function selectPrice() {
			var ischeck = document.querySelector("#xufeiNum1").innerHTML //数量
			var price = document.querySelector("#xufeiPackage").value.split(",")[0]; //套餐价格
			var month = document.querySelector("#xufeiNum").value; //套餐月份
			modalBox.costprice = ischeck * price * month;
			document.querySelector("#xufeuPrice").innerHTML = modalBox.costprice.toFixed(2);
		}

		//		确定按钮
		document.getElementById('xufeiSave').onclick = function() {
			var params = {
				"iccidList": iccidList, //选中的iccid
				"packageId": document.querySelector("#xufeiPackage").value.split(",")[1], //套餐id
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
						self.scope.checkObj[self.pageData.page] = []
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