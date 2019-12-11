ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TImei/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [
			{
				name: 'imei',
				txt: 'imei',
				type: 'txt',
				width: '120px'
			},
			{
				name: 'iccid',
				txt: 'iccid',
				type: 'txt',
				width: '120px'
			},
			{
				name: '客户',
				txt: 'customerUuid',
				code: 0,
				type: 'blurrySel',
				width: '180px',
				data: {
					url: commonUrl + '/admin/TCustomer/queryByPageInfo.action',
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
				name: '匹配类型',
				txt: 'type',
				code: 0,
				type: 'select',
				width: '180px',
				data: [
					{
						'code': 1,
						'name': '精准匹配'
					},
					{
						'code': 2,
						'name': '调整匹配'
					}
				]
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
				url: commonUrl + '/admin/TImei/batchInserImei.action',
				items: {
					customerUuid: {
						name: '客户',
						type: 'blurrySel',
						verify: true,
						width:'80%',
						data: {
							url: commonUrl + '/admin/TCustomer/imeiInfo/queryByPageInfo.action',
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
						}
					},
					type: {
						name: '匹配类型',type: 'select',verify:true,
						data:[
							{name:'精准匹配',code:'1'},
							{name:'调整匹配',code:'2'}
						]
					},
					imeiList: {
						name: '请输入IMEI',  
						type: 'area',
						placeholder:'请输入IMEI号码，多个IMEI号请用英文逗号隔开',
						verify: true,
						changeFn: function(dom,self){
							//改变->隐藏excel文件
							var excelItem = dom.parentNode.parentNode.parentNode.querySelector('[name="excel"]');
							excelItem.style.display = 'none';
							delete self['scope']['addParaObj']['importNum']
							delete self['scope']['addParaObj']['excel']
							
							//改变数量
							var imeilength=[];
							var ipNum = dom.parentNode.parentNode.parentNode.querySelector('[name="importNum"]').querySelector('span');
							var numGroup = $.trim(self['scope']['addParaObj'].imeiList).split(',')
							for(var i=0;i<numGroup.length;i++){
								if(numGroup[i]!=""){
									imeilength.push(numGroup[i])
								}
							}
							
							
							ipNum.innerHTML = imeilength.length
							console.log(imeilength)
							self['scope']['addParaObj'].imeiList = imeilength
						}
					},
					excel: {
						name: 'Excel文件',  
						type: 'excel',
						//上传接口
						upload:function(dom,self){
							//文件选择->隐藏文本域
							var areaItem = dom.parentNode.parentNode.parentNode.parentNode.querySelector('[name="imeiList"]');
							areaItem.style.display = 'none';
							var options = {
								type: 'post',
								url: '/admin/TImei/importExcel.action',
								beforeSend: function(request) {
									ss.c3Loading.show();
								},
								complete: function() {
									ss.c3Loading.hidden();
								},
								success: function(data) {
									if(data.result == 'success') {
										self['scope']['addParaObj'].imeiList = data['data']
										//改变数量
										var ipNum = dom.parentNode.parentNode.parentNode.parentNode.querySelector('[name="importNum"]').querySelector('span');
										ipNum.innerHTML = data['data'].length
										
										layer.msg('文件选择成功'); 
										
										delete self['scope']['addParaObj']['importNum']
										delete self['scope']['addParaObj']['excel']
										
									} else {
										layer.msg(data && data['errorMsg']);
									}
								}
							};
							$(dom.parentNode).ajaxSubmit(options);
						},
						//下载模板
						dlTemplate:function(){
							window.location.href = '/html/template/importImeiExcel.xlsx';
						}
					},
					importNum: {
						name: '导入数量',
						defaultTxt: '自动生成',  
						type: 'txtShow'
					}
				}
			},
			//默认 
//			import: {
//				name: 'lmei 导入+',
//				colType: 'opt1',
//				cbFn: function(self) {
//					cliFn_new(self);
//				}
//			}
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
					'customerUuid':5, 'superiorName':5, 'imei':5, 'createTime':5
				},
				shim: {
					'type': {
						'1': '精确匹配',
						'2': '调整匹配'
					}
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
				'客户名称', '上级客户', 'imei','匹配类型','导入时间','iccid'
			], //表头名字
			tlTxt: [
				'customerUuid', 'superiorName', 'imei','type','createTime','iccid'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				{
					name: '编辑',
					flag: 'edit',
					url: commonUrl + '/admin/TImei/editEntity.action',
					dataType: 'json',
					items: {
						imei: {
							name: 'imei',
							type: 'txt',
							verify: true
						}
					},
					data: {
						uuid: ''
					},
				},
				{
					name: '删除',
					colType: 'del',
					dataType: 'json',
					url: commonUrl + '/admin/TImei/deleteEnttiybyUuid.action',
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
		var queryUrl = commonUrl + "/admin/TImei/export.action";
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