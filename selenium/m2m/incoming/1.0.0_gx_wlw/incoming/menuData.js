

var _m2m_customer_heeler = [
	{
		leader: '客户管理',
		isFirst: true,
		isShow: true,
		icon:'./assets/images/icon_menu_customer.png',
		mn_code:'mn_account_manageer',
		heeler: [
			{
				leader: '套餐列表',
				txt: 'clientList',
				isShow: true,
				heeler: []
			}
		]
	},
	{
		leader: '卡片管理',
		isFirst: true,
		isShow:true,
		icon:'./assets/images/icon_menu_card.png',
		mn_code:'mn_card_manageer',
		heeler: [
			{
				leader: '我的流量卡',
				isShow:true,
				txt: 'm2mCard_flow_info',
				heeler: []
			},
			{
				leader: '我的语音卡',
				isShow:true,
				txt: 'm2mCard_voice_info',
				heeler: []
			},
			{
				leader: '划拨记录',
				isShow:true,
				txt: 'cardHuabo',
				heeler: []
			},
//								{
//									leader: '客户流量卡',
//									isShow: true,
//									txt: 'm2mCard_voice_info1',
//									sourceCode: '_mu_m2mCardvoiceList1',
//									heeler: []
//								},
//								{
//									leader: '客户语音卡',
//									isShow: true,
//									txt: 'm2mCard_voice_info2',
//									sourceCode: '_mu_m2mCardvoiceList2',
//									heeler: []
//								},
//								{
//									leader: '停机保号卡片明细',
//									isShow: true,
//									txt: 'm2mCard_voice_info3',
//									sourceCode: '_mu_m2mCardvoiceList3',
//									heeler: []
//								},
//								{
//									leader: '销号卡片',
//									isShow: true,
//									txt: 'm2mCard_voice_info3',
//									sourceCode: '_mu_m2mCardvoiceList4',
//									heeler: []
//								},
//								{
//									leader: '本月到期卡片',
//									isShow: true,
//									txt: 'm2mCard_voice_info3',
//									sourceCode: '_mu_m2mCardvoiceList5',
//									heeler: []
//								},
//								{
//									leader: '停复机管理',
//									isShow: true,
//									txt: 'm2mCard_voice_info3',
//									sourceCode: '_mu_m2mCardvoiceList6',
//									heeler: []
//								},
//								{
//									leader: '设备管理',
//									isShow: true,
//									txt: 'm2mCard_voice_info3',
//									sourceCode: '_mu_m2mCardvoiceList7',
//									heeler: []
//								}
		]
	},
	{
		leader: '套餐管理',
		isFirst: true,
		isShow: true,
		icon:'./assets/images/icon_menu_service.png',
		mn_code:'mn_tc_manageer',
		heeler: [
			{
				leader: '套餐列表',
				txt: 'orderList',
				isShow: true,
				heeler: []
			},
			
			{
				leader: '客户套餐',
				txt: 'orderClient',
				isShow: true,
				heeler: []
			},
			{
				leader: '终端套餐定价',
				txt: 'orderPricing',
				isShow: true,
				heeler: []
			},
			{
				leader: '终端订单历史',
				txt: 'orderHistory',
				isShow: true,
				heeler: []
			}
		]
	},
	{
		leader: '短信管理',
		isFirst: true,
		isShow: true,
		icon:'./assets/images/icon_menu_sms.png',
		mn_code:'mn_sms_manageer',
		heeler: [
			{
				leader: '短信发送',
				isShow: true,
				txt: 'm2mCard_flow_inf11',
				sourceCode: '_mu_m2mCardflowList11',
				heeler: []
			},
			{
				leader: '短信发送日志',
				isShow: true,
				txt: 'm2mCard_voice_inf12',
				sourceCode: '_mu_m2mCardvoiceList12',
				heeler: []
			},
			{
				leader: '短信接收日志',
				isShow: true,
				txt: 'm2mCard_flow_inf13',
				sourceCode: '_mu_m2mCardflowList13',
				heeler: []
			},
			{
				leader: '指令模板',
				isShow: true,
				txt: 'm2mCard_voice_inf14',
				sourceCode: '_mu_m2mCardvoiceList14',
				heeler: []
			},
		]
	},
	{
		leader: '服务保障', 
		isFirst: true,
		icon:'./assets/images/icon_menu_service.png',
		mn_code:'mn_server_manageer',
		heeler: [
			{
				leader: '故障申报',
				isShow: true,
				txt: 'm2mCard_flow_inf16',
				sourceCode: '_mu_m2mCardflowList16',
				heeler: []
			},
			{
				leader: '意见管理',
				isShow: true,
				txt: 'm2mCard_voice_inf16',
				sourceCode: '_mu_m2mCardvoiceList16',
				heeler: []
			}
		]
	},
	{
		leader: '接口管理',
		isFirst: true,
		isShow: true,
		icon:'./assets/images/icon_menu_port.png',
		mn_code:'mn_port_manageer',
		heeler: [
			{
				leader: '接口管理',
				isShow: true,
				txt: 'apiDoc',
				sourceCode: '_mu_apiDoc',
				heeler: []
			}
		]
	},
	{
		leader: '告警管理',
		isFirst: true,
		isShow: true,
		icon:'./assets/images/icon_menu_110.png',
		mn_code:'mn_gj_manageer',
		heeler: [
			{
				leader: '单卡告警',
				isShow: true,
				txt: 'm2mCard_flow_inf21',
				sourceCode: '_mu_m2mCardflowList21',
				heeler: []
			},
			{
				leader: '流量池告警',
				isShow: true,
				txt: 'm2mCard_voice_inf22',
				sourceCode: '_mu_m2mCardvoiceList22',
				heeler: []
			},
			{
				leader: '告警规则',
				isShow: true,
				txt: 'm2mCard_voice_inf23',
				sourceCode: '_mu_m2mCardvoiceList23',
				heeler: []
			}
		]
	},
	{
		leader: '流量池管理',
		isFirst: true,
		isShow: true,
		icon:'./assets/images/icon_menu_manager.png',
		mn_code:'mn_llc_manageer',
		heeler: [
			{
				leader: '运营商侧流量池',
				isShow: true,
				txt: 'm2mCard_flow_inf24',
				sourceCode: '_mu_m2mCardflowList24',
				heeler: []
			},
			{
				leader: '自建流量池',
				isShow: true,
				txt: 'm2mCard_voice_inf24',
				sourceCode: '_mu_m2mCardvoiceList24',
				heeler: []
			}
		]
	},
	{
		leader: '订购历史',
		isFirst: true,
		isShow: true,
		icon:'./assets/images/icon_menu_hsitory.png',
		mn_code:'mn_history_manageer',
		heeler: [
			{
				leader: '卡片充值记录',
				isShow: true,
				txt: 'cardRecord',
				heeler: []
			},
			{
				leader: '卡片订单',
				isShow: true,
				txt: 'cardOrder',
				sourceCode: '_mu_m2mCardflowList41',
				heeler: []
			},
		]
	},
	{
		leader: '资费管理',
		isFirst: true,
		isShow: true,
		icon:'./assets/images/icon_menu_service.png',
		mn_code:'mn_money_manageer',
		heeler: [
			{
				leader: '资费管理',
				txt: 'tariff_magage',
				isShow: true,
				sourceCode: '_mu_tariff_manage',
				heeler: []
			}
		]
	},
	{
		leader: '故障报修',
		isFirst: true,
		isShow: true,
		icon:'./assets/images/icon_menu_repair.png',
		mn_code:'mn_fault_manageer',
		heeler: [
			{
				leader: '故障报修',
				isShow: true,
				txt: 'failure_repair',
				sourceCode: '_mu_failure_repair',
				heeler: [] 
			}
		]
	},
	{
		leader: '接口文档',
		isFirst: true,
		isShow: true,
		icon:'./assets/images/icon_menu_port.png',
		mn_code:'mn_portDoc_manageer',
		heeler: [
			{
				leader: '接口管理',
				isShow: true,
				txt: 'port_info',
				sourceCode: '_mu_port_info',
				heeler: []
			}
		]
	},
	{
		leader: '个人管理',
		isFirst: true,
		isShow: true,
		icon:'./assets/images/icon_menu_manager.png',
		mn_code:'mn_personal_manageer',
		heeler: [
			{
				leader: '个人信息',
				isShow: true,
				txt: 'orderMsg',
				heeler: []
			} 
		] 
	}
]






