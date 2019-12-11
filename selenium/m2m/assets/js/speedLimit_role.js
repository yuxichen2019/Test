ss.imports(['dataTable'],function(exports) {
    var commonUrl = ss.options['commonUrl'];
     //数据表格
    var self = ss.dataTable({//64,369
        appendTo:$('#dataCon')[0],//追加元素
        //数据选项
        dataOption:{
            listUrl:commonUrl+'/admin/TFlowLimitRules/queryByPageInfo.action',//请求Url
            type:'post',//默认post请求
            dataType:"json",
            contentType:"application/json",
            data:JSON.stringify({}),
            //pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
        },
        //搜索栏选项
        searchOption:[
            {
            	name:'限速类型',txt:'limitType',type:'select',width:'120px',
				data:[
					{name:'周期限速',code:'1'},
					{name:'日期限速',code:'2'}
				]
        	}
        ],
        //搜索栏额外按钮
        searchBtn:{
        	//默认
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TFlowLimitRules/addEntity.action',
				adjust:function(queryObj){
					var _obj = queryObj;
					_obj.limitNum = Number(_obj.limitNum);
					_obj.limitSpeed = Number(_obj.limitSpeed);
					_obj.limitType = Number(_obj.limitType);
					return _obj 
				},
				items: {
					rulesName: {
						name: '限速规则名称',type: 'txt',verify:true
					},
					limitType: {
						name: '限速类型',type: 'select',verify:true,
						data:[
							{name:'周期限速',code:'1'},
							{name:'日期限速',code:'2'}
						]
					},
					limitNum: {
						name: '流量阀值(M)',type: 'num',verify:true
					},
					limitSpeed: {
						name: '限速KB/S',type: 'num',verify:true
					},
//					ratePlan: {
//						name: '限速的通信计划',type: 'select',verify:true,
//						data: {
//							url: commonUrl + '/admin/TFlowLimitRules/getCommunicationPlan.action',
//							dataType: 'json',
//							data: {
//								dickey: 'bag_type',
//							},
//							rely: {
//								name: "ratePlan",
//								code: "ratePlan"
//							},
//							digitalModel: {
//								data: {
//									location: ['data']
//								}
//							}
//						}
//					},
				}
			}
        },
        //表格内容
        table:{
            //各选项
            options:{
//            	dpWPer: '105%',
				isChangeTime: ['createTime'],
                closeInterlace:true,
				dpWith: {
            		'rulesName':5,'limitType':5,'limitNum':5,'limitSpeed':5,'createTime':5
				},
				shim:{
					limitType:{
						'1':'周期限速',
						'2':'日期限速',
					}
				},
                
            },
            tlName:[
            	'规则名称','限速类型','用量阀值/MB',
            	'限速KB/S','创建时间'
        	],//表头名字
            tlTxt:[ 
            	'rulesName','limitType','limitNum',
            	'limitSpeed','createTime'
        	],//表头字段
            //操作项
            operation:[
                //编辑和删除为默认，其它按钮需txt
//              {
//                  name:'编辑',
//                  url:commonUrl+'/admin/TSuppliers/editEntity.action',
//                  dataType:'json',
//                  items:{
//						supplierName: {name: '供应商名称',type: 'txt',verify:true,},
//						operator: {
//							name: '运营商',type: 'select',verify:true,
//							data:[
//								{name:'移动',code:'1'},
//								{name:'联通',code:'2'},
//								{name:'电信',code:'3'},
//							]
//						},
////						accountNumber: {name: '账号',type: 'txt',verify:true,},
////						jasperPassword: {name: '密码',type: 'txt',verify:true,},
////						soapApiKey: {name: 'soapApiKey',type: 'txt',verify:true,},
////						restApiKey: {name: 'restApiKey',type: 'txt',verify:true,},
//						linkman: {name: '联系人',type: 'txt'},
//						phone: {name: '联系电话',type: 'txt'},
//						email: {name: '邮箱地址',type: 'txt'},
//						status: {
//							name: '状态',type: 'select',
//							data:[
//								{name:'未合作',code:'1'},
//								{name:'合作中',code:'2'},
//							]
//						},
//						remark: {name: '备注',type: 'txt'},
//                  },
//                	data:{uuid:''},
//              },
                {
                    name:'删除',
                    colType:'del',
                    dataType:'json',
                    url:commonUrl+'/admin/TFlowLimitRules/logicalDelete.action',
                    data:{uuid:''}
                }
            ],

        },
        //分页
        pageOption:{
            //各选项
        }
    });

})