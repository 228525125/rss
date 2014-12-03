package org.cx.rss.mvc;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.cx.rss.domain.User;
import org.cx.rss.util.JsonUtil;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.easyjf.web.ActionContext;
import com.easyjf.web.Module;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.core.AbstractPageCmdAction;

public class BaseAction extends AbstractPageCmdAction {
	
	private String port = "8080";
	private String host = "http://192.168.1.200";
	private Boolean needLogin = true;
	private User user;
	
	public User getUser() {
		return user;
	}

	public String getPort() {
		return port;
	}

	public String getHost() {
		return host;
	}

	public Boolean getNeedLogin() {
		return needLogin;
	}

	public void setNeedLogin(Boolean needLogin) {
		this.needLogin = needLogin;
	}
	
	@Override
	public Object doBefore(WebForm form, Module module) {
		// TODO Auto-generated method stub
		user = (User) ActionContext.getContext().getSession().getAttribute("user");
		return super.doBefore(form, module);
	}
	
	@Override
	public Object doAfter(WebForm form, Module module) {
		// TODO Auto-generated method stub
		String contextPath = ActionContext.getContext().getRequest().getContextPath();
		form.addResult("ContextPath", contextPath);
		form.addResult("realPath", host+":"+port+contextPath);		
		return super.doAfter(form, module);
	}
	
	protected Page getJsonByPage(){
		Page page = new Page("jsonstore","frame/store.json");
		page.setContentType("application/json;charset=UTF-8");
		return page;
	}
	
	/*protected Page reset(WebForm form, Module module){	
		return null;
	}*/	
	
	/**
	 * 
	 * @param data 类型必须为List<Map> / Map / String []
	 * @return
	 */
	protected Page getJsonByPage(WebForm form, Object data){
		if (data instanceof List) {
			List list = (List) data;
			form.addResult("json", JsonUtil.toJSONArray(JSONArray.toJSONString(list)));
		}
		if (data instanceof Map) {
			Map map = (Map) data;
			form.addResult("json", JsonUtil.toJSONObject(JSONObject.toJSONString(map)));
		}
		if (data instanceof String[]) {
			String[] values = (String[]) data;
			form.addResult("json", JsonUtil.toJSONValue(values[0], values[1]));
		}
		return getJsonByPage();
	}
	
	/**
	 * 该方法对应，Ext 的 doAction 的回调方法success/failure
	 * @param form
	 * @param isSuccess 如果true 则触发success，false则触发failure 
	 * @param data 类型必须为List<Map> / Map / String []  或者为null
	 * @param msg 可以为null
	 * @return
	 */
	protected Page success(WebForm form, boolean isSuccess, Object data, String msg){
		form.addResult("json", JsonUtil.success(isSuccess, data, msg));
		return getJsonByPage();
	}
	
	/**
	 * 该方法与上面的方法不同之处在于，这个方法用于Ext.Ajax.request.success回调方法
	 * @param form
	 * @param isSuccess
	 * @param msg
	 * @return
	 */
	protected Page success2(WebForm form, boolean isSuccess, String msg){
		Map data = new HashMap();
		data.put("success", isSuccess);
		if(null!=msg&&!"".equals(msg))
			data.put("msg", msg);
		return getJsonByPage(form, data);
	}
	
}
