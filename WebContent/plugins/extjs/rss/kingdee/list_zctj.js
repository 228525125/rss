/**
 * 资产统计
 */
ZctjListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_zctj',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FID','FModel','FBrand','FName','FSeriesNumber','FQty','FDateOfManufacture','FDateOfBuy','FAssetID','FDepartment','FUser','FJobNumber','FNote','FIP','FMac','FDateOfApplication','FYear'],
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
	 	
	 	//var date1 = CurrentDateAddDay(-30);
	 	
	 	/*this.beginfield = new Ext.form.DateField({
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
	    this.store.baseParams['end']=this.endfield.getValue().format('Y-m-d');*/
		
        this.items = [            
            {
                xtype: 'panel',
                region: 'center',
                layout: 'border',
                border: false,
                items: [
                    {
                        xtype: 'grid',     
                        id: 'list_zctj_grid',
                        region: 'center',
                        margins: '3 3 3 3',
                        view: new Ext.ux.grid.LockingGridView(),
                        frame: false,
                        store: this.store,
                        loadMask: true,
                        tbar:['   ',/*this.beginfield,' 至 ',this.endfield,'-',*/
                        {
        	            	text: '刷新',
        	            	handler: function(){
        	            		this.store.load();
        	            	},
        	            	scope: this
        	            },
        	            '->','查找: ', ' ',this.queryfield],
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
                                header: 'ID',
                                resizable: true,
                                width: 30,
                                hidden: true,
                                dataIndex: 'FID'
                            },{
                                xtype: 'gridcolumn',
                                header: '资产编号',
                                resizable: true,
                                width: 90,
                                dataIndex: 'FAssetID'
                            },{
                                xtype: 'gridcolumn',
                                header: '型号',
                                resizable: true,                                
                                width: 100,
                                dataIndex: 'FModel'
                            },{
                                xtype: 'gridcolumn',
                                header: '品牌',
                                resizable: true,                                
                                width: 40,
                                hidden: true,
                                dataIndex: 'FBrand'
                            },{
                                xtype: 'gridcolumn',
                                header: '品名',
                                resizable: true,                                
                                width: 40,
                                dataIndex: 'FName'
                            },{
                                xtype: 'gridcolumn',
                                header: '序列号',
                                resizable: true,
                                width: 120,
                                dataIndex: 'FSeriesNumber'
                            },{
                                xtype: 'gridcolumn',
                                header: '数量',
                                resizable: true,
                                width: 30,
                                hidden: true,
                                dataIndex: 'FQty'
                            },{
                                xtype: 'gridcolumn',
                                header: '生产日期',
                                resizable: true,
                                width: 90,
                                dataIndex: 'FDateOfManufacture'
                            },{
                                xtype: 'gridcolumn',
                                header: '购买日期',
                                resizable: true,
                                width: 90,
                                dataIndex: 'FDateOfBuy'
                            },{
                                xtype: 'gridcolumn',
                                header: '部门',
                                resizable: true,
                                width: 60,
                                hidden:true,
                                dataIndex: 'FDepartment'
                            },{
                                xtype: 'gridcolumn',
                                header: '责任人',
                                resizable: true,
                                width: 60,
                                dataIndex: 'FUser'
                            },{
                                xtype: 'gridcolumn',
                                header: '工号',
                                resizable: true,
                                width: 60,
                                hidden:true,
                                dataIndex: 'FJobNumber'
                            },{
                                xtype: 'gridcolumn',
                                header: '备注',
                                resizable: true,
                                width: 100,
                                dataIndex: 'FNote'
                            },{
                                xtype: 'gridcolumn',
                                header: 'IP地址',
                                resizable: true,
                                width: 100,
                                dataIndex: 'FIP'
                            },{
                                xtype: 'gridcolumn',
                                header: 'Mac地址',
                                resizable: true,
                                width: 140,
                                dataIndex: 'FMac'
                            },{
                                xtype: 'gridcolumn',
                                header: '申请日期',
                                resizable: true,
                                width: 90,
                                dataIndex: 'FDateOfApplication'
                            },{
                                xtype: 'gridcolumn',
                                header: '年限',
                                resizable: true,
                                width: 30,
                                dataIndex: 'FYear'
                            }
                        ])
                    }
                ]
            }
        ];
        ZctjListPanel.superclass.initComponent.call(this);
        
        this.on('render',function(t){
        	this.grid = Ext.getCmp('list_zctj_grid');
        	this.store.load();
	    },this);
        this.on('show',function(t){
        	this.store.load();
	    },this);
        
    }
});
