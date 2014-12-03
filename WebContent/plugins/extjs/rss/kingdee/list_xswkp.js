/**
 * 销售开票与未开票
 */
XswkpListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {	
		//报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_xswkp',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FOrderID','Fdate','FCheck','FCancellation','FBillNo','FHookStatus','FStatus','dwdm','wldw','ywy','cpmc','cpgg','jldw','fssl','cpdm','cpph','kpsl','hsdj','hsje'],
	  		remoteSort:true,
	  		baseParams:{pageSize:2000},
	  		listeners:{
        		'beforeload': function(t,options){
		  			var grid = Ext.getCmp('list_xswkp_grid');
		  			var hz = t.baseParams['huizong'];
		  			if('0'==hz){
		  				grid.colModel.setHidden(0, false);
		  				grid.colModel.setHidden(1, false);
		  				grid.colModel.setHidden(3, false);
		  				grid.colModel.setHidden(4, false);
		  				grid.colModel.setHidden(5, false);
		  				grid.colModel.setHidden(6, false);
		  				grid.colModel.setHidden(7, false);
		  				grid.colModel.setHidden(9, false);
		  			}else if('1'==hz){
		  				grid.colModel.setHidden(0, true);
		  				grid.colModel.setHidden(1, true);
		  				grid.colModel.setHidden(3, false);
		  				grid.colModel.setHidden(4, false);
		  				grid.colModel.setHidden(5, false);
		  				grid.colModel.setHidden(6, false);
		  				grid.colModel.setHidden(7, true);
		  				grid.colModel.setHidden(9, true);
		  			}else if('2'==hz){
		  				grid.colModel.setHidden(0, true);
		  				grid.colModel.setHidden(1, true);
		  				grid.colModel.setHidden(3, true);
		  				grid.colModel.setHidden(4, true);
		  				grid.colModel.setHidden(5, true);
		  				grid.colModel.setHidden(6, true);
		  				grid.colModel.setHidden(7, true);
		  				grid.colModel.setHidden(9, true);
		  			}
        		}
        	}
	    });
		
		this.store_org = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=select_org',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FNumber','FName'],
	  		remoteSort:true,
	  		baseParams:{pageSize:2000}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";			
		
	 	this.xsdd = new SellOrderSimpleListPanel({id:'xswkp_xsdd_simple',title:'销售订单维护',iconCls:'pluginIcon'});
	 	this.fhtz = new SellOutSimpleListPanel({id:'xswkp_fhtz_simple',title:'销售通知维护',iconCls:'pluginIcon'});
	 	this.xsfp = new SellSaleSimpleListPanel({id:'xswkp_xsfp_simple',title:'销售发票维护',iconCls:'pluginIcon'});
	 	
		this.bottompanel = new Ext.TabPanel({                    	            
			region: 'south',                        
            margins: '0 3 3 3',
            cmargins: '3 3 3 3',
            height: 220,                        
            collapsed: true,
            collapsible: true,
            activeTab: 0,
            autoDestroy:false,
            enableTabScroll:true,            
            defaults:{autoScroll:true},
            split: true,                     
            items: [
                this.xsdd,
                this.fhtz,
                this.xsfp
            ],
            listeners: {
            	'expand': {fn:function(p){
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'xswkp_xsdd_simple'==p.getActiveTab().id){
	    				this.xsdd.store.removeAll();                    		
	            		this.xsdd.store.baseParams['query']=this.xsdd.djbh;
	            		this.xsdd.store.load();                            		
	    			}
	    			
	    			if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'xswkp_fhtz_simple'==p.getActiveTab().id){
	    				this.fhtz.store.removeAll();                    		
	            		this.fhtz.store.baseParams['query']=this.fhtz.djbh;
	            		this.fhtz.store.load();                            		
	    			}
	    			
	    			if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'xswkp_xsfp_simple'==p.getActiveTab().id){
	    				this.xsfp.store.removeAll();                    		
	            		this.xsfp.store.baseParams['query']=this.xsfp.djbh;
	            		this.xsfp.store.load();                            		
	    			}
	        	},scope:this},
            	'tabchange': {fn:function(tab,p){
            		p.store.removeAll();            		
            		if(''!=p.djbh){
            			p.store.baseParams['query']=p.djbh;
            			p.store.load();
            		}
            	},scope:this}
            }
        });
		
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
	    
	    this.status = new Ext.form.ComboBox({	        
	        hiddenName:'huizong',
	        valueField:'id',
	        displayField:'mc',
	        value:'0',
	        width:100,
	        allowBlank:false,
	        mode:'local',
	     	triggerAction:'all',
	        forceSelection:true,
	        editable:false,
	        store:new Ext.data.Store({     
	            data:[['0','全部'],['1','客户 + 产品'],['2','客户']], 
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
	    this.store.baseParams['huizong']=this.status.getValue();
	    
	    this.dwdm = new Ext.form.ComboBox({	        
	        hiddenName:'dwdm',
	        valueField:'FNumber',
	        displayField:'FName',
	        emptyText: '请选择客户...',
	        value:'',
	        width:150,
	        mode:'local',
	     	triggerAction:'all',
	        forceSelection:true,	        
	        store:this.store_org,
	        listeners:{
        		'change':{fn:function(t,valuenew,valueold){
					this.store.baseParams['dwdm']=valuenew;
        		},scope:this}
        	}
	    });
	    this.store.baseParams['dwdm']=this.dwdm.getValue();
		
        this.items = [            
            {
                xtype: 'panel',
                region: 'center',
                layout: 'border',
                border: false,
                items: [
                    {
                    	id:'list_xswkp_grid',
                        xtype: 'grid',
                        region: 'center',
                        margins: '3 3 3 3',
                        view: new Ext.ux.grid.LockingGridView(),
                        //frame: false,
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
	        	            	var huizong = '&huizong='+this.status.getValue();
	        	            	var dwdm = '&dwdm='+this.dwdm.getValue();
	        	            	var orderBy = '';
	        	            	var orderType = '';
	        	            	if(undefined!=this.store.sortInfo){
	        	            		orderBy = '&orderBy='+this.store.sortInfo.field;
	        	            		orderType = '&orderType='+this.store.sortInfo.direction;
	        	            	}
	        	            	var q = '&query='+this.queryfield.getValue();
	        	            	var href = "kingdee.do?cmd=export_xswkp"+begin+end+pageS+huizong+dwdm+orderBy+orderType+encodeURI(q);	        	            	
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
        	            },'-',{    
        	                text: '关联信息',            
        	                handler: function(){if(this.bottompanel.isVisible())this.bottompanel.collapse(true); else this.bottompanel.expand(true);},
        	                scope:this
        	            },'-',this.dwdm,'-','汇总依据：',this.status,'-',this.beginfield,' 至 ',this.endfield,'-'
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
                                width: 80,
                                dataIndex: 'Fdate'
                            }/*,{
                                xtype: 'gridcolumn',
                                header: '客户代码',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                hidden: true,
                                dataIndex: 'dwdm'
                            }*/,{
                                xtype: 'gridcolumn',
                                header: '客户',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'wldw'
                            }/*,{
                                xtype: 'gridcolumn',
                                header: '业务员',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'ywy'
                            }*/,{
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
                                header: '单位',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'jldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '批次',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpph'
                            },{
                                xtype: 'gridcolumn',
                                header: '发货数量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'fssl'
                            }/*,{
                                xtype: 'gridcolumn',
                                header: '单价',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'hsdj'
                            },{
                                xtype: 'gridcolumn',
                                header: '金额',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'hsje'
                            }*/,{
                                xtype: 'gridcolumn',
                                header: '开票数量',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'kpsl'
                            }
                        ]),
                        listeners: {
	                		'cellclick': {fn:function(t,rowIndex,columnIndex,e){	                			                    	
                    			this.xsdd.djbh = this.store.getAt(rowIndex).get('FOrderID');
	                			if(this.bottompanel.isVisible()&&'xswkp_xsdd_simple'==this.bottompanel.getActiveTab().id){	                					                				
	                				this.xsdd.store.removeAll();                    		
	                        		this.xsdd.store.baseParams['query']=this.xsdd.djbh;
	                        		this.xsdd.store.load();                            		
	                			}
	                			
	                			this.fhtz.djbh = this.store.getAt(rowIndex).get('FOrderID');
                    			if(this.bottompanel.isVisible()&&'xswkp_fhtz_simple'==this.bottompanel.getActiveTab().id){                    				                    				
                    				this.fhtz.store.removeAll();                    		
                            		this.fhtz.store.baseParams['query']=this.fhtz.djbh;
                            		this.fhtz.store.load();                            		
                    			}
                    			
                    			this.xsfp.djbh = this.store.getAt(rowIndex).get('FOrderID');
                    			if(this.bottompanel.isVisible()&&'xswkp_xsfp_simple'==this.bottompanel.getActiveTab().id){                    				                    				
                    				this.xsfp.store.removeAll();                    		
                            		this.xsfp.store.baseParams['query']=this.xsfp.djbh;
                            		this.xsfp.store.load();                            		
                    			}
	                		},scope:this}
	                	}
                    },
                    this.bottompanel
                ]
            }
        ];
        XswkpListPanel.superclass.initComponent.call(this);
        
        this.on('render',function(p){
        	this.store_org.load();
        },this);
        
    }
});
