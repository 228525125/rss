package org.cx.rss.domain;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.easyjf.container.annonation.POLoad;

/**
 * 文件
 * @author Administrator
 *
 */
@Entity
@Table(name="CFile")
public class OperateLimit {

	@Id
	@GeneratedValue(strategy=GenerationType.TABLE)
	private Long id;
	
	@Column(nullable=false,unique=true)
	private String code;   //编码
	
	private String name;   //名称
	
	private String auxCode;   //简码
	
	private Boolean disabled = false; //禁用
	
	private String description;       //描述
	
	private String level;        //层次关系描述
	
	@POLoad(name="module")
	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.ALL)
	@JoinColumn(name="moduleId",nullable=false)
	private Module module;            //所属产品
	
	@POLoad(name="fileClass")
	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.ALL)
	@JoinColumn(name="fileClassId",nullable=false)
	private Module fileClass;        //文件类型
	
	@ManyToMany(cascade = CascadeType.REFRESH, mappedBy = "operateLimitList", fetch = FetchType.LAZY)
	private Set<Role>  roleList = new HashSet<Role>();         //所属工位
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;                 //创建时间
	
	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.ALL)
	@JoinColumn(name="userId",nullable=true)
	private User user;                 //创建人

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAuxCode() {
		return auxCode;
	}

	public void setAuxCode(String auxCode) {
		this.auxCode = auxCode;
	}

	public Boolean getDisabled() {
		return disabled;
	}

	public void setDisabled(Boolean disabled) {
		this.disabled = disabled;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Module getModule() {
		return module;
	}

	public void setModule(Module module) {
		this.module = module;
	}
	
	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public Set<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(Set<Role> roleList) {
		this.roleList = roleList;
	}

	public Module getFileClass() {
		return fileClass;
	}

	public void setFileClass(Module fileClass) {
		this.fileClass = fileClass;
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

	public enum OperateLimitType {
		VISIBLE, READONLY, WRITE, MANAGE
	}
	
}
