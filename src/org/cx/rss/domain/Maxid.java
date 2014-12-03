package org.cx.rss.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Maxid {
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE)
	private Long id;	
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;                 //时间
	
	private Integer year;
	
	private String month;
	
	private Integer newid;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Integer getNewid() {
		return newid;
	}

	public void setNewid(Integer newid) {
		this.newid = newid;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}
	
}
