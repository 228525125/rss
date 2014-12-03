openjoinrolewindow = function(operateLimitId){
	if(operateLimitId&&null!=operateLimitId){
		var win = new SelectRoleWindow({			
			roleId: '-1',
			operateLimitId: operateLimitId
		});
		win.show();
	}
}