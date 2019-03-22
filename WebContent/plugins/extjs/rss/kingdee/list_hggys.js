HggysListPanel = Ext.extend(Ext.Panel, {
	layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    createForm:function(){
		if(!this.fp||null==this.fp){
			this.fp = new HggysFormPanel({
				supplierStore : this.supplierStore,
				operStore : this.operStore
			});
			if(0!=this.itemId){
				this.fp.form.findField("itemName").setValue(this.itemName);
				this.fp.form.findField("itemId").setValue(this.itemId);
			}
		}
		if(!this.win||null==this.win){
			this.win = new Ext.Window({
				width:360,
				height:200,
				layout:'fit',
				buttonAlign:"center",
				title:'编辑供应商信息',
				modal:true,
				shadow:true,
				closeAction:"close",
				items:[this.fp],
				buttons:[{text:"保存",
						  handler:function(){
							this.fp.form.submit({
								waitMsg:'正在保存。。。',
						        url:'kingdee.do?cmd=save_hggys',
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
			this.win.on('close',function(){this.fp=null;this.win=null;},this);
		}
	},
	add_gys:function(){		
		if(this.itemId==0||this.itemId==-1)
			Ext.Msg.alert("提示","请先选择物料!");
		else{
			this.createForm();
			this.win.show();
		}
	},
	edit_gys:function(){
		var record=this.gp.getSelectionModel().getSelected();
		if(!record){
			Ext.Msg.alert("提示","请先选择要编辑的行!");
			return;
		}
			
		this.createForm();
		this.win.show();
		this.fp.form.loadRecord(record);		
		//============对combo类型的字段赋值==============//
		this.fp.form.findField("itemName").setValue(record.get("itemName"));
		this.fp.form.findField("itemId").setValue(record.get("itemId"));
		this.fp.form.findField("supplierId").setValue(record.get("supplierId"));
		this.fp.form.findField("operId").setValue(record.get("operId"));
		
	},
    initComponent: function() {
    	
		this.store = new Ext.data.JsonStore({
			url: 'kingdee.do?cmd=list_hggys',
			root:"result",
			fields:["id","itemName","itemId","supplierId","code","name","checked","date","default","operId","operName"],
			listeners:{
				'beforeload': {fn:function(storeThis,option){
					storeThis.removeAll();
					storeThis.baseParams.itemId = this.itemId;					
				},scope:this}
			},
			baseParams:{pageSize:2000}
		});
		
		this.itemName='';
		this.itemId = 0;
		
		this.itemStore = new Ext.data.JsonStore({
			url: 'kingdee.do?cmd=list_item',
			root:"result",
			fields:["id","code","name"],
			baseParams:{pageSize:200}
		});
		
		this.supplierStore = new Ext.data.JsonStore({
			url: 'kingdee.do?cmd=list_supplier',
			root:"result",
			fields:["id","code","name"],
			baseParams:{pageSize:1000}
		});
		
		this.operStore = new Ext.data.JsonStore({
			url: 'kingdee.do?cmd=list_oper',
			root:"result",
			fields:["id","code","name"],
			baseParams:{pageSize:1000}
		});
		
		this.queryfield = new Ext.app.SearchField({
            store: this.store,
            width:220,
            emptyText:'请输入关键字...',
            scope: this,
            listeners:{
            	'change': {fn:function(fieldThis,newValue,oldValue,eOpts){
					this.itemId = 0;					
				},scope:this}
            }
        });
		
		this.root = new Ext.tree.AsyncTreeNode({
			text: '组织架构',
            id: '0',                      //分别表示机构编号、部门编号   	
			expanded:true
		});
		
		this.sm = new Ext.grid.CheckboxSelectionModel({
	    	dataIndex:'select',
	    	singleSelect:false
	    });
		
        this.items = [
            {
                xtype: 'panel',
                title: '树形目录',
                region: 'west',
                width: 200,
                margins: '0 0 0 0',
                split: true,
                collapsible: true,
                autoScroll:true,
                items: [
					{
					    xtype: 'combo',
					    width: 200,
					    name: 'itemselect',
					    valueField: 'id',
					    displayField: 'code',
					    emptyText: '请选择物料...',
					    mode: 'remote',
					    store: this.itemStore,
					    triggerAction: 'all',
					    listeners: {
							'select':{fn:function(combo,newValue,oldValue){														
								this.itemId = newValue.data.id;
								this.itemName = newValue.data.name;
								this.tree.getRootNode().id = this.itemId;  //重置组织架构tree重置
								this.tree.getRootNode().setText("("+newValue.data.code+")"+newValue.data.name);
								this.tree.getLoader().load(this.tree.getRootNode());
								this.store.load();								  //加载新的机构职员
							},scope:this}
						}
					},				
                    {
                        xtype: 'treepanel',
                        id: 'itemtreepanel',	
                        border: false,
                        root: {
                            text: '物料',
                            id: '0'                      //分别表示机构编号、部门编号
                        },
                        loader: {                        
                            url: 'kingdee.do?cmd=tree_item',                            
                            listeners: {
                        		'beforeload':{fn:function(loader,node){
	    							loader.baseParams.itemId=node.id;	    							
	    						},scope:this}
                        	}
                        },
                        listeners: {                        	
                        	'click':{fn:function(node,e){
	                			this.itemId = node.id;	                			
	                			this.itemName = node.text;
	                			this.queryfield.onTrigger1Click();
	                			if(0!=this.itemId)                     //避免用户点击根节点，因为根节点为机构，node.id为*,0，这样就会过滤掉所有职员信息
	                				this.store.load();                       //刷新右边的内容
	                		},scope:this}
                        }
                    }
                ]
            },
            {
                xtype: 'panel',
                region: 'center',
                margins: '0 0 0 0',
                layout: 'fit',
                items: [
                    {
                        xtype: 'editorgrid',
                        clicksToEdit:1,
                        sm: this.sm,
                        border: false,
                        loadMask: true,
                        trackMouseOver: false,
                        animCollapse: false,
                        store: this.store,
                        sm: this.sm,
                        viewConfig: {
                            forceFit: true
                        },                        
                        id: 'hggysgrid',
                        columns: [
                            this.sm,
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'code',
                                header: '代码',
                                sortable: true,
                                width: 60
                                //editor: new Ext.form.TextField()
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '所属物料',
                                sortable: false,
                                width: 200,
                                dataIndex: 'itemName'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '供应商',
                                sortable: false,
                                width: 200,
                                dataIndex: 'name'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '审核',
                                sortable: true,
                                width: 100,
                                dataIndex: 'checked',
                                renderer:function(value){if(value){return '是';}else{return '否';}}
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '日期',
                                sortable: true,
                                hidden: true,
                                width: 100,
                                dataIndex: 'date'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '默认',
                                sortable: true,
                                width: 60,
                                dataIndex: 'default',
                                renderer:function(value){if(value){return '是';}else{return '否';}}
                            }
                        ],
                        tbar: {
                            xtype: 'toolbar',
                            items: [{
	                                xtype: 'spacer',
	                                width: 6
                            	},
                            	{
	                                xtype: 'spacer',
	                                width: 6
                            	},
                            	{
                                    xtype: 'button',
                                    text: '添加',
                                    pressed: true,           
                                    handler: this.add_gys,
                                    scope:this
                                },
                                {
                                    xtype: 'spacer',
                                    width: 3
                                },
                                {
                                    xtype: 'button',
                                    text: '修改',
                                    pressed: true,           
                                    handler: this.edit_gys,
                                    scope:this
                                },
                                {
                                    xtype: 'spacer',
                                    width: 3
                                },
                                {
                                    xtype: 'spacer',
                                    width: 3
                                },
                                {
                                    xtype: 'button',
                                    text: '刷新',
                                    pressed: true,           
                                    handler: function(){this.store.reload();},
                                    scope:this
                                },
                                {
                                    xtype: 'spacer',
                                    width: 3
                                },'-',{
                	            	text: '审核',
                	            	pressed: true,
                	            	handler: function(){
                	            		var jsonBegin = '{"rows":[';
                				    	var jsonEnd = ']}';
                	            		
                	            		var records = this.sm.getSelections();
                	            		if(0==records.length){
                				    		Ext.Msg.alert('提示','请选择申请单！');
                				    		return;
                				    	}
                	            		for(var i=0;i<records.length;i++){
                				    		var record = records[i];
                				    		var id = record.get("id");
                				    		jsonBegin += '{"id":"'+id+'","checked":"true"}';
                				    		if(i<(records.length-1))
                				    			jsonBegin += ',';
                				    	}
                	            		jsonBegin+=jsonEnd;
                	            		
                	            		var mask = new Ext.LoadMask('hggysgrid', {
                				    		msg : '正在处理。。。'
                				    	});
                				    	mask.show();
                				    	
                				    	Ext.Ajax.request({
                				    		url:'kingdee.do?cmd=check_hggys',
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
                				    						 this.store.load();
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
                                    xtype: 'spacer',
                                    width: 3
                                },{
                	            	text: '反审核',
                	            	pressed: true,
                	            	handler: function(){
                	            		var jsonBegin = '{"rows":[';
                				    	var jsonEnd = ']}';
                	            		
                	            		var records = this.sm.getSelections();
                	            		if(0==records.length){
                				    		Ext.Msg.alert('提示','请选择申请单！');
                				    		return;
                				    	}
                	            		for(var i=0;i<records.length;i++){
                				    		var record = records[i];
                				    		var id = record.get("id");                				    				
                				    		jsonBegin += '{"id":"'+id+'","checked":"false"}';
                				    		if(i<(records.length-1))
                				    			jsonBegin += ',';
                				    	}
                	            		jsonBegin+=jsonEnd;
                	            		
                	            		var mask = new Ext.LoadMask('hggysgrid', {
                				    		msg : '正在处理。。。'
                				    	});
                				    	mask.show();
                				    	
                				    	Ext.Ajax.request({
                				    		url:'kingdee.do?cmd=check_hggys',
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
                				    						 this.store.load();
                				    					 },this);
                				    			 }else{
                				    				 Ext.Msg.alert('提示','服务器没有响应，请稍后再试！');
                				    			 }
                				    		},
                				    		scope:this
                				    	});
                	            	},
                	            	scope: this
                	            },'->','查找: ', ' ',
               		         	this.queryfield
                            ]
                        },
                        bbar: {
                            xtype: 'paging',
                            pageSize: 2000,
                            store: this.store,
                            displayInfo: true,
                            displayMsg: '共{2}条记录，当前第 {0}条 到 {1}条',
                            emptyMsg: '没有找到记录'
                        }
                    }
                ]
            }
        ];
        HggysListPanel.superclass.initComponent.call(this);
        
        this.on('render',function(t){        	
        	this.gp = Ext.getCmp('hggysgrid');
        	this.tree = Ext.getCmp('itemtreepanel');	
        	this.itemCombo = Ext.getCmp('itemselect');        	
			//this.store.load();
			//this.itemStore.load();
		},this);
    }
});
