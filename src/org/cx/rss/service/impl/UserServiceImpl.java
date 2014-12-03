package org.cx.rss.service.impl;
import java.io.Serializable;
import java.util.List;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import org.cx.rss.domain.User;
import org.cx.rss.service.IUserService;
import org.cx.rss.dao.IUserDAO;


/**
 * UserServiceImpl
 * @author EasyJWeb 1.0-m2
 * $Id: UserServiceImpl.java,v 0.0.1 2010-6-3 23:18:34 EasyJWeb 1.0-m2 Exp $
 */
public class UserServiceImpl implements IUserService{
	
	private IUserDAO userDao;
	
	public void setUserDao(IUserDAO userDao){
		this.userDao=userDao;
	}
	
	public Long addUser(User user) {	
		this.userDao.save(user);
		if (user != null && user.getId() != null) {
			return user.getId();
		}
		return null;
	}
	
	public User getUser(Long id) {
		User user = this.userDao.get(id);
		return user;
		}
	
	public boolean delUser(Long id) {	
			User user = this.getUser(id);
			if (user != null) {
				this.userDao.remove(id);
				return true;
			}			
			return false;	
	}
	
	public boolean batchDelUsers(List<Serializable> userIds) {
		
		for (Serializable id : userIds) {
			delUser((Long) id);
		}
		return true;
	}
	
	public IPageList getUserBy(IQueryObject queryObject) {	
		return QueryUtil.query(queryObject, User.class,this.userDao);		
	}
	
	public boolean updateUser(Long id, User user) {
		if (id != null) {
			user.setId(id);
		} else {
			return false;
		}
		this.userDao.update(user);
		return true;
	}	
	
	public User validate(String account, String password) {
		// TODO Auto-generated method stub
		Object[] params = new Object[]{account};
		String sql = "select u from User u where u.account=?";
		List list = userDao.query(sql, params, 0, 1);
		if (list.isEmpty())
			return null;	
		else {
			User user = (User) list.get(0);
			if (password.equals(user.getPassword())) 
				return user;
			else 
				return null;
		}
	}
	
	public User getUser(String account) {
		// TODO Auto-generated method stub
		Object[] params = new Object[]{account};
		String sql = "select u from User u where u.account=?";
		List list = userDao.query(sql, params, 0, 1);
		if(list.isEmpty())
			return null;
		else
			return (User) list.get(0);
	}
	
}
