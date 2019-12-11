﻿﻿
ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	var pfPoolUuid = localStorage.getItem('pfPoolUuid') || '';
	var opPoolName = localStorage.getItem('pfPoolName') || '';
	document.querySelector('#parentPoolName').innerHTML = opPoolName || ''
	var queryData = {
		pfPoolUuid
	}
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#shareListList1')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TPoolChild/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify(queryData),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
			name: '请输入子池名称',
			txt: 'chPoolName',
			type: 'txt',
			width: '200px'
		}], //搜索栏额外按钮
		searchBtn: {
			//默认
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TPoolChild/addEntity.action',
				items: {
					chPoolName: {
						name: '子池名称',
						type: 'txt',
						verify: true
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
					pfPoolUuid: {
						name: '子池名称',
						type: 'txt',
						value:pfPoolUuid,
						isShow: 'false'
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
				//				dpWPer: '110%',
				dpWith: {
					'chPoolName': 9,
					'packageName': 9,
					'totalCardNum': 7,
					'totalActivityCard': 7,
					'totalFlowLimit': 7,
					'totalUsedFlow': 7,
					'totalUnusedFlow': 7,
					'poolLimitType': 7,
					'createTime': 9,
				},
				closeInterlace: true,
				isChangeTime: ['createTime'],
				showTitle: ['chPoolName', 'packageName',
					'totalCardNum', 'totalActivityCard',
					'totalFlowLimit', 'totalUsedFlow', 'totalUnusedFlow',
					'poolLimitType', 'createTime'
				],
				sort: {

				},
				shim: {
					'poolLimitType': {
						0: '无限量',
						1: '降速',
						2: '停卡',
						3: '计费使用'

					}
				},
				cbFn: function(curData) {}
			},

			tlName: ['子池名称', '套餐名称',
				'总卡数（张）', '已激活（张）',
				'可用量（G）', '已用量（G）', '剩余用量',
				'池超量策略', "创建日期"
			], //表头名字
			tlTxt: ['chPoolName', 'packageName',
				'totalCardNum', 'totalActivityCard',
				'totalFlowLimit', 'totalUsedFlow', 'totalUnusedFlow',
				'poolLimitType', 'createTime'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				//				{
				//					name: '编辑',
				//					url: commonUrl + '/admin/TBagPlatform/poolPlatformBag/editEntity.action',
				//					dataType: 'json',
				//					items: {
				//						chPoolName: {
				//							name: '子池名称',
				//							type: 'txt',
				//							verify: true
				//						},
				//						limitType: {
				//							name: '池超量策略',
				//							type: 'select',
				//							isShow: 'false',
				//							data: [{
				//									'code': 0,
				//									'name': '无限量'
				//								},
				//								{
				//									'code': 1,
				//									'name': '降速'
				//								},
				//								{
				//									'code': 2,
				//									'name': '停卡'
				//								},
				//								{
				//									'code': 3,
				//									'name': '计费使用'
				//								},
				//							],
				//						},
				//					},
				//					data: {
				//						uuid: ''
				//					},
				//				},
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
				url: commonUrl + '/admin/TPoolChild/editWarnPercent.action',
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
	$("#shareListList1 .unicom").click(function() {
		location.hash = "shareList_list2";
	})
	//	返回
	$("#shareListList1 .back").click(function() {
		window.history.go(-1);
	})
})