ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];

	//对请求接口的数据整理
	function dpTableDataFn(data) {
		var tempObj = {
			'1': [],
			'2': [],
			'3': []
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
					break;
				}
			}
			//不属于 清空数据
			if(!flag) {
				defaultVal = '';
				defaultName = '';
				ss.mdfCss(
					parentDom.parentNode.parentNode.parentNode.parentNode.querySelector('[name="_dom_bt"]').children[0], ['display', 'none']
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

	//新增下拉框渲染
	function crtDomFn(dataArr, sData, dom, type, cbFn) {
		dom.innerHTML = '';
		ss.setDomTxt(dom.parentNode, '套餐名'); //赋值
		ss.mdfCss(
			dom.parentNode.parentNode.parentNode.parentNode.querySelector('[name="_dom_bt"]'), ['display', 'none']
		);
		ss.mdfCss(dom, ['height', dataArr.length < 5 ? 'auto' : 6 * 30 + 'px']);
		dom.parentNode.parentNode.setAttribute('code', ''); //code属性赋值
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
	var self = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TBagCustomerRetail/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			pageSize: 50, //没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '套餐名称',
				txt: 'bagCustomerRetailName',
				type: 'txt',
				width: '120px'
			},
			{
				name: '客户',
				txt: 'customerUuid',
				type: 'blurrySel',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TCustomer/terminalTcdj/queryByPageInfo.action',
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
				name: '运营商',
				txt: 'operatorName',
				type: 'select',
				width: '120px',
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
				]
			},
		],
		//搜索栏额外按钮
		searchBtn: {
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TBagCustomerRetail/addEntity.action',
				items: {
					customerUuid: {
						name: '客户',
						type: 'blurrySel',
						width: '80%',
						verify: true,
						data: {
							url: commonUrl + '/admin/TCustomer/terminalTcdj/queryByPageInfo.action',
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
						cbFn: function(dom, self, code, dtSelf) {
							var self = dtSelf;
							//父级元素
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							//请求列表数据
							self.eAjax({
								url: commonUrl + '/admin/TBagCustomer/terminalTcdj/queryByPageInfo.action',
								type: 'post',
								data: {
									customerUuid: dom.getAttribute('code'),
									operatorName: self['scope']['addParaObj'].operatorName,
									pageSize: 10000
								},
							}, {
								success: function(data) {
									if(data.data.data.length <= 0) {
										ss.layer.msg('该用户或运营商下没绑定套餐！');
										crtDomNewFn(
											self, [],
											'套餐名', parent.querySelector('[txt="bagCustomerUuid"]'), 'add');
										return;
									}
									var _endData = data.data.data;
									//整理成下拉框需要的数据
									var _tempArr = [];
									_endData.forEach(function(item) {
										_tempArr.push({
											name: item.bagCustomerName,
											code: item.uuid,
											curdata: item
										});
									});
									crtDomNewFn(
										self,
										_tempArr,
										'套餐名',
										parent.querySelector('[txt="bagCustomerUuid"]'),
										'add'
									);
								},
								isJson: true
							});
						}
					},
					flowLimit: {
						name: '套餐名称',
						type: 'txt',
						isShow: 'false'
					},
					operatorName: {
						name: '运营商',
						type: 'select',
						verify: true,
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
							//父级元素
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							//请求列表数据
							self.eAjax({
								url: commonUrl + '/admin/TBagCustomer/terminalTcdj/queryByPageInfo.action',
								type: 'post',
								data: {
									operatorName: dom.getAttribute('code'),
									customerUuid: self['scope']['addParaObj'].customerUuid,
									pageSize: 10000
								},
							}, {
								success: function(data) {
									if(data.data.data.length <= 0) {
										ss.layer.msg('该用户或运营商下没绑定套餐！');
										crtDomNewFn(
											self, [],
											'套餐名',
											parent.querySelector('[txt="bagCustomerUuid"]'),
											'add');
										return;
									}
									var _endData = data.data.data;
									//整理成下拉框需要的数据
									var _tempArr = [];
									_endData.forEach(function(item) {
										_tempArr.push({
											name: item.bagCustomerName,
											code: item.uuid,
											curdata: item
										});
									});

									crtDomNewFn(
										self,
										_tempArr,
										'平台套餐名',
										parent.querySelector('[txt="bagCustomerUuid"]'),
										'add'
									);
								},
								isJson: true
							});
						}
					},
					bagCustomerUuid: {
						name: '套餐名',
						type: 'blurrySel',
						width: '80%',
						verify: true,
						data: {
							url: commonUrl + '/admin/TBagCustomer/terminalTcdj/queryByPageInfo.action',
							dataType: 'json',
							data: {
								"pageSize": 1000
							},
							rely: {
								name: "bagCustomerName",
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
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							//信息展示容器
							var _dom_1 = parent.querySelector('[name="_dom_bt"]');
							//选择套餐->赋值套餐名
							self['scope']['addParaObj']['bagCustomerRetailName'] = dom.querySelector('._show').innerHTML;
							var curData = JSON.parse(dom.querySelector('._show').getAttribute('curdata'));
							//流量
							self['scope']['addParaObj']['flowLimit'] = curData.flowLimit;
							//选择套餐后 -> 对信息控制
							if(dom.innerHTML.indexOf('套餐名') != -1) {
								//隐藏信息
								ss.mdfCss(ss.getDom('[name="_dom_bt"]'), ['display', 'none']);
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
										//展示信息->并赋值
										ss.mdfCss(ss.getDom('[name="_dom_bt"]'), ['display', 'block']);
										ss.getDom('[name="_dom_bt"]').children[0].children[1].innerHTML =
											_typeObj.flow_type[_curPData.flowType] || '';

										ss.getDom('[name="_dom_bt"]').children[1].children[1].innerHTML =
											_typeObj.bag_select_num[_curPData.monthnum] || '';
									},
									isJson: true
								});
							};
						}
					},
					//空白dom->做详细内容展示
					_dom_bt: {
						name: 'dom',
						type: '_dom',
						isShow: 'false',
						renderFn: function(dom) {
							//套餐类型
							ss.crtDom('div', '', '', dom, {
									cn: ['display', 'padding'],
									cv: ['block', '10px 0px']
								})
								.appendDom(function(dom) {
									['套餐类型：', '...'].forEach(function(item, index) {
										ss.crtDom('div', '', item, dom, {
											cn: [
												'display', 'verticalAlign', 'width',
												'textAlign',
												'paddingRight',
											],
											cv: [
												'inline-block', 'top', index == 0 ? '40%' : '60',
												index == 0 ? 'right' : 'left',
												index == 0 ? '20px' : '0px',
											]
										})
									})
								});
							//最低数据
							ss.crtDom('div', '', '', dom, {
									cn: ['display', 'padding'],
									cv: ['block', '10px 0px']
								})
								.appendDom(function(dom) {
									['订购月数：', '...'].forEach(function(item, index) {
										ss.crtDom('div', '', item, dom, {
											cn: [
												'display', 'verticalAlign', 'width',
												'textAlign',
												'paddingRight',
											],
											cv: [
												'inline-block', 'top', index == 0 ? '40%' : '60',
												index == 0 ? 'right' : 'left',
												index == 0 ? '20px' : '0px',
											]
										})
									})
								});
						}
					},
					bagStatus: {
						name: '状态',
						type: 'select',
						verify: true,
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
					//					monthnum:{
					//						name: '订购月数',
					//						type: 'select',
					//						verify: true,
					//						data:{
					//							url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
					//							dataType:'json',
					//							data:{
					//								dickey:'bag_select_num',
					//							},
					//							rely: {
					//								name:"dicname",
					//								code:"dicvalue" 
					//							},
					//							digitalModel: {
					//								data: {
					//									location: ['data']
					//								}
					//							}
					//						},
					//					},
					bagCustomerRetailName: {
						name: '套餐名',
						type: 'num',
						isShow: 'false'
					},
					salePrice: {
						name: '售价',
						type: 'num',
						verify: true,
					}
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
						url: commonUrl + '/admin/TBagCustomerRetail/checkCustomerStatus.action',
						type: 'post',
						data: {
							uuids: _ids.join(',')
						},
					}, {
						success: function(data) {
							if(data.result == 'success') {
								if(data.data == 1) {
									self.eAjax({
										url: commonUrl + '/admin/TBagCustomerRetail/batchUpdateBagCustomerRetailStatus.action',
										type: 'post',
										data: {
											uuids: _ids.join(','),
											bagStatus: 0
										},
									}, {
										success: function(data) {
											if(data.result == 'success') {
												ss.layer.msg('上架成功！');
												self.scope.checkObj = {}; //重置勾选
												self.lg_reloadFn();
											}
										},
										isJson: true
									});
								} else {
									layer.msg('不允许上架');
								}
							}
						},
						isJson: true
					});
				}
			},
			mulUndercarriage: {
				name: '下架',
				colType: 'opt2',
				cbFn: function() {
					//循环对象，获取id集合
					var _ids = [];
					var checkDatas = self.scope.checkObj;
					for(var x in checkDatas) {
						checkDatas[x].forEach(function(item) {
							_ids.push(item.uuid);
						})
					};
					//上架
					self.eAjax({
						url: commonUrl + '/admin/TBagCustomerRetail/batchUpdateBagCustomerRetailStatus.action',
						type: 'post',
						data: {
							uuids: _ids.join(','),
							bagStatus: 1
						},
					}, {
						success: function(data) {
							if(data.result == 'success') {
								ss.layer.msg('下架成功！');
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
				//开启勾选框  
				isCheckbox: true,
				closeInterlace: true,
				isChangeTime: [],
				dpWith: {
					'bagCustomerRetailName': 8,
					'customerUuid': 5,
					'operatorName': 5,
					'flowLimit': 5,
					'bagStatus': 5,
					'salePrice': 7,
					'recommend': 4
				},
				showTitle: ['bagCustomerRetailName', 'customerUuid', 'operatorName',
					'businessType', 'flowType', 'bagCustomerRetailType', 'monthnum',
					'flowLimit', 'bagStatus',
					'salePrice', 'recommend'
				],
				shim: {
					operatorName: {
						'1': '移动',
						'2': '联通',
						'3': '电信',
					},
					businessType: {
						'1': '流量包',
						'2': '语音包',
					},
					flowType: {
						'0': '月包',
						'1': '季包',
						'2': '半年包',
						'3': '年包'
					},
					bagCustomerRetailType: {
						'1': '主套餐',
						'2': '叠加包',
					},
					recommend: {
						'1': '未推荐',
						'2': '已推荐'
					}
				},
				//动态别名转换
				urlData: {
					customerUuid: {
						url: commonUrl + '/admin/TCustomer/terminalTcdj/queryByPageInfo.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							currentPage: 1,
							pageSize: 1000
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
					},
					bagStatus: {
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
					}
				},
				cbFn: function(self) {
					//当前列表容器uls集合
                    window.setTimeout(function(){
                    	ss.polling({
						condition: function() {
							return self.domWrap.tbCWrap.querySelectorAll('ul').length > 0;
						},
						cbFn: function() {
							var curUls = self.domWrap.tbCWrap.querySelectorAll('ul');
							for(var i = 0; i < curUls.length; i++) {
								ss.mdfCss(curUls[i], ['position', 'relative']);
								//修改推荐状态
								var recommendDom = curUls[i].querySelector('[name="recommend"]');
								recommendDom.style.color = recommendDom.getAttribute('title') == '1'? 'blue':'#FF7F5B';
								recommendDom.style.cursor = 'pointer';
								recommendDom.setAttribute('index',i)
								recommendDom.onclick = function() {
									var index = this.getAttribute('index');
									var tableData = self.tableData.data;
									var curObj = tableData[index];
									var recommendState = this.getAttribute('title') == '1'?2:1;
									
									layer.confirm('确定修改推荐状态吗？', function() {
										var params = {
											uuid:curObj.uuid,
											recommend:recommendState
										}
										var fqObj = {
											url: '/admin/TBagCustomerRetail/recommend.action',
											type: 'post',
											data: JSON.stringify(params)
										};
										self.ajax(
											fqObj,
											//success
											function(data) {
												layer.close(index); //关闭询问窗
												layer.msg('推荐状态修改成功!');
												self.lg_reloadFn(); //表格重载
											},
											//complete
											function(data) {
												layer.close(index); //关闭询问窗
											},
											//beforeSend
											function(request) {
											    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
											}
										);
									})
								}

								//创建输入框
								var curPriceDom = curUls[i].querySelector('[name="salePrice"]');
								ss.mdfCss(curPriceDom, ['position', 'relative']);
								ss.crtDom('input', '_salePriceChange', '', curPriceDom, {
									cn: [
										'position', 'height', 'lineHeight', 'border', 'top', 'display', 'left',
										'borderRadius', 'fontSize', 'display'
									],
									cv: [
										'absolute', '28px', '26px', '1px solid #ccc', '4px', 'block', '10px',
										'4px', '13px', 'none'
									],
									an: ['type', 'value'],
									av: ['number', Number(curPriceDom.innerHTML)]
								});
								//创建按钮
								ss.crtDom('div', '', '改价', curPriceDom, {
									cn: [
										'position', 'top', 'right', 'height', 'lineHeight',
										'padding', 'backgroundColor', 'transform', 'color',
										'borderRadius', 'cursor', 'border', 'userSelect'
									],
									cv: [
										'absolute', '50%', '15px', '26px', '24px',
										'0px 15px', 'rgb(244, 248, 250)', 'translateY(-50%)', 'rgb(117, 117, 117)',
										'5px', 'pointer', '1px solid rgb(222, 228, 241)', 'none'
									],
									an: ['_index'],
									av: [i]
								}, [
									'click',
									function(dom) {
										if(dom.getAttribute('issel') == 'true') {
											self.eAjax({
												url: commonUrl + '/admin/TBagCustomerRetail/editEntity.action',
												type: 'post',
												data: {
													uuid: self.tableData.data[dom.getAttribute('_index')].uuid,
													salePrice: dom.parentNode.querySelector('._salePriceChange').value
												},
											}, {
												success: function(data) {
													if(data.result == 'success') {
														self.lg_reloadFn();
														ss.layer.msg('改价成功!');
													}
												},
												isJson: true
											})

											dom.innerHTML = '改价';
											dom.setAttribute('issel', 'false');
										} else {
											var _inputDom = dom.parentNode.querySelector('._salePriceChange');
											ss.mdfCss(_inputDom, ['display', 'block']);
											dom.innerHTML = '确定';
											dom.setAttribute('issel', 'true');
										};
										console.log(dom)
									}
								])
							}
						}
					});
                    },300)
				}
			},
			tlName: [
				'套餐名称', '客户', '运营商',
				'业务类型', '包体类型', '套餐类型', '订购月数',
				'包含流量(M)', '状态',
				'售价（元）', '推荐状态'
			], //表头名字
			tlTxt: [
				'bagCustomerRetailName', 'customerUuid', 'operatorName',
				'businessType', 'flowType', 'bagCustomerRetailType', 'monthnum',
				'flowLimit', 'bagStatus',
				'salePrice', 'recommend'
			], //表头字段
			//操作项
			operation: [
				//			{
				//					name: '已推荐',
				//					colType: 'opt1',
				//					rely: {
				//						recommend: '1'
				//					},
				//					cbFn: function(curData, self) {
				//						debugger
				//						self.ajax({
				//								url: commonUrl + '/admin/orgAutoTask/changeStatus.action',
				//								data: JSON.stringify({
				//									uuid: curData.uuid,
				//									taskStatus: 1
				//								}),
				//								type: 'POST',
				//							},
				//							function(res) {
				//								self.lg_reloadFn(); //表格重载
				//							},
				//							function() {},
				//							function(request) {
				//								request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				//							}
				//						)
				//					}
				//				},
				//				{
				//					name: '未推荐',
				//					colType: 'opt1',
				//					rely: {
				//						recommend: '2'
				//					},
				//					cbFn: function(curData, self) {
				//						debugger
				//						self.ajax({
				//								url: commonUrl + '/admin/orgAutoTask/changeStatus.action',
				//								data: JSON.stringify({
				//									uuid: curData.uuid,
				//									taskStatus: 1
				//								}),
				//								type: 'POST',
				//							},
				//							function(res) {
				//								self.lg_reloadFn(); //表格重载
				//							},
				//							function() {},
				//							function(request) {
				//								request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				//							}
				//						)
				//					}
				//				},
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});

})