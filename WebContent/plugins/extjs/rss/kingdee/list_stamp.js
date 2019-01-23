/**
 * 刻印数据查询
 */
StampListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
  	delete_record:function(){
		var record=this.grid.getSelectionModel().getSelected();
		if(!record){
			Ext.Msg.alert("提示","请先选择要编辑的行!");
			return;
		}else{
			Ext.MessageBox.show({
				title:"提示",
				msg:"您确认删除？",
				buttons:{ok:'确定',cancel:'取消'},
				fn:function(btn){
					if('ok'==btn){
						
						var mask = new Ext.LoadMask('list_stamp_grid', {
				    		msg : '正在处理。。。'
				    	});
				    	mask.show();
						
						var ccbh = record.get('ccbh');
						Ext.Ajax.request({
				    		url:'kingdee.do?cmd=delete_record_stamp',
				    		params:{sn:ccbh},
				    		method:'POST',
				    		success:function(response, options){
				    			if(mask)
				    				 mask.hide();
				    			var responseArray = Ext.util.JSON.decode(response.responseText); 
				    			var resp = responseArray.result[0];
				    			 if(resp.success==true){
				    				 if(resp.msg)
				    					 Ext.Msg.alert('提示','处理完毕!',function(){
				    						 this.store.load();
				    					 },this);
				    			 }else{
				    				 Ext.Msg.alert('提示','服务器没有响应，请稍后再试！');
				    			 }
				    		},
				    		scope:this
				    	});
					}
				},
				icon:Ext.MessageBox.QUESTION,
				scope:this
			});
		}
		
		
  	},
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_stamp',
			root: 'result',
			totalProperty:"rowCount",
			fields:['ccbh','kysj','rwdh','ph','ggxh','mark'],
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
                        id: 'list_stamp_grid',
                        region: 'center',
                        margins: '3 3 3 3',
                        view: new Ext.ux.grid.LockingGridView(),
                        frame: false,
                        store: this.store,
                        loadMask: true,
                        tbar:['   ',
                        {
        	            	text: '刷新',
        	            	handler: function(){
        	            		this.store.load();
        	            	},
        	            	scope: this
        	            },
        	            {
                            xtype: 'button',
                            text: '删除',
                            handler: this.delete_record,
                            scope:this
                        },
        	            '->','查找: ', ' ',this.queryfield],
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
                                header: '出厂编号',
                                resizable: true,
                                width: 120,
                                dataIndex: 'ccbh',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '刻印时间',
                                resizable: true,                                
                                width: 150,
                                dataIndex: 'kysj'
                            },{
                                xtype: 'gridcolumn',
                                header: '任务单号',
                                resizable: true,                                
                                width: 120,
                                dataIndex: 'rwdh'
                            },{
                                xtype: 'gridcolumn',
                                header: '规格型号',
                                resizable: true,                                
                                width: 220,
                                dataIndex: 'ggxh'
                            },{
                                xtype: 'gridcolumn',
                                header: '炉批号',
                                resizable: true,                                
                                width: 120,
                                dataIndex: 'ph'
                            },{
                                xtype: 'gridcolumn',
                                header: '刻印状态',
                                resizable: true,                                
                                width: 80,
                                dataIndex: 'mark',
                                renderer:function(value,metadata,record){
                                	if('N'==value)
                                		return '准备';
                                	if('Y'==value)
                                		return '完成';
	                            	return value;
                            	}
                            }
                        ])
                    }
                ]
            }
        ];
        StampListPanel.superclass.initComponent.call(this);
        
        this.on('render',function(t){
        	this.grid = Ext.getCmp('list_stamp_grid');
	    },this);
        this.on('show',function(t){
        	this.store.load();
	    },this);
        
    }
});