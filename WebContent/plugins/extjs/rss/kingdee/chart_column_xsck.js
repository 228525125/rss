/**
 * 销售出库统计图表
 */
XsckColumnChartPanel = Ext.extend(Ext.Panel, {
	title:'销售出库趋势分析',
	layout: 'fit',
    border: false,
    initComponent: function() {
		this.charts = new Ext.data.ArrayStore({   
	        fields: ['xField','yField'],
	        data: []
	    });
		
		this.chartstore = new Ext.data.JsonStore({
	 		url:'kingdee.do?cmd=chart_column_xsck',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FDate','FAllAmount'],
			listeners: {
	 			'load': {fn:function(t,records,options){
	 				var chartdata = [];
			 		Ext.each(records,function(row){
			 			var array = [];
						array.push(row.get('FAllAmount'));
						array.push(row.get('FDate'));
						chartdata.push(array);
					});
			 		this.charts.loadData(chartdata);
	 			},scope:this}
	 		},
	 		baseParams:{day:730}
	 	});
		
		//图形报表控件
		this.columnchart = new Ext.chart.ColumnChart({									  		 	   
			   store: this.charts,
		       yField: 'xField',			    
		       xField: 'yField',	
		       hidden: true,                //为了兼容IE
		       xAxis: new Ext.chart.CategoryAxis({
		           title: '月份'
		       }),
		       yAxis: new Ext.chart.NumericAxis({
		           title: '金额'
		       }),
		       extraStyle: {
		           xAxis: {
		           	  labelRotation: -90
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
		
		this.store_item = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=select_item',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FNumber','FName','FModel'],
	  		remoteSort:true,
	  		baseParams:{pageSize:2000}
	    });
		
		this.dwdm = new Ext.form.ComboBox({	        
	        hiddenName:'wldw',
	        valueField:'FNumber',
	        displayField:'FName',
	        emptyText: '请选择客户...',
	        value:'',
	        width:240,
	        mode:'local',
	     	triggerAction:'all',
	        forceSelection:true,	        
	        store:this.store_org,
	        listeners:{
        		'select':{fn:function(t,record,index){
					this.chartstore.baseParams['wldw']=record.get('FNumber');
					this.chartstore.load();
        		},scope:this}
        	}
	    });
		
		var tpl = new Ext.XTemplate(
				  '<tpl for=".">',
				     '<div class="x-combo-list-item">{FName} - {FModel}</div>',
				  '</tpl>',
				  '<div class="x-clear"></div>'
		);
		
		this.wldm = new Ext.form.ComboBox({	        
	        hiddenName:'wldm',
	        valueField:'FNumber',
	        displayField:'FName',
	        emptyText: '请选择产品...',
	        tpl:tpl,
	        value:'',
	        width:240,
	        mode:'local',
	     	triggerAction:'all',
	        forceSelection:true,	        
	        store:this.store_item,
	        listeners:{
				'select':{fn:function(t,record,index){
					this.chartstore.baseParams['wldm']=record.get('FNumber');
					this.chartstore.load();
				},scope:this}
        	}
	    });
		
		this.items = [
		    {
		    	xtype: 'panel',
                border: false,
                items: [
					this.columnchart
				]
		    }
		];
		
		this.tbar = ['    ',this.dwdm,'    ',this.wldm];
	
		XsckColumnChartPanel.superclass.initComponent.call(this);
		
		this.on('render',function(t){					
			this.chartstore.load();
			this.store_org.load();
			this.store_item.load();
			this.columnchart.show();          //为了兼容IE
		},this);
	}
});