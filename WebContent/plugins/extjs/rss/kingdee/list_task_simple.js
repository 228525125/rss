/**
 * 生产排程表
 */
TaskSimpleListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
  	autoScroll:true,
    initComponent: function() {	
		this.djbh = '';
		//报表数据
		this.store = new Ext.data.JsonStore({
			url:'taskPlan.do?cmd=list',
			root: 'result',
			totalProperty:"rowCount",
			fields:['id','date','equipment','workNo','workItemCode','workItemName','workItemModel','workUnit','workNumber','segment','beginDate','endDate','planDate','operator','remark','status'],
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
                                header: '单据日期',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'date',
                                renderer:function(value,metadata,record){
	          		    	  		if(null!=value)
	          		    	  			return value.format('Y-m-d');
	          		    	  		else
	          		    	  			return '';
	          		      		}	
                            },{
                                xtype: 'gridcolumn',
                                header: '流水线',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'equipment',
                                renderer:function(value,metadata,record){
	          		    	  		return value.name;
	          		      		}
                            },{
                                xtype: 'gridcolumn',
                                header: '生产日期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'planDate',
                                renderer:function(value,metadata,record){
	          		    	  		if(null!=value)
	          		    	  			return value.format('Y-m-d');
	          		    	  		else
	          		    	  			return '';
	          		      		}	
                            },{
                                xtype: 'gridcolumn',
                                header: '班次',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'segment'
                            },{
                                xtype: 'gridcolumn',
                                header: '任务单',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'workNo'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料代码',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 100,
                                dataIndex: 'workItemCode'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料名称',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'workItemName'
                            },{
                                xtype: 'gridcolumn',
                                header: '规格',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'workItemModel'
                            },{
                                xtype: 'gridcolumn',
                                header: '单位',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'workUnit'
                            },{
                                xtype: 'gridcolumn',
                                header: '数量',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'workNumber'
                            },{
                                xtype: 'gridcolumn',
                                header: '计划开工时间',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'beginDate',
                                renderer:function(value,metadata,record){
	          		    	  		if(null!=value)
	          		    	  			return value.format('Y-m-d');
	          		    	  		else
	          		    	  			return '';
	          		      		}
                            },{
                                xtype: 'gridcolumn',
                                header: '计划完工时间',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'endDate',
                                renderer:function(value,metadata,record){
	          		    	  		if(null!=value)
	          		    	  			return value.format('Y-m-d');
	          		    	  		else
	          		    	  			return '';
	          		      		}
                            },{
                                xtype: 'gridcolumn',
                                header: '备注',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'remark'
                            },{
                                xtype: 'gridcolumn',
                                header: '状态',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'status'
                            }
                        ])
                    }
                ]
            }
        ];
        TaskSimpleListPanel.superclass.initComponent.call(this);
    }
});
