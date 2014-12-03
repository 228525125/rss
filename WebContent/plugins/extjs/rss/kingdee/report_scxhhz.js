/**
 * 生产消耗汇总表报
 */
ScxhhzReportPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=report_scxhhz',
			root: 'result',
			totalProperty:"rowCount",
			fields:["cpdm","cpmc","cpgg","cpth","cpdw","byrk","wldm","wlmc","wlgg","wldw","tlsl","llsl","byll","blsl","bfsl","byxh","llxh","wldj","llxhje","llwwjgf","jgdj","fhck"],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";	
		
	    this.beginfield = new Ext.form.DateField({
        	xtype: 'datefield',
			emptyText: '请选择入库日期...',
			format:'Y-m-d',
			name:'beg',
			value: new Date(),
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
	        hiddenName:'status',
	        valueField:'id',
	        displayField:'mc',
	        value:'1',
	        width:150,
	        allowBlank:false,
	        mode:'local',
	     	triggerAction:'all',
	        forceSelection:true,
	        editable:false,
	        store:new Ext.data.Store({     
	            data:[['1','有成本对象，有入库'],['2','有成本对象，无入库'],['3','无成本对象']], 
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
                        id: 'report_scxhhz_grid',
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
        	            	text: '导出',
        	            	handler: function(){	        	            	        	            		
	        	            	var begin = '&begin='+this.beginfield.getValue().format('Y-m-d');
	        	            	var end = '&end='+this.endfield.getValue().format('Y-m-d');
	        	            	var pageS = '&pageSize='+9999;
	        	            	var sta = '&status='+this.status.getValue();
	        	            	var href = "kingdee.do?cmd=export_scxhhz"+begin+end+pageS+sta;	        	            	
	        	        　　			location.href = href;
        	            	},
        	            	scope: this
        	            },'-',{
        	            	text: '导出外协加工费',
        	            	handler: function(){	        	            	        	            		
	        	            	var begin = '&begin='+this.beginfield.getValue().format('Y-m-d');
	        	            	var end = '&end='+this.endfield.getValue().format('Y-m-d');
	        	            	var pageS = '&pageSize='+9999;
	        	            	var href = "kingdee.do?cmd=export_wwgxjgfhz"+begin+end+pageS;	        	            	
	        	        　　			location.href = href;
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
        	            }/*,'-',{    
        	                text: '关联信息',            
        	                handler: function(){if(this.bottompanel.isVisible())this.bottompanel.collapse(true); else this.bottompanel.expand(true);},
        	                scope:this
        	            }*/,'-',this.beginfield,' 至 ',this.endfield//,'-',this.status
        	            ],
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
                                header: '产品代码',
                                sortable: true,
                                resizable: true,                                
                                width: 80,
                                dataIndex: 'cpdm'
                            },{
                                xtype: 'gridcolumn',
                                header: '产品名称',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpmc'
                            },{
                                xtype: 'gridcolumn',
                                header: '产品规格',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '产品图号',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpth'
                            },{
                                xtype: 'gridcolumn',
                                header: '单位',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpdw'
                            },{
                                xtype: 'gridcolumn',
                                header: '入库数量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'byrk'
                            }/*,{
                                xtype: 'gridcolumn',
                                header: '加工单价',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'jgdj'
                            },{
                                xtype: 'gridcolumn',
                                header: '委外加工费',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'llwwjgf'
                            }*/,{
                                xtype: 'gridcolumn',
                                header: '物料代码',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'wldm'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料名称',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'wlmc'
                            },{
                                xtype: 'gridcolumn',
                                header: '规格',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'wlgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '单位',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'wldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '投料数量',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'tlsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '领料数量',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'llsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '本月领料',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'byll'
                            },{
                                xtype: 'gridcolumn',
                                header: '报废数量',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'bfsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '补料数量',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'blsl',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '理论消耗',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'llxh',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '单价',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'wldj',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '本月领料',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                hidden: true,
                                dataIndex: 'byxh',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '发货仓库',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'fhck',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            }
                        ])
                    }
                ]
            }
        ];
        ScxhhzReportPanel.superclass.initComponent.call(this);
    }
});
