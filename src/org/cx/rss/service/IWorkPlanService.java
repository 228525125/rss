package org.cx.rss.service;

import java.io.Serializable;
import java.util.List;
import com.easyjf.web.tools.IPageList;
import com.easyjf.core.support.query.IQueryObject;
import org.cx.rss.domain.WorkPlan;
/**
 * WorkPlanService
 * @author EasyJWeb 1.0-m2
 * $Id: WorkPlanService.java,v 0.0.1 2010-6-3 23:18:44 EasyJWeb 1.0-m2 Exp $
 */
public interface IWorkPlanService {
	/**
	 * 保存一个WorkPlan，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addWorkPlan(WorkPlan instance);
	
	/**
	 * 根据一个ID得到WorkPlan
	 * 
	 * @param id
	 * @return
	 */
	WorkPlan getWorkPlan(Long id);
	
	/**
	 * 删除一个WorkPlan
	 * @param id
	 * @return
	 */
	boolean delWorkPlan(Long id);
	
	/**
	 * 批量删除WorkPlan
	 * @param ids
	 * @return
	 */
	boolean batchDelWorkPlans(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到WorkPlan
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getWorkPlanBy(IQueryObject queryObject);
	
	/**
	  * 更新一个WorkPlan
	  * @param id 需要更新的WorkPlan的id
	  * @param dir 需要更新的WorkPlan
	  */
	boolean updateWorkPlan(Long id,WorkPlan instance);
}
