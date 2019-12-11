ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TSn/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [
			{
				name: '客户',
				txt: 'customerUuid',
				code: 0,
				type: 'blurrySel',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TCustomer/sn/queryByPageInfo.action',
					dataType: 'json',
					data: {
						pageSize: 1000000,
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
			{
				name: 'IMEI号码',
				txt: 'imei',
				type: 'txt',
				width: '120px'
			},
			{
				name: 'SN号码',
				txt: 'sn',
				type: 'txt',
				width: '120px'
			},
			{
				name: '导入开始时间',
				txt: 'createTimeBegin',
				type: 'date',
				width: '180px'
			},
			{
				name: '导入结束时间',
				txt: 'createTimeEnd',
				type: 'date',
				width: '180px'
			},
		],
		//搜索栏额外按钮
		searchBtn: {
				add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TSn/addSn.action',
				items: {
					customerCode: {
						name: '客户',
						type: 'blurrySel',
						verify: true,
						width:'80%',
						data: {
							url: commonUrl + '/admin/TCustomer/sn/queryByPageInfo.action',
							data: {
								currentPage: 1,
								pageSize: 100000
							},
							dataType: 'json',
							rely: {
								name: 'customerName',
								code: 'uuid'
							},
							digitalModel: {
								data: {
									location: ['data','data']
								}
							}
						},
						cbFn: function(dom,self,code,dtSelf){
							var name = ss.getDom('._show',dom).innerHTML;
							dtSelf['scope']['addParaObj'].customerName = name
						}
					},
					iccid: {
						name: 'iccid',
						type: 'num',
						verify: true,
						width:'80%',
					},
					imei: {
						name: 'imei',
						type: 'num',
						verify: true,
						width:'80%',
					},
					sn: {
						name: 'sn',
						type: 'num',
						verify: true,
						width:'80%',
					}
				}
			},
			//默认 
			import: {
				name: 'Excel导入+',
				colType: 'opt1',
				cbFn: function(self) {
					ss.ssView.show({
						title: 'Excel导入',
						item: {
							customerUuid: {
								name: '客户',
								type: 'blurrySel',
								verify: true,
								width:'200px',
								data: {
									url: commonUrl + '/admin/TCustomer/sn/queryByPageInfo.action',
									data: {
										currentPage: 1,
										pageSize: 100000
									},
									dataType: 'json',
									rely: {
										name: 'customerName',
										code: 'uuid'
									},
									digitalModel: {
										data: {
											location: ['data','data']
										}
									}
								},
								cbFn: function(dom,self,code,dtSelf){
									var name = ss.getDom('._show',dom).innerHTML;
									dtSelf['scope']['addParaObj'].customerName = name
								}
							},
							uploadExcelFile: {
								name: 'excel文件',
								type: 'excel',
								verify: true,
								width:'200px',
								load:{
									url:'/html/template/importSnExcel.xlsx',
									name:'下载模板'
								}
							}
						},
						sureCliFn: function(self){
							var formDom = self.domWrap.conView.querySelector('form');
							var options={
								type: 'post',
								url:'/admin/TSn/importExcel.action',
								dataType:'json',
								beforeSend:function(){
									ss.c3Loading.show();
								},
								complete:function(){
									ss.c3Loading.hidden();
								},
								success:function(d){
									if(d.result == 'success'){
										ss.layer.msg('导入成功！')
										self.hidden();
										instance.lg_reloadFn();
									}
									if(d.result == 'error'){
										layer.msg(d.errorMsg);
										return 'return'
									}
								}
							};
							$(formDom).ajaxSubmit(options); 
						},
						type: 'form'
					})
				}
			},
			//导出
			export: {
				name: 'Excel导出',
				colType: 'opt1',
				cbFn: function(self) {
					self.lg_getSelectParasFn(); //序列化搜索参数
					exportFn(self)
				}			
			}
		},
		//表格内容
		table: {
			//各选项
			options: {
				isChangeTime: ['createTime'],
				closeInterlace: true,
				dpWith: {
					'customerName':5, 'sn':5, 'imei':5, 'iccid':5, 'createTime':5
				},
				//动态别名转换
				urlData:{
					customerUuid:{
						url:commonUrl + '/admin/TCustomer/imeiInfo/queryByPageInfo.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							currentPage: 1,
							pageSize: 10000
						},
						rely:{
							name:'customerName',code:'uuid'
						},
						digitalModel:{
							data:{
								location:['data','data']
							}
						}
					}
				}
			},
			tlName: [
				'客户名称', 'SN码', 'IMEI号', 'ICCID','导入时间'
			], //表头名字
			tlTxt: [
				'customerName', 'sn', 'imei', 'iccid', 'createTime'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				{
					name: '编辑',
					flag: 'edit',
					url: commonUrl + '/admin/TSn/addSn.action',
					dataType: 'json',
					items: {
						sn: {
							name: 'sn',
							type: 'txt',
							verify: true
						},
						imei: {
							name: 'imei',
							type: 'txt',
							verify: true
						},
						iccid: {
							name: 'iccid',
							type: 'txt',
							verify: true
						},
					},
					data: {
						uuid: ''
					},
				},
//				{
//					name: '删除',
//					colType: 'del',
//					dataType: 'json',
//					url: commonUrl + '/admin/TImei/deleteEnttiybyUuid.action',
//					data: {
//						uuid: ''
//					}
//				}
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
					url: commonUrl + '/admin/TImei/import.action',

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
			url: commonUrl + '/admin/TCustomer/imeiInfo/queryByPageInfo.action',
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
		var loading = layer.load(1, {
			  shade: [0.1,'#fff'] //0.1透明度的白色背景
			});
		//请求地址
		var queryUrl = commonUrl + "/admin/TSn/exportExcel.action";
		//请求参数
		var params = self.scope.queryObj;
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
				if(data.result == 'success') {
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
	
	
	

})