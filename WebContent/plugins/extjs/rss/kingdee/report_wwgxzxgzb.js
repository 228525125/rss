/**
 * 委外工序执行跟踪表
 */
WwgxzxgzbReportPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=report_wwgxzxgzb',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FDate','FOutBill','FClosed','FInvoiceNumber','FInvoiceName','FEmpName','FNumber','FShortNumber','FName','FModel','FOper','FOperName','FDeliDate','FUnit','FOutQty','FOperOutQty','FInQty','FQualifiedQty','FEntryID','FOutBill','FOutQty','FOperOutQty','FInQty','FQualifiedQty','FScrapQty','FScrapItemQty','FOperInQty','FOperQualifiedQty','FOperScrapQty','FOperScrapItemQty','FBalanceQty','FOperBalanceQty','FSumSort','FNotPassQty','FQINQty','FQOUTQty'],
	  		remoteSort:true,
	  		baseParams:{pageSize:20000}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";	
	 	
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
		
        this.items = [            
            {
                xtype: 'panel',
                region: 'center',
                layout: 'border',
                border: false,
                items: [
                    {
                        xtype: 'grid',
                        id: 'report_wwgxzxgzb_grid',
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
        	            	text: '导出',
        	            	handler: function(){	        	            	        	            		
	        	            	var begin = '&begin='+this.beginfield.getValue().format('Y-m-d');
	        	            	var end = '&end='+this.endfield.getValue().format('Y-m-d');
	        	            	var pageS = '&pageSize='+9999;
	        	            	var orderBy = '';
	        	            	var orderType = '';
	        	            	if(undefined!=this.store.sortInfo){
	        	            		orderBy = '&orderBy='+this.store.sortInfo.field;
	        	            		orderType = '&orderType='+this.store.sortInfo.direction;
	        	            	}
	        	            	var q = '&query='+this.queryfield.getValue();
	        	            	var href = "kingdee.do?cmd=export_scxh"+begin+end+pageS+orderBy+orderType+encodeURI(q);	        	            	
	        	        　　			location.href = href;
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
        	            }/*,'-',{    
        	                text: '关联信息',            
        	                handler: function(){if(this.bottompanel.isVisible())this.bottompanel.collapse(true); else this.bottompanel.expand(true);},
        	                scope:this
        	            }*/,'-',this.beginfield,' 至 ',this.endfield,'-'
        	            ,'->','查找: ', ' ',
        		         this.queryfield],
                        bbar: new Ext.PagingToolbar({
            	            pageSize: 20000,
            	            store: this.store,
            	            displayInfo: true,
            	            displayMsg: '共{2}条记录，当前第 {0}条 到 {1}条',
            	            emptyMsg: "没有找到记录"
            	        }),                       
                    	colModel: new Ext.ux.grid.LockingColumnModel([
                            {
                                xtype: 'gridcolumn',
                                header: '转出单号',
                                sortable: true,
                                resizable: true,
                                width: 90,
                                dataIndex: 'FOutBill',
                                renderer:function(value,metadata,record){                         		
          		    	  			return value;
          		      			}
                            },{
                                xtype: 'gridcolumn',
                                header: '单据日期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'FDate'                                
                            },{
                                xtype: 'gridcolumn',
                                header: '行关闭',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'FClosed'
                            },{
                                xtype: 'gridcolumn',
                                header: '加工单位代码',
                                sortable: true,
                                resizable: true,
                                hidden : true,
                                width: 60,
                                dataIndex: 'FInvoiceNumber'
                            },{
                                xtype: 'gridcolumn',
                                header: '加工单位',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'FInvoiceName'
                            },{
                                xtype: 'gridcolumn',
                                header: '业务员',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'FEmpName'
                            },{
                                xtype: 'gridcolumn',
                                header: '产品代码',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'FNumber'
                            },{
                                xtype: 'gridcolumn',
                                header: '产品名称',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'FName'                                
                            },{
                                xtype: 'gridcolumn',
                                header: '规格',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'FModel'
                            },{
                                xtype: 'gridcolumn',
                                header: '工序名称',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'FOperName'
                            },{
                                xtype: 'gridcolumn',
                                header: '交货日期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'FDeliDate'
                            },{
                                xtype: 'gridcolumn',
                                header: '单位',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'FUnit'
                            },{
                                xtype: 'gridcolumn',
                                header: '转出数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'FOutQty'
                            },{
                                xtype: 'gridcolumn',
                                header: '接收数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'FInQty'
                            },{
                                xtype: 'gridcolumn',
                                header: '合格数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'FQualifiedQty'
                            },{
                                xtype: 'gridcolumn',
                                header: '不合格数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'FNotPassQty'
                            },{
                                xtype: 'gridcolumn',
                                header: '入库数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'FQINQty'
                            },{
                                xtype: 'gridcolumn',
                                header: '出库数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'FQOUTQty'
                            },{
                                xtype: 'gridcolumn',
                                header: '工废数量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'FScrapQty'
                            },{
                                xtype: 'gridcolumn',
                                header: '料废数量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'FScrapItemQty'
                            },{
                                xtype: 'gridcolumn',
                                header: '结存数量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'FBalanceQty'
                            }
                        ])
                    }
                ]
            }
        ];
        WwgxzxgzbReportPanel.superclass.initComponent.call(this);
    }
});
