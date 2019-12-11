ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
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
	//平台套餐名的下拉框渲染
	function crtDomFn(dataArr, sData, dom, type, cbFn) {
		dom.innerHTML = '';
		ss.setDomTxt(dom.parentNode, '平台套餐名'); //赋值
		ss.mdfCss(
			dom.parentNode.parentNode.parentNode.parentNode.querySelector('[name="_dom_1"]').children[0], ['display', 'none']
		);
		dom.parentNode.setAttribute('code', ''); //code属性赋值
		ss.mdfCss(dom, ['height', dataArr.length < 5 ? 'auto' : 6 * 30 + 'px']);
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
	//订购月数渲染
	function crtDGDomFn(self, type) {
		var _self = self;
		//订购月数的dom
		var dgDom = _self.domWrap.viewC_con.querySelector('[name="monthnum"]').children[1];
		//清空添加的数据
		self['scope']['addParaObj'].monthnum = '';
		if(type == 'y') {
			//修改显示名字
			var _tDom = ss.getDom('[name="monthnum"]',_self.domWrap.viewC_con).children[0];
			_tDom.innerHTML = '*订购月数：';
			//存在input->则隐藏
			dgDom.querySelector('._inputTxt') && (dgDom.querySelector('._inputTxt').style.display = 'none');
			var monthnumDom = dgDom.querySelector('[name="monthnum"]');
			ss.setDomTxt(monthnumDom, '订购月数');
			monthnumDom.style.display = 'block';
		} else {
			//修改显示名字
			var _tDom = ss.getDom('[name="monthnum"]',_self.domWrap.viewC_con).children[0];
			_tDom.innerHTML = '*订购数量：';
			dgDom.querySelector('._inputTxt') ?
				(dgDom.querySelector('._inputTxt').style.display = 'block') :
				//非月包
				ss.crtDom('input', '_inputTxt', '', dgDom, {
					cn: ['width', 'height', 'borderBottom', 'fontSize', 'marginTop'],
					cv: ['100%', '30px', '1px solid rgb(204, 204, 204)', '14px', '6px'],
					an: ['palceholder', 'type'],
					av: ['订购月数', 'number']
				}, [
					'change',
					function(dom, value) {
						self['scope']['addParaObj']['monthnum'] = dom.value;
					}
				]);
			dgDom.querySelector('[name="monthnum"]').style.display = 'none'
		};
	};

	//数据表格
	var self = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TPoolBagCustomer/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [
			{
				name: '套餐名称', txt: 'bagCustomerName', type: 'txt', width: '120px'
			},
			{
				name: '客户',
				txt: 'customerUuid', type: 'blurrySel', width: '180px',
				data: _cd.customerUuid,
			},
			{
				name: '运营商', txt: 'operatorName', type: 'select', width: '120px',
				data: _cd.operatorName
			},
			{
				name: '套餐类型', txt: 'bagPlatformType', type: 'select', width: '120px',
				data: _cd.bagPlatformPoolType
			}
		],
		//搜索栏额外按钮
		searchBtn: {
			add: {
				name: '添加+', colType: 'add', dataType: 'json',
				extraPara:{
					monthnum: 1
				},
				url: commonUrl + '/admin/TBagCustomer/poolBagCustomer/addEntity.action',
				//调整最后提交的参数
				adjust: function(paraObj){
					var _paraObj = paraObj;
					//非月包：季包1 | 半年包2 | 年包3
					//monthnum 订购月数 flowType
					if(paraObj.flowType != 0){
						switch(paraObj.flowType){
							case 1:
							  	_paraObj.monthnum = Number(_paraObj.monthnum)*3
						    break;
							case 2:
							  	_paraObj.monthnum = Number(_paraObj.monthnum)*6
							break;
							case 3:
							  	_paraObj.monthnum = Number(_paraObj.monthnum)*12
							break;
						}
					}
					return _paraObj;
				},
				items: {
					bagCustomerName: { 
						name: '套餐名称', type: 'txt', verify: true,
					},
					customerUuid: {
						name: '客户名称', type: 'blurrySel', width: '80%', verify: true,
						data: _cd.customerUuid,
					},
					operatorName: {
						name: '运营商', type: 'select', verify: true,
						data: _cd.operatorName,
						cbFn: function(dom, self) {
							//根据运营商和供应商去获取运营商的套餐
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							self.eAjax({
								url: commonUrl + '/admin/TPoolPlatformBag/poolBagCustomer/queryByPageInfo.action',
								type: 'post',
								data: {
									//运营商
									operatorName: dom.getAttribute('code'),
									//页数大小
									pageSize: 10000
								},
							}, {
								success: function(data) {
									if(data.data.data.length <= 0) {
										ss.layer.msg('该运营商或运营商下没绑定套餐！');
										crtDomNewFn(
											self, [],
											'平台套餐名', parent.querySelector('[txt="bagPlatformUuid"]'), 'add');
										return;
									}
									var _endData = data.data.data;
									//整理成下拉框需要的数据
									var _tempArr = [];
									_endData.forEach(function(item) {
										_tempArr.push({
											name: item.bagPlatformName,
											code: item.uuid,
											curdata: item
										});
									});
									crtDomNewFn(
										self,
										_tempArr,
										'平台套餐名',
										parent.querySelector('[txt="bagPlatformUuid"]'),
										'add'
									);
								},
								isJson: true
							});

						},
					},
					bagCustomerType: {
						name: '客户定价套餐类型',
						type: 'txt',
						isShow: 'false'
					},
					bagPlatformUuid: {
						name: '套餐名称', type: 'blurrySel', width: '80%', verify: true,
						data: _cd.bagPlatformUuid,
						cbFn: function(dom, self, code, dtSelf) {
							var self = dtSelf;
							//运营商套餐选择时 -> 显示信息
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							//信息展示容器
							var _dom_1 = parent.querySelector('[name="_dom_1"]');
							if(dom.innerHTML.indexOf('平台套餐名') != -1) {
								ss.mdfCss( _dom_1.children[0], ['display', 'none'] );
							} else {
								//需要显示信息 -> 则去获取字典的数据
								self.eAjax({
									url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
									type: 'post',
									data: { },
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
										//对参数赋值
										self['scope']['addParaObj'][_curName] = dom.querySelector('._show').getAttribute('code');
										self['scope']['addParaObj']['flowType'] = _curPData['flowType'];
										self['scope']['addParaObj']['bagPlatformType'] = _curPData['bagPlatformType'];
										self['scope']['addParaObj']['businessType'] = _curPData['businessType'];
										self['scope']['addParaObj']['flowLimit'] = _curPData['flowLimit'];
										self['scope']['addParaObj']['limitType'] = _curPData['limitType'];
										//套餐码
										//self['scope']['addParaObj']['bagPlatformCode'] = _curPData['bagSuppliersCode'];

										//需要赋值的dom
										var needTxts = _dom_1.children[0].children;
										var txts = [  'flowType', 'flowLimit'  ];
										var txtss = [ 'flow_type', 'flow_limit'  ];
										for(var j = 0; j < needTxts.length; j++) {
											needTxts[j].innerHTML =
												needTxts[j].innerHTML.slice(0, needTxts[j].innerHTML.indexOf('：') + 1) +
												(
													_typeObj[txtss[j]] ?
													_typeObj[txtss[j]][_curPData[txts[j]]] :
													_curPData[txts[j]]
												)
										};
										//根据所选的平台套餐的包体类型->订购月数呈现方式不同(非月包数字输入)
										//包体类型0.月包 1.季包 2.半年包 3.年包'
//										crtDGDomFn(self, _curPData.flowType == 0 ? 'y' : 'uy');
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
							})
							.appendDom(function(dom) {
								[ { name: '包体类型' }, { name: '包含流量' } ]
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
					bagStatus: {
						name: '状态', type: 'select', verify: true, data: _cd.bagStatus
					},
					
//					monthnum: {
//						name: '订购月数', type: 'select', verify: true, data: _cd.monthnum,
//						check: function(paraObj) {
//							return {
//								result: paraObj.flowType == 0 ? false : (
//									isNaN(paraObj.monthnum) ? true :
//									(
//										Number(paraObj.monthnum) < 0 ? true : false
//									)
//								),
//								tip: '请输入非负数的数字！'
//							}
//						}
//					},
					salePrice: {
						name: '售价', type: 'num', verify: true,
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
						url: commonUrl + '/admin/TPoolBagCustomer/batchUpdateStatus.action',
						type: 'post',
						data: {
							uuids: _ids.join(','),
							bagStatus: 0
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
						url: commonUrl + '/admin/TPoolBagCustomer/batchUpdateStatus.action',
						type: 'post',
						data: {
							uuids: _ids.join(','),
							bagStatus: 1
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
				closeInterlace: true,
				isChangeTime: [],
				dpWith: {
					'bagCustomerName': 8,'customerUuid': 5,
					'flowLimit': 3, 'bagStatus': 3, 'salePrice': 3 ,'monthnum':3,'operatorName':3,
					'bagPlatformType':3,'flowType':3
				},
				showTitle: ['bagCustomerName', 'bagCustomerCode','customerUuid', 'operatorName', 'bagPlatformType',
				'flowType', 'flowLimit',
				'monthnum', 'salePrice', 'bagStatus'
				],
				shim: {
					operatorName: _cd.re_operatorName,
					bagPlatformType: _cd.re_bagPlatformPoolType,
					businessType: _cd.re_businessType
				},
				//开启勾选框  
				isCheckbox: true,
				//动态别名转换
				urlData: {
					customerUuid: _cd.customerUuid,
					bagStatus: _cd.bagStatus,
					flowType: _cd.flowType,
				}
			},
			tlName: [
				'套餐名称', '套餐编码','客户名称', '运营商',  '套餐类型',
				'包体类型','包含流量(M)',
//				'业务类型', 
				'订购月数', '售价（元）' ,'状态',
				
			], //表头名字
			tlTxt: [
				'bagCustomerName', 'bagCustomerCode','customerUuid', 'operatorName', 'bagPlatformType',
				'flowType', 'flowLimit',
				'monthnum', 'salePrice', 'bagStatus'
			], //表头字段
			//操作项
			operation: [
				{
					name: '改价',
					url: commonUrl + '/admin/TBagCustomer/poolBagCustomer/editEntity.action',
					flag:'edit',
					dataType: 'json',
					items: {
						salePrice: { 
							name: '售价（元）', type: 'num',  verify:true,
							check:function(paraObj){
								var salePrice = paraObj.salePrice;
								return {
									result:Number(salePrice)<0 ? true : false,
									tip:'售价请输入非负数的数字！'
								}
							}
						}
					},
					
					data: { uuid: '' },
				},
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});

})