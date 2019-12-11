ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];

	ss.getDom('#change_pwBtn').onclick = function(){
		console.log(111)
		var _cp_passwordold = ss.getDom('#_cp_passwordold').value;
		var _cp_password2 = ss.getDom('#_cp_password2').value;
		var _cp_passwordsure = ss.getDom('#_cp_passwordsure').value;
		if(!_cp_passwordold || _cp_passwordold == ""){
			ss.layer.msg('请填写旧密码！');
			return;
		}
		if(!_cp_password2 || _cp_password2 == ""){
			ss.layer.msg('请填写新密码！');
			return;
		}
		if(!_cp_passwordsure || _cp_passwordsure == ""){
			ss.layer.msg('请重复新密码！');
			return;
		}
		if(_cp_password2 != _cp_passwordsure){
			ss.layer.msg('两次密码输入不一致！')
			return;
		};
		//获取该用户的信息
		ss.ajax({
			url: '/admin/common/getCurrentUserInfo.action',
			data: {}
		}, {
			success: function(userData) {
	
				var tempObj = {};
				tempObj.success = function(data) {
					if(data.result == 'success') {
						ss.layer.msg(data.data==1?'设置成功！':'旧密码错误！');
					} else {
						data['data'] && ss.layer.msg(data['data']);
						data['errorMsg'] && ss.layer.msg(data['errorMsg']);
						!data['data'] && !data['errorMsg'] && ss.layer.msg('接口有误！');
					}
				};
				tempObj.beforeSend = function(request) {
					ss.c3Loading.show();
					request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
				};
				tempObj.complete = function(xhr) {
					ss.c3Loading.hidden();
					xhr.responseText || ss.error('登陆失效，接口没返回登陆页面！');
					//登陆时效性，接口约定：重定向->index.html
					xhr.responseText.indexOf('lg_login_pw_label') != -1 &&
						layer.confirm('登陆已失效，请重新登陆！', function(index) {
							location.href = 'index.html';
						});
				}
				tempObj.url = commonUrl + '/admin/common/updatePassword.action';
				tempObj.type = 'post';
				tempObj.data = JSON.stringify({
		        	oldPass:_cp_passwordold,
		        	loginPass:_cp_password2,
		        	uuid:userData.data.uuid
		        });
				$.ajax(tempObj);


//				dtInstance.eAjax({
//			        url:commonUrl + '/admin/common/updatePassword.action',
//			        type:'post',
//			        data:{
//			        	oldPass:_cp_passwordold,
//			        	loginPass:_cp_password2,
//			        	uuid:userData.data.uuid
//			        },
//				}, 
//			    {
//			    	success:function(data){
//						ss.layer.msg('设置成功！')
//			    	},
//			    	isJson:true
//				});
				
			},
			isJson: true
		});
	}
	
	
})