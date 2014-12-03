package org.cx.rss.service.impl;
import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import org.cx.rss.domain.WorkPlan;
import org.cx.rss.service.IWorkPlanService;
import org.cx.rss.dao.IWorkPlanDAO;


/**
 * WorkPlanServiceImpl
 * @author EasyJWeb 1.0-m2
 * $Id: WorkPlanServiceImpl.java,v 0.0.1 2010-6-3 23:18:45 EasyJWeb 1.0-m2 Exp $
 */
public class WorkPlanServiceImpl implements IWorkPlanService{
	
	private IWorkPlanDAO workPlanDao;
	
	public void setWorkPlanDao(IWorkPlanDAO workPlanDao){
		this.workPlanDao=workPlanDao;
	}
	
	public Long addWorkPlan(WorkPlan workPlan) {	
		this.workPlanDao.save(workPlan);
		if (workPlan != null && workPlan.getId() != null) {
			return workPlan.getId();
		}
		return null;
	}
	
	public WorkPlan getWorkPlan(Long id) {
		WorkPlan workPlan = this.workPlanDao.get(id);
		return workPlan;
		}
	
	public boolean delWorkPlan(Long id) {	
			WorkPlan workPlan = this.getWorkPlan(id);
			if (workPlan != null) {
				this.workPlanDao.remove(id);
				return true;
			}			
			return false;	
	}
	
	public boolean batchDelWorkPlans(List<Serializable> workPlanIds) {
		
		for (Serializable id : workPlanIds) {
			delWorkPlan((Long) id);
		}
		return true;
	}
	
	public IPageList getWorkPlanBy(IQueryObject queryObject) {	
		return QueryUtil.query(queryObject, WorkPlan.class,this.workPlanDao);		
	}
	
	public boolean updateWorkPlan(Long id, WorkPlan workPlan) {
		if (id != null) {
			workPlan.setId(id);
		} else {
			return false;
		}
		this.workPlanDao.update(workPlan);
		return true;
	}	
	
}
