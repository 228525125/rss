/**
 * 检验单列表
 */
ICQCBillSimpleListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
  	autoScroll:true,
    initComponent: function() {
		this.djbh = '';
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_lljyd',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FCheck','FCloseStatus','hywgb','FInterID','FBillNo','FCancellation','FSourceInterID','FSourceEntryID','FOrderInterID','FOrderEntryID','FDate','cpdm','cpmc','cpgg','jldw','bjsl','hgsl','bhgsl','wlph','jyjg'],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";				 	
	 	this.store.baseParams['begin']='2000-01-01';	    
	    this.store.baseParams['end']='2099-12-31';
	    this.store.baseParams['status']='';
		
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
                                header: '报检数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'hgsl',
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
                                header: '检验结果',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'jyjg',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            }
                        ])
                    }
                ]
            }
        ];
        ICQCBillSimpleListPanel.superclass.initComponent.call(this);
    }
});
