package org.cx.rss.dao.impl;

import org.springframework.orm.jpa.support.JpaDaoSupport;

public class TestDaoImpl extends JpaDaoSupport {

	public void test(){
		getJpaTemplate();
	}
}
