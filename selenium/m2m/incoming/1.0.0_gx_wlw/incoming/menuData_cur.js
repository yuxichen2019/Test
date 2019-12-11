var menuData_cur = {
	heeler: [
		{
			leader: '账户管理',
			isFirst: true,
			mn_code: 'mn_account_manageer',
			heeler: [
				{
					leader: '用户列表',
					txt: 'account_info',
					sourceCode: '_mu_accountInfo',
					heeler: []
				},
				{
					leader: '客户列表',
					txt: 'cus_info',
					sourceCode: '_mu_cusinfo',
					heeler: []
				},
				{
					leader: '角色管理',
					txt: 'role_manager',
					sourceCode: '_mu_roleManager',
					heeler: []
				}
			]
		},
		{
			leader: '供应商管理',
			isFirst: true,
			mn_code: 'mn_supplier_manageer',
			heeler: [{
				leader: '供应商管理',
				txt: 'sup_info',
				sourceCode: '_mu_supinfo',
				heeler: []
			}]
		},
		{
			leader: '卡片管理',
			isFirst: true,
			mn_code: 'mn_card_manageer',
			heeler: [
				{
					leader: '流量卡管理',
					txt: 'm2mCard',
					sourceCode: '_mu_m2mCard_flow_info',
					heeler: []
				},
				{
					leader: '语音卡管理',
					txt: 'm2mCard_voice_info',
					sourceCode: '_mu_m2mCard_voice_info',
					heeler: []
				},
				{
					leader: '卡库管理',
					txt: 'card_strock',
					sourceCode: '_mu_card_strock',
					heeler: []
				},
				{
					leader: '划拨纪录',
					txt: 'card_slideRecord',
					sourceCode: '_mu_card_slideRecord',
					heeler: []
				},
				{
					leader: '状态变更记录',
					txt: 'card_stopRecord',
					sourceCode: '_mu_card_stopRecord',
					heeler: []
				},
				{
					leader: '预约变更记录',
					txt: 'card_make_record',
					sourceCode: '_mu_card_make_record',
					heeler: []
				}
			]
		},
		{
			leader: '共享池管理',
			isFirst: true,
			mn_code: 'mn_card_manageer_gxc',
			heeler: [{
					leader: '运营商共享池',
					txt: 'shareOperator',
					sourceCode: '_mu_c_shareOperator',
					heeler: []
				},
				{
					leader: '运营商联通',
					txt: 'shareOperator_lt',
					sourceCode: '_mu_c_shareOperator_lt',
					isShow: false,
					heeler: []
				},
				{
					leader: '运营商卡片列表',
					txt: 'shareOperator_list',
					sourceCode: '_mu_c_shareOperator_list',
					isShow: false,
					heeler: []
				},
				{
					leader: '共享池列表',
					txt: 'shareList',
					sourceCode: '_mu_c_shareList',
					heeler: []
				},
				{
					leader: '共享池联通',
					txt: 'shareList_lt',
					sourceCode: '_mu_c_shareList_lt',
					isShow: false,
					heeler: []
				},
				{
					leader: '共享池子池列表',
					txt: 'shareList_list1',
					sourceCode: '_mu_c_shareList_list1',
					isShow: false,
					heeler: []
				},
				{
					leader: '共享池卡片列表',
					txt: 'shareList_list2',
					sourceCode: '_mu_c_shareList_list2',
					isShow: false,
					heeler: []
				},
				{
					leader: '平台共享池套餐',
					txt: 'sharePlatform',
					sourceCode: '_mu_c_sharePlatform',
					heeler: []
				},
				{
					leader: '客户共享池套餐',
					txt: 'shareClient',
					sourceCode: '_mu_c_shareClient',
					heeler: []
				},
				{
					leader: '共享池账单',
					txt: 'shareBill_before',
					sourceCode: '_mu_c_shareBill_before',
					heeler: []
				},
				{
					leader: '预付',
					txt: 'shareBill_before_list',
					sourceCode: '_mu_c_shareBill_yf',
					isShow: false,
					heeler: []
				},
				{
					leader: '后付款',
					txt: 'shareBill_after',
					sourceCode: '_mu_c_shareBill_after',
					isShow: false,
					heeler: []
				},
				{
					leader: '分配记录',
					txt: 'card_distributed',
					sourceCode: '_mu_card_distributed',
					heeler: []
				},
				{
					leader: '共享池续订表',
					txt: 't_pool_renew_log',
					sourceCode: '_mu_t_pool_renew_lo',
					heeler: []
				}
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
					leader: '分润明细',
					txt: 'detail',
					sourceCode: 'mn_c_fr_detail',
					isShow: true,
					heeler: []
				},
				{
					leader: '提现审核',
					txt: 'withdrawCheck',
					sourceCode: 'mn_c_fr_withdrawCheck',
					isShow: true,
					heeler: []
				},
				{
					leader: '分润调价记录',
					txt: 'price_fr',
					sourceCode: 'mn_c_fr_price_fr',
					isShow: true,
					heeler: []
				}
			]
		},
		{
			leader: '套餐管理',
			isFirst: true,
			mn_code: 'mn_meal_manageer',
			heeler: [
				{
					leader: '运营商套餐',
					txt: 'operator_tc',
					sourceCode: '_mu_operator_tc',
					heeler: []
				},
				
				{
					leader: '平台套餐',
					txt: 'customer_tc',
					sourceCode: '_mu_customer_tc',
					heeler: []
				},
				{
					leader: '定义限速规则',
					txt: 'speedLimit_role',
					sourceCode: '_mu_speedLimit_role',
					heeler: []
				},
				{
					leader: '客户套餐定价',
					txt: 'customer_tcdj',
					sourceCode: '_mu_customer_tcdj',
					heeler: []
				},
				{
					leader: '调价记录',
					txt: 'price_tc',
					sourceCode: '_mu_price_tc',
					heeler: []
				},
				{
					leader: '终端订购历史',
					txt: 'terminal_dgls',
					sourceCode: '_mu_terminal_tcdj',
					heeler: []
				}
			]
		},
		{
			leader: '短信管理',
			isFirst: true,
			mn_code: 'mn_sms_manageer',
			heeler: [{
					leader: '短信发送',
					isShow: true,
					txt: 'msmSend',
					sourceCode: '_mu_msmSend',
					heeler: []
				},
				{
					leader: '短信发送日志',
					isShow: true,
					txt: 'msmSendLog',
					sourceCode: '_mu_msmSendLog',
					heeler: []
				},
				{
					leader: '短信接收日志',
					isShow: true,
					txt: 'msmAppsetLog',
					sourceCode: '_mu_msmAppsetLog',
					heeler: []
				},
				{
					leader: '短信模板',
					isShow: true,
					txt: 'msmTemplate',
					sourceCode: '_mu_msmTemplate',
					heeler: []
				}
			]
		},
		{
			leader: '财务管理',
			isFirst: true,
			mn_code: 'mn_finance_manageer',
			heeler: [{
				leader: '账户充值',
				txt: 'account_recharge',
				sourceCode: '_mu_port_info',
				heeler: []
			}]
		},
		{
			leader: '交易记录',
			isFirst: true,
			mn_code: 'mn_transaction_record',
			heeler: [{
					leader: '卡片充值记录',
					txt: 'recharge_record',
					sourceCode: '_mu_port_info',
					heeler: []
			}]
		},
		{
			leader: '个人管理',
			isFirst: true,
			mn_code: 'mn_personal_manageer',
			heeler: [{
					leader: '个人信息',
					txt: 'personal_info',
					sourceCode: '_mu_port_info',
					heeler: []
				},
				{
					leader: '修改密码',
					txt: 'change_pw',
					sourceCode: '_mu_port_info',
					heeler: []
				}
			]
		},
		{
			leader: '其他功能',
			isFirst: true,
			mn_code: 'mn_other_features',
			heeler: [
				{
					leader: '实名认证',
					txt: 'name_review',
					sourceCode: '_mu_name_review',
					heeler: []
				},
				{
					leader: 'IMEI管理',
					txt: 'imei_info',
					sourceCode: '_mu_imei_info',
					heeler: []
				},
				{
					leader: 'SN码管理',
					txt: 'sn_manager',
					sourceCode: '_mu_sn_manager',
					heeler: []
				},
				{
					leader: '故障报修',
					txt: 'failure_repair',
					sourceCode: '_mu_failure_repair',
					heeler: []
				},
				{
					leader: '接口管理',
					txt: 'port_info',
					sourceCode: '_mu_port_info',
					heeler: []
				},

			]
		},
		{
			leader: '系统管理',
			isFirst: true,
			mn_code: 'mn_system_manageer',
			heeler: [{
					leader: '导入日志记录',
					txt: 'log_info',
					sourceCode: '_mu_log_info',
					heeler: []
				},
				{
					leader: '权限管理',
					txt: 'jurisdiction',
					sourceCode: '_mu_jurisdiction',
					heeler: []
				}
			]
		}
	]
}
