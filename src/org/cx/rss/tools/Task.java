package org.cx.rss.tools;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimerTask;

import javax.servlet.ServletContext;

import org.cx.rss.dao.IKingdeeDao;
import org.cx.rss.service.IKingdeeService;
import org.cx.rss.util.SendMailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class Task extends TimerTask {

	private ServletContext sc;
	
	public Task(ServletContext sc) {
		// TODO Auto-generated constructor stub
		this.sc = sc;
	}
	
	@Override
	public void run() {
		// TODO Auto-generated method stub
		ApplicationContext context = WebApplicationContextUtils.getRequiredWebApplicationContext(sc);
		IKingdeeService ks = (IKingdeeService) context.getBean("kingdeeService");
		Date date = new Date(System.currentTimeMillis());
		String uri = sc.getInitParameter("PublicNetworkIPSite");
		/*if(7 == date.getHours()){       // 早上7点执行
			String resutl = HttpClient.getPublicNetworkIP(uri);
			SendMailUtil.sendQQMail("PublicNetworkIP", resutl);
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("task time:"+df.format(date)+"send mail");
		}
		
		if(12 == date.getHours()){       // 中午12点执行
			String resutl = HttpClient.getPublicNetworkIP(uri);
			SendMailUtil.sendQQMail("PublicNetworkIP", resutl);
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("task time:"+df.format(date)+"send mail");
		}
		
		if(18 == date.getHours()){       // 下午6点执行
			String resutl = HttpClient.getPublicNetworkIP(uri);
			SendMailUtil.sendQQMail("PublicNetworkIP", resutl);
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("task time:"+df.format(date)+"send mail");
		}*/
		
		ks.exec_close_scrw();
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println("task time:"+df.format(date)+"exec close_scrw");
		
		String resutl = HttpClient.getPublicNetworkIP(uri);
		SendMailUtil.sendQQMail("PublicNetworkIP", resutl);
		System.out.println("task time:"+df.format(date)+"send mail");
	}
	
	public static void main(String[] args) {
		Date date = new Date(System.currentTimeMillis());
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println(df.format(date));
	}

}
