package org.cx.rss.mvc;

import org.cx.rss.domain.Equipment;
import org.cx.rss.service.IEquipmentService;

import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.tools.IPageList;

public class EquipmentAction extends BaseAction {
	
	@Inject
	private IEquipmentService service;
	/*
	 * set the current service
	 * return service
	 */
	public void setService(IEquipmentService service) {
		this.service = service;
	}
	
	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = service.getEquipmentBy(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delEquipment(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {
		Equipment object;
		if(null!=form.get("id")&&!"".equals(form.get("id").toString())){
			Long id = new Long(CommUtil.null2String(form.get("id")));
			object = service.getEquipment(id);
			form.toPo(object, true);
			if (!hasErrors())
				service.updateEquipment(id, object);
		}else{
			object = form.toPo(Equipment.class);
			if (!hasErrors())
				service.addEquipment(object);
		}
		return pageForExtForm(form);
	}
	
	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		Equipment object = service.getEquipment(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateEquipment(id, object);
		return pageForExtForm(form);
	}
}