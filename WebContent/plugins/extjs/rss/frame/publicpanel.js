PublicPanel=Ext.extend(Ext.Viewport,{
	id:'publicpanle',
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
		PublicPanel.superclass.initComponent.call(this);		
		
		var tools = [{
	        id:'gear',
	        handler: function(){
				var panel = Ext.getCmp('daibanshiyipanel');				
	            var win = new LoginWindow({dbsy:panel});
	            win.show();
	        },
	        scope: this
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
            defaults:{autoScroll:true},
            items:[
               //{id:'gonggaolan',title:'首页',html:'<center><IFRAME ID=Q1 WIDTH=780 HEIGHT=600 FRAMEBORDER=0 SCROLLING=NO SRC="frame.do?cmd=home"/></center>'}
               {
		            xtype:'portal',
		            region:'center',
		            title:'首页',
		            margins:'35 5 5 0',
		            items:[{
		                columnWidth:.7,
		                layout: 'form',		                
		                style:'padding:10px 10px 10px 20px',
		                items:[{
		                	xtype:'tabpanel',
		                	activeTab: 0,
		                	bodyStyle:'padding:0px',
		                    autoDestroy:false,
		                    enableTabScroll:true,
		                    defaults:{autoScroll:false},
		                    height:215,
		                    items:[{
			                    title: '采购看板',
			                    layout:'fit',			                    
			                    height:215,			                     
			                    html: '<center><IFRAME ID=Q1 WIDTH=780 HEIGHT=600 FRAMEBORDER=0 SCROLLING=NO SRC="kingdee.do?cmd=caigou"/></center>'		                    
			                },{
		                    	title: '质量看板',
			                    layout:'fit',			                    
			                    height:215,
			                    html: '<center><IFRAME ID=Q1 WIDTH=780 HEIGHT=600 FRAMEBORDER=0 SCROLLING=NO SRC="kingdee.do?cmd=pinzhi"/></center>'
		                    },{
			                    title: '生产看板',
			                    layout:'fit',			                    
			                    height:215,			                   
			                    html:'<center><IFRAME ID=Q1 WIDTH=780 HEIGHT=600 FRAMEBORDER=0 SCROLLING=NO SRC="kingdee.do?cmd=zhizao"/></center>'		                    
			                }]		                    
		                },{
		                	xtype:'panel',
		                	border: false,
		                	height:20
		                },{
		                	xtype:'tabpanel',
		                	activeTab: 0,		                	
		                	bodyStyle:'padding:0px',
		                    autoDestroy:false,
		                    enableTabScroll:true,
		                    defaults:{autoScroll:false},		                   
		                    height:265,
		                    items:[{
			                    title: '销售看板',
			                    layout:'fit',			                    
			                    height:170,			                     
			                    html: '<center><IFRAME ID=Q1 WIDTH=780 HEIGHT=600 FRAMEBORDER=0 SCROLLING=NO SRC="kingdee.do?cmd=xiaoshou"/></center>'		                    
			                },new SellOrderPortalListPanel()/*,new XsckColumnChartPanel(),new XsckPieChartPanel()*/]		                    
		                }/*,{
		                	xtype:'panel',
		                	border: false,
		                	height:20
		                },{
		                	xtype:'tabpanel',
		                	activeTab: 0,		                	
		                	bodyStyle:'padding:0px',
		                    autoDestroy:false,
		                    enableTabScroll:true,
		                    defaults:{autoScroll:false},		                   
		                    height:280,
		                    items:[new WorkPlanPortalListPanel()]
		                }*/]
		            },{
		                columnWidth:.3,
		                style:'padding:10px 20px 10px 10px',
		                items:[{
		                	id: 'daibanshiyipanel',
		                    title: '待办事宜',
		                    tools: tools,
		                    height: 400,
		                    html:'<center><IFRAME ID=Q11 WIDTH=600 HEIGHT=600 FRAMEBORDER=0 SCROLLING=NO SRC="kingdee.do?cmd=task"/></center>'
		                }]
		            }]
		        }
            ],
            listeners:{
        		'remove':function(tabsThis,c){
            		c.hide();
        		}
        	}
        });               
		
		//----------------------------------tools end--------------------------
        
		this.xsdjwh = new Ext.tree.TreeNode({
			id:'xsdjwh',
			iconCls:'applicationIcon',
			text:'单据维护'
		});
		
		this.xsddwh = new Ext.tree.TreeNode({
			id:'xsddwh',
			iconCls:'gridIcon',
			text:'销售订单维护'
		});
		this.xsddwh.module = new SellOrderListPanel({id:'list_xsdd',title:'销售订单维护',iconCls:'gridIcon'});
		this.xsddwh.addListener('click',this.activateTab,this);	
		this.xsdjwh.appendChild(this.xsddwh);
		
		this.fhtzwh = new Ext.tree.TreeNode({
			id:'fhtzwh',
			iconCls:'gridIcon',
			text:'发货通知维护'
		});
		this.fhtzwh.module = new SellOutListPanel({id:'list_fhtz',title:'发货通知维护',iconCls:'gridIcon'});
		this.fhtzwh.addListener('click',this.activateTab,this);	
		this.xsdjwh.appendChild(this.fhtzwh);
		
		this.xsckwh = new Ext.tree.TreeNode({
			id:'xsckwh',
			iconCls:'gridIcon',
			text:'销售出库维护'
		});
		this.xsckwh.module = new SellStockBillListPanel({id:'list_xsck',title:'销售出库维护',iconCls:'gridIcon'});
		this.xsckwh.addListener('click',this.activateTab,this);	
		this.xsdjwh.appendChild(this.xsckwh);
		
		this.xsfpwh = new Ext.tree.TreeNode({
			id:'xsfpwh',
			iconCls:'gridIcon',
			text:'销售发票维护'
		});
		this.xsfpwh.module = new SellSaleListPanel({id:'list_xsfp',title:'销售发票维护',iconCls:'gridIcon'});
		this.xsfpwh.addListener('click',this.activateTab,this);	
		this.xsdjwh.appendChild(this.xsfpwh);
		
		this.xsjgwh = new Ext.tree.TreeNode({
			id:'xsjgwh',
			iconCls:'gridIcon',
			text:'销售单价维护'
		});
		this.xsjgwh.module = new SellSaleDiffListPanel({id:'list_xsjg',title:'销售单价维护',iconCls:'gridIcon'});
		this.xsjgwh.addListener('click',this.activateTab,this);	
		this.xsdjwh.appendChild(this.xsjgwh);
				
		this.xsddtj = new Ext.tree.TreeNode({
			id:'report_xsdd',
			iconCls:'applicationIcon',
			text:'销售统计报表'
		});
		
		this.xsddhztj = new Ext.tree.TreeNode({
			id:'xsddhztj',
			iconCls:'gridIcon',
			text:'销售订单汇总统计'
		});
		this.xsddhztj.module = new SellOrderAnalyzePanel({id:'report_xsddhztj',title:'销售订单汇总统计',iconCls:'gridIcon'});
		this.xsddhztj.addListener('click',this.activateTab,this);	
		this.xsddtj.appendChild(this.xsddhztj);
		
		this.xsckhztj = new Ext.tree.TreeNode({
			id:'xsckhztj',
			iconCls:'gridIcon',
			text:'销售出库汇总统计'
		});
		this.xsckhztj.module = new XsckhztjReportPanel({id:'report_xsckhztj',title:'销售出库汇总统计',iconCls:'gridIcon'});
		this.xsckhztj.addListener('click',this.activateTab,this);	
		this.xsddtj.appendChild(this.xsckhztj);
		
		this.xsfphztj = new Ext.tree.TreeNode({
			id:'xsfphztj',
			iconCls:'gridIcon',
			text:'销售发票汇总统计'
		});
		this.xsfphztj.module = new XsfphztjReportPanel({id:'report_xsfphztj',title:'销售发票汇总统计',iconCls:'gridIcon'});
		this.xsfphztj.addListener('click',this.activateTab,this);	
		this.xsddtj.appendChild(this.xsfphztj);
		
		this.kpywkptj = new Ext.tree.TreeNode({
			id:'kpywkptj',
			iconCls:'gridIcon',
			text:'开票与未开票统计'
		});
		this.kpywkptj.module = new XswkpListPanel({id:'list_xswkp',title:'开票与未开票',iconCls:'gridIcon'});
		this.kpywkptj.addListener('click',this.activateTab,this);	
		this.xsddtj.appendChild(this.kpywkptj);
		
		this.scdjwh = new Ext.tree.TreeNode({
			id:'scdjwh',
			iconCls:'applicationIcon',
			text:'单据维护'
		});
		
		this.scrwwh = new Ext.tree.TreeNode({
			id:'scrwwh',
			iconCls:'gridIcon',
			text:'生产任务单维护'
		});
		this.scrwwh.module = new WorkPlanListPanel({id:'list_scrw',title:'生产任务单维护',iconCls:'gridIcon'});
		this.scrwwh.addListener('click',this.activateTab,this);	
		this.scdjwh.appendChild(this.scrwwh);
		
		this.wwzcwh = new Ext.tree.TreeNode({
			id:'wwzcwh',
			iconCls:'gridIcon',
			text:'委外工序转出单维护'
		});
		this.wwzcwh.module = new WwzcListPanel({id:'list_wwzc',title:'委外工序转出单维护',iconCls:'gridIcon'});
		this.wwzcwh.addListener('click',this.activateTab,this);	
		this.scdjwh.appendChild(this.wwzcwh);
		
		this.wwjysqdwh = new Ext.tree.TreeNode({
			id:'wwjysqdwh',
			iconCls:'gridIcon',
			text:'委外工序检验申请单维护'
		});
		this.wwjysqdwh.module = new WwjysqdListPanel({id:'list_wwjysqd',title:'委外工序检验申请单维护',iconCls:'gridIcon'});
		this.wwjysqdwh.addListener('click',this.activateTab,this);	
		this.scdjwh.appendChild(this.wwjysqdwh);
		
		this.wwjswh = new Ext.tree.TreeNode({
			id:'wwjswh',
			iconCls:'gridIcon',
			text:'委外工序接收单维护'
		});
		this.wwjswh.module = new WwjsListPanel({id:'list_wwjs',title:'委外工序接收单维护',iconCls:'gridIcon'});
		this.wwjswh.addListener('click',this.activateTab,this);	
		this.scdjwh.appendChild(this.wwjswh);
		
		this.task = new Ext.tree.TreeNode({
			id:'task',
			iconCls:'applicationIcon',
			text:'排产计划'
		});
		
		this.lsxwh = new Ext.tree.TreeNode({
			id:'lsxwh',
			iconCls:'gridIcon',
			text:'流水线维护'
		});
		this.lsxwh.module = new EquipmentPanel({id:'EquipmentPanel',title:'流水线维护',iconCls:'gridIcon'});
		this.lsxwh.addListener('click',this.activateTab,this);	
		this.task.appendChild(this.lsxwh);
		
		this.gzpbb = new Ext.tree.TreeNode({
			id:'scrwwh',
			iconCls:'gridIcon',
			text:'工作排班表'
		});
		this.gzpbb.module = new TaskPlanListPanel({id:'list_task',title:'工作排班表',iconCls:'gridIcon'});
		this.gzpbb.addListener('click',this.activateTab,this);	
		this.task.appendChild(this.gzpbb);
		
		this.aqkc = new Ext.tree.TreeNode({
			id:'aqkc',
			iconCls:'applicationIcon',
			text:'安全库存'
		});
		
		this.aqkcwh = new Ext.tree.TreeNode({
			id:'aqkcwh',
			iconCls:'gridIcon',
			text:'安全库存维护'
		});
		this.aqkcwh.module = new SecStockListPanel({id:'list_aqkcwh',title:'安全库存维护',iconCls:'gridIcon'});
		this.aqkcwh.addListener('click',this.activateTab,this);	
		this.aqkc.appendChild(this.aqkcwh);
		
		this.scbb = new Ext.tree.TreeNode({
			id:'scbb',
			iconCls:'applicationIcon',
			text:'统计报表'
		});
		
		this.scxh = new Ext.tree.TreeNode({
			id:'scxh',
			iconCls:'gridIcon',
			text:'生产消耗报表'
		});
		//this.scxh.module = new WorkConsumeReportPanel({id:'report_scxh',title:'生产消耗报表',iconCls:'gridIcon'});
		this.scxh.module = new ScxhhzReportPanel({id:'report_scxh',title:'生产消耗报表',iconCls:'gridIcon'});
		this.scxh.addListener('click',this.activateTab,this);	
		this.scbb.appendChild(this.scxh);
		
		this.wwgxzxgzb = new Ext.tree.TreeNode({
			id:'wwgxzxgzb',
			iconCls:'gridIcon',
			text:'委外工序执行跟踪表'
		});
		this.wwgxzxgzb.module = new WwgxzxgzbReportPanel({id:'report_wwgxzxgzb',title:'委外工序执行跟踪表',iconCls:'gridIcon'});
		this.wwgxzxgzb.addListener('click',this.activateTab,this);	
		this.scbb.appendChild(this.wwgxzxgzb);
		
		/*this.sczzp = new Ext.tree.TreeNode({
			id:'sczzp',
			iconCls:'gridIcon',
			text:'生产月报表'
		});
		this.sczzp.module = new SczzpReportPanel({id:'report_sczzp',title:'生产月报表',iconCls:'gridIcon'});
		this.sczzp.addListener('click',this.activateTab,this);
		this.scbb.appendChild(this.sczzp);*/
		
		this.scwlxh = new Ext.tree.TreeNode({
			id:'scwlxh',
			iconCls:'gridIcon',
			text:'生产任务单维护（消耗）'
		});
		this.scwlxh.module = new ScrwWlxhListPanel({id:'list_scrw_wlxh',title:'生产任务单维护（消耗）',iconCls:'gridIcon'});
		this.scwlxh.addListener('click',this.activateTab,this);
		this.scbb.appendChild(this.scwlxh);
		
		this.thcxxt = new Ext.tree.TreeNode({
			id:'thcxxt',
			iconCls:'applicationIcon',
			text:'图号查询系统'
		});
		
		this.thcx = new Ext.tree.TreeNode({
			id:'thcx',
			iconCls:'gridIcon',
			text:'图号查询'
		});
		this.thcx.module = new ThcxListPanel({id:'list_thcx',title:'图号查询',iconCls:'gridIcon'});
		this.thcx.addListener('click',this.activateTab,this);	
		this.thcxxt.appendChild(this.thcx);
		
		this.cgdjwh = new Ext.tree.TreeNode({
			id:'cgdjwh',
			iconCls:'applicationIcon',
			text:'单据维护'
		});
		
		this.cgsqwh = new Ext.tree.TreeNode({
			id:'cgsqwh',
			iconCls:'gridIcon',
			text:'采购申请维护'
		});
		this.cgsqwh.module = new POrequestListPanel({id:'list_cgsq',title:'采购申请维护',iconCls:'gridIcon'});
		this.cgsqwh.addListener('click',this.activateTab,this);	
		this.cgdjwh.appendChild(this.cgsqwh);
		
		this.cgddwh = new Ext.tree.TreeNode({
			id:'cgddwh',
			iconCls:'gridIcon',
			text:'采购订单维护'
		});
		this.cgddwh.module = new POOrderListPanel({id:'list_cgdd',title:'采购订单维护',iconCls:'gridIcon'});
		this.cgddwh.addListener('click',this.activateTab,this);	
		this.cgdjwh.appendChild(this.cgddwh);

		this.shdwh = new Ext.tree.TreeNode({
			id:'shdwh',
			iconCls:'gridIcon',
			text:'收货单维护'
		});
		this.shdwh.module = new ShdListPanel({id:'list_shd',title:'收货单维护',iconCls:'gridIcon'});
		this.shdwh.addListener('click',this.activateTab,this);	
		this.cgdjwh.appendChild(this.shdwh);
		
		this.lljysqdwh = new Ext.tree.TreeNode({
			id:'lljydqdwh',
			iconCls:'gridIcon',
			text:'来料检验申请单维护'
		});
		this.lljysqdwh.module = new POInstockListPanel({id:'list_lljysqd',title:'来料检验申请单维护',iconCls:'gridIcon'});
		this.lljysqdwh.addListener('click',this.activateTab,this);	
		this.cgdjwh.appendChild(this.lljysqdwh);
		
		this.lljydwh = new Ext.tree.TreeNode({
			id:'lljydwh',
			iconCls:'gridIcon',
			text:'来料检验单维护'
		});
		this.lljydwh.module = new ICQCBillListPanel({id:'list_lljyd',title:'来料检验单维护',iconCls:'gridIcon'});
		this.lljydwh.addListener('click',this.activateTab,this);	
		this.cgdjwh.appendChild(this.lljydwh);
		
		this.wgrkwh = new Ext.tree.TreeNode({
			id:'wgrkwh',
			iconCls:'gridIcon',
			text:'外购入库维护'
		});
		this.wgrkwh.module = new WgrkListPanel({id:'list_wgrk',title:'外购入库维护',iconCls:'gridIcon'});
		this.wgrkwh.addListener('click',this.activateTab,this);	
		this.cgdjwh.appendChild(this.wgrkwh);
		
		this.stjgrkwh = new Ext.tree.TreeNode({
			id:'stjgrkwh',
			iconCls:'gridIcon',
			text:'受托加工入库维护'
		});
		this.stjgrkwh.module = new StjgrkListPanel({id:'list_stjgrk',title:'受托加工入库维护',iconCls:'gridIcon'});
		this.stjgrkwh.addListener('click',this.activateTab,this);	
		this.cgdjwh.appendChild(this.stjgrkwh);
		
		this.cgtj = new Ext.tree.TreeNode({
			id:'report_cg',
			iconCls:'applicationIcon',
			text:'采购统计报表'
		});
		
		this.cgwkp = new Ext.tree.TreeNode({
			id:'cgwkp',
			iconCls:'gridIcon',
			text:'外购未开票统计'
		});
		this.cgwkp.module = new CgwkpListPanel({id:'list_cgwkp',title:'外购未开票统计',iconCls:'gridIcon'});
		this.cgwkp.addListener('click',this.activateTab,this);	
		this.cgtj.appendChild(this.cgwkp);
		
		this.zldjwh = new Ext.tree.TreeNode({
			id:'zldjwh',
			iconCls:'gridIcon',
			text:'单据维护'
		});
		
		this.lljysqdwh2 = new Ext.tree.TreeNode({
			id:'lljydqdwh',
			iconCls:'gridIcon',
			text:'来料检验申请单维护'
		});
		this.lljysqdwh2.module = this.lljysqdwh.module;
		this.lljysqdwh2.addListener('click',this.activateTab,this);		
		this.zldjwh.appendChild(this.lljysqdwh2);
		
		this.lljydwh2 = new Ext.tree.TreeNode({
			id:'lljydwh',
			iconCls:'gridIcon',
			text:'来料检验单维护'
		});
		this.lljydwh2.module = this.lljydwh.module;
		this.lljydwh2.addListener('click',this.activateTab,this);
		this.zldjwh.appendChild(this.lljydwh2);
		
		this.cpjysqdwh = new Ext.tree.TreeNode({
			id:'cpjysqdwh',
			iconCls:'gridIcon',
			text:'产品检验申请单维护'
		});
		this.cpjysqdwh.module = new CpjysqdListPanel({id:'list_cpjysqd',title:'产品检验申请单维护',iconCls:'gridIcon'});
		this.cpjysqdwh.addListener('click',this.activateTab,this);	
		this.zldjwh.appendChild(this.cpjysqdwh);
		
		this.cpjydwh = new Ext.tree.TreeNode({
			id:'cpjydwh',
			iconCls:'gridIcon',
			text:'产品检验单维护'
		});
		this.cpjydwh.module = new CpjydListPanel({id:'list_cpjyd',title:'产品检验单维护',iconCls:'gridIcon'});
		this.cpjydwh.addListener('click',this.activateTab,this);	
		this.zldjwh.appendChild(this.cpjydwh);
		
		this.wwjywh = new Ext.tree.TreeNode({
			id:'wwjywh',
			iconCls:'gridIcon',
			text:'委外工序检验单维护'
		});
		this.wwjywh.module = new WwjyListPanel({id:'list_wwjy',title:'委外工序检验单维护',iconCls:'gridIcon'});
		this.wwjywh.addListener('click',this.activateTab,this);	
		this.zldjwh.appendChild(this.wwjywh);
		
		this.fhtzwh1 = new Ext.tree.TreeNode({
			id:'fhtzwh1',
			iconCls:'gridIcon',
			text:'发货计划'
		});
		this.fhtzwh1.module = new SellOutListPanel({id:'list_fhtz1',title:'发货计划',iconCls:'gridIcon'});
		this.fhtzwh1.addListener('click',this.activateTab,this);	
		this.zldjwh.appendChild(this.fhtzwh1);
		
		this.hgzgl = new Ext.tree.TreeNode({
			id:'hgzgl',
			iconCls:'gridIcon',
			text:'合格证管理'
		});
		
		this.hgz = new Ext.tree.TreeNode({
			id:'hgz',
			iconCls:'gridIcon',
			text:'合格证'
		});
		this.hgz.module = new Ext.Panel({id:'hgz',title:'合格证',closable: true,iconCls:'gridIcon',html:'<center><IFRAME ID=Q1 WIDTH=600 HEIGHT=600 FRAMEBORDER=0 SCROLLING=NO SRC="tools.do?cmd=cocmain"/></center>'});
		this.hgz.addListener('click',this.activateTab,this);	
		this.hgzgl.appendChild(this.hgz);
		
		this.cctj = new Ext.tree.TreeNode({
			id:'cctj',
			iconCls:'gridIcon',
			text:'仓储统计帐表'
		});
		
		this.jcwz = new Ext.tree.TreeNode({
			id:'jcwz',
			iconCls:'gridIcon',
			text:'借出物资'
		});
		this.jcwz.module = new JcwzListPanel({id:'list_jcwz',title:'借出物资台帐',iconCls:'gridIcon'});
		this.jcwz.addListener('click',this.activateTab,this);	
		this.cctj.appendChild(this.jcwz);
		
		this.jskc_lhbz = new Ext.tree.TreeNode({
			id:'jskc_lhbz',
			iconCls:'gridIcon',
			text:'及时库存'
		});
		this.jskc_lhbz.module = new JskcLhbzListPanel({id:'list_jskc_lhbz',title:'及时库存',iconCls:'gridIcon'});
		this.jskc_lhbz.addListener('click',this.activateTab,this);	
		this.cctj.appendChild(this.jskc_lhbz);
		
		this.jszl = new Ext.tree.TreeNode({
			id:'jszl',
			iconCls:'applicationIcon',
			text:'技术资料'
		});
		
		this.wdcx = new Ext.tree.TreeNode({
			id:'wdcx',
			iconCls:'gridIcon',
			text:'文档查询'
		});
		this.wdcx.module = new Ext.Panel({title:'文档查询',iconCls:'gridIcon',html:'http://192.168.1.200:8080/emr/employee.do?cmd=search'});
		this.wdcx.addListener('click',this.activateTab,this);	
		this.jszl.appendChild(this.wdcx);
		
		
		
		this.xsddwhtree = new Ext.tree.TreePanel({
			root:this.xsdjwh,
			border:false
		});
		
		this.xsddtjtree = new Ext.tree.TreePanel({
			root:this.xsddtj,
			border:false
		});
		
		this.scrwwhtree = new Ext.tree.TreePanel({
			root:this.scdjwh,
			border:false
		});
		
		this.taskhtree = new Ext.tree.TreePanel({
			root:this.task,
			border:false
		});
		
		this.aqkctree = new Ext.tree.TreePanel({
			root:this.aqkc,
			border:false
		});
		
		this.scbbtree = new Ext.tree.TreePanel({
			root:this.scbb,
			border:false
		});
		
		this.thcxxttree = new Ext.tree.TreePanel({
			root:this.thcxxt,
			border:false
		});
		
		this.cgdjwhtree = new Ext.tree.TreePanel({
			root:this.cgdjwh,
			border:false
		});
		
		this.cgtjtree = new Ext.tree.TreePanel({
			root:this.cgtj,
			border:false
		});
		
		this.zldjwhtree = new Ext.tree.TreePanel({
			root:this.zldjwh,
			border:false
		}); 
		
		this.pzhgzgltree = new Ext.tree.TreePanel({
			root:this.hgzgl,
			border:false
		});
		
		this.cctjtree = new Ext.tree.TreePanel({
			root:this.cctj,
			border:false
		});
		
		this.jszltree = new Ext.tree.TreePanel({
			root:this.jszl,
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
                    this.xsddwhtree,
                    this.xsddtjtree
                ],
                iconCls:'usersIcon'
            },{
                title:'生产',
                border:false,
                items:[
                    this.scrwwhtree,
                    this.taskhtree,
                    this.aqkctree,
                    this.scbbtree,
                    this.thcxxttree
                ],
                iconCls:'cogIcon'
            },{
                title:'采购',
                border:false,
                items:[
                    this.cgdjwhtree,      
                    this.cgtjtree
                ],
                iconCls:'gearsIcon'
            },{
                title:'品质',
                border:false,
                items:[
                    this.zldjwhtree,
                    this.pzhgzgltree                    
                ],
                iconCls:'exampleIcon'
            },{
                title:'仓储',
                border:false,
                items:[
                    this.cctjtree                    
                ],
                iconCls:'bookopenIcon'
            },{
                title:'技术',
                border:false,
                items:[
                    this.jszltree                    
                ],
                iconCls:'docsIcon'
            }]
		});
		
		var logo = new Ext.BoxComponent({
            region:'north',
            el: 'logo',
            height:22
        });
		
		this.add(logo);
		this.add(this.menu);
        this.add(this.tabs);        
	}
});