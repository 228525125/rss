/**
 * 生产班次列表
 */
TaskPlanListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
  	createForm: function(){
		if(!this.fp||null==this.fp)
			this.fp = new TaskFormPanel();
		
		if(!this.win||null==this.win){			
			this.win = new Ext.Window({
				width:420,
				height:450,
				buttonAlign:"center",
				title:'排班表',
				modal:true,
				shadow:true,
				closeAction:"close",
				layout:'fit',
				items:[this.fp],
				buttons:[{text:"保存",
						  handler:function(){
							this.fp.form.submit({
									waitMsg:'正在保存。。。',
						            url:'taskPlan.do?cmd=save',
						            method:'POST',
						            success:function(form,action){
										if(null!=action.result&&action.result.msg)
							        		Ext.Msg.alert('提示',action.result.msg,function(){
							        			this.win.close();
									           	this.store.reload(); 
							        		},this);
										else{
								           	this.win.close();
								           	this.store.reload();
										}
						            },
						            scope:this
							});									
						  },
						  scope:this},
						  {text:"清空",
						   handler:function(){
							  this.fp.form.reset();
						   },
						   scope:this},
						  {text:"取消",
						   handler:function(){
							  this.win.close();  
						   },
						   scope:this}
						 ]					  
			});
						
			this.win.on('close',function(p){this.fp=null;this.win=null;},this);			
		}
	},
	createFileUpload: function(){
		/*if(!this.fileuploadformpanel||null==this.fileuploadformpanel)
			this.fileuploadformpanel = new FileUploadFormPanel();			

		if(!this.fileuploadwin||null==this.fileuploadwin){			
			this.fileuploadwin = new Ext.Window({
				width:250,
				height:110,
				buttonAlign:"right",
				title:'导入排程表',
				modal:true,
				shadow:true,
				closeAction:"close",
				layout:'fit',
				items:[this.fileuploadformpanel],
				buttons:[{text:"提交",
						  handler:function(){
							this.fileuploadformpanel.form.submit({									
									waitMsg:'正在上传。。。',
						            url:'fileUpload.do',
						            method:'POST',
						            success:function(form,action){
										Ext.Msg.alert('提示','上传完毕！',function(){
						        			this.fileuploadwin.close();
						        			this.store.load();
						        		},this);
						            },
						            scope:this
							});									
						  },
						  scope:this},						  
						  {text:"取消",
						   handler:function(){
							  this.fileuploadwin.close();  
						   },
						   scope:this}
						 ]					  
			});					
			this.fileuploadwin.on('close',function(p){this.fileuploadformpanel=null;this.fileuploadwin=null;},this);			
		}*/
		
		/*if(!this.fileuploadformpanel||null==this.fileuploadformpanel)
			this.fileuploadformpanel = new Ext.Panel({
				border:false,
				html:
			});*/
		
		if(!this.fileuploadwin||null==this.fileuploadwin){
			this.fileuploadwin = new Ext.Window({
				width:268,
				height:146,
				buttonAlign:"right",
				title:'导入排程表',
				modal:true,
				shadow:true,
				closeAction:"close",
				//layout:'fit',
				autoLoad:'fileUpload.do?cmd=iframe'
			});
		}
		
		this.fileuploadwin.on('close',function(p){this.fileuploadwin=null;},this);
	},
	edit_task: function(){
		var record=this.gp.getSelectionModel().getSelected();
		if(!record){
			Ext.Msg.alert("提示","请先选择要编辑的行!");
			return;
		}
		
		this.createForm();
		this.win.show();
		this.fp.form.loadRecord(record);
		this.fp.form.findField('equipment').setValue(record.get('equipment').id);
	},
    initComponent: function() {				
		
		this.store = new Ext.data.JsonStore({
			url:'taskPlan.do?cmd=list',
			root: 'result',
			totalProperty:"rowCount",
			fields:['id','date','equipment','workNo','workItemCode','workItemName','workItemModel','workUnit','workNumber','segment','beginDate','endDate','planDate','operator','remark','status'],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize},
	  		listeners:{
	  			'beforeload': {fn:function(t,o){
	  				t.removeAll();
	  			},scope:this}
	  		}
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
			name:'begin',
			value: new Date(),
			listeners:{
        		'change':{fn:function(t,valuenew,valueold){
        			this.store.baseParams['begin']=valuenew.format('Y-m-d');
        		},scope:this} 
        	}
		});
	    this.store.baseParams['begin']=this.beginfield.getValue().format('Y-m-d');
	    
	    this.beginsegment = new Ext.form.ComboBox({	        
	        hiddenName:'id',
	        valueField:'id',
	        displayField:'mc',
	        value:'早班',
	        width:60,
	        allowBlank:false,
	        mode:'local',
	     	triggerAction:'all',
	        forceSelection:true,
	        editable:false,
	        store:new Ext.data.Store({     
	            data:[['早班','早班'],['中班','中班'],['夜班','夜班']], 
	            autoLoad: true,
	            reader:new Ext.data.ArrayReader({}, [
	                  {name: 'id'},
	                  {name: 'mc'} 
				])
	        }),
	        listeners:{
        		'change':{fn:function(t,valuenew,valueold){
					this.store.baseParams['beginsegment']=valuenew;
        		},scope:this}
        	}
	    });
	    this.store.baseParams['beginsegment']=this.beginsegment.getValue();
	    
	    this.endsegment = new Ext.form.ComboBox({	        
	        hiddenName:'id',
	        valueField:'id',
	        displayField:'mc',
	        value:'夜班',
	        width:60,
	        allowBlank:false,
	        mode:'local',
	     	triggerAction:'all',
	        forceSelection:true,
	        editable:false,
	        store:new Ext.data.Store({     
	            data:[['早班','早班'],['中班','中班'],['夜班','夜班']], 
	            autoLoad: true,
	            reader:new Ext.data.ArrayReader({}, [
	                  {name: 'id'},
	                  {name: 'mc'} 
				])
	        }),
	        listeners:{
        		'change':{fn:function(t,valuenew,valueold){
					this.store.baseParams['endsegment']=valuenew;
        		},scope:this}
        	}
	    });
	    this.store.baseParams['endsegment']=this.endsegment.getValue();
	    
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
	    
	    
	    
	    this.status = new Ext.form.ComboBox({	        
	        hiddenName:'style',
	        valueField:'id',
	        displayField:'mc',
	        value:'',
	        width:60,
	        allowBlank:false,
	        mode:'local',
	     	triggerAction:'all',
	        forceSelection:true,
	        editable:false,
	        store:new Ext.data.Store({     
	            data:[['','全部'],['0','开工'],['1','未开工']], 
	            autoLoad: true,
	            reader:new Ext.data.ArrayReader({}, [
	                  {name: 'id'},
	                  {name: 'mc'} 
				])
	        }),
	        listeners:{
        		'change':{fn:function(t,valuenew,valueold){
					this.store.baseParams['status']=valuenew;
        		},scope:this}
        	}
	    });
	    this.store.baseParams['status']=this.status.getValue();
		
        this.items = [            
            {
                xtype: 'panel',
                region: 'center',
                layout: 'border',
                border: false,
                items: [
                    {
                        xtype: 'grid',
                        id: 'taskgrid',
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
        	            },'-',{
        	            	text: '添加',
        	            	handler: function(){
	        	            	this.createForm();	        	            	
	        	        		this.win.show();
        	            	},
        	            	scope: this
        	            },'-',{
        	            	text: '修改',
        	            	handler: function(){
	        	            	this.edit_task();
        	            	},
        	            	scope: this
        	            },'-',{
        	            	text: '打印',
        	            	handler: function(){	        	            	
	        	            	var begin = '&begin='+this.beginfield.getValue().format('Y-m-d');
	        	            	var end = '&end='+this.endfield.getValue().format('Y-m-d');
	        	            	var pageS = '&pageSize='+999;
	        	            	var orderBy = '';
	        	            	var orderType = '';
	        	            	var beginsegment = '&beginsegment='+this.beginsegment.getValue();
	        	            	var endsegment = '&endsegment='+this.endsegment.getValue();
	        	            	if(undefined!=this.store.sortInfo){
	        	            		orderBy = '&orderBy='+this.store.sortInfo.field;
	        	            		orderType = '&orderType='+this.store.sortInfo.direction;
	        	            	}
	        	            	var href = "taskPlan.do?cmd=print"+begin+end+pageS+orderBy+orderType+beginsegment+endsegment;
	        	        　　		window.open(href,"newwindow","height=800, width=600, toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes");
        	            	},
        	            	scope: this
        	            },'-',{
        	            	text: '导入',
        	            	handler: function(){
	        	            	this.createFileUpload();		        	            	
	        	        		this.fileuploadwin.show();
        	            	},
        	            	scope: this
        	            },'-',{
        	            	text: '重置',
        	            	handler: function(){
        	            		this.beginfield.setValue('');
        	            		this.endfield.setValue('');
        	            		this.queryfield.setValue('');
        	            		this.store.baseParams = {};
        	            		this.store.baseParams['pageSize']=pgSize;
        	            	},
        	            	scope: this
        	            },/*'-',{    
        	                text: '关联信息',            
        	                handler: function(){if(this.bottompanel.isVisible())this.bottompanel.collapse(true); else this.bottompanel.expand(true);},
        	                scope:this
        	            },*/'-',/*this.status,'-',*/this.beginfield,/*this.beginsegment,*/' 至 ',this.endfield,/*this.endsegment,*/'-'
        	            ,'->','查找: ', ' ',
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
                                header: '单据日期',
                                sortable: true,
                                resizable: true,
                                //hidden: true,
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
                                header: '执行日期',
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
                                hidden: true,
                                width: 40,
                                dataIndex: 'status'
                            }
                        ]),
                        listeners: {
                    		'dblclick': {
                    			fn:function(e){
                    				this.edit_task();
                    			},scope:this
                    		}
                    	}
                    }                    
                ]
            }
        ];
        TaskPlanListPanel.superclass.initComponent.call(this);
        this.on('show',function(t){
        	this.gp = Ext.getCmp('taskgrid');
        },this);
    }
});
