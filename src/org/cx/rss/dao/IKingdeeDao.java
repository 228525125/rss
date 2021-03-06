package org.cx.rss.dao;

import java.util.List;
import java.util.Map;

public interface IKingdeeDao {

	public List queryForList(String sql);
	
	public Map queryForMap(String sql);
	
	public Object queryForObject(String sql,Class type);
	
	public void update(String sql);
	
	public void update(String sql, Object[] params);
	
	public void execute(String sql);
}
