ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	
		//新增下拉框渲染
	function crtDomFn(dataArr, sData ,dom ,type,cbFn) {
		dom.innerHTML = '';
		ss.setDomTxt(dom.parentNode.parentNode, '上一级客户'); //赋值
		dom.parentNode.parentNode.setAttribute('code', ''); //code属性赋值
		dataArr.forEach(function(v, i) {
			ss.crtDom('p', '', v.name, dom, {
				cn: ['padding', 'color', 'fontSize', 'overflow', 'textOverflow', 'whiteSpace'],
				cv: ['0px 10px', i === 0 ? '#ccc' : '#333', '13px', 'hidden', 'ellipsis', 'nowrap'],
				an: ['code', '_index','curdata'],
				av: [v.code, i,JSON.stringify(v.curdata)]
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
					if(type==='edit'){
						ss.setDomTxt(dom.parentNode.parentNode, dom.innerHTML); //赋值
						dom.parentNode.parentNode.setAttribute('code', dom.getAttribute('code')); //code属性赋值
						self['scope']['editParaObj'][dom.parentNode.parentNode.getAttribute('name')] = dom.getAttribute('code');
						dom.parentNode.style.display = 'none'; //下拉框隐藏
						ss.getDom('.dateSvg', dom.parentNode.parentNode).style.transform = 'rotate(0deg)'; //icon旋转
						ss.mdfCss(dom.parentNode.parentNode, ['boxShadow', 'none', 'border', '1px solid #dee4f1', 'color', dom.getAttribute('code') ? '#000' : '#757575']); 
					}
					else{
						ss.setDomTxt(dom.parentNode.parentNode, dom.innerHTML); //赋值
						dom.parentNode.parentNode.setAttribute('code', dom.getAttribute('code')); //code属性赋值
						self['scope']['addParaObj'][dom.parentNode.parentNode.getAttribute('name')] = dom.getAttribute('code');
						dom.parentNode.style.display = 'none'; //下拉框隐藏
						ss.getDom('.dateSvg', dom.parentNode.parentNode).style.transform = 'rotate(0deg)'; //icon旋转
						ss.mdfCss(dom.parentNode.parentNode, ['boxShadow', 'none', 'border', '1px solid #dee4f1', 'color', dom.getAttribute('code') ? '#000' : '#757575']); //
					}
					cbFn && cbFn(self,dom);
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
			listUrl: commonUrl + '/admin/TBagSuppliers/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			//pageSize:5,//没�?�时，则默认是根据屏幕高度判断，保证�?�?
		},
		//搜索栏�?�项
		searchOption: [{
				name: '套餐名称',
				txt: 'bagSuppliersName',
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
				],
			},
			{
				name: '套餐类型',
				txt: 'bagSuppliersType',
				type: 'select',
				data:{
					url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
					dataType:'json',
					data:{
						dickey:'bag_type',
					},
					rely: { 
						name:"dicname",
						code:"dicvalue" 
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
				data:{
					url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
					dataType:'json',
					data:{
						dickey:'flow_type',
					},
					rely: {
						name:"dicname",
						code:"dicvalue" 
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
				data:{
					url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
					dataType:'json',
					data:{
						dickey:'bag_business_type',
					},
					rely: {
						name:"dicname",
						code:"dicvalue" 
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
		//搜索栏额外按�?
		searchBtn: {
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TBagSuppliers/addEntity.action',
				items: {
					bagSuppliersName: {
						name: '套餐名称',
						type: 'txt',
						verify: true
					},
//					bagSuppliersCode: {
//						name: '套餐编码',
//						type: 'txt',
//						verify: true,
//					},
					businessType: {
						name: '业务类型',
						type: 'select',
						data:{
							url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
							dataType:'json',
							data:{
								dickey:'bag_business_type',
							},
							rely: {
								name:"dicname",
								code:"dicvalue" 
							},
							digitalModel: {
								data: {
									location: ['data']
								}
							}
						},
						verify: true,
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
						check:function(curQuery){
							//单独字段校验->result结果为true时提示，tip为提示语
							//运营商为联通时，通讯计划&&资费计划不能为空
							return {
								result:curQuery.operatorName==2 && (!curQuery.communicationPlan || !curQuery.expensesPlan),
								tip:'运营商为联通时：通讯计划和资费计划需要填写！'
							};
						},
						cbFn:function(dom,self){
							//运营商选择为联通时-> 通讯计划和资费计划隐藏
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							var communicationPlan = parent.querySelector('[name="communicationPlan"]'); 
							var expensesPlan = parent.querySelector('[name="expensesPlan"]');
							[communicationPlan,expensesPlan].forEach(function(item){
								ss.mdfCss(item,[
									'display',
									dom.innerHTML.indexOf('联通')!=-1?'block':'none'
								]);
							});
							if(dom.innerHTML.indexOf('联通')==-1){
								//清空添加对象字段
								self['scope']['addParaObj']['communicationPlan'] = '';					
								self['scope']['addParaObj']['expensesPlan'] = '';					
							};
							 
							//根据运营商去筛选供应商数据
							self.eAjax({
					                url:commonUrl + '/admin/TSuppliers/queryByPageInfo.action',
					                type:'post',
					                data:{
					                	operator: dom.getAttribute('code'),
					                },
					            }, 
					            {
				                	success:function(data){
				                		if(data.data.data.length<=0){
				                			ss.layer.msg('该运营商下没绑定供应商！');
	                						crtDomFn(
												[{
													name:'供应商',code:''
												}],
											'',parent.querySelector('[name="suppliersName"]').querySelector('.selectItems'));
				                			return;
				                		}
		                   				var _endData =  data.data.data;
										//整理成下拉框需要的数据
										var _tempArr = [];
										_endData.forEach(function(item){
											_tempArr.push({
												name:item.supplierName,code:item.uuid,curdata:item
											});
										});
										crtDomFn(
											[{
												name:'供应商',code:''
											}].concat(_tempArr),
											'',
											parent.querySelector('[name="suppliersName"]').querySelector('.selectItems'),
											'add', 
											function(self,dom){
												var curData = JSON.parse(dom.getAttribute('curdata'));
												//赋值供应商
												self['scope']['addParaObj']['suppliersName'] = dom.getAttribute('code');
											}
										);
										//清空套餐值										
										self['scope']['addParaObj']['suppliersName'] = '';
				                	},
				                	isJson:true
				            	}
				            );
							
						}
					},
					suppliersName: {
						name: '供应商',
						type: 'select',
						data:{
							url:commonUrl + '/admin/TSuppliers/operatorTc/queryByPageInfo.action',
							dataType:'json',
							data:{
								currentPage: 1,
								pageSize: 10000
							},
							rely: {
								name:"supplierName",
								code:"uuid" 
							},
							digitalModel: {
								data: {
									location: ['data','data']
								}
							}
						},
						verify: true,
					},
//					operatorName: {
//						name: '运营商',
//						type: 'select',
//						data:{
//							url:commonUrl + '/admin/TSuppliers/operatorTc/queryByPageInfo.action',
//							dataType:'json',
//							data:{
//								currentPage: 1,
//								pageSize: 10000
//							},
//							rely: {
//								name:"supplierName",
//								code:"uuid" 
//							},
//							digitalModel: {
//								data: {
//									location: ['data','data']
//								}
//							}
//						},
//						verify: true,
//					},
					bagSuppliersType: {
						name: '套餐类型',
						type: 'select',
						data:{
							url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
							dataType:'json',
							data:{
								dickey:'bag_type',
							},
							rely: {
								name:"dicname",
								code:"dicvalue" 
							},
							digitalModel: {
								data: {
									location: ['data']
								}
							}
						},
						check:function(curQuery){
							//单独字段校验->result结果为true时提示，tip为提示语
							//套餐类型为主套餐时，到限制流量不能为空
//							return {
//								result:curQuery.bagSuppliersType==1 && !curQuery.limitType,
//								tip:'套餐类型为主套餐时：到限制流量不能为空！'
//							};
						},
						cbFn:function(dom,self){
							//套餐类型为主套餐时 -> 限制流量
//							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
//							var limitType = parent.querySelector('[name="limitType"]'); 
//							ss.mdfCss(limitType,[
//								'display',
//								dom.innerHTML.indexOf('主套餐')!=-1?'block':'none'
//							]);
//							if(dom.innerHTML.indexOf('主套餐')==-1){
//								//清空添加对象字段
//								self['scope']['addParaObj']['limitType'] = '';					
//							}
						},
						verify: true
					},
					flowType: {
						name: '包体类型',
						type: 'select',
						data:{
							url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
							dataType:'json',
							data:{
								dickey:'flow_type',
							},
							rely: {
								name:"dicname",
								code:"dicvalue" 
							},
							digitalModel: {
								data: {
									location: ['data']
								}
							}
						},
						verify: true
					},
					flowLimit: {
						name: '包含流量(M)',
						type: 'num',
						verify: true
					},
//					limitType: { 
//						name: '到限制流量时',
//						type: 'select',
//						isShow: 'false',
//						data:{
//							url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
//							dataType:'json',
//							data:{
//								dickey:'limit_type',
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
//						}
//					},
//					bagSuppliersStatus: {
//						name: '状态',
//						type: 'select',
//						data:{
//							url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
//							dataType:'json',
//							data:{
//								dickey:'bag_status',
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
//						verify: true,
//					},
//					costprice: {
//						name: '成本',
//						type: 'num',
//						verify: true
//					},
					communicationPlan: {
						name: '通讯计划',
						type: 'txt',
						isShow: 'false',
					}, 
					expensesPlan: {
						name: '资费计划',
						isShow: 'false',
						type: 'txt',
					},
					termMonth: {
						name: '期限/月',
						placeholder:'期限/月(与日二选一)',
						type: 'num',
						check:function(curQuery){
							//单独字段校验->result结果为true时提示，tip为提示语
							//校验两者为空，则提示任填一个！
							return {
								result:!curQuery.termMonth && !curQuery.termDay,
								tip:'期限月和日都为空，请任填一个！'
							};
						}
					},
					termDay: {
						name: '期限/日',
						placeholder:'期限/日(与月二选一)',
						type: 'num',
						check:function(curQuery){
							//单独字段校验->result结果为true时提示，tip为提示语
							//两者都有值时，则提示任填一个
							return {
								result:curQuery.termMonth && curQuery.termDay,
								tip:'期限月和日都有填写，只能任填一个！'
							};
						}
					},
					settlementDay: {
						name: '结算日(1~31)',
						type: 'num',
						verify: true
					},
					autoRule: {
						name: '相关自动化规则名',
						type: 'area',
					},
				}
			},
//			mulGround: {
//				name: '批量上架',
//				colType: 'opt1',
//				cbFn:function(self){
//					//循环对象，获取id集合
//					var _ids = [];
//					var checkDatas = self.scope.checkObj;
//					for(var x in checkDatas){
//						checkDatas[x].forEach(function(item){
//							_ids.push(item.uuid);
//						})
//					};
//					if(_ids.length<=0){
//						ss.layer.msg('请先勾选套餐！');
//						return;
//					};
//					//上架
//					self.eAjax({
//			                url:commonUrl + '/admin/TBagSuppliers/batchUpdateBagSuppliersStatus.action',
//			                type:'post',
//			                data:{
//			                	uuids:_ids.join(','),
//			                	bagSuppliersStatus: 0
//			                },
//			            }, 
//			            {
//		                	success:function(data){
//		                		if(data.result == 'success'){
//		                			ss.layer.msg('批量上架成功！');
//		                			self.scope.checkObj = {};//重置勾选
//		                			self.lg_reloadFn();
//		                		}
//		                	},
//		                	isJson:true
//		            	}
//		           );
//				}
//			},
//			mulUndercarriage:{
//				name: '批量下架',
//				colType: 'opt2',
//				cbFn:function(){
//					//循环对象，获取id集合
//					var _ids = [];
//					var checkDatas = self.scope.checkObj;
//					for(var x in checkDatas){
//						checkDatas[x].forEach(function(item){
//							_ids.push(item.uuid);
//						})
//					};
//					//上架
//					self.eAjax({
//			                url:commonUrl + '/admin/TBagSuppliers/batchUpdateBagSuppliersStatus.action',
//			                type:'post',
//			                data:{
//			                	uuids:_ids.join(','),
//			                	bagSuppliersStatus: 1
//			                },
//			            }, 
//			            {
//		                	success:function(data){
//		                		if(data.result == 'success'){
//		                			ss.layer.msg('批量下架成功！');
//		                			self.scope.checkObj = {};//重置勾选
//		                			self.lg_reloadFn();
//		                		}
//		                	},
//		                	isJson:true
//		            	}
//		           );
//				}
//			}
		},
		//表格内容
		table: {
			//各�?�项
			options: {
				closeInterlace: true,
				isChangeTime:[],
				dpWith:{
					'bagSuppliersName':8,
					'suppliersName':3, 
					'operatorName':3, 
					'businessType':3,
					'bagSuppliersType':2, 
					'flowType':2,
					'flowLimit':2,
					'communicationPlan':6, 
					'expensesPlan':6,
				},
				showTitle:[ 
					'bagSuppliersName', 'bagSuppliersType', 'flowType', 
					'flowLimit', 'operatorName', 
					 'communicationPlan', 'expensesPlan'
				],
				shim: {
					operatorName:{
						'1':'移动',
						'2':'联通',
						'3':'电信',
					},
					businessType:{
						'1':'流量包',
						'2':'语音包',
					}
				},
				//动态别名转换
				urlData:{
					bagSuppliersStatus:{
						url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							dickey:'bag_status',
						},
						rely:{
							name:"dicname",
							code:"dicvalue" 
						},
						digitalModel:{
							data:{
								location:['data']
							}
						}
					},
					bagSuppliersType:{
						url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							dickey:'bag_type',
						},
						rely:{
							name:"dicname",
							code:"dicvalue" 
						},
						digitalModel:{
							data:{
								location:['data']
							}
						}
					},
					limitType:{
						url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							dickey:'limit_type',
						},
						rely:{
							name:"dicname",
							code:"dicvalue" 
						},
						digitalModel:{
							data:{
								location:['data']
							}
						}
					},
					flowType:{
						url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							dickey:'flow_type',
						},
						rely:{
							name:"dicname",
							code:"dicvalue" 
						},
						digitalModel:{
							data:{
								location:['data']
							}
						}
					},
					suppliersName:{
						url:commonUrl + '/admin/TSuppliers/queryByPageInfo.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							currentPage: 1,
							pageSize: 10000
						},
						rely:{
							name:'supplierName',code:'uuid'
						},
						digitalModel:{
							data:{
								location:['data','data']
							}
						}
					}
				},
				//开启勾选框  
				isCheckbox:true
			},
			tlName: [
				'套餐名称','供应商','运营商','业务类型', '套餐类型', '包体类型', 
				'包含流量(M)', '通讯计划', '资费计划',
			], //表头名字
			tlTxt: [
				'bagSuppliersName','suppliersName', 'operatorName', 'businessType','bagSuppliersType', 'flowType', 
				'flowLimit', 'communicationPlan', 'expensesPlan',
			], //表头字段
			//操作�?
			operation: [
				//编辑和删除为默认，其它按钮需txt
				{
					name: '编辑',
					url: commonUrl + '/admin/TBagSuppliers/editEntity.action',
					dataType: 'json',
					items: {
						bagSuppliersName: {
							name: '套餐名称',
							type: 'txt',
							readonly:true,
							verify: true
						},
//						bagSuppliersCode: {
//							name: '套餐编码',
//							type: 'txt',
//							verify: true,
//						},
						businessType: {
							name: '业务类型',
							type: 'select',
							data:{
								url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
								dataType:'json',
								data:{
									dickey:'bag_business_type',
								},
								rely: {
									name:"dicname",
									code:"dicvalue" 
								},
								digitalModel: {
									data: {
										location: ['data']
									}
								}
							},
							verify: true,
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
							check:function(curQuery){
								//单独字段校验->result结果为true时提示，tip为提示语
								//运营商为联通时，通讯计划&&资费计划不能为空
								return {
									result:curQuery.operatorName==2 && (!curQuery.communicationPlan || !curQuery.expensesPlan),
									tip:'运营商为联通时：通讯计划和资费计划需要填写！'
								};
							},
							cbFn:function(dom,self){
								//运营商选择为联通时-> 通讯计划和资费计划隐藏
								var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
								var communicationPlan = parent.querySelector('[name="communicationPlan"]'); 
								var expensesPlan = parent.querySelector('[name="expensesPlan"]');
								[communicationPlan,expensesPlan].forEach(function(item){
									ss.mdfCss(item,[
										'display',
										dom.innerHTML.indexOf('联通')!=-1?'block':'none'
									]);
								});
								if(dom.innerHTML.indexOf('联通')==-1){
									//清空添加对象字段
									self['scope']['editParaObj']['communicationPlan'] = '';					
									self['scope']['editParaObj']['expensesPlan'] = '';					
								}
								
								
								//根据运营商去筛选供应商数据
								self.eAjax({
						                url:commonUrl + '/admin/TSuppliers/operatorTc/queryByPageInfo.action',
						                type:'post',
						                data:{
						                	operator: dom.getAttribute('code'),
						                },
						            }, 
						            {
					                	success:function(data){
					                		if(data.data.data.length<=0){
					                			ss.layer.msg('该运营商下没绑定供应商！');
		                						crtDomFn(
													[{
														name:'供应商',code:''
													}],
												'',parent.querySelector('[name="suppliersName"]').querySelector('.selectItems'));
					                			return;
					                		}
			                   				var _endData =  data.data.data;
											//整理成下拉框需要的数据
											var _tempArr = [];
											_endData.forEach(function(item){
												_tempArr.push({
													name:item.supplierName,code:item.uuid,curdata:item
												});
											});
											crtDomFn(
												[{
													name:'供应商',code:''
												}].concat(_tempArr),
												'',
												parent.querySelector('[name="suppliersName"]').querySelector('.selectItems'),
												'add', 
												function(self,dom){
													var curData = JSON.parse(dom.getAttribute('curdata'));
													//赋值供应商
													self['scope']['editParaObj']['suppliersName'] = dom.getAttribute('code');
												}
											);
											//清空套餐值										
											self['scope']['editParaObj']['suppliersName'] = '';
					                	},
					                	isJson:true
					            	}
					            );
								
								
							}
						},
						suppliersName: {
							name: '供应商',
							type: 'select',
							data:{
								url:commonUrl + '/admin/TSuppliers/operatorTc/queryByPageInfo.action',
								dataType:'json',
								data:{
									currentPage: 1,
									pageSize: 10000
								},
								rely: {
									name:"supplierName",
									code:"uuid" 
								},
								digitalModel: {
									data: {
										location: ['data','data']
									}
								}
							},
							verify: true,
						},
						bagSuppliersType: {
							name: '套餐类型',
							type: 'select',
							data:{
								url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
								dataType:'json',
								data:{
									dickey:'bag_type',
								},
								rely: {
									name:"dicname",
									code:"dicvalue" 
								},
								digitalModel: {
									data: {
										location: ['data']
									}
								}
							},
							check:function(curQuery){
								//单独字段校验->result结果为true时提示，tip为提示语
								//套餐类型为主套餐时，到限制流量不能为空
//								return {
//									result:curQuery.bagSuppliersType==1 
//											&& (
//												curQuery.limitType==void 0 || 
//												curQuery.limitType==null ||
//												curQuery.limitType==undefined
//											),
//									tip:'套餐类型为主套餐时：到限制流量不能为空！'
//								};
							},
							cbFn:function(dom,self){
								//套餐类型为主套餐时 -> 限制流量
//								var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
//								var limitType = parent.querySelector('[name="limitType"]'); 
//								ss.mdfCss(limitType,[
//									'display',
//									dom.innerHTML.indexOf('主套餐')!=-1?'block':'none'
//								]);
//								if(dom.innerHTML.indexOf('主套餐')==-1){
//									//清空添加对象字段
//									self['scope']['editParaObj']['limitType'] = '';					
//								}
							},
							verify: true
						},
						flowType: {
							name: '包体类型',
							type: 'select',
							data:{
								url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
								dataType:'json',
								data:{
									dickey:'flow_type',
								},
								rely: {
									name:"dicname",
									code:"dicvalue" 
								},
								digitalModel: {
									data: {
										location: ['data']
									}
								}
							},
							verify: true
						},
						flowLimit: {
							name: '包含流量(M)',
							type: 'num',
							verify: true
						},
//						limitType: { 
//							name: '到限制流量时',
//							type: 'select',
//							isShow: 'false',
//							data:{
//								url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
//								dataType:'json',
//								data:{
//									dickey:'limit_type',
//								},
//								rely: {
//									name:"dicname",
//									code:"dicvalue" 
//								},
//								digitalModel: {
//									data: {
//										location: ['data']
//									}
//								}
//							},
//							rendEnd:function(dom,curData){
//								//套餐类型为主套餐时->显示限时，并赋值
//								if(curData.bagSuppliersType ==1 ){
//									ss.mdfCss(
//										dom.parentNode.parentNode,
//										['display','block']
//									);
//								};
//							}
//						},
//						bagSuppliersStatus: {
//							name: '状态',
//							type: 'select',
//							data:{
//								url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
//								dataType:'json',
//								data:{
//									dickey:'bag_status',
//								},
//								rely: {
//									name:"dicname",
//									code:"dicvalue" 
//								},
//								digitalModel: {
//									data: {
//										location: ['data']
//									}
//								}
//							},
//							verify: true,
//						},
//						costprice: {
//							name: '成本',
//							type: 'num',
//							verify: true,
//						},
						communicationPlan: {
							name: '通讯计划',
							type: 'txt',
							isShow: 'false',
							rendEnd:function(dom,curData){
								//运营商为联通时->显示通讯计划
								if(curData.operatorName ==2 ){
									ss.mdfCss(
										dom.parentNode.parentNode,
										['display','block']
									);
								};
							}
						}, 
						expensesPlan: {
							name: '资费计划',
							isShow: 'false',
							type: 'txt',
							rendEnd:function(dom,curData){
								//运营商为联通时->显示资费计划
								if(curData.operatorName ==2 ){
									ss.mdfCss(
										dom.parentNode.parentNode,
										['display','block']
									);
								};
							}
						},
						termMonth: {
							name: '期限/月',
							placeholder:'期限/月(与日二选一)',
							type: 'num',
							check:function(curQuery){
								//单独字段校验->result结果为true时提示，tip为提示语
								//校验两者为空，则提示任填一个！
								return {
									result:!curQuery.termMonth && !curQuery.termDay,
									tip:'期限月和日都为空，请任填一个！'
								};
							}
						},
						termDay: {
							name: '期限/日',
							placeholder:'期限/日(与月二选一)',
							type: 'num',
							check:function(curQuery){
								//单独字段校验->result结果为true时提示，tip为提示语
								//两者都有值时，则提示任填一个
								return {
									result:curQuery.termMonth && curQuery.termDay,
									tip:'期限月和日都有填写，只能任填一个！'
								};
							}
						},
						settlementDay: {
							name: '结算日(1~31)',
							type: 'num',
							verify: true
						},
						autoRule: {
							name: '相关自动化规则名',
							type: 'area',
						},
					},
					data: {
						uuid: ''
					},
				},  
//				{
//					name: '上架',
//					colType: 'opt2',
//					rely:{
//						bagSuppliersStatus:'1'  
//					}, 
//					cbFn:function(curData,self){
//						self.eAjax({
//				                url:commonUrl + '/admin/TBagSuppliers/batchUpdateBagSuppliersStatus.action',
//				                type:'post',
//				                data:{
//				                	uuids:curData.uuid,
//				                	bagSuppliersStatus: 0
//				                },
//				            }, 
//				            {
//			                	success:function(data){
//			                		if(data.result == 'success'){
//			                			ss.layer.msg('上架成功！');
//			                			self.lg_reloadFn();
//			                		}
//			                	},
//			                	isJson:true
//			            	}
//			           );
//					}
//				},
//				{
//					name: '下架',
//					colType: 'opt3',
//					rely:{
//						bagSuppliersStatus:'0' 
//					},
//					cbFn:function(curData,self){ 
//						self.eAjax({
//				                url:commonUrl + '/admin/TBagSuppliers/batchUpdateBagSuppliersStatus.action',
//				                type:'post',
//				                data:{
//				                	uuids:curData.uuid,
//				                	bagSuppliersStatus: 1
//				                },
//				            }, 
//				            {
//			                	success:function(data){
//			                		if(data.result == 'success'){
//			                			ss.layer.msg('上架成功！');
//			                			self.lg_reloadFn();
//			                		}
//			                	},
//			                	isJson:true
//			            	}
//			           );
//					}
//				}
			],

		},
		//分页
		pageOption: {
			//各�?�项
		}
	});

})