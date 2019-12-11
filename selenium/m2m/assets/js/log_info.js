ss.imports(['dataTable'],function(exports) {
    var commonUrl = ss.options['commonUrl'];
    //数据表格
    var self = ss.dataTable({//64,369
        appendTo:$('#dataCon')[0],//追加元素
        //数据选项
        dataOption:{
            listUrl:commonUrl+'/admin/TImportLog/queryByPageInfo.action',//请求Url
            type:'post',//默认post请求
            dataType:"json",
            contentType:"application/json",
            data:JSON.stringify({}),
            //pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
        },
        //搜索栏选项
        searchOption:[
            {name:'导入编码',txt:'uuid',type:'txt',width:'120px'},
        ],
        //搜索栏额外按钮
        searchBtn:{
        
        },
        //表格内容
        table:{
            //各选项
            options:{
//          	dpWPer:'100%', 
            	dpWith:{
            		uuid:10,
            		fileName:20,
            		importTotalCount:4,
            		importSuccessCount:4,
            		importTime:5,
            		importType:3,
            	},
            	isChangeTime:['importTime'],
                closeInterlace:true,
                showTitle:['fileName'],
				shim:{
					importType:{
						'1':'sim卡',
						'2':'imei池',
					}
				},
            },
            tlName:[
            	'导入编号','导入文件','导入总条数','导入成功条数','导入时间','导入类型','备注'
        	],//表头名字
            tlTxt:[
            	'uuid','fileName','importTotalCount','importSuccessCount','importTime','importType','remark'
        	],//表头字段
            //操作项
            operation:[
                
            ],

        },
        //分页
        pageOption:{
            //各选项
        }
    });

})