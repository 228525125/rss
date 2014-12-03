/**
 * 因为没有接收而不应结案的任务单
 */
ScrwTqjaListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_scrw_tqja',
			root: 'result',
			totalProperty:"rowCount",
			fields:["djbh","djrq","cpdm","cpmc","cpgg","zcsl","jssl"],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize}
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
                                header: '任务单号',
                                resizable: true,                                
                                width: 100,
                                dataIndex: 'djbh'
                            },{
                                xtype: 'gridcolumn',
                                header: '日期',
                                resizable: true,                                
                                width: 80,
                                dataIndex: 'djrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '产品代码',
                                resizable: true,                                
                                width: 80,
                                dataIndex: 'cpdm'
                            },{
                                xtype: 'gridcolumn',
                                header: '产品名称',
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpmc'
                            },{
                                xtype: 'gridcolumn',
                                header: '产品规格',
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '转出',
                                resizable: true,
                                width: 40,
                                dataIndex: 'zcsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '接收',
                                resizable: true,
                                width: 40,
                                dataIndex: 'jssl'
                            }
                        ])
                    }
                ]
            }
        ];
        ScrwTqjaListPanel.superclass.initComponent.call(this);
    }
});
