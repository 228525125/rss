package org.cx.rss.mvc;

import java.util.List;
import java.util.Map;

import org.cx.rss.service.IKingdeeService;

import com.easyjf.container.annonation.Inject;
import com.easyjf.web.ActionContext;
import com.easyjf.web.WebForm;

public class ToolsAction extends BaseAction {

	@Inject
	private IKingdeeService kingdeeService;

	public void setKingdeeService(IKingdeeService kingdeeService) {
		this.kingdeeService = kingdeeService;
	}
	
	/**
	 * 进入合格证输入界面
	 * @param form
	 */
	public void coc(WebForm form){		
		if(null!=form.get("djbh")&&!"".equals(form.get("djbh"))){
			String djbh = form.get("djbh").toString();			
			List list = kingdeeService.print_coc(djbh);
			if(1==list.size()){
				Map bean = (Map)list.get(0);
				form.addPo(bean);
				String note = bean.get("FNote").toString();
				String FICMOBillNo = "N/A";
				String FICMONo = "N/A";
				if(null!=bean.get("FICMOBillNo")){
					FICMOBillNo = bean.get("FICMOBillNo").toString();
					FICMONo = FICMOBillNo.substring(FICMOBillNo.length()-5);
				}
				
				if("".equals(note)){
					form.addResult("note", FICMOBillNo);
					form.addResult("FICMONo", bean.get("FUser").toString());
				}else{
					form.addResult("note", bean.get("FNote").toString());
					form.addResult("FICMONo", FICMONo);
				}
				
				if(null!=bean.get("LH")){
					String luhao = bean.get("LH").toString();
					form.addResult("luhao", luhao);
				}
				
				if(null!=bean.get("EX")){
					String fangbao = bean.get("EX").toString();
					form.addResult("fangbao", fangbao);
				}
				
				if(null!=bean.get("caizhi")){
					String caizhi = bean.get("caizhi").toString();
					form.addResult("caizhi", caizhi);
				}
				
				if(null!=bean.get("beizhu")){
					String beizhu = bean.get("beizhu").toString();
					form.addResult("beizhu", beizhu);
				}
				
				kingdeeService.insert_coc(bean.get("FName").toString(), bean.get("FNumber").toString(), bean.get("FModel").toString(), FICMOBillNo, bean.get("FBatchNo").toString(), bean.get("FUser").toString(), bean.get("FDate").toString(), bean.get("FNote").toString());
				//form.addResult("success", "合格证生成完毕！如下列信息：");
			}else{
				form.addResult("success", "输入有误，请检查！！！");
			}
		}else{
			form.addResult("success", "输入有误，请检查！！！");
		}
	}
	
	public void coc_scrw(WebForm form){		
		if(null!=form.get("djbh")&&!"".equals(form.get("djbh"))){
			String djbh = form.get("djbh").toString();			
			List list = kingdeeService.print_coc_scrw(djbh);
			if(1==list.size()){
				Map bean = (Map)list.get(0);
				form.addPo(bean);
				String note = bean.get("FNote").toString();
				String FICMOBillNo = bean.get("FICMOBillNo").toString();
				String FICMONo = FICMOBillNo.substring(FICMOBillNo.length()-5);
				if("".equals(note)){
					form.addResult("note", FICMOBillNo);
					form.addResult("FICMONo", bean.get("FUser").toString());
				}else{
					form.addResult("note", bean.get("FNote").toString());
					form.addResult("FICMONo", FICMONo);
				}
				
				if(null!=bean.get("LH")){
					String luhao = bean.get("LH").toString();
					form.addResult("luhao", luhao);
				}
				
				if(null!=bean.get("EX")){
					String fangbao = bean.get("EX").toString();
					form.addResult("fangbao", fangbao);
				}
				
				if(null!=bean.get("caizhi")){
					String caizhi = bean.get("caizhi").toString();
					form.addResult("caizhi", caizhi);
				}
				
				if(null!=bean.get("beizhu")){
					String beizhu = bean.get("beizhu").toString();
					form.addResult("beizhu", beizhu);
				}
				
				kingdeeService.insert_coc(bean.get("FName").toString(), bean.get("FNumber").toString(), bean.get("FModel").toString(), bean.get("FICMOBillNo").toString(), bean.get("FBatchNo").toString(), bean.get("FUser").toString(), bean.get("FDate").toString(), bean.get("FNote").toString());
			}else{
				form.addResult("success", "输入有误，请检查！！！");
			}
		}else{
			form.addResult("success", "输入有误，请检查！！！");
		}
		page("coc");
	}
	
	public void coc_lzk(WebForm form){		
		if(null!=form.get("djbh")&&!"".equals(form.get("djbh"))){
			String djbh = form.get("djbh").toString();			
			List list = kingdeeService.print_coc_lzk(djbh);
			if(1==list.size()){
				Map bean = (Map)list.get(0);
				form.addPo(bean);
				String note = bean.get("FNote").toString();
				String FICMOBillNo = bean.get("FICMOBillNo").toString();
				String FICMONo = FICMOBillNo.substring(FICMOBillNo.length()-5);
				if("".equals(note)){
					form.addResult("note", FICMOBillNo);
					form.addResult("FICMONo", bean.get("FUser").toString());
				}else{
					form.addResult("note", bean.get("FNote").toString());
					form.addResult("FICMONo", FICMONo);
				}
				
				if(null!=bean.get("LH")){
					String luhao = bean.get("LH").toString();
					form.addResult("luhao", luhao);
				}
				
				if(null!=bean.get("EX")){
					String fangbao = bean.get("EX").toString();
					form.addResult("fangbao", fangbao);
				}
				
				if(null!=bean.get("caizhi")){
					String caizhi = bean.get("caizhi").toString();
					form.addResult("caizhi", caizhi);
				}
				
				if(null!=bean.get("beizhu")){
					String beizhu = bean.get("beizhu").toString();
					form.addResult("beizhu", beizhu);
				}
				
				if(null!=bean.get("lzk")){
					String lzk = bean.get("lzk").toString();
					form.addResult("lzk", lzk);
				}
				
				kingdeeService.insert_coc(bean.get("FName").toString(), bean.get("FNumber").toString(), bean.get("FModel").toString(), bean.get("FICMOBillNo").toString(), bean.get("FBatchNo").toString(), bean.get("FUser").toString(), bean.get("FDate").toString(), bean.get("FNote").toString());
			}else{
				form.addResult("success", "输入有误，请检查！！！");
			}
		}else{
			form.addResult("success", "输入有误，请检查！！！");
		}
		page("coc");
	}
	
	/**
	 * 合格证输入界面提交到该方法
	 * @param form
	 */
	public void coc1(WebForm form){	
		String wldm = "";
		String wlmc = "";
		String wlgg = "";
		String gzdh = "";
		String wlph = "";
		String jyry = "";
		String jyrq = "";
		String fssl = "";
		String luhao = "";
		String fangbao = "";
		String caizhi = "";
		String beizhu = "";
		String wlth = "";
		String lzk = "";
		String IP = ActionContext.getContext().getRequest().getRemoteAddr();
		if(null!=form.get("FNumber")&&!"".equals(form.get("FNumber").toString())){
			wldm = form.get("FNumber").toString();
		}
		if(null!=form.get("FName")&&!"".equals(form.get("FName").toString())){
			wlmc = form.get("FName").toString();
		}
		if(null!=form.get("FModel")){
			wlgg = form.get("FModel").toString();
		}
		if(null!=form.get("FICMOBillNo")){
			gzdh = form.get("FICMOBillNo").toString();
			form.addResult("note", gzdh);
		}
		if(null!=form.get("FBatchNo")){
			wlph = form.get("FBatchNo").toString();
		}
		if(null!=form.get("FUser")&&!"".equals(form.get("FUser").toString())){
			jyry = form.get("FUser").toString();
		}
		if(null!=form.get("FDate")&&!"".equals(form.get("FDate").toString())){
			jyrq = form.get("FDate").toString();
		}
		if(null!=form.get("FQty")&&!"".equals(form.get("FQty").toString())){
			fssl = form.get("FQty").toString();
		}
		if(null!=form.get("luhao")&&!"".equals(form.get("luhao").toString())){
			luhao = form.get("luhao").toString();
		}
		if(null!=form.get("fangbao")&&!"".equals(form.get("fangbao").toString())){
			fangbao = form.get("fangbao").toString();
		}
		if(null!=form.get("caizhi")&&!"".equals(form.get("caizhi").toString())){
			caizhi = form.get("caizhi").toString();
		}
		if(null!=form.get("beizhu")&&!"".equals(form.get("beizhu").toString())){
			beizhu = form.get("beizhu").toString();
		}
		if(null!=form.get("FHelpCode")&&!"".equals(form.get("FHelpCode").toString())){
			wlth = form.get("FHelpCode").toString();
		}
		if(null!=form.get("lzk")&&!"".equals(form.get("lzk").toString())){
			lzk = form.get("lzk").toString();
		}
		
		if(!"".equals(wldm)&&!"".equals(wlmc)&&!"".equals(jyry)&&!"".equals(jyrq)){
			kingdeeService.insert_coc1(wlmc, wldm, wlgg, gzdh, wlph, jyry, jyrq,fssl,luhao,fangbao,caizhi,beizhu,wlth,lzk,IP);
			form.addResult("success", "合格证生成完毕！");
		}
		page("coc");
	}
	
	public void cocmain(WebForm form){
		if(null!=form.get("FICMOBillNo")&&!"".equals(form.get("FICMOBillNo").toString())){
			String rwdh = form.get("FICMOBillNo").toString();
			List list = kingdeeService.sreach_fqc(rwdh);
			if(!list.isEmpty()){
				String FBillNo = "";
				for(int i=0;i<list.size();i++){
					FBillNo += ((Map)list.get(i)).get("FBillNo").toString();
					if(i<(list.size()-1))
						FBillNo += ",";
				}
				form.addResult("jydh", FBillNo);
				form.addResult("FICMOBillNo", rwdh);
			}else{
				form.addResult("failure", "输入有误，请检查！！！");
			}
		}
	}
	
	public void bom(WebForm form){		
		if(null!=form.get("djbh")&&!"".equals(form.get("djbh"))){
			String djbh = form.get("djbh").toString();			
			List list = kingdeeService.print_bom(djbh);
			if(1==list.size()){
				Map bean = (Map)list.get(0);
				form.addPo(bean);
			}else{
				form.addResult("success", "输入有误，请检查！！！");
			}
		}else{
			form.addResult("success", "输入有误，请检查！！！");
		}
	}

}
