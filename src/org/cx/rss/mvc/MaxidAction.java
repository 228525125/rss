package org.cx.rss.mvc;

import org.cx.rss.domain.Maxid;
import org.cx.rss.service.IMaxidService;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;


/**
 * MaxidAction
 * @author EasyJWeb 1.0-m2
 * $Id: MaxidAction.java,v 0.0.1 2011-7-29 12:39:52 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
public class MaxidAction extends BaseAction {
	
	@Inject
	private IMaxidService service;
	/*
	 * set the current service
	 * return service
	 */
	public void setService(IMaxidService service) {
		this.service = service;
	}
	
	public void doIndex(WebForm f, Module m) {
		String newid = service.createMaxId();
		f.addResult("newid", newid);
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = service.getMaxidBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delMaxid(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		Maxid object = form.toPo(Maxid.class);
		if (!hasErrors())
			service.addMaxid(object);
		return pageForExtForm(form);
	}
	
	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		Maxid object = service.getMaxid(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateMaxid(id, object);
		return pageForExtForm(form);
	}
}