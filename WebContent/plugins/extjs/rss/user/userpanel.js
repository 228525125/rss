UserPanel = Ext.extend(Ext.Panel,{
	closable: true,
  	autoScroll:true,
  	layout:"fit",
  	baseUrl:'user.do',
  	createWin:function()
    {
    	return this.initWin(350,250,"帐户管理");
    },  	
    createForm:function(){
    	var formPanel=new Ext.form.FormPanel({
    		frame:true,
    		labelWidth:70,
    		labelAlign:'right',
    		defaultType:'textfield',    		
            defaults:{width:200},
            items:[{xtype:"hidden",name:"id"},
                {fieldLabel:'姓名',allowBlank:false,name:'name'},
               	{fieldLabel:'帐号',allowBlank:false,name:'account'},
               	{fieldLabel:'密码',allowBlank:false,name:'password',inputType:'password'},
               	{fieldLabel:'URL',name:'url'},
               	{
               		xtype:'combo',
               		fieldLabel:'角色',
               		hiddenName:'role',
					valueField:'id',
			        displayField:'name',
			        emptyText:'请选择...',
			        width:200,
			        allowBlank:false,				        
			        mode:'local',
			        value:'职员',
			     	triggerAction:'all',
			        forceSelection:true,
			        editable:false,
			        store:new Ext.data.Store({     
			            data:[['职员','职员'],['领导','领导']], 
			            autoLoad: true,
			            reader:new Ext.data.ArrayReader({}, [
			                  {name: 'id'},
			                  {name: 'name'} 
						])
			        })
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
	  		fields:["id","account","name","password","url","role"],
	  		remoteSort:true,
	  		baseParams:{pageSize:pgSize}	  		
	   	});
		this.store.paramNames.sort="orderBy";
	 	this.store.paramNames.dir="orderType";
	 	
	 	UserPanel.superclass.initComponent.call(this);				
	 	var viewConfig=Ext.apply({forceFit:true},this.gridViewConfig);
	    this.cm=new Ext.grid.ColumnModel([		               
		      new Ext.grid.RowNumberer(),	
		      {header: "帐号", sortable:true,width: 150, dataIndex:"account"},
		      {header: "名称", sortable:true,width: 250, dataIndex:"name"},
		      {header: "URL", sortable:true,width: 400, dataIndex:"url"},
		      {header: "角色", sortable:true,width: 150, dataIndex:"role"}		      
		]);
		this.grid=new Ext.grid.GridPanel({
	        store: this.store,
	        cm: this.cm,
	        trackMouseOver:false,
	        viewConfig:viewConfig,
	        loadMask: true,
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
	}
});