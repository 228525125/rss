package org.cx.rss.service;

import java.io.Serializable;
import java.util.List;
import com.easyjf.web.tools.IPageList;
import com.easyjf.core.support.query.IQueryObject;
import org.cx.rss.domain.TaskPlan;
/**
 * TaskPlanService
 * @author EasyJWeb 1.0-m2
 * $Id: TaskPlanService.java,v 0.0.1 2011-9-1 13:10:43 EasyJWeb 1.0-m2 Exp $
 */
public interface ITaskPlanService {
	/**
	 * 保存一个TaskPlan，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addTaskPlan(TaskPlan instance);
	
	/**
	 * 根据一个ID得到TaskPlan
	 * 
	 * @param id
	 * @return
	 */
	TaskPlan getTaskPlan(Long id);
	
	/**
	 * 删除一个TaskPlan
	 * @param id
	 * @return
	 */
	boolean delTaskPlan(Long id);
	
	/**
	 * 批量删除TaskPlan
	 * @param ids
	 * @return
	 */
	boolean batchDelTaskPlans(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到TaskPlan
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getTaskPlanBy(IQueryObject queryObject);
	
	/**
	  * 更新一个TaskPlan
	  * @param id 需要更新的TaskPlan的id
	  * @param dir 需要更新的TaskPlan
	  */
	boolean updateTaskPlan(Long id,TaskPlan instance);
}
