/**
 * 委外接收单待审列表
 */
WwjsCheckPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		this.djbh = '';
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_wwjs',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FStatus','FInterID','FBillNo','FSourceBillNo','FDate','cpdm','cpmc','cpgg','jldw','jssl','hgsl','gfsl','lfsl','hsdj','hsje','wlph','jgdw','FEntryID'],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";		 	
	 	
	 	this.wwzc = new WwzcSimpleListPanel({id:'wwjs_wwzc_simple',title:'委外工序转出',iconCls:'pluginIcon'});
	 	this.wwjy = new WwjySimpleListPanel({id:'wwjs_wwjy_simple',title:'委外工序检验',iconCls:'pluginIcon'});
	 	
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
                this.wwzc,
                this.wwjy
            ],
            listeners: {
            	'expand': {fn:function(p){  
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'wwjs_wwzc_simple'==p.getActiveTab().id){
	    				this.wwzc.store.removeAll();                    		
	            		this.wwzc.store.baseParams['query']=this.wwzc.djbh;
	            		this.wwzc.store.load();                            		
	    			}
	            	
	            	if(undefined!=p.getActiveTab().djbh&&''!=p.getActiveTab().djbh&&'wwjs_wwjy_simple'==p.getActiveTab().id){
	    				this.wwjy.store.removeAll();                    		
	            		this.wwjy.store.baseParams['query']=this.wwjy.djbh;
	            		this.wwjy.store.load();                            		
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
                        xtype: 'editorgrid',
                        id: 'check_wwjs_grid',
                        region: 'center',
                        margins: '3 3 3 3',
                        view: new Ext.ux.grid.LockingGridView(),
                        clicksToEdit:1,
                        frame: false,
                        sm: this.sm,
                        store: this.store,
                        loadMask: true,
                        tbar:['   '/*,{
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
        	            },'-'*/,{
        		        	text:'更新单价',
        		        	handler: function(){
        	            		Ext.Msg.confirm("确认框","确定要更新吗?",function(btn){ 
        	            			if(btn=='yes'){ 
        	            				var records = this.sm.getSelections();
                				    	if(0==records.length){
                				    		Ext.Msg.alert('提示','请选择接收单！');
                				    		return;
                				    	}
                				    	
                				    	var jsonBegin = '{"rows":[';
                				    	var jsonEnd = ']}';
                				    	
                				    	for(var i=0;i<records.length;i++){
                				    		var record = records[i];
                				    		var FEntryID = record.get("FEntryID");
                				    		var hsdj = record.get("hsdj");
                				    		jsonBegin += '{"FEntryID":"'+FEntryID+'","hsdj":"'+hsdj+'"}';
                				    		if(i<records.length-1)
                				    			jsonBegin += ',';
                				    	}  			
                				    	jsonBegin+=jsonEnd;
                				    	
                				    	var mask = new Ext.LoadMask('check_wwjs_grid', {
                				    		msg : '正在处理。。。'
                				    	});
                				    	mask.show();
                				    	
                				    	Ext.Ajax.request({
                				    		url:'kingdee.do?cmd=update_wwjs_hsdj',
                				    		params:{resp:jsonBegin},
                				    		method:'POST',
                				    		success:function(response, options){
                				    			if(mask)
                				    				 mask.hide();
                				    			var responseArray = Ext.util.JSON.decode(response.responseText); 
                				    			var resp = responseArray.result[0];
                				    			 if(resp.success==true){                				    				                 				    					 
                				    				 if('请先登录'==resp.msg){
                				    					 var win = new LoginWindow();
                				    			         win.show(); 
                				    				 }else{
                				    					 Ext.Msg.alert('提示','处理完毕!',function(){
                				    						 this.store.load({params:{status:0,begin:'2013-06-01',end:'2099-06-30'}});
                				    					 },this);
                				    				 }
                				    			 }else{
                				    				 Ext.Msg.alert('提示','服务器没有响应，请稍后再试！');
                				    			 }
                				    		},
                				    		scope:this
                				    	}); 
        	            			} 
        	            		},this);         	            	        				    	       				    	        				   
        	        		},
        	        		scope: this
        		        },'-',{
        		        	text:'审核',
        		        	handler: function(){
        	            		Ext.Msg.confirm("确认框","确定要审核吗?",function(btn){ 
        	            			if(btn=='yes'){ 
        	            				var records = this.sm.getSelections();
                				    	if(0==records.length){
                				    		Ext.Msg.alert('提示','请选择接收单！');
                				    		return;
                				    	}
                				    	
                				    	var jsonBegin = '{"rows":[';
                				    	var jsonEnd = ']}';
                				    	
                				    	for(var i=0;i<records.length;i++){
                				    		var record = records[i];
                				    		var FInterID = record.get("FInterID");
                				    		jsonBegin += '{"FInterID":"'+FInterID+'"}';
                				    		if(i<records.length-1)
                				    			jsonBegin += ',';
                				    	}  			
                				    	jsonBegin+=jsonEnd;
                				    	
                				    	var mask = new Ext.LoadMask('check_wwjs_grid', {
                				    		msg : '正在处理。。。'
                				    	});
                				    	mask.show();
                				    	
                				    	Ext.Ajax.request({
                				    		url:'kingdee.do?cmd=check_wwjs',
                				    		params:{resp:jsonBegin},
                				    		method:'POST',
                				    		success:function(response, options){
                				    			if(mask)
                				    				 mask.hide();
                				    			var responseArray = Ext.util.JSON.decode(response.responseText); 
                				    			var resp = responseArray.result[0];
                				    			 if(resp.success==true){                				    				                 				    					 
                				    				 if('请先登录'==resp.msg){
                				    					 var win = new LoginWindow();
                				    			         win.show(); 
                				    				 }else{
                				    					 Ext.Msg.alert('提示','处理完毕!',function(){
                				    						 this.store.load({params:{status:0,begin:'2013-06-01',end:'2099-06-30'}});
                				    					 },this);
                				    				 }
                				    			 }else{
                				    				 Ext.Msg.alert('提示','服务器没有响应，请稍后再试！');
                				    			 }
                				    		},
                				    		scope:this
                				    	}); 
        	            			} 
        	            		},this);         	            	        				    	       				    	        				   
        	        		},
        	        		scope: this
        		        },'-',{    
        	                text: '关联信息',            
        	                handler: function(){if(this.bottompanel.isVisible())this.bottompanel.collapse(true); else this.bottompanel.expand(true);},
        	                scope:this
        	            },'-',this.status,'-',this.beginfield,' 至 ',this.endfield,'-'
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
                                header: '单据状态',
                                sortable: true,
                                resizable: true,
                                width: 40,
                                dataIndex: 'FStatus'
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
                                width: 100,
                                dataIndex: 'cpdm'
                            },{
                                xtype: 'gridcolumn',
                                header: '物料名称',
                                sortable: true,
                                resizable: true,
                                width: 100,
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
                                width: 40,
                                hidden: true,
                                dataIndex: 'jldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '接收数量',
                                sortable: true,
                                resizable: true,
                                width: 60,                                
                                dataIndex: 'jssl'
                            },{
                                xtype: 'gridcolumn',
                                header: '合格数量',
                                sortable: true,
                                resizable: true,
                                width: 60,                                
                                dataIndex: 'hgsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '工废数量',
                                sortable: true,
                                resizable: true,
                                width: 60,                                
                                dataIndex: 'gfsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '料废数量',
                                sortable: true,
                                resizable: true,
                                width: 60,                                
                                dataIndex: 'lfsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '单价',
                                sortable: true,
                                resizable: true,
                                width: 60,                                
                                dataIndex: 'hsdj',
                                editor: new Ext.form.NumberField({
                                    allowBlank: false,
                                    allowNegative: false
                                })
                            },{
                                xtype: 'gridcolumn',
                                header: '金额',
                                sortable: true,
                                resizable: true,
                                width: 60,                                
                                dataIndex: 'hsje'
                            },{
                                xtype: 'gridcolumn',
                                header: '批号',
                                sortable: true,
                                resizable: true,
                                width: 60,                                
                                dataIndex: 'wlph'
                            }
                        ]),
                        listeners: {
	                		'cellclick': {fn:function(t,rowIndex,columnIndex,e){                    			
	                			this.wwzc.djbh = this.store.getAt(rowIndex).get('FSourceBillNo');
	                			if(this.bottompanel.isVisible()&&'wwjs_wwzc_simple'==this.bottompanel.getActiveTab().id){                    				
	                				this.wwzc.store.removeAll();                    		
	                        		this.wwzc.store.baseParams['query']=this.wwzc.djbh;
	                        		this.wwzc.store.load();                            		
	                			}
	                			
	                			this.wwjy.djbh = this.store.getAt(rowIndex).get('FSourceBillNo');
	                			if(this.bottompanel.isVisible()&&'wwjs_wwjy_simple'==this.bottompanel.getActiveTab().id){                    				
	                				this.wwjy.store.removeAll();                    		
	                        		this.wwjy.store.baseParams['query']=this.wwjy.djbh;
	                        		this.wwjy.store.load();                            		
	                			}
	                			
	                		},scope:this}
	                	}
	                },
	                this.bottompanel
                ]
            }
        ];
        WwjsCheckPanel.superclass.initComponent.call(this);
    }
});
