FileUploadFormPanel = Ext.extend(Ext.form.FormPanel, {
    padding: 10,
    border: false,
    fileUpload: true,    
    initComponent: function() {
        this.items = [
            {
                xtype: 'textfield',
                fieldLabel: '选择文件',
                anchor: '100%',
                hideLabel: true,
                inputType: 'file',
                name: 'myFile'
            }
        ];
        FileUploadFormPanel.superclass.initComponent.call(this);
    }
});
