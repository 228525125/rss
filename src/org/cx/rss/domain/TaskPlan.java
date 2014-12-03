package org.cx.rss.domain;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.easyjf.container.annonation.POLoad;

@Entity
public class TaskPlan {

	@Id
	@GeneratedValue(strategy=GenerationType.TABLE)
	private Long id;	
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;                 //制单时间
	
	@POLoad(name="equipment")
	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.ALL)
	@JoinColumn(name="equipmentId",nullable=true)
	private Equipment equipment;          //设备
	
	private String workNo;            //任务单编号
	
	private String workItemCode;        //物料代码
	
	private String workItemName;        //物料名称
	
	private String workItemModel;        //物料规格
	
	private String workUnit;            //计量单位
	
	private String workNumber;        //任务单数量
	
	private String workBatch;         //批次
	
	private String workDrawId;        //图号
	
	private String segment;           //班次
	
	private String status;            //状态
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date beginDate;               //计划开工时间
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date endDate;                 //计划结束时间
	
	private String operator;          //操作工
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date planDate;            //计划日期
	
	@Column(length=4000)
	private String remark;            //备注

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

	public Equipment getEquipment() {
		return equipment;
	}

	public void setEquipment(Equipment equipment) {
		this.equipment = equipment;
	}

	public String getWorkNo() {
		return workNo;
	}

	public void setWorkNo(String workNo) {
		this.workNo = workNo;
	}

	public String getWorkNumber() {
		return workNumber;
	}

	public void setWorkNumber(String workNumber) {
		this.workNumber = workNumber;
	}

	public String getSegment() {
		return segment;
	}

	public void setSegment(String segment) {
		this.segment = segment;
	}

	public Date getBeginDate() {
		return beginDate;
	}

	public void setBeginDate(Date beginDate) {
		this.beginDate = beginDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getOperator() {
		return operator;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getWorkItemCode() {
		return workItemCode;
	}

	public void setWorkItemCode(String workItemCode) {
		this.workItemCode = workItemCode;
	}

	public String getWorkItemName() {
		return workItemName;
	}

	public void setWorkItemName(String workItemName) {
		this.workItemName = workItemName;
	}

	public String getWorkItemModel() {
		return workItemModel;
	}

	public void setWorkItemModel(String workItemModel) {
		this.workItemModel = workItemModel;
	}

	public String getWorkUnit() {
		return workUnit;
	}

	public void setWorkUnit(String workUnit) {
		this.workUnit = workUnit;
	}

	public Date getPlanDate() {
		return planDate;
	}

	public void setPlanDate(Date planDate) {
		this.planDate = planDate;
	}

	public String getWorkBatch() {
		return workBatch;
	}

	public void setWorkBatch(String workBatch) {
		this.workBatch = workBatch;
	}

	public String getWorkDrawId() {
		return workDrawId;
	}

	public void setWorkDrawId(String workDrawId) {
		this.workDrawId = workDrawId;
	}
	
}
