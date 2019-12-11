ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	var superiorCustomer = [];

	//右侧表格    
	//数据表格
	var self = ss.dataTable({ //64,369
		appendTo: $('#dataCon_cus')[0], //追加元素

		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TUser/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [
			{
				name: '用户名称',
				txt: 'userName',
				type: 'txt',
				width: '120px'
			},
			{
				name: '用户类型',
				txt: 'userType',
				type: 'select',
				data:{
					url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
					dataType:'json',
					data:{
						dickey:'user_type',
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
		//搜索栏额外按钮
		searchBtn: {
			//默认
			add: {
				name: '新建+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TUser/addEntity.action',
				items: {
					userName: {
						name: '用户名称',
						type: 'txt', 
						verify:true
					},
					loginid: {
						name: '登陆ID',
						type: 'txt', 
						verify:true
					},
					userType: {
						name: '用户类型',
						type: 'select',
						data:{
							url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
							dataType:'json',
							data:{
								dickey:'user_type',
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
						verify:true
					},
					phone: {
						name: '联系方式',
						type: 'num', 
						verify:true
					},
					email: {
						name: '邮箱地址',
						type: 'txt', 
						verify:true
					},
					remark: {
						name: '备注',
						type: 'area'
					},
				},

			}
		},
		//表格内容 
		table: {
			//各选项
			options: {
				closeInterlace: true,
//				dpWPer:'140%',
				dpWith: {
					'userName':5, 'loginid':5, 'userType':5, 'phone':5, 'email':5,
					'createTime':5,'createPerson':5,'remark':5
				},
				showTitle:[	
					'userName', 'loginid', 'userType', 'phone', 'email',
					'createTime','createPerson','remark'
				],
				isChangeTime: ['createTime'], //是否进行时间戳转时间
//				//动态别名转换
				urlData:{ 
					userType:{
						url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							dickey:'user_type', 
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
				}
			},
			tlName: [
				'用户名称', '登录ID', '用户类型', '联系方式', '邮箱地址',
				'创建时间','创建人','备注'
			], //表头名字
			tlTxt: [
				'userName', 'loginid', 'userType', 'phone', 'email',
				'createTime','createPerson','remark'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				{
					name: '编辑',
					url: commonUrl + '/admin/TUser/editEntity.action',
					dataType: 'json',
					items: {
						userName: {
							name: '用户名称',
							type: 'txt', 
							verify:true
						},
						loginid: {
							name: '登陆ID',
							type: 'txt', 
							verify:true
						},
						userType: {
							name: '用户类型',
							type: 'select',
							data:{
								url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
								dataType:'json',
								data:{
									dickey:'user_type',
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
							verify:true
						},
						phone: {
							name: '联系方式',
							type: 'num', 
							verify:true
						},
						email: {
							name: '邮箱地址',
							type: 'txt', 
							verify:true
						},
						remark: {
							name: '备注',
							type: 'area'
						},
					},
					data: {
						uuid: ''
					},
				},
				{
					name: '修改角色',
					colType: 'opt1',
					cbFn:function(curData){
						console.log(curData)
						ss.ssView.show({
							title:'修改角色',btnName:'保存',
							sureCliFn:function(_self){
								//没值阻拦
								if(!ss.ssRadio.scope.curCode){
									ss.layer.msg('请先选择角色！');
									return 'return'
								};
								//值没改变->直接提示
								if(ss.ssRadio.scope.curCode==ss.ssRadio.scope.bandRoleData.roleUuid){
									ss.layer.msg('角色没改变！');
									return;
								};
								
								//保存用户
								self.eAjax({
							        url:commonUrl + '/admin/userRole/addLoginuserRoleMap.action',
							        type:'post',
							        data:{
							        	roleUuid: ss.ssRadio.scope.curCode,
										userUuid: curData.uuid
							        },
								}, 
							    {
							    	success:function(data){
							    		if(data.result == 'success'){
											ss.layer.msg('保存成功！');
							    		}
							    	},
							    	isJson:true
								});
								
								//移除原来的角色
								self.eAjax({
							        url:commonUrl + '/admin/userRole/delLoginuserRoleMapById.action',
							        type:'post',
							        data:{
										uuid: ss.ssRadio.scope.bandRoleData.uuid
							        },
								}, 
							    {
							    	success:function(data){
							    		if(data.result == 'success'){

							    		}
							    	},
							    	isJson:true
								});
								
							}
						})
						//渲染结束
						.renderOut(function(_self){
							//先发送请求当前用户绑定的角色
							self.eAjax({
						        url:commonUrl + '/admin/common/getUserRoleMaps.action',
						        type:'post',
						        data:{
						        	userUuid:curData.uuid,
						        },
							}, 
						    {
						    	success:function(data){
						    		if(data.result == 'success'){
										var _queryData = (data.data && data.data[0] && data.data[0].roleUuid) || ''
										radioFn(_queryData,data.data && data.data[0]);
						    		}
						    	},
						    	isJson:true
							});
							
							//角色radio项
							function radioFn(_code,_saveAttr){
								ss.ssRadio.scope.bandRoleData = _saveAttr || '';
								ss.ssRadio.show({
									appendTo:_self.domWrap.viewC_con,
									defaultCode:_code,
									item:{
										url:commonUrl + '/admin/role/queryRoleByPage.action',
										dataType:'json',
										data:{
											currentPage: 1,
											pageSize: 10000,
											platformType:curData.userType
										},
										rely: {
											name:"roleName",
											code:"uuid" 
										},
										digitalModel: {
											data: {
												location: ['data','data']
											}
										}
									}
								});
							};
						})
					}
				},
				{
					name: '重置密码',
					colType: 'opt2',
					cbFn:function(curData,self){
						ss.layer.confirm(
							'是否确定重置此账户登录密码？', 
							{
						  		btn: ['是','否'] //按钮
							}, 
							function(){
								self.eAjax({
							        url:commonUrl + '/admin/common/resetPassword.action',
							        type:'post',
							        data:{
							        	uuid:curData.uuid,
							        	loginPass:'123456'
							        },
								}, 
							    {
							    	success:function(data){
							    		layer.closeAll();
							    		if(data.result == 'success'){
							    			ss.layer.msg('密码重置成功！');
							    		}
							    	},
							    	isJson:true
								});
							}, 
							function(){
								console.log(222)
							}
						);
					}
				},
				{
					name: '删除',
					colType: 'del',
					dataType: 'json',
					url: commonUrl + '/admin/TUser/deleteEnttiybyUuid.action',
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


})