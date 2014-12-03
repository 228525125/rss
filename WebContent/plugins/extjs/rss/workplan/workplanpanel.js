WorkPlanPanel = Ext.extend(Ext.Panel,{
	closable: true,
  	autoScroll:true,
  	layout:"fit",
  	baseUrl:'workPlan.do',
  	createWin:function()
    {
    	return this.initWin(500,450,"事务管理");
    },  	
    createForm:function(){    	
    	var formPanel=new Ext.form.FormPanel({
    		frame:true,
    		labelWidth:90,
    		labelAlign:'right',
    		defaultType:'textfield',    		
            defaults:{width:240},
            items:[{xtype:"hidden",name:"id"},
                {fieldLabel:'标题',allowBlank:false,name:'title'},
                {fieldLabel:'链接',name:'link'},
                {
                	xtype:'combo',
                	fieldLabel:'执行人',
                	allowBlank:false,
                	hiddenName:'author',
					valueField:'id',
			        displayField:'name',
			        emptyText:'请选择...',			        
			        allowBlank:false,				        
			        mode:'local',
			     	triggerAction:'all',
			        forceSelection:true,
			        editable:false,
			        store:this.userStore
                },                
                {xtype:'datefield',fieldLabel:'开始时间',format:'Y-m-d H:i:s',name:'startDate',value:new Date()},
                {xtype:'datefield',fieldLabel:'截止时间',format:'Y-m-d H:i:s',name:'closingDate',value:new Date()},
                {xtype:'numberfield',fieldLabel:'提前提醒(天)',name:'warningDay',value:0,allowDecimals:false},                             	
               	{
               		xtype:'combo',
               		fieldLabel:'停止发布',
               		hiddenName:'disabled',
					valueField:'id',
			        displayField:'name',
			        emptyText:'请选择...',			        
			        allowBlank:false,				        
			        mode:'local',
			        value:false,
			     	triggerAction:'all',
			        forceSelection:true,
			        editable:false,
			        store:new Ext.data.Store({     
			            data:[[true,'是'],[false,'否']], 
			            autoLoad: true,
			            reader:new Ext.data.ArrayReader({}, [
			                  {name: 'id'},
			                  {name: 'name'} 
						])
			        })
               	},
               	{
               		xtype:'htmleditor',
               		fieldLabel:'内容',
               		height:150,
               		allowBlank:false,
               		name:'description',
               		width:350,
               		enableColors:false,
               		enableFont:false,
               		enableFontSize:false,
               		enableFormat:false,
               		enableLinks:false,
               		enableSourceEdit:false
               	 }]
    		});
    	return formPanel;
    },
	showWin:function()
	{
		if(!this.win){
			if(!this.fp){
				this.fp=this.createForm();
			}
		this.win=this.createWin();
		this.win.on("close",function(){this.win=null;this.fp=null;},this);
		}
		this.win.show();
	},
	initWin:function(width,height,title)
    {
    	var win=new Ext.Window({
			width:width,
			height:height,
			buttonAlign:"center",
			title:title,
			modal:true,
			shadow:true,
			layout:'fit',
			closeAction:"hide",
			items:[this.fp],
			buttons:[{text:"保存",
					  handler:this.save,
					  scope:this},
					  {text:"清空",
					   handler:this.reset,
					   scope:this},
					  {text:"取消",
					   handler:this.closeWin,
					   scope:this}
		    ]				  
		});    	
		return win;
    },
	create:function()
	{
		this.showWin();
		this.reset();
	},
	save:function()
	{		
		var id=this.fp.form.findField("id").getValue();		
		this.fp.form.submit({
				waitMsg:'正在保存。。。',
	            url:this.baseUrl+"?cmd="+(id?"update":"save"),
	            method:'POST',
	            success:function(){
	           	this.closeWin();
	           	this.store.reload();          	
	            },
	            scope:this
		});	
	},
	reset:function()
	{
		if(this.win)this.fp.form.reset();
	},
	closeWin:function()
	{
		if(this.win)this.win.close();
		this.win=null;
	},
	refresh:function()
    {
    	this.store.removeAll();
   		this.store.reload();
    },
    edit:function(){
    	var record=this.grid.getSelectionModel().getSelected();
		if(!record){
			Ext.Msg.alert("提示","请先选择要编辑的行!");
			return;
		}
	    var id=record.get("id");
	    this.showWin();
	    this.fp.form.loadRecord(record);    
	    this.fp.form.findField("author").setValue(record.get("author").id);
    },
    removeData:function()
	{
			var record=this.grid.getSelectionModel().getSelected();
			if(!record){
				Ext.Msg.alert("提示","请先选择要编辑的行!");
				return;
			}
			var m=Ext.MessageBox.confirm("删除提示","是否真的要删除数据？",function(ret){
			if(ret=="yes"){
			  Ext.Ajax.request({
	            url:this.baseUrl+'?cmd=remove',
	            params:{
	                'id':record.get('id')
	            },
	            method:'POST',
	            success:function(response){
	            	Ext.Msg.alert("提示信息","成功删除数据!",function(){
			            this.store.reload();	
			        },this);
	            },
	            scope:this
			  });
			}},this);
	},
	initComponent : function(){
		this.store=new Ext.data.JsonStore({
	       	url: this.baseUrl+"?cmd=list",
	       	root:"result",
	  		totalProperty:"rowCount",
	  		fields:["id","date","user","title","author","description","link","startDate","closingDate","warningDay","disabled"],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize}	  		
	   	});
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";
	 	this.expander = new Ext.grid.RowExpander({
		    tpl : new Ext.Template(
		    		'<p><b>内容</b></p>',
		    		'<p>&nbsp;&nbsp;&nbsp;&nbsp;{description}</p>',
			    	 {
							parseObj:function(obj){
								if (obj==null)  
									return '';
								else  
									return obj.name;
							}
					}
			    )			    
	    });
	 	var viewConfig=Ext.apply({forceFit:true},this.gridViewConfig);
	 	WorkPlanPanel.superclass.initComponent.call(this);				
		
	    this.cm=new Ext.grid.ColumnModel([		               
	          this.expander,
		      new Ext.grid.RowNumberer(),	
		      {header: "标题", sortable:true,width: 250, dataIndex:"title"},
		      {header: "执行人", sortable:true,width: 80, renderer:function(v){if(null!=v)return v.name;}, dataIndex:"author"},		      
		      {header: "发布时间", sortable:true,width: 150, renderer:function(v){if(null!=v){return v.format('Y-m-d H:m:s');}}, dataIndex:"date"},
		      //{header: "链接", sortable:true,width: 250, renderer:function(v){return '<a href="'+v+'" target=_blank>'+v+'</a>';}, dataIndex:"link"},
		      {header: "开始时间", sortable:true,width: 150, renderer:function(v){if(null!=v){return v.format('Y-m-d H:m:s');}}, dataIndex:"startDate"},
		      {header: "截止时间", sortable:true,width: 150,renderer:function(v){if(null!=v){return v.format('Y-m-d H:m:s');}}, dataIndex:"closingDate"},
		      {header: "提前几天提醒", sortable:true,width: 200, dataIndex:"warningDay"},
		      {header: "禁用", sortable:true,width: 50, dataIndex:"disabled"}
		]);
		this.grid=new Ext.grid.GridPanel({
	        store: this.store,
	        cm: this.cm,
	        trackMouseOver:false,
	        viewConfig:viewConfig,
	        loadMask: true,
	        plugins:this.expander,
	        border:false,	      
	        tbar: ['   ',
	       		 {    
	                text: '添加',  
	                pressed: true,           
	                handler: this.create,
	                scope:this
	            },'   ',
	            {    
	                text: '修改',  
	                pressed: true,            
	                handler: this.edit,
	                scope:this
	            },'   ',
	            {    
	                text: '删除',  
					pressed: true,           
	                handler: this.removeData,
	                scope:this
	            },'   ',
	             {    
	                text: '刷新',  
					pressed: true,           
	                handler: this.refresh,
	                scope:this
	            }
	            /*,new Ext.Toolbar.Fill(),
	            '查找: ', ' ',
		         new Ext.app.SearchField({
		              store: this.store,
		              width:320,
		              emptyText:'请输入姓名关键字',
		              scope: this
		         })*/
	        ],
	        bbar: new Ext.PagingToolbar({
	            pageSize: pgSize,
	            store: this.store,
	            displayInfo: true,
	            displayMsg: '共{2}条记录，当前第 {0}条 到 {1}条',
	            emptyMsg: "没有找到记录"
	        })
	   	});
		
		this.add(this.grid);
		this.on('show',function(t){
			if(this.userStore||null==this.userStore){
				this.userStore = new Ext.data.JsonStore({
					url:'user.do?cmd=list',
		            root:"result",
					fields:["id","name"]
				});
			}
			this.userStore.load();
		},this);
	}
});