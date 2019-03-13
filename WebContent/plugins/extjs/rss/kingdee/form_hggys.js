HggysFormPanel = Ext.extend(Ext.form.FormPanel,{
	width: 343,
    height: 305,
    padding: 10,
    labelWidth: 70,
    labelAlign: 'right',
    border: false,
    frame: true,
	initComponent : function(){
		
		this.defaults = {
	            width: 200
	    };
		this.items = [
			{xtype:"hidden",name:"id"},
			{
			    xtype: 'textfield',
			    fieldLabel: '所属物料',
			    anchor: '90%',
			    name: 'itemName',
			    readOnly:true
			},
			{xtype:"hidden",name:"itemId"},
			{
			    xtype: 'combo',
			    fieldLabel: '供应商',
			    anchor: '90%',
			    name: 'supplierId',
			    hiddenName: 'supplierId',
			    valueField: 'id',
			    displayField: 'name',
			    emptyText: '请选择供应商...',
			    mode: 'remote',                
			    triggerAction: 'all',
			    forceSelection: true,
			    allowBlank: false,
			    store: this.supplierStore
			},
			{
			    xtype: 'combo',
			    fieldLabel: '是否默认',
			    anchor: '90%',
			    name: 'default',
			    hiddenName: 'default',
			    valueField: 'id',
			    displayField: 'name',
			    store: new Ext.data.Store({     
			        data:[['false','否'],['true','是']], 
			        autoLoad: true,
			        reader:new Ext.data.ArrayReader({}, [
			              {name: 'id'},
			              {name: 'name'}
					])
			    }),
			    value: 'false',
			    mode: 'local',
			    triggerAction: 'all',
			    forceSelection: true
			},
			{
			    xtype: 'combo',
			    fieldLabel: '是否审核',
			    anchor: '90%',
			    name: 'checked',
			    hiddenName: 'checked',
			    valueField: 'id',
			    displayField: 'name',
			    store: new Ext.data.Store({     
			        data:[['false','否'],['true','是']], 
			        autoLoad: true,
			        reader:new Ext.data.ArrayReader({}, [
			              {name: 'id'},
			              {name: 'name'}
					])
			    }),
			    value: 'false',
			    mode: 'local',
			    triggerAction: 'all',
			    forceSelection: true,
			    readOnly:true
			}
		];
		
	    HggysFormPanel.superclass.initComponent.call(this);
	}
});