package org.cx.rss.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.sun.syndication.feed.rss.Channel;
import com.sun.syndication.feed.rss.Description;
import com.sun.syndication.feed.rss.Guid;
import com.sun.syndication.feed.rss.Item;
import com.sun.syndication.io.FeedException;
import com.sun.syndication.io.WireFeedOutput;

public class Test {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub		
		for(int i=0;i<3;i++)
		System.out.println(System.currentTimeMillis()+i);
		//System.out.println(System.currentTimeMillis()+i);
	}
	
	
	public static String createXml() throws Exception {
		/*
		 * ���ChannelԴ���ṩ��Ӣ��,Channel������}������һ��Ĭ�ϵ��޲ι���������clone����һ�����вε�
		 * �����Լ�ָ���ı���ʹ���в����
		 * ����Ϊ������Ҫ���֤����ָ���췽������Ҫ����һ��type���汾�������type�������д������Ҫ��rss_��ͷ�İ汾�� Licensed
		 * under the Apache License, Version 2.0 (the "License");
		 * ��Ϊ��ǰ�汾��2.0�����Ծ���rss_2.0��������rss_2.0��������쳣����Դ����д���Ѿ�����ס�
		 */
		Channel channel = new Channel("rss_2.0");
		channel.setTitle("channel����");// ��վ����
		channel.setDescription("channel������");// ��վ����
		channel.setLink("www.shlll.net");// ��վ��ҳt��
		channel.setEncoding("utf-8");// RSS�ļ�����
		channel.setLanguage("zh-cn");// RSSʹ�õ�����
		channel.setTtl(5);// time to live�ļ�д����ˢ��ǰ��ǰRSS�ڻ����п��Ա���೤ʱ�䣨���ӣ�
		channel.setCopyright("��Ȩ����");// ��Ȩ����
		channel.setPubDate(new Date());// RSS����ʱ��
		List<Item> items = new ArrayList<Item>();// ���list��Ӧrss�е�item�б�
		Item item = new Item();// �½�Item���󣬶�Ӧrss�е�<item></item>
		item.setAuthor("cx");// ��Ӧ<item>�е�<author></author>
		item.setTitle("���ű���");// ��Ӧ<item>�е�<title></title>
		item.setGuid(new Guid());// GUID=Globally Unique Identifier
									// Ϊ��ǰ����ָ��һ��ȫ��Ψһ��ʾ������Ǳ����
		item.setPubDate(new Date());// ���<item>��Ӧ�ķ���ʱ��
		item.setComments("ע��");// ���<item>�ڵ��е�<comments></comments>
		// �½�һ��Description������Item�������
		Description description = new Description();
		description.setValue("��������");// <description>�е�����
		item.setDescription(description);// ��ӵ�item�ڵ���
		items.add(item);// ���һ�����<item></item>��
		channel.setItems(items);
		// ��WireFeedOutput�������rss�ı�
		WireFeedOutput out = new WireFeedOutput();
		return out.outputString(channel);  
	}    


}
