SearchIpWindow=Ext.extend(Ext.Window,{
	closeAction:'hide',
	//minimizable:true,
	width:250,
	height:150,
    initComponent : function(){
		this.store = new Ext.data.JsonStore({
			url:'tools.ejf?cmd=searchip',
			root:"result",
			fields:["context","msg"],
			listeners:{				
		   		'loadexception':function (){
					Ext.Msg.alert("提示","服务器忙，请稍候再试!");
				}
		   	}
		});
		this.view = new Ext.DataView({
	        store:this.store,
	        tpl:new Ext.XTemplate(
	           '<tpl for=".">',
	           '<div class="search-item">',
	           '<br>查询结果：<br>',
		       '<table border="0"><tr><td width="30">&nbsp;</td><td style="font-size:12px">{context}</td></tr>',
		       '</table>',
	           '</div></tpl>'
		    ),
	        autoHeight:true,
	        //multiSelect: true,
	        //overClass:'x-view-over',
	        itemSelector: 'div.search-item'
	    });
		SearchIpWindow.superclass.initComponent.call(this);
		
		var tools = new Ext.Toolbar([new Ext.app.SearchField({
		    store:this.store,
		    width:234,
		    emptyText:'请输入ip地址',
		    scope: this
		})]);
		
		this.add(tools);
		this.add(this.view);
	}
});