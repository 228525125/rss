/**
 * 生产消耗汇总表报
 */
ScrwWlxhListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_scrw_wlxh',
			root: 'result',
			totalProperty:"rowCount",
			fields:["djbh","djrq","cpdm","cpmc","cpgg","cpph","jhsl","sqsl","hgsl","bhgsl","rksl","wldm","wlmc","wlgg","dwyl","llsl","bfsl","tlsl","zzpsl","djzt","gfsl","lfsl","hbsl","jhtlsl","ddbh","jhrq","ddsl"],
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
	 	
	 	var date1 = CurrentDateAddDay(-60);
	 	
	    this.beginfield = new Ext.form.DateField({
        	xtype: 'datefield',
			emptyText: '请选择入库日期...',
			format:'Y-m-d',
			name:'beg',
			value: date1,
			listeners:{
        		'change':{fn:function(t,valuenew,valueold){
        			this.store.baseParams['begin']=valuenew.format('Y-m-d');
        		},scope:this} 
        	}
		});
	    this.store.baseParams['begin']=this.beginfield.getValue().format('Y-m-d');
	    
	    this.endfield = new Ext.form.DateField({
			xtype: 'datefield',			
			emptyText: '请选择入库日期...',
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
	        value:'0',
	        width:60,
	        allowBlank:false,
	        mode:'local',
	     	triggerAction:'all',
	        forceSelection:true,
	        editable:false,
	        store:new Ext.data.Store({     
	            data:[['0','全部'],['1','在制']], 
	            autoLoad: true,
	            reader:new Ext.data.ArrayReader({}, [
	                  {name: 'id'},
	                  {name: 'mc'} 
				])
	        }),
	        listeners:{
        		'change':{fn:function(t,valuenew,valueold){
					this.store.baseParams['style']=valuenew;
        		},scope:this}
        	}
	    });
	    this.store.baseParams['style']=this.status.getValue();
		
        this.items = [            
            {
                xtype: 'panel',
                region: 'center',
                layout: 'border',
                border: false,
                items: [
                    {
                        xtype: 'grid',
                        id: 'list_scrw_wlxh_grid',
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
        	            },'-',this.status,'-',this.beginfield,' 至 ',this.endfield
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
                            {
                                xtype: 'gridcolumn',
                                header: '任务单号',
                                resizable: true,                                
                                width: 100,
                                dataIndex: 'djbh'
                            },{
                                xtype: 'gridcolumn',
                                header: '状态',
                                resizable: true,
                                width: 40,
                                dataIndex: 'djzt',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '日期',
                                resizable: true,                                
                                width: 80,
                                dataIndex: 'djrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '产品代码',
                                resizable: true,                                
                                width: 80,
                                dataIndex: 'cpdm'
                            },{
                                xtype: 'gridcolumn',
                                header: '产品名称',
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpmc'
                            },{
                                xtype: 'gridcolumn',
                                header: '产品规格',
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '批号',
                                resizable: true,
                                width: 60,
                                dataIndex: 'cpph'
                            },{
                                xtype: 'gridcolumn',
                                header: '计划',
                                resizable: true,
                                width: 40,
                                dataIndex: 'jhsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '申请',
                                resizable: true,
                                width: 40,
                                dataIndex: 'sqsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '合格',
                                resizable: true,
                                width: 40,
                                dataIndex: 'hgsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '不合格',
                                resizable: true,
                                width: 60,
                                dataIndex: 'bhgsl'
                            }/*,{
                                xtype: 'gridcolumn',
                                header: '工废',
                                resizable: true,
                                width: 40,
                                dataIndex: 'gfsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '料废',
                                resizable: true,
                                width: 40,
                                dataIndex: 'lfsl'
                            }*/,{
                                xtype: 'gridcolumn',
                                header: '入库',
                                resizable: true,
                                width: 40,
                                dataIndex: 'rksl'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料代码',
                                resizable: true,
                                width: 80,
                                dataIndex: 'wldm'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料名称',
                                resizable: true,
                                width: 80,
                                dataIndex: 'wlmc'
                            },{
                                xtype: 'gridcolumn',
                                header: '规格',
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'wlgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '单位用量',
                                resizable: true,
                                width: 40,
                                dataIndex: 'dwyl'
                            },{
                                xtype: 'gridcolumn',
                                header: '计划',
                                resizable: true,
                                width: 40,
                                dataIndex: 'jhtlsl'
                                /*renderer:function(value,metadata,record){
                            		var jhsl = record.get('jhsl');
	                            	return value*jhsl;
	                        	}*/
                            },{
                                xtype: 'gridcolumn',
                                header: '领料',
                                resizable: true,
                                width: 40,
                                dataIndex: 'llsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '报废',
                                resizable: true,
                                width: 40,
                                dataIndex: 'bfsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '退料',
                                resizable: true,
                                width: 40,
                                dataIndex: 'tlsl',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '在制品',
                                resizable: true,
                                width: 60,
                                dataIndex: 'zzpsl',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '汇报',
                                resizable: true,
                                width: 40,
                                hidden: true,
                                dataIndex: 'hbsl',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '销售订单号',
                                resizable: true,
                                width: 110,
                                dataIndex: 'ddbh'
                            },{
                                xtype: 'gridcolumn',
                                header: '交货日期',
                                resizable: true,
                                width: 80,
                                dataIndex: 'jhrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '订单数量',
                                resizable: true,
                                width: 100,
                                dataIndex: 'ddsl'
                            }
                        ])
                    }
                ]
            }
        ];
        ScrwWlxhListPanel.superclass.initComponent.call(this);
    }
});
