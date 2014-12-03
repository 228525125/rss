package org.cx.rss.service.impl;
import java.io.Serializable;
import java.util.List;

import org.cx.rss.dao.IRoleDAO;
import org.cx.rss.domain.Role;
import org.cx.rss.service.IRoleService;
import org.cx.rss.util.AppContext;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;


/**
 * RoleServiceImpl
 * @author EasyJWeb 1.0-m2
 * $Id: RoleServiceImpl.java,v 0.0.1 2011-3-11 11:14:16 EasyJWeb 1.0-m2 Exp $
 */
public class RoleServiceImpl implements IRoleService{
	
	private IRoleDAO roleDao;
	
	public void setRoleDao(IRoleDAO roleDao){
		this.roleDao=roleDao;
	}
	
	public Long addRole(Role role) {	
		updateLevel(role);
		this.roleDao.save(role);
		if (role != null && role.getId() != null) {
			return role.getId();
		}
		return null;
	}
	
	public Role getRole(Long id) {
		Role role = this.roleDao.get(id);
		return role;
		}
	
	public boolean delRole(Long id) {	
			Role role = this.getRole(id);
			if (role != null) {
				this.roleDao.remove(id);
				return true;
			}			
			return false;	
	}
	
	public boolean batchDelRoles(List<Serializable> roleIds) {
		
		for (Serializable id : roleIds) {
			delRole((Long) id);
		}
		return true;
	}
	
	public IPageList getRoleBy(IQueryObject queryObject) {	
		return QueryUtil.query(queryObject, Role.class,this.roleDao);		
	}
	
	public boolean updateRole(Long id, Role role) {
		if (id != null) {
			role.setId(id);
		} else {
			return false;
		}
		updateLevel(role);
		this.roleDao.update(role);
		return true;
	}	
	
	public String loadTree(Integer currentNodeId) {
		// TODO Auto-generated method stub
		String result = "[";
		String sql;
		if(new Integer(0).equals(currentNodeId))
			sql = "select o from Role o where o.parent is null and o.disabled=0";
		else
			sql = "select o from Role o where o.parent.id="+currentNodeId+" and o.disabled=0";
		List list = roleDao.query(sql, null, 0, AppContext.RESULTSIZE);
		for(int i=0;i<list.size();i++){
			Role role = (Role) list.get(i);
			Long id = role.getId();
			result += "{id:"+id+",text:'"+role.getName()+"("+role.getCode()+")',";
			if(isLeaf(id))
				result += "leaf:true}";
			else
				result += "leaf:false}";
			if(i<list.size()-1)
				result += ",";
		}
		return result+"]";
	}
	
	private boolean isLeaf(Long nodeId){
		String sql = "select o from Role o where o.parent.id="+nodeId+" and o.disabled=false";
		List list = roleDao.query(sql, null, 0, 1);
		return list.isEmpty();
	}
	
	private void updateLevel(Role role){
		Role parent = role.getParent();
		if(null!=parent)
			role.setLevel(parent.getLevel()+"-"+role.getCode());
		else
			role.setLevel(role.getCode());
	}
	
}
