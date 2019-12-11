ss.imports(['dataTable', 'blurrySel'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon_cs')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TAppointmentRecord/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify({}),
//			pageSize: 2, //没值时，则默认是根据屏幕高度判断，保证一页 
		},
		//搜索栏选项
		searchOption: [{
				name: '卡片ID或者Msisdn',
				txt: 'iccIdAndMsisdn',
				type: 'txt',
				width: '200px'
			},
			{
				name: '变更前值',
				txt: 'changeBefore',
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': '可激活',
						'name': '可激活'
					},
					{
						'code': '已激活',
						'name': '已激活'
					},
					{
						'code': '停用',
						'name': '停用'
					},
					{
						'code': '失效',
						'name': '失效'
					},
					{
						'code': '库存',
						'name': '库存'
					}
				]
			},
			{
				name: '变更后值',
				txt: 'changeAfter',
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': '可激活',
						'name': '可激活'
					},
					{
						'code': '已激活',
						'name': '已激活'
					},
					{
						'code': '停用',
						'name': '停用'
					},
					{
						'code': '失效',
						'name': '失效'
					},
					{
						'code': '库存',
						'name': '库存'
					}
				]
			},
			{
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
				name: '执行状态',
				txt: 'status',
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': 1,
						'name': '创建'
					},
					{
						'code': 2,
						'name': '预约成功'
					},
					{
						'code': 3,
						'name': '预约成功'
					},
					{
						'code': 4,
						'name': '取消预约'
					},
					{
						'code': 5,
						'name': '后续预约'
					}
				]
			},
			{
				name: '客户名称',
				txt: 'customerName',
				type: 'txt',
				width: '200px'
			},
			{
				name: '创建开始日期',
				txt: 'createTimeStart',
				type: 'date',
				width: '120px',
			},
			{
				name: '创建结束日期',
				txt: 'createTimeEnd',
				type: 'date',
				width: '120px',
			}
		], //搜索栏额外按钮
		searchBtn: {

			import: {
				name: '导入',
				colType: 'opt2',
				cbFn: function(self) {
					importFn(self);
				}
			},
			export: {
				name: '导出',
				colType: 'opt2',
				cbFn: function(self) {
					exportFn(self);
				}
			}
		},
		//表格内容
		table: {
			//各选项
			options: {
				isCheckbox: true,
				sort: ['iccid'],
				dpWPer: '100%',
				dpWith: {
				},
				closeInterlace: true,
				dpWith: {
				},
				isChangeTime: ['createTime', 'changeTime'],
				showTitle: [],
				shim: {
					'status': {
						'1': '创建',
						'2': '预约成功',
						'3': '预约失败',
						'4': '取消预约',
						'5': '后续预约'
					}
				}
			},
			tlName: ['ICCID', '运营商', '客户名称',
				'变更前值', '变更后值', '执行状态', '申请时间', '生效时间'
			], //表头名字
			tlTxt: ['iccid', 'supplierName', 'customerName',
				'changeBefore', 'changeAfter', 'status', 'createTime', 'changeTime'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});

	function importFn(self) {

//		console.log(self["scope"]["checkObj"][self["tableData"]["currentPage"]])
		/*建立模态框对象*/
		var modalBox = {};
		//		获取勾选的卡号数量
		modalBox.ischeck = self["scope"]["checkObj"] && self["scope"]["checkObj"].length!=0 && self["scope"]["checkObj"][self["tableData"]["currentPage"]] || [];
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
		if(modalBox.ischeck.length!=0){			
			for(var i=0;i<modalBox.ischeck.length;i++){
				modalBox.iccidList.push(modalBox.ischeck[i].iccid)
			};			
		}
		if(modalBox.iccidList.length==0){
			$("#hbFile1").css({"display":"block"})
		}else{
			$("#hbFile1").css({"display":"none"})
		}
		$("#stateIccid").val(modalBox.iccidList.join(",\n"));
		$("#stateNum").text(modalBox.iccidList.length)
		
		/*模态框初始化*/
		modalBox.init = function() {
			var that = this;
			modalBox.show();
			modalBox.closeBtn.onclick = function() {
				modalBox.close();
			}
			modalBox.cancelBtn.onclick = function() {
				modalBox.close();
			}
			modalBox.outsideClick();
		}
		modalBox.init();
		
//		// 默认选择文件text
		document.getElementById('daoruText').innerHTML = "选择";

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
			
			var options = {
				type: 'post',
				url: '/admin/TCardStore/importExcel.action',
				beforeSend: function(request) {
					ss.c3Loading.show();
				},
				complete: function() {
					ss.c3Loading.hidden();
				},
				success: function(data) {
					console.log(data)
					if(data.result == 'success') {
						modalBox.iccidList = data['data'];
						$("#stateIccid").val(modalBox.iccidList.join(",\n"));
						$("#stateNum").text(modalBox.iccidList.length)
						layer.msg('文件选择成功');
					} else {
						layer.msg(data && data['data']);
					}
				}
			};
			$('#msmForm').ajaxSubmit(options);
		}
//
//		//保存
		$("#status").val("")
		document.getElementById('daoruSave').onclick = function() {
			var status = $("#status").val();
			
			if(!status || modalBox.iccidList.length == 0) {
				layer.msg('请将必填数据填写完成')
				return;
			}
			$.ajax({
				type: 'POST',
				url: commonUrl + '/admin/TAppointmentRecord/updateStatusByIccid.action',
				data: JSON.stringify({
					"iccidList":modalBox.iccidList,
					"status":status
				}),
				beforeSend: function(request) {
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				},
				dataType: 'json',
				success: function(data) {
					console.log(data)
					if(data.result == 'success') {
						layer.msg('操作成功')
						if(self.scope.checkObj) {
							self.scope.checkObj[self.pageData.page] = [];
						}
						instance.lg_reloadFn();
						document.querySelector("#daoruClose").click();
					} else {
						layer.msg(data.errorMsg)
					}
				},
				error: function(xhr, type) {
					alert("错误")
				}
			});
		}
//	
	
	
	}

	//导入excel的缓冲动画
//	function importExcelC3() {
//		//处理缓冲动画
//		var shadowDom = ss.getDom('.c3Loading_shade');
//		var circleDom = ss.getDom('.sk-circle');
//		var importDom = ss.getDom('[name="import"]');
//		ss.mdfCss(shadowDom, [
//			'width', importDom.offsetWidth + 21 + 'px',
//			'height', importDom.offsetHeight + 20 + 'px',
//			'top', importDom.offsetTop - 10 + 'px',
//			'left', importDom.offsetLeft - 5 + 'px',
//			'borderRadius', '5px',
//			'backgroundColor', '#000',
//			'opacity', .3
//		]);
//		ss.crtDom('div', 'c3Txt', '导入中...', circleDom, {
//			cn: ['position', 'left', 'top', 'color', 'width', 'fontWeight'],
//			cv: ['absolute', '50px', '23px', '#fb8a30', '100px', 600]
//		});
//		ss.mdfCss(circleDom, [
//			'top', importDom.offsetTop - 45 + 'px',
//			'left', importDom.offsetLeft + 20 + 'px',
//		]);
//	};

	//导出
	function exportFn(self) {
		var loading = layer.load(1, {
			shade: [0.1, '#fff'] //0.1透明度的白色背景
		});
		//请求地址
		var queryUrl = commonUrl + "/admin/TAppointmentRecord/export.action";
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
					window.location.href = data.data;
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