FramePanel=Ext.extend(Ext.Viewport,{
	id:'framepanle',
	layout:"border",
	enableTabScroll:true,
	activateTab:function(nodeThis,e){
		if(!this.tabs){
			this.tabs=new Ext.TabPanel({
	            region: 'center',
	            margins:'3 3 3 0', 
	            activeTab: 0,
	            defaults:{autoScroll:true}
        	});
		}
		var tab = this.tabs.getItem(nodeThis.id+'panel');
		if(tab){
			this.tabs.activate(tab);
		}
		else{
			this.tabs.add(nodeThis.module).show();
			/*if(nodeThis.module.store)
				nodeThis.module.store.load();*/
		}
	},
	showNodeModule:function(nodeThis,e){
		if(nodeThis.module){
			if(!nodeThis.module.isVisible())
				nodeThis.module.show();
		}
	},
	initComponent : function(){		
		FramePanel.superclass.initComponent.call(this);		
		
		var tools = [{
	        id:'gear',
	        handler: function(){
	            Ext.Msg.alert('Message', 'The Settings tool was clicked.');
	        }
	    },{
	        id:'close',
	        handler: function(e, target, panel){
	            panel.ownerCt.remove(panel, true);
	        }
	    }];
		
        this.tabs=new Ext.TabPanel({
            region: 'center',
            margins:'3 3 3 0', 
            activeTab: 0,
            autoDestroy:false,
            enableTabScroll:true,
            //plain:true,
            defaults:{autoScroll:true},

            items:[
               {id:'gonggaolan',title:'首页',html:'<center><IFRAME ID=Q1 WIDTH=780 HEIGHT=600 FRAMEBORDER=0 SCROLLING=NO SRC="frame.do?cmd=home"/></center>'}
               /*{
		            xtype:'portal',
		            region:'center',
		            title:'我的工作台',
		            margins:'35 5 5 0',
		            items:[{
		                columnWidth:.33,
		                style:'padding:10px 0 10px 10px',
		                items:[{
		                    title: '今日事务',
		                    layout:'fit',
		                    tools: tools,
		                    //autoLoad:'frame.do?cmd=home'
		                    html:'2010-05-25<br>今日事;<br>今日毕'
		                },{
		                    title: '书面审查',
		                    tools: tools,
		                    autoLoad:'frame.do?cmd=home'
		                }]
		            },{
		                columnWidth:.33,
		                style:'padding:10px 0 10px 10px',
		                items:[{
		                    title: '举报',
		                    tools: tools,
		                    autoLoad:'frame.do?cmd=home'
		                },{
		                    title: '日常巡察',
		                    tools: tools,
		                    autoLoad:'frame.do?cmd=home'
		                }]
		            },{
		                columnWidth:.33,
		                style:'padding:10px',
		                items:[{
		                    title: '投诉',
		                    tools: tools,
		                    autoLoad:'frame.do?cmd=home'
		                },{
		                    title: '我的邮箱',
		                    tools: tools,		                    
		                    autoLoad:'frame.do?cmd=home'
		                }]
		            }]
		        }*/
            ],
            listeners:{
        		'remove':function(tabsThis,c){
            		c.hide();
        		}
        	}
        });               
		
		//----------------------------------tools end---------------------------		
		
		this.user = new Ext.tree.TreeNode({
			id:'user',
			iconCls:'pluginIcon',
			text:'帐户管理'
		});
		this.user.module = new UserPanel({id:'userpanel',title:'帐户管理',iconCls:'pluginIcon'});
		this.user.addListener('click',this.activateTab,this);	
		
		this.workplan = new Ext.tree.TreeNode({
			id:'workplan',
			iconCls:'pluginIcon',
			text:'事务管理'
		});
		this.workplan.module = new WorkPlanPanel({id:'workplanpanel',title:'事务管理',iconCls:'pluginIcon'});
		this.workplan.addListener('click',this.activateTab,this);
		
		this.usertree = new Ext.tree.TreePanel({
			root:this.user,
			border:false
		});
		
		this.workplantree = new Ext.tree.TreePanel({
			root:this.workplan,
			border:false
		});
		
		this.xsddtj = new Ext.tree.TreeNode({
			id:'xsddtj',
			iconCls:'pluginIcon',
			text:'销售订单统计'
		});
		
		this.xsddhztj = new Ext.tree.TreeNode({
			id:'xsddhztj',
			iconCls:'pluginIcon',
			text:'销售订单汇总统计'
		});
		this.xsddhztj.module = new SellOrderAnalyzePanel({id:'report_xsddhztj',title:'销售订单汇总统计',iconCls:'pluginIcon'});
		this.xsddhztj.addListener('click',this.activateTab,this);	
		this.xsddtj.appendChild(this.xsddhztj);
		
		this.selltree = new Ext.tree.TreePanel({
			root:this.xsddtj,
			border:false
		});
		
		this.menu = new Ext.Panel({
			region:'west',
            id:'west-panel',
            title:'功能菜单',
            split:true,
            width: 200,           
            minSize: 175,
            maxSize: 400,
            collapsible: true,
            margins:'0 0 0 5',
            layout:'accordion',
            layoutConfig:{
                animate:true
            },
            items: [{
                title:'销售',
                border:false,
                items:[
                    this.selltree
                ],
                iconCls:'pluginIcon'
            },{
                title:'后台管理',
                border:false,
                items:[
                    this.usertree,
                    this.workplantree                    
                ],
                iconCls:'exampleIcon'
            }/*,{
                title:'实用工具',
                items:[
					gj_jishiben,
					gj_jisuanqi,
					gj_cidian,
					gj_ditu,
					gj_ipchaxun,
					gj_wannianli
                ],
                border:false,
                iconCls:'toolsIcon'
            },{
                title:'系统设置',
                border:false,
                items:[
                    this.glossarytree,
                    this.districttree,
                    this.monitortree,
                    this.departmenttree
                ],
                iconCls:'cogIcon'
            }/*,{
            	title:'模板管理',
            	border:false,
            	items:[
            	       
            	],
            	iconCls:'cmpIcon'
            },{
            	title:'演示及帮助',
            	items:[

            	],
            	border:false,
            	iconCls:'docsIcon'
            }*/]
		});
		
		var logo = new Ext.BoxComponent({
            region:'north',
            el: 'logo',
            height:35
        });

		this.add(logo);
		this.add(this.menu);
        this.add(this.tabs);        
	}
});