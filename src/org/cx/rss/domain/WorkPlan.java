package org.cx.rss.domain;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.easyjf.container.annonation.POLoad;

@Entity
public class WorkPlan {
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE)
	private Long id;	
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;                 //制单时间
	
	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.ALL)	
	private User user;                 //制单人
	@Column(columnDefinition="TEXT")
	private String remark;              //备注
	//------------------------rss set---------------------------
	@POLoad(name="author")
	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.ALL)
	private User author;              //作者
	private String title;             //标题
	@Temporal(TemporalType.TIMESTAMP)
	private Date pubDate;            //发布时间
	private String comments;         //注释
	
	@Column(columnDefinition="TEXT")
	private String description;      //内容
	private String link;             //链接网址
	
	//------------------------plan set-----------------------------
	@Temporal(TemporalType.TIMESTAMP)
	private Date startDate;          //任务开始时间
	@Temporal(TemporalType.TIMESTAMP)
	private Date closingDate;        //任务截止时间
	private Integer warningDay;     //提前几天提醒
	private Boolean disabled = false;       //是否禁用
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
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public User getAuthor() {
		return author;
	}
	public void setAuthor(User author) {
		this.author = author;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Date getPubDate() {
		return pubDate;
	}
	public void setPubDate(Date pubDate) {
		this.pubDate = pubDate;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getClosingDate() {
		return closingDate;
	}
	public void setClosingDate(Date closingDate) {
		this.closingDate = closingDate;
	}
	public Integer getWarningDay() {
		return warningDay;
	}
	public void setWarningDay(Integer warningDay) {
		this.warningDay = warningDay;
	}
	public Boolean getDisabled() {
		return disabled;
	}
	public void setDisabled(Boolean disabled) {
		this.disabled = disabled;
	}
}
