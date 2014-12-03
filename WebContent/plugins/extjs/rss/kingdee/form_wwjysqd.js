WwjysqdFormWindow = Ext.extend(Ext.Window,{
	layout: 'fit',
	closeAction:"close",
	modal:true,
	title:'委外工序送检单',
	width:750,
	height:500,
	buttonAlign:'right',
	initComponent : function(){
	    
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_wwzc_edit',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FStatus','FInterID','FEntryID','FBillNo','FSourceBillNo','FDate','cpdm','cpmc','cpgg','jldw','fssl','sjsl','wlph','jhrq','jgdw','ysjsl','sfjy','dj'],
	  		remoteSort:true,
	  		baseParams:{pageSize:2000}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";		 	
	 	this.store.baseParams['query']=this.query;
	 	
	 	
	
	    this.items = [            
	        {
	            xtype: 'panel',
	            region: 'center',
	            layout: 'border',
	            border: false,
	            items: [
	                {
                        xtype: 'editorgrid',
                        id: 'list_wwzc_edit_grid',
                        region: 'center',
                        margins: '3 3 3 3',
                        clicksToEdit:1,
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
                            {
                                xtype: 'gridcolumn',
                                header: '单据日期',                                                               
                                width: 80,
                                dataIndex: 'FDate',
                                renderer:function(value,metadata,record){
	                            	var date = new Ext.form.DateField({
	                        			xtype: 'datefield',			
	                        			emptyText: '请选择...',
	                        			format:'Y-m-d',
	                        			name:'end',
	                        			value: new Date()
	                        		});
	                        	    return date.getValue().format('Y-m-d');                            		
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '转出单号',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 100,
                                dataIndex: 'FBillNo'
                            },{
                                xtype: 'gridcolumn',
                                header: '单据日期',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'FDate'
                            },{
                                xtype: 'gridcolumn',
                                header: '交货日期',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 100,
                                dataIndex: 'jhrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '任务单号',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 100,
                                dataIndex: 'FSourceBillNo'
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
                                hidden: true,
                                width: 100,
                                dataIndex: 'cpdm'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料名称',
                                sortable: true,
                                resizable: true,
                                width: 100,
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
                                dataIndex: 'jldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '转出数量',
                                sortable: true,
                                resizable: true,
                                width: 60,                                
                                dataIndex: 'fssl'
                            },{
                                xtype: 'gridcolumn',
                                header: '已送检数',
                                sortable: true,
                                resizable: true,
                                width: 60,                                
                                dataIndex: 'ysjsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '送检数量',                                
                                width: 80,                                
                                dataIndex: 'sjsl',
                                editor: new Ext.form.NumberField({
                                    allowBlank: false,
                                    allowNegative: false
                                })
                            },{
                                xtype: 'gridcolumn',
                                header: '单价',                                
                                width: 80,                                
                                dataIndex: 'dj',
                                editor: new Ext.form.NumberField({
                                    allowBlank: false,
                                    allowNegative: false
                                })
                            },{
                                xtype: 'gridcolumn',
                                header: '批号',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,                                
                                dataIndex: 'wlph'
                            }
                        ])
                    }
	            ]
	        }
	    ];
	    
	    this.buttons = [
	        {
	        	text:'提交',
	        	handler: function(){
		        	var jsonBegin = '{"rows":[';
			    	var jsonEnd = ']}';			    	
			    	if(0==this.store.getCount()){
			    		Ext.Msg.alert('提示','请选择申请单！');
			    		return;
			    	}
			    	
			    	for(var i=0;i<this.store.getCount();i++){
			    		var record = this.store.getAt(i);
			    		/*if(0==record.get('sfjy')){
			    			Ext.Msg.alert('提示','不能对免检产品，进行送检！');
				    		return;
			    		}*/
			    		var sfjy = record.get('sfjy');
			    		var FInterID = record.get("FInterID");
			    		var FEntryID = record.get("FEntryID");
			    		var sjsl = record.get('sjsl');
			    		var fssl = record.get('fssl');
			    		var ysjsl = record.get('ysjsl');
			    		var dj = record.get('dj');
			    		if(''==sjsl||0==sjsl){
			    			Ext.Msg.alert('提示','送检数量为0，请检查！');
				    		return;
			    		}
			    		if(''==dj||0==dj){
			    			Ext.Msg.alert('提示','单价必须填写！');
				    		return;
			    		}
			    		if(sjsl+ysjsl>fssl){
			    			Ext.Msg.alert('提示','送检数量大于转出数量，请检查！');
				    		return;
			    		}
			    		jsonBegin += '{"FInterID":"'+FInterID+'","FEntryID":"'+FEntryID+'","FQty":"'+sjsl+'","sfjy":"'+sfjy+'","dj":"'+dj+'"}';
			    		if(i<this.store.getCount()-1)
			    			jsonBegin += ',';
			    	}
			    	jsonBegin+=jsonEnd;
			    	
			    	var mask = new Ext.LoadMask('list_wwzc_edit_grid', {
			    		msg : '正在处理。。。'
			    	});
			    	mask.show();
			    	
			    	Ext.Ajax.request({
			    		url:'kingdee.do?cmd=form_wwjysqd',
			    		params:{resp:jsonBegin},
			    		method:'POST',
			    		success:function(response, options){
			    			if(mask)
			    				 mask.hide();
			    			var responseArray = Ext.util.JSON.decode(response.responseText); 
			    			var resp = responseArray.result[0];
			    			 if(resp.success==true){
			    				 if(resp.msg)
			    					 Ext.Msg.alert('提示','处理完毕!',function(){
			    						 this.close();
			    						 this.parentStore.reload();
			    					 },this);
			    			 }else{
			    				 Ext.Msg.alert('提示','服务器没有响应，请稍后再试！');
			    			 }
			    		},
			    		scope:this
			    	});
        		},
        		scope: this
	        },{
	        	text:'取消',
	        	handler: function(){
        			this.close();
        		},
        		scope: this
	        }            
	    ];
	    WwjysqdFormWindow.superclass.initComponent.call(this);
	}
});