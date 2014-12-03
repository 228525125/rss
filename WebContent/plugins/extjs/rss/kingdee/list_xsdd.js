/**
 * 销售订单列表
 */
SellOrderListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_xsdd',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FTranType','FInterID','FEntryID','FCheck','FCloseStatus','Fdate','FBillNo','FChangeDate','FVersionNo','dwdm','wldw','bgrq','bgyy','bgr','ywy','cpdm','cpmc','cpgg','jldw','fssl','wsdj','hsdj','xxs','hsje','jhrq','hywgb','jcsl','jhsl','cksl','state','kpsl','ckrq','fphsdj','aqkc'],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";	
	 	
	 	this.fhtz = new SellOutSimpleListPanel({id:'xsdd_fhtz_simple',title:'销售通知维护',iconCls:'pluginIcon'});
	 	this.xsck = new SellStockBillSimpleListPanel({id:'xsdd_xsck_simple',title:'销售出库维护',iconCls:'pluginIcon'});	 	
	 	this.xsfp = new SellSaleSimpleListPanel({id:'xsdd_xsfp_simple',title:'销售发票维护',iconCls:'pluginIcon'});
	 	this.scrw = new WorkPlanSimpleListPanel({id:'xsdd_scrw_simple',title:'生产任务单维护',iconCls:'pluginIcon'});
	 	this.scrw.store.baseParams['status'] = '1';
	 	
		this.bottompanel = new Ext.TabPanel({                    	                        
            region: 'south',                        
            margins: '0 3 3 3',
            cmargins: '3 3 3 3',
            height: 220,                        
            collapsed: true,
            collapsible: true,
            activeTab: 1,
            autoDestroy:false,
            enableTabScroll:true,            
            defaults:{autoScroll:true},
            split: true,                     
            items: [
                this.fhtz,
                this.xsck,
                this.xsfp,
                this.scrw
            ],
            listeners: {
            	'expand': {fn:function(p){  
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'xsdd_xsck_simple'==p.getActiveTab().id){
	    				this.xsck.store.removeAll();                    		
	            		this.xsck.store.baseParams['query']=this.xsck.djbh;
	            		this.xsck.store.load();                            		
	    			}
	    			
	    			if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'xsdd_fhtz_simple'==p.getActiveTab().id){
	    				this.fhtz.store.removeAll();                    		
	            		this.fhtz.store.baseParams['query']=this.fhtz.djbh;
	            		this.fhtz.store.load();                            		
	    			}
	    			
	    			if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'xsdd_xsfp_simple'==p.getActiveTab().id){
	    				this.xsfp.store.removeAll();                    		
	            		this.xsfp.store.baseParams['query']=this.xsfp.djbh;
	            		this.xsfp.store.load();                            		
	    			}
	    			
	    			if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'xsdd_scrw_simple'==p.getActiveTab().id){
	    				this.scrw.store.removeAll();                    		
	            		this.scrw.store.baseParams['query']=this.scrw.djbh;
	            		this.scrw.store.load();                            		
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
                    	    	header: '',
                    	    	sortable: true,
                    	    	resizable: true,
                    	    	width: 38,
                                dataIndex: 'aqkc',
                                renderer:function(value,metadata,record){
	                	    		var aqkc = record.get('aqkc');
	                	    		if(0<aqkc)
	          		    	  			return '<img border=0 src="images/rss/bei.gif" width=15 height=15/>';
	                	    		else
	                	    			return '';
	          		      		}
                    	    },{
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
                                dataIndex: 'Fdate'
                            },{
                                xtype: 'gridcolumn',
                                header: '交货日期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'jhrq',
                                renderer:function(value,metadata,record){
	                        		var jhrq = record.get('jhrq');
	                        		var year = jhrq.substring(0,4);
	                        		var month = jhrq.substring(5,7);
	                        		var day = jhrq.substring(8,10);
	                        		var date = new Date();
	                        		date.setFullYear(year, (month-1), day);
	                        		var today = new Date();
	                            	var cksl = record.get('cksl');
	                            	var fssl = record.get('fssl');	  
	                            	var FCloseStatus = record.get('FCloseStatus');
	                            	var hywgb = record.get('hywgb');
	                        		if(fssl>cksl&&(date.getTime()+1000*60*60*24)<today.getTime()&&'Y'!=hywgb&&'Y'!=FCloseStatus)	                        			
	                        			return '<font color="red">'+value+'</font>';
	                        		else	          		    	  			
	                        			return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '出库日期',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                renderer:function(value,metadata,record){
	                            	var dhrq = record.get('jhrq');
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
                                dataIndex: 'ckrq'
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
                                header: '变更日期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                hidden: true,
                                dataIndex: 'bgrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '变更人',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                hidden: true,
                                dataIndex: 'bgr'
                            },{
                                xtype: 'gridcolumn',
                                header: '变更原因',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                hidden: true,
                                dataIndex: 'bgyy'
                            },{
                                xtype: 'gridcolumn',
                                header: '版本号',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                hidden: true,
                                dataIndex: 'FVersionNo'
                            },{
                                xtype: 'gridcolumn',
                                header: '客户代码',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                hidden: true,
                                dataIndex: 'dwdm'
                            },{
                                xtype: 'gridcolumn',
                                header: '客户',
                                sortable: true,
                                resizable: true,
                                width: 150,
                                dataIndex: 'wldw'
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
                                header: '产品代码',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpdm'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '产品名称',
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
                                header: '产品规格',
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
	                            	var jcsl = record.get('jcsl');
	                            	var jhsl = record.get('jhsl');
	                            	var cksl = record.get('cksl');
	                            	var v = '';
	                        		if((value-cksl)>jcsl)
	          		    	  			v = '<font color="#008080">'+value+'</font>';
	                        		if((value-cksl)>(jcsl+jhsl))
	                        			v = '<font color="red">'+value+'</font>';
	                        		if(''==v)
	                        			v = value;
	                        		
	                        		return v;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '出库数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'cksl'
                            },{
                                xtype: 'gridcolumn',
                                header: '开票数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'kpsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '即时库存',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'jcsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '预计入库量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'jhsl'
                            }/*,{
                                xtype: 'gridcolumn',
                                header: '含税单价',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'hsdj',
                                renderer:function(value,metadata,record){
                            		var fphsdj = record.get('fphsdj');
                            		if(0!=fphsdj&&value!=fphsdj)
                            			return '<font color=red>'+value+'</font>';
                            		else
                            			return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '发票含税单价',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'fphsdj'
                            },{
                                xtype: 'gridcolumn',
                                header: '税额',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'xxs'
                            },{
                                xtype: 'gridcolumn',
                                header: '含税金额',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'hsje'
                            }*/,{
                                xtype: 'gridcolumn',
                                header: 'state',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'state'
                            },{
                                xtype: 'gridcolumn',
                                header: '安全库存',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'aqkc'
                            }
                        ]),
                        listeners: {
                    		'cellclick': {fn:function(t,rowIndex,columnIndex,e){                    			
                    			this.xsck.djbh = this.store.getAt(rowIndex).get('FInterID')+this.store.getAt(rowIndex).get('FEntryID');
                    			if(this.bottompanel.isVisible()&&'xsdd_xsck_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.xsck.store.removeAll();                    		
                            		this.xsck.store.baseParams['query']=this.xsck.djbh;
                            		this.xsck.store.load();                            		
                    			}
                    			
                    			this.fhtz.djbh = this.store.getAt(rowIndex).get('FInterID')+this.store.getAt(rowIndex).get('FEntryID');
                    			if(this.bottompanel.isVisible()&&'xsdd_fhtz_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.fhtz.store.removeAll();                    		
                            		this.fhtz.store.baseParams['query']=this.fhtz.djbh;
                            		this.fhtz.store.load();                            		
                    			}
                    			
                    			this.xsfp.djbh = this.store.getAt(rowIndex).get('FInterID')+this.store.getAt(rowIndex).get('FEntryID');
                    			if(this.bottompanel.isVisible()&&'xsdd_xsfp_simple'==this.bottompanel.getActiveTab().id){                    				                    				
                    				this.xsfp.store.removeAll();                    		
                            		this.xsfp.store.baseParams['query']=this.xsfp.djbh;
                            		this.xsfp.store.load();                            		
                    			}
                    			
                    			this.scrw.djbh = this.store.getAt(rowIndex).get('cpdm');
                    			if(this.bottompanel.isVisible()&&'xsdd_scrw_simple'==this.bottompanel.getActiveTab().id){                    				                    				
                    				this.scrw.store.removeAll();                    		
                            		this.scrw.store.baseParams['query']=this.scrw.djbh;                            		
                            		this.scrw.store.load();                            		
                    			}
                    		},scope:this}
                    	}
                    },
                    this.bottompanel
                ]
            }
        ];
        SellOrderListPanel.superclass.initComponent.call(this);
    }
});
