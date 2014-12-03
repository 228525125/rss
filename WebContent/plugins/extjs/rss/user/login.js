Ext.QuickTips.init();
Ext.Ajax.timeout = 5 * 60 * 1000;// 10分钟，默认为30秒  设置加载数据超时最大值
Ext.onReady(function(){
	var fp = new Ext.form.FormPanel({
		renderTo:Ext.getBody(),
		iconCls:'logoutIcon',
		floating:true,
		x:500,
		y:200,
		hideMode:'visibility',
		title:'用户登录',
		width:330,
		height:200,
		frame:true,
		labelWidth:70,
		labelAlign:'right',
		defaultType:'textfield',
		draggable:true,
		draggable:{
			insertProxy:false,
		　　　　onDrag:function(e){
		　　　　　　var pel=this.proxy.getEl();
		　　　　　　this.x=pel.getLeft(true);
		　　　　　　this.y=pel.getTop(true);
		　　　　　　var s=this.panel.getEl().shadow;
		　　　　　　if(s){
		　　　　　　　　s.realign(this.x,this.y,pel.getWidth(),pel.getHeight());
		　　　　　　}
		　　　　},
		　　　　endDrag:function(e){
		　　　　　　this.panel.setPosition(this.x,this.y);
		　　　　}
		},
        defaults:{width:200},
        items:[           
           {xtype:'panel',layout:'fit',height:20},
           {xtype:'textfield',fieldLabel:'用户',name:'account',allowBlank:false,emptyText:'请输入用户名'},
           {xtype:'panel',layout:'fit',height:10},
           {xtype:'textfield',fieldLabel:'密码',name:'password',inputType:'password',value:''}
        ],
        buttons:[
           {
        	  id:'login_btn',
        	  text:'登录',
        	  handler:function(btn,event){
        	     btn.disable();
        	     Ext.getCmp("chongzhi").disable();
        	   	 var i = 0;
        	     var vID = setInterval(function(){
        	    	 if(i<6){
        	    		 fp.setTitle(fp.title+".");
        	    		 i++;
        	    	 }else{
        	    		 fp.setTitle("用户登录");
        	    		 i = 0;
        	    	 }
        	     },500);        	   	 
        	   	 fp.form.submit({
        	   		url:"user.do?cmd=validate",
    	            method:'POST',
    	            success:function(form,action){
        	   		    clearInterval(vID);
        	   		    fp.setTitle("用户登录");
        	   		 	fp.getEl().fadeOut({remove:true,duration:1.0,easing:'easeNone'});	        	   		
    					setTimeout(function(){
    						window.location.href="frame.do";
    					},1000);        	   		 	
    	            },
    	            failure:function(form,action){
    	            	Ext.getCmp('login_btn').enable();
    	            	Ext.getCmp('chongzhi').enable();    	            	
    	            	clearInterval(vID);
    	            	fp.setTitle("用户登录");
    	            	if(null!=action.result&&action.result.msg)
    		        		Ext.Msg.alert('提示',action.result.msg);
    	            },
    	            scope:this
        	   	 });  
           	  },
           	  scope:this
           },{
        	   id:'chongzhi',
        	   text:'重置',
        	   handler:function(){
        	   	  fp.form.reset();
           	   },
           	   scope:this
           }
        ]
	});
	
	fp.getEl().fadeIn({remove:false,duration:1.0,easing:'easeNone'});
	
});