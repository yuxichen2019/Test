ss.imports(['dataTable'], function(exports) {
	var commonUrl = ss.options['commonUrl'];
	//数据表格
	var self = ss.dataTable({ //64,369
		appendTo: $('#dataCon')[0], //追加元素
		//数据选项
		dataOption: {
			listUrl: commonUrl + '/admin/TBag/queryByPageInfo.action', //请求Url
			type: 'post', //默认post请求
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify({}),
			//pageSize:5,//没值时，则默认是根据屏幕高度判断，保证一页
		},
		//搜索栏选项
		searchOption: [{
				name: '套餐名称',
				txt: 'bag_name',
				type: 'txt',
				width: '120px'
			},
			{
				name: '套餐类型',
				txt: 'bag_type',
				type: 'select',
				width: '120px',
				data: [{
						name: '流量包',
						code: '1'
					},
					{
						name: '语音包',
						code: '2'
					},
				]
			},
			{
				name: '运营商',
				txt: 'operator',
				type: 'select',
				width: '120px',
				data: [{
						name: '移动',
						code: '1'
					},
					{
						name: '联通',
						code: '2'
					},
					{
						name: '电信',
						code: '3'
					},
				]
			},
		],
		//搜索栏额外按钮
		searchBtn: {
			add: {
				name: '添加+',
				colType: 'add',
				dataType: 'json',
				url: commonUrl + '/admin/TBag/addEntity.action',
				items: {
					bagName: {
						name: '套餐名称',
						type: 'txt',
						verify: true
					},
					bagType: {
						name: '套餐类型',
						type: 'select',
						verify: true,
						data: [{
								name: '流量包',
								code: '1'
							},
							{
								name: '语音包',
								code: '2'
							},
						]
					},
					operator: {
						name: '运营商',
						type: 'select',
						verify: true,
						data: [{
								name: '移动',
								code: '1'
							},
							{
								name: '联通',
								code: '2'
							},
							{
								name: '电信',
								code: '3'
							},
						]
					},
					bagNum: {
						name: '套餐编码',
						type: 'txt',
						verify: true
					},
					costPrice: {
						name: '成本价',
						type: 'txt',
						verify: true
					},
					salePrice: {
						name: '销售价',
						type: 'txt',
						verify: true
					},
					stopTime: {
						name: '到期时间',
						type: 'time',
						verify: true
					},
					flowLimit: {
						name: '流量限制',
						type: 'txt',
						verify: true
					},
					tariffInstruction: {
						name: '资费计划指令',
						type: 'txt',
						verify: true
					},
					communicationInstruction: {
						name: '通信计划指令',
						type: 'txt',
						verify: true
					},
					termValidityMonth: {
						name: '有效期(月)',
						type: 'txt',
						verify: false
					},
					termValidity: {
						name: '有效期限(天)',
						type: 'txt',
						verify: false
					},
					businessType: {
						name: '套餐类型',
						type: 'select',
						verify: true,
						data: [{
								name: '主套餐',
								code: '1'
							},
							{
								name: '叠加套餐',
								code: '2'
							},
						]
					},
				}
			}
		},
		//表格内容
		table: {
			//各选项
			options: {
				closeInterlace: true,
				isChangeTime:['stopTime'],
				dpWith:{
					stopTime:8,
					operator:4
				},
				shim: {
					operator: {
						'1': '移动',
						'2': '联通',
						'3': '电信',
					},
					bagType: {
						'1': '流量包',
						'2': '语音包',
					},
					businessType: {
						'1': '主套餐',
						'2': '叠加套餐',
					}
				},
			},
			tlName: [
				'套餐名称', '套餐类型', '运营商', '套餐编码', '成本价', '销售价',
				'到期时间', '流量限制', '资费计划指令', '通信计划指令',
				'有效期(月)', '有效期限(天)', '套餐类型'
			], //表头名字
			tlTxt: [
				'bagName', 'bagType', 'operator', 'bagNum', 'costPrice', 'salePrice',
				'stopTime', 'flowLimit', 'tariffInstruction', 'communicationInstruction',
				'termValidityMonth', 'termValidity', 'businessType'
			], //表头字段
			//操作项
			operation: [
				//编辑和删除为默认，其它按钮需txt
				{
					name: '编辑',
					url: commonUrl + '/admin/TBag/editEntity.action',
					dataType: 'json',
					items: {
						bagName: {
							name: '套餐名称',
							type: 'txt',
							verify: true
						},
						bagType: {
							name: '套餐类型',
							type: 'select',
							verify: true,
							data: [{
									name: '流量包',
									code: '1'
								},
								{
									name: '语音包',
									code: '2'
								},
							]
						},
						operator: {
							name: '运营商',
							type: 'select',
							verify: true,
							data: [{
									name: '移动',
									code: '1'
								},
								{
									name: '联通',
									code: '2'
								},
								{
									name: '电信',
									code: '3'
								},
							]
						},
						bagNum: {
							name: '套餐编码',
							type: 'txt',
							verify: true
						},
						costPrice: {
							name: '成本价',
							type: 'txt',
							verify: true
						},
						salePrice: {
							name: '销售价',
							type: 'txt',
							verify: true
						},
						stopTime: {
							name: '到期时间',
							type: 'time',
							verify: true
						},
						flowLimit: {
							name: '流量限制',
							type: 'txt',
							verify: true
						},
						tariffInstruction: {
							name: '资费计划指令',
							type: 'txt',
							verify: true
						},
						communicationInstruction: {
							name: '通信计划指令',
							type: 'txt',
							verify: true
						},
						termValidityMonth: {
							name: '有效期(月)',
							type: 'txt',
							verify: false
						},
						termValidity: {
							name: '有效期限(天)',
							type: 'txt',
							verify: false
						},
						businessType: {
							name: '套餐类型',
							type: 'select',
							verify: true,
							data: [{
									name: '主套餐',
									code: '1'
								},
								{
									name: '叠加套餐',
									code: '2'
								},
							]
						},
					},
					data: {
						uuid: ''
					},
				},
				{
					name: '删除',
					colType: 'del',
					dataType: 'json',
					url: commonUrl + '/admin/TBag/deleteEnttiybyUuid.action',
					data: {
						uuid: ''
					}
				},
			],

		},
		//分页
		pageOption: {
			//各选项
		}
	});

})