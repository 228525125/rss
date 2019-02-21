package org.cx.rss.tools;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimerTask;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");		
		
		/*
		 * 当公网IP地址发生改变时，将新的IP地址发送到指定邮箱
		 */
		String uri = sc.getInitParameter("PublicNetworkIPSite");
		String result = HttpClient.getPublicNetworkIP(uri);
		System.out.println(result);
		result = filterIp(result);
		if(isboolIp(result)){
			String ipAddress = ks.getLastPublicIp();
			if(!result.equals(ipAddress)){
				ks.insert_public_ip(result);
				SendMailUtil.sendQQMail("九环公网IP地址发生改变-"+result, result+"，"+df.format(date));
			}
		}else{
			//SendMailUtil.sendQQMail("公网IP解析出错", "请注意：Web 站点 '"+uri+"' 不能正确解析公网IP地址！");
		}
		
		/*
		 * 自动结案，现在委托给sqlserver代理完成
		 */
		/*System.out.println("task time:"+df.format(date)+"exec close_scrw");
		ks.exec_close_scrw();
		System.out.println("task time:"+df.format(date)+"exec close_scrw end");*/
		
		/*if(7 == date.getHours()){       // 早上7点执行
		
		}
		
		if(12 == date.getHours()){       // 中午12点执行
			
		}
		
		if(18 == date.getHours()){       // 下午6点执行
			
		}*/	
	}
	
	public static void main(String[] args) {
		/*Date date = new Date(System.currentTimeMillis());
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println(df.format(date));*/
		String ip = "27.9.1124.257\n";
		System.out.println(isboolIp(ip));
		
		
		
	}
	
	public static String filterIp(String ipAddress) {
		String result = "";
		Pattern p = Pattern.compile("(?<=//|)((\\w)+\\.)+\\w+");
		Matcher matcher = p.matcher(ipAddress);
		if (matcher.find()) {
			result = matcher.group();
		}
		return result;
	}
	
	 /** * 判断是否为合法IP * @return the ip */  
    public static boolean isboolIp(String ipAddress) {  
        String ip = "([1-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])(\\.(\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])){3}";   
        Pattern pattern = Pattern.compile(ip);  
        Matcher matcher = pattern.matcher(ipAddress);  
        return matcher.matches();  
    }  

}
