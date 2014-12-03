package org.cx.rss.mvc;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.cx.rss.domain.WorkPlan;
import org.cx.rss.service.IKingdeeService;
import org.cx.rss.service.IWorkPlanService;

import com.easyjf.container.annonation.Inject;
import com.easyjf.core.support.query.QueryObject;
import com.easyjf.web.WebForm;
import com.easyjf.web.tools.IPageList;
import com.sun.syndication.feed.rss.Channel;
import com.sun.syndication.feed.rss.Description;
import com.sun.syndication.feed.rss.Guid;
import com.sun.syndication.feed.rss.Item;
import com.sun.syndication.io.FeedException;
import com.sun.syndication.io.WireFeedOutput;

public class NewsAction extends BaseAction {
	
	private static final long time = 1000l*60*60*8;

	@Inject
	private IWorkPlanService workplanService;
	
	@Inject
	private IKingdeeService kingdeeService;
	
	public void setWorkplanService(IWorkPlanService workplanService) {
		this.workplanService = workplanService;
	}

	public void setKingdeeService(IKingdeeService kingdeeService) {
		this.kingdeeService = kingdeeService;
	}

	public void index(WebForm form){
		QueryObject qo = form.toPo(QueryObject.class);
		qo.setPageSize(999);
		qo.addQuery("disabled=?", new Object []{new Boolean(false)});
		IPageList list = workplanService.getWorkPlanBy(qo);
		List result = list.getResult();
		
		Channel channel = new Channel("rss_2.0");
		channel.setTitle("K3信息发布");
		channel.setDescription("K3事务发布");
		channel.setLink("www.chjd.com");
		channel.setEncoding("utf-8");
		channel.setLanguage("zh-cn");
		channel.setTtl(5);
		channel.setCopyright("版权所有");
		channel.setPubDate(new Date(System.currentTimeMillis()+time));
		List<Item> items = new ArrayList<Item>();		
		for(int i=0;i<result.size();i++){
			WorkPlan bean = (WorkPlan) result.get(i);
			if(System.currentTimeMillis()+time>bean.getStartDate().getTime()){    //如果大于开始时间				
				if(null!=bean.getWarningDay()&&!new Integer(0).equals(bean.getWarningDay())){
					if(System.currentTimeMillis()+time>bean.getClosingDate().getTime()-1000l*60*60*24*bean.getWarningDay()){    //必须超过设置的提醒时间
						Item item = new Item();
						item.setTitle(bean.getTitle());						
						item.setLink(getHost()+":"+getPort()+"/rss/news.do?cmd=list"+String.valueOf(System.currentTimeMillis()+i));
						item.setAuthor(bean.getAuthor().getName());		
						item.setComments(bean.getComments());
						item.setGuid(new Guid());
						item.setPubDate(new Date());
						Description description = new Description();
						description.setValue(bean.getDescription());
						item.setDescription(description);
						items.add(item);
					}
				}else{
					Item item = new Item();
					item.setTitle(bean.getTitle());
					item.setLink(getHost()+":"+getPort()+"/rss/news.do?cmd=list"+String.valueOf(System.currentTimeMillis()+i));					
					item.setAuthor(bean.getAuthor().getName());		
					item.setComments(bean.getComments());
					item.setGuid(new Guid());
					item.setPubDate(new Date());
					Description description = new Description();
					description.setValue(bean.getDescription());
					item.setDescription(description);
					items.add(item);
				}
			}
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
	}
	
	/**
	 * 销售订单执行情况
	 * @param form
	 */
	public void xsddzxqk(WebForm form){
		List list = kingdeeService.xiaoshoudingdan_zhixingqingkuang();
		Channel channel = new Channel("rss_2.0");
		channel.setTitle("K3信息发布");
		channel.setDescription("K3事务发布");
		channel.setLink("www.chjd.com");
		channel.setEncoding("utf-8");
		channel.setLanguage("zh-cn");
		channel.setTtl(5);
		channel.setCopyright("版权所有");
		channel.setPubDate(new Date(System.currentTimeMillis()));
		List<Item> items = new ArrayList<Item>();
		for(int i=0;i<list.size();i++){
			Map bean = (Map) list.get(i);
			Item item = new Item();
			item.setTitle(bean.get("title").toString());
			item.setLink(getHost()+":"+getPort()+"/rss/news.do?cmd=list"+String.valueOf(System.currentTimeMillis()+i));					
			item.setAuthor("金蝶K3");		
			item.setComments("销售订单执行情况统计");
			item.setGuid(new Guid());
			item.setPubDate(new Date());
			Description description = new Description();
			description.setValue("");
			item.setDescription(description);
			items.add(item);
		}
	}
	
	public static void main(String[] args) {
		System.out.println(new Timestamp(System.currentTimeMillis()).toString());
	}
}
