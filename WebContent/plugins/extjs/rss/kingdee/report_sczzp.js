/**
 * 车间帐表
 */
SczzpReportPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {	
		
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=report_sczzp',
			root: 'result',
			totalProperty:"rowCount",
			fields:['wldm','wlmc','wlgg','jldw','qichu','touru','xiaohao','qimo'],
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
	    
	    this.qijian = new Ext.form.ComboBox({	        
	        hiddenName:'qijian',
	        valueField:'id',
	        displayField:'mc',
	        value:'2012-01',
	        width:100,
	        allowBlank:false,
	        mode:'local',
	     	triggerAction:'all',
	        forceSelection:true,
	        editable:false,
	        store:new Ext.data.Store({     
	            data:[['2013-01','2013-01'],['2013-02','2013-02'],['2013-03','2013-03'],['2013-04','2013-04'],['2013-05','2013-05'],['2013-06','2013-06'],['2013-07','2013-07'],['2013-08','2013-08'],['2013-09','2013-09'],['2013-10','2013-10'],['2013-11','2013-11'],['2013-12','2013-12']], 
	            autoLoad: true,
	            reader:new Ext.data.ArrayReader({}, [
	                  {name: 'id'},
	                  {name: 'mc'} 
				])
	        }),
	        listeners:{
        		'change':{fn:function(t,valuenew,valueold){	    	
					this.store.baseParams['qijian']=valuenew;
        		},scope:this}
        	}
	    });
	    this.store.baseParams['qijian']=this.qijian.getValue();
		
        this.items = [            
            {
                xtype: 'panel',
                region: 'center',
                layout: 'border',
                border: false,
                items: [
                    {
                        xtype: 'grid',
                        id: 'report_xsckhztj_grid',
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
        	            },'-','期间：',this.qijian,'->','查找: ', ' ',
        		         this.queryfield],
                        bbar: new Ext.PagingToolbar({
            	            pageSize: pgSize,
            	            store: this.store,
            	            displayInfo: true,
            	            displayMsg: '共{2}条记录，当前第 {0}条 到 {1}条',
            	            emptyMsg: "没有找到记录"
            	        }),
                    	colModel: new Ext.ux.grid.LockingColumnModel([
							new Ext.grid.RowNumberer(),
                            {
                                xtype: 'gridcolumn',
                                header: '物料代码',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'wldm'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '物料名称',
                                sortable: true,
                                resizable: true,
                                width: 180,
                                dataIndex: 'wlmc'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '物料规格',
                                sortable: true,
                                resizable: true,
                                width: 180,
                                renderer:function(value,metadata,record){
	          		    	  		return value;
	          		      		},
                                dataIndex: 'wlgg'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '单位',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'jldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '期初',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'qichu'
                            },{
                                xtype: 'gridcolumn',
                                header: '本期投入',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'touru'
                            },{
                                xtype: 'gridcolumn',
                                header: '本期领用',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'xiaohao'
                            },{
                                xtype: 'gridcolumn',
                                header: '期末结存',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'qimo'
                            }
                        ])
                    }
                ]
            }
        ];
        SczzpReportPanel.superclass.initComponent.call(this);
    }
});
