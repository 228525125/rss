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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.easyjf.container.annonation.POLoad;

/**
 * 工位
 * @author Administrator
 *
 */
@Entity
@Table(name="CStation")
public class Role {
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE)
	private Long id;
	
	@Column(nullable=false,unique=true)
	private String code;   //编码
	
	private String name;   //名称
	
	@Column(length=50)
	private String rnumber;   //资源编号，关联k3资源清单	
	
	private String auxCode;   //简码
	
	private Boolean disabled = false; //禁用
	
	private String description;       //描述
	
	private String level;          //层次关系描述
	
	@POLoad(name="parent")
	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.ALL)
	@JoinColumn(name="parentId",nullable=true)
	private Role parent;//上级工位
	
	@ManyToMany (cascade = CascadeType.MERGE) 
	@JoinTable (name =  "RoleASOperateLimit" , //关联表名 
			inverseJoinColumns =  @JoinColumn (name =  "operateLimitId" ),//被维护端外键 
            joinColumns =  @JoinColumn (name =  "roleId" ))//维护端外键 
	private Set<OperateLimit>  operateLimitList = new HashSet<OperateLimit>();
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date date;                 //创建时间
	
	@ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.ALL)
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

	public Role getParent() {
		return parent;
	}

	public void setParent(Role parent) {
		this.parent = parent;
	}

	public Set<OperateLimit> getOperateLimitList() {
		return operateLimitList;
	}

	public void setOperateLimitList(Set<OperateLimit> operateLimitList) {
		this.operateLimitList = operateLimitList;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getRnumber() {
		return rnumber;
	}

	public void setRnumber(String rnumber) {
		this.rnumber = rnumber;
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
}
