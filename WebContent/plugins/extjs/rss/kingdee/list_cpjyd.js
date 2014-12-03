/**
 * 产品检验单列表
 */
CpjydListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		this.FBillNo = '';
		this.cpdm = '';
		this.cpph = '';
		this.rksl = 0;
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_cpjyd',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FCheck','FCloseStatus','hywgb','FInterID','FBillNo','FCancellation','FSourceInterID','FSourceEntryID','FICMOInterID','FICOMBillNo','FDate','cpdm','cpmc','cpgg','jldw','bjsl','hgsl','bhgsl','wlph','jyjg','gfsl','lfsl','rksl'],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";				 	
	 	
	 	this.scrw = new WorkPlanSimpleListPanel({id:'cpjyd_scrw_simple',title:'生产任务单维护',iconCls:'pluginIcon'});
	 	this.cpjysqd = new CpjysqdSimpleListPanel({id:'cpjyd_cpjysqd_simple',title:'产品检验申请单',iconCls:'pluginIcon'});
	 	this.cprk = new InStockSimpleListPanel({id:'cpjyd_cprk_simple',title:'产品入库',iconCls:'pluginIcon'});	
	 	
	 	this.bottompanel = new Ext.TabPanel({                    	                        
            region: 'south',                        
            margins: '0 3 3 3',
            cmargins: '3 3 3 3',
            height: 220,                        
            collapsed: true,
            collapsible: true,
            activeTab: 2,
            autoDestroy:false,
            enableTabScroll:true,            
            defaults:{autoScroll:true},
            split: true,                     
            items: [
                this.scrw,
                this.cpjysqd,
                this.cprk
            ],
            listeners: {
            	'expand': {fn:function(p){
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'cpjyd_scrw_simple'==p.getActiveTab().id){
	    				this.scrw.store.removeAll();                    		
	            		this.scrw.store.baseParams['query']=this.scrw.djbh;
	            		this.scrw.store.load();                            		
	    			}
            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'cpjyd_cpjysqd_simple'==p.getActiveTab().id){
	    				this.cpjysqd.store.removeAll();                    		
	            		this.cpjysqd.store.baseParams['query']=this.cpjysqd.djbh;
	            		this.cpjysqd.store.load();                            		
	    			}
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'cpjyd_cprk_simple'==p.getActiveTab().id){
	    				this.cprk.store.removeAll();                    		
	            		this.cprk.store.baseParams['query']=this.cprk.djbh;
	            		this.cprk.store.load();                            		
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
        	            		if(undefined!=this.store.baseParams['begin']&&undefined!=this.store.baseParams['end']){
        	            			this.FBillNo = '';
        	            			this.cpdm = '';
        	            			this.store.load();
        	            		}else{
        	            			Ext.Msg.alert('提示','请选择时间段！');
        	            		}
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
        	            },'-',{
        	            	text: '复制',
        	            	handler: function(){     		
        	            		if(''!=this.FBillNo&&''!=this.cpdm&&''!=this.cpph&&0==this.bhgsl&&0==this.gfsl&&0==this.lfsl&&0==this.rksl){
        	            			if(!this.win||null==this.win){
            	            			this.win = new CpjysqdFormWindow({jydh:this.FBillNo,cpdm:this.cpdm,cpph:this.cpph,parentStore: this.store});
            	            		}
            	            		this.win.on('close',function(){this.win=null},this);
            	            		this.win.show();
            	            		this.win.store.load();
        	            		}else{
        	            			Ext.Msg.alert('提示','请选择检验单,或该检验单已入库！');
        	            		}        	            			
        	            	},
        	            	scope: this
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
                                header: '批号',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'wlph',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '报检数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'bjsl',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '合格数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'hgsl',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '不合格数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'bhgsl',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '工废数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'gfsl',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '料废数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'lfsl',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '检验结果',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'jyjg',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '生产任务单',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'FICOMBillNo'
                            }
                        ]),
                        listeners: {
	                		'cellclick': {fn:function(t,rowIndex,columnIndex,e){
                    			this.FBillNo = this.store.getAt(rowIndex).get('FBillNo');
                    			this.cpdm = this.store.getAt(rowIndex).get('cpdm');
                    			this.cpph = this.store.getAt(rowIndex).get('wlph');
                    			this.bhgsl = this.store.getAt(rowIndex).get('bhgsl');
                    			this.gfsl = this.store.getAt(rowIndex).get('gfsl');
                    			this.lfsl = this.store.getAt(rowIndex).get('lfsl');
                    			this.rksl = this.store.getAt(rowIndex).get('rksl');
                    			
                    			this.scrw.djbh = this.store.getAt(rowIndex).get('FICOMBillNo');
		            			if(this.bottompanel.isVisible()&&'cpjyd_scrw_simple'==this.bottompanel.getActiveTab().id){                    				
		            				this.scrw.store.removeAll();                    		
		                    		this.scrw.store.baseParams['query']=this.scrw.djbh;
		                    		this.scrw.store.load();                            		
		            			}
                    			
		                    	this.cpjysqd.djbh = this.store.getAt(rowIndex).get('FICOMBillNo');
		            			if(this.bottompanel.isVisible()&&'cpjyd_cpjysqd_simple'==this.bottompanel.getActiveTab().id){                    				
		            				this.cpjysqd.store.removeAll();                    		
		                    		this.cpjysqd.store.baseParams['query']=this.cpjysqd.djbh;
		                    		this.cpjysqd.store.load();                            		
		            			}
                    	
		                    	this.cprk.djbh = this.store.getAt(rowIndex).get('FICOMBillNo');
		            			if(this.bottompanel.isVisible()&&'cpjyd_cprk_simple'==this.bottompanel.getActiveTab().id){                    				
		            				this.cprk.store.removeAll();                    		
		                    		this.cprk.store.baseParams['query']=this.cprk.djbh;
		                    		this.cprk.store.load();                            		
		            			}                  			                    			
	                		},scope:this}
	                	}
                    },
                    this.bottompanel
                ]
            }
        ];
        CpjydListPanel.superclass.initComponent.call(this);
    }
});
