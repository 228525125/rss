package org.cx.rss.mvc;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Set;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

import org.apache.commons.fileupload.FileItem;
import org.cx.rss.domain.Equipment;
import org.cx.rss.domain.TaskPlan;
import org.cx.rss.service.IEquipmentService;
import org.cx.rss.service.IKingdeeService;
import org.cx.rss.service.ITaskPlanService;

import com.easyjf.container.annonation.Inject;
import com.easyjf.web.Page;
import com.easyjf.web.WebForm;

public class FileUploadAction extends BaseAction {

	@Inject
	private ITaskPlanService taskPlanService;
	
	@Inject
	private IEquipmentService equipmentService;
	
	@Inject
	private IKingdeeService kingdeeService;

	public void setTaskPlanService(ITaskPlanService taskPlanService) {
		this.taskPlanService = taskPlanService;
	}

	public void setEquipmentService(IEquipmentService equipmentService) {
		this.equipmentService = equipmentService;
	}

	public void setKingdeeService(IKingdeeService kingdeeService) {
		this.kingdeeService = kingdeeService;
	}
	
	public Page index(WebForm form){
		/* 排程表的上传程序，暂时未用
		/*String result = "";
		int num = 0;
		Set keys = form.getFileElement().keySet();		
		for(Iterator it = keys.iterator();it.hasNext();){
			String filename = it.next().toString();
			FileItem item = (FileItem) form.getFileElement().get(filename);
			if(0!=item.getSize()){
				try {
					num += readXLS(item.getInputStream());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					result = "上传失败！";
					e.printStackTrace();
				}
			}
		}		
		
		result = "上传成功！共导入 "+num+" 条记录！";
		form.addResult("result", result);
		return page("upload");*/
		
		String result = "";
		int num = 0;
		
		if((null!=getUser() && "0117".equals(getUser().getAccount())) 
		|| (null!=getUser() && "chenxian".equals(getUser().getAccount()))){
			Set keys = form.getFileElement().keySet();		
			for(Iterator it = keys.iterator();it.hasNext();){
				String filename = it.next().toString();
				FileItem item = (FileItem) form.getFileElement().get(filename);
				if(0!=item.getSize()){
					try {
						num += updateSafeStock(item.getInputStream());
					} catch (IOException e) {
						// TODO Auto-generated catch block
						result = "上传失败！";
						e.printStackTrace();
					}
				}
			}		
			
			result = "上传成功！共导入 "+num+" 条记录！";
			form.addResult("result", result);
			return page("upload");
		}else{
			result = "上传失败，未登录或没有权限进行操作！";
			form.addResult("result", result);
			return page("upload");
		}
	}
		
	private int readXLS(InputStream is){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat df2 = new SimpleDateFormat("yyyy/MM/dd");
		int num = 0;
		try {
			Workbook book = Workbook.getWorkbook(is);
			Sheet sheet = book.getSheet(0);
			System.out.println(sheet.getRows());
			for(int i=1;i<sheet.getRows();i++){
				Cell[] cells = sheet.getRow(i);
				TaskPlan task = new TaskPlan();
				task.setDate(new Date(System.currentTimeMillis()));				
				Equipment eq = equipmentService.getEquipment(cells[15].getContents());				
				task.setEquipment(eq);
				task.setWorkNo(cells[2].getContents());
				task.setWorkItemCode(cells[3].getContents());
				task.setWorkItemName(cells[4].getContents());
				task.setWorkItemModel(cells[5].getContents());
				task.setWorkUnit(cells[6].getContents());
				task.setWorkNumber(cells[7].getContents());
				task.setWorkBatch(cells[16].getContents());
				task.setWorkDrawId(cells[17].getContents());
				task.setSegment(cells[8].getContents());
				task.setStatus(cells[9].getContents());
				try {
					task.setBeginDate(df2.parse(cells[10].getContents()));
					task.setEndDate(df2.parse(cells[11].getContents()));
					task.setPlanDate(df.parse(cells[13].getContents()));
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				task.setOperator(cells[12].getContents());
				task.setRemark(cells[14].getContents());
				if(null!=task.getEquipment()){
					taskPlanService.addTaskPlan(task);
					num++;
				}				
			}
		} catch (BiffException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return num;
	}
	
	private Integer updateSafeStock(InputStream is){
		int num = 0;
		try {
			Workbook book = Workbook.getWorkbook(is);
			Sheet sheet = book.getSheet(0);
			String sql = "";
			for(int i=1;i<sheet.getRows();i++){
				Cell[] cells = sheet.getRow(i);
				if(isNumber(cells[7].getContents()) && isNumber(cells[10].getContents()) && isNumber(cells[12].getContents()) && isInteger(cells[13].getContents())){
					sql += " update a set a.FSecInv="+cells[7].getContents()+",a.FHighLimit="+cells[10].getContents()+" from t_ICItemBase a left join t_ICItemCore b on a.FItemID=b.FItemID where b.FNumber='"+cells[0].getContents()+"' ";
					sql += " update a set a.FQtyMin="+cells[12].getContents()+",a.FFixLeadTime="+cells[13].getContents()+" from t_ICItemPlan a left join t_ICItemCore b on a.FItemID=b.FItemID where b.FNumber='"+cells[0].getContents()+"' ";
					num++;
				}
			}
			//System.out.println(sql);
			kingdeeService.updateForSQL(sql);
			
		} catch (BiffException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return num;
	}
	
	public static boolean isInteger(String value) {
		try {
			Integer.parseInt(value);
			return true;
		} catch (NumberFormatException e) {
			return false;
		}
	}
	
	public static boolean isDouble(String value) {
		try {
			Double.parseDouble(value);
			if (value.contains("."))
				return true;
			return false;
		} catch (NumberFormatException e) {
			return false;
		}
	}
	
	public static boolean isNumber(String value) {
		return isInteger(value) || isDouble(value);
	}
}
