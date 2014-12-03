TaskFormPanel = Ext.extend(Ext.form.FormPanel, {
    padding: 20,
    border: false,
    initComponent: function() {
	
		this.equipmentstore = new Ext.data.JsonStore({
			url:'equipment.do?cmd=list',
			root: 'result',
			totalProperty:"rowCount",
			fields:['id','name'],
			baseParams:{pageSize:4000}
	    }); 
	
		this.workstore = new Ext.data.JsonStore({
			url:'kingdee.do?cmd=list_scrw',
			root: 'result',
			totalProperty:"rowCount",
			fields:['FStatus','FInterID','FBillNo','cpdm','cpmc','cpgg','cpph','jldw','jhsl','jhkgsj','jhwgsj','FType','xdrq','djrq','cpth'],
			baseParams:{pageSize:2000}
	    });
		
		var dt = new Date();
		this.workstore.baseParams['end'] = dt.format('Y-m-d');
		dt.setMilliseconds(dt.getMilliseconds()-1000*60*60*24*30);
		this.workstore.baseParams['begin'] = dt.format('Y-m-d');
		this.workstore.baseParams['status'] = '';
		
		this.workstore.paramNames.sort="orderBy";
	 	this.workstore.paramNames.dir="orderType";
	 	
	 	this.workstore.baseParams['orderBy'] = 'FBillNo';
	 	this.workstore.baseParams['orderType'] = 'DESC';
		
		
		this.code = new Ext.form.TextField({                
                fieldLabel: '物料代码',
                anchor: '100%',
                name: 'workItemCode',
                readOnly: true
        });
		
		this.name = new Ext.form.TextField({          
            fieldLabel: '物料名称',
            anchor: '100%',
            name: 'workItemName',
            readOnly: true
        });
		
		this.model = new Ext.form.TextField({
			fieldLabel: '规格',
            anchor: '100%',
            name: 'workItemModel',
            readOnly: true
		});
		
		this.unit = new Ext.form.TextField({
			fieldLabel: '单位',
            anchor: '100%',
            name: 'workUnit',
            readOnly: true
		});
		
		this.number = new Ext.form.TextField({
			fieldLabel: '计划数量',
            anchor: '100%',
            name: 'workNumber'
		});
		
		this.beginDate = new Ext.form.DateField({	
			fieldLabel: '计划开始时间',
            anchor: '100%',
            name: 'beginDate',
            format: 'Y-m-d',
            readOnly: true
		});
		
		this.endDate = new Ext.form.DateField({
			fieldLabel: '计划完工时间',
            anchor: '100%',
            name: 'endDate',
            format: 'Y-m-d',
            readOnly: true
		});
		
		this.workBatch = new Ext.form.Hidden({            
            name: 'workBatch'            
		});
		
		this.workDrawId = new Ext.form.Hidden({            
            name: 'workDrawId'            
		});
		        
        this.items = [
            {
            	xtype: 'hidden',
            	name: 'id'
            },{
                xtype: 'combo',
                fieldLabel: '流水线',
                anchor: '100%',
                emptyText:'请选择...',
                name: 'equipment',
                hiddenName: 'equipment',
                valueField: 'id',                
                displayField: 'name',
                allowBlank:false,
		        mode:'local',
		     	triggerAction:'all',
		        forceSelection:true,
		        store:this.equipmentstore
            },
            {
                xtype: 'datefield',
                fieldLabel: '日期',
                anchor: '100%',
                format: 'Y-m-d',
                name: 'planDate'
            },
            {
                xtype: 'combo',
                fieldLabel: '班次',
                anchor: '100%',
                name: 'segment',
                hiddenName: 'segment',
                valueField: 'id',
                displayField: 'mc',
                allowBlank:false,
		        mode:'local',
		     	triggerAction:'all',
		        forceSelection:true,
		        store:new Ext.data.Store({     
		            data:[['早班','早班'],['中班','中班'],['夜班','夜班']], 
		            autoLoad: true,
		            reader:new Ext.data.ArrayReader({}, [
		                  {name: 'id'},
		                  {name: 'mc'} 
					])
		        })
            }/*,
            {
                xtype: 'textfield',
                fieldLabel: '操作工',
                anchor: '100%',
                name: 'operator'
            }*/,
            {
                xtype: 'combo',
                fieldLabel: '任务单',
                tpl: '<tpl for="."><div class="x-combo-list-item">{FBillNo} - {cpmc} {jhsl} {jldw}</div></tpl>',
                anchor: '100%',
                name: 'workNo',
                hiddenName: 'workNo',
                valueField: 'FBillNo',
                displayField: 'FBillNo',
                allowBlank:false,
		        mode:'local',
		     	triggerAction:'all',
		        forceSelection:true,
		        store: this.workstore,
		        listeners: {
            		'select': {fn:function(t,record,index){
            			this.code.setValue(record.get('cpdm'));
            			this.name.setValue(record.get('cpmc'));
            			this.model.setValue(record.get('cpgg'));
            			this.unit.setValue(record.get('jldw'));
            			this.number.setValue(record.get('jhsl'));
            			
            			var date = '';
            			var ds = record.get('jhkgsj').split('/');
            			for(var i=0;i<ds.length;i++){
            				date += ds[i];
            				if(i<(ds.length-1))
            					date += '-';
            			}
            			this.beginDate.setValue(date);
            			
            			date = '';
            			ds = record.get('jhwgsj').split('/');
            			for(var j=0;j<ds.length;j++){
            				date += ds[j];
            				if(j<(ds.length-1))
            					date += '-';
            			}
            			this.endDate.setValue(date);
            			this.workBatch.setValue(record.get('cpph'));
            			this.workDrawId.setValue(record.get('cpth'));            			
            		},scope:this}
            	}
            },
            this.code,            
            this.name,
            this.model,
            this.unit,
            this.number,
            this.beginDate,
            this.endDate,
            this.workBatch,
            this.workDrawId,
            {
                xtype: 'textarea',
                anchor: '100%',
                fieldLabel: '备注',
                width: 184,
                height: 70,
                name: 'remark'
            }
        ];
        TaskFormPanel.superclass.initComponent.call(this);
        
        this.on('render',function(t){
        	this.workstore.load();
        	this.equipmentstore.load();
        },this);
    }
});
