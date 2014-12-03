/**
 * 销售出库汇总统计
 */
XsckhztjReportPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {	
		
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=report_xsckhztj',
			root: 'result',
			totalProperty:"rowCount",
			fields:['wldw','cpdm','cpmc','cpgg','cpth','jldw','fssl','wsdj','hsdj','xxs','hsje'],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize},
	  		listeners:{
        		'beforeload': function(t,options){
		  			var grid = Ext.getCmp('report_xsckhztj_grid');
		  			var hz = t.baseParams['huizong'];
		  			if('1'==hz){
		  				grid.colModel.setHidden(1, true);
		  				grid.colModel.setHidden(2, true);
		  				grid.colModel.setHidden(3, true);
		  				grid.colModel.setHidden(4, true);
		  				grid.colModel.setHidden(5, true);
		  				grid.colModel.setHidden(7, true);
		  			}else if('2'==hz){
		  				grid.colModel.setHidden(1, false);
		  				grid.colModel.setHidden(2, false);
		  				grid.colModel.setHidden(3, false);
		  				grid.colModel.setHidden(4, false);
		  				grid.colModel.setHidden(5, false);
		  				grid.colModel.setHidden(7, false);
		  			}
        		}
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
	    
	    this.huizong = new Ext.form.ComboBox({	        
	        hiddenName:'style',
	        valueField:'id',
	        displayField:'mc',
	        value:'2',
	        width:100,
	        allowBlank:false,
	        mode:'local',
	     	triggerAction:'all',
	        forceSelection:true,
	        editable:false,
	        store:new Ext.data.Store({     
	            data:[['1','客户'],['2','客户 + 产品']], 
	            autoLoad: true,
	            reader:new Ext.data.ArrayReader({}, [
	                  {name: 'id'},
	                  {name: 'mc'} 
				])
	        }),
	        listeners:{
        		'change':{fn:function(t,valuenew,valueold){	    	
					this.store.baseParams['huizong']=valuenew;
        		},scope:this}
        	}
	    });
	    this.store.baseParams['huizong']=this.huizong.getValue();
		
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
        	            		if(undefined!=this.store.baseParams['begin']&&undefined!=this.store.baseParams['end'])
        	            			this.store.load();
        	            		else
        	            			Ext.Msg.alert('提示','请选择时间段！');
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
        	            },'-','汇总依据：',this.huizong,'-',this.beginfield,' 至 ',this.endfield,'->','查找: ', ' ',
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
                                header: '客户',
                                sortable: true,
                                resizable: true,
                                width: 150,
                                locked: true, 
                                dataIndex: 'wldw'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '产品代码',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpdm'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '产品名称',
                                sortable: true,
                                resizable: true,
                                width: 150,
                                renderer:function(value,metadata,record){
	          		    	  		return value;
	          		      		},
                                dataIndex: 'cpmc'
                            },
                            {
                                xtype: 'gridcolumn',
                                header: '产品规格',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'cpgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '图号',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpth'
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
                                dataIndex: 'fssl'
                            }/*,{
                                xtype: 'gridcolumn',
                                header: '含税单价',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'hsdj'
                            },{
                                xtype: 'gridcolumn',
                                header: '税额',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'xxs'
                            },{
                                xtype: 'gridcolumn',
                                header: '含税金额',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'hsje'
                            }*/
                        ])
                    }
                ]
            }
        ];
        XsckhztjReportPanel.superclass.initComponent.call(this);
    }
});
