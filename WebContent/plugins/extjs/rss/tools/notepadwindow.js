NotepadWindow=Ext.extend(Ext.Window,{
	closeAction:'hide',
	width:468,
	height:400,
	showBody:function(comThis,record,index){
		this.notepadbody.load({params:{title:record.get("title")}});
	},
	addNotepad:function(){
		this.addOrSaveNotepad('add');
	},
	addOrSaveNotepad:function(obj){                
		if(!this.titlefp||null==this.titlefp){
			this.titlefp = new Ext.form.FormPanel({
				frame:true,
				labelWidth:50,
				labelAlign:'right',
				defaultType:'textfield',
				defaults:{width:200},
				border:false,
				items:[{fieldLabel:'标题',name:'title',allowBlank:false},
				       {fieldLabel:'描述',name:'description'}
				]
			});
		}
		if(!this.titleWin||null==this.titleWin){
			this.titleWin = new Ext.Window({
				id:'addtitle',
				title:'请输入标题',
				modal:true,
				layout:'fit',
				width:300,
				height:130,
				closeAction:'close',
				items:[this.titlefp],
				buttons:[
				    {
				     text:"提交",
				     handler:function(){
				    	var v = this.titlefp.form.findField("title").getValue();
				    	var context = '';
				    	if('save'==obj)
				    		context = this.notepadbody.fp.form.findField("body").getValue();
				    	if(-1==this.notepadtitle.find('title',v)){    //判断标题是否重复
				    		this.titlefp.form.submit({
								waitMsg:'正在处理。。。',
					            url:'tools.ejf?cmd=addnotepad',
					            params:{body:context},
					            method:'POST',
					            success:function(){
					           		this.titleWin.close();
					           		this.notepadtitle.load({params:{select:v}});    //0 表示自动选择第一个项目
					           		this.notepadbody.load({params:{title:v}});
					            },
					            scope:this
					    	});
				    	}else{
				    		Ext.Msg.alert("提示","重复的标题，请检查！");
				    	}
				     },
				     scope:this
					},{
						text:'重置',
						handler:function(){if(this.titlefp)this.titlefp.form.reset();},
						scope:this
					},{
						text:'取消',
						handler:function(){if(this.titleWin){this.titleWin.close();this.titlefp=null;this.titleWin=null;}},
						scope:this
					}
				]
			});
		}
		this.titleWin.addListener('close',function(){if(this.titleWin){this.titleWin.close();this.titlefp=null;this.titleWin=null;}},this);
		this.titleWin.show();
	},
	saveNotepad:function(){
		if(this.notepadtitle.combo){
			var t=this.notepadtitle.combo.getValue();
			if(t&&null!=t&&''!=t){
				this.notepadbody.fp.form.submit({
					waitMsg:'正在保存。。。',
		            url:'tools.ejf?cmd=updatenotepad',
		            params:{title:t},
		            method:'POST',
		            success:function(){
		            	
		            },
		            scope:this
		    	});
			}else{
				this.addOrSaveNotepad('save');
			}
		}
	},
	removeNotepad:function(){
		if(this.notepadtitle.combo){
			var t=this.notepadtitle.combo.getValue();
			if(t&&null!=t){
				Ext.Msg.show({
					title:'提示',
					msg:'真的要删除该文件吗?',
					buttons:Ext.Msg.OKCANCEL,
					fn:function(btn, text){
						if(btn=='ok'){
							this.notepadbody.fp.form.submit({
								waitMsg:'正在处理。。。',
					            url:'tools.ejf?cmd=removenotepad',
					            params:{title:t},
					            method:'POST',
					            success:function(){
					            	this.notepadtitle.reload({params:{select:'null'}});  //让combo当前值为空
					           		this.notepadbody.fp.form.findField("body").reset();
					           		//this.notepadbody.save_but.setDisabled(true);
					           		this.notepadbody.remove_but.setDisabled(true);
					            },
					            scope:this
					    	});
						}
					},
					icon:Ext.MessageBox.QUESTION,
					scope:this
				});
			}else{
				Ext.Msg.alert("提示","请先选择要删除的文件！");
			}
		}
	},
	editorResize:function(winThis,width,height){
		var editor = this.notepadbody.fp.form.findField("body");
		if(null!=editor){
			editor.setHeight(winThis.getInnerHeight()-38);
			editor.setWidth(winThis.getInnerWidth()-12);
		}
	},
	showWin:function(winThis){
		var editor = this.notepadbody.fp.form.findField("body");
		if(null!=editor){
			editor.setHeight(winThis.getInnerHeight()-38);
			editor.setWidth(winThis.getInnerWidth()-12);
		}
		if(0>=this.notepadtitle.getCount())
			this.notepadtitle.load({params:{select:'null'}});      //null表示不自动选择
	},
	initComponent : function(){
		this.notepadtitle = new Ext.data.JsonStore({
			url: 'tools.ejf?cmd=loadnotepadtitle',
			root:"result",
			fields:["title","py"],
			listeners:{
				'load':function(storeThis,records,options){
					if(records.length>0){
						storeThis.combo.clearValue();
						storeThis.combo.setDisabled(false);
						if('null'!=options.params.select){
							storeThis.combo.setValue(options.params.select);
							storeThis.combo.setDisabled(false);
						}
					}else{          //如果没有读取到文件
						storeThis.combo.clearValue();
						storeThis.combo.setDisabled(true);
					}
				},
				'loadexception':function (){
					//Ext.Msg.alert("提示","加载数据失败，请刷新后在试!");
				}
			}
		});
		this.notepadbody = new Ext.data.JsonStore({
			url: 'tools.ejf?cmd=loadnotepad',
			root:"result",
			fields:["body"],
			listeners:{
				'load':function(storeThis,records,options){
					if(records.length&&0<records.length){
						var record = records[0];
						storeThis.fp.form.loadRecord(record);
						storeThis.fp.form.findField("body").setDisabled(false);
						//storeThis.save_but.setDisabled(false);
						storeThis.remove_but.setDisabled(false);
					}
				},
				'loadexception':function (){
					Ext.Msg.alert("提示","加载文件失败，可能的原因：<br>1、您没有登录系统，可以通过查看“我的状态”了解；<br>2、保存文件时，由于服务器响应延迟导致，请稍后再试！");
				}
			}
		});
		this.notepadtitle.combo = new Ext.form.ComboBox({
			width:200,
	    	tpl: '<tpl for="."><div class="x-combo-list-item">{title}</div></tpl>',
		    store: this.notepadtitle,
		    displayField:'title',
		    typeAhead: true,
		    mode: 'local',
		    disabled:true,
		    triggerAction: 'all',
		    emptyText:'请输入标题',
		    selectOnFocus:true
		});
		this.notepadtitle.combo.addListener('select',this.showBody,this);
		
		this.notepadbody.fp = new Ext.form.FormPanel({
			frame:true,
			autoHeight:true,
			autoWidth:true,
			border:false,
			items:[
				{
					xtype:'htmleditor',  
                    name:'body',
                    allowDomMove:true,
                    //enableAlignments:false,   
                    enableSourceEdit:false,   
                    //enableLists:false,   
                    enableLinks:false,   
                    hideLabel:true
                    //disabled:true
				}
			]
		});
		this.notepadbody.save_but = new Ext.Button({
			text:'保存',
			handler:this.saveNotepad,
			iconCls:'saveIcon',
			//disabled:true,
			scope:this
		});
		
		this.notepadbody.remove_but = new Ext.Button({
			text:'删除',
			handler:this.removeNotepad,
			iconCls:'deleteIcon',
			disabled:true,
			scope:this
		});
		
		NotepadWindow.superclass.initComponent.call(this);
		var tools = new Ext.Toolbar([
		    {text:'新建',handler:this.addNotepad,iconCls:'addIcon',scope:this},'  ',
		    this.notepadbody.save_but,'  ',
		    this.notepadbody.remove_but,
		    new Ext.Toolbar.Fill(),'标题:','  ',
		    this.notepadtitle.combo
		]);
		this.add(tools);
		
		this.add(this.notepadbody.fp);
		//this.addListener('close',function(){this.fp=null;},this);
		//this.addListener('hide',function(){this.fp=null;},this);
		this.addListener('resize',this.editorResize,this);
		this.addListener('show',this.showWin,this);
	}
});