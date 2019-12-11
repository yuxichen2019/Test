ss.define(function(exports){
	//备注：依赖init.css样式
    function userMenu(obj) {
        this.sourceObj = obj;
		this.domWrap = {};//dom容器
        this.scope = {};//scope容器
        this.init();//初始化
    }
    userMenu.prototype = {
        constructor:userMenu,
        //初始化
		init:function(){
            this.rd_contianerFn();//渲染整体容器
		},
        //| 渲染  | 
        //渲染-整体容器
        rd_contianerFn:function(){
            var self = this,obj = self.sourceObj;
            //虚拟dom容器
            var frameDomWrap = document.createDocumentFragment();
            //最外层容器
            var docNavMenuWrap = ss.crtDom('div','docNavMenuWrap','',frameDomWrap,
            	{
            		cn:['padding','width'],
            		cv:['15px',obj.width||'auto']
        		}
            );
            var initCount = 0;//起初层级
            //递归创建函数
            var recursionFn = function(data,fatherDom,count){
                var curHeelers = data.childMenus;
                var COUNT = count;
                if(!curHeelers || !curHeelers.length) return;
                for(var i=0,iLen=curHeelers.length; i<iLen; i++){
                    ss.crtDom('div','_itemWrap_'+COUNT,'',fatherDom,{an:['_count'],av:[COUNT]})
                    .appendDom(function(dom){
                        self.rd_itemsFn({
                            data:curHeelers[i],
                            count:COUNT,
                            appendTo:dom,
                            index:i,
                            leg:iLen
                        });//渲染各项
                        recursionFn(curHeelers[i],dom,COUNT+1);
                    });
                };
            };
            recursionFn(obj.data,docNavMenuWrap,initCount);//调用
            obj.appendTo.appendChild(frameDomWrap);//添加虚拟dom
        },
        //整体容器-渲染各项总汇
        rd_itemsFn:function(obj){
            var self = this;
            obj.count===0 ?
                self.rd_itemsFirstFn(obj)//首项
                :
                self.rd_itemsOtherFn(obj);
        },
        //渲染各项-首项
        rd_itemsFirstFn:function(obj){  
            var self = this;
            //首项
            var curData = obj.data;
            var curCount = obj.count;
            ss.mdfCss(obj.appendTo,['height','35px','overflow','hidden'])
            ss.crtDom('div','txt','',obj.appendTo,{
                cn:[
                	'fontSize','height','lineHeight','cursor','userSelect',
                	'textOverflow','overflow','whiteSpace'
            	],
                cv:[
                	'16px','35px','35px','pointer','none',
                	'ellipsis','hidden','nowrap'
            	]
            })
            .appendDom(function(dom){
                //三角符号
                curData.childMenus && curData.childMenus.length && ss.crtDom('p','svg_dar',ss.svgRepository.docArrowR(14,'#8d8d8d'),dom,{
                    cn:[
                        'display','verticalAlign','position','width','height','marginRight','marginBottom',
                        'color','transform'
                    ],
                    cv:[
                        'inline-block','middle','relative','14px','14px','10px','2px',
                        '#364049','rotate(-90deg)'
                    ]
                },
                [
	                'click',function(dom){
	                    self.lg_cliShowFirstFn(dom);//首项点击
	                }
            	]);
                //首项文字
                ss.crtDom('span','',curData.customerName,dom,{
                	cn:['marginLeft'],
                	cv:[curData.childMenus && curData.childMenus.length ?'-5px':'0px'],
                	an:['uuid','title'],
                	av:[curData.uuid,curData.customerName]
                },
	                [
		                'mouseover',function(dom){
		                    ss.mdfCss(dom,['color','rgb(3, 169, 244)']);
		                },
		                'mouseout',function(dom){
		                    dom.getAttribute('sel')!='true'&& (
		                    	ss.mdfCss(dom,['color','#000'])
	                    	);
		                },
		                'click',function(dom){
		                	self.lg_selectedTxtFn(dom);
		                }
	                ]
                );
            })
        },
        //渲染各项-其它项
        rd_itemsOtherFn:function(obj){
            var self = this;
            var curData = obj.data;
            var curCount = obj.count;
            ss.mdfCss(obj.appendTo,['paddingLeft','20px','height','33px','overflow','hidden']);
            var txtDom = ss.crtDom('div','txt','',obj.appendTo,{
                cn:[
                	'fontSize','height','lineHeight','cursor','position',
                	'textOverflow','overflow','whiteSpace'
            	],
                cv:[
                	'14px','33px','33px','pointer','relative',
                	'ellipsis','hidden','nowrap'
            	]
            })            
            .appendDom(function(dom){
                //满足存在子项条件 -> 创建三角符号
                curData.childMenus && curData.childMenus.length && (
                    ss.crtDom('p','svg_dar',ss.svgRepository.docArrowR(14,'#8d8d8d'),dom,{
                        cn:[
                            'display','verticalAlign','position','width','height','marginLeft','marginBottom',
                            'color','transform','marginRight'
                        ],
                        cv:[
                            'inline-block','middle','relative','14px','14px','10px','2px',
                            '#364049','rotate(-90deg)','5px'
                        ]
                    },
                    [
		                'click',function(dom){
		                	self.lg_cliShowFn(dom);//带三角的点击事件    
		                }
            		])
                );
                //文字
                ss.crtDom('span','',curData.customerName,dom,{
                    cn:['userSelect','marginLeft'],
                    cv:['none',(!curData.childMenus || curData.childMenus.length===0)?'10px':'0px'],
                	an:['uuid','title'],
                	av:[curData.uuid,curData.customerName]
                },[
	                'mouseover',function(dom){
	                    ss.mdfCss(dom,['color','rgb(3, 169, 244)']);
	                },
	                'mouseout',function(dom){
	                    dom.getAttribute('sel')!='true'&& (
	                    	ss.mdfCss(dom,['color','#000'])
                    	);
	                },
	                'click',function(dom){
	                	self.lg_selectedTxtFn(dom);
	                }
                ]);
            });
        },
        //| 逻辑  |
        //逻辑-点击首项-展开
        lg_cliShowFirstFn:function(dom){
            var self = this;
            var dom = dom.parentNode;
            var curItemWrapDom = dom.parentNode;
            if(dom.getAttribute('isopen')==='true'){
                ss.mdfCss(curItemWrapDom,['height','35px']);
                ss.mdfCss(dom.querySelector('.svg_dar'),['transform','rotate(-90deg)']);
                ss.mdfAttr(dom,['isopen','false']);
            }
            else{
                //特殊性：三项内容全部展示(参考小程序ui)
                ss.mdfCss(dom.querySelector('.svg_dar'),['transform','rotate(0deg)']);
                ss.mdfAttr(dom,['isopen','true']);
                //第二次展开时，则存在属性curh,以该值为高度
                var _curh = curItemWrapDom.getAttribute('curh');
                if(_curh){
                    ss.mdfCss(curItemWrapDom,['height',_curh+'px']);
                    return;
                };
                //第一次展开，赋值高度和属性
                var _showH = (curItemWrapDom.children.length)*35;
                ss.mdfCss(curItemWrapDom,['height',_showH+'px']);
                ss.mdfAttr(curItemWrapDom,['curh',_showH]);
            };
        },
		//逻辑-点击其他项-展开
        lg_cliShowFn:function(dom){
            var self = this;
            var dom = dom.parentNode;
            var curItemWrapDom = dom.parentNode;
            if(dom.getAttribute('isopen')==='true'){
                ss.mdfCss(curItemWrapDom,['height','33px']);
                ss.mdfCss(dom.querySelector('.svg_dar'),['transform','rotate(-90deg)']);
                ss.mdfAttr(dom,['isopen','false']);
                //第二次展开时，则存在属性curh,以该值为高度
                var _curh = curItemWrapDom.getAttribute('curh');
                var _endH;
                _curh?
                    ( _endH = Number(_curh)-33 )
                    :
                    (_endH = (curItemWrapDom.children.length-1)*33 );
                self.lg_bubbleResetFn(dom,_endH,'mul');
            }
            else{
                ss.mdfCss(dom.querySelector('.svg_dar'),['transform','rotate(0deg)']);
                ss.mdfAttr(dom,['isopen','true']);
                //第二次展开时，则存在属性curh,以该值为高度
                var _curh = curItemWrapDom.getAttribute('curh');
                if(_curh){
                    ss.mdfCss(curItemWrapDom,['height',_curh+'px']);
                    self.lg_bubbleResetFn(dom,Number(_curh)-33,'add');
                    return;
                };
                ss.mdfCss(curItemWrapDom,['height',curItemWrapDom.children.length*33+'px']);
                self.lg_bubbleResetFn(dom,(curItemWrapDom.children.length-1)*33,'add');
                
            }
        },
        //逻辑-点击选中
        lg_selectedTxtFn:function(dom){
        	var self = this,obj = self.sourceObj;
//      	var spanDom = dom.querySelector('span');
        	var spanDom = dom;
        	var dom = dom.parentNode;
        	var lightDom = self.domWrap.lightDom;
        	lightDom &&(
        		ss.mdfCss(lightDom,['color','#000']),
        		ss.mdfAttr(lightDom,['sel','false'])
    		);
            ss.mdfCss(spanDom,['color','rgb(3, 169, 244)']);
            ss.mdfAttr(spanDom,['sel','true']);
            self.domWrap.lightDom = spanDom; 
            obj.cliCbFn && obj.cliCbFn(spanDom);
        },
        //逻辑-其它项点击-往上重置父级
        lg_bubbleResetFn:function(dom,hVal,type){
            var curCount = dom.parentNode.getAttribute('_count');
            var _parentDom = dom;
            for(var i=Number(curCount); i>=0; i--){
                _parentDom = _parentDom.parentNode;
                var _parentCount = _parentDom.getAttribute('_count');
                if( _parentCount==='1' || _parentCount===curCount) continue;//当项和二项跳出
                var curH = getComputedStyle(_parentDom,false)['height'];//获取样式的高度
                //首项高度重置
                var endH = type==='add'?
                hVal+Number(curH.slice(0,curH.indexOf('p')))
                    :
                Number(curH.slice(0,curH.indexOf('p')))-hVal;
                ss.mdfCss( _parentDom,['height',endH+'px'] );
                ss.mdfAttr(_parentDom,['curh',endH]);
                //对线条处理
                var curLineDom = _parentDom.querySelector('.txt').querySelector('._line');
                if(curLineDom && type==='add'){
                    var curH = getComputedStyle(curLineDom,false)['height'];//获取样式的高度
                    ss.mdfCss( curLineDom,['height',hVal+Number(curH.slice(0,curH.indexOf('p')))+'px'] );
                };
            }
        }
    };

    exports('userMenu',userMenu);
})



