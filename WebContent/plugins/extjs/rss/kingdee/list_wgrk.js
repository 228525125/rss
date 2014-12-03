/**
 * 外购入库单列表
 */
WgrkListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
  	autoScroll:true,
  	closable: true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_wgrk',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FCheck','FCloseStatus','hywgb','FInterID','FBillNo','FCancellation','FSourceBillNo','FOrderInterID','FOrderEntryID','FDate','cpdm','cpmc','cpgg','jldw','fssl','wlph'],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";	
	 	
	 	this.cgdd = new POOrderSimpleListPanel({id:'wgrk_cgdd_simple',title:'采购订单',iconCls:'pluginIcon'});
	 	this.lljysqd = new POInstockSimpleListPanel({id:'wgrk_lljysqd_simple',title:'来料检验申请',iconCls:'pluginIcon'});
	 	this.shd = new ShdSimpleListPanel({id:'wgrk_shd_simple',title:'收货单',iconCls:'pluginIcon'});
	 	this.lljyd = new ICQCBillSimpleListPanel({id:'wgrk_lljyd_simple',title:'来料检验单',iconCls:'pluginIcon'});
	 	
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
                this.cgdd,
                this.lljysqd,
                this.shd,
                this.lljyd
            ],
            listeners: {
            	'expand': {fn:function(p){  
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'wgrk_cgdd_simple'==p.getActiveTab().id){
	    				this.cgdd.store.removeAll();                    		
	            		this.cgdd.store.baseParams['query']=this.cgdd.djbh;
	            		this.cgdd.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'wgrk_lljysqd_simple'==p.getActiveTab().id){
	    				this.lljysqd.store.removeAll();                    		
	            		this.lljysqd.store.baseParams['query']=this.lljysqd.djbh;
	            		this.lljysqd.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'wgrk_shd_simple'==p.getActiveTab().id){
	    				this.shd.store.removeAll();                    		
	            		this.shd.store.baseParams['query']=this.shd.djbh;
	            		this.shd.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'wgrk_lljyd_simple'==p.getActiveTab().id){
	    				this.lljyd.store.removeAll();                    		
	            		this.lljyd.store.baseParams['query']=this.lljyd.djbh;
	            		this.lljyd.store.load();                            		
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
	            data:[['','全部'],['0','未审核'],['1','已审核']], 
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
        	            	text: '重置',
        	            	handler: function(){
        	            		this.beginfield.setValue('');
        	            		this.endfield.setValue('');
        	            		this.queryfield.setValue('');
        	            		this.store.baseParams = {};
        	            		this.store.baseParams['pageSize']=pgSize;
        	            	},
        	            	scope: this
        	            },'-',{    
        	                text: '关联信息',            
        	                handler: function(){if(this.bottompanel.isVisible())this.bottompanel.collapse(true); else this.bottompanel.expand(true);},
        	                scope:this
        	            },'-',this.status,'-',this.beginfield,' 至 ',this.endfield,'-'
        	            ,'->','查找: ', ' ',
        		         this.queryfield],
                        bbar: new Ext.PagingToolbar({
            	            pageSize: pgSize,
            	            store: this.store,
            	            displayInfo: true,
            	            displayMsg: '共{2}条记录，当前第 {0}条 到 {1}条',
            	            emptyMsg: "没有找到记录"
            	        }),                       
                    	colModel: new Ext.ux.grid.LockingColumnModel([
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
                                dataIndex: 'FDate'
                            },{
                                xtype: 'gridcolumn',
                                header: '关闭',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'FCloseStatus'
                            },{
                                xtype: 'gridcolumn',
                                header: '审核',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'FCheck'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料代码',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpdm'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '物料名称',
                                sortable: true,
                                resizable: true,
                                width: 150,
                                renderer:function(value,metadata,record){
	          		    	  		return value;
	          		      		},
                                dataIndex: 'cpmc'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '规格',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '单位',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'jldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'fssl',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '批号',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'wlph',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            }
                        ]),
                        listeners: {
	                		'cellclick': {fn:function(t,rowIndex,columnIndex,e){                    			
	                			this.cgdd.djbh = this.store.getAt(rowIndex).get('FOrderInterID')+this.store.getAt(rowIndex).get('FOrderEntryID');
	                			if(this.bottompanel.isVisible()&&'wgrk_cgdd_simple'==this.bottompanel.getActiveTab().id){                    				
	                				this.cgdd.store.removeAll();                    		
	                        		this.cgdd.store.baseParams['query']=this.cgdd.djbh;
	                        		this.cgdd.store.load();                            		
	                			}
	                			
	                			this.lljysqd.djbh = this.store.getAt(rowIndex).get('FOrderInterID')+this.store.getAt(rowIndex).get('FOrderEntryID');
	                			if(this.bottompanel.isVisible()&&'wgrk_lljysqd_simple'==this.bottompanel.getActiveTab().id){                    				
	                				this.lljysqd.store.removeAll();                    		
	                        		this.lljysqd.store.baseParams['query']=this.lljysqd.djbh;
	                        		this.lljysqd.store.load();                            		
	                			}
	                			
	                			this.shd.djbh = this.store.getAt(rowIndex).get('FOrderInterID')+this.store.getAt(rowIndex).get('FOrderEntryID');
	                			if(this.bottompanel.isVisible()&&'wgrk_shd_simple'==this.bottompanel.getActiveTab().id){                    				
	                				this.shd.store.removeAll();                    		
	                        		this.shd.store.baseParams['query']=this.shd.djbh;
	                        		this.shd.store.load();                            		
	                			}
	                			
	                			this.lljyd.djbh = this.store.getAt(rowIndex).get('FOrderInterID')+this.store.getAt(rowIndex).get('FOrderEntryID');
	                			if(this.bottompanel.isVisible()&&'wgrk_lljyd_simple'==this.bottompanel.getActiveTab().id){                    				
	                				this.lljyd.store.removeAll();                    		
	                        		this.lljyd.store.baseParams['query']=this.lljyd.djbh;
	                        		this.lljyd.store.load();                            		
	                			}	                				                			
	                		},scope:this}
	                	}
                    },
                    this.bottompanel
                ]
            }
        ];
        WgrkListPanel.superclass.initComponent.call(this);
    }
});
