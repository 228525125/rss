package org.cx.rss.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.cx.rss.dao.IKingdeeDao;
import org.cx.rss.dao.JDBCQueryDao;
import org.cx.rss.dao.JDBCRssDao;
import org.cx.rss.service.IKingdeeService;
import org.cx.rss.tools.DefaultOrderBy;
import org.cx.rss.tools.QueryOrderBy;
import org.cx.rss.util.QueryUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.easyjf.core.support.query.QueryObject;
import com.easyjf.web.tools.IPageList;

@Transactional
@Service("kingdeeService")
public class KingdeeServiceImpl implements IKingdeeService {

	private static final QueryOrderBy orderby = new DefaultOrderBy();
	
	@Autowired
	private IKingdeeDao kingdeeDao;
	
	@Autowired
	private JDBCQueryDao jdbcDao;
	
	@Autowired
	private JDBCRssDao rssDao;
	
	public List xiaoshoudingdan_zhixingqingkuang() {
		// TODO Auto-generated method stub
		String sql = "select * from employee";
		return kingdeeDao.queryForList(sql);
	}

	public List caigoudingdan_zhixingqingkuang() {
		// TODO Auto-generated method stub
		return null;
	}
	
	public IPageList report_xsddhztj(QueryObject qo, String query, String begin, String end, String huizong) {
		String sql = "execute report_xsddhztj '"+query+"','"+begin+"','"+end+"',"+huizong+",'"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute report_xsddhztj_count '"+query+"','"+begin+"','"+end+"',"+huizong+",'"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList user_list(QueryObject qo, String duodianzhichi) {
		// TODO Auto-generated method stub
		String sql = "select u1.nick,u1.sex,u1.xingming,u1.chengshi,u1.zhuzhi,u1.shouji,u1.zuoji,u1.mail,u1.beizhu,u1.isHuiyuan,u1.gongsimingcheng,u1.gongsidizhi,u1.gongsidianhua,u1.gongsichuanzhen,hy.title as huiyuan,u1.tingyong from User u1 left join User u2 on u1.shopkeeper=u2.nick left join Huiyuan hy on u1.huiyuan=hy.id where u2.duodianzhichi='"+duodianzhichi+"'";
		return QueryUtil.query(qo, null, sql, orderby, jdbcDao);
	}
	
	public List hint_xsddjq(Integer diffday) {
		// TODO Auto-generated method stub
		String sql = "execute hint_xsddjq "+diffday;
		return jdbcDao.queryForList(sql);
	}
	
	public IPageList list_xsdd(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_xsdd '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_xsdd_count '"+query+"','"+begin+"','"+end+"','"+status+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_xsdd_wdj(QueryObject qo, String query, String begin,
			String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_xsdd_wdj '"+query+"','"+begin+"','"+end+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_xsdd_wdj_count '"+query+"','"+begin+"','"+end+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_xsck(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_xsck '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_xsck_count '"+query+"','"+begin+"','"+end+"','"+status+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_fhtz(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_fhtz '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_fhtz_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_xsfp(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_xsfp '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_xsfp_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_scrw(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_scrw '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_scrw_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_scrw_wja(QueryObject qo, String query, String begin,
			String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_scrw_wja '"+query+"','"+begin+"','"+end+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_scrw_wja_count '"+query+"','"+begin+"','"+end+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_scrw_tqja(QueryObject qo) {
		// TODO Auto-generated method stub
		String sql = "execute list_scrw_tqja "; 
		String totalsql = "execute list_scrw_tqja_count ";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_jskc_lhbz(QueryObject qo, String query) {
		// TODO Auto-generated method stub
		String sql = "execute list_jskc_lhbz '"+query+"'";
		String totalsql = "execute list_jskc_lhbz_count '"+query+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_aqkc(QueryObject qo, String query, String month, String state) {
		// TODO Auto-generated method stub
		String sql = "execute list_aqkc '"+query+"','"+month+"','"+state+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "select count(FItemID) from t_ICItem where 1=1 and FSecInv<>0  and FDeleted=0";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public List chart_aqkc(String FItemID, String begin,
			String end) {
		// TODO Auto-generated method stub
		String sql = "execute chart_aqkc '"+FItemID+"','"+begin+"','"+end+"'";
		return kingdeeDao.queryForList(sql);
	}
	
	public List chart_column_xsck(String begin, String end, String wldm, String wldw) {
		// TODO Auto-generated method stub
		String sql = "execute chart_column_xsck '"+begin+"','"+end+"','"+wldm+"','"+wldw+"'";
		return kingdeeDao.queryForList(sql);
	}
	
	public List chart_pie_xsck(String begin, String end, String huizong) {
		// TODO Auto-generated method stub
		String sql = "execute chart_pie_xsck '"+begin+"','"+end+"',"+huizong+"";
		return kingdeeDao.queryForList(sql);
	}
	
	public List print_coc(String FBillNo) {
		// TODO Auto-generated method stub
		String sql = "execute print_coc '"+FBillNo+"'";
		return kingdeeDao.queryForList(sql);
	}
	
	public List print_coc_scrw(String FBillNo) {
		// TODO Auto-generated method stub
		String sql = "execute print_coc_scrw '"+FBillNo+"'";
		return kingdeeDao.queryForList(sql);
	}
	
	public List print_coc_lzk(String FBillNo) {
		// TODO Auto-generated method stub
		String sql = "execute print_coc_lzk '"+FBillNo+"'";
		return kingdeeDao.queryForList(sql);
	}
	
	public List print_coc_wldm(String wldm) {
		String sql = "execute print_coc_wldm '"+wldm+"'";
		return kingdeeDao.queryForList(sql);
	}
	
	public List print_bom(String FBillNo) {
		// TODO Auto-generated method stub
		String sql = "execute print_bom '"+FBillNo+"'";
		return kingdeeDao.queryForList(sql);
	}
	
	public List sreach_fqc(String FBillNo) {
		// TODO Auto-generated method stub
		String sql = "select FBillNo from View_ProductInspectionSlip713 where FICMOBillNo like '%"+FBillNo+"' group by FBillNo";
		return kingdeeDao.queryForList(sql);
	}
	
	public IPageList list_scll(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_scll '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_scll_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_sctl(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_sctl '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_sctl_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_scbf(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_scbf '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_scbf_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_cprk(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_cprk '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_cprk_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wwjs(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_wwjs '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_wwjs_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wwjy(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_wwjy '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_wwjy_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wwzc(QueryObject qo, String query, String begin,
			String end, String status, String style) {
		// TODO Auto-generated method stub
		String sql = "execute list_wwzc '"+query+"','"+begin+"','"+end+"','"+status+"','"+style+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_wwzc_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+style+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wwjysqd(QueryObject qo, String query, String begin,
			String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_wwjysqd '"+query+"','"+begin+"','"+end+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_wwjysqd_count '"+query+"','"+begin+"','"+end+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wwjyjsl(QueryObject qo, String begin, String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_wwjyjsl '"+begin+"','"+end+"','"+status+"'"; 
		String totalsql = "execute list_wwjyjsl_count '"+begin+"','"+end+"','"+status+"'"; 
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wwzc_edit(QueryObject qo, String query) {
		// TODO Auto-generated method stub
		String sql = "execute list_wwzc_edit '"+query+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_wwzc_edit_count '"+query+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList report_scxh(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute report_scxh '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute report_scxh_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList report_scxhhz_1(QueryObject qo,String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute report_scxhhz_1 '"+begin+"','"+end+"'"; 
		String totalsql = "execute report_scxhhz_1_count '"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList report_scxhhz_2(QueryObject qo, String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute report_scxhhz_2 '"+begin+"','"+end+"'"; 
		String totalsql = "execute report_scxhhz_2_count '"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList report_scxhhz_3(QueryObject qo, String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute report_scxhhz_3 '"+begin+"','"+end+"'"; 
		String totalsql = "execute report_scxhhz_3_count '"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList report_wwgxjgfhz(QueryObject qo, String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute report_wwgxjgfhz '"+begin+"','"+end+"'"; 
		String totalsql = "execute report_wwgxjgfhz_count '"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public void insert_coc(String wlmc, String wldm, String wlgg, String gzdh,
			String wlph, String jyry, String jyrq, String note) {
		// TODO Auto-generated method stub
		String sql = "insert coc(wlmc, wldm, wlgg, gzdh, wlph, jyry, jyrq, note) values (?,?,?,?,?,?,?,?)";
		rssDao.update(sql, new Object[]{wlmc,wldm,wlgg,gzdh,wlph,jyry,jyrq,note});
	}
	
	public void insert_coc1(String wlmc, String wldm, String wlgg, String gzdh,
			String wlph, String jyry, String jyrq, String fssl, String luhao, String fangbao, String caizhi, String beizhu, String wlth, String lzk, String ip) {
		// TODO Auto-generated method stub
		String sql = "insert coc1(wlmc, wldm, wlgg, gzdh, wlph, jyry, jyrq,fssl,luhao, fangbao, caizhi, beizhu, wlth, lzk, ip) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		rssDao.update(sql, new Object[]{wlmc,wldm,wlgg,gzdh,wlph,jyry,jyrq,fssl,luhao,fangbao,caizhi,beizhu,wlth,lzk,ip});
	}
	
	public void insert_thcx(String gsth, String cpmc, String khth, String cpcz, String sslb,
			String lc, String ip) {
		// TODO Auto-generated method stub
		String sql = "insert rss.dbo.thcx(gsth,cpmc,khth,cpcz,sslb,rq,lc,ip) values (?,?,?,?,?,convert(char(10),getDate(),120),?,?)";
		rssDao.update(sql, new Object[]{gsth,cpmc,khth,cpcz,sslb,lc,ip});
	}
	
	public void update_thcx(Integer id, String cpmc, String khth, String cpcz,
			String sslb, String lc, String ip) {
		// TODO Auto-generated method stub
		String sql = "update rss.dbo.thcx set cpmc=?,khth=?,cpcz=?,sslb=?,lc=?,ip=? where id=?";
		rssDao.update(sql, new Object[]{cpmc,khth,cpcz,sslb,lc,ip,id});
	}
	
	public Boolean isInsert_thcx(String gsth) {
		// TODO Auto-generated method stub
		String sql = "select count(id) from rss.dbo.thcx where gsth='"+gsth+"'";
		Integer count = (Integer) rssDao.queryForObject(sql, Integer.class);
		if(0==count)
			return true;
		else
			return false;
	}
	
	public Boolean isUpdate_thcx(String gsth) {
		// TODO Auto-generated method stub
		String sql = "select count(id) from rss.dbo.thcx where gsth='"+gsth+"'";
		Integer count = (Integer) rssDao.queryForObject(sql, Integer.class);
		if(1==count)
			return true;
		else
			return false;
	}
	
	public IPageList list_cgdd(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_cgdd '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_cgdd_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_cgsq(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_cgsq '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_cgsq_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_lljyd(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_lljyd '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_lljyd_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_lljysqd(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_lljysqd '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_lljysqd_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_shd(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_shd '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_shd_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wgrk(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_wgrk '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_wgrk_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_stjgrk(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_stjgrk '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_stjgrk_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList report_wwgxzxgzb(QueryObject qo, String query,
			String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute report_wwgxzxgzb '"+query+"','"+begin+"','"+end+"'"; 
		String totalsql = "execute report_wwgxzxgzb_count '"+query+"','"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public Map count_wgjq(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_wgjq '"+begin+"','"+end+"'";
		return jdbcDao.queryForMap(sql);
	}
	
	public Map count_wxjq(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_wxjq '"+begin+"','"+end+"'";
		return jdbcDao.queryForMap(sql);
	}
	
	public Map count_wgjsl(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_wgjsl '"+begin+"','"+end+"'";
		return jdbcDao.queryForMap(sql);
	}
	
	public Map count_wxjsl(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_wxjsl '"+begin+"','"+end+"'";
		return jdbcDao.queryForMap(sql);
	}
	
	public Map count_scrwjsl(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_scrwjsl '"+begin+"','"+end+"'";
		return jdbcDao.queryForMap(sql);
	}
	
	public Map count_cpjyjsl(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_cpjyjsl '"+begin+"','"+end+"'";
		return jdbcDao.queryForMap(sql);
	}
	
	public Map count_wgjyjsl(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_wgjyjsl '"+begin+"','"+end+"'";
		return jdbcDao.queryForMap(sql);
	}
	
	public Map count_ddjsl(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_ddjsl '"+begin+"','"+end+"'";
		return jdbcDao.queryForMap(sql);
	}
	
	public Map count_wwjyjsl(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_wwjyjsl '"+begin+"','"+end+"'";
		return jdbcDao.queryForMap(sql);
	}
	
	public Map count_wghgl(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_wghgl '"+begin+"','"+end+"'";
		return jdbcDao.queryForMap(sql);
	}
	
	public Map count_wxhgl(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_wxhgl '"+begin+"','"+end+"'";
		return jdbcDao.queryForMap(sql);
	}
	
	public Map count_cphgl(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_cphgl '"+begin+"','"+end+"'";
		return jdbcDao.queryForMap(sql);
	}
	
	public Map count_wdjdd(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_xsdd_wdj_count '','"+begin+"','"+end+"','null','null'";
		Map bean = new HashMap();
		bean.put("wdjdd", jdbcDao.queryForObject(sql, Integer.class));
		return bean;
	}
	
	public Map count_wjarwd(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_scrw_wja_count '','"+begin+"','"+end+"','null','null'";
		Map bean = new HashMap();
		bean.put("wjarwd", jdbcDao.queryForObject(sql, Integer.class));
		return bean;
	}
	
	public IPageList list_wgjsl(QueryObject qo, String begin, String end,
			String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_wgjsl '"+begin+"','"+end+"','"+status+"'"; 
		String totalsql = "execute list_wgjsl_count '"+begin+"','"+end+"','"+status+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wxjsl(QueryObject qo, String begin, String end,
			String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_wxjsl '"+begin+"','"+end+"','"+status+"'"; 
		String totalsql = "execute list_wxjsl_count '"+begin+"','"+end+"','"+status+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wghgl(QueryObject qo, String begin, String end,
			String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_wghgl '"+begin+"','"+end+"','"+status+"'"; 
		String totalsql = "execute list_wghgl_count '"+begin+"','"+end+"','"+status+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wxhgl(QueryObject qo, String begin, String end,
			String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_wxhgl '"+begin+"','"+end+"','"+status+"'"; 
		String totalsql = "execute list_wxhgl_count '"+begin+"','"+end+"','"+status+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_cphgl(QueryObject qo, String begin, String end,
			String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_cphgl '"+begin+"','"+end+"','"+status+"'"; 
		String totalsql = "execute list_cphgl_count '"+begin+"','"+end+"','"+status+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_cpjyjsl(QueryObject qo, String begin, String end,
			String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_cpjyjsl '"+begin+"','"+end+"','"+status+"'"; 
		String totalsql = "execute list_cpjyjsl_count '"+begin+"','"+end+"','"+status+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wgjyjsl(QueryObject qo, String begin, String end,
			String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_wgjyjsl '"+begin+"','"+end+"','"+status+"'"; 
		String totalsql = "execute list_wgjyjsl_count '"+begin+"','"+end+"','"+status+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_ddjsl(QueryObject qo, String begin, String end,
			String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_ddjsl '"+begin+"','"+end+"','"+status+"'"; 
		String totalsql = "execute list_ddjsl_count '"+begin+"','"+end+"','"+status+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_scrwdcl(QueryObject qo, String begin, String end,
			String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_scrwdcl '"+begin+"','"+end+"','"+status+"'"; 
		String totalsql = "execute list_scrwdcl_count '"+begin+"','"+end+"','"+status+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_scrwwzdj(QueryObject qo, String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_scrwwzdj '"+begin+"','"+end+"'"; 
		String totalsql = "execute list_scrwwzdj_count '"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_ddwzdj(QueryObject qo, String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_ddwzdj '"+begin+"','"+end+"'"; 
		String totalsql = "execute list_ddwzdj_count '"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wgwzdj(QueryObject qo, String begin, String end,
			String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_wgwzdj '"+begin+"','"+end+"','"+status+"'"; 
		String totalsql = "execute list_wgwzdj_count '"+begin+"','"+end+"','"+status+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_cpjywzdj(QueryObject qo, String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_cpjywzdj '"+begin+"','"+end+"'"; 
		String totalsql = "execute list_cpjywzdj_count '"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wgjywzdj(QueryObject qo, String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_wgjywzdj '"+begin+"','"+end+"'"; 
		String totalsql = "execute list_wgjywzdj_count '"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wwjywzdj(QueryObject qo, String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_wwjywzdj '"+begin+"','"+end+"'"; 
		String totalsql = "execute list_wwjywzdj_count '"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wxwzdj(QueryObject qo, String begin, String end,
			String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_wxwzdj '"+begin+"','"+end+"','"+status+"'"; 
		String totalsql = "execute list_wxwzdj_count '"+begin+"','"+end+"','"+status+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_cpjyd(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_cpjyd '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_cpjyd_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_cpjysqd(QueryObject qo, String query, String begin,
			String end, String status, String style) {
		// TODO Auto-generated method stub
		String sql = "execute list_cpjysqd '"+query+"','"+begin+"','"+end+"','"+status+"','"+style+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_cpjysqd_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+style+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public String loadTree(Integer itemId) {
		// TODO Auto-generated method stub
		String result = "[";
		String sql = "select a.FItemID,a.FNumber,a.FName,a.FParentID,a.FDetail from t_item a left join t_ICItem b on a.FItemID=b.FItemID where a.FItemClassID=4 and (b.FDeleted is null or b.FDeleted=0) and a.FParentID="+itemId+" order by a.FNumber";
		List list = kingdeeDao.queryForList(sql);
		for(int i=0;i<list.size();i++){
			Map bean = (Map) list.get(i);
			String id = "'"+bean.get("FItemID").toString()+"'";
			result += "{id:"+id+",text:'"+"("+bean.get("FNumber")+")"+bean.get("FName")+"',";
			Boolean isLeaf = (Boolean) bean.get("FDetail");
			if(isLeaf)
				result += "leaf:true}";
			else
				result += "leaf:false}";
			if(i<list.size()-1)
				result += ",";
		}
		return result+"]";
	}
	
	/*private boolean isLeaf(Integer nodeId){
		String sql = "select 1 from t_item a left join t_ICItem b on a.FItemID=b.FItemID where a.FItemClassID=4 and (b.FDeleted is null or b.FDeleted=0) and a.FParentID="+nodeId;
		List list = kingdeeDao.queryForList(sql);
		return list.isEmpty();
	}*/
	
	public IPageList list_item(QueryObject qo, String code) {
		String sql = "select FItemID as 'id', FNumber as 'code', FName as 'name' from t_ICItem where FDeleted=0 and FNumber like '"+code+"%' order by FNumber";
		String total = "select count(1) from t_ICItem where FDeleted=0";
		return QueryUtil.query(qo, total, sql, true, jdbcDao);
	}
	
	public IPageList list_supplier(QueryObject qo, String name) {
		// TODO Auto-generated method stub
		String sql = "select FItemID as 'id',FNumber as 'code',FName as 'name' from t_supplier where FDeleted=0 and FName like '%"+name+"%'";
		String total = "select count(1) from t_supplier where FDeleted=0";
		return QueryUtil.query(qo, total, sql, true, jdbcDao);
	}
	
	public IPageList list_hggys(QueryObject qo, Integer itemId) {
		// TODO Auto-generated method stub
		String sql = "select a.id,b.FName as 'itemName',b.FItemID as 'itemId',a.supplierId,c.FNumber as 'code',c.FName as 'name',a.checked,a.date,a.[default] from rss.dbo.supplier_check a "
				+ "left join t_ICItem b on a.itemId=b.FItemID "
				+ "left join t_supplier c on a.supplierId=c.FItemID "
				+ "where a.itemID="+itemId;
		String total = "select count(1) from rss.dbo.supplier_check where itemID="+itemId;
		return QueryUtil.query(qo, total, sql, true, jdbcDao);
	}
	
	public void insert_hggys(Integer itemId, Integer supplierId,
			Boolean checked, Boolean def) {
		// TODO Auto-generated method stub
		Integer c = checked ? 1 : 0;
		Integer d = def ? 1 : 0; 
		String sql = "insert supplier_check (itemID,supplierId,checked,date,[default]) values (?,?,?,getdate(),?)";
		rssDao.update(sql, new Object[]{itemId,supplierId,c,d});
	}
	
	public Boolean isInsert_hggys(Integer itemId, Integer supplierId) {
		// TODO Auto-generated method stub
		String sql = "select 1 from supplier_check where itemId="+itemId+" and supplierId="+supplierId;
		List list = rssDao.queryForList(sql);
		return list.isEmpty();
	}
	
	public void update_hggys(Integer id, Integer supplierId, Boolean def) {
		// TODO Auto-generated method stub
		Integer d = def ? 1 : 0;
		String sql = "update supplier_check set supplierId=?, [default]=? where id=?";
		rssDao.update(sql, new Object[]{supplierId,d,id});
	}
	
	public void check_hggys(Integer id, Boolean checked) {
		// TODO Auto-generated method stub
		Integer c = checked ? 1 :0 ;
		String sql = "update supplier_check set checked="+c+" where id="+id;
		rssDao.update(sql);
	}

	public void copy_cpjyd(String jydh, String interid, String entryid, String sqsl, String wlph, String FICMOInterID) {
		// TODO Auto-generated method stub
		String sql = "execute copy_cpjyd '"+jydh+"',"+interid+","+entryid+",'"+sqsl+"','"+wlph+"','"+FICMOInterID+"'";
		kingdeeDao.execute(sql);
	}
	
	public void insert_wwjysqd(String interid, String entryid, String sjsl, String remark, String jyfs, String dj) {
		// TODO Auto-generated method stub
		String sql = "insert rss.dbo.wwzc_wwjysqd(FSourceInterID,FSourceEntryID,FQty,FDate,remark,curdate,jyfs, dj) values ("+interid+","+entryid+","+sjsl+",convert(char(10),getDate(),120),'"+remark+"',getDate(),'"+jyfs+"',"+dj+")";
		kingdeeDao.execute(sql);
	}
	
	public IPageList list_task_cgsq(QueryObject qo, String user, String query, String begin,
			String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_task_cgsq '"+user+"','"+query+"','"+begin+"','"+end+"'"; 
		String totalsql = "execute list_task_cgsq_count '"+user+"','"+query+"','"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_task_cprk(QueryObject qo, String user, String query,
			String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_task_cprk '"+user+"','"+query+"','"+begin+"','"+end+"'"; 
		String totalsql = "execute list_task_cprk_count '"+user+"','"+query+"','"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_task_stjgrk(QueryObject qo, String user,
			String query, String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_task_stjgrk '"+user+"','"+query+"','"+begin+"','"+end+"'"; 
		String totalsql = "execute list_task_stjgrk_count '"+user+"','"+query+"','"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_task_wgrk(QueryObject qo, String user, String query,
			String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_task_wgrk '"+user+"','"+query+"','"+begin+"','"+end+"'"; 
		String totalsql = "execute list_task_wgrk_count '"+user+"','"+query+"','"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public int count_task_cgsq(String user, String begin,
			String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_task_cgsq '"+user+"'";
		return jdbcDao.queryForInt(sql);
	}
	
	public int count_task_cprk(String user, String begin,
			String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_task_cprk '"+user+"'";
		return jdbcDao.queryForInt(sql);
	}
	
	public int count_task_stjgrk(String user, String begin,
			String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_task_stjgrk '"+user+"'";
		return jdbcDao.queryForInt(sql);
	}
	
	public int count_task_wgrk(String user, String begin,
			String end) {
		// TODO Auto-generated method stub
		String sql = "execute count_task_wgrk '"+user+"'";
		return jdbcDao.queryForInt(sql);
	}
	
	public int count_task_wwjs(String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_wwjs_count '','"+begin+"','"+end+"','0','null',''";
		return jdbcDao.queryForInt(sql)-1;
	}
	
	public int count_scrw_tqja() {
		// TODO Auto-generated method stub
		String sql = "execute list_scrw_tqja_count";
		return jdbcDao.queryForInt(sql);
	}
	
	public boolean exist_account(String user) {
		// TODO Auto-generated method stub
		String sql = "select * from t_user where FName='"+user+"'";
		List list = jdbcDao.queryForList(sql);
		if(list.isEmpty())
			return false;
		else
			return true;
	}
	
	public void check_cgsq(String FInterID, String FUserID) {
		// TODO Auto-generated method stub
		String sql = "execute check_cgsq "+FInterID+","+FUserID+"";
		kingdeeDao.execute(sql);
	}
	
	public void check_cprk(String FInterID, String FUserID) {
		// TODO Auto-generated method stub
		String sql = "execute check_cprk "+FInterID+","+FUserID+"";
		kingdeeDao.execute(sql);
	}
	
	public void check_stjgrk(String FInterID, String FUserID) {
		// TODO Auto-generated method stub
		String sql = "execute check_stjgrk "+FInterID+","+FUserID+"";
		kingdeeDao.execute(sql);
	}
	
	public void check_wgrk(String FInterID, String FUserID) {
		// TODO Auto-generated method stub
		String sql = "execute check_wgrk "+FInterID+","+FUserID+"";
		kingdeeDao.execute(sql);
	}
	
	public void check_wwjs(String FInterID, String FUserID) {
		// TODO Auto-generated method stub
		String sql = "execute check_wwjs "+FInterID+",'"+FUserID+"'";
		kingdeeDao.execute(sql);
	}
	
	public void update_wwjs_hsdj(String FEntryID, String hsdj) {
		// TODO Auto-generated method stub
		String sql = "update ICShop_SubcInEntry set FUnitPrice="+hsdj+" ,FBaseUnitPrice="+hsdj+" where FEntryID="+FEntryID+"";
		kingdeeDao.execute(sql);
	}
	
	public String uncheck_cprk(String FInterID, String FUserID) {
		// TODO Auto-generated method stub
		String sql = "execute uncheck_cprk "+FInterID+","+FUserID+"";
		return (String) kingdeeDao.queryForObject(sql, String.class);
	}
	
	public String uncheck_cgsq(String FInterID, String FUserID) {
		// TODO Auto-generated method stub
		String sql = "execute uncheck_cgsq "+FInterID+","+FUserID+"";
		return (String) kingdeeDao.queryForObject(sql, String.class);
	}
	
	public String uncheck_stjgrk(String FInterID, String FUserID) {
		// TODO Auto-generated method stub
		String sql = "execute uncheck_stjgrk "+FInterID+","+FUserID+"";
		return (String) kingdeeDao.queryForObject(sql, String.class);
	}
	
	public String uncheck_wgrk(String FInterID, String FUserID) {
		// TODO Auto-generated method stub
		String sql = "execute uncheck_wgrk "+FInterID+","+FUserID+"";
		return (String) kingdeeDao.queryForObject(sql, String.class);
	}
	
	public String getFUserID(String acc) {
		// TODO Auto-generated method stub
		String sql = "select FUserID from t_user where FName='"+acc+"'";
		return (String) kingdeeDao.queryForObject(sql, String.class);
	}
	
	public IPageList list_xsfp_djcy(QueryObject qo, String query, String begin,
			String end, String status) {
		// TODO Auto-generated method stub
		String sql = "execute list_xsfp_djcy '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_xsfp_djcy_count '"+query+"','"+begin+"','"+end+"','"+status+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public void update_xsdj(String FInterID, String FEntryID) {
		// TODO Auto-generated method stub
		String sql = "execute update_xsdj "+FInterID+","+FEntryID;
		kingdeeDao.execute(sql);
	}
	
	public IPageList list_xswkp(QueryObject qo, String query, String begin,
			String end, String huizong, String dwdm) {
		// TODO Auto-generated method stub
		String sql = "execute list_xswkp '"+query+"','"+begin+"','"+end+"',"+huizong+",'"+dwdm+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_xswkp_count '"+query+"','"+begin+"','"+end+"',"+huizong+",'"+dwdm+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_cgwkp(QueryObject qo, String query, String begin,
			String end, String huizong, String dwdm) {
		// TODO Auto-generated method stub
		String sql = "execute list_cgwkp '"+query+"','"+begin+"','"+end+"',"+huizong+",'"+dwdm+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_cgwkp_count '"+query+"','"+begin+"','"+end+"',"+huizong+",'"+dwdm+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_jcwz(QueryObject qo, String query) {
		// TODO Auto-generated method stub
		String sql = "execute list_jcwz '"+query+"'"; 
		String totalsql = "execute list_jcwz_count '"+query+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_wxsjyc(QueryObject qo, String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_wxsjyc '"+begin+"','"+end+"'"; 
		String totalsql = "execute list_wxsjyc_count '"+begin+"','"+end+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_scrw_wlxh(QueryObject qo, String query, String begin, String end, String style) {
		// TODO Auto-generated method stub
		String sql = "execute list_scrw_wlxh '"+query+"','"+begin+"','"+end+"', "+style+"";
		String totalsql = "select 2001";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_thcx(QueryObject qo, String query, String begin,
			String end) {
		// TODO Auto-generated method stub
		String sql = "execute list_thcx '"+query+"','"+begin+"','"+end+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute list_thcx_count '"+query+"','"+begin+"','"+end+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList list_stamp(QueryObject qo, String query) {
		// TODO Auto-generated method stub
		String sql = "execute query_stamp '"+query+"'";
		String totalsql = "execute query_stamp_count '"+query+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public void delete_record_stamp(String sn) {
		// TODO Auto-generated method stub
		String sql = "delete rss.dbo.stamp where SContent='"+sn+"'";
		jdbcDao.execute(sql);
	}
	
	public IPageList list_zctj(QueryObject qo, String query) {
		// TODO Auto-generated method stub
		String sql = "select FID,FModel,FBrand,FName,FSeriesNumber,FQty,SUBSTRING(FDateOfManufacture,0,11) as FDateOfManufacture,SUBSTRING(FDateOfBuy,0,11) as FDateOfBuy,FAssetID,FDepartment,FUser,FJobNumber,FNote,FIP,FMac,SUBSTRING(FDateOfApplication,0,11) as FDateOfApplication,DATEDIFF (year,FDateOfManufacture,getdate()) as FYear "
				+ "from rss.dbo.zctj where "
				+ "FAssetID like '%"+query+"%' "
				+ "or FModel like '%"+query+"%' "
				+ "or FBrand like '%"+query+"%' "
				+ "or FName like '%"+query+"%' "
				+ "or FSeriesNumber like '%"+query+"%' "
				+ "or FDepartment like '%"+query+"%' "
				+ "or FUser like '%"+query+"%' "
				+ "or FJobNumber like '%"+query+"%' "
				+ "or FNote like '%"+query+"%' "
				+ "or FIP like '%"+query+"%' "
				+ "or FMac like '%"+query+"%' ";
		String totalsql = "select ISNULL(sum(1),0) from rss.dbo.zctj where "
				+ "FAssetID like '%"+query+"%' "
				+ "or FModel like '%"+query+"%' "
				+ "or FBrand like '%"+query+"%' "
				+ "or FName like '%"+query+"%' "
				+ "or FSeriesNumber like '%"+query+"%' "
				+ "or FDepartment like '%"+query+"%' "
				+ "or FUser like '%"+query+"%' "
				+ "or FJobNumber like '%"+query+"%' "
				+ "or FNote like '%"+query+"%' "
				+ "or FIP like '%"+query+"%' "
				+ "or FMac like '%"+query+"%' ";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public Integer count_wxsjyc(String begin, String end) {
		// TODO Auto-generated method stub
		String sql ="execute list_wxsjyc_count '"+begin+"','"+end+"'";
		return jdbcDao.queryForInt(sql);
	}
	
	public IPageList select_org(QueryObject qo) {
		// TODO Auto-generated method stub
		String sql = "select FNumber,FName from t_Organization t4 where FDeleted=0 union select '','全部'";
		String totalsql = "select count(*)+1 from t_Organization where FDeleted=0";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList select_supply(QueryObject qo) {
		// TODO Auto-generated method stub
		String sql = "select FNumber,FName from t_Supplier where FDeleted=0 union select '','全部'";
		String totalsql = "select count(*)+1 from t_Supplier where FDeleted=0";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList select_item(QueryObject qo) {
		// TODO Auto-generated method stub
		String sql = "select FNumber,FName,FModel from t_ICItem where left(FNumber,3)='05.' and FDeleted=0 union select '','全部',''";
		String totalsql = "select count(*)+1 from t_ICItem where left(FNumber,3)='05.' and FDeleted=0";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList report_xsckhztj(QueryObject qo, String query,
			String begin, String end, String huizong) {
		// TODO Auto-generated method stub
		String sql = "execute report_xsckhztj '"+query+"','"+begin+"','"+end+"',"+huizong+",'"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute report_xsckhztj_count '"+query+"','"+begin+"','"+end+"',"+huizong+",'"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList report_xsfphztj(QueryObject qo, String query,
			String begin, String end, String huizong) {
		// TODO Auto-generated method stub
		String sql = "execute report_xsfphztj '"+query+"','"+begin+"','"+end+"',"+huizong+",'"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute report_xsfphztj_count '"+query+"','"+begin+"','"+end+"',"+huizong+",'"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList portal_list_xsdd(QueryObject qo, String query,
			String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute portal_list_xsdd '"+query+"','"+begin+"','"+end+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute portal_list_xsdd_count '"+query+"','"+begin+"','"+end+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList portal_list_scrw(QueryObject qo, String query,
			String begin, String end) {
		// TODO Auto-generated method stub
		String sql = "execute portal_list_scrw '"+query+"','"+begin+"','"+end+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute portal_list_scrw_count '"+query+"','"+begin+"','"+end+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}
	
	public IPageList report_sczzp(QueryObject qo, String query, String begin,
			String end) {
		// TODO Auto-generated method stub
		String sql = "execute report_sczzp '"+query+"','"+begin+"','"+end+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'"; 
		String totalsql = "execute report_sczzp_count '"+query+"','"+begin+"','"+end+"','"+qo.getOrderBy()+"','"+qo.getOrderType()+"'";
		return QueryUtil.query(qo, totalsql, sql, true, jdbcDao);
	}

	public void exec_close_scrw() {
		// TODO Auto-generated method stub
		kingdeeDao.execute("exec close_scrw");
		kingdeeDao.execute("exec unclose_scrw");
	}
	
	public void updateForSQL(String sql) {
		// TODO Auto-generated method stub
		kingdeeDao.update(sql);
	}
	
	public String getLastPublicIp() {
		// TODO Auto-generated method stub
		String sql = "select top 1 ip from public_ip order by date desc";
		return (String) rssDao.queryForObject(sql, String.class);
	}
	
	public void insert_public_ip(String ipAddress) {
		// TODO Auto-generated method stub
		String sql = "insert public_ip (ip,date) values ('"+ipAddress+"',Convert(char(19),getdate(),120))";
		rssDao.update(sql);
	}
	
}
