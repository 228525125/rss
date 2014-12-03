package org.cx.rss.mvc;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

import org.apache.commons.fileupload.FileItem;
import org.cx.rss.domain.Equipment;
import org.cx.rss.domain.TaskPlan;
import org.cx.rss.service.IEquipmentService;
import org.cx.rss.service.ITaskPlanService;
import org.cx.rss.util.Util;

import com.easyjf.container.annonation.Action;
import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.util.CommUtil;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;
import com.easyjf.web.tools.IPageList;

public class TaskPlanAction extends BaseAction {
	
	@Inject
	private ITaskPlanService service;
	
	@Inject
	private IEquipmentService equipmentService;
	
	public void setEquipmentService(IEquipmentService equipmentService) {
		this.equipmentService = equipmentService;
	}

	public void setService(ITaskPlanService service) {
		this.service = service;
	}
	
	public Page doIndex(WebForm f, Module m) {
		return page("list");
	}

	public Page doList(WebForm form) {
		QueryObject qo = form.toPo(QueryObject.class);
		String query = "";
		Date begin = null;
		Date end = null;		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		if(null!=form.get("query")&&!"".equals(form.get("query").toString())){
			query = form.get("query").toString();
			qo.addQuery(" obj.workNo like '%"+query+"%' or obj.equipment.name like '%"+query+"%' or obj.workItemCode like '%"+query+"%' or obj.workItemName like '%"+query+"%' or obj.workItemModel like '%"+query+"%'", new Object[]{});
		}
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString())&&null!=form.get("end")&&!"".equals(form.get("end").toString())){
			try {
				begin = df.parse(form.get("begin").toString());
				end = df.parse(form.get("end").toString());				
				qo.addQuery(" obj.date between ?1 and ?2 ", new Object[]{begin,new Date(end.getTime()+1000l*60*60*24*1)});
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}			
		}
		IPageList pageList = service.getTaskPlanBy(qo);
		
		/*if(null!=form.get("beginsegment")&&!"".equals(form.get("beginsegment").toString())&&null!=form.get("endsegment").toString()&&!"".equals(form.get("endsegment").toString())){
			String beginsegment = form.get("beginsegment").toString();
			String endsegment = form.get("endsegment").toString();
			
			ArrayList al = new ArrayList();
			List list = pageList.getResult();
			
			for(int i=0;null!=list&&i<list.size();i++){
				TaskPlan bean = (TaskPlan) list.get(i);
				if(bean.getPlanDate().getTime()<(begin.getTime()+(1000l*60*60*24*1-1))){
					if(-1==Util.compareTo(bean.getSegment(),beginsegment)){      //如果对象班次小于起始班次
						al.add(bean);
					}
				}
				if(bean.getPlanDate().getTime()>end.getTime()+1){
					if(1==Util.compareTo(bean.getSegment(), endsegment)){
						al.add(bean);
					}
				}
			}
			if(null!=list&&!list.isEmpty()){
				list.removeAll(al);				
			}				
		}*/	
		form.jsonResult(pageList);
		
		return Page.JSONPage;
	}

	public void print(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String query = "";
		Date begin = null;
		Date end = null;		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		if(null!=form.get("query")&&!"".equals(form.get("query").toString())){
			query = form.get("query").toString();
			qo.addQuery(" obj.workNo like '%"+query+"%' or obj.equipment.name like '%"+query+"%' or obj.workItemCode like '%"+query+"%' or obj.workItemName like '%"+query+"%' or obj.workItemModel like '%"+query+"%'", new Object[]{});
		}
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString())&&null!=form.get("end")&&!"".equals(form.get("end").toString())){
			try {
				begin = df.parse(form.get("begin").toString());
				end = df.parse(form.get("end").toString());
				end = new Date(end.getTime()+1000l*60*60*24*1);
				qo.addQuery(" obj.date between ?1 and ?2 ", new Object[]{begin,end});
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}			
		}
		IPageList pageList = service.getTaskPlanBy(qo);
		/*if(null!=form.get("beginsegment")&&!"".equals(form.get("beginsegment").toString())&&null!=form.get("endsegment").toString()&&!"".equals(form.get("endsegment").toString())){
			String beginsegment = form.get("beginsegment").toString();
			String endsegment = form.get("endsegment").toString();
			
			ArrayList al = new ArrayList();
			List list = pageList.getResult();
			
			for(int i=0;null!=list&&i<list.size();i++){
				TaskPlan bean = (TaskPlan) list.get(i);
				if(bean.getPlanDate().getTime()<(begin.getTime()+(1000l*60*60*24*1-1))){
					if(-1==Util.compareTo(bean.getSegment(),beginsegment)){      //如果对象班次小于起始班次
						al.add(bean);
					}
				}
				if(bean.getPlanDate().getTime()>end.getTime()+1){
					if(1==Util.compareTo(bean.getSegment(), endsegment)){
						al.add(bean);
					}
				}
			}
			if(null!=list)
				list.removeAll(al);
		}*/
		form.addResult("list", pageList.getResult());
		form.addResult("newDate", new Date(System.currentTimeMillis()));
	}

	public Page doRemove(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		service.delTaskPlan(id);
		return pageForExtForm(form);
	}

	public Page doSave(WebForm form) {		
		TaskPlan object;
		if(null!=form.get("id")&&!"".equals(form.get("id").toString())){
			Long id = new Long(CommUtil.null2String(form.get("id")));
			object = service.getTaskPlan(id);
			form.toPo(object, true);
			if (!hasErrors())
				service.updateTaskPlan(id, object);
		}else{
			object = form.toPo(TaskPlan.class);
			if (!hasErrors()){
				object.setDate(new Date(System.currentTimeMillis()));
				service.addTaskPlan(object);
			}
		}
		return pageForExtForm(form);
		
	}
	
	public Page doUpdate(WebForm form) {
		Long id = new Long(CommUtil.null2String(form.get("id")));
		TaskPlan object = service.getTaskPlan(id);
		form.toPo(object, true);
		if (!hasErrors())
			service.updateTaskPlan(id, object);
		return pageForExtForm(form);
	}
}