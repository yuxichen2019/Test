ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#dataCon_cs')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TNameCertification/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '请输入ICCI或MSISDN',
				txt: 'iccid',
				type: 'txt',
				width: '200px'
			},
			{
				name: '姓名',
				txt: 'realName',
				type: 'txt',
				width: '200px'
			},
			{
				name: '审核状态',
				txt: 'auditStatus',
				isNumber:true,
				code: 0,
				type: 'select',
				width: '180px',
				data: [{
						'code': 0,
						'name': '成功'
					},
					{
						'code': 1,
						'name': '失败'
					},
					{
						'code': 2,
						'name': '待审核'
					}
				]
			},
			{
				name: '提交开始时间',
				txt: 'createTimeBegin',
				type: 'date',
				width: '200px'
			}, {
				name: '提交结束时间',
				txt: 'createTimeEnd',
				type: 'date',
				width: '200px'
			}
		], //搜索栏额外按钮
		searchBtn: {
			export: {
				name: '导出',
				colType: 'opt2',
				cbFn: function(self) {
					exportFn(self);
				}
			},
			delete: {
				name: '批量删除',
				colType: 'opt2',
				cbFn: function(self) {
					deleteFn(self);
				}
			},
		},
		//表格内容
		table: {
			//各选项
			options: {
				isCheckbox: true,
				//				sort: ['iccid'],
				//				dpWPer: '125%',
				dpWith: {
					createTime: 10,
					auditStatus:6,
					realName:6,
					idCardNum:11,
					phoneNum:8 
				},
				closeInterlace: true,
				isChangeTime:['createTime'],
				showTitle: ['iccid', 'msisdn', 'realName',
					'idCardNum', 'phoneNum', 'createTime', 'auditStatus'
				],
				shim: {
					'auditStatus': {
						0: '成功',
						1: '失败',
						2: '待审核',
					},
				},
				cbFn:function(_self){
					var tbCWrap = _self.domWrap.tbCWrap.children;
					for(var i=0; i<tbCWrap.length; i++){
						//状态值为未审核则修改按钮
						var _li = tbCWrap[i].querySelector('[name="auditStatus"]');
						if(_li.innerHTML=='待审核'){
							var editBtn = tbCWrap[i].querySelector('[flag="edit"]');
							editBtn.innerHTML = '审批';
							ss.mdfCss(editBtn,['color','#fff','backgroundColor','rgb(30, 159, 255)']);
						}
					}
				}
			},
			tlName: ['ICCID', 'MSISDN', '姓名',
				'身份证号码', '手机号码', '提交时间', '审核状态'
			], //表头名字
			tlTxt: ['iccid', 'msisdn', 'realName',
				'idCardNum', 'phoneNum', 'createTime', 'auditStatus'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				{
					name: '编辑',
					flag: 'edit',
					//对象则为&&，数组为||
//					rely: {
//						auditStatus: '0'
//					},
//					rely: [{
//						auditStatus: ['0','1']
//					}],
					url: commonUrl + '/admin/TNameCertification/changeAuditStatus.action',
					dataType: 'json',
					height:'400px',//自定义高度
					//强制梳理传参
//					forceDp:function(queryObj){
//						return {
//							uuid:queryObj.uuid,
//							auditStatus:queryObj.auditStatus
//						}
//					},
					layout:'lr',//扩展：布局提供左右模式
					itemRenderFn:function(){
						
					},
					items: {
						iccid: {
							name: 'ICCID',
							type: 'txt',
							readonly:true
						},
						msisdn: {
							name: 'MSISDN',
							type: 'txt',
							readonly:true
						},
						realName: {
							name: '真实姓名',
							type: 'txt',
							readonly:true
						}, 
						idCardNum: {
							name: '身份证码号',
							type: 'txt',
							readonly:true
						},
						phoneNum: {
							name: '联系方式',
							type: 'txt',
							readonly:true
						},
						createTime: {
							name: '提交时间',
							type: 'time',
							timeType:'datetime',
							readonly:true
						},
//						createTime: {
//							name: '审核时间',
//							type: 'time',
//							timeType:'datetime',
//							verify: true,
//						},
						auditStatus: {
							name: '审批状态',
							type: 'select',
							data: [{
									'code': 0,
									'name': '成功'
								},
								{
									'code': 1,
									'name': '失败'
								},
								{
									'code': 2,
									'name': '待审核'
								}
							],
							verify: true,
						},
						idCardPositive: { 
							name: '身份证正面',
							type: 'photo',
							prefix:location.origin+'',
						},
						idCardOpposite: {
							name: '身份证反面',
							type: 'photo',
							prefix:location.origin+'',
						},
						holdIdCard: {
							name: '手持身份证', 
							type: 'photo',
							prefix:location.origin+'',
						},

					},
					data: {
						uuid: ''
					},
				},
//				{
//					name: '审批',
//					colType: 'opt2',
//					rely: {
//						auditStatus: '2'
//					},
//					cbFn:function(curData,self){
//						console.log(self,curData)
//						ss.layer.confirm(
//							'请审核状态？', 
//							{
//						  		btn: ['成功','失败','取消'] //按钮
//							}, 
//							function(){
//								editStatuFn('0');
//								layer.closeAll();
//							}, 
//							function(){
//								editStatuFn('1');
//							}
//						);
//						function editStatuFn(status){
//							self.eAjax({
//						        url:commonUrl + '/admin/TNameCertification/changeAuditStatus.action',
//						        type:'post',
//						        data:{
//						        	auditStatus: status,
//									uuid: curData.uuid
//						        },
//							}, 
//						    {
//						    	success:function(data){
//						    		if(data.result == 'success'){
//										ss.layer.msg('审批完成！');
//										self.lg_reloadFn();
//						    		}
//						    	},
//						    	isJson:true
//							});
//						}
//						
//					}
//				},
				{
					name: '删除',
					colType: 'del',
					dataType: 'json',
					url: commonUrl + '/admin/TNameCertification/deleteEnttiybyUuid.action',
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
	//批量删除
	function deleteFn(self) {
		var uuidList = []
		if(self.scope.checkObj && self.scope.checkObj[1].length > 0) {
			chooseData = self.scope.checkObj[1]
			for(var i = 0; i < chooseData.length; i++) {
				uuidList.push(chooseData[i].uuid)
			}
		};
		//没值则提示
		if(!uuidList.length){
			ss.layer.msg('请先勾选！');
			return;
		};
		layer.confirm('确定删除吗?', function(index) {
			//是否json类型提交
			var fqObj = {
				url: commonUrl + '/admin/TNameCertification/deleteBatch.action',
				type: 'post',
				data: JSON.stringify({uuidList:uuidList})
			};
			var isJsonTF = true
			self.ajax(
				fqObj,
				//success
				function(data) {
					layer.close(index); //关闭询问窗
					layer.msg('删除成功!');
					self.lg_reloadFn(); //表格重载
				},
				//complete
				function(data) {
					layer.close(index); //关闭询问窗
				},
				//beforeSend
				function(request) {
					isJsonTF &&
						request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				}
			);
		});
	}
	//导出
	function exportFn(self) {
		var loading = layer.load(1, {
			  shade: [0.1,'#fff'] //0.1透明度的白色背景
			});
		//请求地址
		var queryUrl = commonUrl + "/admin/TNameCertification/export.action";
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
				if(data.result=='success'){
					window.location.href = ''+data.data;
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