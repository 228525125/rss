package org.cx.rss.service;

import java.io.Serializable;
import java.util.List;

import org.cx.rss.domain.Equipment;

import com.easyjf.web.tools.IPageList;
import com.easyjf.core.support.query.IQueryObject;
/**
 * EquipmentService
 * @author EasyJWeb 1.0-m2
 * $Id: EquipmentService.java,v 0.0.1 2011-9-1 13:16:33 EasyJWeb 1.0-m2 Exp $
 */
public interface IEquipmentService {
	/**
	 * 保存一个Equipment，如果保存成功返回该对象的id，否则返回null
	 * 
	 * @param instance
	 * @return 保存成功的对象的Id
	 */
	Long addEquipment(Equipment instance);
	
	/**
	 * 根据一个ID得到Equipment
	 * 
	 * @param id
	 * @return
	 */
	Equipment getEquipment(Long id);
	
	Equipment getEquipment(String name);
	
	/**
	 * 删除一个Equipment
	 * @param id
	 * @return
	 */
	boolean delEquipment(Long id);
	
	/**
	 * 批量删除Equipment
	 * @param ids
	 * @return
	 */
	boolean batchDelEquipments(List<Serializable> ids);
	
	/**
	 * 通过一个查询对象得到Equipment
	 * 
	 * @param properties
	 * @return
	 */
	IPageList getEquipmentBy(IQueryObject queryObject);
	
	/**
	  * 更新一个Equipment
	  * @param id 需要更新的Equipment的id
	  * @param dir 需要更新的Equipment
	  */
	boolean updateEquipment(Long id,Equipment instance);
}
