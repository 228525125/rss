/**
 * 生产消耗表报
 */
WorkConsumeReportPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=report_scxh',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FBillNo','FDate','FStatus','cpdm','cpmc','cpgg','cpth','cpdw','cpph','jhsl','wldm','wlmc','wlgg','wldw','tlsl','llsl','blsl','bfsl','rksl','llxh','byll','byrk'],
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
	            data:[['','全部'],['0','计划'],['5','确认'],['1','下达'],['3','结案']], 
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
                        id: 'report_scxh_grid',
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
	        	            	var orderBy = '';
	        	            	var orderType = '';
	        	            	if(undefined!=this.store.sortInfo){
	        	            		orderBy = '&orderBy='+this.store.sortInfo.field;
	        	            		orderType = '&orderType='+this.store.sortInfo.direction;
	        	            	}
	        	            	var q = '&query='+this.queryfield.getValue();
	        	            	var href = "kingdee.do?cmd=export_scxh"+begin+end+pageS+orderBy+orderType+encodeURI(q);	        	            	
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
        	            }*/,'-',this.status,'-',this.beginfield,' 至 ',this.endfield,'-'
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
                                header: '单据编号',
                                sortable: true,
                                resizable: true,
                                width: 100,
				hidden : true,
                                dataIndex: 'FBillNo',
                                renderer:function(value,metadata,record){
                            		var grid = Ext.getCmp('report_scxh_grid');
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
                                hidden : true,
                                width: 80,
                                dataIndex: 'FDate',
                                renderer:function(value,metadata,record){
	                        		var grid = Ext.getCmp('report_scxh_grid');
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
                                header: '单据状态',
                                sortable: true,
                                resizable: true,
				hidden : true,
                                width: 60,
                                dataIndex: 'FStatus',
                                renderer:function(value,metadata,record){
	                        		var grid = Ext.getCmp('report_scxh_grid');
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
                                header: '产品代码',
                                sortable: true,
                                resizable: true,
                                hidden : true,
                                width: 100,
                                dataIndex: 'cpdm',
                                renderer:function(value,metadata,record){
	                        		var grid = Ext.getCmp('report_scxh_grid');
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
                                header: '产品名称',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'cpmc',
                                renderer:function(value,metadata,record){
	                        		var grid = Ext.getCmp('report_scxh_grid');
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
                                header: '规格',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpgg',
                                renderer:function(value,metadata,record){
	                        		var grid = Ext.getCmp('report_scxh_grid');
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
                                header: '图号',
                                sortable: true,
                                resizable: true,
                                hidden : true,
                                width: 60,
                                dataIndex: 'cpth',
                                renderer:function(value,metadata,record){
	                        		var grid = Ext.getCmp('report_scxh_grid');
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
                                header: '批号',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                hidden: true,
                                dataIndex: 'cpph',
                                renderer:function(value,metadata,record){
	                        		var grid = Ext.getCmp('report_scxh_grid');
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
                                header: '单位',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'cpdw',
                                renderer:function(value,metadata,record){
	                        		var grid = Ext.getCmp('report_scxh_grid');
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
                                header: '计划数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'jhsl',
                                renderer:function(value,metadata,record){
	                        		var grid = Ext.getCmp('report_scxh_grid');
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
                                header: '入库数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'rksl',
                                renderer:function(value,metadata,record){
	                        		var grid = Ext.getCmp('report_scxh_grid');
	                        		var s = grid.getStore();
	                        		var index = s.indexOf(record);
	                        		if(index>0){
	                        			var r = s.getAt(index-1);
	                        			if(record.get("FBillNo")==r.get("FBillNo"))
	                        				return '';
	                        			else{
	                        				if((record.get('jhsl')-record.get('bfsl'))>value)
	                        					return '<font color=red>'+value+'</font>';
	                        				else
	                        					return value;
	                        			}	                        				
	                        		}else{	                        			
	                        				if((record.get('jhsl')-record.get('bfsl'))>value)
	                        					return '<font color=red>'+value+'</font>';
	                        				else
	                        					return value;
	                        			
	                        		}	      		    	  				
	      		      			}
                            },{
                                xtype: 'gridcolumn',
                                header: '本月入库',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'byrk'
                            },{
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
                                width: 80,
                                dataIndex: 'tlsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '领料数量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'llsl',
                                renderer:function(value,metadata,record){
	                            	if(record.get('tlsl')>value)
	                					return '<font color=red>'+value+'</font>';
	                				else
	                					return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '报废数量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'bfsl',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '补料数量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'blsl',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '消耗',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'llxh',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '本月领料',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'byll',
                                renderer:function(value,metadata,record){
	                            	return value;
                            	}
                            }
                        ])
                    }
                ]
            }
        ];
        WorkConsumeReportPanel.superclass.initComponent.call(this);
    }
});
