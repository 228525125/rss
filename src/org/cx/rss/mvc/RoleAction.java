package org.cx.rss.mvc;

import org.cx.rss.domain.Role;
import org.cx.rss.service.IRoleService;
import org.cx.rss.util.AppContext;

import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.tools.IPageList;

public class RoleAction extends BaseAction {
	
	@Inject
	private IRoleService service;

	public void setService(IRoleService service) {
		this.service = service;
	}
	
	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		if(null!=form.get("roleId")&&!"".equals(form.get("roleId").toString())){
			Long id = new Long(CommUtil.null2String(form.get("roleId")));
			if(0l==id)
				qo.addQuery("parent is null", null);
			else if(AppContext.SELECT_ALL==id)
				;
			else
				qo.addQuery("parent.id=?", new Object[]{id});
		}
		
		IPageList pageList = service.getRoleBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delRole(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		Role object;
		if(null!=form.get("id")&&!"".equals(form.get("id").toString())){
			Long id = new Long(CommUtil.null2String(form.get("id")));
			object = service.getRole(id);
			form.toPo(object, true);
			if (!hasErrors())
				service.updateRole(id, object);
		}else{
			object = form.toPo(Role.class);
			if (!hasErrors())
				service.addRole(object);
		}
		return pageForExtForm(form);
	}
	
	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		Role object = service.getRole(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateRole(id, object);
		return pageForExtForm(form);
	}
	
	public Page tree(WebForm form){
		if(null!=form.get("roleId")&&!"".equals(form.get("roleId").toString())){
			Integer id = new Integer(form.get("roleId").toString());			
			form.addResult("json", service.loadTree(id));			
		}
		return getJsonByPage();
	}
}