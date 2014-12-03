/**
 * 生产任务单列表未入库
 */
WorkPlanPortalListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    title:'生产任务单完工提醒',
    border: false,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=portal_list_scrw',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FStatus','FInterID','FBillNo','cpdm','cpmc','cpgg','cpph','jldw','jhsl','jhkgsj','jhwgsj','FType','xdrq','djrq','cpth','sfll','rksl','rkrq','sfbf','aqkc'],
	  		remoteSort:true,
	  		baseParams:{pageSize:500}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";	
	 	
		this.queryfield = new Ext.app.SearchField({
            store: this.store,
            width:220,
            emptyText:'请输入关键字...',
            scope: this
        });
		
		var cd = new Date();
		
		this.beginfield = new Ext.form.DateField({			
			format:'Y-m-d',
			name:'beg',
			value: new Date(cd.getTime()-1000*60*60*24*180)
		});
		this.store.baseParams['begin']=this.beginfield.getValue().format('Y-m-d');
		
	    this.endfield = new Ext.form.DateField({			
			format:'Y-m-d',
			name:'end',
			value: new Date()
		});
	    this.store.baseParams['end']=this.endfield.getValue().format('Y-m-d');
	    
	    this.store.load();
		
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
                        margins: '3 3 3 3',
                        view: new Ext.ux.grid.LockingGridView(),
                        frame: false,
                        store: this.store,
                        loadMask: true,
                        tbar:['   ',{
        	            	text: '刷新',
        	            	handler: function(){
        	            		this.store.load();
        	            	},
        	            	scope: this
        	            },'->','查找: ', ' ',
        		        this.queryfield],
                    	colModel: new Ext.ux.grid.LockingColumnModel([
                            new Ext.grid.RowNumberer(),
                            {
                    	    	xtype: 'gridcolumn',
                    	    	header: '',
                    	    	sortable: true,
                    	    	resizable: true,
                    	    	width: 26,
                                dataIndex: 'aqkc',
                                renderer:function(value,metadata,record){
	                	    		var aqkc = record.get('aqkc');
	                	    		if(0<aqkc)
	          		    	  			return '<img border=0 src="images/rss/bei.gif" width=15 height=15/>';
	                	    		else
	                	    			return '';
	          		      		}
                    	    },{
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
                                hidden: true,
                                width: 80,
                                dataIndex: 'djrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '开工时间',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'jhkgsj'
                            },{
                                xtype: 'gridcolumn',
                                header: '完工时间',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'jhwgsj',
                                renderer:function(value,metadata,record){	                        		
	                        		var year = value.substring(0,4);
	                        		var month = value.substring(5,7);
	                        		var day = value.substring(8,10);
	                        		var date = new Date();
	                        		date.setFullYear(year, (month-1), day);
	                        		var today = new Date();
	                            	var jhsl = record.get('jhsl');
	                            	var rksl = record.get('rksl');	                            		                            	
	                        		if(jhsl>rksl&&(date.getTime()+1000*60*60*24)<today.getTime())	                        			
	                        			return '<font color="red">'+value+'</font>';
	                        		else	          		    	  			
	                        			return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '物料代码',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'cpdm'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料名称',
                                sortable: true,
                                resizable: true,
                                width: 150,
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
                                header: '批号',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                hidden: true,
                                dataIndex: 'cpph'
                            },{
                                xtype: 'gridcolumn',
                                header: '单位',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'jldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '计划数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'jhsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '入库数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'rksl'
                            },{
                                xtype: 'gridcolumn',
                                header: '安全库存',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 60,
                                dataIndex: 'aqkc',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            }
                        ])
                    }
                ]
            }
        ];
        WorkPlanPortalListPanel.superclass.initComponent.call(this);
    }
});
