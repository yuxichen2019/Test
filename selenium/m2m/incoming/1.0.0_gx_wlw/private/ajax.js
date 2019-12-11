ss.define(['c3Loading'],function(exports){
    var ssAjax = function(qObj,oObj){
        oObj['isJson'] && (qObj['data'] = JSON.stringify(qObj['data']));//json方式传输赋值
        oObj['isJson'] && (qObj['dataType']='json');//dataType值为json
        qObj['type'] || (qObj['type']='post');//没请求类型，则默认为post
        var tempObj = qObj;
        //成功
        tempObj.success = function(data){
            if(data.result == 'success'){
                oObj['success'] && oObj['success'](data);
            }
            else{
                data['data'] && ss.layer.msg(data['data']);
                data['errorMsg'] && ss.layer.msg(data['errorMsg']);
                !data['data'] && !data['errorMsg'] && ss.layer.msg('系统异常！');
            };
        };
        //请求前
        tempObj.beforeSend = function(request) {
            ss.c3Loading.show();
            oObj['isJson'] && request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            oObj['beforeSend'] && oObj['beforeSend'](request);
        };
        //请求完成
        tempObj.complete = function(xhr){
            ss.c3Loading.hidden();
            oObj['complete'] && oObj['complete'](request);
            xhr.responseText || ss.error('登陆失效，接口没返回登陆页面！');
            //登陆时效性，接口约定：重定向->index.html
            xhr.responseText.indexOf('lg_login_pw_label')!=-1 &&
            layer.confirm('登陆已失效，请重新登陆！', function(index){
                location.href='index.html';
            });
        };
        $.ajax(tempObj);
    };
    exports('ajax',ssAjax);
})
