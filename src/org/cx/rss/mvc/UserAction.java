package org.cx.rss.mvc;

import org.cx.rss.domain.User;
import org.cx.rss.service.IKingdeeService;
import org.cx.rss.service.IUserService;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.ActionContext;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.core.ExtResult;
import com.easyjf.web.tools.IPageList;


public class UserAction extends BaseAction {
	
	@Inject
	private IUserService service;
	
	@Inject
	private IKingdeeService kingdeeService;

	public void setKingdeeService(IKingdeeService kingdeeService) {
		this.kingdeeService = kingdeeService;
	}
	/*
	 * set the current service
	 * return service
	 */
	public void setService(IUserService service) {
		this.service = service;
	}
	
	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = service.getUserBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delUser(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		User object = form.toPo(User.class);
		if (!hasErrors())
			service.addUser(object);
		return pageForExtForm(form);
	}
	
	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		User object = service.getUser(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateUser(id, object);
		return pageForExtForm(form);
	}
	
	public Page validate(WebForm form){
		ExtResult r = new ExtResult();		
		if(getNeedLogin()){
			String acc = form.get("account").toString();
			String pwd = form.get("password").toString();
			User user = service.validate(acc, pwd);
			if (null!=user){
				ActionContext.getContext().getSession().setAttribute("user", user);
				r.setSuccess(true);	
			}
			else{
				r.setSuccess(false);
				r.getErrors().put("password", "用户或密码不正确，请检查！");
			}
		}else{
			r.setSuccess(true);
		}
		form.jsonResult(r);
		this.forwardPage=Page.JSONPage;
		return Page.JSONPage;	
	}
	
	public Page validate1(WebForm form){
		ExtResult r = new ExtResult();		
		String acc = form.get("account").toString();
		String pwd = form.get("password").toString();
		if(kingdeeService.exist_account(acc)){
			User user = service.getUser(acc);
			if(null==user){
				User u = form.toPo(User.class);				
				service.addUser(u);
				ActionContext.getContext().getSession().setAttribute("user", u);
			}else{
				if(pwd.equals(user.getPassword())){
					ActionContext.getContext().getSession().setAttribute("user", user);
					r.setSuccess(true);	
				}else{
					r.setSuccess(false);
					r.getErrors().put("password", "用户或密码不正确，请检查！");
				}
			}
		}else{
			r.setSuccess(false);
			r.getErrors().put("account", "用户不存在，请检查！");
		}

		form.jsonResult(r);
		this.forwardPage=Page.JSONPage;
		return Page.JSONPage;	
	}
}