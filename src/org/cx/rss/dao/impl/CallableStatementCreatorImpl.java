package org.cx.rss.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;

import org.springframework.jdbc.core.CallableStatementCreator;

public class CallableStatementCreatorImpl implements CallableStatementCreator {

	private String sql = "";
	private Object [] params = null;
	
	
	
	public CallableStatement createCallableStatement(Connection conn)
			throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

}
