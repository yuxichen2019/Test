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
		self['scope']['addParaObj'].monthnum = '1';
		if(type == 'y') {
			//修改显示名字
			var _tDom = ss.getDom('[name="monthnum"]', _self.domWrap.viewC_con).children[0];
			_tDom.innerHTML = '*订购月数：';
			//存在input->则隐藏
			dgDom.querySelector('._inputTxt') && (dgDom.querySelector('._inputTxt').style.display = 'none');
			var monthnumDom = dgDom.querySelector('[name="monthnum"]');
			ss.setDomTxt(monthnumDom, '订购月数');
			monthnumDom.style.display = 'block';
		} else {
			//修改显示名字
			var _tDom = ss.getDom('[name="monthnum"]', _self.domWrap.viewC_con).children[0];
			_tDom.innerHTML = '*订购数量：';
			dgDom.querySelector('._inputTxt') ?
				(dgDom.querySelector('._inputTxt').style.display = 'block') :
				//非月包
				ss.crtDom('input', '_inputTxt', '', dgDom, {
					cn: ['width', 'height', 'borderBottom', 'fontSize', 'marginTop'],
					cv: ['100%', '30px', '1px solid rgb(204, 204, 204)', '14px', '6px'],
					an: ['palceholder', 'type','readonly','value'],
					av: ['订购月数', 'number','true','1']
				}, [
					'change',
					function(dom, value) {
						self['scope']['addParaObj']['monthnum'] = dom.value;
					}
				]);
			dgDom.querySelector('[name="monthnum"]').style.display = 'none'
		};
	};

	//渲染套餐名下拉
	function renderBag(obj) {
		obj.self.eAjax({
			url: obj.url,
			type: 'post',
			data: obj.params,
		}, {
			success: function(data) {
				if(data.data.data && data.data.data.length <= 0) {
					ss.layer.msg('该运营商或运营商下没绑定套餐！');
					crtDomNewFn(
						obj.self, [],
						'平台套餐名', obj.parent.querySelector('[txt="bagPlatformUuid"]'), 'add');
					return;
				}
				var _endData = data.data.data || [];
				self.scope['selDatas']['bagPlatformUuid'] = _endData;
				//整理成下拉框需要的数据
				var _tempArr = []; 
				_endData.forEach(function(item) {
					_tempArr.push({
						name: flag?item.bagCustomerName:item.bagPlatformName,
						code: item.uuid,
						curdata: item
					});
				});
				crtDomNewFn(
					obj.self,
					_tempArr,
					'平台套餐名',
					obj.parent.querySelector('[txt="bagPlatformUuid"]'),
					'add'
				);
			},
			isJson: true
		});
	}
	//套餐下拉数据接口
	var urlStr = commonUrl + '/admin/TBagPlatform/customerTcdj/queryByPageInfo.action'
	var flag = false; //标识是否是一级客户
	//数据表格
	var self = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TBagCustomer/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [
			{
				name: '套餐名称',
				txt: 'bagCustomerName',
				type: 'txt',
				width: '150px'
			},
			{
				name: '套餐编码',
				txt: 'bagCustomerCode',
				type: 'txt',
				width: '150px'
			},
			{
				name: '客户',
				txt: 'customerUuid',
				type: 'blurrySel',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TCustomer/customerTcdj/queryByPageInfo.action',
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
			{
				name: '套餐类型',
				txt: 'bagPlatformType',
				type: 'select',
				width: '120px',
				data: [
					{
						name: '主套餐',
						code: '1'
					},
					{
						name: '叠加包',
						code: '2'
					}
				]
			},
			{
				name: '包体类型',
				txt: 'flowType',
				type: 'select',
				width: '120px',
				data: [
					{
						name: '月包',
						code: '0'
					},
					{
						name: '季包',
						code: '1'
					},
					{
						name: '半年包',
						code: '2'
					},
					{
						name: '年包',
						code: '3'
					},
					{
						name: '日包',
						code: '4'
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
				url: commonUrl + '/admin/TBagCustomer/addEntity.action',
				//调整最后提交的参数
				adjust: function(paraObj) {
					var _paraObj = paraObj;
					//非月包：季包1 | 半年包2 | 年包3
					//monthnum 订购月数 flowType
					if(paraObj.flowType != 0) {
						switch(paraObj.flowType) {
							case 1:
								_paraObj.monthnum = Number(_paraObj.monthnum) * 3
								break;
							case 2:
								_paraObj.monthnum = Number(_paraObj.monthnum) * 6
								break;
							case 3:
								_paraObj.monthnum = Number(_paraObj.monthnum) * 12
								break;
						}
					}
					return _paraObj;
				},
				items: {
					customerUuid: {
						name: '客户',
						type: 'blurrySel',
						width: '80%',
						verify: true,
						data: {
							url: commonUrl + '/admin/TCustomer/customerTcdj/queryByPageInfo.action',
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
						cbFn: function(dom, self, code, dtSelf, curdata) {
							//不是给一级客户添加套餐做的特别处理（添加接口不同，添加字段不同，获取套餐下拉接口不同）
							var itemsArr = document.querySelector('.viewC_con').querySelectorAll('.items');
							var monthnumF = null;
							var bagCustomerNameF = null;

							for(var i = 0; i < itemsArr.length; i++) {
								if(itemsArr[i].getAttribute('name') == "monthnum") {
									monthnumF = itemsArr[i]
								}
								if(itemsArr[i].getAttribute('name') == "bagCustomerName") {
									bagCustomerNameF = itemsArr[i]
								}
							}
							var self = dtSelf;
							//根据运营商和供应商去获取运营商的套餐
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							var params = {
									customerUuid: dom.querySelector('._show').getAttribute('code'),
									operatorName: self['scope']['addParaObj'] && self['scope']['addParaObj']['operatorName'] || '',
									pageSize: 10000,
									bagStatus: 0
								}
							if(curdata && JSON.parse(curdata).level != 1) {
								flag = true;
								urlStr = commonUrl + '/admin/TBagCustomer/getSuperiorBag.action';
								var obj = {
									parent: parent,
									self: self,
									params: params,
									url: urlStr
								}
								renderBag(obj)
								delete self['scope']['addParaVerObj'].bagCustomerName;
								delete self['scope']['addParaVerObj'].monthnum; 
								monthnumF && (monthnumF.style.display = "none");
								bagCustomerNameF && (bagCustomerNameF.style.display = "none");
								dtSelf.sourceObj.searchBtn.add.url = commonUrl + '/admin/TBagCustomer/addEntityByCustomer.action'
							} else {
								flag = false;
								urlStr = commonUrl + '/admin/TBagPlatform/customerTcdj/queryByPageInfo.action';
								var obj = {
									parent: parent,  
									self: self,
									params: params,
									url: urlStr
								}
								renderBag(obj)
								monthnumF && (monthnumF.style.display = "block");
								bagCustomerNameF && (bagCustomerNameF.style.display = "block");
								dtSelf.sourceObj.searchBtn.add.url = commonUrl + '/admin/TBagCustomer/addEntity.action'
							}
						}
					},
					bagCustomerName: {
						name: '套餐名称',
						type: 'txt',
						verify: true,
						width: '80%',
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
							//根据运营商和供应商去获取运营商的套餐
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							var params = {
								operatorName: dom.getAttribute('code'),
								customerUuid: self['scope']['addParaObj'] && self['scope']['addParaObj']['customerUuid'] || '',
								pageSize: 10000,
								bagStatus: 0
							}
							var obj = {
								parent: parent,
								self: self,
								params: params,
								url: urlStr
							}
							renderBag(obj);
						},
					},
					bagCustomerType: {
						name: '客户定价套餐类型',
						type: 'txt',
						isShow: 'false'
					},
					bagPlatformUuid: {
						name: '平台套餐名',
						type: 'blurrySel',
						width: '80%',
						verify: true,
						data: {
							url: urlStr,
							dataType: 'json',
							data: {
								"pageSize": 1000,
								"bagStatus": 0
							},
							rely: {
								name: "bagPlatformName",
								code: "uuid"
							},
							digitalModel: {
								data: {
									location: ['data', 'data']
								}
							}
						},
						cbFn: function(dom, self, code, dtSelf) {
							if(flag){
								dtSelf['scope']['addParaObj']['superiorBagUuid'] = dom.querySelector('._show').getAttribute('code');
							}
							var self = dtSelf;
							//运营商套餐选择时 -> 显示信息
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							//信息展示容器
							var _dom_1 = parent.querySelector('[name="_dom_1"]');
							if(dom.innerHTML.indexOf('平台套餐名') != -1) {
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
										//对参数赋值
										self['scope']['addParaObj'][_curName] = dom.querySelector('._show').getAttribute('code');
										self['scope']['addParaObj']['flowType'] = _curPData && _curPData['flowType'] || '';
										self['scope']['addParaObj']['bagPlatformType'] =  _curPData && _curPData['bagPlatformType'] || '';
										self['scope']['addParaObj']['businessType'] = _curPData && _curPData['businessType'] || '';
										self['scope']['addParaObj']['flowLimit'] = _curPData && _curPData['flowLimit'] || '';
										self['scope']['addParaObj']['limitType'] = _curPData && _curPData['limitType'] || '';
										//套餐码
										//self['scope']['addParaObj']['bagPlatformCode'] = _curPData['bagSuppliersCode'];

										//需要赋值的dom
										var needTxts = _dom_1.children[0].children;
										var txts = [
											'businessType', 'bagPlatformType',
											'flowType',
											'flowLimit',
											'limitType'
										];
										var txtss = [
											'bag_business_type', 'bag_type',
											'flow_type',
											'flow_limit', 'limit_type',
										]
										var notMain = false;
										for(var j = 0; j < needTxts.length; j++) {
											if(_typeObj[txtss[j]] && _typeObj[txtss[j]][_curPData[txts[j]]] == '叠加包'){
											   notMain = true;
											}
											if((needTxts[j].innerHTML.indexOf('超限策略') !=-1) && notMain){
												needTxts[j].style.opacity = 0;
											}else{
												needTxts[j].style.opacity = 1;
											}
											
											needTxts[j].innerHTML =
												needTxts[j].innerHTML.slice(0, needTxts[j].innerHTML.indexOf('：') + 1) +
												(
													_typeObj[txtss[j]] ?
													_typeObj[txtss[j]][_curPData[txts[j]]] :
													_curPData[txts[j]]
												)
											//限速赋值
											if(needTxts[j].innerHTML.indexOf('限速')>-1){
												var txt = _curPData.limitRuleType===0?'不限速':(_curPData.limitRuleType===1?'周期限速':'日期限速')
												needTxts[j].innerHTML = '限速：'+ (txt)
											}
										};
										//根据所选的平台套餐的包体类型->订购月数呈现方式不同(非月包数字输入)
										//包体类型0.月包 1.季包 2.半年包 3.年包'
										crtDGDomFn(self, _curPData.flowType == 0 ? 'y' : 'uy');
									},
									isJson: true
								});
							};
						}
					},
					monthnum: {
						name: '订购月数',
						type: 'select',
						verify: true,
						isShow: 'false',
						data: {
							url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
							dataType: 'json',
							data: {
								dickey: 'bag_select_num',
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
						check: function(paraObj) {
							return {
								result: paraObj.flowType == 0 ? false : (
									isNaN(paraObj.monthnum) ? true :
									(
										Number(paraObj.monthnum) < 0 ? true : false
									)
								),
								tip: '请输入非负数的数字！'
							}
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
									}, {
										name: '包体类型'
									},
									{
										name: '包含流量'
									},
									{
										name: '超限策略'
									},
									{
										name: '限速'
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
					salePrice: {
						name: '售价',
						type: 'num',
						verify: true,
						width: '80%',
					},
				}
			},
			export: {
				name: '导出',
				colType: 'opt2',
				cbFn: function(self) {
					exportFn(self);
				}
			},
			reflesh3: {
				name: '导入',
				colType: 'opt1',
				cbFn: function(self) {
					importFn(self);
				}
			},
			//			mulGround: {
			//				name: '上架',
			//				colType: 'opt1',
			//				cbFn: function(self) {
			//					//循环对象，获取id集合
			//					var _ids = [];
			//					var checkDatas = self.scope.checkObj;
			//					for(var x in checkDatas) {
			//						checkDatas[x].forEach(function(item) {
			//							_ids.push(item.uuid);
			//						})
			//					};
			//					if(_ids.length <= 0) {
			//						ss.layer.msg('请先勾选套餐！');
			//						return;
			//					};
			//					//上架
			//					self.eAjax({
			//						url: commonUrl + '/admin/TBagCustomer/checkPlatformStatus.action',
			//						type: 'post',
			//						data: {
			//							uuids: _ids.join(',')
			//						},
			//					}, {
			//						success: function(data) {
			//							if(data.result == 'success') {
			//								if(data.data == 1) {
			//									self.eAjax({
			//										url: commonUrl + '/admin/TBagCustomer/batchUpdateBagCustomerStatus.action',
			//										type: 'post',
			//										data: {
			//											uuids: _ids.join(','),
			//											bagStatus: 0
			//										},
			//									}, {
			//										success: function(data) {
			//											if(data.result == 'success') {
			//												ss.layer.msg('上架成功！');
			//												self.scope.checkObj = {}; //重置勾选
			//												self.lg_reloadFn();
			//											}
			//										},
			//										isJson: true
			//									});
			//								} else {
			//									layer.msg('不允许上架');
			//								}
			//							}
			//						},
			//						isJson: true
			//					});
			//				}
			//			},
			//			mulUndercarriage: {
			//				name: '下架',
			//				colType: 'opt2',
			//				cbFn: function() {
			//					//循环对象，获取id集合
			//					var _ids = [];
			//					var checkDatas = self.scope.checkObj;
			//					for(var x in checkDatas) {
			//						checkDatas[x].forEach(function(item) {
			//							_ids.push(item.uuid);
			//						})
			//					};
			//					//上架
			//					self.eAjax({
			//						url: commonUrl + '/admin/TBagCustomer/batchUpdateBagCustomerStatus.action',
			//						type: 'post',
			//						data: {
			//							uuids: _ids.join(','),
			//							bagStatus: 1
			//						},
			//					}, {
			//						success: function(data) {
			//							if(data.result == 'success') {
			//								ss.layer.msg('下架成功！');
			//								self.scope.checkObj = {}; //重置勾选
			//								self.lg_reloadFn();
			//							}
			//						},
			//						isJson: true
			//					});
			//				}
			//			}
		},
		//表格内容
		table: {
			//各选项
			options: {
				closeInterlace: true,
				isChangeTime: [],
				dpWPer: '140%',
				cbFn:function(self){
					//限速规则html
					function renderHtml(arr){
						var tempStr = '';
						for(var a=0; a<arr.length; a++){
							var obj = arr[a];
							var _limitType = obj.limitType==1? '计费周期限速' : '计费日期限速';
							var endArr = [
								'<div style="padding: 10px 0px;padding-bottom:0px;">',
									'<p style="display:inline-block;verticalAlign:top;width:25%;">'+obj.rulesName+'</p>',
									'<p style="display:inline-block;verticalAlign:top;width:25%;">'+ _limitType +'</p>',
									'<p style="display:inline-block;verticalAlign:top;width:25%;">'+obj.limitNum+'</p>',
									'<p style="display:inline-block;verticalAlign:top;width:25%;">'+obj.limitSpeed+'</p>',
								'</div>'
							];
							tempStr = tempStr + endArr.join('')
						};
						return [
							'<div style="border-bottom: 1px solid #ccc; padding: 10px 0px;padding-top:0px;">',
								'<p style="display:inline-block;verticalAlign:top;width:25%;">规则名称</p>',
								'<p style="display:inline-block;verticalAlign:top;width:25%;">限速类型</p>',
								'<p style="display:inline-block;verticalAlign:top;width:25%;">用量阈值/MB</p>',
								'<p style="display:inline-block;verticalAlign:top;width:25%;">限速KB/S</p>',
							'</div>'
						].join('')+tempStr
					}
					
					var sourceData = self.tableData.data;
					var uls = ss.getDomAll('ul',self.domWrap.dtcWrap);
					for(var u=0; u<uls.length; u++){
						if(u==0) continue
						var curLi = ss.getDom('[name="limitRuleType"]',uls[u]);
						if(curLi.innerHTML=='是'){
							curLi.style.color = '#4589dc';
							curLi.style.textDecoration = 'underline';
							curLi.style.cursor = 'pointer';
							curLi.onclick = function(){
								var curData = sourceData[this.parentNode.getAttribute('index')].flowLimitRules;
								ss.ssView.show({
									title:'当前限速规则详情',
									html: renderHtml(curData)
								})
							}
						}
					}
					
					
					
					//当前列表容器uls集合

					//表头添加字段
					ss.polling({
						condition: function() {
							return self.domWrap.tbTWrap.querySelectorAll('ul').length > 0;
						},
						cbFn: function() {
							var curUlsH = self.domWrap.tbTWrap.querySelectorAll('ul');
							for(var i = 0; i < curUlsH.length; i++) {
								ss.mdfCss(curUlsH[i], ['position', 'relative']);
								var bagStatusDomH = curUlsH[i].querySelector('[name="bagStatus"]');
								var retailbagStatusDom = curUlsH[i].querySelector('[name="bagCustomerRetailbagStatus"]');

								function renderOperateH(parentDom) {
									ss.crtDom('span', '', '操作', parentDom, {
										cn: ['borderLeft', 'display', 'padding', 'float'],
										cv: ['1px solid #ccc', 'inline-block', '0 8px', 'right']
									})
								}
								renderOperateH(bagStatusDomH);
								renderOperateH(retailbagStatusDom);
							}
						}
					})

					ss.polling({
						condition: function() {
							return self.domWrap.tbCWrap.querySelectorAll('ul').length > 0;
						},
						cbFn: function() {
							var curUls = self.domWrap.tbCWrap.querySelectorAll('ul');
							for(var i = 0; i < curUls.length; i++) {
								ss.mdfCss(curUls[i], ['position', 'relative']);

								//上下架
								//客户套餐售价
								var bagStatusDom = curUls[i].querySelector('[name="bagStatus"]');
								var bagStatusTitle = bagStatusDom.getAttribute('title');
								var retailbagStatusDom = curUls[i].querySelector('[name="bagCustomerRetailbagStatus"]');
								var retailbagStatusTitle = retailbagStatusDom.getAttribute('title');

								function renderOperate(parentDom, bagStatusTitle, type) {
									var operate = bagStatusTitle == '1' ? '上架' : '下架';
									ss.crtDom('span', '', operate, parentDom, {
										cn: ['cursor', 'borderLeft', 'display', 'padding', 'float', 'color'],
										cv: ['pointer', '1px solid #ccc', 'inline-block', '0 9px', 'right', bagStatusTitle == '1' ? 'rgb(0, 150, 136)' : 'rgb(30, 159, 255)'],
										an: ['index'],
										av: [i]
									}, [
										'click',
										function(dom) {
											var index = dom.getAttribute('index');
											var tableData = self.tableData.data;
											var curObj = tableData[index];
											var bagStatusState = dom.parentNode.getAttribute('title') == '1' ? 0 : 1;
											if(type == 2) {
												renderStatusName(bagStatusState, curObj, 1, self)
											} else {
												renderStatusName(bagStatusState, curObj, 0, self)
											}
										}
									])
								}
								renderOperate(bagStatusDom, bagStatusTitle, 1)
								renderOperate(retailbagStatusDom, retailbagStatusTitle, 2)

								//修改推荐状态
								var recommendDom = curUls[i].querySelector('[name="recommend"]');
								recommendDom.style.color = recommendDom.getAttribute('title') == '1' ? 'blue' : '#FF7F5B';
								recommendDom.style.cursor = 'pointer';
								recommendDom.setAttribute('index', i)
								recommendDom.onclick = function() {
									var index = this.getAttribute('index');
									var tableData = self.tableData.data;
									var curObj = tableData[index];
									var recommendState = this.getAttribute('title') == '1' ? 2 : 1;

									layer.confirm('确定修改推荐状态吗？', function() {
										var params = {
											uuid: curObj.uuid,
											recommend: recommendState
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

								//改价
								//客户套餐售价
								var curPriceDom = curUls[i].querySelector('[name="salePrice"]');
								ss.mdfCss(curPriceDom, ['position', 'relative']);
								modefyPrice(curPriceDom, i, 'salePrice', 1, self);
								//终端套餐售价
								var retailPriceDom = curUls[i].querySelector('[name="bagCustomerRetailsalePrice"]');
								ss.mdfCss(retailPriceDom, ['position', 'relative']);
								modefyPrice(retailPriceDom, i, 'bagCustomerRetailsalePrice', 2, self);
							}
						}
					});

				},
				dpWith: {
					'bagCustomerName': 8,
					'customerUuid': 5,
					'operatorName': 5,
					'flowLimit': 5,
					'bagStatus': 8,
					'bagCustomerRetailbagStatus': 8,
					'salePrice': 8,
					'bagCustomerRetailsalePrice': 8
				},
				showTitle: [
					'bagCustomerName', 'customerUuid', 'operatorName', 'flowLimit',
					'businessType', 'flowType', 'bagPlatformType',
					'monthnum', 'bagStatus', 'salePrice',
					'bagCustomerRetailbagStatus', 'bagCustomerRetailsalePrice', 'recommend'
				],
				shim: {
					operatorName: {
						'1': '移动',
						'2': '联通',
						'3': '电信',
					},
					bagPlatformType: {
						'1': '主套餐',
						'2': '叠加包',
					},
					businessType: {
						'1': '流量包',
						'2': '语音包',
					},
					recommend: {
						'1': '未推荐',
						'2': '已推荐'
					},
					limitRuleType: {
						'0': '否',
						'1': '是',
						'2': '是'
					}
				},
				//开启勾选框  
				isCheckbox: true,
				//动态别名转换
				urlData: {
					customerUuid: {
						url: commonUrl + '/admin/TCustomer/customerTcdj/queryByPageInfo.action',
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
					},
					bagCustomerRetailbagStatus: {
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

			},
			tlName: [
				'套餐名称', '套餐编码', '平台套餐名称', '客户', '运营商', '包含流量(M)',
				'是否限速',
				'业务类型', '包体类型', '套餐类型',
				'订购月数', '客户套餐状态', '客户套餐售价（元）',
				'终端套餐状态', '终端套餐售价（元）', '推荐状态','备注'
			], //表头名字
			tlTxt: [
				'bagCustomerName', 'bagCustomerCode', 'bagPlatformName', 'customerUuid', 'operatorName', 'flowLimit',
				'limitRuleType',
				'businessType', 'flowType', 'bagPlatformType',
				'monthnum', 'bagStatus', 'salePrice',
				'bagCustomerRetailbagStatus', 'bagCustomerRetailsalePrice', 'recommend','remark'
			], //表头字段
			//操作项
			operation: [
				{
					name: '编辑',
					flag: 'edit',
					colType: 'opt2',
					url: commonUrl + '/admin/TBagCustomer/editEntity.action',
					dataType: 'json',
					items: {
						remark: {
							name: '备注',
							type: 'area'
						},
					},
					data: {
						uuid: ''
					},
					cbFn: function(curData, editItem) {
//						var editItem = editItem;
//						if(curData.gradeBag > 1) {
//							editItem.items = itemObj2;
//						} else {
//							editItem.items = itemObj;
//						}
					}
				},
				{
					name: '删除',
					colType: 'del',
					dataType: 'json',
					url: commonUrl + '/admin/TBagCustomer/deleteEnttiybyUuid.action',
					data: {
						uuid: ''
					}
				}
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});
	//导出
	function exportFn(self) {
		var loading = layer.load(1, {
			  shade: [0.1,'#fff'] //0.1透明度的白色背景
			});
		//请求地址
		var queryUrl = commonUrl + "/admin/TBagCustomer/export.action";
		//请求参数
		var params = self.scope.queryObj;
		params.currentPage = 1;
		console.log(params)
		params.pageSize = 1000;
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
				if(data.result == 'success' && data.data && data.data !== '' ) {
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
		$("#myModaldaoru #costPlan").html('')
		
		//		获取客户
		var params = {
			currentPage: 1,
			pageSize: 10000
		}
		$.ajax({
			type: 'POST',
			url: commonUrl + '/admin/TCustomer/customerTcdj/queryByPageInfo.action',
			data: JSON.stringify(params),
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			dataType: 'json',
			success: function(datajson) {
				if(datajson.result == 'success') {
					var appName = datajson.data.data
					var option = "<option value=''>请选择客户</option>";
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
					var option = "<option value=''>请选择客户</option>"
					for(var i = 0; i < appName.length; i++) {
						var customerUuid = appName[i].uuid
						var customerName = appName[i].customerName
						if(appName[i]) {
							option += "<option value="+customerUuid+">" + customerName + "</option>"
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
		document.querySelector("#daoruFile").value = '';

		document.querySelector("#daoruFile").onchange = function() {
			var file = this.files[0];
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
			var customerId  = document.querySelector("#supplierUuid").value;
			var daoruFile = document.querySelector("#daoruFile").value;
			var huaboRemark = document.querySelector("#huaboRemark").value;
			if(!customerId) {
				layer.msg('请选择客户')
				return;
			}
			var options = {
				type: 'post',
				url: commonUrl + '/admin/TBagCustomer/addBagFromImport.action',
				dataType: 'json',
				beforeSend: function() {
					ss.c3Loading.show();
				},
				success: function(d) {
					if(d.result == 'success') {
						layer.alert('导入成功！' + d.data);
						modalBox.close()
						document.querySelector("#supplierUuid").value = "";
						document.querySelector("#daoruFile").value = "";
						document.getElementById('daoruText').innerHTML = "选择";
						document.getElementById('daoruText').title = "选择";
						self.lg_reloadFn();
					};
					if(d.result == 'error') {
						layer.msg(d.errorMsg || '系统异常！');
					};
					modalBox.close()
					ss.c3Loading.hidden();
				}
			};
			console.log(options)
			$('#daoruForm').ajaxSubmit(options);
			
		}
	}

	//改价
	function modefyPrice(curPriceDom, i, field, type, self) {		
		//创建输入框
		ss.crtDom('input', field + 'Change', '', curPriceDom, {
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
				var uuid = curObj['uuid']
				var params = {
					uuid: uuid,					
				}
				params[field] = dom.parentNode.querySelector('.' + field + 'Change').value
				
				if(dom.getAttribute('issel') == 'true') {
					self.eAjax({
						url: commonUrl+"/admin/TBagCustomer/priceRevisionRecord.action",
						type: 'post',
						data:params,
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
					var _inputDom = dom.parentNode.querySelector('.' + field + 'Change');
					ss.mdfCss(_inputDom, ['display', 'block']);
					dom.innerHTML = '确定';
					dom.setAttribute('issel', 'true');
				};
			}
		])
	}
	//上下架
	function renderStatusName(state, curObj, uuidType, self) {
		var curObj = curObj;
		var bagStatus = state
		var tip1 = state == 0 ? '上架' : '下架';
		var tipInfo = (uuidType == 1) ? '确定' + tip1 + '该终端套餐吗？' : '确定' + tip1 + '该客户套餐吗？';
		//uuidType 1为终端套餐 0为客户套餐
		var uuid = (uuidType == 1) ? curObj['bagCustomerRetailUuid'] : curObj['uuid'];
		var checkUrl = '' //能否上架验证接口
		let shangUrl = ''; //上架接口
		var xiaUrl = ''; //下架接口
		if(uuidType == 0) {
			checkUrl = '/admin/TBagCustomer/checkPlatformStatus.action';
			shangUrl = '/admin/TBagCustomer/batchUpdateBagCustomerStatus.action';
			xiaUrl = '/admin/TBagCustomer/batchUpdateBagCustomerStatus.action';
		} else {
			checkUrl = '/admin/TBagCustomerRetail/checkCustomerStatus.action';
			shangUrl = '/admin/TBagCustomerRetail/batchUpdateBagCustomerRetailStatus.action';
			xiaUrl = '/admin/TBagCustomerRetail/batchUpdateBagCustomerRetailStatus.action';
		}
		layer.confirm(tipInfo, function() {
			//上架时 看能否上架
			if(bagStatus == 0) {
				self.eAjax({
					url: commonUrl + checkUrl,
					type: 'post',
					data: {
						uuids: uuid
					},
				}, {
					success: function(data) {
						if(data.result == 'success') {
							if(data.data == 1) {
								self.eAjax({
									url: commonUrl + shangUrl,
									type: 'post',
									data: {
										uuids: uuid,
										bagStatus: bagStatus
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
							} else {
								layer.msg('不允许上架');
							}
						}
					},
					isJson: true
				});
			} else {
				self.eAjax({
					url: commonUrl + xiaUrl,
					type: 'post',
					data: {
						uuids: uuid,
						bagStatus: bagStatus
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
		})
	}

})