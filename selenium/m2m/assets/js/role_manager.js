ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	//处理菜单，进行分类
	function getMenuCodesFn(sourceData,type){
		var menuData = type==1?ss.options.menuData.heeler:_m2m_customer_heeler;
		//哈希表 
		var hashObj = {};
		//数据整合
		var dpDataObj = {};
		var _eddArr = [];
		menuData.forEach(function(item){ hashObj[item.mn_code] = item.leader; });
		//对请求数据分类
		sourceData.forEach(function(item){
			if(hashObj[item.labal]){
				dpDataObj[item.labal] || (dpDataObj[item.labal]=[]);
				dpDataObj[item.labal] && dpDataObj[item.labal].push(item);
			}
		});
		//根据子项来校验菜单栏的状态
		function judgeMenuStatuFn(data){
			var _len = data.length;
			var _count = 0;
			data.forEach(function(item){
				item.selected==2 && (_count = _count+1);
			});
			return 	_count==0 ? 0 : ( _count==_len ? 2 : 3 )	
		}; 
		for(var x in dpDataObj){
			judgeMenuStatuFn(dpDataObj[x]);
			_eddArr.push({
		        "leader": hashObj[x],
		        "name": hashObj[x],
		        "id":'_mn',
		        "type": "1",
		        "selected": judgeMenuStatuFn(dpDataObj[x]),
		        "heeler": dpDataObj[x]
			})
		};
		return _eddArr;
	};
	
	//右侧表格    
	//数据表格
	var self = ss.dataTable({ //64,369
		appendTo: $('#dataCon_cus')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/role/queryRoleByPage.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '角色名称',
				txt: 'roleName',
				type: 'txt',
				width: '120px'
			},
			{
				name: '平台类型',
				txt: 'platformType',
				type: 'select',
				data:{
					url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
					dataType:'json',
					data:{
						dickey:'role_platform_type',
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
				url: commonUrl + '/admin/role/addRole.action',
				items: {
					roleName: {
						name: '角色名称',
						type: 'txt', 
						verify:true
					},
					platformType:{
						name:'平台类型',
						type:'select',
						data:{
							url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
							dataType:'json',
							data:{
								dickey:'role_platform_type',
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
					}
				},

			}
		},
		//表格内容 
		table: {
			//各选项
			options: {
				closeInterlace: true,
				dpWith: {
					'roleName':5, 'platformType':5, 'createAt':5, 'editAt':5, 'createAuthor':5
				},
				showTitle:[	
					'roleName', 'platformType', 'createAt', 'editAt', 'createAuthor'
				],
				isChangeTime: ['createAt','editAt'], //是否进行时间戳转时间
//				//动态别名转换
				urlData:{ 
					platformType:{
						url:commonUrl + '/common/TDictionaries/getDictionariesByKey.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							dickey:'role_platform_type', 
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
					createAuthor:{
						url:commonUrl + '/admin/user/queryLoginInfoByPage.action',
						type: 'post', //默认post请求
						dataType: "json",
						contentType: "application/json",
						data: {
							currentPage:1,
							pageSize:10000
						},
						rely:{
							name:"loginName",
							code:"uuid" 
						},
						digitalModel:{
							data:{
								location:['data','data']
							}
						}
					},
				}
			},
			tlName: [
				'角色名称', '平台类型', '创建时间', '修改时间', '操作人'
			], //表头名字
			tlTxt: [
				'roleName', 'platformType', 'createAt', 'editAt', 'createAuthor'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				{
					name: '修改权限',
					colType: 'opt1',
					dataType: 'json',
					cbFn:function(curData){
						//弹窗创建
						ss.ssView.show({
							title:'修改权限',
							btnName:'提交',
							html:[
								'<div id="_editPower" style="height:400px;overflow:auto;"></div>'
							].join(''),
							sureCliFn:function(_self){
								//整理出接口需要的数据->去除菜单层
								var _endArr = _curMsInstance.scope.endData;
								var _queryArr = [];
								for(var d=0; d<_endArr.length; d++){
									if(_endArr[d].heeler && _endArr[d].heeler.length>0){
										var eddArr_heeler = _endArr[d].heeler;
										for(var dd=0; dd<eddArr_heeler.length; dd++){
											_queryArr.push(eddArr_heeler[dd]);
										}
									};
								};
								//保存
								self.eAjax({
							        url:commonUrl + '/admin/permission/savePermissionMenuList.action',
							        type:'post',
							        data:{
							        	data:_queryArr,
							        	roleUuid:curData.uuid,
							        	result: "success"
							        },
								}, 
							    {
							    	success:function(data){
							    		if(data.result == 'success'){
											ss.layer.msg('修改权限成功！'); 							    			
							    		}
							    	},
							    	isJson:true
								});
								
								console.log(_queryArr)
							}
						});
						//权限实例
						var _curMsInstance;
						//获取当前角色的权限数据
						self.eAjax({
					        url:commonUrl + '/admin/common/getPermissionMenuList.action',
					        type:'post',
					        data:{
					        	roleUuid:curData.uuid
					        },
						}, 
					    {
					    	success:function(data){
					    		if(data.result == 'success'){
									_curMsInstance = new tlf_mulSel({
										data:getMenuCodesFn(data.data,curData.platformType),//总数据
//										data:getMenuCodesFn(_a.data),//总数据
										appendTo:ss.getDom('#_editPower'),//追加元素
										//checkbox勾选
										cliCbFn:function(type,dom,_self){
											//通过svg标签判断权限还是资源
											var addDom = dom.parentNode.querySelector('.addDom');
											//通过id值判断是否为菜单层
											var _idVal = dom.getAttribute('_id');
											var _count = dom.parentNode.getAttribute('_count');
											
											var _index = _count==2 ? 
												dom.parentNode.parentNode.parentNode.getAttribute('_index')
													:
												(
													_count==3 ?  
													dom.parentNode.parentNode.parentNode.parentNode.getAttribute('_index')
														:
													dom.getAttribute('_index')
												);
											var curEndData = _self.scope.endData[_index];
											//true:选中 |false:未选中
											if(addDom && _idVal=='_mn'){
												//菜单层 
												var _heeler = curEndData.heeler;
												for(var a=0; a<_heeler.length; a++){
													if(_heeler[a].heeler && _heeler[a].heeler.length>0){
														var _heeler2 = _heeler[a].heeler;
														for(var aa=0; aa<_heeler2.length; aa++){
															_heeler2[aa].selected = type=='true'?2:1;
														}
													}
													_heeler[a].selected = type=='true'?2:1;
												};
											}
											else if(dom.parentNode.getAttribute('_count')==2){
												//权限层
												var _heeler = curEndData.heeler;
												var __index = dom.parentNode.parentNode.getAttribute('_index');
												var _pData = _heeler[__index];
												_pData.selected = type=='true'?2:1;
												var _pData_heeler = _pData.heeler;
												if( _pData_heeler && _pData_heeler.length>0 ){
													for(var b=0; b<_pData_heeler.length; b++){
														_pData_heeler[b].selected = type=='true'?2:1;
													}
												}
											}
											else{
												//资源层： 先设置自身的selected值，
												var _heeler = curEndData.heeler;
												var __index = dom.parentNode.parentNode.parentNode.getAttribute('_index');
												var _pData_heeler = _heeler[__index].heeler;
												var _curP = _heeler[__index].heeler[dom.getAttribute('_index')];
												_curP.selected = type=='true'?2:1;
												//匹对的值
												var _juegeVar = 0;
												for(var c=0; c<_pData_heeler.length; c++){
													_pData_heeler[c].selected==2 && (_juegeVar = _juegeVar+1);
												};
												_heeler[__index].selected = _juegeVar==0?1:(_juegeVar==_pData_heeler.length?2:3)
											}
										}
										//isNew:true,//开启新增模式
									});
					    		}
					    	},
					    	isJson:true
						});
					}
				},
				{
					name: '删除',
					colType: 'del',
					dataType: 'json',
					url: commonUrl + '/admin/role/delRoleById.action',
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