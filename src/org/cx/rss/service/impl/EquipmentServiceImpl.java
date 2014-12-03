package org.cx.rss.service.impl;
import java.io.Serializable;
import java.util.List;

import org.cx.rss.dao.IEquipmentDAO;
import org.cx.rss.domain.Equipment;
import org.cx.rss.service.IEquipmentService;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;


/**
 * EquipmentServiceImpl
 * @author EasyJWeb 1.0-m2
 * $Id: EquipmentServiceImpl.java,v 0.0.1 2011-9-1 13:16:33 EasyJWeb 1.0-m2 Exp $
 */
public class EquipmentServiceImpl implements IEquipmentService{
	
	private IEquipmentDAO equipmentDao;
	
	public void setEquipmentDao(IEquipmentDAO equipmentDao){
		this.equipmentDao=equipmentDao;
	}
	
	public Long addEquipment(Equipment equipment) {	
		this.equipmentDao.save(equipment);
		if (equipment != null && equipment.getId() != null) {
			return equipment.getId();
		}
		return null;
	}
	
	public Equipment getEquipment(Long id) {
		Equipment equipment = this.equipmentDao.get(id);
		return equipment;
	}
	
	public Equipment getEquipment(String name) {
		// TODO Auto-generated method stub
		List list = equipmentDao.query("select e from Equipment e where e.name=?1", new Object[]{name}, 0, 1);
		if(list.isEmpty())
			return null;
		else
			return (Equipment) list.get(0);
	}
	
	public boolean delEquipment(Long id) {	
			Equipment equipment = this.getEquipment(id);
			if (equipment != null) {
				this.equipmentDao.remove(id);
				return true;
			}			
			return false;	
	}
	
	public boolean batchDelEquipments(List<Serializable> equipmentIds) {
		
		for (Serializable id : equipmentIds) {
			delEquipment((Long) id);
		}
		return true;
	}
	
	public IPageList getEquipmentBy(IQueryObject queryObject) {	
		return QueryUtil.query(queryObject, Equipment.class,this.equipmentDao);		
	}
	
	public boolean updateEquipment(Long id, Equipment equipment) {
		if (id != null) {
			equipment.setId(id);
		} else {
			return false;
		}
		this.equipmentDao.update(equipment);
		return true;
	}	
	
}
