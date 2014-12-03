/**
 * 柱状图面板
 */
ColumnChartPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    border: false,
    initComponent: function() {
	
		this.store = new Ext.data.JsonStore({
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
	    
        this.items = [this.columnchart];
        ColumnChartPanel.superclass.initComponent.call(this);
    }
});