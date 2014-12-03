package org.cx.rss.mvc;

import java.util.Iterator;
import java.util.Set;

import org.cx.rss.domain.OperateLimit;
import org.cx.rss.domain.Role;
import org.cx.rss.service.IOperateLimitService;
import org.cx.rss.service.IRoleService;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;

public class OperateLimitAction extends BaseAction {
	
	@Inject
	private IOperateLimitService service;
	/*
	 * set the current service
	 * return service
	 */
	public void setService(IOperateLimitService service) {
		this.service = service;
	}
	
	@Inject
	private IRoleService roleService;

	public void setRoleService(IRoleService service) {
		this.roleService = service;
	}
	
	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		if(null!=form.get("moduleId")&&!"".equals(form.get("moduleId").toString())){
			Long id = new Long(CommUtil.null2String(form.get("moduleId")));
			if(0l==id)
				qo.addQuery("module is null", null);
			else
				qo.addQuery("module.id=?", new Object[]{id});
		}
		IPageList pageList = service.getOperateLimitBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delOperateLimit(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		OperateLimit object;
		if(null!=form.get("id")&&!"".equals(form.get("id").toString())){
			Long id = new Long(CommUtil.null2String(form.get("id")));
			object = service.getOperateLimit(id);
			form.toPo(object, true);
			if (!hasErrors())
				service.updateOperateLimit(id, object);
		}else{
			object = form.toPo(OperateLimit.class);
			if (!hasErrors())
				service.addOperateLimit(object);
		}
		return pageForExtForm(form);
	}
	
	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		OperateLimit object = service.getOperateLimit(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateOperateLimit(id, object);
		return pageForExtForm(form);
	}
	
	public Page updateRole(WebForm form){
		if(null!=form.get("operateLimitId")&&!"".equals(form.get("operateLimitId").toString())
		 &&null!=form.get("roles")&&!"".equals(form.get("roles").toString())){
			Long eid = new Long(CommUtil.null2String(form.get("operateLimitId")));
			OperateLimit operateLimit = service.getOperateLimit(eid);
			
			//首先要清空职员角色列表
			Set<Role> roleList = operateLimit.getRoleList(); 
			Iterator<Role> it = roleList.iterator();
			while(it.hasNext()){
				Role r = it.next();
				r.getOperateLimitList().remove(operateLimit);
				roleService.updateRole(r.getId(), r);
			}
			
			String roles = form.get("roles").toString();
			String [] roleIds = roles.split(",");			
			
			for(String rid : roleIds){				
				Role role = roleService.getRole(Long.valueOf(rid));				
				if(null==role||role.getOperateLimitList().contains(operateLimit))
					continue;
				else{
					role.getOperateLimitList().add(operateLimit);
					roleService.updateRole(role.getId(), role);
				}
			}
		}
		return success2(form, true, null);
	}
	
	public Page tree(WebForm form){
		if(null!=form.get("moduleId")&&!"".equals(form.get("moduleId").toString())){
			Integer id = new Integer(form.get("moduleId").toString());			
			form.addResult("json", service.loadTree(id));			
		}
		return getJsonByPage();
	}
}