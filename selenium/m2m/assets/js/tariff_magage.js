ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TBagImplementLog/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: 'iccid',
				txt: 'iccid',
				type: 'txt',
				width: '120px'
			},
			{
				name: '指令状态',
				txt: 'implementState',
				type: 'select',
				data: [{
						name: '执行成功',
						code: '1'
					},
					{
						name: '执行失败',
						code: '2'
					},
				],
				width: '180px'
			},
			{
				name: '指令类型',
				txt: 'implementType',
				type: 'select',
				data: [{
						name: '开通套餐',
						code: '1'
					},
					{
						name: '关闭套餐',
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

		},
		//表格内容
		table: {
			//各选项
			options: {
				dpWith:{
					implementState:6,
					implementType:6,
					createTime:9
				},
				isChangeTime: ['createTime'],
				closeInterlace: true,
				urlData: {
					bagUuid: {
						name: '用户',
						url: commonUrl + '/admin/TBag/queryByPageInfo.action',
						dataType: 'json',
						data: {},
						rely: {
							name: 'bagName',
							code: 'uuid'
						},
						digitalModel: {
							data: {
								location: ['data','data']
							}
						}
					}
				},
				shim:{
					implementState:{
						'1':'执行成功',
					    '2':'执行失败'
					},
					implementType:{
						'1':'开通套餐',
					    '2':'关闭套餐'
					}
				}
			},
			tlName: [
				'iccid', '开通套餐', '指令状态', '指令类型', '创建时间'
			], //表头名字
			tlTxt: [
				'iccid', 'bagUuid', 'implementState', 'implementType', 'createTime'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				//编辑和删除为默认，其它按钮需txt
//				{
//					name: '编辑',
//					url: commonUrl + '/admin/TBagImplementLog/editEntity.action',
//					dataType: 'json',
//					items: {
//						iccid: {
//							name: 'iccid',
//							type: 'txt'
//						},
//						bagUuid: {
//							name: '开通套餐',
//							type: 'txt'
//						},
//						implementState: {
//							name: '指令状态',
//							type: 'select',
//							data: [{
//									name: '执行成功',
//									code: '1'
//								},
//								{
//									name: '执行失败',
//									code: '2'
//								},
//							]
//						},
//						implementType: {
//							name: '指令类型',
//							type: 'select',
//							data: [{
//									name: '开通套餐',
//									code: '1'
//								},
//								{
//									name: '关闭套餐',
//									code: '2'
//								},
//							]
//						},
//					},
//					data: {
//						uuid: ''
//					},
//				},
				{
					name: '删除',
					colType: 'del',
					dataType: 'json',
					url: commonUrl + '/admin/TBagImplementLog/deleteEnttiybyUuid.action',
					data: {
						uuid: ''
					}
				},

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