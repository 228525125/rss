/**
 * 及时库存（带炉号）
 */
JskcLhbzListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_jskc_lhbz',
			root: 'result',
			totalProperty:"rowCount",
			fields:["wldm","wlmc","wlgg","wlph","ckmc","jldw","kcsl","lh","bz"],
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
                        xtype: 'editorgrid',                        
                        region: 'center',
                        margins: '3 3 3 3',
                        view: new Ext.ux.grid.LockingGridView(),
                        frame: false,
                        store: this.store,
                        clicksToEdit:1,
                        loadMask: true,
                        tbar:['   ',{
        	            	text: '刷新',
        	            	handler: function(){
        	            		this.store.load();
        	            	},
        	            	scope: this
        	            },'->','查找: ', ' ',this.queryfield],
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
                                header: '代码',
                                resizable: true,                                
                                width: 100,
                                dataIndex: 'wldm'
                            },{
                                xtype: 'gridcolumn',
                                header: '名称',
                                resizable: true,
                                width: 120,
                                dataIndex: 'wlmc',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '规格',
                                resizable: true,                                
                                width: 120,
                                dataIndex: 'wlgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '批号',
                                resizable: true,                                
                                width: 80,
                                dataIndex: 'wlph',
                                editor: new Ext.form.TextField({
                                    
                                })
                            },{
                                xtype: 'gridcolumn',
                                header: '仓库',
                                resizable: true,
                                width: 80,
                                dataIndex: 'ckmc'
                            },{
                                xtype: 'gridcolumn',
                                header: '单位',
                                resizable: true,
                                width: 40,
                                dataIndex: 'jldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '库存',
                                resizable: true,
                                width: 60,
                                dataIndex: 'kcsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '炉号',
                                resizable: true,
                                width: 80,
                                dataIndex: 'lh',
                                editor: new Ext.form.TextField({
                                    
                                })
                            },{
                                xtype: 'gridcolumn',
                                header: '标准',
                                resizable: true,
                                width: 80,
                                dataIndex: 'bz',
                                editor: new Ext.form.TextField({
                                   
                                })
                            }
                        ])
                    }
                ]
            }
        ];
        JskcLhbzListPanel.superclass.initComponent.call(this);
    }
});
