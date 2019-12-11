var _m2m_customer_heeler = [
	{
		leader: '客户管理',
		isFirst: true,
		isShow: true,
		icon: './assets/images/icon_menu_customer.png',
		mn_code: 'mn_c_account_manageer',
		heeler: [{
			leader: '客户列表',
			txt: 'clientList',
			sourceCode: '_mu_c_clientList',
			isShow: true,
			heeler: []
		}]
	},
	{
		leader: '卡片管理',
		isFirst: true,
		isShow: true,
		icon: './assets/images/icon_menu_card.png',
		mn_code: 'mn_c_card_manageer',
		heeler: [
			{
				leader: '我的流量卡',
				isShow: true,
				txt: 'm2mCard_flow_info',
				sourceCode: '_mu_c_m2mCard_flow_info',
				heeler: []
			},
			{
				leader: '我的语音卡',
				isShow: true,
				txt: 'm2mCard_voice_info',
				sourceCode: '_mu_c_m2mCard_voice_info',
				heeler: []
			},
			{
				leader: '划拨记录',
				isShow: true,
				txt: 'cardHuabo',
				sourceCode: '_mu_c_cardHuabo_voice_info',
				heeler: []
			},
			{
				leader: '实名认证',
				isShow: true,
				txt: 'name_review',
				sourceCode: '_mu_c_name_review',
				heeler: []
			},
			{
				leader: '状态变更记录',
				isShow: true,
				txt: 'card_stopRecord_c',
				sourceCode: '_mu_c_card_stopRecord_c',
				heeler: []
			}
		]
	},
	{
		leader: '共享池管理',
		isFirst: true,
		isShow: true,
		icon: './assets/images/icon_menu_service.png',
		mn_code: 'mn_c_gxc_manageer',
		heeler: [{
				leader: '共享池列表',
				txt: 'sharedPoolList',
				sourceCode: '_mu_c_sharedPoolList',
				isShow: true,
				heeler: []
			},

			{
				leader: '子池列表',
				txt: 'sharedPoolList_child',
				sourceCode: '_mu_c_sharedPoolList_child',
				isShow: false,
				heeler: []
			},
			{
				leader: '卡片列表',
				txt: 'sharedPoolList_child_card',
				sourceCode: '_mu_c_sharedPoolList_child_card',
				isShow: false,
				heeler: []
			},
			{
				leader: '共享池套餐列表',
				txt: 'poolPackageList',
				sourceCode: '_mu_c_poolPackageList',
				isShow: true,
				heeler: []
			},
			{
				leader: '共享池账单',
				txt: 'poolBillList',
				sourceCode: '_mu_c_poolBillList',
				isShow: true,
				heeler: []
			},
			{
				leader: '共享池账单_主套餐',
				txt: 'poolBill',
				sourceCode: '_mu_c_poolBill',
				isShow: false,
				heeler: []
			},
			{
				leader: '共享池账单_扩容包',
				txt: 'poolBill_expansion',
				sourceCode: '_mu_c_poolBill_expansion',
				isShow: false,
				heeler: []
			},
		]
	},
	{
		leader: '分润管理',
		isFirst: true,
		isShow: true,
		icon: './assets/images/icon_menu_service.png',
		mn_code: 'mn_c_fr_manageer',
		heeler: [{
				leader: '分润汇总',
				txt: 'summary',
				sourceCode: 'mn_c_fr_summary',
				isShow: true,
				heeler: []
			},

			{
				leader: '分润套餐',
				txt: 'bagList',
				sourceCode: 'mn_c_fr_bagList',
				isShow: true,
				heeler: [] 
			},
			{
				leader: '客户分润套餐',
				txt: 'customerBag',
				sourceCode: 'mn_c_fr_customerBag',
				isShow: true,
				heeler: []
			},
			{
				leader: '分润明细',
				txt: 'detail',
				sourceCode: 'mn_c_fr_detail',
				isShow: true,
				heeler: []
			},
			{
				leader: '分润提现',
				txt: 'withdraw',
				sourceCode: 'mn_c_fr_withdraw',
				isShow: true,
				heeler: []
			}
		]
	},
	//	{
	//		leader: '共享池管理',
	//		isFirst: true,
	//		isShow:true,
	//		icon:'./assets/images/icon_menu_card.png',
	//		mn_code:'mn_c_gxc_manageer',
	//		heeler: [
	//			{
	//				leader: '共享池列表',
	//				isShow:true,
	//				txt: 'm2mCardGxc',
	//				sourceCode: '_mu_c_m2mCard_gxc',
	//				heeler: []
	//			},
	//			{
	//				leader: '共享池套餐列表',
	//				isShow:true,
	//				txt: 'm2mCardGxcTc',
	//				sourceCode: '_mu_c_m2mCard_gxcTc',
	//				heeler: []
	//			}, 
	//			{
	//				leader: '共享池账单',
	//				isShow:true,
	//				txt: 'm2mCardGxcZd',
	//				sourceCode: '_mu_c_m2mCard_gxcZd',
	//				heeler: []
	//			}
	//		]
	//	},
	{
		leader: '套餐管理',
		isFirst: true,
		isShow: true,
		icon: './assets/images/icon_menu_service.png',
		mn_code: 'mn_c_tc_manageer',
		heeler: [{
				leader: '套餐列表',
				txt: 'orderList',
				sourceCode: '_mu_c_orderList',
				isShow: true,
				heeler: []
			},

			{
				leader: '客户套餐',
				txt: 'orderClient',
				sourceCode: '_mu_c_orderClient',
				isShow: true,
				heeler: []
			},
//			{
//				leader: '终端套餐定价',
//				txt: 'orderPricing',
//				sourceCode: '_mu_c_orderPricing',
//				isShow: true,
//				heeler: []
//			},
//			{
//				leader: '终端订单历史',
//				txt: 'orderHistory',
//				sourceCode: '_mu_c_orderHistory',
//				isShow: true,
//				heeler: []
//			},
			{
				leader: '终端订购历史',
				txt: 'purchaseHistory', 
				sourceCode: '_mu_c_purchaseHistory',
				isShow: true,
				heeler: []
			}
		]
	},
	{
		leader: '短信管理',
		isFirst: true,
		isShow: true,
		icon: './assets/images/icon_menu_sms.png',
		mn_code: 'mn_c_sms_manageer',
		heeler: [{
				leader: '短信发送',
				isShow: true,
				txt: 'msmSend',
				sourceCode: '_mu_c_m2mCardflowList11',
				heeler: []
			},
			{
				leader: '短信发送日志',
				isShow: true,
				txt: 'msmSendLog',
				sourceCode: '_mu_c_m2mCardvoiceList12',
				heeler: []
			},
			{
				leader: '短信接收日志',
				isShow: true,
				txt: 'msmAppsetLog',
				sourceCode: '_mu_c_m2mCardflowList13',
				heeler: []
			},
			{
				leader: '短信模板',
				isShow: true,
				txt: 'msmTemplate',
				sourceCode: '_mu_c_m2mCardvoiceList14',
				heeler: []
			},
		]
	},
	{
		leader: '服务保障',
		isFirst: true,
		icon: './assets/images/icon_menu_service.png',
		mn_code: 'mn_c_server_manageer',
		heeler: [{
				leader: '故障申报',
				isShow: true,
				txt: 'm2mCard_flow_inf16',
				sourceCode: '_mu_c_m2mCardflowList16',
				heeler: []
			},
			{
				leader: '意见管理',
				isShow: true,
				txt: 'm2mCard_voice_inf16',
				sourceCode: '_mu_c_m2mCardvoiceList16',
				heeler: []
			}
		]
	},
	{
		leader: '接口管理',
		isFirst: true,
		isShow: true,
		icon:'./assets/images/icon_menu_port.png',
		mn_code:'mn_c_port_manageer',
		heeler: [
			{
				leader: '接口管理',
				isShow: true,
				txt: 'apiDoc',
				sourceCode: '_mu_c_apiDoc',
				heeler: []
			}
		]
	},
	{
		leader: '告警管理',
		isFirst: true,
		isShow: true,
		icon: './assets/images/icon_menu_110.png',
		mn_code: 'mn_c_gj_manageer',
		heeler: [{
				leader: '单卡告警',
				isShow: true,
				txt: 'm2mCard_flow_inf21',
				sourceCode: '_mu_c_m2mCardflowList21',
				heeler: []
			},
			{
				leader: '流量池告警',
				isShow: true,
				txt: 'm2mCard_voice_inf22',
				sourceCode: '_mu_c_m2mCardvoiceList22',
				heeler: []
			},
			{
				leader: '告警规则',
				isShow: true,
				txt: 'm2mCard_voice_inf23',
				sourceCode: '_mu_c_m2mCardvoiceList23',
				heeler: []
			}
		]
	},
	{
		leader: '流量池管理',
		isFirst: true,
		isShow: true,
		icon: './assets/images/icon_menu_manager.png',
		mn_code: 'mn_c_llc_manageer',
		heeler: [{
				leader: '运营商侧流量池',
				isShow: true,
				txt: 'm2mCard_flow_inf24',
				sourceCode: '_mu_c_m2mCardflowList24',
				heeler: []
			},
			{
				leader: '自建流量池',
				isShow: true,
				txt: 'm2mCard_voice_inf24',
				sourceCode: '_mu_c_m2mCardvoiceList24',
				heeler: []
			}
		]
	},
	{
		leader: '订购历史',
		isFirst: true,
		isShow: true,
		icon: './assets/images/icon_menu_hsitory.png',
		mn_code: 'mn_c_history_manageer',
		heeler: [{
				leader: '卡片充值记录',
				isShow: true,
				txt: 'cardRecord',
				sourceCode: '_mu_c_cardRecord',
				heeler: []
			},
			{
				leader: '卡片订单',
				isShow: true,
				txt: 'cardOrder',
				sourceCode: '_mu_c_m2mCardflowList41',
				heeler: []
			},
		]
	},
	//	{
	//		leader: '资费管理',
	//		isFirst: true,
	//		isShow: true,
	//		icon:'./assets/images/icon_menu_service.png',
	//		mn_code:'mn_c_money_manageer',
	//		heeler: [
	//			{
	//				leader: '资费管理',
	//				txt: 'tariff_magage',
	//				isShow: true,
	//				sourceCode: '_mu_c_tariff_manage',
	//				heeler: []
	//			}
	//		]
	//	},
	{
		leader: '故障报修',
		isFirst: true,
		isShow: true,
		icon: './assets/images/icon_menu_repair.png',
		mn_code: 'mn_c_fault_manageer',
		heeler: [{
			leader: '故障报修',
			isShow: true,
			txt: 'failure_repair',
			sourceCode: '_mu_c_failure_repair',
			heeler: []
		}]
	},
	{
		leader: '接口文档',
		isFirst: true,
		isShow: true,
		icon: './assets/images/icon_menu_port.png',
		mn_code: 'mn_c_portDoc_manageer',
		heeler: [{
			leader: '接口管理',
			isShow: true,
			txt: 'port_info',
			sourceCode: '_mu_c_port_info',
			heeler: []
		}]
	},
	{
		leader: '账户管理',
		isFirst: true,
		isShow: true,
		icon: './assets/images/icon_menu_manager.png',
		mn_code: '_mu_c_account_manager',
		heeler: [{
			leader: '账户充值',
			isShow: true,
			txt: 'account_recharge', 
			sourceCode: '_mu_c_account',
			heeler: []
		}]
	},
	{
		leader: '个人管理',
		isFirst: true,
		isShow: true,
		icon: './assets/images/icon_menu_manager.png',
		mn_code: 'mn_c_personal_manageer',
		heeler: [{
			leader: '个人信息',
			isShow: true,
			txt: 'orderMsg',
			sourceCode: '_mu_c_orderMsg',
			heeler: []
		},{
			leader: '个性化设置', 
			isShow: true,
			txt: 'personalSetting',
			sourceCode: '_mu_c_personalSetting',
			heeler: []
		},{
			leader: '公众号配置', 
			isShow: true,
			txt: 'publicConfig',
			sourceCode: '_mu_c_publicConfig',
			heeler: []
		}]
	}
]
