/**
 * 受托加工入库待审列表
 */
StjgrkTaskListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
  	autoScroll:true,
  	closable: true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_task_stjgrk',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FCheck','FCloseStatus','hywgb','FInterID','FBillNo','FCancellation','FSourceBillNo','FOrderInterID','FOrderEntryID','FDate','cpdm','cpmc','cpgg','jldw','fssl','wlph'],
	  		remoteSort:true,
	  		baseParams:{pageSize:2000}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";	
		
		this.queryfield = new Ext.app.SearchField({
            store: this.store,
            width:220,
            emptyText:'请输入关键字...',
            scope: this
        });
		
	    this.beginfield = new Ext.form.DateField({
        	xtype: 'datefield',			
			emptyText: '请选择...',
			format:'Y-m-d',
			name:'beg',
			value: '2011-01-01',
			listeners:{
        		'change':{fn:function(t,valuenew,valueold){
        			this.store.baseParams['begin']=valuenew.format('Y-m-d');
        		},scope:this} 
        	}
		});
	    this.store.baseParams['begin']=this.beginfield.getValue().format('Y-m-d');
	    
	    this.endfield = new Ext.form.DateField({
			xtype: 'datefield',			
			emptyText: '请选择...',
			format:'Y-m-d',
			name:'end',
			value: new Date(),
			listeners:{
        		'change':{fn:function(t,valuenew,valueold){
					this.store.baseParams['end']=valuenew.format('Y-m-d');
        		},scope:this}
        	}
		});
	    this.store.baseParams['end']=this.endfield.getValue().format('Y-m-d');
		
        this.items = [            
            {
                xtype: 'panel',
                region: 'center',
                layout: 'border',
                border: false,
                items: [
                    {
                        xtype: 'grid',
                        id: 'list_task_wgrk_grid',
                        region: 'center',
                        margins: '3 3 3 3',
                        view: new Ext.ux.grid.LockingGridView(),
                        frame: false,
                        store: this.store,
                        loadMask: true,       
                        tbar:['   ',{
        	            	text: '刷新',
        	            	handler: function(){
        	            		if(undefined!=this.store.baseParams['begin']&&undefined!=this.store.baseParams['end'])
        	            			this.store.load();
        	            		else
        	            			Ext.Msg.alert('提示','请选择时间段！');
        	            	},
        	            	scope: this
        	            },'-',this.beginfield,' 至 ',this.endfield
        	            ,'->','查找: ', ' ',
        		         this.queryfield],
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
                                dataIndex: 'FBillNo',
                                renderer:function(value,metadata,record){
	                        		var grid = Ext.getCmp('list_task_wgrk_grid');
	                        		var s = grid.getStore();
	                        		var index = s.indexOf(record);
	                        		if(index>0){
	                        			var r = s.getAt(index-1);
	                        			if(record.get("FBillNo")==r.get("FBillNo"))
	                        				return '';
	                        			else
	                        				return value;
	                        		}else                            		
	      		    	  				return value;
	      		      			}
                            },{
                                xtype: 'gridcolumn',
                                header: '单据日期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'FDate',
                                renderer:function(value,metadata,record){
	                        		var grid = Ext.getCmp('list_task_wgrk_grid');
	                        		var s = grid.getStore();
	                        		var index = s.indexOf(record);
	                        		if(index>0){
	                        			var r = s.getAt(index-1);
	                        			if(record.get("FBillNo")==r.get("FBillNo"))
	                        				return '';
	                        			else
	                        				return value;
	                        		}else                            		
	      		    	  				return value;
	      		      			}
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
                                header: '数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'fssl',
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
                            }
                        ])
                    }
                ]
            }
        ];
        StjgrkTaskListPanel.superclass.initComponent.call(this);
    }
});
