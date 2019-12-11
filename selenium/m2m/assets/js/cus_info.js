ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	var superiorCustomer = [];

	//对请求接口的数据整理
	function dpTableDataFn(data) {
		var tempObj = {
			'1': [],
			'2': [],
			'3': [],
			'4': []
		};
		for(var i = 0, iLen = data.length; i < iLen; i++) {
			data[i].level && (
				tempObj[data[i].level].push(data[i])
			);
		};
		return tempObj;
	};

	//平台套餐名的模糊查询下拉框渲染
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

	//新增下拉框渲染
	function crtDomFn(dataArr, sData, dom, type) {
		dom.innerHTML = '';
		ss.setDomTxt(dom.parentNode.parentNode, '上一级客户'); //赋值
		dom.parentNode.parentNode.setAttribute('code', ''); //code属性赋值
		dataArr.forEach(function(v, i) {
			ss.crtDom('p', '', v.name, dom, {
				cn: ['padding', 'color', 'fontSize', 'overflow', 'textOverflow', 'whiteSpace'],
				cv: ['0px 10px', i === 0 ? '#ccc' : '#333', '13px', 'hidden', 'ellipsis', 'nowrap'],
				an: ['code', '_index'],
				av: [v.code, i]
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
					e.stopPropagation();
				}
			])
		})
	};

	//右侧表格    
	//数据表格
	var self = ss.dataTable({ //64,369
		appendTo: $('#dataCon_cus')[0], //追加元素

		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TCustomer/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '客户姓名',
				txt: 'customerName',
				type: 'txt',
				width: '120px'
			},
			{
				name: '所属省市',
				txt: 'region',
				type: 'txt',
				width: '120px'
			},
		],
		//搜索栏额外按钮
		searchBtn: {
			//默认
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				saveEndFn: function(addObj) {
					//保存成功，先去查询，再添加
					var customerName = addObj.customerName; //客户名称，唯一，去获取用户id
					var customerType2 = addObj.customerType2; //套餐
					self.eAjax({
						url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
						type: 'post',
						data: {
							pageSize: '1000',
						},
					}, {
						success: function(data) {
							var _data = data.data.data;
							var _id = '';
							for(var a = 0; a < _data.length; a++) {
								if(_data[a].customerName == customerName) {
									_id = _data[a].uuid;
								};
							};
							//获得id->则添加
							if(_id) {
								self.eAjax({
									url: commonUrl + '/admin/TCustomerBag/addEntity.action',
									type: 'post',
									data: {
										bagUuid: customerType2,
										customerUuid: _id
									},
								}, {
									success: function(data) {
										console.log(data)

									},
									isJson: true
								});
							}
						},
						isJson: true
					});

				},
				url: commonUrl + '/admin/TCustomer/addEntity.action',

				items: {
					customerName: {
						name: '客户名称',
						type: 'txt',
						verify: true
					},
					phone: {
						name: '联系方式',
						type: 'txt',
						check: function(curQuery) {
							return {
								result: (curQuery.phone.length != 11 || isNaN(curQuery.phone)) ? true : false,
								tip: '联系方式为11位的数字！'
							};
						},
						verify: true
					},
					region: {
						name: '所属省市',
						type: 'txt',
						verify: true
					},
					level: {
						name: '客户级别',
						type: 'select',
						verify: true,
						data: [
							{
								name: '一级客户',
								code: '1'
							},
							{
								name: '二级客户',
								code: '2'
							}, 
							{
								name: '三级客户',
								code: '3'
							},
							{
								name: '虚拟客户',
								code: '4'
							}
						],
						cbFn: function(dom, self, txt) {
							var parent = dom.parentNode.parentNode.parentNode.parentNode.nextSibling;
						    var parent1 = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							if(dom.getAttribute("code") == "1" || dom.getAttribute("code") == []) {
								parent.style.display = "none";
								var superiorCustomerDom = parent.querySelector('[name="superiorCustomer"]');
								parent.setAttribute('code', '');
								superiorCustomerDom.setAttribute('code', '');
								ss.setDomTxt(superiorCustomerDom, '上一级客户');
								self['scope']['addParaObj']['superiorCustomer'] = '';
								
								//一级客户显示付费方式
								var payTypeDom = parent1.querySelector('[name="payType"]');
								payTypeDom.style.display = 'block'
								payTypeDom.setAttribute('code', '');
								ss.setDomTxt(payTypeDom, '付费方式');
								self['scope']['addParaObj']['payTypeDom'] = '';
								
							} else {
								
								
								//非一级客户隐藏付费方式
								var payTypeDom = parent1.querySelector('[name="payType"]');
								payTypeDom.style.display = 'none'
								payTypeDom.setAttribute('code', '');
								ss.setDomTxt(payTypeDom, '付费方式');
								self['scope']['addParaObj']['payTypeDom'] = '';
								
								
								
								
								//显示
								parent.style.display = "block";
								//请求列表数据
								self.eAjax({
									url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
									type: 'post',
									data: {
										pageSize: 10000,
										currentPage: 1
									},
								}, {
									success: function(data) {
										if(data.data.data.length <= 0) {
											ss.layer.msg('该运营商或运营商下没绑定套餐！');
											crtDomNewFn(
												self, [],
												'上一级客户', parent1.querySelector('[txt="superiorCustomer"]'), 'add');
											return;
										}
										var curTableData = dpTableDataFn(data.data.data);
										
										var _endData = curTableData[Number(dom.getAttribute('code')) - 1];
										
										//虚拟客户->特殊：可以选1、2、3级的客户
										if(dom.getAttribute('code')==4){
											_endData = [].concat(curTableData[1]).concat(curTableData[2]).concat(curTableData[3])
										}
										
										//整理成下拉框需要的数据
										var _tempArr = [];
										_endData.forEach(function(item) {
											_tempArr.push({
												name: item.customerName,
												code: item.uuid,
												curdata: item
											});
										});
										crtDomNewFn(
											self,
											_tempArr,
											'上一级客户',
											parent1.querySelector('[txt="superiorCustomer"]'),
											'add'
										);
										
										var superiorCustomerDom = parent.querySelector('[name="superiorCustomer"]');
										parent.setAttribute('code', '');
										superiorCustomerDom.setAttribute('code', '');
										
										superiorCustomerDom.querySelector('span').innerHTML = '上一级客户'
										superiorCustomerDom.querySelector('span').style.color = '#ccc'
										self['scope']['addParaObj']['superiorCustomer'] = '';
										
									},
									isJson: true
								});
							}
						}
					},
					superiorCustomer: {
						name: '上一级客户',
						type: 'blurrySel',
						width:'80%',
						data: {
							url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
							dataType: 'json',
							data: {
								"pageSize": 1000,
								'currentPage': 1
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
						styleNone: true,
						check: function(curQuery) {
							//单独字段校验->result结果为true时提示，tip为提示语
							var isTF = false;
							if((curQuery.level == 2 || curQuery.level == 3 || curQuery.level == 4) && !curQuery.superiorCustomer) {
								isTF = true;
							};
							return {
								result: isTF,
								tip: '二级和三级客户和虚拟客户必须选择上一级客户！'
							};
						},
						cbFn: function(dom, self, code, dtSelf) {
							
							var self = dtSelf;
							var _curName = dom.getAttribute('name');
							dtSelf['scope']['addParaObj'][_curName] = dom.querySelector('._show').getAttribute('code');
							var spandom = dom.querySelector('._show')  
							var curData = JSON.parse(spandom.getAttribute('curdata'));
							dtSelf['scope']['addParaObj']['payType'] = curData.payType; 
						} 
					},
					//					customerType2: {
					//						name: '套餐',
					//						type: 'mulSelect',
					//						data:{
					//							url:commonUrl + '/admin/TBag/queryByPageInfo.action',
					//							dataType:'json',
					//							data:{
					//		  						"pageSize": 1000
					//							},
					//							rely: {
					//								name:"bagName",
					//								code:"uuid" 
					//							},
					//							digitalModel: {
					//								data: {
					//									location: ['data', 'data']
					//								}
					//							}
					//						},
					//						verify:true
					//					},
					//					customerType: {
					//						name: '客户描述',
					//						type: 'txt',
					//						verify:true
					//					},
					
					payType: {
						name: '付费方式',
						type: 'select',
						data: [
							{
								name: '预付费',
								code: '1'
							},
							{
								name: '后付费',
								code: '2'
							}
						],
						check: function(curQuery) {
							//单独字段校验->result结果为true时提示，tip为提示语
							var isTF = false;
							if(curQuery.level == 1  && !curQuery.payType) {
								isTF = true;
							};
							return {
								result: isTF,
								tip: '一级客户必须选择付费方式！'
							};
						},
					},
					
					company: {
						name: '所属公司',
						type: 'txt'
					},
					receivingAccount: {
						name: '提现账号',
						type: 'txt'
					},
					email: {
						name: '邮箱地址',
						type: 'txt',
						/*check: function(curQuery) {
							var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
							return {
								result: reg.test(curQuery.email) ? false : true,
								tip: '请填写正确的邮箱地址！'
							};
						} */
					},
					remark: {
						name: '备注',
						type: 'txt'
					},
				},

			}
		},
		//表格内容 
		table: {
			//各选项
			options: {
				closeInterlace: true,
				//清空点击回调
				resetFn: function(self) {
					self.lg_getSelectParasFn();
					self.lg_reloadFn();
				},
				dpWPer: '120%',
				dpWith: {
					'customerName': 5,
					'loginid': 5,
					'region': 5,
					'level': 5,
					'superiorCustomer': 5,
					'createTime': 5,
					'receivingAccount': 5, 
					'balance': 5,
					'createPerson': 5,
					'remark': 5
				},
				showTitle: [
					'customerName', 'loginid', 'region',
					'level', 'superiorCustomer', 'createTime',
					'balance', 'createPerson', 'remark'
				],
				sort: {
					'createTime': true,
					'balance': true,
				},
				isChangeTime: ['createTime'], //是否进行时间戳转时间
				isOperationFixed: true, //开启操作栏固定功能
				shim: {
					payType: {
						'1': '预付费',
						'2': '后付费'
					}
				},
				//动态别名转换
				urlData: {
					superiorCustomer: {
						url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							currentPage: 1,
							pageSize: 10000
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
				}
			},
			tlName: [
				'客户姓名', '登陆id', '所属省市',
				'客户级别', '上一级客户', '创建时间', 
				'余额', '付费方式','提现账号','创建人', '备注'
			], //表头名字
			tlTxt: [
				'customerName', 'loginid', 'region',
				'level', 'superiorCustomer', 'createTime',
				'balance', 'payType','receivingAccount', 'createPerson', 'remark'
			], //表头字段 
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				{
					name: '编辑',
					url: commonUrl + '/admin/TCustomer/editEntity.action',
					dataType: 'json',
					saveEndFn: function(addObj) {
						//将编辑的数据存储
						//						var _editObj = self.scope._editObj;
						//						self.eAjax({
						//							url: commonUrl + '/admin/TCustomerBag/editEntity.action',
						//							type: 'post',
						//							data: {
						//								bagUuid: _editObj.dom.getAttribute('code'),
						//								customerUuid: _editObj.customerUuid,
						//								uuid: _editObj.uuid.join(',')
						//							},
						//						}, {
						//							success: function(data) {
						//								console.log(data)
						//
						//							},
						//							isJson: true
						//						});

					},
					items: {
						customerName: {
							name: '客户名称',
							type: 'txt',
							verify: true
						},
						phone: {
							name: '联系方式',
							type: 'txt',
							check: function(curQuery) {
								return {
									result: (curQuery.phone.length != 11 || isNaN(curQuery.phone)) ? true : false,
									tip: '联系方式为11位的数字！'
								};
							},
							verify: true
						},
						region: {
							name: '所属省市',
							type: 'txt',
							verify: true
						},
						payType: {
							name: '付费方式',
							type: 'select',
							data: [
								{
									name: '预付费',
									code: '1'
								},
								{
									name: '后付费',
									code: '2'
								}
							],
//							verify: true,
							rendEnd: function(dom,curData){
								if(curData.level!=1){
									var curTxt = ss.getDomTxt(dom);
									dom.parentNode.style.fontSize = '14px';
									dom.parentNode.innerHTML = curTxt;
								}
							}
						},
						
						
//						level: {
//							name: '客户级别',
//							type: 'select',
//							verify: true,
//							data: [
//								{
//									name: '一级客户',
//									code: '1'
//								},
//								{
//									name: '二级客户',
//									code: '2'
//								},
//								{
//									name: '三级客户',
//									code: '3'
//								},
//								{
//									name: '虚拟客户',
//									code: '4'
//								}
//							],
//							cbFn: function(dom, self) {
//								var parent = dom.parentNode.parentNode.parentNode.parentNode.nextSibling;
//								var parent1 = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
//								if(dom.getAttribute("code") == "1" || dom.getAttribute("code") == []) {
//									parent.style.display = "none";
//									var superiorCustomerDom = parent.querySelector('[name="superiorCustomer"]');
//									parent.setAttribute('code', '');
//									superiorCustomerDom.setAttribute('code', '');
//									ss.setDomTxt(superiorCustomerDom, '上一级客户');
//									self['scope']['editParaObj']['superiorCustomer'] = '';
//								} else {
//									//显示
//									parent.style.display = "block";
//									//请求列表数据
//									self.eAjax({
//										url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
//										type: 'post',
//										data: {
//											pageSize: 10000,
//											currentPage: 1
//										},
//									}, {
//										success: function(data) {
//											if(data.data.data.length <= 0) {
//												ss.layer.msg('该运营商或运营商下没绑定套餐！');
//												crtDomNewFn(
//													self, [],
//													'上一级客户', parent1.querySelector('[txt="superiorCustomer"]'), 'add');
//												return;
//											}
//											var curTableData = dpTableDataFn(data.data.data);
//											var _endData = curTableData[Number(dom.getAttribute('code')) - 1];
//											
//											//虚拟客户->特殊：可以选1、2、3级的客户
//											if(dom.getAttribute('code')==4){
//												_endData = [].concat(curTableData[1]).concat(curTableData[2]).concat(curTableData[3])
//											}
//											
//											//整理成下拉框需要的数据
//											var _tempArr = [];
//											_endData.forEach(function(item) {
//												_tempArr.push({
//													name: item.customerName,
//													code: item.uuid,
//													curdata: item
//												});
//											});
//											crtDomNewFn(
//												self,
//												_tempArr,
//												'上一级客户',
//												parent1.querySelector('[txt="superiorCustomer"]'),
//												'edit'
//											);
//
//
//											var superiorCustomerDom = parent.querySelector('[name="superiorCustomer"]');
//											parent.setAttribute('code', '');
//											superiorCustomerDom.setAttribute('code', '');
//											
//											superiorCustomerDom.querySelector('span').innerHTML = '上一级客户'
//											superiorCustomerDom.querySelector('span').style.color = '#ccc'
//											self['scope']['editParaObj']['superiorCustomer'] = '';
//
//										},
//										isJson: true
//									});
//								}
//							}
//						},
//						superiorCustomer: {
//							name: '上一级客户',
//							type: 'blurrySel',
//							width: '80%',
//							data: {
//								url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
//								dataType: 'json',
//								data: {
//									"pageSize": 1000,
//									'currentPage': 1
//								},
//								rely: {
//									name: "customerName",
//									code: "uuid"
//								},
//								digitalModel: {
//									data: {
//										location: ['data', 'data']
//									}
//								}
//							},
//							styleNone: true,
//							check: function(curQuery) {
//								//单独字段校验->result结果为true时提示，tip为提示语
//								var isTF = false;
//								if((curQuery.level == 2 || curQuery.level == 3 || curQuery.level == 4) && !curQuery.superiorCustomer) {
//									isTF = true;
//								};
//								return {
//									result: isTF,
//									tip: '二级和三级客户和虚拟客户必须选择上一级客户！'
//								};
//							},
//							cbFn: function(dom, self, code, dtSelf) {
//								var self = dtSelf;
//								var _curName = dom.getAttribute('name');
//								dtSelf['scope']['editParaObj'][_curName] = dom.querySelector('._show').getAttribute('code');
//							},
//							rendEnd: function(dom, curData) {
//								//								if(curData['level'] == 1) {
//								//									dom.parentNode.parentNode.style.display = 'none';
//								//									return;
//								//								}
//								//								//请求列表数据
//								//								self.eAjax({
//								//									url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
//								//									type: 'post',
//								//									data: {
//								//										pageSize: 10000,
//								//										currentPage: 1
//								//									},
//								//								}, {
//								//									success: function(data) {
//								//										console.log(data)
//								//										var curTableData = dpTableDataFn(data.data.data);
//								//										var _endData = curTableData[Number(curData['level']) - 1];
//								//										//整理成下拉框需要的数据
//								//										var _txt;
//								//										var _tempArr = [];
//								//										if(_endData && _endData.length > 0) {
//								//											_endData.forEach(function(item) {
//								//												_tempArr.push({
//								//													name: item.customerName,
//								//													code: item.uuid
//								//												});
//								//												if(curData['superiorCustomer'] == item.uuid) {
//								//													_txt = item.customerName;
//								//												}
//								//											})
//								//										}
//								//										ss.setDomTxt(dom, _txt);
//								//										ss.mdfAttr(dom, ['code', curData['superiorCustomer']]);
//								//										crtDomFn(
//								//											[{
//								//												name: '上一级客户',
//								//												code: ''
//								//											}].concat(_tempArr),
//								//											'', dom.querySelector('.selectItems'), 'edit');
//								//
//								//									},
//								//									isJson: true
//								//								});
//
//							},
//						},
						company: {
							name: '所属公司',
							type: 'txt'
						},
						receivingAccount: {
							name: '提现账号',
							type: 'txt'
						},
						email: {
							name: '邮箱地址',
							type: 'txt',
							/*check: function(curQuery) {
								var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
								return {
									result: reg.test(curQuery.email) ? false : true,
									tip: '请填写正确的邮箱地址！'
								};
							}*/
						},
						remark: {
							name: '备注',
							type: 'txt'
						},
					},
					data: {
						uuid: ''
					},
				},
				{
					name: '修改角色',
					colType: 'opt1',
					cbFn: function(curData) {
						ss.ssView.show({
								title: '修改角色',
								btnName: '保存',
								sureCliFn: function(_self) {
									//没值阻拦
									if(!ss.ssRadio.scope.curCode) {
										ss.layer.msg('请先选择角色！');
										return 'return'
									};
									//值没改变->直接提示
									if(ss.ssRadio.scope.curCode == ss.ssRadio.scope.bandRoleData.roleUuid) {
										ss.layer.msg('角色没改变！');
										return;
									};

									//保存用户
									self.eAjax({
										url: commonUrl + '/admin/userRole/addLoginuserRoleMap.action',
										type: 'post',
										data: {
											roleUuid: ss.ssRadio.scope.curCode,
											userUuid: curData.uuid
										},
									}, {
										success: function(data) {
											if(data.result == 'success') {
												ss.layer.msg('保存成功！');
											}
										},
										isJson: true
									});

									//移除原来的角色
									self.eAjax({
										url: commonUrl + '/admin/userRole/delLoginuserRoleMapById.action',
										type: 'post',
										data: {
											uuid: ss.ssRadio.scope.bandRoleData.uuid
										},
									}, {
										success: function(data) {
											if(data.result == 'success') {

											}
										},
										isJson: true
									});

								}
							})
							//渲染结束
							.renderOut(function(_self) {
								//先发送请求当前用户绑定的角色
								self.eAjax({
									url: commonUrl + '/admin/common/getUserRoleMaps.action',
									type: 'post',
									data: {
										userUuid: curData.uuid,
									},
								}, {
									success: function(data) {
										if(data.result == 'success') {
											var _queryData = (data.data && data.data[0] && data.data[0].roleUuid) || ''
											radioFn(_queryData, data.data && data.data[0]);
										}
									},
									isJson: true
								});

								//角色radio项
								function radioFn(_code, _saveAttr) {
									ss.ssRadio.scope.bandRoleData = _saveAttr || '';
									ss.ssRadio.show({
										appendTo: _self.domWrap.viewC_con,
										defaultCode: _code,
										item: {
											url: commonUrl + '/admin/role/queryRoleByPage.action',
											dataType: 'json',
											data: {
												currentPage: 1,
												pageSize: 10000,
												platformType: '2'
											},
											rely: {
												name: "roleName",
												code: "uuid"
											},
											digitalModel: {
												data: {
													location: ['data', 'data']
												}
											}
										}
									});
								};
							})
					}
				},
				{
					name: '重置密码',
					colType: 'opt2',
					cbFn: function(curData, self) {
						ss.layer.confirm(
							'是否确定重置此账户登录密码？', {
								btn: ['是', '否'] //按钮
							},
							function() {
								self.eAjax({
									url: commonUrl + '/admin/common/resetPassword.action',
									type: 'post',
									data: {
										uuid: curData.uuid,
										loginPass: '123456'
									},
								}, {
									success: function(data) {
										layer.closeAll();
										if(data.result == 'success') {
											ss.layer.msg('密码重置成功！');
										}
									},
									isJson: true
								});
							},
							function() {
								console.log(222)
							}
						);
					}
				}
				//				{
				//					name: '删除',
				//					colType: 'del',
				//					dataType: 'json',
				//					url: commonUrl + '/admin/TCustomer/deleteEnttiybyUuid.action',
				//					data: {
				//						uuid: ''
				//					}
				//				},
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});

	//左侧客户选择（假数据）

	$.ajax({
		url: commonUrl + '/admin/TCustomer/customerMenuList.action',
		type: 'post',
		dataType: 'json',
		data: JSON.stringify({}),
		beforeSend: function(request) {
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		},
		success: function(data) {
			new ss.userMenu({
				data: {
					childMenus: data.data
				},
				width: '170px', 
				appendTo: ss.getDom('#ly_aside11'),
				//点击客户项的回调函数
				cliCbFn: function(dom) {
					var uuidDoms = dom.parentNode.parentNode.querySelectorAll('span[uuid]');
					var uuids = [];
					for(var i = 0; i < uuidDoms.length; i++) {
						uuids.push(uuidDoms[i].getAttribute('uuid'));
					}

					self.sourceObj.dataOption.extraPara = {
						uuidListStr: uuids.join()
					};
					self.lg_reloadFn()
				}
			}); //docNavMenu

		}
	})

})