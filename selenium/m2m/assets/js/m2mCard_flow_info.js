ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TCardStore/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: 'iccdid开始段',
				txt: 'iccdStart',
				type: 'txt',
				width: '200px'
			}, {
				name: 'iccdid结束段',
				txt: 'iccdEnd',
				type: 'txt',
				width: '200px'
			}, {
				name: '运营商',
				txt: 'operator',
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
			},
			{
				name: '发卡开始时间',
				txt: 'createTimeStart',
				type: 'date',
				width: '120px',
				isLine: true,
			},
			{
				name: '发卡结束时间',
				txt: 'createTimeEnd',
				type: 'date',
				width: '120px',
			},
			{
				name: '激活开始时间',
				txt: 'activeTimeStart',
				type: 'date',
				width: '120px',
				isLine: true,
			},
			{
				name: '激活结束时间',
				txt: 'activeTimeEnd',
				type: 'date',
				width: '120px',
			}
		], //搜索栏额外按钮
		searchBtn: {
			import: {
				name: '导入',
				colType: 'opt2',
				cbFn: function(self) {
					cliFn_new(self);
				}
			},
			export: {
				name: '导出',
				colType: 'opt2',
				cbFn: function(self) {
					exportFn(self);
				}
			},
			//			reflesh: {
			//				name: '批量刷新',
			//				colType: 'opt2',
			//				cbFn: function(self) {
			//					refleshFn(self);
			//				}
			//			},
		},
		//表格内容
		table: {
			//各选项
			options: {
				dpWPer: '145%',
				closeInterlace: true,
				showTitle:[
					'iccid', 'supplierName', 'customerName',
					'imei', 'imsi', 'ONLINE', 'simStatus', 'activateTime',
					'stopTime', 'isBind', 'cardType', 'activationType',
					'flowMonthUsed', 'flowMonthResidual', 'createTime'
				],
				shim: {
					'cardType': {
						'1': 'sim卡',
						'2': '贴片卡',
						'3': 'emis卡'
					},
					'simStatus': {
						"1": '可激活',
						"2": '已激活',
						"3": "停用",
						"4": '失效'
					},
					'activationType': {
						'1': '手动激活',
						'2': '自动激活'
					}
				}
			},
			tlName: ['ICCID', '供应商', '客户',
				'IMEI', 'IMSI', '在线状态', '激活状态', '激活时间',
				'卡到期时间', '是否绑定', '卡片类型', '激活类型',
				'本月已用流量', '本月剩余流量', '创建时间'
			], //表头名字
			tlTxt: ['iccid', 'supplierName', 'customerName',
				'imei', 'imsi', 'ONLINE', 'simStatus', 'activateTime',
				'stopTime', 'isBind', 'cardType', 'activationType',
				'flowMonthUsed', 'flowMonthResidual', 'createTime'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				{
					name: '刷新',
					colType: '',
					cbFn: function(curData, self) {
						refleshFn(curData, self)
					}
				},
				{
					name: '激活',
					colType: '',
					cbFn: function(curData, self) {
						activeFn(curData, self)
					}
				},
				{
					name: '划拨',
					cbFn: function(curData, self) {
						pointerFn(curData, self)
					}
				},
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});

	function pointerFn(curData, self) {
		//点击手动录单模态框---开始
		/*建立模态框对象*/
		var modalBox = {};
		/*获取模态框*/
		modalBox.modal = document.getElementById("myModal");
		/*获得trigger按钮*/
		modalBox.triggerBtn = document.getElementById("triggerBtn");
		/*获得关闭按钮*/
		modalBox.closeBtn = document.getElementById("closeBtn");
		modalBox.cancelBtn = document.getElementById("cancelBtn");
		/*模态框显示*/
		modalBox.show = function() {
			console.log(this.modal);
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
		//点击手动录单模态框---结束
		//获取客户数据
		getCustomer("#customerUuid1")
		//保存
		document.getElementById('save').onclick = function() {
			var customerUuid = $("#customerUuid1").val();
			var iccids = []
			iccids.push(curData.iccid)

			var params = {
				customid: customerUuid,
				iccids: iccids
			}
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TCardStore/distribute.action',
				data: JSON.stringify(params),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					if(data.result == 'success') {
						//表格重载
					    instance.lg_reloadFn()
					    modalBox.close()
						layer.msg('划拨成功')
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
	//导入Excel+ 新弹窗
	var viewObj_new = {
		ctx: $('#dataCon')[0],
		domWrap: {
			v: ss.getDom('#View_new', this.ctx),
			vShaDow: ss.getDom('.V_shadow', ss.getDom('#View_new', this.ctx)),
			vCon: ss.getDom('.V_con', ss.getDom('#View_new', this.ctx)),
			VConc: ss.getDom('.V_con_c', ss.getDom('#View_new', this.ctx)),
			Vcancel: ss.getDom('.V_con_bt', ss.getDom('#View_new', this.ctx)),
			Vtitle: ss.getDom('.V_con_t', ss.getDom('#View_new', this.ctx)),
			Vsave: ss.getDom('.V_con_bs', ss.getDom('#View_new', this.ctx)),
		},
		dpCss: function() {
			ss.mdfCss(this.domWrap.vShaDow, ['width', ss.paraWrap.clwx, 'height', ss.paraWrap.clhx]);
			ss.mdfCss(this.domWrap.vCon, [
				'width', ss.paraWrap.clw * .6 + 'px',
				'top', ss.paraWrap.clh * .1 + 'px',
				'left', ss.paraWrap.clw * .2 + 'px'
			]);
		},
		dpClick: function() {
			var self = this;
			this.domWrap.Vcancel.onclick = function() {
				self['domWrap']['v'].style.display = 'none';
			};
			this.domWrap.Vsave.onclick = function() {
				if(document.querySelector('[for="deparment_data_new"]').innerHTML.indexOf('请选择') != -1) {
					layer.msg('请先选择EXCEL文件！', {
						offset: '100px'
					});
					return false;
				};
				var supplierUuid = $('#supplierUuid').val()
					var customerUuid = $('#customerUuid').val()
							var tagUuid = $('#tagUuid').val()
							var activationType = $('#activationType').val()
							var businessType = $('#businessType').val()
							var cardType = $('#cardType').val()
							if(!supplierUuid && !tagUuid && !activationType && !businessType && !cardType){
								layer.msg('请将必填数据填写完成')
								return 0
							}
				self['domWrap']['v'].style.display = 'none';
				var options = {
					type: 'post',
					url: commonUrl + '/admin/TCardStore/excelImport.action',
					dataType: 'json',
					beforeSend: function() {
						ss.c3Loading.show();
						importExcelC3();
					},
					success: function(d) {
						if(d.result == 'success') {
							layer.msg('导入成功！');
							$('#supplierUuid').val('')
							$('#customerUuid').val('')
							$('#tagUuid').val('')
							$('#activationType').val('')
							$('#businessType').val('')
							$('#cardType').val('')
							document.querySelector('[for="deparment_data_new"]').innerHTML = '请选择EXCEL文件'
							instance.lg_reloadFn();
						};
						if(d.result == 'error') {
							layer.msg(d.errorMsg || '系统异常！');
						};
						ss.c3Loading.hidden();
					}
				};
				$('#form_new').ajaxSubmit(options);
			};
		},
		start: function() {
			this.dpCss();
			this.dpClick();
		}
	}
	viewObj_new.start();
	//新弹窗->点击->函数
	function getCustomer(id) {
		//获取客户
		var params = {
			currentPage: 1,
			pageSize: 10000
		}
		$.ajax({
			type: 'POST',
			url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
			data: JSON.stringify(params),
			beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
			dataType: 'json',
			success: function(datajson) {
				var appName = datajson.data.data
				if(!appName) {
					return 0
				}
				$(id + " option").remove();
				var myreg = /^\d{11}$/;
				var option = "<option value=''>请选择客户</option>"
				for(var i = 0; i < appName.length; i++) {
					var customerUuid = appName[i].uuid
					var customerName = appName[i].customerName
					if(appName[i]) {
						option += "<option value=" + customerUuid + ">" + customerName + "</option>"
					}
				}
				$(id).append(option)
			},
			error: function(xhr, type) {
				alert("错误")
			}
		});
	}

	function cliFn_new(self) {
		getCustomer("#customerUuid")
		
		//获取套餐
		$("#customerUuid").change(function() {
			var customerUuid = $(this).val()
			if(customerUuid) {
				var params = {
					'customerUuid': customerUuid
				}
				$.ajax({
					type: 'POST',
					url: commonUrl + '/admin/TCustomerBag/queryAllBag.action',
					data: JSON.stringify(params),
					beforeSend: function(request) {
						request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
					},
					dataType: 'json',
					success: function(datajson) {

						var appName = datajson.data
						if(!appName) {
							return 0
						}
						$("#tagUuid option").remove();
						var myreg = /^\d{11}$/;
						var option = "<option value=''>请选择客户</option>"
						for(var i = 0; i < appName.length; i++) {
							var tagUuid = appName[i].uuid
							var bagName = appName[i].bagName
							if(appName[i]) {
								option += "<option value=" + tagUuid + ">" + bagName + "</option>"
							}
						}
						$("#tagUuid").append(option)
					},
					error: function(xhr, type) {
						alert("错误")
					}
				});
			}

		});

		viewObj_new['domWrap'].v.style.display = 'block';
		//excel文件名显示
		var showExcelNameFn = function(inputId) {
			document.getElementById(inputId).onchange = function() {
				var file = this.files[0];
				if(/\.xlsx/.test(file.name)) {
					this.parentNode.querySelector('label').innerHTML = file.name;
					this.parentNode.querySelector('label').title = file.name;
				} else {
					layer.msg('非excel文件，请重新选择', {
						offset: '100px'
					});
					return;
				}
			}
		};
		showExcelNameFn('deparment_data_new');
	};

	//导入excel的缓冲动画
	function importExcelC3() {
		//处理缓冲动画
		var shadowDom = ss.getDom('.c3Loading_shade');
		var circleDom = ss.getDom('.sk-circle');
		var importDom = ss.getDom('[name="import"]');
		ss.mdfCss(shadowDom, [
			'width', importDom.offsetWidth + 21 + 'px',
			'height', importDom.offsetHeight + 20 + 'px',
			'top', importDom.offsetTop - 10 + 'px',
			'left', importDom.offsetLeft - 5 + 'px',
			'borderRadius', '5px',
			'backgroundColor', '#000',
			'opacity', .3
		]);
		ss.crtDom('div', 'c3Txt', '导入中...', circleDom, {
			cn: ['position', 'left', 'top', 'color', 'width', 'fontWeight'],
			cv: ['absolute', '50px', '23px', '#fb8a30', '100px', 600]
		});
		ss.mdfCss(circleDom, [
			'top', importDom.offsetTop - 45 + 'px',
			'left', importDom.offsetLeft + 20 + 'px',
		]);
	};

	//导出
	function exportFn(self) {
		//		debugger
		//请求地址
		var queryUrl = commonUrl + "/admin/TCardStore/queryByPageInfo.action";
		//请求参数
		var params = {
			'currentPage': 1,
			'pageSize': 1000
		}
		//		var data = disposeRequestData();
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
				var dataContainer = data.data.data;
				var option = {};
				option.fileName = '卡库';
				option.datas = [{
					sheetData: [], //数据源
					sheetName: 'sheet',
					sheetFilter: ['iccid', 'supplierName', 'customerName',
						'imei', 'imsi', 'ONLINE', 'simStatus', 'activateTime',
						'stopTime', 'isBind', 'cardType', 'activationType',
						'flowMonthUsed', 'flowMonthResidual', 'createTime',
					],
					sheetHeader: ['ICCID', '供应商', '客户',
						'IMEI', 'IMSI', '在线状态', '激活状态', '激活时间',
						'卡到期时间', '是否绑定', '卡片类型', '激活类型',
						'本月已用流量', '本月剩余流量', '创建时间'
					]
				}];

				//对储存的数据进行遍历
				//console.log(dataContainer);
				var newDataWrap = [];
				var disposeData = ['iccid', 'supplierName', 'customerName',
					'imei', 'imsi', 'ONLINE', 'simStatus', 'activateTime',
					'stopTime', 'isBind', 'cardType', 'activationType',
					'flowMonthUsed', 'flowMonthResidual', 'createTime',
				];
				//console.log(disposeData);
				for(var a = 0; a < dataContainer.length; a++) {
					var tempObj = {};
					for(var b = 0; b < disposeData.length; b++) {
						tempObj[disposeData[b]] = dataContainer[a][disposeData[b]];
					}
					newDataWrap.push(tempObj);
				}
				//console.log(newDataWrap);
				option.datas[0].sheetData = newDataWrap;
				var toExcel = new ExportJsonExcel(option);
				toExcel.saveExcel();
			},
			error: function(data) {
				layer.msg('数据获取失败')
				layer.close(data);
			}
		});
	}
	//激活
	function activeFn(curData, self) {
		//请求地址
		var queryUrl = commonUrl + "/admin/TCardStore/active.action";
		//请求参数
		var params = {
			//			'iccid':curData.iccid
			'iccid': '89860618050000261578'
		}
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
					self.lg_reloadFn()
					layer.msg('激活成功')
				} else {
					layer.msg(data.errorMsg)
				}
			},
			error: function(data) {
				layer.msg('数据获取失败')
				layer.close(data);
			}
		});
	}
	//刷新
	function refleshFn(curData, self) {
		//请求地址
		var queryUrl = commonUrl + "/admin/TCardStore/refresh.action";
		var iccidArr = []
		iccidArr.push(curData.iccid)
		//请求参数
		var params = {
			'pageSize': self.tableData.pageSize.toString(),
			'iccids': iccidArr
		}
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
					self.lg_reloadFn()
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
	}
})