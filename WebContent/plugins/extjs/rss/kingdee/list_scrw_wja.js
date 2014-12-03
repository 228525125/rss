/**
 * 未结案生产任务单列表
 */
WjascrwListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
  	autoScroll:true,
    initComponent: function() {
		this.djbh = '';
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_scrw_wja',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FStatus','FInterID','FBillNo','cpdm','cpmc','cpgg','cpph','jldw','jhsl','jhkgsj','jhwgsj','FType','xdrq','djrq','cpth','rksl'],
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
                                dataIndex: 'FBillNo'
                            },{
                                xtype: 'gridcolumn',
                                header: '单据日期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'djrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '单据状态',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'FStatus'
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
                                header: '图号',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpth'
                            },{
                                xtype: 'gridcolumn',
                                header: '批号',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                hidden: true,
                                dataIndex: 'cpph'
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
                                header: '计划数量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'jhsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '入库数量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'rksl'
                            },{
                                xtype: 'gridcolumn',
                                header: '开工时间',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'jhkgsj'
                            },{
                                xtype: 'gridcolumn',
                                header: '完工时间',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'jhwgsj'
                            },{
                                xtype: 'gridcolumn',
                                header: '生产类型',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'FType'
                            },{
                                xtype: 'gridcolumn',
                                header: '下达时间',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'xdrq'
                            }
                        ])
                    }
                ]
            }
        ];
        WjascrwListPanel.superclass.initComponent.call(this);
    }
});
