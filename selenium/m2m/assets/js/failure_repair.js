ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TFault/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '故障单号',
				txt: 'faultNum',
				type: 'txt',
				width: '120px'
			},
			{
				name: '故障状态',
				txt: 'status',
				type: 'select',
				data: [{
						name: '未处理',
						code: '1'
					},
					{
						name: '已经处理',
						code: '2'
					},
				],
				width: '180px'
			},
			{
				name: '开始时间',
				txt: 'createTimeBegin',
				type: 'date',
				width: '180px'
			},
			{
				name: '结束时间',
				txt: 'createTimeEnd',
				type: 'date',
				width: '180px'
			},
		],
		//搜索栏额外按钮
		searchBtn: {
//			add: {
//				name: '添加+',
//				colType: 'add',
//				dataType: 'json',
//				url: commonUrl + '/admin/TFault/addEntity.action',
//				items: {
//					faultNum: {
//						name: '故障单号',
//						type: 'txt'
//					},
//					phone: {
//						name: '联系方式',
//						type: 'txt'
//					},
//					contacts: {
//						name: '联系人',
//						type: 'txt',
//					},
//					faultPhone: {
//						name: '故障号码',
//						type: 'txt',
//					},
//					problemDescription: {
//						name: '故障描述',
//						type: 'txt',
//					},
//					status: {
//						name: '处理状态',
//						type: 'txt',
//					},
//					picUrl: {
//						name: '图片路径',
//						type: 'txt',
//					},
//					openId: {
//						name: '微信openId',
//						type: 'txt',
//					},
//					remark: {
//						name: '备注',
//						type: 'txt',
//					},
//				}
//			},
		},
		//表格内容
		table: {
			//各选项
			options: {
				dpWith:{
					creatTime:9,
					updateTime:9,
					phone:9
				},
				dpWPer:'115%',
				isChangeTime: ['creatTime','updateTime'],
				closeInterlace: true,
				isOperationFixed:true,//开启操作栏固定功能
				//动态别名转换
				urlData: {
					customerUuid: {
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
				},
				shim:{
					status:{
						'1':'未处理',
						'2':'已经处理'
					}
				}
			},
			tlName: [
				'故障单号', '联系方式', '联系人', '故障号码', '故障描述',
				'故障状态', '创建时间', '更新时间', '图片路径', '微信openId',
				'备注'
			], //表头名字
			tlTxt: [
				'faultNum', 'phone', 'contacts', 'faultPhone', 'problemDescription',
				'status', 'creatTime', 'updateTime', 'picUrl', 'openId',
				'remaks'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				//编辑和删除为默认，其它按钮需txt
				{
					name: '编辑',
					url: commonUrl + '/admin/TFault/editEntity.action',
					dataType: 'json',
					items: {
						status: {
							name: '故障状态',
							type: 'select',
							data:[
							{name:'未处理',code:'1'},
							{name:'已经处理',code:'2'},
							]
						},
						remaks: {
							name: '备注',
							type: 'txt',
						},
					},
					data: {
						uuid: ''
					},
				},
				{
					name: '删除',
					colType: 'del',
					dataType: 'json',
					url: commonUrl + '/admin/TFault/deleteEnttiybyUuid.action',
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
				self['domWrap']['v'].style.display = 'none';

				var options = {
					type: 'post',
					url: commonUrl + '/admin/TImei/excelImport.action',

					//					beforeSend: function() {
					//						ss.c3Loading.show();
					//						importExcelC3();
					//					},
					success: function(d) {
						if(d.result == 'success') {
							layer.msg('导入成功！');
							document.querySelector('[for="deparment_data_new"]').innerHTML = '请选择EXCEL文件'
							setTimeout(function() {
								instance.lg_reloadFn();
							}, 800)
						};
						if(d.result == 'error') {
							layer.msg(d.errorMsg || '系统异常！');
						};
						//ss.c3Loading.hidden();
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
	function cliFn_new(self) {
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
				$("#customerUuid option").remove();
				var myreg = /^\d{11}$/;
				var option = "<option value=''>请选择客户</option>"
				for(var i = 0; i < appName.length; i++) {
					var customerUuid = appName[i].uuid
					var customerName = appName[i].customerName
					if(appName[i]) {
						option += "<option value=" + customerUuid + ">" + customerName + "</option>"
					}
				}
				$("#customerUuid").append(option)
			},
			error: function(xhr, type) {
				alert("错误")
			}
		});
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

})