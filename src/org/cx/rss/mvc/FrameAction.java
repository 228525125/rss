package org.cx.rss.mvc;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jmesa.facade.TableFacade;
import org.jmesa.limit.Limit;
import org.jmesa.limit.LimitImpl;
import org.jmesa.view.html.component.HtmlColumn;
import org.jmesa.view.html.component.HtmlRow;
import org.jmesa.view.html.component.HtmlTable;

import static org.jmesa.facade.TableFacadeFactory.createTableFacade;
import static org.jmesa.limit.ExportType.CSV;
import static org.jmesa.limit.ExportType.JEXCEL;
import static org.jmesa.limit.ExportType.PDF;

import com.easyjf.web.ActionContext;
import com.easyjf.web.WebForm;
import com.sun.syndication.feed.rss.Channel;
import com.sun.syndication.feed.rss.Description;
import com.sun.syndication.feed.rss.Guid;
import com.sun.syndication.feed.rss.Item;
import com.sun.syndication.io.FeedException;
import com.sun.syndication.io.WireFeedOutput;

public class FrameAction extends BaseAction {

	public void index(WebForm form){
		if(null!=getUser())
			form.addResult("validate", true);
		else
			form.addResult("validate", false);
		page("frame");
	}
	
	public void home(WebForm form){
		/*TableFacade tableFacade = createTableFacade("basic", ActionContext.getContext().getRequest());
		
		List list = new ArrayList();
		Map bean = new HashMap();
		bean.put("djbh", "work001234");
		bean.put("djrq", "2011-09-08");
		list.add(bean);
		tableFacade.setItems(list); // set the items
		tableFacade.setStateAttr("restore"); // return to the table in the same state that the user left it.
		
		tableFacade.setExportTypes(ActionContext.getContext().getResponse(), JEXCEL);
		
		Limit limit = tableFacade.getLimit();
		limit.setExportType(JEXCEL);
        if (limit.isExported()) {
            export(tableFacade);
            return ;
        }
        
        Object html = html(tableFacade);
		
		form.addResult("LIST", html);*/
	}
	
	private void export(TableFacade tableFacade) {
		// TODO Auto-generated method stub
		tableFacade.setColumnProperties("djbh","djrq");
		tableFacade.render();
	}
	
	private Object html(TableFacade tableFacade){
		tableFacade.setColumnProperties("djbh","djrq");				
		HtmlTable table = (HtmlTable) tableFacade.getTable();
		table.getTableRenderer().setWidth("100%");
		
		HtmlRow row = table.getRow();
		row.setUniqueProperty("djbh");
		
		HtmlColumn hc1 = row.getColumn("djbh");
		hc1.setTitle("单据编号");		
		
		HtmlColumn hc2 = row.getColumn("djrq");
		hc2.setTitle("单据日期");
		
		return tableFacade.render();
	}
}
