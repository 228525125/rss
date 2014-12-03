EquipmentFormPanel = Ext.extend(Ext.form.FormPanel, {
    width: 343,
    height: 285,
    padding: 10,
    labelWidth: 70,
    labelAlign: 'right',
    border: false,
    frame: true,
    initComponent: function() {
	
        this.defaults = {
            width: 200
        };
        this.items = [
            {xtype:"hidden",name:"id"},
            /*{
                xtype: 'textfield',
                fieldLabel: '编码',
                anchor: '90%',
                allowBlank: false,
                name: 'code'
            },*/
            {
                xtype: 'textfield',
                fieldLabel: '名称',
                allowBlank: false,
                anchor: '90%',
                name: 'name'
            },
            {
                xtype: 'textarea',
                anchor: '90%',
                fieldLabel: '描述',
                name: 'description'
            },{
                xtype: 'combo',
                fieldLabel: '是否禁用',
                anchor: '90%',
                name: 'disabled',
                hiddenName: 'disabled',
                valueField: 'id',
                displayField: 'name',
                store: new Ext.data.Store({     
		            data:[['0','否'],['1','是']], 
		            autoLoad: true,
		            reader:new Ext.data.ArrayReader({}, [
		                  {name: 'id'},
		                  {name: 'name'} 
					])
		        }),
                value: '0',
                mode: 'local',
                triggerAction: 'all',
                forceSelection: true
            }
        ];
        EquipmentFormPanel.superclass.initComponent.call(this);

    }
});
