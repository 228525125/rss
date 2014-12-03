/**
 * 外协合格率明细表
 */
WxhglListPanel = Ext.extend(Ext.Panel, {
    layout: 'fit',
    border: false,
  	autoScroll:true,
    initComponent: function() {
			
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_wxhgl',
			root: 'result',
			totalProperty:"rowCount",
			fields:['djbh','djrq','wldm','wlmc','wlgg','jldw','hgsl','bhgsl','wldw','style'],
	  		remoteSort:true,
	  		baseParams:{pageSize:2000}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";		    
		
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
                        viewConfig:{forceFit:true},
                        bbar: new Ext.PagingToolbar({
            	            pageSize: 2000,
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
                                dataIndex: 'djbh'
                            },{
                                xtype: 'gridcolumn',
                                header: '供应商',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'wldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '单据日期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'djrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料代码',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'wldm'
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
                                dataIndex: 'wlmc'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '规格',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'wlgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '单位',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'jldw'
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
                                header: '检验结果',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                renderer:function(value,metadata,record){
                            		if(1==value)
                            			return '合格';
                            		else if(11==value)
                            			return '让步接收';
                            		else if(12==value)
                            			return '拒收';
	          		    	  		return value;
	          		      		},
                                dataIndex: 'style'
                            }
                        ])
                    }
                ]
            }
        ];
        WxhglListPanel.superclass.initComponent.call(this);
    }
});
