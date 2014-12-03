/**
 * 图号查询
 */
ThcxListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_thcx',
			root: 'result',
			totalProperty:"rowCount",
			fields:['id','gsth','cpmc','khth','cpcz','sslb','rq','lc'],
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
	 	
	 	//var date1 = CurrentDateAddDay(-30);
	 	
	 	this.beginfield = new Ext.form.DateField({
        	xtype: 'datefield',			
			emptyText: '请选择...',
			format:'Y-m-d',
			name:'beg',
			value: '2010-02-01',
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
                        id: 'list_thcx_grid',
                        region: 'center',
                        margins: '3 3 3 3',
                        view: new Ext.ux.grid.LockingGridView(),
                        frame: false,
                        store: this.store,
                        loadMask: true,
                        tbar:['   ',/*this.beginfield,' 至 ',this.endfield,'-',*/
                        {
        	            	text: '添加',
        	            	handler: function(){
        	            		this.win = new ThcxFormWindow();
        	            		this.win.posturl = 'kingdee.do?cmd=insert_thcx';
        	            		this.win.show();
        	            		this.win.on('close',function(){this.store.load();},this);
        	            	},
        	            	scope: this
        	            },'-',
        	            {
        	            	text: '修改',
        	            	handler: function(){
        	            		
        	            		var record=this.grid.getSelectionModel().getSelected();
        	            		if(!record){
        	        				Ext.Msg.alert("提示","请先选择要编辑的行!");
        	        				return;
        	        			}
        	            		
        	            		this.win = new ThcxFormWindow();
        	            		this.win.posturl = 'kingdee.do?cmd=update_thcx';
        	            		this.win.show();
        	            		var gsth = this.win.fp.form.findField('field_gsth');
        	            		gsth.setDisabled(true);
        	            		this.win.on('close',function(){this.store.load();},this);
        	            		
        	            		this.win.fp.form.loadRecord(record);
        	            	},
        	            	scope: this
        	            },
        	            '-',{
        	            	text: '刷新',
        	            	handler: function(){
        	            		this.store.load();
        	            	},
        	            	scope: this
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
                                header: '产品名称',
                                resizable: true,
                                width: 120,
                                dataIndex: 'cpmc',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '公司图号',
                                resizable: true,                                
                                width: 100,
                                dataIndex: 'gsth'
                            },{
                                xtype: 'gridcolumn',
                                header: '客户图号',
                                resizable: true,                                
                                width: 100,
                                dataIndex: 'khth'
                            },{
                                xtype: 'gridcolumn',
                                header: '产品材质',
                                resizable: true,                                
                                width: 80,
                                dataIndex: 'cpcz'
                            },{
                                xtype: 'gridcolumn',
                                header: '所属类别',
                                resizable: true,
                                width: 80,
                                dataIndex: 'sslb'
                            },{
                                xtype: 'gridcolumn',
                                header: '日期',
                                resizable: true,
                                width: 80,
                                dataIndex: 'rq'
                            },{
                                xtype: 'gridcolumn',
                                header: '流程',
                                resizable: true,
                                width: 500,
                                dataIndex: 'lc'
                            }
                        ])
                    }
                ]
            }
        ];
        ThcxListPanel.superclass.initComponent.call(this);
        
        this.on('render',function(t){
        	this.grid = Ext.getCmp('list_thcx_grid');
	    },this);
        this.on('show',function(t){
        	this.store.load();
	    },this);
        
    }
});
