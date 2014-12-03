package org.cx.rss.service.impl;
import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import org.cx.rss.domain.TaskPlan;
import org.cx.rss.service.ITaskPlanService;
import org.cx.rss.dao.ITaskPlanDAO;


/**
 * TaskPlanServiceImpl
 * @author EasyJWeb 1.0-m2
 * $Id: TaskPlanServiceImpl.java,v 0.0.1 2011-9-1 13:10:44 EasyJWeb 1.0-m2 Exp $
 */
public class TaskPlanServiceImpl implements ITaskPlanService{
	
	private ITaskPlanDAO taskPlanDao;
	
	public void setTaskPlanDao(ITaskPlanDAO taskPlanDao){
		this.taskPlanDao=taskPlanDao;
	}
	
	public Long addTaskPlan(TaskPlan taskPlan) {	
		this.taskPlanDao.save(taskPlan);
		if (taskPlan != null && taskPlan.getId() != null) {
			return taskPlan.getId();
		}
		return null;
	}
	
	public TaskPlan getTaskPlan(Long id) {
		TaskPlan taskPlan = this.taskPlanDao.get(id);
		return taskPlan;
		}
	
	public boolean delTaskPlan(Long id) {	
			TaskPlan taskPlan = this.getTaskPlan(id);
			if (taskPlan != null) {
				this.taskPlanDao.remove(id);
				return true;
			}			
			return false;	
	}
	
	public boolean batchDelTaskPlans(List<Serializable> taskPlanIds) {
		
		for (Serializable id : taskPlanIds) {
			delTaskPlan((Long) id);
		}
		return true;
	}
	
	public IPageList getTaskPlanBy(IQueryObject queryObject) {	
		return QueryUtil.query(queryObject, TaskPlan.class,this.taskPlanDao);		
	}
	
	public boolean updateTaskPlan(Long id, TaskPlan taskPlan) {
		if (id != null) {
			taskPlan.setId(id);
		} else {
			return false;
		}
		this.taskPlanDao.update(taskPlan);
		return true;
	}	
	
}
