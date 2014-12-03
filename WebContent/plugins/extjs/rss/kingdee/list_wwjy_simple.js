/**
 * 委外检验单列表
 */
WwjySimpleListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
  	autoScroll:true,
    initComponent: function() {
		this.djbh = '';
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_wwjy',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FStatus','FInterID','FBillNo','FSourceInterID','FDate','cpdm','cpmc','cpgg','jldw','sjsl','jysl','hgsl','bhgsl','gfsl','lfsl','jssl','wlph','jgdw'],
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
                                header: '单据状态',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'FStatus'
                            },{
                                xtype: 'gridcolumn',
                                header: '加工单位',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'jgdw'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料代码',
                                sortable: true,
                                resizable: true,
                                width: 150,
                                dataIndex: 'cpdm'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料名称',
                                sortable: true,
                                resizable: true,
                                width: 150,
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
                                width: 80,
                                hidden: true,
                                dataIndex: 'jldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '检验数量',
                                sortable: true,
                                resizable: true,
                                width: 80,                                
                                dataIndex: 'jysl'
                            },{
                                xtype: 'gridcolumn',
                                header: '合格数量',
                                sortable: true,
                                resizable: true,
                                width: 80,                                
                                dataIndex: 'hgsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '不合格数量',
                                sortable: true,
                                resizable: true,
                                width: 80,                                
                                dataIndex: 'bhgsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '工废数量',
                                sortable: true,
                                resizable: true,
                                width: 80,                                
                                dataIndex: 'gfsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '料废数量',
                                sortable: true,
                                resizable: true,
                                width: 80,                                
                                dataIndex: 'lfsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '接收数量',
                                sortable: true,
                                resizable: true,
                                width: 80,                                
                                dataIndex: 'jssl'
                            },{
                                xtype: 'gridcolumn',
                                header: '批号',
                                sortable: true,
                                resizable: true,
                                width: 80,                                
                                dataIndex: 'wlph'
                            }
                        ])
                    }
                ]
            }
        ];
        WwjySimpleListPanel.superclass.initComponent.call(this);
    }
});
