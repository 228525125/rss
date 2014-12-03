package org.cx.rss.util;

import java.sql.Timestamp;

public class Util {
	
	public static int compareTo(String t1, String t2){
		int result = 0;
		int t10 = parse(t1);
		int t20 = parse(t2);
		if(t10<t20)
			result = -1;
		else if(t10>t20)
			result = 1;
		else
			result = 0;
		return result;
	}
	
	public static int parse(String t){
		int result = 0;
		if("早班".equals(t))
			result = 1;
		else if("中班".equals(t))
			result = 2;
		else if("夜班".equals(t))
			result = 3;
		return result;		
	}
	
	public static String getDate(int day){
		Timestamp time =  new Timestamp(System.currentTimeMillis()-1000l*60*60*24*day);
		return time.toString().substring(0, 8)+"01";
	}
	
	/**
	 * 
	 * @param month 往回推month个月，取值范围0-11
	 * @return YYYY-MM-DD
	 */
	public static String getMonth(int month){
		String result = "";
		Timestamp curTime = new Timestamp(System.currentTimeMillis());
		Integer y = new Integer(curTime.toString().substring(0, 4));
		Integer m = new Integer(curTime.toString().substring(5, 7));
		if(m<=month){
			y -= 1;
			m = 12-(month-m);
		}else{
			m = m-month;
		}
		
		if(m<10)
			result = y.toString()+"-0"+m+"-01";
		else
			result = y.toString()+"-"+m+"-01";
		return result;
	}
	
	public static void main(String[] args) {
		System.out.println(getMonth(5));
	}

}
