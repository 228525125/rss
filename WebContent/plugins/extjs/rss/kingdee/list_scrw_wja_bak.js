/**
 * 生产任务单列表
 */
WjascrwListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_scrw_wja',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FStatus','FInterID','FBillNo','cpdm','cpmc','cpgg','cpph','jldw','jhsl','jhkgsj','jhwgsj','FType','xdrq','djrq','cpth','rksl'],
	  		remoteSort:true,
	  		baseParams:{pageSize:2000}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";
	 	
	 	this.task = new TaskSimpleListPanel({id:'scrw_task_simple',title:'工作排班表',iconCls:'pluginIcon'});
	 	this.scll = new ICStockSimpleListPanel({id:'scrw_scll_simple',title:'生产领料',iconCls:'pluginIcon'});
	 	this.sctl = new PPBOMSimpleListPanel({id:'scrw_sctl_simple',title:'生产投料',iconCls:'pluginIcon'});
	 	this.scbf = new ICItemScrapSimpleListPanel({id:'scrw_scbf_simple',title:'生产报废',iconCls:'pluginIcon'});
	 	this.cpjysqd = new CpjysqdSimpleListPanel({id:'scrw_cpjysqd_simple',title:'产品检验申请单',iconCls:'pluginIcon'});
	 	this.cpjyd = new CpjydSimpleListPanel({id:'scrw_cpjyd_simple',title:'产品检验单',iconCls:'pluginIcon'});
	 	this.cprk = new InStockSimpleListPanel({id:'scrw_cprk_simple',title:'产品入库',iconCls:'pluginIcon'});
	 	this.wwzc = new WwjySimpleListPanel({id:'scrw_wwzc_simple',title:'委外工序转出',iconCls:'pluginIcon'});
	 	this.wwjy = new WwjySimpleListPanel({id:'scrw_wwjy_simple',title:'委外工序检验',iconCls:'pluginIcon'});
	 	this.wwjs = new WwjsSimpleListPanel({id:'scrw_wwjs_simple',title:'委外工序接收',iconCls:'pluginIcon'});
		
	 	this.bottompanel = new Ext.TabPanel({                    	                        
            region: 'south',                        
            margins: '0 3 3 3',
            cmargins: '3 3 3 3',
            height: 220,                        
            collapsed: true,
            collapsible: true,
            activeTab: 0,
            autoDestroy:false,
            enableTabScroll:true,            
            defaults:{autoScroll:true},
            split: true,                     
            items: [
                this.task,
                this.sctl,
                this.scll,
                this.scbf,
                this.wwzc,
                this.wwjy,
                this.wwjs,
                this.cpjysqd,
                this.cpjyd,
                this.cprk
            ],
            listeners: {
            	'expand': {fn:function(p){  
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'scrw_task_simple'==p.getActiveTab().id){
	    				this.task.store.removeAll();                    		
	            		this.task.store.baseParams['query']=this.task.djbh;
	            		this.task.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'scrw_scll_simple'==p.getActiveTab().id){
	    				this.scll.store.removeAll();                    		
	            		this.scll.store.baseParams['query']=this.scll.djbh;
	            		this.scll.store.load();                            		
	    			}
	    			
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'scrw_sctl_simple'==p.getActiveTab().id){
	    				this.sctl.store.removeAll();                    		
	            		this.sctl.store.baseParams['query']=this.sctl.djbh;
	            		this.sctl.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'scrw_cprk_simple'==p.getActiveTab().id){
	    				this.cprk.store.removeAll();                    		
	            		this.cprk.store.baseParams['query']=this.cprk.djbh;
	            		this.cprk.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'scrw_cpjysqd_simple'==p.getActiveTab().id){
	    				this.cpjysqd.store.removeAll();                    		
	            		this.cpjysqd.store.baseParams['query']=this.cpjysqd.djbh;
	            		this.cpjysqd.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'scrw_cpjyd_simple'==p.getActiveTab().id){
	    				this.cpjyd.store.removeAll();                    		
	            		this.cpjyd.store.baseParams['query']=this.cpjyd.djbh;
	            		this.cpjyd.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'scrw_scbf_simple'==p.getActiveTab().id){
	    				this.scbf.store.removeAll();                    		
	            		this.scbf.store.baseParams['query']=this.scbf.djbh;
	            		this.scbf.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'scrw_wwzc_simple'==p.getActiveTab().id){
	    				this.wwzc.store.removeAll();                    		
	            		this.wwzc.store.baseParams['query']=this.wwzc.djbh;
	            		this.wwzc.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'scrw_wwjy_simple'==p.getActiveTab().id){
	    				this.wwjy.store.removeAll();                    		
	            		this.wwjy.store.baseParams['query']=this.wwjy.djbh;
	            		this.wwjy.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'scrw_wwjs_simple'==p.getActiveTab().id){
	    				this.wwjs.store.removeAll();                    		
	            		this.wwjs.store.baseParams['query']=this.wwjs.djbh;
	            		this.wwjs.store.load();                            		
	    			}
	    			
            	},scope:this},
            	'tabchange': {fn:function(tab,p){
            		p.store.removeAll();            		
            		if(''!=p.djbh){
            			p.store.baseParams['query']=p.djbh;
            			p.store.load();
            		}
            	},scope:this}
            }
        });
	 	
		this.queryfield = new Ext.app.SearchField({
            store: this.store,
            width:220,
            emptyText:'请输入关键字...',
            scope: this
        });
		
	    this.beginfield = new Ext.form.DateField({
        	xtype: 'datefield',			
			emptyText: '请选择...',
			format:'Y-m-d',
			name:'beg',
			value: new Date(),
			listeners:{
        		'change':{fn:function(t,valuenew,valueold){
        			this.store.baseParams['begin']=valuenew.format('Y-m-d');
        		},scope:this} 
        	}
		});
	    this.store.baseParams['begin']=this.beginfield.getValue().format('Y-m-d');
	    
	    this.endfield = new Ext.form.DateField({
			xtype: 'datefield',			
			emptyText: '请选择...',
			format:'Y-m-d',
			name:'end',
			value: new Date(),
			listeners:{
        		'change':{fn:function(t,valuenew,valueold){
					this.store.baseParams['end']=valuenew.format('Y-m-d');
        		},scope:this}
        	}
		});
	    this.store.baseParams['end']=this.endfield.getValue().format('Y-m-d');
	    
	    this.status = new Ext.form.ComboBox({	        
	        hiddenName:'style',
	        valueField:'id',
	        displayField:'mc',
	        value:'',
	        width:60,
	        allowBlank:false,
	        mode:'local',
	     	triggerAction:'all',
	        forceSelection:true,
	        editable:false,
	        store:new Ext.data.Store({     
	            data:[['','全部'],['0','计划'],['5','确认'],['1','下达'],['3','结案']], 
	            autoLoad: true,
	            reader:new Ext.data.ArrayReader({}, [
	                  {name: 'id'},
	                  {name: 'mc'} 
				])
	        }),
	        listeners:{
        		'change':{fn:function(t,valuenew,valueold){
					this.store.baseParams['status']=valuenew;
        		},scope:this}
        	}
	    });
	    this.store.baseParams['status']=this.status.getValue();
		
        this.items = [            
            {
                xtype: 'panel',
                region: 'center',
                layout: 'border',
                border: false,
                items: [
                    {
                        xtype: 'grid',
                        region: 'center',
                        margins: '3 3 3 3',
                        view: new Ext.ux.grid.LockingGridView(),
                        frame: false,
                        store: this.store,
                        loadMask: true,
                        tbar:['   ',{
        	            	text: '刷新',
        	            	handler: function(){
        	            		if(undefined!=this.store.baseParams['begin']&&undefined!=this.store.baseParams['end'])
        	            			this.store.load();
        	            		else
        	            			Ext.Msg.alert('提示','请选择时间段！');
        	            	},
        	            	scope: this
        	            },'-',{    
        	                text: '关联信息',            
        	                handler: function(){if(this.bottompanel.isVisible())this.bottompanel.collapse(true); else this.bottompanel.expand(true);},
        	                scope:this
        	            },'->','查找: ', ' ',
        		         this.queryfield],
                        bbar: new Ext.PagingToolbar({
            	            pageSize: pgSize,
            	            store: this.store,
            	            displayInfo: true,
            	            displayMsg: '共{2}条记录，当前第 {0}条 到 {1}条',
            	            emptyMsg: "没有找到记录"
            	        }),                       
                    	colModel: new Ext.ux.grid.LockingColumnModel([
                            new Ext.grid.RowNumberer(),
                            {
                                xtype: 'gridcolumn',
                                header: '单据编号',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'FBillNo'
                            },{
                                xtype: 'gridcolumn',
                                header: '单据日期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'djrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '单据状态',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'FStatus'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料代码',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpdm'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料名称',
                                sortable: true,
                                resizable: true,
                                width: 150,
                                dataIndex: 'cpmc'
                            },{
                                xtype: 'gridcolumn',
                                header: '规格',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '图号',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpth'
                            },{
                                xtype: 'gridcolumn',
                                header: '批号',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                hidden: true,
                                dataIndex: 'cpph'
                            },{
                                xtype: 'gridcolumn',
                                header: '单位',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                hidden: true,
                                dataIndex: 'jldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '计划数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'jhsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '入库数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'rksl'
                            },{
                                xtype: 'gridcolumn',
                                header: '开工时间',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'jhkgsj'
                            },{
                                xtype: 'gridcolumn',
                                header: '完工时间',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'jhwgsj',
                                renderer:function(value,metadata,record){
	                        			return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '生产类型',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'FType'
                            },{
                                xtype: 'gridcolumn',
                                header: '下达时间',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'xdrq'
                            }
                        ]),
                        listeners: {
                    		'cellclick': {fn:function(t,rowIndex,columnIndex,e){                    			
                    			this.task.djbh = this.store.getAt(rowIndex).get('FBillNo');
                    			if(this.bottompanel.isVisible()&&'scrw_task_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.task.store.removeAll();                    		
                            		this.task.store.baseParams['query']=this.task.djbh;
                            		this.task.store.load();                            		
                    			}
                    			
                    			this.scll.djbh = this.store.getAt(rowIndex).get('FBillNo');
                    			if(this.bottompanel.isVisible()&&'scrw_scll_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.scll.store.removeAll();                    		
                            		this.scll.store.baseParams['query']=this.scll.djbh;
                            		this.scll.store.load();                            		
                    			}
                    			
                    			this.sctl.djbh = this.store.getAt(rowIndex).get('FBillNo');
                    			if(this.bottompanel.isVisible()&&'scrw_sctl_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.sctl.store.removeAll();                    		
                            		this.sctl.store.baseParams['query']=this.sctl.djbh;
                            		this.sctl.store.load();                            		
                    			}
                    			
                    			this.cprk.djbh = this.store.getAt(rowIndex).get('FBillNo');
                    			if(this.bottompanel.isVisible()&&'scrw_cprk_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.cprk.store.removeAll();                    		
                            		this.cprk.store.baseParams['query']=this.cprk.djbh;
                            		this.cprk.store.load();                            		
                    			}
                    			
                    			this.cpjysqd.djbh = this.store.getAt(rowIndex).get('FBillNo');
		            			if(this.bottompanel.isVisible()&&'scrw_cpjysqd_simple'==this.bottompanel.getActiveTab().id){                    				
		            				this.cpjysqd.store.removeAll();                    		
		                    		this.cpjysqd.store.baseParams['query']=this.cpjysqd.djbh;
		                    		this.cpjysqd.store.load();                            		
		            			}
		            			
		            			this.cpjyd.djbh = this.store.getAt(rowIndex).get('FBillNo');
		            			if(this.bottompanel.isVisible()&&'scrw_cpjyd_simple'==this.bottompanel.getActiveTab().id){                    				
		            				this.cpjyd.store.removeAll();                    		
		                    		this.cpjyd.store.baseParams['query']=this.cpjyd.djbh;
		                    		this.cpjyd.store.load();                            		
		            			}
                    			
                    			this.scbf.djbh = this.store.getAt(rowIndex).get('FBillNo');
                    			if(this.bottompanel.isVisible()&&'scrw_scbf_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.scbf.store.removeAll();                    		
                            		this.scbf.store.baseParams['query']=this.scbf.djbh;
                            		this.scbf.store.load();                            		
                    			}
                    			
                    			this.wwzc.djbh = this.store.getAt(rowIndex).get('FBillNo');
                    			if(this.bottompanel.isVisible()&&'scrw_wwzc_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.wwzc.store.removeAll();                    		
                            		this.wwzc.store.baseParams['query']=this.wwzc.djbh;
                            		this.wwzc.store.load();                            		
                    			}
                    			
                    			this.wwjy.djbh = this.store.getAt(rowIndex).get('FBillNo');
                    			if(this.bottompanel.isVisible()&&'scrw_wwjy_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.wwjy.store.removeAll();                    		
                            		this.wwjy.store.baseParams['query']=this.wwjy.djbh;
                            		this.wwjy.store.load();                            		
                    			}
                    			
                    			this.wwjs.djbh = this.store.getAt(rowIndex).get('FBillNo');
                    			if(this.bottompanel.isVisible()&&'scrw_wwjs_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.wwjs.store.removeAll();                    		
                            		this.wwjs.store.baseParams['query']=this.wwjs.djbh;
                            		this.wwjs.store.load();                            		
                    			}
                    		},scope:this}
                    	}
                    },
                    this.bottompanel
                ]
            }
        ];
        WjascrwListPanel.superclass.initComponent.call(this);
    }
});
