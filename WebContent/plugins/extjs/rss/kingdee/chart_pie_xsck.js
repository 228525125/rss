XsckPieChartPanel = Ext.extend(Ext.Panel, {
    title: '销售出库客户占比',
    layout: 'column',
    initComponent: function() {
		this.charts = new Ext.data.ArrayStore({   
	        fields: ['xField','yField'],
	        data: []
	    });
		
		this.chartstore = new Ext.data.JsonStore({
	 		url:'kingdee.do?cmd=chart_pie_xsck',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FName','FAllAmount'],
			listeners: {
	 			'load': {fn:function(t,records,options){
	 				var chartdata = [];
			 		Ext.each(records,function(row){
			 			var array = [];
						array.push(row.get('FAllAmount'));
						array.push(row.get('FName'));
						chartdata.push(array);
					});
			 		this.charts.loadData(chartdata);
	 			},scope:this}
	 		}
	 	});
		
		this.piechart = new Ext.chart.PieChart({
            store: this.chartstore,
            dataField: 'FAllAmount',
            categoryField: 'FName',
            hidden: true,            //为了兼容IE
            extraStyle:
            {
                legend:
                {
                    display: 'bottom',
                    padding: 5,
                    font:
                    {
                        family: 'Tahoma',
                        size: 13
                    }
                }
            }
        });
		
		this.tjyf = new Ext.form.ComboBox({	        
	        hiddenName:'style',
	        valueField:'id',
	        displayField:'mc',
	        value:0,
	        width:100,
	        allowBlank:false,
	        mode:'local',
	     	triggerAction:'all',
	        forceSelection:true,
	        editable:false,
	        store:new Ext.data.Store({     
	            data:[['0','当月'],['1','2个月'],['2','3个月'],['5','6个月'],['8','9个月'],['11','12个月']], 
	            autoLoad: true,
	            reader:new Ext.data.ArrayReader({}, [
	                  {name: 'id'},
	                  {name: 'mc'} 
				])
	        }),
	        listeners:{
				'select':{fn:function(t,record,index){
					this.chartstore.baseParams['month']=record.get('id');
					this.chartstore.load();
				},scope:this}
        	}
	    });
		
		this.huizong = new Ext.form.ComboBox({	        
	        hiddenName:'huizong',
	        valueField:'id',
	        displayField:'mc',
	        value:'1',
	        width:100,
	        allowBlank:false,
	        mode:'local',
	     	triggerAction:'all',
	        forceSelection:true,
	        editable:false,
	        store:new Ext.data.Store({     
	            data:[['1','客户'],['2','物料']], 
	            autoLoad: true,
	            reader:new Ext.data.ArrayReader({}, [
	                  {name: 'id'},
	                  {name: 'mc'} 
				])
	        }),
	        listeners:{
				'select':{fn:function(t,record,index){
					this.chartstore.baseParams['huizong']=record.get('id');
					this.chartstore.load();
				},scope:this}
        	}
	    });
		
		this.columnchart = new Ext.chart.ColumnChart({									  		 	   
			   store: this.charts,
		       yField: 'xField',			    
		       xField: 'yField',	
		       hidden: true,
		       xAxis: new Ext.chart.CategoryAxis({
		           title: ''
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
	
        this.items = [
            {
                xtype: 'panel',
                columnWidth: 0.65,
                height: 230,
                border: false,
                items:[this.columnchart]
            },
            {
                xtype: 'panel',
                height: 240,
                columnWidth: 0.35,
                border: false,
                items:[this.piechart]
            }
        ];
        
        this.tbar = ['    ','累计：',this.tjyf,'    ',this.huizong];
        
        XsckPieChartPanel.superclass.initComponent.call(this);
        
        this.on('render',function(t){					
			this.chartstore.load();
			this.piechart.show();                   //为了兼容IE
			this.columnchart.show();                //为了兼容IE
		},this);
    }
});
