package org.cx.rss.service.impl;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Calendar;

import com.easyjf.core.support.query.IQueryObject;
import com.easyjf.core.support.query.QueryUtil;
import com.easyjf.web.tools.IPageList;
import org.cx.rss.domain.Maxid;
import org.cx.rss.service.IMaxidService;
import org.cx.rss.dao.IMaxidDAO;


/**
 * MaxidServiceImpl
 * @author EasyJWeb 1.0-m2
 * $Id: MaxidServiceImpl.java,v 0.0.1 2011-7-29 12:39:52 EasyJWeb 1.0-m2 Exp $
 */
public class MaxidServiceImpl implements IMaxidService{
	
	private IMaxidDAO maxidDao;
	
	public void setMaxidDao(IMaxidDAO maxidDao){
		this.maxidDao=maxidDao;
	}
	
	public Long addMaxid(Maxid maxid) {	
		this.maxidDao.save(maxid);
		if (maxid != null && maxid.getId() != null) {
			return maxid.getId();
		}
		return null;
	}
	
	public Maxid getMaxid(Long id) {
		Maxid maxid = this.maxidDao.get(id);
		return maxid;
		}
	
	public boolean delMaxid(Long id) {	
			Maxid maxid = this.getMaxid(id);
			if (maxid != null) {
				this.maxidDao.remove(id);
				return true;
			}			
			return false;	
	}
	
	public boolean batchDelMaxids(List<Serializable> maxidIds) {
		
		for (Serializable id : maxidIds) {
			delMaxid((Long) id);
		}
		return true;
	}
	
	public IPageList getMaxidBy(IQueryObject queryObject) {	
		return QueryUtil.query(queryObject, Maxid.class,this.maxidDao);		
	}
	
	public boolean updateMaxid(Long id, Maxid maxid) {
		if (id != null) {
			maxid.setId(id);
		} else {
			return false;
		}
		this.maxidDao.update(maxid);
		return true;
	}	
	
	public String createMaxId() {
		// TODO Auto-generated method stub
		int year = Calendar.getInstance().get(Calendar.YEAR);
		String month = "";
		int m = Calendar.getInstance().get(Calendar.MONTH)+1;
		switch (m) {
			case 1: month += "A"; break;
			case 2: month += "B"; break;
			case 3: month += "C"; break;
			case 4: month += "D"; break;
			case 5: month += "E"; break;
			case 6: month += "F"; break;
			case 7: month += "G"; break;
			case 8: month += "H"; break;
			case 9: month += "J"; break;
			case 10: month += "K"; break;
			case 11: month += "L"; break;
			case 12: month += "M"; break;		
			default: break;
		}
		String sql = "select m from Maxid m order by m.year,m.month,m.newid desc";
		List list = maxidDao.query(sql, null, 0, 1);
		Maxid maxid = (Maxid) list.get(0);
		Maxid bean = new Maxid();
		if(year!=maxid.getYear()){
			bean.setYear(year);
			bean.setMonth("A");
			bean.setNewid(1);			
		}else if(!month.equals(maxid.getMonth())){
			bean.setYear(year);
			bean.setMonth(month);
			bean.setNewid(1);
		}else{
			bean.setYear(year);
			bean.setMonth(month);
			bean.setNewid(maxid.getNewid()+1);
		}
		bean.setDate(new Date(System.currentTimeMillis()));
		maxidDao.save(bean);
		String newid = bean.getNewid().toString();
		if(bean.getNewid()<10)
			newid = "0"+bean.getNewid();
		return bean.getYear().toString().substring(2)+bean.getMonth()+newid;
	}
	
	public static void main(String[] args) {
		System.out.println(Calendar.getInstance().get(Calendar.YEAR));
		System.out.println(Calendar.getInstance().get(Calendar.MONTH));		
	}
}
