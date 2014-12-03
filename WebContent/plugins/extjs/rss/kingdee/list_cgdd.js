/**
 * 采购订单列表
 */
POOrderListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_cgdd',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FCheck','FCloseStatus','hywgb','FInterID','FBillNo','FSourceInterID','FSourceEntryID','FCancellation','FSourceBillNo','FEntryID','FDate','cpdm','cpmc','cpgg','jldw','fssl','hsdj','hsje','dhrq','ywy','gys','sjsl','shsl','jysl','rksl','sjdhrq'],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";			
	 	
	 	this.cgsq = new POrequestSimpleListPanel({id:'cgdd_cgsq_simple',title:'采购申请',iconCls:'pluginIcon'});
	 	this.lljysqd = new POInstockSimpleListPanel({id:'cgdd_lljysqd_simple',title:'来料检验申请',iconCls:'pluginIcon'});
	 	this.shd = new ShdSimpleListPanel({id:'cgdd_shd_simple',title:'收货单',iconCls:'pluginIcon'});
	 	this.lljyd = new ICQCBillSimpleListPanel({id:'cgdd_lljyd_simple',title:'检验单',iconCls:'pluginIcon'});
	 	this.wgrk = new WgrkSimpleListPanel({id:'cgdd_wgrk_simple',title:'外购入库',iconCls:'pluginIcon'});
	 	
	 	
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
                this.cgsq,
                this.lljysqd,
                this.shd,
                this.lljyd,
                this.wgrk
            ],
            listeners: {
            	'expand': {fn:function(p){  
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'cgdd_cgsq_simple'==p.getActiveTab().id){
	    				this.cgsq.store.removeAll();                    		
	            		this.cgsq.store.baseParams['query']=this.cgsq.djbh;
	            		this.cgsq.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'cgdd_lljysqd_simple'==p.getActiveTab().id){
	    				this.lljysqd.store.removeAll();                    		
	            		this.lljysqd.store.baseParams['query']=this.lljysqd.djbh;
	            		this.lljysqd.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'cgdd_shd_simple'==p.getActiveTab().id){
	    				this.shd.store.removeAll();                    		
	            		this.shd.store.baseParams['query']=this.shd.djbh;
	            		this.shd.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'cgdd_lljyd_simple'==p.getActiveTab().id){
	    				this.lljyd.store.removeAll();                    		
	            		this.lljyd.store.baseParams['query']=this.lljyd.djbh;
	            		this.lljyd.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'cgdd_wgrk_simple'==p.getActiveTab().id){
	    				this.wgrk.store.removeAll();                    		
	            		this.wgrk.store.baseParams['query']=this.wgrk.djbh;
	            		this.wgrk.store.load();                            		
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
	            data:[['','全部'],['0','未审核'],['1','已审核'],['3','已关闭']], 
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
                                header: '交货日期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'dhrq',
                                renderer:function(value,metadata,record){
                            		var fssl = record.get('fssl');
                            		var sjsl = record.get('sjsl');
                            		var shsl = record.get('shsl');
                            		var FCloseStatus = record.get('FCloseStatus');
                            		var hywgb = record.get('hywgb');
                            		var dhsl = 0;
                            		if(0==sjsl)
                            			dhsl = shsl;
                            		else
                            			dhsl = sjsl;
                            		var today = new Date();                            		
                            		var year = value.substring(0,4);
                            		var month = value.substring(5,7);
                            		var day = value.substring(8,10);
                            		var date = new Date();
                            		date.setFullYear(year, (month-1), day);
                            		if(fssl>dhsl&&(date.getTime()+1000*60*60*24)<today.getTime()&&FCloseStatus!='Y'&&hywgb!='Y')
                            			return '<font color="red">'+value+'</font>';
                            		else
	          		    	  			return value;
	          		      		}
                            },{
                                xtype: 'gridcolumn',
                                header: '到货日期',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                renderer:function(value,metadata,record){
                            		var dhrq = record.get('dhrq');
                            		var year = dhrq.substring(0,4);
                            		var month = dhrq.substring(5,7);
                            		var day = dhrq.substring(8,10);
                            		var dhrqdate = new Date();
                            		dhrqdate.setFullYear(year, (month-1), day);                            		
                            		if(''!=value){
                            			year = value.substring(0,4);
                            			month = value.substring(5,7);
                                		day = value.substring(8,10);
                                		var sjdhrqdate = new Date();
                                		sjdhrqdate.setFullYear(year, (month-1), day);
                                		if(dhrqdate.getTime()<sjdhrqdate.getTime())
                                			return '<font color="red">'+value+'</font>';
                            		}
	          		    	  		return value;
	          		      		},
                                dataIndex: 'sjdhrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '关闭',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'FCloseStatus'
                            },{
                                xtype: 'gridcolumn',
                                header: '行关闭',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'hywgb'
                            },{
                                xtype: 'gridcolumn',
                                header: '审核',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 40,
                                dataIndex: 'FCheck'
                            },{
                                xtype: 'gridcolumn',
                                header: '供应商',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 150,
                                dataIndex: 'gys'
                            },{
                                xtype: 'gridcolumn',
                                header: '业务员',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 60,
                                dataIndex: 'ywy'
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
                                renderer:function(value,metadata,record){
	          		    	  		return value;
	          		      		},
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
                            		var sjsl = record.get('sjsl');                            		
                            		var shsl = record.get('shsl');
                            		var rksl = record.get('rksl');
                            		var FCloseStatus = record.get('FCloseStatus');
                            		var hywgb = record.get('hywgb');
                            		var dhsl = 0;
                            		if(0==sjsl)
                            			dhsl = shsl;
                            		else
                            			dhsl = sjsl;
                            		var result = value;                            		
                            		if(value>dhsl&&FCloseStatus!='Y'&&hywgb!='Y')
                            			result = '<font color="red">'+value+'</font>';                            		
                            		if(value<=dhsl&&value>=rksl)
                            			result = '<font color="#008080">'+value+'</font>';
                            		if(value<=rksl)
                            			result = value;
                            			
	                        		return result;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '送检数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'sjsl',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '收货数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'shsl',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '检验数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'jysl',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '入库数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'rksl',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '含税单价',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'hsdj'
                            },{
                                xtype: 'gridcolumn',
                                header: '含税金额',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'hsje'
                            }
                        ]),
                        listeners: {
                    		'cellclick': {fn:function(t,rowIndex,columnIndex,e){                    			
                    			this.cgsq.djbh = this.store.getAt(rowIndex).get('FSourceInterID')+this.store.getAt(rowIndex).get('FSourceEntryID');
                    			if(this.bottompanel.isVisible()&&'cgdd_cgsq_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.cgsq.store.removeAll();                    		
                            		this.cgsq.store.baseParams['query']=this.cgsq.djbh;
                            		this.cgsq.store.load();                            		
                    			}
                    			
                    			this.lljysqd.djbh = this.store.getAt(rowIndex).get('FInterID')+this.store.getAt(rowIndex).get('FEntryID');
                    			if(this.bottompanel.isVisible()&&'cgdd_lljysqd_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.lljysqd.store.removeAll();                    		
                            		this.lljysqd.store.baseParams['query']=this.lljysqd.djbh;
                            		this.lljysqd.store.load();                            		
                    			}
                    			
                    			this.shd.djbh = this.store.getAt(rowIndex).get('FInterID')+this.store.getAt(rowIndex).get('FEntryID');
                    			if(this.bottompanel.isVisible()&&'cgdd_shd_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.shd.store.removeAll();                    		
                            		this.shd.store.baseParams['query']=this.shd.djbh;
                            		this.shd.store.load();                            		
                    			}
                    			
                    			this.lljyd.djbh = this.store.getAt(rowIndex).get('FInterID')+this.store.getAt(rowIndex).get('FEntryID');
                    			if(this.bottompanel.isVisible()&&'cgdd_lljyd_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.lljyd.store.removeAll();                    		
                            		this.lljyd.store.baseParams['query']=this.lljyd.djbh;
                            		this.lljyd.store.load();                            		
                    			}
                    			
                    			this.wgrk.djbh = this.store.getAt(rowIndex).get('FInterID')+this.store.getAt(rowIndex).get('FEntryID');
                    			if(this.bottompanel.isVisible()&&'cgdd_wgrk_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.wgrk.store.removeAll();                    		
                            		this.wgrk.store.baseParams['query']=this.wgrk.djbh;
                            		this.wgrk.store.load();                            		
                    			}
                    		},scope:this}
                    	}
                    },
                    this.bottompanel
                ]
            }
        ];
        POOrderListPanel.superclass.initComponent.call(this);
    }
});
