package org.cx.rss.dao.impl;

import java.util.List;
import java.util.Map;

import org.cx.rss.dao.IKingdeeDao;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class KingdeeDaoImpl extends JdbcDaoSupport implements IKingdeeDao {

	public List queryForList(String sql) {
		// TODO Auto-generated method stub
		return getJdbcTemplate().queryForList(sql);
	}

	public Map queryForMap(String sql) {
		// TODO Auto-generated method stub
		return getJdbcTemplate().queryForMap(sql);
	}

	public Object queryForObject(String sql, Class type) {
		// TODO Auto-generated method stub
		return getJdbcTemplate().queryForObject(sql, type);
	}

	public void update(String sql) {
		// TODO Auto-generated method stub
		getJdbcTemplate().update(sql);
	}
	
	public void update(String sql, Object[] params) {
		// TODO Auto-generated method stub
		getJdbcTemplate().update(sql, params);		
	}
	
	public void execute(String sql){
		getJdbcTemplate().execute(sql);
	}
}
