ss.imports(['dataTable'],function(exports) {
    var commonUrl = ss.options['commonUrl'];
     //数据表格
    var self = ss.dataTable({//64,369
        appendTo:$('#dataCon')[0],//追加元素
        //数据选项
        dataOption:{
            listUrl:commonUrl+'/admin/TSuppliers/queryByPageInfo.action',//请求Url
            type:'post',//默认post请求
            dataType:"json",
            contentType:"application/json",
            data:JSON.stringify({}),
            //pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
        },
        //搜索栏选项
        searchOption:[
            {name:'供应商名称',txt:'supplier_name',type:'txt',width:'120px'},
        ],
        //搜索栏额外按钮
        searchBtn:{
        	//默认
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TSuppliers/addEntity.action',
				items: {
					supplierName: {name: '供应商名称',type: 'txt',verify:true,},
					operator: {
						name: '运营商',type: 'select',verify:true,
						data:[
							{name:'移动',code:'1'},
							{name:'联通',code:'2'},
							{name:'电信',code:'3'},
						]
					},
					accountNumber: {name: '账号',type: 'txt',verify:true,},
					jasperPassword: {name: '#ccc',type: 'txt',verify:true,},
					soapApiKey: {name: 'soapApiKey',type: 'txt',verify:true,},
					restApiKey: {name: 'restApiKey',type: 'txt',verify:true,},
					linkman: {name: '联系人',type: 'txt'},
					phone: {name: '联系电话',type: 'txt'},
					email: {name: '邮箱地址',type: 'txt'},
					status: {
						name: '状态',type: 'select',
						data:[
							{name:'未合作',code:'1'},
							{name:'合作中',code:'2'},
						]
					},
					remark: {name: '备注',type: 'txt'},
				}
			}
        },
        //表格内容
        table:{
            //各选项
            options:{
//            	dpWPer: '105%',
                closeInterlace:true,
				dpWith: {
					status: 6,operator:6,linkman:6
				},
				shim:{
					operator:{
						'1':'移动',
						'2':'联通',
						'3':'电信',
					},
					status:{
						'1':'未合作',
						'2':'合作中',
					}
				},
                
            },
            tlName:[
//          	'供应商名称','运营商','账号','密码','联系人',/
            	'供应商名称','运营商','联系人',
            	'电话','邮箱','状态',
        	],//表头名字
            tlTxt:[ 
//          	'supplierName','operator','accountNumber','jasperPassword','linkman',
            	'supplierName','operator','linkman',
            	'phone','email','status'
        	],//表头字段
            //操作项
            operation:[
                //编辑和删除为默认，其它按钮需txt
                {
                    name:'编辑',
                    url:commonUrl+'/admin/TSuppliers/editEntity.action',
                    dataType:'json',
                    items:{
						supplierName: {name: '供应商名称',type: 'txt',verify:true,},
						operator: {
							name: '运营商',type: 'select',verify:true,
							data:[
								{name:'移动',code:'1'},
								{name:'联通',code:'2'},
								{name:'电信',code:'3'},
							]
						},
//						accountNumber: {name: '账号',type: 'txt',verify:true,},
//						jasperPassword: {name: '密码',type: 'txt',verify:true,},
//						soapApiKey: {name: 'soapApiKey',type: 'txt',verify:true,},
//						restApiKey: {name: 'restApiKey',type: 'txt',verify:true,},
						linkman: {name: '联系人',type: 'txt'},
						phone: {name: '联系电话',type: 'txt'},
						email: {name: '邮箱地址',type: 'txt'},
						status: {
							name: '状态',type: 'select',
							data:[
								{name:'未合作',code:'1'},
								{name:'合作中',code:'2'},
							]
						},
						remark: {name: '备注',type: 'txt'},
                    },
                  	data:{uuid:''},
                },
//              {
//                  name:'删除',
//                  colType:'del',
//                  dataType:'json',
//                  url:commonUrl+'/admin/TSuppliers/deleteEnttiybyUuid.action',
//                  data:{uuid:''}
//              },
            ],

        },
        //分页
        pageOption:{
            //各选项
        }
    });

})