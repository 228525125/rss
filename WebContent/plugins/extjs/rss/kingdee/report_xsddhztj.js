/**
 * 销售订单汇总统计
 */
SellOrderAnalyzePanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
  	generateData: function(){
	    var data = [];
	    for(var i = 0; i < 12; ++i){
	        data.push([Date.monthNames[i], (Math.floor(Math.random() *  11) + 1) * 100]);
	    }
	    return data;
	},
    initComponent: function() {	
		
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=report_xsddhztj',
			root: 'result',
			totalProperty:"rowCount",
			fields:['wldw','cpdm','cpmc','cpgg','cpth','jldw','fssl','wsdj','hsdj','xxs','hsje'],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize},
	  		listeners:{
        		'beforeload': function(t,options){
		  			var grid = Ext.getCmp('report_xsddhztj_grid');
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
		
		//图形报表数据
		this.chartStore = new Ext.data.ArrayStore({   
	        fields: ['xField','yField'],
	        data: []
	    });
		
		//图形报表数据
		this.cfields = [{name:'户籍人数',id:'personCount'},
		                {name:'低保',id:'dibaorenshu'},
		                {name:'失业',id:'shiyerenshu'},
		                {name:'就业',id:'jiuyerenshu'},
		                {name:'养老',id:'yanglaobaoxian'},
		                {name:'医疗',id:'yiliaobaoxian'},
		                {name:'失业',id:'shiyebaoxian'},
		                {name:'工伤',id:'gongshangbaoxian'},
		                {name:'生育',id:'shengyubaoxian'},
		                {name:'灵活',id:'linghuojiuye'},
		                {name:'城乡',id:'chengxiangyiliao'},
		                {name:'合计',id:'heji1'},
		                {name:'籍养老',id:'hujiyanglaobaoxian'},
		                {name:'籍医疗',id:'hujiyiliaobaoxian'},
		                {name:'籍失业',id:'hujishiyebaoxina'},
		                {name:'籍工伤',id:'hujigongshangbaoxian'},
		                {name:'籍生育',id:'hujishengyubaoxian'},
						{name:'籍灵活',id:'hujilinghuobaoxian'},
						{name:'籍城乡',id:'chengxiangyiliao'},
						{name:'籍合计',id:'heji2'}];
		
		// 初始化图形报表数据
		var chartdata = [];
	    Ext.each(this.cfields,function(field){
			var array = [];
			array.push(field);
			array.push(1);
			chartdata.push(array);
		});
		this.chartStore.loadData(this.generateData());
		
		//图形报表控件
		this.columnchart = new Ext.chart.ColumnChart({									  		 	   
			   store: this.chartStore,
		       yField: 'yField',			    
		       xField: 'xField',
		       hidden: true,
		       xAxis: new Ext.chart.CategoryAxis({
		           title: '月份'
		       }),
		       yAxis: new Ext.chart.NumericAxis({
		           title: '订单金额'
		       }),
		       extraStyle: {
		           xAxis: {
		           	  labelRotation: -90
		       	   }
		       }
		});
		
		this.bottompanel = new Ext.Panel({                    	            
            title: '图形分析',
            region: 'south',                        
            margins: '0 3 3 3',
            cmargins: '3 3 3 3',
            height: 220,                        
            collapsed:true,
            collapsible: true,
            //frame: true,
            split: true,                     
            layout: 'column',
            items: [
                {
					height: 200,
					columnWidth: 1,
					padding: 5,
					border:false,
					items: [
					    this.columnchart
					]
				}
            ]
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
                        id: 'report_xsddhztj_grid',
                        region: 'center',
                        margins: '3 3 3 3',
                        view: new Ext.ux.grid.LockingGridView(),
                        frame: false,
                        store: this.store,
                        //viewConfig:{forceFit:true},  //自适应表格大小
                        //plugins: this.group,   //多头表格插件
                        loadMask: true,
                        tbar:[/*'   所属网格 : ',this.distCombo,'   ',{    
        	                text: '图形分析',            
        	                handler: function(){if(this.bottompanel.isVisible())this.bottompanel.collapse(true); else this.bottompanel.expand(true);},
        	                scope:this
        	            },*/'   ',{
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
            	        /*listeners:{
                    		'rowclick':{fn:function(t,i,e){
		                    	if(this.bottompanel.isVisible()){
		                			if(!this.columnchart.isVisible())
		                		    	this.columnchart.show();
		                		    
		                		    	
		                			var record=t.getSelectionModel().getSelected();
		                			var chartdata = [];
				    				Ext.each(this.cfields,function(field){
				    					var array = [];
				    					var fieldName = '';
				    					if(undefined==field.name)
				    						fieldName = field;
				    					else
				    						fieldName = field.name;
				    					array.push(fieldName);
				    					array.push(record.get(field.id));
				    					chartdata.push(array);
				    				});
				    				this.chartStore.loadData(chartdata);
		                		}        
                    		},scope:this}
                    	},*/
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
                    }/*,
                    this.bottompanel*/
                ]
            }
        ];
        SellOrderAnalyzePanel.superclass.initComponent.call(this);
    }
});
