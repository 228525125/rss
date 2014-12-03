/**
 * 借出物资列表
 */
JcwzListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		this.djbh = '';
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_jcwz',
			root: 'result',
			totalProperty:"rowCount",
			fields:['jyr','wldm','wlmc','wlgg','fssl','jyrq','ghrq'],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";		 	
	 	
	 	this.queryfield = new Ext.app.SearchField({
            store: this.store,
            width:220,
            emptyText:'请输入关键字...',
            scope: this
        });
	    
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
        	            		this.store.load();
        	            	},
        	            	scope: this
        	            },'->','查找: ', ' ',
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
                                width: 100,
                                dataIndex: 'wlmc'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料规格',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'wlgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '借用人',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'jyr'
                            },{
                                xtype: 'gridcolumn',
                                header: '借用日期',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'jyrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '归还日期',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'ghrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '数量',
                                sortable: true,
                                resizable: true,
                                width: 150,
                                dataIndex: 'fssl'
                            }
                        ])
                    }
                ]
            }
        ];
        JcwzListPanel.superclass.initComponent.call(this);
		this.on('show',function(p){
			this.store.load();
		},this);
    }
});
