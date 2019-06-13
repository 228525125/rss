﻿/**
 * 外协送检异常
 */
WxsjycListPanel = Ext.extend(Ext.Panel, {
    layout: 'fit',
    border: false,
  	autoScroll:true,
    initComponent: function() {
	
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_wwjywzdj_hz',
			root: 'result',
			totalProperty:"rowCount",
			fields:['djbh','djrq','jhrq','dhrq','cpdm','cpmc','cpgg','cpth','jldw','djsl','fssl','sjsl','jysl','hgsl','jyfs','jgdw','jssl'],
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
                                resizable: true,
                                width: 100,
                                dataIndex: 'djbh'
                            },{
                                xtype: 'gridcolumn',
                                header: '申请日期',
                                resizable: true,
                                width: 80,
                                dataIndex: 'djrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '交货日期',
                                resizable: true,
                                width: 80,
                                dataIndex: 'jhrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '检验方式',
                                resizable: true,
                                width: 40,
                                dataIndex: 'jyfs'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料代码',
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpdm'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '物料名称',
                                resizable: true,
                                width: 150,
                                renderer:function(value,metadata,record){
	          		    	  		return value;
	          		      		},
                                dataIndex: 'cpmc'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '图号',
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpth'
                            },{
                                xtype: 'gridcolumn',
                                header: '规格',
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '单位',
                                resizable: true,
                                width: 40,
                                dataIndex: 'jldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '待检数量',
                                resizable: true,
                                width: 60,
                                dataIndex: 'djsl',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '加工单位',
                                resizable: true,
                                width: 40,
                                dataIndex: 'jgdw'
                            },{
                                xtype: 'gridcolumn',
                                header: '转出数量',
                                resizable: true,
                                width: 40,
                                dataIndex: 'fssl'
                            },{
                                xtype: 'gridcolumn',
                                header: '送检数量',
                                resizable: true,
                                width: 40,
                                dataIndex: 'sjsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '检验数量',
                                resizable: true,
                                hidden : true,
                                width: 40,
                                dataIndex: 'jysl'
                            },{
                                xtype: 'gridcolumn',
                                header: '合格数量',
                                resizable: true,
                                width: 40,
                                dataIndex: 'hgsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '接收数量',
                                resizable: true,
                                width: 40,
                                dataIndex: 'jssl'
                            }
                        ])
                    }
                ]
            }
        ];
        WxsjycListPanel.superclass.initComponent.call(this);
    }
});
