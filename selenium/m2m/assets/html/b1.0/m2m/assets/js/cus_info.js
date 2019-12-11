ss.imports(['dataTable'],function(exports) {
    var commonUrl = ss.options['commonUrl'];
	//右侧表格    
    //数据表格
    var self = ss.dataTable({//64,369
        appendTo:$('#dataCon_cus')[0],//追加元素
        //数据选项
        dataOption:{
            listUrl:commonUrl+'/admin/TCustomer/queryByPageInfo.action',//请求Url
            type:'post',//默认post请求
            dataType:"json",
            contentType:"application/json",
            data:JSON.stringify({}),
            //pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
        },
        //搜索栏选项
        searchOption:[
            {name:'客户编号',txt:'customerNum',type:'txt',width:'120px'},
            {name:'客户姓名',txt:'customerName',type:'txt',width:'120px'},
        ],
        //搜索栏额外按钮
        searchBtn:{
        	//默认
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TCustomer/addEntity.action',
				items: {
					customerName: {name: '客户名称',type: 'txt'},
					phone: {name: '联系方式',type: 'txt'},
					region: {name: '所属省市',type: 'txt'},
					cooperationName: {
						name: '合作时间',type: 'time',timeType:'datetime'
					},
					ordertype: {
						name: '客户级别',type: 'select',
						data:[
							{name:'一级客户',code:'1'},
							{name:'二级客户',code:'2'},
							{name:'三级客户',code:'3'},
						]
					},
					superiorCustomer: {name: '上一级客户',type: 'txt'},
					customerType: {name: '客户类型',type: 'txt'},
					company: {name: '所属公司',type: 'txt'},
					email: {name: '邮箱地址',type: 'txt'},
					remark: {name: '备注',type: 'txt'},
				}
			}
        },
        //表格内容 
        table:{
            //各选项
            options:{
                closeInterlace:true,
            },
            tlName:[
            	'客户编号','客户姓名','联系方式','所属省市','合作时间',
            	'客户级别','上一级客户','客户类型','所属公司','邮箱地址','备注'
        	],//表头名字
            tlTxt:[
            	'customerNum','customerName','phone','region','cooperationName',
            	'ordertype','superiorCustomer','customerType','company','email','remark'
        	],//表头字段
            //操作项
            operation:[
                //编辑和删除为默认，其它按钮需txt
                {
                    name:'编辑',
                    url:commonUrl+'/admin/TCustomer/editEntity.action',
                    dataType:'json',
                    items:{
                        customerName: {name: '客户名称',type: 'txt'},
						phone: {name: '联系方式',type: 'txt'},
						region: {name: '所属省市',type: 'txt'},
						cooperationName: {name: '合作时间',type: 'txt'},
						ordertype: {name: '客户级别',type: 'txt'},
						superiorCustomer: {name: '上一级客户',type: 'txt'},
						customerType: {name: '客户类型',type: 'txt'},
						company: {name: '所属公司',type: 'txt'},
						email: {name: '邮箱地址',type: 'txt'},
						remark: {name: '备注',type: 'txt'},
                    },
                  	data:{id:''},
                },
                {
                    name:'删除',
                    colType:'del',
                    dataType:'json',
                    url:commonUrl+'/admin/TCustomer/deleteEnttiybyUuid.action',
                    data:{uuid:''}
                },
            ],

        },
        //分页
        pageOption:{
            //各选项
        }
    });
   
   
    //左侧客户选择（假数据）
	new ss.userMenu({
		data:{
			heeler: [
				{
					leader: '一级客户112222',
					heeler: [{
						leader: '二级客户31',
						txt: 'Radio',
						heeler: []
					},	
						{
								leader: '二级客户21',
								txt: 'supplier',
								heeler: [{
											leader: '三级客户31',
											txt: 'Radio',
											heeler: []
										},
										{
											leader: '三级客户32',
											txt: 'Checkbox',
											heeler: []
										},
										{
											leader: '三级客户33',
											txt: 'Input',
											heeler: []
										},
										{
											leader: '三级客户34',
											txt: 'InputNumber',
											heeler: []
										}
								]
						},
						{
								leader: '二级客户22',
								txt: 'supplier',
								heeler: [
									{
											leader: '三级客户31',
											txt: 'Radio',
											heeler: []
										},
										{
											leader: '三级客户32',
											txt: 'Checkbox',
											heeler: []
										}
								]
						}
					]
				},
				{
						leader: '一级客户11',
						heeler: [{
								leader: '二级客户21',
								txt: 'supplier',
								heeler: [{
											leader: '三级客户31',
											txt: 'Radio',
											heeler: []
										},
										{
											leader: '三级客户32',
											txt: 'Checkbox',
											heeler: []
										},
										{
											leader: '三级客户33',
											txt: 'Input',
											heeler: []
										},
										{
											leader: '三级客户34',
											txt: 'InputNumber',
											heeler: []
										}
								]
						},
						{
								leader: '二级客户22',
								txt: 'supplier',
								heeler: [
									{
											leader: '三级客户31',
											txt: 'Radio',
											heeler: []
										},
										{
											leader: '三级客户32',
											txt: 'Checkbox',
											heeler: []
										}
								]
						}
					]
				}
			]		
		},
		appendTo:ss.getDom('#ly_aside11'),
		//点击客户项的回调函数
		cliCbFn:function(dom){
			console.log(dom)
		}
	});//docNavMenu
   
})