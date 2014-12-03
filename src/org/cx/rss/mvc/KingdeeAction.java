package org.cx.rss.mvc;

import static org.jmesa.facade.TableFacadeFactory.createTableFacade;
import static org.jmesa.limit.ExportType.JEXCEL;

import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.cx.rss.service.IKingdeeService;
import org.cx.rss.util.Util;
import org.jmesa.facade.TableFacade;
import org.jmesa.limit.Limit;
import org.jmesa.view.component.Column;
import org.jmesa.view.component.Row;
import org.jmesa.view.component.Table;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.web.ActionContext;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;
import com.easyjf.web.tools.IPageList;
import com.sun.syndication.feed.rss.Channel;
import com.sun.syndication.feed.rss.Description;
import com.sun.syndication.feed.rss.Guid;
import com.sun.syndication.feed.rss.Item;
import com.sun.syndication.io.FeedException;
import com.sun.syndication.io.WireFeedOutput;

public class KingdeeAction extends BaseAction {	
	
	@Inject
	private IKingdeeService kingdeeService;

	public void setKingdeeService(IKingdeeService kingdeeService) {
		this.kingdeeService = kingdeeService;
	}
	
	public Page report_xsddhztj(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);;
		String query = "";
		String huizong = "2";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("huizong")&&!"".equals(form.get("huizong").toString()))
			huizong = form.get("huizong").toString();
		IPageList pageList = kingdeeService.report_xsddhztj(qo,query,begin,end,huizong);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page report_xsckhztj(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);;
		String query = "";
		String huizong = "2";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("huizong")&&!"".equals(form.get("huizong").toString()))
			huizong = form.get("huizong").toString();
		IPageList pageList = kingdeeService.report_xsckhztj(qo,query,begin,end,huizong);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page report_xsfphztj(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);;
		String query = "";
		String huizong = "2";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("huizong")&&!"".equals(form.get("huizong").toString()))
			huizong = form.get("huizong").toString();
		IPageList pageList = kingdeeService.report_xsfphztj(qo,query,begin,end,huizong);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page report_scxh(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.report_scxh(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page report_scxhhz(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String status = "1";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();

		IPageList pageList;
		if("3".equals(status))
			pageList = kingdeeService.report_scxhhz_3(qo,begin,end);
		else if("2".equals(status))
			pageList = kingdeeService.report_scxhhz_2(qo,begin,end);
		else
			pageList = kingdeeService.report_scxhhz_1(qo,begin,end);         //实际使用
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page report_scxhhz_2(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();

		IPageList pageList = kingdeeService.report_scxhhz_2(qo,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page report_scxhhz_3(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();

		IPageList pageList = kingdeeService.report_scxhhz_3(qo,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public void hint_xsddjq(WebForm form){		
		Integer day = 1;
		if(null!=form.get("diff")&&!"".equals(form.get("diff").toString()))
			day = new Integer(form.get("diff").toString());
		List list = kingdeeService.hint_xsddjq(day);
		Channel channel = new Channel("rss_2.0");
		channel.setTitle("销售订单交期:"+day+"天");
		channel.setDescription("K3事务发布");
		channel.setLink("www.jhjd.com");
		channel.setEncoding("utf-8");
		channel.setLanguage("zh-cn");
		channel.setTtl(5);
		channel.setCopyright("版权所有：九环机电");
		channel.setPubDate(new Date(System.currentTimeMillis()));
		List<Item> items = new ArrayList<Item>();
		for(int i=0;i<list.size();i++){
			Map bean = (Map) list.get(i);
			Item item = new Item();
			item.setTitle(bean.get("cpmc").toString()+" - "+bean.get("cpgg"));
			item.setLink(getHost()+":"+getPort()+"/rss/kingdee.do?cmd=hint_list_xsdd&query="+bean.get("djbh")+"&GUID="+UUID.randomUUID());					
			item.setAuthor("金蝶K3");		
			item.setComments("销售订单交期提醒");
			item.setGuid(new Guid());
			item.setPubDate(new Date());
			Description description = new Description();
			description.setValue(bean.get("wldw").toString()+" "+bean.get("djbh")+" 号订单，"+bean.get("cpmc")+" / "+bean.get("cpgg")+" / "+bean.get("ddsl")+" "+bean.get("jldw")+"，距离交期还有 "+bean.get("sjc")+" 天，"+bean.get("djrq")+" 至 "+bean.get("jhrq"));
			
			item.setDescription(description);
			items.add(item);
		}
		channel.setItems(items);
		WireFeedOutput out = new WireFeedOutput();
		try {			
			String xml = out.outputString(channel);			
			form.addResult("rss", xml);
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (FeedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
		page("index");
	}	
	
	public void hint_list_xsdd(WebForm form){
		String djbh = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			djbh = form.get("query").toString();
		form.addResult("FOrderID", djbh);
	}
	
	public Page list_xsdd(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);;
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_xsdd(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_xsdd_wdj(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String query = "";
		IPageList pageList = kingdeeService.list_xsdd_wdj(qo,query,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_xsck(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);;
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_xsck(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_fhtz(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);;
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_fhtz(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_xsfp(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);;
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_xsfp(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_scrw(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_scrw(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_scrw_wja(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String query = "";
		IPageList pageList = kingdeeService.list_scrw_wja(qo,query,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_scrw_wlxh(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String style = "0";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("style")&&!"".equals(form.get("style").toString()))
			style = form.get("style").toString();
		IPageList pageList = kingdeeService.list_scrw_wlxh(qo,query,begin,end,style);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_scrw_tqja(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = kingdeeService.list_scrw_tqja(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_jskc_lhbz(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String query = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		IPageList pageList = kingdeeService.list_jskc_lhbz(qo, query);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_scll(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_scll(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_sctl(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_sctl(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_scbf(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_scbf(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_cprk(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_cprk(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wwzc(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		String style = "0";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		if(null!=form.get("style")&&!"".equals(form.get("style").toString()))
			style = form.get("style").toString();
		IPageList pageList = kingdeeService.list_wwzc(qo,query,begin,end,status,style);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wwzc_edit(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String query = "999999999";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		IPageList pageList = kingdeeService.list_wwzc_edit(qo,query);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wwjs(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_wwjs(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wwjy(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_wwjy(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wwjysqd(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		IPageList pageList = kingdeeService.list_wwjysqd(qo,query,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	
	
	public Page list_aqkc(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String query = "";	
		String month = "12";
		String state = "0";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("month")&&!"".equals(form.get("month").toString())){
			month = form.get("month").toString();
		}
		if(null!=form.get("state")&&!"".equals(form.get("state").toString())){
			state = form.get("state").toString();
		}
		IPageList pageList = kingdeeService.list_aqkc(qo,query,month,state);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page chart_aqkc(WebForm form){
		String FItemID = "";
		Integer day  = 365;
		if(null!=form.get("day")&&!"".equals(form.get("day").toString())){
			day = new Integer(form.get("day").toString());
		}
		String begin = Util.getDate(day);
		String end = new Timestamp(System.currentTimeMillis()).toString().substring(0, 10);
		if(null!=form.get("FItemID")&&!"".equals(form.get("FItemID").toString()))
			FItemID = form.get("FItemID").toString();		
		
		List list = kingdeeService.chart_aqkc(FItemID, begin, end);
		return getJsonByPage(form, list);
	}
	
	public Page chart_column_xsck(WebForm form){
		Integer day  = 365;
		String wldm = "";
		String wldw = "";
		if(null!=form.get("day")&&!"".equals(form.get("day").toString())){
			day = new Integer(form.get("day").toString());
		}
		if(null!=form.get("wldm")&&!"".equals(form.get("wldm").toString())){
			wldm = form.get("wldm").toString();
		}
		if(null!=form.get("wldw")&&!"".equals(form.get("wldw").toString())){
			wldw = form.get("wldw").toString();
		}
		String begin = Util.getDate(day);
		String end = new Timestamp(System.currentTimeMillis()).toString().substring(0, 10);
		
		List list = kingdeeService.chart_column_xsck(begin, end,wldm,wldw);
		return getJsonByPage(form, list);
	}
	
	public Page chart_pie_xsck(WebForm form){
		Integer month  = 0;
		String huizong = "1";
		if(null!=form.get("month")&&!"".equals(form.get("month").toString())){
			month = new Integer(form.get("month").toString());
		}
		if(null!=form.get("huizong")&&!"".equals(form.get("huizong").toString())){
			huizong = form.get("huizong").toString();
		}
		String begin = Util.getMonth(month);
		String end = new Timestamp(System.currentTimeMillis()).toString().substring(0, 10);
		
		List list = kingdeeService.chart_pie_xsck(begin, end, huizong);
		return getJsonByPage(form, list);
	}
	
	public void export_scrw(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);;
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString())){
			query = form.get("query").toString();
			try {
				byte[] by = query.getBytes("ISO-8859-1");
				query = new String(by,"UTF-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_scrw(qo,query,begin,end,status);		
		List list = pageList.getResult();
		for(int i=0;null!=list&&i<list.size();i++){
			Map bean = (Map) list.get(i);
			bean.put("date", new Timestamp(System.currentTimeMillis()).toString().substring(0, 10));
			bean.put("planDate", new Timestamp(System.currentTimeMillis()).toString().substring(0, 10));
		}
		
		TableFacade tableFacade = createTableFacade("basic", ActionContext.getContext().getRequest());
		tableFacade.setItems(list); // set the items
		tableFacade.setStateAttr("restore"); // return to the table in the same state that the user left it.
		
		tableFacade.setExportTypes(ActionContext.getContext().getResponse(), JEXCEL);
		
		Limit limit = tableFacade.getLimit();
		limit.setExportType(JEXCEL);
        if (limit.isExported()) {
            export_scrw(tableFacade);
        }
	}
	
	public void export_aqkc(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);		
		String query = "";		
		String month = "12";
		String state = "0";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString())){
			query = form.get("query").toString();
			try {
				byte[] by = query.getBytes("ISO-8859-1");
				query = new String(by,"UTF-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				query = "";
			}
		}		
		if(null!=form.get("month")&&!"".equals(form.get("month").toString())){
			month = form.get("month").toString();
		}
		if(null!=form.get("state")&&!"".equals(form.get("state").toString())){
			state = form.get("state").toString();
		}
		IPageList pageList = kingdeeService.list_aqkc(qo,query,month,state);		
		List list = pageList.getResult();		
		
		TableFacade tableFacade = createTableFacade("basic", ActionContext.getContext().getRequest());
		tableFacade.setItems(list); // set the items
		tableFacade.setStateAttr("restore"); // return to the table in the same state that the user left it.
		
		tableFacade.setExportTypes(ActionContext.getContext().getResponse(), JEXCEL);
		
		Limit limit = tableFacade.getLimit();
		limit.setExportType(JEXCEL);
        if (limit.isExported()) {
            export_aqkc(tableFacade);
        }
	}
	
	public void export_scxh(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);;
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString())){
			query = form.get("query").toString();
			try {
				byte[] by = query.getBytes("ISO-8859-1");
				query = new String(by,"UTF-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				query = "";
			}
		}
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.report_scxh(qo,query,begin,end,status);		
		List list = pageList.getResult();		
		
		TableFacade tableFacade = createTableFacade("basic", ActionContext.getContext().getRequest());
		tableFacade.setItems(list); // set the items
		tableFacade.setStateAttr("restore"); // return to the table in the same state that the user left it.
		
		tableFacade.setExportTypes(ActionContext.getContext().getResponse(), JEXCEL);
		
		Limit limit = tableFacade.getLimit();
		limit.setExportType(JEXCEL);
        if (limit.isExported()) {
            export_scxh(tableFacade);
        }
	}
	
	public void export_scxhhz(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String status = "1";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		
		IPageList pageList; 
		if("3".equals(status))
			pageList = kingdeeService.report_scxhhz_3(qo,begin,end);
		else if("2".equals(status))
			pageList = kingdeeService.report_scxhhz_2(qo,begin,end);
		else
			pageList = kingdeeService.report_scxhhz_1(qo,begin,end);
		List list = pageList.getResult();		
		
		//格式处理
		if(!list.isEmpty()){
			HashMap m = (HashMap) list.get(0);
			String cpdm = m.get("cpdm").toString();
			m.put("cpdm", " "+cpdm);
			for(int i=1;i<list.size();i++){
				HashMap bean = (HashMap) list.get(i);
				String cpdm1 = m.get("cpdm").toString();
				String cpdm2 = bean.get("cpdm").toString();
				cpdm2 = " "+cpdm2;
				bean.put("cpdm", cpdm2);
				if(cpdm1.equals(cpdm2)){
					bean.put("byrk", "");
				}
								
				m = bean;
			}
		}
		
		TableFacade tableFacade = createTableFacade("basic", ActionContext.getContext().getRequest());
		tableFacade.setItems(list); // set the items
		tableFacade.setStateAttr("restore"); // return to the table in the same state that the user left it.
		
		tableFacade.setExportTypes(ActionContext.getContext().getResponse(), JEXCEL);
		
		Limit limit = tableFacade.getLimit();
		limit.setExportType(JEXCEL);
        if (limit.isExported()) {
            export_scxhhz(tableFacade);
        }
	}
	
	public void export_wwgxjgfhz(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String status = "1";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		
		IPageList pageList = kingdeeService.report_wwgxjgfhz(qo,begin,end);
			
		List list = pageList.getResult();		
		
		TableFacade tableFacade = createTableFacade("basic", ActionContext.getContext().getRequest());
		tableFacade.setItems(list); // set the items
		tableFacade.setStateAttr("restore"); // return to the table in the same state that the user left it.
		
		tableFacade.setExportTypes(ActionContext.getContext().getResponse(), JEXCEL);
		
		Limit limit = tableFacade.getLimit();
		limit.setExportType(JEXCEL);
        if (limit.isExported()) {
            export_wwgxjgfhz(tableFacade);
        }
	}
	
	public void export_cgwkp(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String huizong = "0";
		String dwdm = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString())){
			query = form.get("query").toString();
			try {
				query = new String(query.getBytes("ISO-8859-1"),"UTF-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				query = "";
			}
		}
			
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("huizong")&&!"".equals(form.get("huizong").toString()))
			huizong = form.get("huizong").toString();
		if(null!=form.get("dwdm")&&!"".equals(form.get("dwdm").toString()))
			dwdm = form.get("dwdm").toString();
		IPageList pageList = kingdeeService.list_cgwkp(qo,query,begin,end,huizong,dwdm);
		List list = pageList.getResult();		
		
		TableFacade tableFacade = createTableFacade("basic", ActionContext.getContext().getRequest());
		tableFacade.setItems(list); // set the items
		tableFacade.setStateAttr("restore"); // return to the table in the same state that the user left it.
		
		tableFacade.setExportTypes(ActionContext.getContext().getResponse(), JEXCEL);
		
		Limit limit = tableFacade.getLimit();
		limit.setExportType(JEXCEL);
        if (limit.isExported()) {
            export_cgwkp(tableFacade);
        }
	}
	
	public void export_xswkp(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String huizong = "0";
		String dwdm = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString())){
			query = form.get("query").toString();
			try {
				query = new String(query.getBytes("ISO-8859-1"),"UTF-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				query = "";
			}
		}
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("huizong")&&!"".equals(form.get("huizong").toString()))
			huizong = form.get("huizong").toString();
		if(null!=form.get("dwdm")&&!"".equals(form.get("dwdm").toString()))
			dwdm = form.get("dwdm").toString();
		IPageList pageList = kingdeeService.list_xswkp(qo,query,begin,end,huizong,dwdm);
		List list = pageList.getResult();		
		
		TableFacade tableFacade = createTableFacade("basic", ActionContext.getContext().getRequest());
		tableFacade.setItems(list); // set the items
		tableFacade.setStateAttr("restore"); // return to the table in the same state that the user left it.
		
		tableFacade.setExportTypes(ActionContext.getContext().getResponse(), JEXCEL);
		
		Limit limit = tableFacade.getLimit();
		limit.setExportType(JEXCEL);
        if (limit.isExported()) {
            export_xswkp(tableFacade);
        }
	}
	
	public Page list_cgsq(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_cgsq(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_cgdd(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_cgdd(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_lljysqd(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_lljysqd(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_lljyd(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_lljyd(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wgrk(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_wgrk(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_stjgrk(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_stjgrk(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_shd(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_shd(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page report_wwgxzxgzb(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";		
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		IPageList pageList = kingdeeService.report_wwgxzxgzb(qo,query,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public void caigou(WebForm form){
		/*String begin = "";
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH))+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		try {
			begin = new Timestamp(df.parse(Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH))+"-01").getTime()).toString().substring(0,10);			
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}*/
		
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		form.addResult("begin", begin);
		form.addResult("end", end);
		
		form.addPo(kingdeeService.count_wgjq(begin, end));
		form.addPo(kingdeeService.count_wxjq(begin, end));
		form.addPo(kingdeeService.count_wgjsl(begin, end));
		form.addPo(kingdeeService.count_wxjsl(begin, end));
		form.addPo(kingdeeService.count_wghgl(begin, end));
		form.addPo(kingdeeService.count_wxhgl(begin, end));
		
		form.addResult("wwjss", kingdeeService.count_task_wwjs("2013-01-01", "2099-12-31"));
		form.addResult("scrwwjsyja", kingdeeService.count_scrw_tqja());
	}
	
	public void zhizao(WebForm form){		
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		
		form.addPo(kingdeeService.count_scrwjsl(begin, end));
		form.addPo(kingdeeService.count_wjarwd(begin, end));
		form.addPo(kingdeeService.count_cphgl(begin, end));
		
	}
	
	public void pinzhi(WebForm form){		
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		
		form.addPo(kingdeeService.count_cpjyjsl(begin, end));
		form.addPo(kingdeeService.count_wgjyjsl(begin, end));
		form.addPo(kingdeeService.count_wwjyjsl(begin, end));
		
		/*
		 * 上面方法的wwtoday值有误，这里重新计算
		 */
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = kingdeeService.list_wwjywzdj(qo, begin, end);
		form.addResult("wwtoday1", pageList.getRowCount());
		
		/*
		 * 添加外协送检异常单据数
		 */
		form.addResult("wxsjycs", kingdeeService.count_wxsjyc(begin, end));
	}
	
	public void xiaoshou(WebForm form){		
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		
		form.addPo(kingdeeService.count_ddjsl(begin, end));	
		form.addPo(kingdeeService.count_wdjdd(begin, end));
	} 
	
	public Page list_wgjsl(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String status = "0";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_wgjsl(qo,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wxjsl(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String status = "0";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_wxjsl(qo,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wghgl(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String status = "0";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_wghgl(qo,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wxhgl(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String status = "0";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_wxhgl(qo,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_cphgl(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String status = "0";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_cphgl(qo,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wgjyjsl(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String status = "0";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_wgjyjsl(qo,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_cpjyjsl(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String status = "0";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_cpjyjsl(qo,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wwjyjsl(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String status = "0";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_wwjyjsl(qo,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_ddjsl(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String status = "0";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_ddjsl(qo,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_scrwdcl(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String status = "0";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_scrwdcl(qo,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_scrwwzdj(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		IPageList pageList = kingdeeService.list_scrwwzdj(qo,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_ddwzdj(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		IPageList pageList = kingdeeService.list_ddwzdj(qo,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wgwzdj(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String status = "0";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_wgwzdj(qo,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wxwzdj(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String status = "0";
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_wxwzdj(qo,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wgjywzdj(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");		
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		IPageList pageList = kingdeeService.list_wgjywzdj(qo,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wwjywzdj(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");		
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		IPageList pageList = kingdeeService.list_wwjywzdj(qo,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_cpjywzdj(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");		
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		IPageList pageList = kingdeeService.list_cpjywzdj(qo,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_cpjyd(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_cpjyd(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_cpjysqd(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String status = "";
		String style = "0";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		if(null!=form.get("style")&&!"".equals(form.get("style").toString()))
			style = form.get("style").toString();
		IPageList pageList = kingdeeService.list_cpjysqd(qo,query,begin,end,status,style);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page form_cpjyd(WebForm form){
		Object resp = form.get("resp");
		JSONParser parser = new JSONParser();
		JSONObject obj;
		try {
			obj = (JSONObject) parser.parse(resp.toString());
			JSONArray list = (JSONArray) obj.get("rows");
			for(Object jboj : list){
				JSONObject row = (JSONObject) jboj;
				try{
					String FInterID = row.get("FInterID").toString();					
					String FEntryID = row.get("FEntryID").toString();
					String FBillNo = row.get("FBillNo").toString();
					String FQty = row.get("FQty").toString();
					String FBatchNo = row.get("FBatchNo").toString();
					String FICMOInterID = row.get("FICMOInterID").toString();
					kingdeeService.copy_cpjyd(FBillNo, FInterID, FEntryID, FQty, FBatchNo, FICMOInterID);					
				} catch(java.lang.NumberFormatException e){
					continue;
				}
			}
		} catch (org.json.simple.parser.ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return success2(form, true, "处理完毕！");
	}
	
	public Page form_wwjysqd(WebForm form){
		String IP = ActionContext.getContext().getRequest().getRemoteAddr();
		Object resp = form.get("resp");
		JSONParser parser = new JSONParser();
		JSONObject obj;
		try {
			obj = (JSONObject) parser.parse(resp.toString());
			JSONArray list = (JSONArray) obj.get("rows");
			for(Object jboj : list){
				JSONObject row = (JSONObject) jboj;
				try{
					String FInterID = row.get("FInterID").toString();					
					String FEntryID = row.get("FEntryID").toString();					
					String FQty = row.get("FQty").toString();
					String sfjy = row.get("sfjy").toString();
					String dj = row.get("dj").toString();
					String user = "";
					String jyfs = "检验";
					if("192.168.1.174".equals(IP))
						user = "游峰";
					else if("192.168.1.106".equals(IP))
						user = "李志敏";
					else
						user = "韩阳自";
					if("0".equals(sfjy))
						jyfs = "免检";
					else
						jyfs = "检验";
					kingdeeService.insert_wwjysqd(FInterID, FEntryID, FQty, user, jyfs, dj);					
				} catch(java.lang.NumberFormatException e){
					continue;
				}
			}
		} catch (org.json.simple.parser.ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return success2(form, true, "处理完毕！");
	}
	
	public void task(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = "2011-01-01";
		String end = new Timestamp(System.currentTimeMillis()).toString().substring(0, 10);
		int wgrk = 0;
		int cprk = 0;
		int stjgrk = 0;
		int cgsq = 0;
		if(null!=getUser()){
			wgrk = kingdeeService.count_task_wgrk(getUser().getAccount(), begin, end);
			cprk = kingdeeService.count_task_cprk(getUser().getAccount(),begin,end);
			stjgrk = kingdeeService.count_task_stjgrk(getUser().getAccount(),begin,end);
			cgsq = kingdeeService.count_task_cgsq(getUser().getAccount(),begin,end);
			form.addResult("wgrk", wgrk);
			form.addResult("cprk", cprk);
			form.addResult("stjgrk", stjgrk);
			form.addResult("cgsq", cgsq);
		}
	}
	
	public Page list_task_wgrk(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		IPageList pageList = kingdeeService.list_task_wgrk(qo,getUser().getAccount(),query,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_task_cgsq(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		IPageList pageList = kingdeeService.list_task_cgsq(qo,getUser().getAccount(),query,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_task_cprk(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		IPageList pageList = kingdeeService.list_task_cprk(qo,getUser().getAccount(),query,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_task_stjgrk(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		IPageList pageList = kingdeeService.list_task_stjgrk(qo,getUser().getAccount(),query,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_thcx(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);;
		String query = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		IPageList pageList = kingdeeService.list_thcx(qo, query, begin, end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page insert_thcx(WebForm form){
		if(null!=form.get("gsth")&&!"".equals(form.get("gsth"))){
			String IP = ActionContext.getContext().getRequest().getRemoteAddr();
			String gsth = form.get("gsth").toString();
			String cpmc = "";
			String khth = "";
			String cpcz = "";
			String sslb = "";
			String lc = "";
			if(null!=form.get("cpmc"))
				cpmc = form.get("cpmc").toString();
			if(null!=form.get("khth"))
				khth = form.get("khth").toString();
			if(null!=form.get("cpcz"))
				cpcz = form.get("cpcz").toString();
			if(null!=form.get("sslb"))
				sslb = form.get("sslb").toString();
			if(null!=form.get("lc"))
				lc = form.get("lc").toString();
			
			if(kingdeeService.isInsert_thcx(gsth))
				kingdeeService.insert_thcx(gsth, cpmc, khth, cpcz, sslb, lc, IP);
			else
				return success(form, true, null, "公司图号重复，请检查！");
		}
		return success(form, true, null, "保存成功！");
	}
	
	public Page update_thcx(WebForm form){
		if(null!=form.get("id")&&!"".equals(form.get("id"))){
			Integer id = Integer.valueOf(form.get("id").toString());
			String IP = ActionContext.getContext().getRequest().getRemoteAddr();
			String cpmc = "";
			String khth = "";
			String cpcz = "";
			String sslb = "";
			String lc = "";
			if(null!=form.get("cpmc"))
				cpmc = form.get("cpmc").toString();
			if(null!=form.get("khth"))
				khth = form.get("khth").toString();
			if(null!=form.get("cpcz"))
				cpcz = form.get("cpcz").toString();
			if(null!=form.get("sslb"))
				sslb = form.get("sslb").toString();
			if(null!=form.get("lc"))
				lc = form.get("lc").toString();
			
			kingdeeService.update_thcx(id, cpmc, khth, cpcz, sslb, lc, IP);
		}
		return success(form, true, null, "保存成功！");
	}
	
	public Page check_cgsq(WebForm form){
		if(null!=getUser()){
			String FInterID = "0";
			String FUserID = getUser().getAccount();
			if(null!=form.get("FInterID")&&!"".equals(form.get("FInterID").toString()))
				FInterID = form.get("FInterID").toString();
			kingdeeService.check_cgsq(FInterID, FUserID);
			return success(form, true, null, "审核成功！");
		}else{
			return success(form, true, null, "请登录后再试！");
		}
	}
	
	public Page check_wgrk(WebForm form){
		if(null!=getUser()){
			String FInterID = "0";
			String FUserID = getUser().getAccount();
			if(null!=form.get("FInterID")&&!"".equals(form.get("FInterID").toString()))
				FInterID = form.get("FInterID").toString();
			kingdeeService.check_wgrk(FInterID, FUserID);
			return success(form, true, null, "审核成功！");
		}else{
			return success(form, true, null, "请登录后再试！");
		}
	}
	
	public Page check_cprk(WebForm form){
		if(null!=getUser()){
			String FInterID = "0";
			String FUserID = getUser().getAccount();
			if(null!=form.get("FInterID")&&!"".equals(form.get("FInterID").toString()))
				FInterID = form.get("FInterID").toString();
			kingdeeService.check_cprk(FInterID, FUserID);
			return success(form, true, null, "审核成功！");
		}else{
			return success(form, true, null, "请登录后再试！");
		}
	}
	
	public Page check_stjgrk(WebForm form){
		if(null!=getUser()){
			String FInterID = "0";
			String FUserID = getUser().getAccount();
			if(null!=form.get("FInterID")&&!"".equals(form.get("FInterID").toString()))
				FInterID = form.get("FInterID").toString();
			kingdeeService.check_stjgrk(FInterID, FUserID);
			return success(form, true, null, "审核成功！");
		}else{
			return success(form, true, null, "请登录后再试！");
		}
	}
	
	public Page check_wwjs(WebForm form){
		if(null==getUser()){
			return success2(form, true, "请先登录");
		}
		Object resp = form.get("resp");
		JSONParser parser = new JSONParser();
		JSONObject obj;
		try {
			obj = (JSONObject) parser.parse(resp.toString());
			JSONArray list = (JSONArray) obj.get("rows");
			for(Object jboj : list){
				JSONObject row = (JSONObject) jboj;
				try{
					String FInterID = row.get("FInterID").toString();			
					kingdeeService.check_wwjs(FInterID, getUser().getAccount());					
				} catch(java.lang.NumberFormatException e){
					continue;
				}
			}
		} catch (org.json.simple.parser.ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return success2(form, true, "处理完毕！");
	}
	
	public Page update_wwjs_hsdj(WebForm form){
		if(null==getUser()){
			return success2(form, true, "请先登录");
		}
		Object resp = form.get("resp");
		JSONParser parser = new JSONParser();
		JSONObject obj;
		try {
			obj = (JSONObject) parser.parse(resp.toString());
			JSONArray list = (JSONArray) obj.get("rows");
			for(Object jboj : list){
				JSONObject row = (JSONObject) jboj;
				try{
					String FEntryID = row.get("FEntryID").toString();			
					String hsdj = row.get("hsdj").toString();
					kingdeeService.update_wwjs_hsdj(FEntryID, hsdj);					
				} catch(java.lang.NumberFormatException e){
					continue;
				}
			}
		} catch (org.json.simple.parser.ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return success2(form, true, "更新完毕！");
	}
	
	public Page uncheck_cgsq(WebForm form){
		if(null!=getUser()){
			String FInterID = "0";
			String FUserID = getUser().getAccount();
			if(null!=form.get("FInterID")&&!"".equals(form.get("FInterID").toString()))
				FInterID = form.get("FInterID").toString();
			String result = kingdeeService.uncheck_cgsq(FInterID, FUserID);
			return success(form, true, null, result);
		}else{
			return success(form, true, null, "请登录后再试！");
		}
	}
	
	public Page uncheck_cprk(WebForm form){
		if(null!=getUser()){
			String FInterID = "0";
			String FUserID = getUser().getAccount();
			if(null!=form.get("FInterID")&&!"".equals(form.get("FInterID").toString()))
				FInterID = form.get("FInterID").toString();
			String result = kingdeeService.uncheck_cprk(FInterID, FUserID);
			return success(form, true, null, result);
		}else{
			return success(form, true, null, "请登录后再试！");
		}
	}
	
	public Page uncheck_wgrk(WebForm form){
		if(null!=getUser()){
			String FInterID = "0";
			String FUserID = getUser().getAccount();
			if(null!=form.get("FInterID")&&!"".equals(form.get("FInterID").toString()))
				FInterID = form.get("FInterID").toString();
			String result = kingdeeService.uncheck_wgrk(FInterID, FUserID);
			return success(form, true, null, result);
		}else{
			return success(form, true, null, "请登录后再试！");
		}
	}
	
	public Page uncheck_stjgrk(WebForm form){
		if(null!=getUser()){
			String FInterID = "0";
			String FUserID = getUser().getAccount();
			if(null!=form.get("FInterID")&&!"".equals(form.get("FInterID").toString()))
				FInterID = form.get("FInterID").toString();
			String result = kingdeeService.uncheck_stjgrk(FInterID, FUserID);
			return success(form, true, null, result);
		}else{
			return success(form, true, null, "请登录后再试！");
		}
	}
	
	public Page list_xsfp_djcy(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);;
		String query = "";
		String status = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("status")&&!"".equals(form.get("status").toString()))
			status = form.get("status").toString();
		IPageList pageList = kingdeeService.list_xsfp_djcy(qo,query,begin,end,status);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page update_xsdj(WebForm form){
		Object resp = form.get("resp");
		JSONParser parser = new JSONParser();
		JSONObject obj;
		try {
			obj = (JSONObject) parser.parse(resp.toString());
			JSONArray list = (JSONArray) obj.get("rows");
			for(Object jboj : list){
				JSONObject row = (JSONObject) jboj;
				try{
					String FInterID = row.get("FInterID").toString();					
					String FEntryID = row.get("FEntryID").toString();
					kingdeeService.update_xsdj(FInterID, FEntryID);					
				} catch(java.lang.NumberFormatException e){
					continue;
				}
			}
		} catch (org.json.simple.parser.ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return success2(form, true, "处理完毕！");
	}
	
	public Page list_xswkp(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String huizong = "0";
		String dwdm = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("huizong")&&!"".equals(form.get("huizong").toString()))
			huizong = form.get("huizong").toString();
		if(null!=form.get("dwdm")&&!"".equals(form.get("dwdm").toString()))
			dwdm = form.get("dwdm").toString();
		IPageList pageList = kingdeeService.list_xswkp(qo,query,begin,end,huizong,dwdm);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_cgwkp(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+Calendar.getInstance().get(Calendar.MONTH)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String end = ""+Calendar.getInstance().get(Calendar.YEAR)+"-"+(Calendar.getInstance().get(Calendar.MONTH)+1)+"-"+Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		String query = "";
		String huizong = "0";
		String dwdm = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();
		if(null!=form.get("huizong")&&!"".equals(form.get("huizong").toString()))
			huizong = form.get("huizong").toString();
		if(null!=form.get("dwdm")&&!"".equals(form.get("dwdm").toString()))
			dwdm = form.get("dwdm").toString();
		IPageList pageList = kingdeeService.list_cgwkp(qo,query,begin,end,huizong,dwdm);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_jcwz(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String query = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		IPageList pageList = kingdeeService.list_jcwz(qo,query);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page list_wxsjyc(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		IPageList pageList = kingdeeService.list_wxsjyc(qo,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page select_org(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = kingdeeService.select_org(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page select_supply(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = kingdeeService.select_supply(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page select_item(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		IPageList pageList = kingdeeService.select_item(qo);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page portal_list_xsdd(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = new Timestamp(System.currentTimeMillis()).toString().substring(0, 10);
		String end = "2099-12-31";
		String query = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();		
		IPageList pageList = kingdeeService.portal_list_xsdd(qo,query,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page portal_list_scrw(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		String begin = new Timestamp(System.currentTimeMillis()).toString().substring(0, 10);
		String end = "2099-12-31";
		String query = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();		
		IPageList pageList = kingdeeService.portal_list_scrw(qo,query,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	}
	
	public Page report_sczzp(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		ServletContext sc = ActionContext.getContext().getSession().getServletContext();
		String begin = sc.getInitParameter("begin");
		String end = sc.getInitParameter("end");
		String query = "";
		if(null!=form.get("query")&&!"".equals(form.get("query").toString()))
			query = form.get("query").toString();
		if(null!=form.get("begin")&&!"".equals(form.get("begin").toString()))
			begin = form.get("begin").toString();
		if(null!=form.get("end")&&!"".equals(form.get("end").toString()))
			end = form.get("end").toString();		
		IPageList pageList = kingdeeService.report_sczzp(qo,query,begin,end);
		form.jsonResult(pageList);
		return Page.JSONPage;
	} 
	
//-----------------私有方法-------------------//
	
	private void export_aqkc(TableFacade tableFacade) {
		// TODO Auto-generated method stub
		tableFacade.setColumnProperties("wldm","wlmc","wlgg","cpth","jldw","cklj","yckl","aqkc","aqkcje","jcsl","zgkc","zgkcje","zxdhl","cgzq","hsdj","ztsl","cksl");
		Table table = tableFacade.getTable();
		Row row = table.getRow();
		row.setUniqueProperty("wldm");
		
		Column hc1 = row.getColumn("wldm");
		hc1.setTitle("代码");		
		
		Column hc2 = row.getColumn("wlmc");
		hc2.setTitle("名称");
		
		Column hc3 = row.getColumn("wlgg");
		hc3.setTitle("规格");
		
		Column hc4 = row.getColumn("cpth");
		hc4.setTitle("图号");
		
		Column hc5 = row.getColumn("jldw");
		hc5.setTitle("单位");
		
		Column hc6 = row.getColumn("cklj");
		hc6.setTitle("年累计");
		
		Column hc7 = row.getColumn("yckl");
		hc7.setTitle("月平均");
		
		Column hc12 = row.getColumn("hsdj");
		hc12.setTitle("含税单价");
		
		Column hc8 = row.getColumn("aqkc");
		hc8.setTitle("安全库存");
		
		Column hc13 = row.getColumn("aqkcje");
		hc13.setTitle("金额");
		
		Column hc15 = row.getColumn("jcsl");
		hc15.setTitle("即时库存");
		
		Column hc9 = row.getColumn("zgkc");
		hc9.setTitle("最高库存");
		
		Column hc14 = row.getColumn("zgkcje");
		hc14.setTitle("金额");
		
		Column hc10 = row.getColumn("zxdhl");
		hc10.setTitle("最小订货量");
		
		Column hc11 = row.getColumn("cgzq");
		hc11.setTitle("采购周期");
		
		Column hc16 = row.getColumn("ztsl");
		hc16.setTitle("预计入库量");
		
		Column hc17 = row.getColumn("cksl");
		hc17.setTitle("预计出库量");
		
		
		
		tableFacade.render();
	}

	private void export_scrw(TableFacade tableFacade) {
		// TODO Auto-generated method stub
		tableFacade.setColumnProperties("id","date","FBillNo","cpdm","cpmc","cpgg","jldw","jhsl","segment","status","jhkgsj","jhwgsj","operator","planDate","remark","equipmentId","cpph","cpth","FStatus");
		Table table = tableFacade.getTable();
		Row row = table.getRow();
		row.setUniqueProperty("id");
		
		Column hc1 = row.getColumn("id");
		hc1.setTitle("ID");		
		
		Column hc2 = row.getColumn("date");
		hc2.setTitle("单据日期");
		
		Column hc3 = row.getColumn("FBillNo");
		hc3.setTitle("任务单号");
		
		Column hc4 = row.getColumn("cpdm");
		hc4.setTitle("物料代码");
		
		Column hc5 = row.getColumn("cpmc");
		hc5.setTitle("物料名称");
		
		Column hc6 = row.getColumn("cpgg");
		hc6.setTitle("规格");
		
		Column hc7 = row.getColumn("jldw");
		hc7.setTitle("单位");
		
		Column hc8 = row.getColumn("jhsl");
		hc8.setTitle("计划数量");
		
		Column hc9 = row.getColumn("segment");
		hc9.setTitle("班次");
		
		Column hc10 = row.getColumn("status");
		hc10.setTitle("状态");
		
		Column hc11 = row.getColumn("segment");
		hc11.setTitle("班次");
		
		Column hc12 = row.getColumn("jhkgsj");
		hc12.setTitle("开工时间");
		
		Column hc13 = row.getColumn("jhwgsj");
		hc13.setTitle("完工时间");
		
		Column hc14 = row.getColumn("operator");
		hc14.setTitle("操作者");
		
		Column hc15 = row.getColumn("planDate");
		hc15.setTitle("执行日期");
		
		Column hc16 = row.getColumn("remark");
		hc16.setTitle("备注");
		
		Column hc17 = row.getColumn("equipmentId");
		hc17.setTitle("流水线");
		
		Column hc18 = row.getColumn("cpph");
		hc18.setTitle("产品批次");
		
		Column hc19 = row.getColumn("cpth");
		hc19.setTitle("产品图号");
		
		Column hc20 = row.getColumn("FStatus");
		hc20.setTitle("状态");
		
		tableFacade.render();
	}
	
	
	
	private void export_scxh(TableFacade tableFacade) {
		// TODO Auto-generated method stub
		tableFacade.setColumnProperties("FBillNo","FDate","FStatus","cpdm","cpmc","cpgg","cpth","cpdw","cpph","jhsl","rksl","byrk","wldm","wlmc","wlgg","wldw","tlsl","llsl","bfsl","llxh","byll");
		Table table = tableFacade.getTable();
		Row row = table.getRow();
		row.setUniqueProperty("id");
		tableFacade.render();
	}
	
	private void export_scxhhz(TableFacade tableFacade) {
		// TODO Auto-generated method stub
		//tableFacade.setColumnProperties("cpdm","cpmc","cpgg","cpth","cpdw","byrk","wldm","wlmc","wlgg","wldw","tlsl","llsl","byll","blsl","bfsl","llxh","wldj","llxhje","byxh");
		tableFacade.setColumnProperties("cpdm","cpmc","cpgg","cpth","cpdw","byrk","wldm","wlmc","wlgg","wldw","llxh","wldj","fhck");
		Table table = tableFacade.getTable();
		Row row = table.getRow();
		
		Column hc0 = row.getColumn("cpdm");
		hc0.setTitle("产品代码");
		
		Column hc1 = row.getColumn("cpmc");
		hc1.setTitle("产品名称");		
		
		Column hc2 = row.getColumn("cpgg");
		hc2.setTitle("产品规格");

		Column hc3 = row.getColumn("cpth");
		hc3.setTitle("产品图号");
		
		Column hc4 = row.getColumn("cpdw");
		hc4.setTitle("单位");
		
		Column hc5 = row.getColumn("byrk");
		hc5.setTitle("产品入库数量");
		
		Column hc6 = row.getColumn("wldm");
		hc6.setTitle("物料代码");
		
		Column hc7 = row.getColumn("wlmc");
		hc7.setTitle("物料名称");
		
		Column hc8 = row.getColumn("wlgg");
		hc8.setTitle("物料规格");
		
		Column hc9 = row.getColumn("wldw");
		hc9.setTitle("单位");
		
		/*Column hc10 = row.getColumn("tlsl");
		hc10.setTitle("完整投料数量");
		
		Column hc11 = row.getColumn("llsl");
		hc11.setTitle("完整领料数量");
		
		Column hc12 = row.getColumn("byll");
		hc12.setTitle("本月领料数量");
		
		Column hc13 = row.getColumn("blsl");
		hc13.setTitle("完整补料数量");
		
		Column hc14 = row.getColumn("bfsl");
		hc14.setTitle("完整报废数量");*/
		
		Column hc15 = row.getColumn("llxh");
		hc15.setTitle("理论消耗");
		
		/*Column hc16 = row.getColumn("byxh");
		hc16.setTitle("实际消耗");*/
		
		Column hc17 = row.getColumn("wldj");
		hc17.setTitle("材料单价");
		
		/*Column hc18 = row.getColumn("llxhje");
		hc18.setTitle("消耗金额");
		
		Column hc19 = row.getColumn("llwwjgf");
		hc19.setTitle("委外加工费");
		
		Column hc20 = row.getColumn("jgdj");
		hc20.setTitle("加工单价");*/
		
		Column hc21 = row.getColumn("fhck");
		hc21.setTitle("发货仓库");
		
		tableFacade.render();
	}
	
	private void export_wwgxjgfhz(TableFacade tableFacade) {
		tableFacade.setColumnProperties("cpdm","cpmc","cpgg","cpth","cpdw","jgsl","jgdj","jgje");
		Table table = tableFacade.getTable();
		Row row = table.getRow();
		
		Column hc0 = row.getColumn("cpdm");
		hc0.setTitle("产品代码");
		
		Column hc1 = row.getColumn("cpmc");
		hc1.setTitle("产品名称");		
		
		Column hc2 = row.getColumn("cpgg");
		hc2.setTitle("产品规格");

		Column hc3 = row.getColumn("cpth");
		hc3.setTitle("产品图号");
		
		Column hc4 = row.getColumn("cpdw");
		hc4.setTitle("单位");
		
		Column hc5 = row.getColumn("jgsl");
		hc5.setTitle("加工数量");
		
		Column hc6 = row.getColumn("jgdj");
		hc6.setTitle("单价");
		
		Column hc7 = row.getColumn("jgje");
		hc7.setTitle("金额");
		
		tableFacade.render();
	}
	
	private void export_cgwkp(TableFacade tableFacade){
		tableFacade.setColumnProperties("wldw","FBillNo","FDate","cpdm","cpmc","cpgg","jldw","fssl","wlph","kpsl","hsdj","hsje");
		Table table = tableFacade.getTable();
		Row row = table.getRow();
		//row.setUniqueProperty("FInterID");
		
		Column hc0 = row.getColumn("wldw");
		hc0.setTitle("供应商");
		
		Column hc1 = row.getColumn("FBillNo");
		hc1.setTitle("单据编号");		
		
		Column hc2 = row.getColumn("FDate");
		hc2.setTitle("单据日期");

		Column hc3 = row.getColumn("cpdm");
		hc3.setTitle("代码");
		
		Column hc4 = row.getColumn("cpmc");
		hc4.setTitle("品名");
		
		Column hc5 = row.getColumn("cpgg");
		hc5.setTitle("规格");
		
		Column hc6 = row.getColumn("jldw");
		hc6.setTitle("单位");
		
		Column hc7 = row.getColumn("fssl");
		hc7.setTitle("数量");
		
		Column hc8 = row.getColumn("wlph");
		hc8.setTitle("批号");
		
		Column hc9 = row.getColumn("kpsl");
		hc9.setTitle("开票数量");
		
		Column hc10 = row.getColumn("hsdj");
		hc10.setTitle("含税单价");
		
		Column hc11 = row.getColumn("hsje");
		hc11.setTitle("含税金额");
		
		tableFacade.render();
	}
	
	private void export_xswkp(TableFacade tableFacade){
		tableFacade.setColumnProperties("cpdm","wldw","FBillNo","Fdate","cpmc","cpgg","jldw","fssl","cpph","kpsl","hsdj","hsje");
		Table table = tableFacade.getTable();
		Row row = table.getRow();
		//row.setUniqueProperty("FInterID");
		
		Column hc0 = row.getColumn("wldw");
		hc0.setTitle("客户");
		
		Column hc1 = row.getColumn("FBillNo");
		hc1.setTitle("单据编号");		
		
		Column hc2 = row.getColumn("Fdate");
		hc2.setTitle("单据日期");

		Column hc3 = row.getColumn("cpdm");
		hc3.setTitle("代码");
		
		Column hc4 = row.getColumn("cpmc");
		hc4.setTitle("品名");
		
		Column hc5 = row.getColumn("cpgg");
		hc5.setTitle("规格");
		
		Column hc6 = row.getColumn("jldw");
		hc6.setTitle("单位");
		
		Column hc7 = row.getColumn("fssl");
		hc7.setTitle("数量");
		
		Column hc8 = row.getColumn("cpph");
		hc8.setTitle("批号");
		
		Column hc9 = row.getColumn("kpsl");
		hc9.setTitle("开票数量");
		
		Column hc10 = row.getColumn("hsdj");
		hc10.setTitle("含税单价");
		
		Column hc11 = row.getColumn("hsje");
		hc11.setTitle("含税金额");
		
		tableFacade.render();
	}
	
	private void export_portal_list_xsdd(TableFacade tableFacade){
		tableFacade.setColumnProperties("Fdate","FBillNo","dwdm","wldw","bgr","ywy","cpdm","cpmc","cpgg","jldw","fssl","jcsl","cksl","kpsl","aqkc");
		Table table = tableFacade.getTable();
		Row row = table.getRow();
		//row.setUniqueProperty("FInterID");
		Column hc0 = row.getColumn("wldw");
		hc0.setTitle("客户");
		
		Column hc1 = row.getColumn("FBillNo");
		hc1.setTitle("单据编号");		
		
		Column hc2 = row.getColumn("Fdate");
		hc2.setTitle("单据日期");

		Column hc3 = row.getColumn("cpdm");
		hc3.setTitle("代码");
		
		Column hc4 = row.getColumn("cpmc");
		hc4.setTitle("品名");
		
		Column hc5 = row.getColumn("cpgg");
		hc5.setTitle("规格");
		
		Column hc6 = row.getColumn("jldw");
		hc6.setTitle("单位");
		
		Column hc7 = row.getColumn("fssl");
		hc7.setTitle("数量");
		
		Column hc8 = row.getColumn("jcsl");
		hc8.setTitle("即时库存");
		
		Column hc10 = row.getColumn("cksl");
		hc10.setTitle("出库数量");
		
		Column hc9 = row.getColumn("kpsl");
		hc9.setTitle("开票数量");
		
		Column hc11 = row.getColumn("安全库存");
		hc11.setTitle("安全库存");
		
		tableFacade.render();
	}
}
