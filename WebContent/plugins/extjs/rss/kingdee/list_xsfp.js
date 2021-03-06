/**
 * 销售发票列表
 */
SellSaleListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_xsfp',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FOrderID','FSaleID','FCheck','Fdate','FBillNo','dwdm','wldw','ywy','cpmc','cpgg','jldw','fssl','wsdj','hsdj','xxs','hsje','cpdm','hxsl','hxje','ddhsdj','ddhsje'],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";			
	 	
	 	this.xsdd = new SellOrderSimpleListPanel({id:'xsfp_xsdd_simple',title:'销售订单维护',iconCls:'pluginIcon'});
	 	this.fhtz = new SellOutSimpleListPanel({id:'xsfp_fhtz_simple',title:'销售通知维护',iconCls:'pluginIcon'});
	 	this.xsck = new SellStockBillSimpleListPanel({id:'xsfp_xsck_simple',title:'销售出库维护',iconCls:'pluginIcon'});	 	
	 	
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
                this.xsdd,
                this.fhtz,
                this.xsck
            ],
            listeners: {
            	'expand': {fn:function(p){
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'xsfp_xsdd_simple'==p.getActiveTab().id){
	    				this.xsdd.store.removeAll();                    		
	            		this.xsdd.store.baseParams['query']=this.xsdd.djbh;
	            		this.xsdd.store.load();                            		
	    			}
            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'xsfp_xsck_simple'==p.getActiveTab().id){
	    				this.xsck.store.removeAll();                    		
	            		this.xsck.store.baseParams['query']=this.xsck.djbh;
	            		this.xsck.store.load();                            		
	    			}
	    			
	    			if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'xsfp_fhtz_simple'==p.getActiveTab().id){
	    				this.fhtz.store.removeAll();                    		
	            		this.fhtz.store.baseParams['query']=this.fhtz.djbh;
	            		this.fhtz.store.load();                            		
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
                                dataIndex: 'Fdate'
                            },{
                                xtype: 'gridcolumn',
                                header: '审核',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'FCheck'
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
                                dataIndex: 'fssl'
                            },{
                                xtype: 'gridcolumn',
                                header: '核销数量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'hxsl'
                            }/*,{
                                xtype: 'gridcolumn',
                                header: '含税单价',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'hsdj'
                            },{
                                xtype: 'gridcolumn',
                                header: '订单单价',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'ddhsdj',
                                renderer:function(value,metadata,record){
                            		if(record.get("hsdj")!=value)
	          		    	  			return '<font color=red>'+value+'</font>';
                            		else
                            			return value;
	          		      		}
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
                            },{
                                xtype: 'gridcolumn',
                                header: '订单金额',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'ddhsje',
                                renderer:function(value,metadata,record){
	                        		if(record.get("hsje")!=value)
	          		    	  			return '<font color=red>'+value+'</font>';
	                        		else
	                        			return value;
	          		      		}
                            },{
                                xtype: 'gridcolumn',
                                header: '核销金额',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'hxje'
                            }*/
                        ]),
                        listeners: {
                    		'cellclick': {fn:function(t,rowIndex,columnIndex,e){
		                    	this.xsdd.djbh = this.store.getAt(rowIndex).get('FOrderID');
		            			if(this.bottompanel.isVisible()&&'xsfp_xsdd_simple'==this.bottompanel.getActiveTab().id){                    				
		            				this.xsdd.store.removeAll();                    		
		                    		this.xsdd.store.baseParams['query']=this.xsdd.djbh;
		                    		this.xsdd.store.load();                            		
		            			}
                    	
                    			this.xsck.djbh = this.store.getAt(rowIndex).get('FOrderID');
                    			if(this.bottompanel.isVisible()&&'xsfp_xsck_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.xsck.store.removeAll();                    		
                            		this.xsck.store.baseParams['query']=this.xsck.djbh;
                            		this.xsck.store.load();                            		
                    			}
                    			
                    			this.fhtz.djbh = this.store.getAt(rowIndex).get('FOrderID');
                    			if(this.bottompanel.isVisible()&&'xsfp_fhtz_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.fhtz.store.removeAll();                    		
                            		this.fhtz.store.baseParams['query']=this.fhtz.djbh;
                            		this.fhtz.store.load();                            		
                    			}
                    		},scope:this}
                    	}
                    },
                    this.bottompanel
                ]
            }
        ];
        SellSaleListPanel.superclass.initComponent.call(this);
    }
});
