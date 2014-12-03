ThcxFormWindow = Ext.extend(Ext.Window,{
	layout: 'fit',
	closeAction:"close",
	modal:true,
	title:'添加信息',
	width:500,
	height:350,
	buttonAlign:'right',
	initComponent : function(){
	
	    this.items = [            
	        {
	            xtype: 'form',
	            id: 'form_thcx',
	            width: 343,
	            height: 285,
	            padding: 10,
	            labelWidth: 70,
	            labelAlign: 'right',
	            border: false,
	            frame: true,
	            items: [
					{xtype:"hidden",name:"id"},
					{
					    xtype: 'textfield',
					    fieldLabel: '产品名称',
					    allowBlank: false,
					    anchor: '90%',
					    name: 'cpmc'
					},
					{
					    xtype: 'textfield',
					    id: 'field_gsth',
					    fieldLabel: '公司图号',
					    anchor: '90%',
					    allowBlank: false,
					    name: 'gsth'
					},
					{
					    xtype: 'textfield',
					    fieldLabel: '客户图号',
					    anchor: '90%',
					    name: 'khth'
					},
					{
					    xtype: 'textfield',
					    fieldLabel: '材质',
					    anchor: '90%',
					    allowBlank: false,
					    name: 'cpcz'
					},
					{
					    xtype: 'combo',
					    fieldLabel: '所属类别',
					    anchor: '90%',
					    name: 'sslb',
					    hiddenName: 'sslb',
					    valueField: 'id',
					    displayField: 'name',
					    store: new Ext.data.Store({     
					        data:[['密封螺钉类','密封螺钉类'],['测压法兰/冲洗环类','测压法兰/冲洗环类'],['插入筒类','插入筒类'],['接头类','接头类'],['容室法兰类','容室法兰类'],['阀门类','阀门类'],['阀组类','阀组类'],['其他产品类','其他产品类'],['控制计划','控制计划']], 
					        autoLoad: true,
					        reader:new Ext.data.ArrayReader({}, [
					              {name: 'id'},
					              {name: 'name'} 
							])
					    }),
					    value: '其他产品类',
					    mode: 'local',
					    triggerAction: 'all',
					    forceSelection: true
					},
					{
					    xtype: 'textarea',
					    anchor: '90%',
					    fieldLabel: '流程',
					    name: 'lc'
					}
	            ]
	        }
	    ];
	    
	    this.posturl = 'kingdee.do?cmd=insert_thcx';
	    
	    this.buttons = [
	        {
	        	text:'提交',
	        	handler: function(){
		        	this.fp.form.submit({
						waitMsg:'正在保存。。。',
			            url:this.posturl,
			            method:'POST',
			            success:function(form,action){
							if(null!=action.result&&action.result.msg)
								if('公司图号重复，请检查！'==action.result.msg)
									Ext.Msg.alert('提示',action.result.msg);
								else
					        		Ext.Msg.alert('提示',action.result.msg,function(){
					        			this.close();
					        		},this);
							else{
					           	this.close();
							}
			            },
			            scope:this
		        	});
        		},
        		scope: this
	        },{
	        	text:'取消',
	        	handler: function(){
        			this.close();
        		},
        		scope: this
	        }            
	    ];
	    ThcxFormWindow.superclass.initComponent.call(this);
	    
	    this.on('render',function(t){
	    	this.fp = Ext.getCmp('form_thcx');
	    },this);
	}
});