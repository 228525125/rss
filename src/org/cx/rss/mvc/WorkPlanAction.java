package org.cx.rss.mvc;

import java.util.Date;

import org.cx.rss.domain.WorkPlan;
import org.cx.rss.service.IWorkPlanService;

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
 * WorkPlanAction
 * @author EasyJWeb 1.0-m2
 * $Id: WorkPlanAction.java,v 0.0.1 2010-6-3 23:18:45 EasyJWeb 1.0-m3 with ExtJS Exp $
 */
@Action
public class WorkPlanAction extends AbstractPageCmdAction {
	
	@Inject
	private IWorkPlanService service;
	/*
	 * set the current service
	 * return service
	 */
	public void setService(IWorkPlanService service) {
		this.service = service;
	}
	
	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = service.getWorkPlanBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delWorkPlan(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		WorkPlan object = form.toPo(WorkPlan.class);		
		if(null!=form.get("warningDay")&&!"默认是开始时间".equals(form.get("warningDay").toString())){
			Integer day = CommUtil.null2Int(form.get("warningDay"));
			object.setWarningDay(day);
		}
		object.setDate(new Date());
		service.addWorkPlan(object);
		return pageForExtForm(form);
	}
	
	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		WorkPlan object = service.getWorkPlan(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateWorkPlan(id, object);
		return pageForExtForm(form);
	}
}