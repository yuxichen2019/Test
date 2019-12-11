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
				var _dom = parentDom.parentNode.parentNode.parentNode.parentNode.querySelector('[name="_dom_1"]');
				var _dom2 = parentDom.parentNode.parentNode.parentNode.parentNode.querySelector('[name="_dom_2"]');
				ss.mdfCss(
					_dom.children[0], ['display', 'none']
				);
				ss.mdfCss(
					_dom2.children[0], ['display', 'none']
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
			self['scope']['addParaObj'].monthnum = '1';
			var _tDom = ss.getDom('[name="monthnum"]', _self.domWrap.viewC_con).children[0];
			_tDom.innerHTML = '*订购数量：';
			dgDom.querySelector('._inputTxt') ?
				(dgDom.querySelector('._inputTxt').style.display = 'block') :
				//非月包
				ss.crtDom('input', '_inputTxt', '', dgDom, {
					cn: ['width', 'height', 'borderBottom', 'fontSize', 'marginTop'],
					cv: ['100%', '30px', '1px solid rgb(204, 204, 204)', '14px', '6px'],
					an: ['palceholder', 'type', 'readonly', 'value'],
					av: ['订购月数', 'number', 'true', '1']
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
				obj.self.scope['selDatas']['bagPlatformUuid'] = _endData;
				//整理成下拉框需要的数据
				var _tempArr = [];
				_endData.forEach(function(item) {
					_tempArr.push({
						name: flag ? item.bagCustomerName : item.bagPlatformName,
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
	var urlStr = commonUrl + '/admin/TBagPlatform/profit/queryByPageInfo.action'
	var flag = false; //标识是否是一级客户

	//修改时一级和非一级客户的不同处理
	var itemObj2 = {
		bagPlatformName: {
			name: '当前套餐名称',
			type: 'txt',
			readonly: true,
			rendEnd: function(_curInputDom, curData, dom, self) {
				var _curPData = {}; //当前套餐信息
				$.ajax({
					type: "post",
					url: commonUrl + "/admin/TBagCustomer/queryByPageForProfitBag.action",
					async: false,
					contentType: 'application/json;charset=utf-8',
					data: JSON.stringify({
						uuid: curData.superiorBagUuid,
						profitBag: 1
					}),
					success: function(res) {
						if(res.result == 'success') {
							_curPData = res.data.data && res.data.data[0];
						} else {
							layer.msg(res.errorMsg || '数据获取失败')
						}
					}
				});
				var arr = [{
						name: '套餐类型',
						key: 'bagPlatformType',
						transfer: true,
					}, {
						name: '包体类型',
						key: 'flowType'
					},
					{
						name: '有效期',
						key: 'monthnum',
						unit: '月'
					},
					{
						name: '包含流量',
						key: 'flowLimit',
						unit: 'M'
					},
					{
						name: '终端售价',
						key: 'bagCustomerRetailsalePrice',
						unit: '元'
					},
					{
						name: '可分润金额',
						key: 'profitMoney',
						unit: '元'
					},
				]
				var bagPlatformType = {
					'1': '主套餐',
					'2': '叠加包',
				};
				var curdom = dom.parentNode;
				var childDom = ss.crtDom('div', 'bagView', '', dom, {})
					.appendDom(function(dom) {
						for(var i = 0; i < arr.length; i++) {
							ss.crtDom('div', 'item', '', dom, {})
								.appendDom(function(dom) {
									if(arr[i].transfer) {
										_curPData[arr[i].key] = bagPlatformType[_curPData[arr[i].key]];
									}
									ss.crtDom('span', '', arr[i].name + ': ', dom, {});
									ss.crtDom('span', '', _curPData[arr[i].key] + (arr[i].unit ? arr[i].unit : ''), dom, {
										an: ['id'],
										av: [arr[i].key]
									});
								})
						}
					})

				function insertAfter(newElement, targetElement) {
					var parent = targetElement.parentNode;
					if(parent.lastChild == targetElement) {
						parent.appendChild(newElement);
					} else {
						parent.insertBefore(newElement, targetElement.nextSibling);
					}
				}
				insertAfter(childDom, curdom);
				//套餐成本价
				var tbData = self.tableData.data;
				for(var j = 0; j < tbData.length; j++) {
					if(tbData[j].uuid == curData.uuid) {
						tbData[j].bagProfitPrice = _curPData['bagCustomerRetailsalePrice'] - _curPData['profitMoney'];
						//剩余分润
						var profitMoney1 = curData.profitPrice - tbData[j].bagProfitPrice
						profitMoney1 = profitMoney1.toString().indexOf('.') > -1 && profitMoney1.toString().split('.')[1] > 2 ? profitMoney1.toFixed(2) : profitMoney1;
						tbData[j].profitMoney1 = profitMoney1;
						break;
					}
				}
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
		bagProfitPrice: {
			name: '套餐成本价',
			type: 'txt',
			width: '80%',
			readonly: true,
			cbFn: function(value, self) {}
		},
		profitPrice: {
			name: '下级代理价',
			type: 'num',
			verify: true,
			width: '80%',
			cbFn: function(value, self, initValue) {
				if(value < Number($("input[name='bagProfitPrice']").val())) {
					layer.msg('下级代理价低于了套餐成本价');
					$("input[name='profitPrice']").val(initValue);
					self['scope']['editParaObj']['profitPrice'] = initValue;
					return;
				}
				if(value.indexOf('.') > -1) {
					if(value.split('.')[1].length > 2) {
						layer.msg('请输入带两位小数点的数字');
						self['scope']['editParaObj']['profitPrice'] = initValue;
						$("input[name='profitPrice']").val(initValue);
						return;
					}
				}
				//剩余分润
				var profit = Number(value) - Number($("input[name='bagProfitPrice']").val());
				profit = profit.toString().indexOf('.') > -1 && profit.toString().split('.')[1].length > 2 ? profit.toFixed(2) : profit;
				$("input[name='profitMoney1']").val(profit);
				self['scope']['editParaObj']['profitMoney1'] = profit;
				//分润金额
				var bagCustomerRetailsalePriceInnerHTML = document.querySelector('.bagView').querySelector('#bagCustomerRetailsalePrice').innerHTML;
				var profitMoney = Number(bagCustomerRetailsalePriceInnerHTML.substring(0, bagCustomerRetailsalePriceInnerHTML.length - 1)) - Number(value);
				profitMoney = profitMoney.toString().indexOf('.') > -1 && profitMoney.toString().split('.')[1] > 2 ? profitMoney.toFixed(2) : profitMoney;
				self['scope']['editParaObj']['profitMoney'] = profitMoney;
			}
		},
		profitMoney1: {
			name: '剩余分润',
			type: 'num',
			verify: true,
			width: '80%',
			cbFn: function(value, self, initValue) {
				if(value > self['scope']['editParaObj']['bagProfitPrice']) {
					layer.msg('剩余分润大于了套餐成本价');
					self['scope']['editParaObj']['profitMoney1'] = initValue;
					$("input[name='profitMoney1']").val(initValue);
					return;
				}
				if(value.indexOf('.') > -1) {
					if(value.split('.')[1].length > 2) {
						layer.msg('请输入带两位小数点的数字');
						self['scope']['editParaObj']['profitMoney1'] = initValue;
						$("input[name='profitMoney1']").val(initValue);
						return;
					}
				}
				var price = Number(value) + Number($("input[name='bagProfitPrice']").val());
				price = price.toString().indexOf('.') > -1 && price.toString().split('.')[1].length > 2 ? price.toFixed(2) : price;
				$("input[name='profitPrice']").val(price);
				self['scope']['editParaObj']['profitPrice'] = price;
				//分润金额
				var bagCustomerRetailsalePriceInnerHTML = document.querySelector('.bagView').querySelector('#bagCustomerRetailsalePrice').innerHTML;
				var profitMoney = Number(bagCustomerRetailsalePriceInnerHTML.substring(0, bagCustomerRetailsalePriceInnerHTML.length - 1)) - Number(price);
				profitMoney = profitMoney.toString().indexOf('.') > -1 && profitMoney.toString().split('.')[1] > 2 ? profitMoney.toFixed(2) : profitMoney;
				self['scope']['editParaObj']['profitMoney'] = profitMoney;
			}
		},
	}

	var itemObj = {
		bagCustomerRetailsalePrice: {
			name: '售价',
			type: 'num',
			verify: true,
			width: '80%',
			cbFn: function(value, self, initValue) {
				if(value.indexOf('.') > -1) {
					if(value.split('.')[1].length > 2) {
						layer.msg('请输入带两位小数点的数字');
						self['scope']['editParaObj']['bagCustomerRetailsalePrice'] = initValue;
						$("input[name='bagCustomerRetailsalePrice']").val(initValue);
						return;
					}
				}
			}
		},
		percent: {
			name: '分润比例(%)',
			type: 'num',
			width: '80%',
			cbFn: function(value, self) {
				if(self['scope']['editParaObj']['bagCustomerRetailsalePrice'] == "") {
					layer.msg('请先输入终端售价');
					self['scope']['editParaObj']['percent'] = ''
					return;
				}
				var profitMoney = self['scope']['editParaObj']['bagCustomerRetailsalePrice'] * value / 100
				$("input[name='profitMoney']").val(profitMoney);
				$("input[name='profitPrice']").val(self['scope']['editParaObj']['bagCustomerRetailsalePrice'] - profitMoney)
				self['scope']['editParaObj']['profitMoney'] = profitMoney
				self['scope']['editParaObj']['profitPrice'] = self['scope']['editParaObj']['bagCustomerRetailsalePrice'] - profitMoney
			}
		},
		profitMoney: {
			name: '分润金额',
			type: 'num',
			verify: true,
			width: '80%',
			cbFn: function(value, self, initValue) {
				if(self['scope']['editParaObj']['bagCustomerRetailsalePrice'] == "") {
					layer.msg('请先输入终端售价');
					self['scope']['editParaObj']['percent'] = ''
					return;
				}
				if(value.indexOf('.') > -1) {
					if(value.split('.')[1].length > 2) {
						layer.msg('请输入带两位小数点的数字');
						self['scope']['editParaObj']['profitMoney'] = initValue;
						$("input[name='profitMoney']").val(initValue);
						return;
					}
				}
				$("input[name='percent']").val(value / self['scope']['editParaObj']['bagCustomerRetailsalePrice'] * 100);
				$("input[name='profitPrice']").val(self['scope']['editParaObj']['bagCustomerRetailsalePrice'] - value)

				self['scope']['editParaObj']['percent'] = value / self['scope']['editParaObj']['bagCustomerRetailsalePrice'] * 100
				self['scope']['editParaObj']['profitPrice'] = self['scope']['editParaObj']['bagCustomerRetailsalePrice'] - value
			}
		},
		profitPrice: {
			name: '成本价',
			type: 'num',
			verify: true,
			width: '80%',
			cbFn: function(value, self, initValue) {
				if(self['scope']['editParaObj']['bagCustomerRetailsalePrice'] == "") {
					layer.msg('请先输入终端售价');
					self['scope']['editParaObj']['percent'] = ''
					return;
				}
				if(value.indexOf('.') > -1) {
					if(value.split('.')[1].length > 2) {
						layer.msg('请输入带两位小数点的数字');
						self['scope']['editParaObj']['profitPrice'] = initValue;
						$("input[name='profitPrice']").val(initValue);
						return;
					}
				}
				var profitMoney = self['scope']['editParaObj']['bagCustomerRetailsalePrice'] - value
				$("input[name='profitMoney']").val(profitMoney);
				$("input[name='percent']").val(profitMoney / self['scope']['editParaObj']['bagCustomerRetailsalePrice'] * 100)

				self['scope']['editParaObj']['profitMoney'] = profitMoney
				self['scope']['editParaObj']['percent'] = profitMoney / self['scope']['editParaObj']['bagCustomerRetailsalePrice'] * 100
			}
		},
	}
	//数据表格
	var tbInstance = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项 
		dataOption: {
			listUrl: commonUrl + '/admin/TBagCustomer/queryByPageForProfitBag.action',
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
				txt: 'bagCustomerName',
				type: 'txt',
				width: '200px'
			}, {
				name: '客户名称',
				txt: 'customerUuid',
				type: 'blurrySel',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TCustomer/profit/queryByPageInfo.action',
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
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TBagCustomer/profit/addEntity.action',
				items: {
					customerUuid: {
						name: '客户',
						type: 'blurrySel',
						width: '80%',
						verify: true,
						data: {
							url: commonUrl + '/admin/TCustomer/profit/queryByPageInfo.action',
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
							dtSelf['scope']['addParaObj']['profitBag'] = 1; //分润套餐标识
							//不是给一级客户添加套餐做的特别处理（添加接口不同，添加字段不同，获取套餐下拉接口不同）
							var itemsArr = document.querySelector('.viewC_con').querySelectorAll('.items');
							//非一级客户不需要显示字段
							var profitPriceF = null;
							var profitMoneyF = null;
							var monthnumF = null;
							var bagCustomerNameF = null;
							var bagCustomerRetailsalePriceF = null;
							var percentF = null;
							//一级客户不需要显示的字段
							var bagProfitPriceF = null;
							var profitPrice2F = null;
							var profitMoney2F = null;

							for(var i = 0; i < itemsArr.length; i++) {
								if(itemsArr[i].getAttribute('name') == "monthnum") {
									monthnumF = itemsArr[i]
								}
								if(itemsArr[i].getAttribute('name') == "bagCustomerName") {
									bagCustomerNameF = itemsArr[i]
								}
								if(itemsArr[i].getAttribute('name') == "bagProfitPrice") {
									bagProfitPriceF = itemsArr[i]
								}
								if(itemsArr[i].getAttribute('name') == "profitPrice") {
									profitPriceF = itemsArr[i]
								}
								if(itemsArr[i].getAttribute('name') == "profitMoney") {
									profitMoneyF = itemsArr[i]
								}
								if(itemsArr[i].getAttribute('name') == "profitPrice2") {
									profitPrice2F = itemsArr[i]
								}
								if(itemsArr[i].getAttribute('name') == "profitMoney2") {
									profitMoney2F = itemsArr[i]
								}
								if(itemsArr[i].getAttribute('name') == "profitPrice2") {
									profitPrice2F = itemsArr[i]
								}
								if(itemsArr[i].getAttribute('name') == "bagCustomerRetailsalePriceF") {
									profitMoney2F = itemsArr[i]
								}
								if(itemsArr[i].getAttribute('name') == "bagCustomerRetailsalePrice") {
									bagCustomerRetailsalePriceF = itemsArr[i]
								}
								if(itemsArr[i].getAttribute('name') == "percent") {
									percentF = itemsArr[i]
								}
							}
							var self = dtSelf;
							//根据运营商和供应商去获取运营商的套餐
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							var params = {
								customerUuid: dom.querySelector('._show').getAttribute('code'),
								operatorName: self['scope']['addParaObj'] && self['scope']['addParaObj']['operatorName'] || '',
								pageSize: 10000,
								profitBag: 1
							}
							if(curdata && JSON.parse(curdata).level != 1) {
								flag = true;
								urlStr = commonUrl + '/admin/TBagCustomer/profit/getSuperiorBag.action';
								var obj = {
									parent: parent,
									self: self,
									params: params,
									url: urlStr
								}
								renderBag(obj)
								delete self['scope']['addParaVerObj'].bagCustomerName;
								delete self['scope']['addParaVerObj'].monthnum;
								delete self['scope']['addParaVerObj'].bagCustomerRetailsalePrice;
								delete self['scope']['addParaVerObj'].profitMoney;
								delete self['scope']['addParaVerObj'].profitPrice;
								monthnumF && (monthnumF.style.display = "none");
								bagCustomerNameF && (bagCustomerNameF.style.display = "none");
								profitMoneyF && (profitMoneyF.style.display = "none");
								profitPriceF && (profitPriceF.style.display = "none");
								bagCustomerRetailsalePriceF && (bagCustomerRetailsalePriceF.style.display = "none");
								percentF && (percentF.style.display = "none");
								bagProfitPriceF && (bagProfitPriceF.style.display = "block");
								profitPrice2F && (profitPrice2F.style.display = "block");
								profitMoney2F && (profitMoney2F.style.display = "block");
								dtSelf.sourceObj.searchBtn.add.url = commonUrl + '/admin/TBagCustomer/profit/addEntityByCustomer.action'
							} else {
								flag = false;
								urlStr = commonUrl + '/admin/TBagPlatform/profit/queryByPageInfo.action';
								var obj = {
									parent: parent,
									self: self,
									params: params,
									url: urlStr
								}
								renderBag(obj)
								monthnumF && (monthnumF.style.display = "block");
								bagCustomerNameF && (bagCustomerNameF.style.display = "block");
								profitMoneyF && (profitMoneyF.style.display = "block");
								profitPriceF && (profitPriceF.style.display = "block");
								bagCustomerRetailsalePriceF && (bagCustomerRetailsalePriceF.style.display = "block");
								percentF && (percentF.style.display = "block");
								delete self['scope']['addParaVerObj'].bagProfitPrice;
								delete self['scope']['addParaVerObj'].profitPrice2;
								delete self['scope']['addParaVerObj'].profitMoney2;
								bagProfitPriceF && (bagProfitPriceF.style.display = "none");
								profitPrice2F && (profitPrice2F.style.display = "none");
								profitMoney2F && (profitMoney2F.style.display = "none");
								dtSelf.sourceObj.searchBtn.add.url = commonUrl + '/admin/TBagCustomer/profit/addEntity.action'
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
								profitBag: 1
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
								"profitBag": 1
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
							if(flag) {
								dtSelf['scope']['addParaObj']['superiorBagUuid'] = dom.querySelector('._show').getAttribute('code');
							}
							dtSelf['scope']['addParaObj']['profitBag'] = 1; //分润套餐标识
							var self = dtSelf;
							//运营商套餐选择时 -> 显示信息
							var parent = dom.parentNode.parentNode.parentNode.parentNode.parentNode;
							//信息展示容器
							var _dom_1 = flag ? parent.querySelector('[name="_dom_2"]') : parent.querySelector('[name="_dom_1"]');
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
										self['scope']['addParaObj']['bagPlatformType'] = _curPData && _curPData['bagPlatformType'] || '';
										self['scope']['addParaObj']['businessType'] = _curPData && _curPData['businessType'] || '';
										self['scope']['addParaObj']['flowLimit'] = _curPData && _curPData['flowLimit'] || '';
										self['scope']['addParaObj']['limitType'] = _curPData && _curPData['limitType'] || '';
										self['scope']['addParaObj']['monthnum'] = '';
										//套餐码
										//self['scope']['addParaObj']['bagPlatformCode'] = _curPData['bagSuppliersCode'];
										
										//需要赋值的dom
										var needTxts = _dom_1.children[0].children;
										var txts = [];
										var txtss = [];
										console.log(_curData)
										console.log(_curPData)
										console.log(self['scope']['addParaObj'])
										console.log(needTxts)
										//flag为true 不是一级客户 反之是
										if(flag) {
											txts = [
												'bagPlatformType',
												'flowType',
												'monthnum',
												'flowLimit',
												'bagCustomerRetailsalePrice',
												'profitMoney',
											];
											txtss = [
												'bag_type',
												'flow_type',
												'monthnum',
												'flow_limit',
												'bag_customer_retailsale_price',
												'profit_money'
											];
											self['scope']['addParaObj']['bagCustomerRetailsalePrice'] = _curPData['bagCustomerRetailsalePrice'];
											$("input[name='bagProfitPrice']").val(_curPData['bagCustomerRetailsalePrice'] - _curPData['profitMoney']);
											self['scope']['addParaObj']['bagProfitPrice'] = _curPData['bagCustomerRetailsalePrice'] - _curPData['profitMoney']
										} else {
											txts = [
												'businessType', 'bagPlatformType',
												'flowType',
												'flowLimit',
												'limitType'
											];
											txtss = [
												'bag_business_type', 'bag_type',
												'flow_type',
												'flow_limit', 'limit_type',
											]
										}

										for(var j = 0; j < needTxts.length; j++) {
											needTxts[j].setAttribute('id', txts[j]);
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
								].forEach(function(item, index) {
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
					//空白dom->做详细内容展示
					_dom_2: {
						name: 'dom',
						type: '_dom',
						renderFn: function(dom) {
							ss.crtDom('div', '', '', dom, {
								cn: ['borderTop', 'borderBottom', 'display', 'padding'],
								cv: ['1px dashed #ccc', '1px dashed #ccc', 'none', '10px 0px']
							}).appendDom(function(dom) {
								[{
										name: '套餐类型'
									}, {
										name: '包体类型'
									},
									{
										name: '有效期'
									},
									{
										name: '包含流量'
									},
									{
										name: '终端售价'
									},
									{
										name: '可分润金额'
									},
								].forEach(function(item, index) {
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
					bagCustomerRetailsalePrice: {
						name: '售价',
						type: 'num',
						verify: true,
						width: '80%',
						isShow: 'false',
						cbFn: function(value) {}
					},
					percent: {
						name: '分润比例(%)',
						type: 'num',
						width: '80%',
						isShow: 'false',
						cbFn: function(value, self) {
							if(self['scope']['addParaObj']['bagCustomerRetailsalePrice'] == "") {
								layer.msg('请先输入终端售价');
								self['scope']['addParaObj']['percent'] = ''
								return;
							}
							var profitMoney = self['scope']['addParaObj']['bagCustomerRetailsalePrice'] * value / 100
							$("input[name='profitMoney']").val(profitMoney);
							$("input[name='profitPrice']").val(self['scope']['addParaObj']['bagCustomerRetailsalePrice'] - profitMoney)
							self['scope']['addParaObj']['profitMoney'] = self['scope']['addParaObj']['bagCustomerRetailsalePrice'] * value / 100
							self['scope']['addParaObj']['profitPrice'] = self['scope']['addParaObj']['bagCustomerRetailsalePrice'] - self['scope']['addParaObj']['profitMoney']
						}
					},
					profitMoney: {
						name: '分润金额',
						type: 'num',
						verify: true,
						isShow: 'false',
						width: '80%',
						cbFn: function(value, self) {
							if(self['scope']['addParaObj']['bagCustomerRetailsalePrice'] == "") {
								layer.msg('请先输入终端售价');
								self['scope']['addParaObj']['percent'] = ''
								return;
							}
							if(value.indexOf('.') > -1) {
								if(value.split('.')[1].length > 2) {
									layer.msg('请输入带两位小数点的数字');
									self['scope']['addParaObj']['profitMoney'] = '';
									$("input[name='profitMoney']").val('');
									return;
								}
							}
							var percent = value / self['scope']['addParaObj']['bagCustomerRetailsalePrice'] * 100;
							percent = percent.toString().indexOf('.') > -1 && percent.toString().split('.')[1].length > 2 ? percent.toFixed(2) : percent;
							$("input[name='percent']").val(percent);
							$("input[name='profitPrice']").val(self['scope']['addParaObj']['bagCustomerRetailsalePrice'] - value)

							self['scope']['addParaObj']['percent'] = percent;
							self['scope']['addParaObj']['profitPrice'] = self['scope']['addParaObj']['bagCustomerRetailsalePrice'] - value
						}
					},
					profitPrice: {
						name: '成本价',
						type: 'num',
						verify: true,
						readonly: true,
						isShow: 'false',
						width: '80%',
						cbFn: function(value, self) {
							if(self['scope']['addParaObj']['bagCustomerRetailsalePrice'] == "") {
								layer.msg('请先输入终端售价');
								self['scope']['addParaObj']['percent'] = ''
								return;
							}
							if(value.indexOf('.') > -1) {
								if(value.split('.')[1].length > 2) {
									layer.msg('请输入带两位小数点的数字');
									self['scope']['addParaObj']['profitPrice'] = '';
									$("input[name='profitPrice']").val('');
									return;
								}
							}
							var profitMoney = self['scope']['addParaObj']['bagCustomerRetailsalePrice'] - value
							$("input[name='profitMoney']").val(profitMoney);
							$("input[name='percent']").val(profitMoney / self['scope']['addParaObj']['bagCustomerRetailsalePrice'] * 100)

							self['scope']['addParaObj']['profitMoney'] = self['scope']['addParaObj']['bagCustomerRetailsalePrice'] - value
							self['scope']['addParaObj']['percent'] = self['scope']['addParaObj']['profitMoney'] / self['scope']['addParaObj']['bagCustomerRetailsalePrice'] * 100
						}
					},
					bagProfitPrice: {
						name: '套餐成本价',
						type: 'txt',
						verify: true,
						readonly: true,
						width: '80%',
					},
					profitPrice2: {
						name: '下级代理价',
						type: 'num',
						verify: true,
						width: '80%',
						cbFn: function(value, self) {
							if(value < self['scope']['addParaObj']['bagProfitPrice']) {
								layer.msg('下级代理价低于了套餐成本价');
								self['scope']['addParaObj']['profitPrice2'] = '';
								$("input[name='profitPrice2']").val('');
								return;
							}
							if(value.indexOf('.') > -1) {
								if(value.split('.')[1].length > 2) {
									layer.msg('请输入带两位小数点的数字');
									self['scope']['addParaObj']['profitPrice2'] = '';
									$("input[name='profitPrice2']").val('');
									return;
								}
							}
							//剩余分润
							var profit = Number(value) - Number($("input[name='bagProfitPrice']").val());
							profit = profit.toString().indexOf('.') > -1 && profit.toString().split('.')[1].length > 2 ? profit.toFixed(2) : profit;
							self['scope']['addParaObj']['profitPrice'] = value;
							$("input[name='profitMoney2']").val(profit);
							self['scope']['addParaObj']['profitMoney2'] = 1;
							//分润金额
							var bagCustomerRetailsalePrice = document.querySelector('#bagCustomerRetailsalePrice').innerHTML.split('：')[1];
							var profitMoney = Number(bagCustomerRetailsalePrice) - Number(value);
							profitMoney = profitMoney.toString().indexOf('.') > -1 && profitMoney.toString().split('.')[1] > 2 ? profitMoney.toFixed(2) : profitMoney;
							self['scope']['addParaObj']['profitMoney'] = profitMoney;
						}
					},
					profitMoney2: {
						name: '剩余分润',
						type: 'num',
						verify: true,
						width: '80%',
						cbFn: function(value, self) {
							if(value > self['scope']['addParaObj']['bagProfitPrice']) {
								layer.msg('剩余分润大于了套餐成本价');
								self['scope']['addParaObj']['profitMoney2'] = '';
								$("input[name='profitMoney2']").val('');
								return;
							}
							if(value.indexOf('.') > -1) {
								if(value.split('.')[1].length > 2) {
									layer.msg('请输入带两位小数点的数字');
									self['scope']['addParaObj']['profitMoney2'] = ''
									$("input[name='profitMoney2']").val('');
									return;
								}
							}
							var profitPrice2 = Number($("input[name='bagProfitPrice']").val()) - Number(value);
							profitPrice2 = profitPrice2.toString().indexOf('.') > -1 && profitPrice2.toString().split('.')[1].length > 2 ? profitPrice2.toFixed(2) : profitPrice2;
							$("input[name='profitPrice2']").val(profitPrice2);
							self['scope']['addParaObj']['profitPrice'] = profitPrice2;
							self['scope']['addParaObj']['profitPrice2'] = 1;
							//分润金额
							var bagCustomerRetailsalePrice = document.querySelector('#bagCustomerRetailsalePrice').innerHTML.split('：')[1];
							var profitMoney = Number(bagCustomerRetailsalePrice) - Number(profitPrice2);
							profitMoney = profitMoney.toString().indexOf('.') > -1 && profitMoney.toString().split('.')[1] > 2 ? profitMoney.toFixed(2) : profitMoney;
							self['scope']['addParaObj']['profitMoney'] = profitMoney;
						}
					},
				}
			}
		},
		//表格内容
		table: {
			//各选项
			options: {
				sort: [''],
				dpWPer: '120%',
				isCheckbox: true,
				dpWith: {
					bagCustomerRetailbagStatus: 4,
					bagCustomerRetailsalePrice:10
				},
				closeInterlace: true,
				isChangeTime: ['createTime'], //是否进行时间戳转时间 
				showTitle: [],
				//动态别名转换
				urlData: {
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
					}
				},
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
					recommend: {
						'1': '未推荐',
						'2': '已推荐'
					}
				},
				cbFn: function(self, curdata) {
					var tbData = self.tableData.data;
					for(var i = 0; i < document.querySelector(".tbCWrap").querySelectorAll("[name='profitPer']").length; i++) {
						//计算分润比
						var profitMoney = document.querySelector(".tbCWrap").querySelectorAll("[name='profitMoney']")[i].innerHTML
						var bagCustomerRetailsalePrice = document.querySelector(".tbCWrap").querySelectorAll("[name='bagCustomerRetailsalePrice']")[i].innerHTML
						var dot = (profitMoney / bagCustomerRetailsalePrice * 100).toString().indexOf('.') > 0;
						var percent = dot ? (profitMoney / bagCustomerRetailsalePrice * 100).toFixed(2) : (profitMoney / bagCustomerRetailsalePrice * 100)
						tbData[i].percent = percent;
						document.querySelector(".tbCWrap").querySelectorAll("[name='profitPer']")[i].innerHTML = percent;
						//上下架颜色区分显示
						var bagCustomerRetailbagStatusDom = document.querySelector(".tbCWrap").querySelectorAll("[name='bagCustomerRetailbagStatus']")[i];
						bagCustomerRetailbagStatusDom.style.color = bagCustomerRetailbagStatusDom.innerHTML == '上架' ? '#0ac4e0' : '#e0c40a';
					};
					
					
					ss.polling({
						condition: function() {
							return self.domWrap.tbCWrap.querySelectorAll('ul').length > 0;
						},
						cbFn: function() {
//							gradeBag 
							console.log(self.tableData.data)
							console.log(curdata)
							
							var curUls = self.domWrap.tbCWrap.querySelectorAll('ul');
							console.log(curUls)
							for(var i = 0; i < curUls.length; i++) {
								ss.mdfCss(curUls[i], ['position', 'relative']);
								//改价
								if(self.tableData.data[i].gradeBag == 1){
									var curPriceDom = curUls[i].querySelector('[name="bagCustomerRetailsalePrice"]');
									ss.mdfCss(curPriceDom, ['position', 'relative']);
									modefyPrice(curPriceDom, i, 'bagCustomerRetailsalePrice', 1, self);
								}
							}
						}
					})
					
					
				}
			},
			tlName: [
				'套餐名称', '客户名称', '运营商', '套餐类型',
				'包体类型', '有效期（月）', '包含流量(M)', '终端售价（元）',
				'分润比例（%）', '分润金额（元）', '实际成本价（元）', '状态', '备注'
			], //表头名字
			tlTxt: [
				'bagCustomerName', 'customerName', 'operatorName', 'bagPlatformType',
				'flowType', 'monthnum', 'flowLimit', 'bagCustomerRetailsalePrice',
				'profitPer', 'profitMoney', 'profitPrice', 'bagCustomerRetailbagStatus', 'remark'
			], //表头字段
			//操作项
			operation: [
//				{
//					name: '改价',
////					rely: {
////						gradeBag: '1'
////					},					 
//					url: commonUrl + '/admin/TBagCustomer/updatePriceByUuid.action',
//					flag:'edit',
//					dataType: 'json',
//					items: {
//						bagCustomerRetailsalePrice: { 
//							name: '售价（元）', 
//							type: 'num',  
//							verify:true,
//							check:function(paraObj){
//								var salePrice = paraObj.bagCustomerRetailsalePrice;
//								return {
//									result:Number(salePrice)<0 ? true : false,
//									tip:'售价请输入非负数的数字！'
//								}
//							}
//						}
//					},
//					
//					data: { uuid: '' },
//				},
				
				{
					name: '修改',
					flag: 'edit',
					colType: 'opt1',
					url: commonUrl + '/admin/TBagCustomer/editEntityForAllChange.action',
					dataType: 'json',
					items: itemObj,
					data: {
						uuid: ''
					},
					cbFn: function(curData, editItem) {
						var editItem = editItem;
						if(curData.gradeBag > 1) {
							editItem.items = itemObj2;
						} else {
							editItem.items = itemObj;
						}
					}
				},
				{
					name: '编辑',
					flag: 'edit',
					colType: 'opt2',
					url: commonUrl + '/admin/TBagCustomer/profit/editEntity.action',
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
					name: '上架',
					colType: 'opt2',
					cbFn: function(curdata, self) {
						changebagStatus(curdata, self, 0)
					}
				},
				{
					name: '下架',
					colType: 'opt3',
					cbFn: function(curdata, self) {
						changebagStatus(curdata, self, 1)
					}
				},
			]
		},
		//分页
		pageOption: {
			//各选项
		}
	});
	
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
				'absolute', '50%', '20px', '26px', '24px',
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
				params["salePrice"] = dom.parentNode.querySelector('.' + field + 'Change').value
				
				if(dom.getAttribute('issel') == 'true') {
					if(dom.parentNode.querySelector('.' + field + 'Change').value <=0 ){
						ss.layer.msg('价格不可低于0!');
						return
					}
					self.eAjax({
						url: commonUrl+"/admin/TBagCustomer/updatePriceByUuid.action",
						type: 'post',
						data:params,
					}, {
						success: function(data) {
							if(data.result == 'success' && data.data == 1) {
								self.lg_reloadFn();
								ss.layer.msg('改价成功!');
							}
						},
						isJson: true
					})

					dom.innerHTML = '改价';
					dom.setAttribute('issel', 'false');
				} else {
//					if(dom.parentNode.querySelector('.' + field + 'Change').value <=0 ){
//						ss.layer.msg('加个不可低于1!');
//						return
//					}
					var _inputDom = dom.parentNode.querySelector('.' + field + 'Change');
					ss.mdfCss(_inputDom, ['display', 'block']);
					dom.innerHTML = '确定';
					dom.setAttribute('issel', 'true');
				};
			}
		])
	}
	
	
	
	//上下架
	function changebagStatus(curdata, self, type) {
		//上架，下架
		self.eAjax({
			url: commonUrl + '/admin/TBagCustomer/profit/updateStatusByCustomer.action',
			type: 'post',
			data: {
				uuid: curdata.uuid,
				bagCustomerRetailbagStatus: type
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