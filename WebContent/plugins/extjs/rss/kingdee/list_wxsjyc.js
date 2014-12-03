/**
 * 外协及时率明细表
 */
WxsjycListPanel = Ext.extend(Ext.Panel, {
    layout: 'fit',
    border: false,
  	autoScroll:true,
    initComponent: function() {
	
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_wxsjyc',
			root: 'result',
			totalProperty:"rowCount",
			fields:['wldm','wlmc','wlgg','sjsl','jysl'],
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
                                header: '物料代码',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'wldm'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料名称',
                                sortable: true,
                                resizable: true,
                                width: 150,
                                dataIndex: 'wlmc'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料规格',
                                sortable: true,
                                resizable: true,
                                width: 150,
                                dataIndex: 'wlgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '送检数量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'sjsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '检验数量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'jysl'
                            }
                        ])
                    }
                ]
            }
        ];
        WxsjycListPanel.superclass.initComponent.call(this);
    }
});
