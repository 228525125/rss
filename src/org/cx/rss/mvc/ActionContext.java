package org.cx.rss.mvc;

import java.util.HashMap;

/**
 * ActionContext是对Map的包装，又加了线程安全
 * 经过测试发现web程序中，不同用户访问使用不同线程，但会共享同一个static对象，也就是说不同用户会话
 * 可能对同一个Context对象进行更新，所以为了避免线程安全问题，所以该类引入了线程安全的机制
 * @author chenxian
 *
 */
public class ActionContext {
	
	private static ThreadLocal actionContext = new ThreadLocal(){
		@Override
		protected synchronized Object initialValue() {
			return new HashMap<String,Integer>();
		}
	};
	
	public static Integer getInteger(String player){
		HashMap<String,Integer> IntegerMap = (HashMap<String,Integer>)actionContext.get();
		return IntegerMap.get(player);
	}
	
	public static void setInteger(String player, Integer Integer){
		HashMap<String,Integer> IntegerMap = (HashMap<String,Integer>)actionContext.get();
		IntegerMap.put(player, Integer);
	}
}
