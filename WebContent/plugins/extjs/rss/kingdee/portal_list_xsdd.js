/**
 * 销售订单列表(未出库)
 */
SellOrderPortalListPanel = Ext.extend(Ext.Panel, {
    layout: 'border',
    title: '销售订单交期提醒',
    border: false,
  	//autoScroll:true,
    initComponent: function() {
		//统计报表数据
		this.store = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=portal_list_xsdd',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FTranType','FInterID','FEntryID','FCheck','FCloseStatus','Fdate','FBillNo','FChangeDate','FVersionNo','dwdm','wldw','bgrq','bgyy','bgr','ywy','cpdm','cpmc','cpgg','jldw','fssl','wsdj','hsdj','xxs','hsje','jhrq','hywgb','jcsl','jhsl','cksl','state','kpsl','ckrq','fphsdj','aqkc'],
	  		remoteSort:true,
	  		baseParams:{pageSize:200}
	    });
		
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";			
		
		this.queryfield = new Ext.app.SearchField({
            store: this.store,
            width:220,
            emptyText:'请输入关键字...',
            scope: this
        });
		
		this.store.baseParams['begin']='2011-07-01';
		
		var cd = new Date();
		
		this.beginfield = new Ext.form.DateField({			
			format:'Y-m-d',
			name:'beg',
			value: new Date(cd.getTime()-1000*60*60*24*180)
		});
		this.store.baseParams['begin']=this.beginfield.getValue().format('Y-m-d');
		
	    this.endfield = new Ext.form.DateField({			
			format:'Y-m-d',
			name:'end',
			value: new Date()
		});
	    this.store.baseParams['end']=this.endfield.getValue().format('Y-m-d');	 
	    
	    this.store.load();
		
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
                        //viewConfig:{forceFit:true},
                        loadMask: true,
                        tbar:['   ',{
        	            	text: '刷新',
        	            	handler: function(){
        	            		this.store.load();
        	            	},
        	            	scope: this
        	            },'->','查找: ', ' ',
        		         this.queryfield],                       
                    	colModel: new Ext.ux.grid.LockingColumnModel([
                    	    new Ext.grid.RowNumberer(),
                    	    /*{
                    	    	xtype: 'gridcolumn',
                    	    	header: '',
                    	    	sortable: true,
                    	    	resizable: true,
                    	    	width: 38,
                                dataIndex: 'aqkc',
                                renderer: function(value,metadata,record){
	                	    		var aqkc = record.get('aqkc');
	                	    		if(0<aqkc)
	          		    	  			return '<img border=0 src="images/rss/bei.gif" width=15 height=15/>';
	                	    		else
	                	    			return '';
	          		      		}
                    	    },*/{
                                xtype: 'gridcolumn',
                                header: '单据编号',
                                sortable: true,
                                resizable: true,
                                width: 90,
                                dataIndex: 'FBillNo'
                            },{
                                xtype: 'gridcolumn',
                                header: '单据日期',
                                sortable: true,
                                resizable: true,
                                width: 75,
                                dataIndex: 'Fdate'
                            },{
                                xtype: 'gridcolumn',
                                header: '交货日期',
                                sortable: true,
                                resizable: true,
                                width: 75,
                                dataIndex: 'jhrq',
                                renderer:function(value,metadata,record){
	                        		var jhrq = record.get('jhrq');
	                        		var year = jhrq.substring(0,4);
	                        		var month = jhrq.substring(5,7);
	                        		var day = jhrq.substring(8,10);
	                        		var date = new Date();
	                        		date.setFullYear(year, (month-1), day);
	                        		var today = new Date();
	                            	var cksl = record.get('cksl');
	                            	var fssl = record.get('fssl');	  
	                            	var FCloseStatus = record.get('FCloseStatus');
	                            	var hywgb = record.get('hywgb');
	                        		if(fssl>cksl&&(date.getTime()+1000*60*60*24)<today.getTime()&&'Y'!=hywgb&&'Y'!=FCloseStatus)	                        			
	                        			return '<font color="red">'+value+'</font>';
	                        		else	          		    	  			
	                        			return value;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '客户',
                                sortable: true,
                                resizable: true,
                                width: 80,
                                dataIndex: 'wldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '产品名称',
                                sortable: true,
                                resizable: true,
                                width: 80,
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
                                width: 80,
                                dataIndex: 'cpgg'
                            },{
                                xtype: 'gridcolumn',
                                header: '单位',
                                sortable: true,
                                resizable: true,
                                width: 30,
                                dataIndex: 'jldw'
                            },{
                                xtype: 'gridcolumn',
                                header: '数量',
                                sortable: true,
                                resizable: true,
                                width: 50,
                                dataIndex: 'fssl',
                                renderer:function(value,metadata,record){
	                            	var jcsl = record.get('jcsl');
	                            	var jhsl = record.get('jhsl');
	                            	var cksl = record.get('cksl');
	                            	var v = '';
	                        		if((value-cksl)>jcsl)
	          		    	  			v = '<font color="#008080">'+value+'</font>';
	                        		if((value-cksl)>(jcsl+jhsl))
	                        			v = '<font color="red">'+value+'</font>';
	                        		if(''==v)
	                        			v = value;
	                        		
	                        		return v;
	                        	}
                            },{
                                xtype: 'gridcolumn',
                                header: '出库数量',
                                sortable: true,
                                resizable: true,
                                width: 50,
                                dataIndex: 'cksl'
                            },{
                                xtype: 'gridcolumn',
                                header: '即时库存',
                                sortable: true,
                                resizable: true,
                                //hidden: true,
                                width: 50,
                                dataIndex: 'jcsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '预计入库量',
                                sortable: true,
                                resizable: true,
                                width: 50,
                                dataIndex: 'jhsl'
                            },{
                                xtype: 'gridcolumn',
                                header: '含税单价',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 60,
                                dataIndex: 'hsdj',
                                renderer:function(value,metadata,record){
                            		var fphsdj = record.get('fphsdj');
                            		if(0!=fphsdj&&value!=fphsdj)
                            			return '<font color=red>'+value+'</font>';
                            		else
                            			return value;
                            	}
                            },{
                                xtype: 'gridcolumn',
                                header: '含税金额',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'hsje'
                            },{
                                xtype: 'gridcolumn',
                                header: '安全库存',
                                sortable: true,
                                resizable: true,
                                hidden: true,
                                width: 80,
                                dataIndex: 'aqkc'
                            }
                        ])
                    }
                ]
            }
        ];
        SellOrderPortalListPanel.superclass.initComponent.call(this);
        /*this.on('show',function(t){
        	this.store.reload();
        },this);*/
    }
});
