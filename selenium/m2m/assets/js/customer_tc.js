ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
    //模糊查询下拉框渲染
	function crtDomNewFn(self, renderData, name, parentDom,type) {
		var dtSelf = self;
		var addViewData = [];
		var editViewData = [];
		if(type=='add'){
			addViewData = self.sourceObj.searchBtn.add.items;
		}else{
			var operationData = self.sourceObj.table.edit.operation;
			for(var i=0;i<operationData.length;i++){
				if(operationData[i].name == '编辑'){
					editViewData = operationData[i].items;
					break;
				}
			}
		}
		//循环下拉数据renderData 看所选套餐是否属于该数据
		var defaultVal = parentDom.querySelector('._show').getAttribute('code') || '';
		var defaultName = parentDom.querySelector('._show').innerHTML || '';
		var flag = false;
		if(defaultVal !='' && defaultName !=''){
			for(var j=0;j<renderData.length;j++){
				if(renderData[j].code == defaultVal){
					flag = true;
					return;
				}
			}
			//不属于 清空数据
			if(!flag){
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
			defaultVal:defaultVal,
			defaultName:defaultName,
			hv: 30,
			cbFn: function(self) {
				if(type == 'add'){
					dtSelf['scope']['addParaObj'][parentDom.parentNode.getAttribute('name')] = self['scope']['code'];
				    var indexVal = parentDom.parentNode.getAttribute('name');
				    addViewData[indexVal].cbFn && addViewData[indexVal].cbFn(parentDom.parentNode, self, self['scope']['code'],dtSelf);
				}else{
					dtSelf['scope']['editParaObj'][parentDom.parentNode.getAttribute('name')] = self['scope']['code'];
				    var indexVal = parentDom.parentNode.getAttribute('name');
				    editViewData[indexVal].cbFn && addViewData[indexVal].cbFn(parentDom.parentNode, self, self['scope']['code'],dtSelf);
				}
			}, //点击回调
			clearFn: function(self) {}, //清空回调
		});
	}
	//新增下拉框渲染
	function crtDomFn(dataArr, sData, dom, type, cbFn) {
		var defaultVal = dom.parentNode.getAttribute('code');
		var defaultName = dom.parentNode.innerHTML;
		var flag = false;
		if(defaultVal && defaultName){
			for(var j=0;j<dataArr.length;j++){
				if(dataArr[j].code == defaultVal){
					flag = true;
					return;
				}
			}
			if(!flag){
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
	var self = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TBagPlatform/queryByPageInfo.action', //请求Url
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
				txt: 'bagPlatformName',
				type: 'txt',
				width: '120px'
			},
			{
				name: '套餐编码',
				txt: 'bagPlatformCode',
				type: 'txt',
				width: '120px'
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
				data: {
					url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
					dataType: 'json',
					data: {
						dickey: 'bag_type',
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
				width: '120px'
			},
			{
				name: '包体类型',
				txt: 'flowType',
				type: 'select',
				data: {
					url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
					dataType: 'json',
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
				width: '120px'
			},
			{
				name: '业务类型',
				txt: 'businessType',
				type: 'select',
				data: {
					url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
					dataType: 'json',
					data: {
						dickey: 'bag_business_type',
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
				width: '120px'
			},
		],
		//搜索栏额外按钮
		searchBtn: {
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TBagPlatform/addEntity.action',
				adjust:function(queryObj){
					var _obj = queryObj;
					//不限速，默认值
					_obj.limitRuleType == 0 && (_obj.ruleUuidList = null);
					//包体类型为月包，0时，重置限速
					if(_obj.flowType!=0){
						_obj.limitRuleType == 0;
						_obj.ruleUuidList = null;
					}
					return _obj 
				},
				//默认存在值：用于操作，不校验
				dfOperateObj: {
					limitRuleType: 0
				},
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
								url: commonUrl + '/admin/TSuppliers/customerTc/queryByPageInfo.action',
								type: 'post',
								data: {
									operator: dom.getAttribute('code'),
								},
							}, {
								success: function(data) {
									if(data.data.data.length <= 0) {
										ss.layer.msg('该运营商下没绑定供应商！');
										crtDomFn(
											[{
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
										[{
											name: '供应商',
											code: ''
										}].concat(_tempArr),
										'',
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
														self, 
														[],
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
														'平台套餐名',
														parent.querySelector('[txt="bagSuppliersUuid"]'),
														'add'
													);
												},
												isJson: true
											});
										}
									);

								},
								isJson: true
							});

							//根据运营商和供应商去获取运营商的套餐
							self.eAjax({
								url: commonUrl + '/admin/TBagSuppliers/queryByPageInfo.action',
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
										ss.layer.msg('该运营商或运营商下没绑定套餐！');
										crtDomNewFn(
											self, [],
											'运营商套餐名称', parent.querySelector('[txt="bagSuppliersUuid"]'),'add');
//										crtDomFn(
//											[{
//												name: '运营商套餐名称',
//												code: ''
//											}],
//											'', parent.querySelector('[name="bagSuppliersUuid"]').querySelector('.selectItems'));
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
							url: commonUrl + '/admin/TSuppliers/customerTc/queryByPageInfo.action',
							dataType: 'json',
							data: {
								currentPage: 1,
								pageSize: 10000000
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
											'运营商套餐名称', parent.querySelector('[txt="bagSuppliersUuid"]'),'add');
//										crtDomFn(
//											[{
//												name: '运营商套餐名称',
//												code: ''
//											}],
//											'', parent.querySelector('[name="bagCustomerUuid"]').querySelector('.selectItems'));
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
						width:'80%',
						verify: true,  
						data: {
							url: commonUrl + '/admin/TBagSuppliers/queryByPageInfo.action',
							dataType: 'json',
							data: {
								"pageSize": 1000000
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
						cbFn: function(dom, self,code,dtSelf) {
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
										//对参数赋值
										//包体
//										self['scope']['addParaObj']['flowType'] = _curPData['flowType'];
										//套餐码
										//self['scope']['addParaObj']['bagPlatformCode'] = _curPData['bagSuppliersCode'];

										//需要赋值的dom
										var needTxts = _dom_1.children[0].children;
										var txts = [
											'businessType', 'bagSuppliersType',
											'flowLimit',
											//											'flowType',
											//											'costprice','limitType',
											'termMonth'
										];
										var txtss = [
											'bag_business_type', 'bag_type',
											'a',
											//											'flow_type',
											//											'b','limit_type',
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
															_curPData[txts[j]]?
																			_curPData[txts[j]] + '月':  _curPData['termDay'] +'天'
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
										name: '每月流量'
									},
									//									{name:'包体类型'}, 
									//									{name:'成本'},{name:'到限制流量时'},
									{
										name: '期限'
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
								dickey: 'bag_type',
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
							//主套餐->隐藏日包
							var flowTypeDom = parent.querySelector('[name="flowType"]');
							var pCode4Dom = flowTypeDom.querySelector('[code="4"]');
							if(dom.innerHTML.indexOf('主套餐') == -1) {
								delete self['scope']['addParaVerObj'].limitType;
								//清空添加对象字段
								self['scope']['addParaObj']['limitType'] = '';
								pCode4Dom.style.display = 'block'
							}
							else{
								pCode4Dom.style.display = 'none'
							}
						},
						verify: true
					},
					flowType: {
						name: '包体类型',
						type: 'select',
						data: {
							url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
							dataType: 'json',
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
						cbFn: function(dom, self) {
							//套餐类型为主套餐时 -> 限制流量
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							var ruleUuidListDom = parent.querySelector('[name="ruleUuidList"]');
							ss.mdfCss(ruleUuidListDom, [
								'display',
								dom.getAttribute('code') == 0 ? 'block' : 'none'
							]);
						},
						verify: true
					},
					flowLimit: {
						name: '包含流量(M)',
						type: 'num',
						verify: true
					},
					ruleUuidList: {
						name: '限速设置',
						type: 'crtDom',
						hidden: true,
						check:function(record){
							return {
								result: record.isrule && !record.ruleUuidList,
								tip: '已勾选限速设置，请选择规则'
							}
						},
						renderFn:function(dom,self){
							
							ss.crtDom('div','','',dom,{
								cn:['height','lineHeight'],
								cv:['100%','50px']
							})
							.appendDom(function(dom){
								//是否配置勾选框
								ss.crtDom('div','',ss.svgRepository.grayUnSel(20,'#bfbfbf'),dom,{
									cn:['position','width','height','display','verticalAlign','marginBottom'],
									cv:['relative','20px','20px','inline-block','middle','10px']
								},
								[
									'click',function(dom){
										console.log(self['scope']['addParaObj'])
										if(dom.getAttribute('sel')=='true'){											
											dom.innerHTML = ss.svgRepository.grayUnSel(20,'#bfbfbf');
											dom.setAttribute('sel','false');
											var scopeWrapDom  = dom.parentNode.parentNode;
											ss.getDom('._limit_type',scopeWrapDom).style.display = 'none';
											ss.getDom('.day_rule_wrap',scopeWrapDom).style.display = 'none';
											ss.getDom('.week_rule_wrap',scopeWrapDom).style.display = 'none';
											self['scope']['addParaObj'].ruleUuidList = '';
											self['scope']['addParaObj'].limitRuleType = 0;
											self['scope']['addParaObj'].isrule = false;
											$("._limit_type div").attr("code","")
//											$(".selectItems p").each(function(i){
//												$(".selectItems p").removeAttr("ischeck",false);
//												$(".selectItems p").css("color","rgb(187, 187, 187)");
//												$(".selectItems p div svg path").attr("fill","#bbb");
//											})
										}else{											
											dom.innerHTML = ss.svgRepository.grayUnSel(20,'#326899');
											self['scope']['addParaObj'].isrule = true;
											dom.setAttribute('sel','true');
											var scopeWrapDom  = dom.parentNode.parentNode;
											ss.getDom('._limit_type',scopeWrapDom).style.display = 'inline-block';
										}
									}
								]);
								//周期|日期的下拉选择
								var selDom = ss.crtDom('div','_limit_type','',dom,{
									cn:['display','veticalAlign','width','marginLeft','display'],
									cv:['inline-block','middle','120px','15px','none']
								});
								ss.ssSelect({
									name:'限速类型',
									data:[
										{name:'周期限速',code:'1'},
										{name:'日期限速',code:'2'}
									],
									appendTo:selDom,
									cbFn:function(sSelf){
										var scopeWrapDom  = dom.parentNode.parentNode;
										var dayDom = ss.getDom('.day_rule_wrap',scopeWrapDom);
										var weekDom = ss.getDom('.week_rule_wrap',scopeWrapDom);
										if(sSelf.scope.code==2){
											dayDom.style.display = 'inline-block';
											weekDom.style.display = 'none';
											self['scope']['addParaObj'].limitRuleType = 2;
										}
										else{
											dayDom.style.display = 'none';
											weekDom.style.display = 'inline-block';
											self['scope']['addParaObj'].limitRuleType = 1;
										}
									}
								});
								
								//规则选择的容器：日限单选|周限多选
								var dayDom = ss.crtDom('div','day_rule_wrap','',dom,{
									cn:['display','veticalAlign','width','marginLeft','display'],
									cv:['inline-block','middle','220px','0px','none']
								})
								
								var weekDom = ss.crtDom('div','week_rule_wrap','',dom,{
									cn:['display','veticalAlign','width','marginLeft','display'],
									cv:['inline-block','middle','250px','0px','none']
								})
								
								//规则数据获取
								self.eAjax({
									url: commonUrl + '/admin/TFlowLimitRules/queryByPageInfo.action',
									type: 'post',
									data: {
										pageSize:9999
									},
								}, {
									success: function(data) {
										if(data.result == 'success') {
											var resData = data.data.data;
											if(!resData || resData.length==0){
												return;
											}
											var endData = { day: [], week: [] }; 
											resData.forEach(function(item){
												item.limitType==2 ? endData.day.push(item) : endData.week.push(item)
											});
											
											var _dayData = [];
											var _weekData = [];
											endData.day.forEach(function(item){
												_dayData.push({
													name:item.rulesName,
													code:item.uuid
												})
											});
											endData.week.forEach(function(item){
												_weekData.push({
													name:item.rulesName,
													code:item.uuid
												})
											});
											
											ss.ssSelect({
												name:'日限规则', 
												data:_dayData,
												appendTo:dayDom,
												cbFn:function(sSelf){
													self['scope']['addParaObj'].ruleUuidList = sSelf.scope.code ? sSelf.scope.code.split(',') : '';
													console.log(sSelf)
												}
											});
											ss.ssSelect({
												name:'周限规则',
												data:_weekData,
												type:'mulSel',
												maxNum:2,  
												appendTo:weekDom,
												cbFn:function(sSelf){
													self['scope']['addParaObj'].ruleUuidList = sSelf.scope.code ? sSelf.scope.code.split(',') : '';
												}
											});
										}
									},
									isJson: true
								});
							
							})
						},
//						verify: true
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
						verify: true,
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
				name: '批量上架',
				colType: 'opt1',
				cbFn: function() {
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
						url: commonUrl + '/admin/TBagPlatform/batchUpdateBagPlatformStatus.action',
						type: 'post',
						data: {
							uuids: _ids.join(','),
							bagPlatformStatus: 0
						},
					}, {
						success: function(data) {
							if(data.result == 'success') {
								ss.layer.msg('批量上架成功！');
								self.scope.checkObj = {}; //重置勾选
								self.lg_reloadFn();
							}
						},
						isJson: true
					});
				}
			},
			mulUndercarriage: {
				name: '批量下架',
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
					if(_ids.length <= 0) {
						ss.layer.msg('请先勾选套餐！');
						return;
					};			
					//上架
					self.eAjax({
						url: commonUrl + '/admin/TBagPlatform/batchUpdateBagPlatformStatus.action',
						type: 'post',
						data: {
							uuids: _ids.join(','),
							bagPlatformStatus: 1
						},
					}, {
						success: function(data) {
							if(data.result == 'success') {
								ss.layer.msg('批量下架成功！');
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
				dpWPer: '1500px',
				dpWith: {
				'bagPlatformName':6,
				'bagPlatformCode':7,
				'bagSuppliersName':4,
				'operatorName':3,
				'businessType':3, 
				'flowType':3, 
				'bagPlatformType':3,
				'costprice':3,
				'flowLimit':3,
				'limitRuleType':3,
				'bagPlatformStatus':3,
				'limitType':3
				},
				showTitle:['bagPlatformName','bagPlatformCode'],
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
				},
				shim: {
					operatorName: {
						'1': '移动',
						'2': '联通',
						'3': '电信',
					},
					businessType: {
						'1': '流量包',
						'2': '语音包',
//						'3': '叠加包'
					},
					limitRuleType: {
						'0': '否',
						'1': '是',
						'2': '是'
					}
				},
				//动态别名转换
				urlData: {
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
							dickey: 'bag_type',
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
					limitType: {
						url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
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
				//开启勾选框  
				isCheckbox: true
			},
			tlName: [
				'套餐名称','套餐编码', '运营商套餐', '运营商',
				'业务类型', '包体类型', '套餐类型',
				'成本价（元）',
				'包含流量(M)','是否限速',
				'状态', '超限策略'
			], //表头名字
			tlTxt: [
				'bagPlatformName','bagPlatformCode','bagSuppliersName', 'operatorName',
				'businessType', 'flowType', 'bagPlatformType',
				'costprice',
				'flowLimit','limitRuleType',
				'bagPlatformStatus', 'limitType'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				{
					name: '编辑',
					url: commonUrl + '/admin/TBagPlatform/editEntity.action',
					dataType: 'json',
					items: {
						bagPlatformName: {
							name: '套餐名称',
							type: 'txt',
							verify: true,
//							forbid:true
						},
					
//						suppliersName: {
//							name: '供应商',
//							type: 'select',
//							data: {
//								url: commonUrl + '/admin/TSuppliers/customerTc/queryByPageInfo.action',
//								dataType: 'json',
//								data: {
//									currentPage: 1,
//									pageSize: 10000
//								},
//								rely: {
//									name: "supplierName",
//									code: "uuid"
//								},
//								digitalModel: {
//									data: {
//										location: ['data', 'data']
//									}
//								}
//							},
//							cbFn: function(dom, self) {
//								//根据运营商去筛选供应商
//								var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
//
//								//根据运营商和供应商去获取运营商的套餐
//								self.eAjax({
//									url: commonUrl + '/admin/TBagSuppliers/queryByPageInfo.action',
//									type: 'post',
//									data: {
//										//运营商
//										operatorName: self['scope']['editParaObj'].operatorName,
//										//供应商
//										suppliersName: dom.getAttribute('code'),
//									},
//								}, {
//									success: function(data) {
//										if(data.data.data.length <= 0) {
//											ss.layer.msg('该运营商或运营商下没绑定套餐！');
//											crtDomNewFn(
//											self, [],
//											'运营商套餐名称', parent.querySelector('[txt="bagSuppliersUuid"]'),'edit');
////											crtDomFn(
////												[{
////													name: '套餐名',
////													code: ''
////												}],
////												'', parent.querySelector('[name="bagCustomerUuid"]').querySelector('.selectItems'));
//											return;
//										}
//										var _endData = data.data.data;
//										//整理成下拉框需要的数据
//										var _tempArr = [];
//										_endData.forEach(function(item) {
//											_tempArr.push({
//												name: item.bagSuppliersName,
//												code: item.uuid,
//												curdata: item
//											});
//										});
//										crtDomNewFn(
//											self, 
//											_tempArr,
//											'运营商套餐名称',
//											parent.querySelector('[txt="bagSuppliersUuid"]'),
//											'edit'
//										);
//									},
//									isJson: true
//								});
//
//							},
//							forbid:true,
//							verify: true,
//						},
						bagSuppliersUuid: {
							name: '运营商套餐名称',
							type: 'blurrySel',
							width:'80%',
							verify: true,
							forbid:true,
							data: {
								url: commonUrl + '/admin/TBagSuppliers/queryByPageInfo.action',
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
							cbFn: function(dom, self,code,dtSelf) {
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
											//对参数赋值
											//包体
//											self['scope']['editParaObj']['flowType'] = _curPData['flowType'];
											//套餐码
											//self['scope']['addParaObj']['bagPlatformCode'] = _curPData['bagSuppliersCode'];

											//需要赋值的dom
											var needTxts = _dom_1.children[0].children;
											var txts = [
												'businessType', 'bagSuppliersType',
												'flowLimit', 
//												'flowType',
												//												'costprice','limitType',
												'termMonth'
											];
											var txtss = [
												'bag_business_type', 'bag_type',
												'a', 
//												'flow_type',
												//												'b','limit_type',
												'termMonth'
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
																							_curPData[txts[j]]?
																			         _curPData[txts[j]] + '月':  _curPData['termDay'] +'天'
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
											name: '每月流量'
										}, 
//										{
//											name: '包体类型'
//										},
//										{
//											name: '成本'
//										}, 
//										{
//											name: '到限制流量时'
//										},
										{
											name: '期限'
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
//						bagPlatformType: {
//							name: '套餐类型',
//							type: 'select',
//							data: {
//								url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
//								dataType: 'json',
//								data: {
//									dickey: 'bag_type',
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
//							cbFn: function(dom, self) {
//								//套餐类型为主套餐时 -> 限制流量
//								var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
//								var limitType = parent.querySelector('[name="limitType"]');
//								ss.mdfCss(limitType, [
//									'display',
//									dom.innerHTML.indexOf('主套餐') != -1 ? 'block' : 'none'
//								]);
//								
//								if(dom.innerHTML.indexOf('主套餐') == -1) {
//									delete self['scope']['addParaVerObj'].limitType;
//									//清空添加对象字段
//									self['scope']['editParaObj']['limitType'] = '';
//								}
//							},
//							verify: true
//						},
//						flowType: {
//							name: '包体类型',
//							type: 'select',
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
////							cbFn: function(dom, self) {
////
////							},
//							verify: true
//						},
//						
						flowLimit: {
							name: '包含流量(M)',
							type: 'num',
							verify: true
						},
//						bagPlatformStatus: {
//							name: '上下架',
//							type: 'select',
//							data: {
//								url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
//								dataType: 'json',
//								data: {
//									dickey: 'bag_status',
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
//						},
//						limitType: {
//							name: '到限制流量时',
//							type: 'select',
//							isShow: 'false',
//							verify: true,
//							data: {
//								url: commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
//								dataType: 'json',
//								data: {
//									dickey: 'limit_type',
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
//							rendEnd: function(dom, curData ,self) {
//								//套餐类型为主套餐时->显示限时，并赋值
//								if(curData.bagPlatformType == 1) {
//									ss.mdfCss(
//										dom.parentNode.parentNode, ['display', 'block']
//									);
//								}
//								else{
//									delete self['scope']['editParaVerObj'].limitType;
//								}
//							}
//						},
//						
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
				{
					name: '上架',
					colType: 'opt2',
					rely: {
						bagPlatformStatus: '1'
					},
					cbFn: function(curData, self) {
						self.eAjax({
							url: commonUrl + '/admin/TBagPlatform/batchUpdateBagPlatformStatus.action',
							type: 'post',
							data: {
								uuids: curData.uuid,
								bagPlatformStatus: 0
							},
						}, {
							success: function(data) {
								if(data.result == 'success') {
									ss.layer.msg('上架成功！');
									self.lg_reloadFn();
								}
							},
							isJson: true
						});
					}
				},
				{
					name: '下架',
					colType: 'opt3',
					rely: {
						bagPlatformStatus: '0'
					},
					cbFn: function(curData, self) {
						self.eAjax({
							url: commonUrl + '/admin/TBagPlatform/batchUpdateBagPlatformStatus.action',
							type: 'post',
							data: {
								uuids: curData.uuid,
								bagPlatformStatus: 1
							},
						}, {
							success: function(data) {
								if(data.result == 'success') {
									ss.layer.msg('下架成功！');
									self.lg_reloadFn();
								}
							},
							isJson: true
						});
					}
				}
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});

})