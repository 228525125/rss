CpjysqdFormWindow = Ext.extend(Ext.Window,{
	layout: 'fit',
	closeAction:"close",
	modal:true,
	title:'请选择产品检验申请单',
	width:750,
	height:500,
	buttonAlign:'right',
	initComponent : function(){
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_cpjysqd',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FCheck','FCloseStatus','hywgb','FInterID','FEntryID','FBillNo','FCancellation','FICMOInterID','FICOMBillNo','FDate','cpdm','cpmc','cpgg','jldw','fssl','wlph','ywy','jysl'],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize,query:this.cpdm,style:1}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";		 	
		
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
	    
	    this.store.baseParams['status']='1';
	    
	    this.showtext = new Ext.form.TextField({
	    	width:40,	
	    	value:'0'
	    });
	 	
	    this.sm = new Ext.grid.CheckboxSelectionModel({
	    	dataIndex:'select',
	    	singleSelect:false,
	    	listeners:{
	    		'selectionchange': {fn:function(t){
	    			var value = 0;
	    			var records = t.getSelections();
	    			for(var i=0;i<records.length;i++){
			    		var record = records[i];
			    		var fssl = record.get('fssl');
			    		var jysl = record.get('jysl');
			    		value += (fssl-jysl)
	    			}
	    			this.showtext.setValue(value);
	    		},scope:this}
	    	}
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
	                    id:'form_cpjyd_grid',
	                    //margins: '3 3 3 3',
	                    view: new Ext.ux.grid.LockingGridView(),
	                    frame: false,
	                    store: this.store,
	                    border: false,
	                    loadMask: true, 
	                    sm: this.sm,
	                    tbar:['   ',{
        	            	text: '刷新',
        	            	handler: function(){
        	            		if(undefined!=this.store.baseParams['begin']&&undefined!=this.store.baseParams['end'])
        	            			this.store.load();
        	            		else
        	            			Ext.Msg.alert('提示','请选择时间段！');
        	            	},
        	            	scope: this
        	            },'-',this.beginfield,' 至 ',this.endfield,'-'
        	            ,'->','合计：',this.showtext],
	                    bbar: new Ext.PagingToolbar({
	        	            pageSize: pgSize,
	        	            store: this.store,
	        	            displayInfo: true,
	        	            displayMsg: '共{2}条记录，当前第 {0}条 到 {1}条',
	        	            emptyMsg: "没有找到记录"
	        	        }),                       
	                	colModel: new Ext.ux.grid.LockingColumnModel([
	                	    this.sm,
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
	                            header: '关闭',
	                            sortable: true,
	                            resizable: true,
	                            hidden: true,
	                            width: 40,
	                            dataIndex: 'FCloseStatus'
	                        },{
	                            xtype: 'gridcolumn',
	                            header: '审核',
	                            sortable: true,
	                            resizable: true,
	                            hidden: true,
	                            width: 40,
	                            dataIndex: 'FCheck'
	                        },{
	                            xtype: 'gridcolumn',
	                            header: '业务员',
	                            sortable: true,
	                            resizable: true,
	                            hidden: true,
	                            width: 40,
	                            dataIndex: 'ywy'
	                        },{
	                            xtype: 'gridcolumn',
	                            header: '物料代码',
	                            sortable: true,
	                            resizable: true,
	                            hidden:true,
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
	                            header: '批号',
	                            sortable: true,
	                            resizable: true,
	                            width: 60,
	                            dataIndex: 'wlph',
	                            renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
	                        },{
	                            xtype: 'gridcolumn',
	                            header: '送检数量',
	                            sortable: true,
	                            resizable: true,
	                            width: 60,
	                            dataIndex: 'fssl',
	                            renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
	                        },{
	                            xtype: 'gridcolumn',
	                            header: '检验数量',
	                            sortable: true,
	                            resizable: true,
	                            width: 60,
	                            dataIndex: 'jysl',
	                            renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
	                        },{
	                            xtype: 'gridcolumn',
	                            header: '剩余数量',
	                            sortable: true,
	                            resizable: true,
	                            width: 60,
	                            dataIndex: 'fssl',
	                            renderer:function(value,metadata,record){	                            
	                        		var jysl = record.get("jysl");	                        		
	                        		return (value-jysl);
	                        	}
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
			    	var records = this.sm.getSelections();
			    	if(0==records.length){
			    		Ext.Msg.alert('提示','请选择申请单！');
			    		return;
			    	}
			    	var tempph = this.cpph;
			    	tempph = tempph.replace('(','');
			    	tempph = tempph.replace(')','');
			    	for(var i=0;i<records.length;i++){
			    		var record = records[i];
			    		var FInterID = record.get("FInterID");
			    		var FEntryID = record.get("FEntryID");
			    		var fssl = record.get('fssl');
			    		var jysl = record.get('jysl');
			    		var wlph = record.get('wlph');
			    		var FICMOInterID = record.get('FICMOInterID');
			    		if(tempph!=wlph){
			    			Ext.Msg.alert('提示','请选择同一批次号的申请单！');
			    			return;
			    		}			    		
			    		jsonBegin += '{"FInterID":"'+FInterID+'","FEntryID":"'+FEntryID+'","FBillNo":"'+this.jydh+'","FQty":"'+(fssl-jysl)+'","FBatchNo":"'+wlph+'","FICMOInterID":"'+FICMOInterID+'"}';
			    		if(i<records.length-1)
			    			jsonBegin += ',';
			    	}
			    	jsonBegin+=jsonEnd;
			    	
			    	var mask = new Ext.LoadMask('form_cpjyd_grid', {
			    		msg : '正在处理。。。'
			    	});
			    	mask.show();
			    	
			    	Ext.Ajax.request({
			    		url:'kingdee.do?cmd=form_cpjyd',
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
			    	
			    	/*post({
			    		url:'kingdee.do?cmd=form_cpjyd',
			    		params:,
			    		loadmask:true,
			    		compId:'form_cpjyd_grid',
			    		waitText:'正在处理。。。'
			    	});*/
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
	    CpjysqdFormWindow.superclass.initComponent.call(this);
	}
});