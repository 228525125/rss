/**
 * 安全库存列表
 */
SecStockListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    closable: true,
  	autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_aqkc',
			root: 'result',
			totalProperty:"rowCount",
			fields:['wldm','wlmc','wlgg','jldw','cklj','yckl','aqkc','zgkc','zxdhl','rxhl','cpth','cgzq','hsdj','aqkcje','zgkcje','jcsl','mx','ztsl','cksl','aqkccy','syckl','byckl','wlsx'],
	  		remoteSort:true,
	  		baseParams:{pageSize:9999}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";		
	 	
	 	this.wldm = '';
	 	this.charts = new Ext.data.ArrayStore({   
	        fields: ['xField','yField'],
	        data: []
	    });
	 	
	 	//图形报表数据
		this.cfields = [{name:'201101'},
		                {name:'201102'},
		                {name:'201103'},
		                {name:'201104'},
		                {name:'201105'},
		                {name:'201106'},
		                {name:'201107'},
		                {name:'201108'},
		                {name:'201109'},
		                {name:'201110'},
		                {name:'201111'},
		                {name:'201112'}];
		
		var chartdata = [];
	    Ext.each(this.cfields,function(field){
			var array = [];
			array.push(1);
			array.push(field.name);
			chartdata.push(array);
		});
		this.charts.loadData(chartdata);
		
	 	this.chartstore = new Ext.data.JsonStore({
	 		url:'kingdee.do?cmd=chart_aqkc',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FDate','FQty'],
			listeners: {
	 			'load': {fn:function(t,records,options){
	 				var chartdata = [];
			 		Ext.each(records,function(row){
			 			var array = [];
						array.push(row.get('FQty'));
						array.push(row.get('FDate'));
						chartdata.push(array);
					});
			 		this.charts.loadData(chartdata);
	 			},scope:this}
	 		}
	 	});
	 		 	
	 	//图形报表控件
		this.columnchart = new Ext.chart.ColumnChart({									  		 	   
			   store: this.charts,
		       yField: 'xField',			    
		       xField: 'yField',	
		       hidden: true,
		       xAxis: new Ext.chart.CategoryAxis({
		           title: '月份'
		       }),
		       yAxis: new Ext.chart.NumericAxis({
		           title: '数量'
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
            height: 180,                        
            collapsed:true,
            collapsible: true,
            //frame: true,
            split: true,                     
            layout: 'column',
            items: [
                {
					height: 160,
					columnWidth: 1,
					padding: 5,
					border:false,
					items: [
					    this.columnchart
					]
				}
            ],
            listeners: {
				'expand': {fn:function(p){
					if(''!=this.wldm)
						this.chartstore.load({params:{FItemID:this.wldm}});
				},scope:this}
			}
        });
		
		this.queryfield = new Ext.app.SearchField({
            store: this.store,
            width:220,
            emptyText:'请输入关键字...',
            scope: this
        });
		
		this.month = new Ext.form.NumberField({
			width:20,
			decimalPrecision: 0,
			value: 12,
			listeners: {
				'change':{fn:function(t,newValue,oldValue){
					this.store.baseParams['month']=newValue;
				},scope:this}
			}
		});
		this.store.baseParams['month']=12;
		
		this.state = new Ext.form.ComboBox({	        
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
	            data:[['0','全部'],['1','报警'],['2','正常']], 
	            autoLoad: true,
	            reader:new Ext.data.ArrayReader({}, [
	                  {name: 'id'},
	                  {name: 'mc'} 
				])
	        }),
	        listeners:{
        		'change':{fn:function(t,valuenew,valueold){
					this.store.baseParams['state']=valuenew;
        		},scope:this}
        	}
	    });
	    this.store.baseParams['state']=this.state.getValue();
		
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
        	            },'-',{
        	            	text: '重置',
        	            	handler: function(){
        	            		this.queryfield.setValue('');
        	            		this.store.baseParams = {};
        	            		this.month.setValue(12);
        	            		this.store.baseParams['month']=12;
        	            		this.store.baseParams['pageSize']=9999;
        	            	},
        	            	scope: this
        	            },'-',{
        	            	text: '导出',
        	            	handler: function(){	        	            	        	            			        	            	
	        	            	var pageS = '&pageSize='+9999;
	        	            	var month = '&month='+this.month.getValue();
	        	            	var orderBy = '';
	        	            	var orderType = '';
	        	            	if(undefined!=this.store.sortInfo){
	        	            		orderBy = '&orderBy='+this.store.sortInfo.field;
	        	            		orderType = '&orderType='+this.store.sortInfo.direction;
	        	            	}
	        	            	var q = '&query='+this.queryfield.getValue();
	        	            	var href = "kingdee.do?cmd=export_aqkc"+pageS+month+orderBy+orderType+encodeURI(q);
	        	            	location.href = href;
        	            	},
        	            	scope: this
        	            },'-','累计',this.month,'个月','-',this.state,'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color=red>安全库存</font> = 采购周期（天）* 每天消耗量 + 最小起订量 ',
        	            '->','查找: ', ' ',
        		         this.queryfield],
                        bbar: new Ext.PagingToolbar({
            	            pageSize: 9999,
            	            store: this.store,
            	            displayInfo: true,
            	            displayMsg: '共{2}条记录，当前第 {0}条 到 {1}条',
            	            emptyMsg: "没有找到记录"
            	        }),                       
                    	colModel: new Ext.ux.grid.LockingColumnModel([
                            {
                                xtype: 'gridcolumn',
                                header: '代码',
                                sortable: true,
                                resizable: true,
                                width: 100,
                                dataIndex: 'wldm'
                            },{
                                xtype: 'gridcolumn',
                                header: '名称',
                                sortable: true,
                                resizable: true,
                                width: 120,
                                dataIndex: 'wlmc'
                            },{
                                xtype: 'gridcolumn',
                                header: '规格',
                                sortable: true,
                                resizable: true,
                                width: 120,
                                dataIndex: 'wlgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '属性',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'wlsx'
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
                                header: '年累计',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 60,
                                dataIndex: 'cklj'
                            },{
                                xtype: 'gridcolumn',
                                header: '月平均',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 60,
                                dataIndex: 'yckl'
                            },{
                                xtype: 'gridcolumn',
                                header: '单月最高消耗',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 60,
                                dataIndex: 'mx'
                            },{
                                xtype: 'gridcolumn',
                                header: '上月出库量',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 60,
                                dataIndex: 'syckl'
                            },{
                                xtype: 'gridcolumn',
                                header: '本月出库量',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 60,
                                dataIndex: 'byckl',
                                renderer:function(value,metadata,record){
                            		var aqkc = record.get('aqkc');
                            		var cgzq = record.get('cgzq');
                            		if (cgzq<30)
                            			cgzq = 30;
                            		var date = new Date();
                            		var day = date.getUTCDate();
                            		if((value/day)/(aqkc/cgzq)>2.5)
                            			return '<font color=red>'+value+'</font>';
                            		else
                            			return value;
	          		      		}
                            },{
                                xtype: 'gridcolumn',
                                header: '异常参考值',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 60,
                                dataIndex: 'byckl',
                                renderer:function(value,metadata,record){
                            		var aqkc = record.get('aqkc');
                            		var cgzq = record.get('cgzq');
                            		if (cgzq<30)
                            			cgzq = 30;
                            		var date = new Date();
                            		var day = date.getUTCDate();
                            		return (value/day)/(aqkc/cgzq);
	          		      		}
                            },{
                                xtype: 'gridcolumn',
                                header: '含税均价',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 60,
                                dataIndex: 'hsdj'
                            },{
                                xtype: 'gridcolumn',
                                header: '安全库存',
                                sortable: true,
                                resizable: true,
                                width: 60,
                                dataIndex: 'aqkc'
                            },{
                                xtype: 'gridcolumn',
                                header: '参考值',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 60,
                                renderer:function(value,metadata,record){
                            		var yckl = record.get('yckl');
                            		var cgzq = record.get('cgzq');
                            		var v = yckl/30*cgzq;
                            		if((v<(value/2)||v>(value*2))&&v>20)
	          		    	  			return '<font color=blue>'+Math.floor(v)+'</font>';
                            		else
                            			return Math.floor(v);
	          		      		},
                                dataIndex: 'aqkc'
                            },{
                                xtype: 'gridcolumn',
                                header: '金额',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,                                
                                dataIndex: 'aqkcje'
                            },{
                                xtype: 'gridcolumn',
                                header: '即时库存',
                                sortable: true,
                                resizable: true,
                                width: 80,       
                                renderer:function(value,metadata,record){
	                            	var aqkc = record.get('aqkc');
	                            	var ztsl = record.get('ztsl');
	                            	var cksl = record.get('cksl');
	                        		if((value+ztsl-cksl)<aqkc)
	          		    	  			return '<font color="red">'+value+' ('+Math.floor((aqkc-value-ztsl+cksl))+')'+'</font>';
	                        		else
	                        			return value;
                            	},
                                dataIndex: 'jcsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '差异',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,       
                                renderer:function(value,metadata,record){
	                        		return value;
                            	},
                                dataIndex: 'aqkccy'
                            },{
                                xtype: 'gridcolumn',
                                header: '预计入库量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'ztsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '最高库存',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'zgkc'
                            },{
                                xtype: 'gridcolumn',
                                header: '金额',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,                                
                                dataIndex: 'zgkcje'
                            },{
                                xtype: 'gridcolumn',
                                header: '最小订货量',
                                sortable: true,
                                resizable: true,                                
                                width: 80,
                                dataIndex: 'zxdhl'
                            },{
                                xtype: 'gridcolumn',
                                header: '采购周期',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cgzq'
                            },{
                                xtype: 'gridcolumn',
                                header: '预计出库量',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'cksl'
                            }
                        ]),
                        listeners: {
                    		'cellclick': {fn:function(t,rowIndex,columnIndex,e){
                    			this.wldm = this.store.getAt(rowIndex).get('wldm');
		                    	if(this.bottompanel.isVisible()){
		                    		if(!this.columnchart.isVisible())
		                    			this.columnchart.show();
	                    			this.chartstore.load({params:{FItemID:this.wldm}});
		                    	}
                    		},scope:this}
                    	}
                    },
                    this.bottompanel
                ]
            }
        ];
        SecStockListPanel.superclass.initComponent.call(this);
        
        //this.on('render',function(t){this.store.load()},this);
    }
});
