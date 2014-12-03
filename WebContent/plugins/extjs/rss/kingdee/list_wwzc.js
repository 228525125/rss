/**
 * 委外转出单列表
 */
WwzcListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_wwzc',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FStatus','FInterID','FEntryID','FBillNo','FSourceBillNo','FDate','cpdm','cpmc','cpgg','jldw','fssl','wlph','jhrq','jgdw','sjsl','hgsl','jssl'],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";		 
	 	
	 	this.wwjy = new WwjySimpleListPanel({id:'wwzc_wwjy_simple',title:'委外工序检验',iconCls:'pluginIcon'});
	 	this.wwjs = new WwjsSimpleListPanel({id:'wwzc_wwjs_simple',title:'委外工序接收',iconCls:'pluginIcon'});
	 	
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
                this.wwjy,
                this.wwjs
            ],
            listeners: {
            	'expand': {fn:function(p){  
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'wwzc_wwjy_simple'==p.getActiveTab().id){
	    				this.wwjy.store.removeAll();                    		
	            		this.wwjy.store.baseParams['query']=this.wwjy.djbh;
	            		this.wwjy.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'wwzc_wwjs_simple'==p.getActiveTab().id){
	    				this.wwjs.store.removeAll();                    		
	            		this.wwjs.store.baseParams['query']=this.wwjs.djbh;
	            		this.wwjs.store.load();                            		
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
	            data:[['','全部'],['0','未审核'],['1','审核']], 
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
	    
	    this.style = new Ext.form.ComboBox({	        
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
	            data:[['0','全部'],['1','未送检']], 
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
	    
	    this.sm = new Ext.grid.CheckboxSelectionModel({
	    	dataIndex:'select',
	    	singleSelect:false
	    });
	    
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
                        sm: this.sm,
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
        	            },'-',{    
        	                text: '关联信息',            
        	                handler: function(){if(this.bottompanel.isVisible())this.bottompanel.collapse(true); else this.bottompanel.expand(true);},
        	                scope:this
        	            },'-',{
        	            	text: '送检',
        	            	handler: function(){
        	            		var str = '';
        	            		var records = this.sm.getSelections();
        	            		if(0==records.length){
        				    		Ext.Msg.alert('提示','请选择申请单！');
        				    		return;
        				    	}
        	            		for(var i=0;i<records.length;i++){
        				    		var record = records[i];
        				    		var FInterID = record.get("FInterID");
        				    		var FEntryID = record.get("FEntryID");
        				    		var fssl = record.get("fssl");
        				    		var sjsl = record.get("sjsl");
        				    		if(fssl>sjsl){
        				    			if(str!='')
        				    				str += ',';
        				    			str += ''+FInterID+FEntryID;
        				    		}
        				    	}
        	            		if(!this.win||null==this.win){
        	            			this.win = new WwjysqdFormWindow({query:str, parentStore: this.store});
        	            		}
        	            		this.win.on('close',function(){this.win=null},this);
        	            		this.win.show();
        	            		this.win.store.load();
        	            	},
        	            	scope: this
        	            },'-',this.status,'-',this.style,'-',this.beginfield,' 至 ',this.endfield,'-'
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
                    	    this.sm,
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
                                dataIndex: 'FDate'
                            },{
                                xtype: 'gridcolumn',
                                header: '交货日期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'jhrq'
                            },{
                                xtype: 'gridcolumn',
                                header: '单据状态',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'FStatus'
                            },{
                                xtype: 'gridcolumn',
                                header: '任务单号',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'FSourceBillNo'
                            },{
                                xtype: 'gridcolumn',
                                header: '加工单位',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'jgdw'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料代码',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cpdm'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料名称',
                                sortable: true,
                                resizable: true,
                                width: 80,
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
                                header: '单位',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                hidden: true,
                                dataIndex: 'jldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '转出数量',
                                sortable: true,
                                resizable: true,
                                width: 60,                                
                                dataIndex: 'fssl'
                            },{
                                xtype: 'gridcolumn',
                                header: '送检数量',
                                sortable: true,
                                resizable: true,
                                width: 60,                                
                                dataIndex: 'sjsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '合格数量',
                                sortable: true,
                                resizable: true,
                                width: 60,                                
                                dataIndex: 'hgsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '接收数量',
                                sortable: true,
                                resizable: true,
                                width: 60,                                
                                dataIndex: 'jssl'
                            },{
                                xtype: 'gridcolumn',
                                header: '批号',
                                sortable: true,
                                resizable: true,
                                width: 80,                                
                                dataIndex: 'wlph'
                            }
                        ]),
                        listeners: {
                    		'cellclick': {fn:function(t,rowIndex,columnIndex,e){                    			
                    			this.wwjy.djbh = this.store.getAt(rowIndex).get('FSourceBillNo');
                    			if(this.bottompanel.isVisible()&&'wwzc_wwjy_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.wwjy.store.removeAll();                    		
                            		this.wwjy.store.baseParams['query']=this.wwjy.djbh;
                            		this.wwjy.store.load();                            		
                    			}
                    			
                    			this.wwjs.djbh = this.store.getAt(rowIndex).get('FSourceBillNo');
                    			if(this.bottompanel.isVisible()&&'wwzc_wwjs_simple'==this.bottompanel.getActiveTab().id){                    				
                    				this.wwjs.store.removeAll();                    		
                            		this.wwjs.store.baseParams['query']=this.wwjs.djbh;
                            		this.wwjs.store.load();                            		
                    			}
                    			
                    		},scope:this}
                    	}
                    },
                    this.bottompanel
                ]
            }
        ];
        WwzcListPanel.superclass.initComponent.call(this);
    }
});
