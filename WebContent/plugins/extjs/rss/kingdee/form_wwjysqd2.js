WwjysqdFormPanel = Ext.extend(Ext.form.FormPanel,{
	width: 343,
    height: 355,
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
			{xtype:"hidden",name:"FBillNo"},
			{
			    xtype: 'textfield',
			    id: 'field_gsth',
			    fieldLabel: '转出单号',
			    anchor: '90%',
			    readOnly:true,
			    name: 'FSourceBillNo'
			},
			{
			    xtype: 'textfield',
			    fieldLabel: '加工单位',
			    anchor: '90%',
			    readOnly:true,
			    name: 'jgdw'
			},
			{
			    xtype: 'textfield',
			    fieldLabel: '物料代码',
			    anchor: '90%',
			    readOnly:true,
			    name: 'cpdm'
			},
			{
			    xtype: 'textfield',
			    fieldLabel: '产品名称',
			    anchor: '90%',
			    readOnly:true,
			    name: 'cpmc'
			},
			{
			    xtype: 'textfield',
			    fieldLabel: '规格',
			    anchor: '90%',
			    readOnly:true,
			    name: 'cpgg'
			},
			{
			    xtype: 'textfield',
			    fieldLabel: '数量',
			    anchor: '90%',
			    readOnly:true,
			    name: 'fssl'
			},
			{
			    xtype: 'textfield',
			    fieldLabel: '单价',
			    anchor: '90%',
			    allowBlank: false,
			    name: 'dj'
			}
		];
		
		WwjysqdFormPanel.superclass.initComponent.call(this);
	}
});