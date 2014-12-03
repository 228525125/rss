/**
 * 生产任务达成率明细表
 */
ScrwdclListPanel = Ext.extend(Ext.Panel, {
    layout: 'fit',
    border: false,
  	autoScroll:true,
    initComponent: function() {
			
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_scrwdcl',
			root: 'result',
			totalProperty:"rowCount",
			fields:['djbh','djrq','jhrq','dhrq','wldm','wlmc','wlgg','jldw','fssl','aqkc','ddbh','ddjq'],
	  		remoteSort:true,
	  		baseParams:{pageSize:2000}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";		    
		
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
                        viewConfig:{forceFit:true},
                        bbar: new Ext.PagingToolbar({
            	            pageSize: 2000,
            	            store: this.store,
            	            displayInfo: true,
            	            displayMsg: '共{2}条记录，当前第 {0}条 到 {1}条',
            	            emptyMsg: "没有找到记录"
            	        }),                       
                    	colModel: new Ext.ux.grid.LockingColumnModel([
                    	    new Ext.grid.RowNumberer(),                                          			
                    	    {
                    	    	xtype: 'gridcolumn',
                    	    	header: '',
                    	    	sortable: true,
                    	    	resizable: true,
                    	    	width: 20,
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
                                dataIndex: 'djbh'
                            },{
                                xtype: 'gridcolumn',
                                header: '单据日期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'djrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '计划完工日期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'jhrq',
                                renderer:function(value,metadata,record){	       
	                        		var ddjq = record.get('ddjq');
	                    			if(undefined!=value&&null!=value&&undefined!=ddjq&&null!=ddjq){
	                    				var d1 = new Date(value.replace(/-/g,"/"));
	                    				var d2 = new Date(ddjq.replace(/-/g,"/"));
	                    				if(d1>d2){
	                    					return '<font color=red>'+value+'</font>';
	                    				}
	                    			}
	                        		return value;
	                    		}
                            },{
                                xtype: 'gridcolumn',
                                header: '送检日期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'dhrq',
                                renderer:function(value,metadata,record){	       
	                        		var ddjq = record.get('ddjq');
	                    			if(undefined!=value&&null!=value&&undefined!=ddjq&&null!=ddjq){
	                    				var d1 = new Date(value.replace(/-/g,"/"));
	                    				var d2 = new Date(ddjq.replace(/-/g,"/"));
	                    				if(d1>d2){
	                    					return '<font color=red>'+value+'</font>';
	                    				}
	                    			}
	                        		return value;
	                    		}
                            },{
                                xtype: 'gridcolumn',
                                header: '物料代码',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'wldm'
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
                                dataIndex: 'wlmc'
                            },
                            {
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
                                width: 40,
                                dataIndex: 'jldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '数量',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'fssl',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '安全库存',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'aqkc',
                                renderer:function(value,metadata,record){	                            	
	                        		return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '订单编号',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'ddbh'
                            },{
                                xtype: 'gridcolumn',
                                header: '订单交期',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'ddjq'/*,
                                renderer:function(value,metadata,record){	       
                            		var jhrq = record.get('jhrq');
                        			if(undefined!=value&&null!=value&&undefined!=jhrq&&null!=jhrq){
                        				var d1 = new Date(value.replace(/-/g,"/"));
                        				var d2 = new Date(jhrq.replace(/-/g,"/"));
                        				if(d1<d2){
                        					return '<font color=red>'+value+'</font>';
                        				}
                        			}
                            		return value;
                        		}*/
                            }
                        ])
                    }
                ]
            }
        ];
        ScrwdclListPanel.superclass.initComponent.call(this);
    }
});
