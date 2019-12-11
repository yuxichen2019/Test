﻿
ss.imports(['dataTable'], function(exports) {

	var commonUrl = ss.options['commonUrl'];
	var curObj = JSON.parse(localStorage.getItem('curObj'));
	//账单明细回显
	var curAttrObj = {
		'billNo':'', 
		'calculateCycle':'',
		'customerUuid':'',
		'poolUuid':'', 
		'supId':'',
		'totalCardNum':'',
		'totalFee':'',
		'totalFeeEx':'', 
		'totalBillFee':''
	}
	for(var a in curAttrObj){
		var parentDom = document.querySelector('#shareBillBeforeList').querySelector('.detail');
		var curAttr = parentDom.querySelector('.'+a);
		curAttr.innerHTML = curObj[a];
	}
	var tap = 1;
	//预付（主）
	var curUrlBM = commonUrl + '/admin/TPoolBillBefore/queryByPageInfo.action';
	//预付（扩）
	var curUrlBE = commonUrl + '/admin/TPoolBillExBefore/queryByPageInfo.action';
	//后付（主）
	var curUrlAM = commonUrl + '/admin/TPoolBillAfter/queryByPageInfo.action';
	//后付（扩）
	var curUrlAE = commonUrl + '/admin/TPoolBillExAfter/queryByPageInfo.action';
	//主套餐（预）
	var tlNameB = ['ICCID','充值时间','共享池名称','原定套餐','原计费金额(元)','实际计费金额(元)','已用流量(M)']
	//主套餐（后）
	var tlNameA = ['ICCID','生效时间','共享池名称','原定套餐','原计费金额(元)','是否修订套餐','计费套餐','实际计费金额(元)','已用流量(M)']
	//主套餐（预）
	var tlTxtB = ['iccid','chargeTime','poolUuid','oldBagUuid','oldFee','newFee','usedLimit']
	//主套餐（后）
	var tlTxtA = ['iccid','effectTime','poolUuid','oldBagUuid','oldFee','isEditBag','oldBagUuid','newFee','usedLimit']
	var tlName2 = ['共享池名称','扩容包名称','充值时间','计费金额(元)','扩容包可用量(G)','扩容包已用量(G)']
	var tlTxt2 = ['name','name1','time','money','limit1','limit2']
	var curUrl1 = '';
	var curUrl2 = '';
	if(curObj['billType'] == 1){
		curUrl1 = curUrlBM;
		curUrl2 = curUrlBE;
		tlName = tlNameB;
		tlTxt = tlTxtB;
	}else{
		curUrl1 = curUrlAM;
		curUrl2 = curUrlAE;
		tlName = tlNameA;
		tlTxt = tlTxtA;
	}
		var searchOption = [{
				name: '请输入ICCID',
				txt: 'name',
				type: 'txt',
				width: '200px'
			}
		]
	var searchOption2 = [
			{
				name: '充值开始时间',
				txt: 'createTimeStart',
				type: 'date',
				width: '120px',
				isLine: true,
			},
			{
				name: '充值结束时间',
				txt: 'createTimeEnd',
				type: 'date',
				width: '120px',
			},
		]
	//数据表格
	var instance = ss.dataTable({ //64,369
		appendTo: $('#shareBillBeforeList')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: curUrl1, //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			fieldType: 'string', //转换pageSize等数值类型位字符串
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: searchOption, //搜索栏额外按钮
		searchBtn: {},
		//表格内容
		table: {
			//各选项
			options: {
				isCheckbox: true,
				dpWPer: '100%',
				//				dpWith: {},
				closeInterlace: true,
				isChangeTime: ['createTime'],
				showTitle: [],
				//				sort: {
				//					'iccid': true,
				//				},
				//				shim: {
				//					
				//					'operator': {
				//						1: '移动',
				//						2: '联通',
				//						3: '电信'
				//					}
				//				},
				cbFn: function(curData) {
					
				}
			},

			tlName: tlName, //表头名字 
			tlTxt: tlTxt, //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				//				{
				//					name: '详情',
				//					colType: '',
				//					cbFn: function(curData, self) {
				//						refleshFn(curData, self)
				//					}
				//				}
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});
	var paramsAll = {
		iccid: [], //选中的iccid列表
		uuid: "", //供应商uuid

	}
	
	
	//点击切换
	document.querySelector('#dataCon_gsz').querySelector('.unicom').onclick = function() {
		location.hash = "shareBill_after_list";
	}
	document.querySelector('#dataCon_gsz').querySelector('.mobile').onclick = function() {
		location.hash = "shareBill_before_list";
	}

//	//点击切换
//	document.querySelector('#dataCon_gsz').querySelector('.unicom').onclick = function() {
//		$('#dataCon_gsz .mobile').removeClass('active');
//		$('#dataCon_gsz .unicom').addClass('active');
//		instance.sourceObj.dataOption.listUrl = curUrl2;
//		instance.sourceObj.dataOption.searchOption = searchOption2;
//		instance.sourceObj.table.tlName = tlName2;
//		instance.sourceObj.table.tlTxt = tlTxt2;
//		instance.lg_reloadFn();
//
//	}
//	document.querySelector('#dataCon_gsz').querySelector('.mobile').onclick = function() {
//		$('#dataCon_gsz .unicom').removeClass('active');
//		$('#dataCon_gsz .mobile').addClass('active');
//		instance.sourceObj.dataOption.listUrl = curUrl1;
//		instance.sourceObj.dataOption.searchOption = searchOption;
//		instance.sourceObj.table.tlName = tlName;
//		instance.sourceObj.table.tlTxt = tlTxt;
//		instance.lg_reloadFn();
//
//	}

	//	tap切换
	$("#dataCon_gsz .back").click(function() {
		location.hash = "shareBill_before";
	})
	
})