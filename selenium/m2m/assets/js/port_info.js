ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	var superiorCustomer = [];
	
	
	$(".api_cont a").click(function(){
		console.log(ss.uuids)
		
		$.ajax({
	        type: 'POST',
	        url: '/admin/TCustomer/getEnttiybyUuid.action',
	        data: JSON.stringify({"uuid":ss.uuids}),
	        timeout:8000,    //超时时间
	        beforeSend: function(request) {
				request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			},
	        dataType: 'json',
        	success: function(data){
        		//console.log(data.data.appKey)
        		$(".api .api_cont span").text(data==null ? ("我的secret：" + data.data.appKey) : "没有secret")
        		$(".api_cont a").css({"display":"none"});
				$(".api .api_cont span").css({"display":"block"});
       	    },
       	    error: function(xhr, type){
       	    	alert("程序出错")
       	    }
       	})
	})
	$("#treeMenu").on("changed.jstree",function (e, data){
    if(data.selected.length) {
        $('#ly_aside11').animate({scrollTop: $('#'+data.node.original.num)[0].offsetTop - 55}, 500)
        //alert('The selected node is: ' + data.instance.get_node(data.selected[0]).text);
    }
	}).jstree({
	    'core': {
	        'data': [
	            {
	                "text": "公共参数",
	                "state": { "opened": true },
	                "num":"commonality",
	                "children": [
	                    { "text": "请求地址", "icon": "jstree-file","num":"commonality1"},
	                    { "text": "请求参数", "icon": "jstree-file","num":"commonality2" },
	                    { "text": "响应参数", "icon": "jstree-file","num":"commonality3" },
	                    { "text": "约定", "icon": "jstree-file","num":"commonality4" },
	                    { "text": "测试账号", "icon": "jstree-file","num":"commonality5" }
	                ]
	
	            },
	            {
	                "text": "卡信息查询接口批量",
	                "num":"batch",
	                "children": [
	                    { "text": "接口名称", "icon": "jstree-file","num":"batch1" },
	                    { "text": "请求参数", "icon": "jstree-file","num":"batch2" },
	                    { "text": "响应参数", "icon": "jstree-file","num":"batch3" }
	                ]
	            },
	            {
	                "text": "卡信息查询接口单个",
	                "num":"single",
	                "children": [
	                    { "text": "接口名称", "icon": "jstree-file","num":"single1" },
	                    { "text": "请求参数", "icon": "jstree-file","num":"single2" },
	                    { "text": "响应参数", "icon": "jstree-file","num":"single3" }
	                ]
	            },
	            {
	                "text": "卡片本月用量批量查询",
	                "num":"monthBatch",
	                "children": [
	                    { "text": "接口名称", "icon": "jstree-file","num":"monthBatch1" },
	                    { "text": "请求参数", "icon": "jstree-file","num":"monthBatch2" },
	                    { "text": "响应参数", "icon": "jstree-file","num":"monthBatch3" }
	                ]
	            },
	            {
	                "text": "卡片周期流量查询",
	                "num":"period",
	                "children": [
	                    { "text": "接口名称", "icon": "jstree-file","num":"period1" },
	                    { "text": "请求参数", "icon": "jstree-file","num":"period2" },
	                    { "text": "响应参数", "icon": "jstree-file","num":"period3" }
	                ]
	            },
	            {
	                "text": "查询账户下全部卡片",
	                "num":"userAll",
	                "children": [
	                    { "text": "接口名称", "icon": "jstree-file","num":"userAll1" },
	                    { "text": "请求参数", "icon": "jstree-file","num":"userAll2" },
	                    { "text": "响应参数", "icon": "jstree-file","num":"userAll3" }
	                ]
	            },
	            {
	                "text": "激活",
	                "num":"live",
	                "children": [
	                    { "text": "接口名称", "icon": "jstree-file","num":"live1" },
	                    { "text": "请求参数", "icon": "jstree-file","num":"live2" },
	                    { "text": "响应参数", "icon": "jstree-file","num":"live3" }
	                ]
	            },
	            {
	                "text": "套餐开通",
	                "num":"combo",
	                "children": [
	                    { "text": "接口名称", "icon": "jstree-file","num":"combo1" },
	                    { "text": "请求参数", "icon": "jstree-file","num":"combo2" },
	                    { "text": "响应参数", "icon": "jstree-file","num":"combo3" }
	                ]
	            },
	            {
	                "text": "附录一：错误代码",
	                "num":"appendix1"
	            },
	            {
	                "text": "附录二：签名规则",
	                "num":"appendix2"
	            }
	        ]
	    }
	});

})