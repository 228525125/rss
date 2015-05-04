package org.cx.rss.servlet;

import java.util.Timer;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.cx.rss.tools.Task;

public class TaskServlet extends HttpServlet {

	@Override
	public void init(ServletConfig config) throws ServletException {
		// TODO Auto-generated method stub
		Task task = new Task(config.getServletContext());
		Timer timer = new Timer();
		timer.schedule(task, 0,1000*60*60);      //一小时执行一次
	}
}
