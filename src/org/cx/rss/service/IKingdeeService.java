package org.cx.rss.service;

import java.util.List;
import java.util.Map;

import com.easyjf.core.support.query.QueryObject;
import com.easyjf.web.tools.IPageList;

public interface IKingdeeService {
	
	public List xiaoshoudingdan_zhixingqingkuang();
	
	public List caigoudingdan_zhixingqingkuang();
	
	/**
	 * 销售订单汇总统计（客户+产品）
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList report_xsddhztj(QueryObject qo, String query, String begin, String end, String huizong);
	
	/**
	 * 销售订单交期提醒
	 * @param diffday 小于天数才提醒
	 * @return
	 */
	public List hint_xsddjq(Integer diffday);
	
	/**
	 * 销售订单列表
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_xsdd(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 无单价订单列表
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList list_xsdd_wdj(QueryObject qo, String query, String begin, String end);
	
	/**
	 * 销售出库列表
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_xsck(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 发货通知
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_fhtz(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 销售发票
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_xsfp(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 生产任务
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_scrw(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 生产任务未结案明细
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_scrw_wja(QueryObject qo, String query, String begin, String end);
	
	/**
	 * 因为没有接收而不应结案的任务单
	 * @param qo
	 * @return
	 */
	public IPageList list_scrw_tqja(QueryObject qo);
	
	/**
	 * 及时库存
	 * @param qo
	 * @param query
	 * @return
	 */
	public IPageList list_jskc_lhbz(QueryObject qo, String query);
	
	/**
	 * 安全库存
	 * @param qo
	 * @param query
	 * @return
	 */
	public IPageList list_aqkc(QueryObject qo, String query, String month, String state);
	
	/**
	 * 安全库存图表数据
	 * @param qo
	 * @param FItemID
	 * @param begin
	 * @param end
	 * @return
	 */
	public List chart_aqkc(String FItemID, String begin, String end);
	
	/**
	 * 销售出库统计按金额（图表）
	 * @param FItemID
	 * @param begin
	 * @param end
	 * @return
	 */
	public List chart_column_xsck(String begin, String end, String wldm, String wldw);
	
	/**
	 * 销售出库统计按客户（图表）
	 * @param begin
	 * @param end
	 * @return
	 */
	public List chart_pie_xsck(String begin, String end, String huizong);
	
	/**
	 * 打印合格证
	 * @param FBillNo 检验单号
	 * @return
	 */
	public List print_coc(String FBillNo);
	
	/**
	 * 打印合格证
	 * @param FBillNo 任务单号
	 * @return
	 */
	public List print_coc_scrw(String FBillNo);
	
	/**
	 * 打印合格证
	 * @param wldm 物料代码
	 * @return
	 */
	public List print_coc_wldm(String wldm);
	
	/**
	 * 打印合格证
	 * @param FBillNo 流转卡
	 * @return
	 */
	public List print_coc_lzk(String FBillNo);
	
	/**
	 * 打印物料卡
	 * @param FBillNo 任务单号
	 * @return
	 */
	public List print_bom(String FBillNo);
	
	/**
	 * 根据任务单查找检验单
	 * @param FBillNo
	 * @return
	 */
	public List sreach_fqc(String FBillNo);
	
	/**
	 * 生产领料
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_scll(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 生产投料
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_sctl(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 生产物料报废
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_scbf(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 产品入库
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_cprk(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 委外转出
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_wwzc(QueryObject qo, String query, String begin, String end, String status, String style);
	
	/**
	 * 用于委外检验申请
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_wwzc_edit(QueryObject qo, String query);
	
	/**
	 * 委外接收
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_wwjs(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 委外检验
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_wwjy(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 委外检验申请单
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList list_wwjysqd(QueryObject qo, String query, String begin, String end);
	
	/**
	 * 委外工序检验及时率明细
	 * @param qo
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList list_wwjyjsl(QueryObject qo, String begin, String end, String status);
	
	/**
	 * 生产消耗
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList report_scxh(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 生产消耗汇总 有成本对象，本月有完工产品的物料领用
	 * @param qo
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList report_scxhhz_1(QueryObject qo, String begin, String end);
	
	/**
	 * 生产消耗汇总 有成本对象，但无完工产品的物料领用
	 * @param qo
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList report_scxhhz_2(QueryObject qo, String begin, String end);
	
	/**
	 * 生产消耗汇总 没有成本对象的物料领用
	 * @param qo
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList report_scxhhz_3(QueryObject qo, String begin, String end);
	
	/**
	 * 按入库数量的委外加工费汇总
	 * @param qo
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList report_wwgxjgfhz(QueryObject qo, String begin, String end);
	
	/**
	 * 插入合格证信息
	 * @param wlmc
	 * @param wldm
	 * @param wlgg
	 * @param gzdh
	 * @param wlph
	 * @param jyry
	 * @param jyrq
	 */
	public void insert_coc(String wlmc, String wldm, String wlgg, String gzdh, String wlph, String jyry, String jyrq, String note);
	
	/**
	 * 用于条码打印软件的动态模版
	 * @param wlmc
	 * @param wldm
	 * @param wlgg
	 * @param gzdh
	 * @param wlph
	 * @param jyry
	 * @param jyrq
	 */
	public void insert_coc1(String wlmc, String wldm, String wlgg, String gzdh, String wlph, String jyry, String jyrq, String fssl, String luhao,String fangbao, String caizhi, String beizhu, String wlth, String lzk, String ip);
	
	/**
	 * 插入图号
	 * @param gsth
	 * @param khth
	 * @param cpcz
	 * @param sslb
	 * @param rq
	 * @param lc
	 */
	public void insert_thcx(String gsth, String cpmc, String khth, String cpcz, String sslb, String lc, String ip);
	
	/**
	 * 修改图号
	 * @param gsth
	 * @param cpmc
	 * @param khth
	 * @param cpcz
	 * @param sslb
	 * @param lc
	 */
	public void update_thcx(Integer id, String cpmc, String khth, String cpcz, String sslb, String lc, String ip);
	
	/**
	 * 新增时判断新的图号是否重复
	 * @param gsth
	 * @return
	 */
	public Boolean isInsert_thcx(String gsth);
	
	/**
	 * 更新时判断新的图号是否重复（暂时没有使用）
	 * @param gsth
	 * @return
	 */
	public Boolean isUpdate_thcx(String gsth);
	
	/**
	 * 采购申请
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_cgsq(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 采购订单
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_cgdd(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 来料检验申请单
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_lljysqd(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 收货单 
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_shd(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 来料检验单
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_lljyd(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 外购入库
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_wgrk(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 受托加工入库
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_stjgrk(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 委外工序执行跟踪表
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList report_wwgxzxgzb(QueryObject qo, String query, String begin, String end);
	
	/**
	 * 统计外购交期
	 * @param qo
	 * @param begin
	 * @param end
	 * @return
	 */
	public Map count_wgjq(String begin, String end);
	
	/**
	 * 外协交期
	 * @param begin
	 * @param end
	 * @return
	 */
	public Map count_wxjq(String begin, String end);
	
	/**
	 * 外购及时率
	 * @param begin
	 * @param end
	 * @return
	 */
	public Map count_wgjsl(String begin, String end);
	
	/**
	 * 外协及时率
	 * @param begin
	 * @param end
	 * @return
	 */
	public Map count_wxjsl(String begin, String end);
	
	/**
	 * 生产任务及时率
	 * @param begin
	 * @param end
	 * @return
	 */
	public Map count_scrwjsl(String begin, String end);
	
	/**
	 * 产品检验及时率
	 * @param begin
	 * @param end
	 * @return
	 */
	public Map count_cpjyjsl(String begin, String end);
	
	/**
	 * 外购检验及时率
	 * @param begin
	 * @param end
	 * @return
	 */
	public Map count_wgjyjsl(String begin, String end);
	
	/**
	 * 委外检验及时率
	 * @param begin
	 * @param end
	 * @return
	 */
	public Map count_wwjyjsl(String begin, String end);
	
	/**
	 * 外购合格率
	 * @param qo
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public Map count_wghgl(String begin, String end);
	
	/**
	 * 外协合格率
	 * @param qo
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public Map count_wxhgl(String begin, String end);
	
	/**
	 * 产品合格率
	 * @param begin
	 * @param end
	 * @return
	 */
	public Map count_cphgl(String begin, String end);
	
	/**
	 * 销售订单交货及时率
	 * @param begin
	 * @param end
	 * @return
	 */
	public Map count_ddjsl(String begin, String end);
	
	/**
	 * 无单价订单总数
	 * @param begin
	 * @param end
	 * @return
	 */
	public Map count_wdjdd(String begin, String end);
	
	/**
	 * 未结案任务单
	 * @param begin
	 * @param end
	 * @return
	 */
	public Map count_wjarwd(String begin, String end);
	
	/**
	 * 外购及时率明细
	 * @param begin
	 * @param end
	 * @param status 0：全部；1：符合条件；2：不符合
	 * @return
	 */
	public IPageList list_wgjsl(QueryObject qo, String begin, String end, String status);
	
	/**
	 * 外协及时率明细
	 * @param begin
	 * @param end
	 * @param status 0：全部；1：符合条件；2：不符合
	 * @return
	 */
	public IPageList list_wxjsl(QueryObject qo, String begin, String end, String status);
	
	/**
	 * 外购合格率明细
	 * @param qo
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_wghgl(QueryObject qo, String begin, String end, String status);
	
	/**
	 * 外协合格率明细
	 * @param qo
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_wxhgl(QueryObject qo, String begin, String end, String status);
	
	/**
	 * 产品合格率明细
	 * @param qo
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_cphgl(QueryObject qo, String begin, String end, String status);
	
	/**
	 * 外购检验及时率明细
	 * @param qo
	 * @param begin
	 * @param end
	 * @param status 0：全部；1：符合条件；2：不符合
	 * @return
	 */
	public IPageList list_wgjyjsl(QueryObject qo, String begin, String end, String status);
	
	/**
	 * 产品检验及时率明细
	 * @param qo
	 * @param begin
	 * @param end
	 * @param status 0：全部；1：符合条件；2：不符合
	 * @return
	 */
	public IPageList list_cpjyjsl(QueryObject qo, String begin, String end, String status);
	
	/**
	 * 销售订单交货及时率明细
	 * @param qo
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_ddjsl(QueryObject qo, String begin, String end, String status);
	
	/**
	 * 生产任务达成率明细
	 * @param qo
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_scrwdcl(QueryObject qo, String begin, String end, String status);
	
	/**
	 * 生产任务达成率未做单据
	 * @param qo
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList list_scrwwzdj(QueryObject qo, String begin, String end);
	
	/**
	 * 销售订单未交货明细
	 * @param qo
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList list_ddwzdj(QueryObject qo, String begin, String end);
	
	/**
	 * 外协未做单据明细
	 * @param qo
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_wxwzdj(QueryObject qo, String begin, String end, String status);
	
	/**
	 * 外购未做单据明细
	 * @param qo
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_wgwzdj(QueryObject qo, String begin, String end, String status);
	
	/**
	 * 产品检验未做单据明细
	 * @param qo
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_cpjywzdj(QueryObject qo, String begin, String end);
	
	/**
	 * 外购检验未做单据明细
	 * @param qo
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_wgjywzdj(QueryObject qo, String begin, String end);
	
	/**
	 * 委外工序检验未做单据
	 * @param qo
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList list_wwjywzdj(QueryObject qo, String begin, String end);
	
	/**
	 * 产品检验单
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_cpjyd(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 产品检验申请单
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @param style 默认0:正常列表方式；1:只显示没有完全下推检验单的单据
	 * @return
	 */
	public IPageList list_cpjysqd(QueryObject qo, String query, String begin, String end, String status, String style);
	
	/**
	 * 复制检验单
	 * @param jydh 被复制的检验单号
	 * @param interid 检验申请单内码
	 * @param entryid 检验申请单分录号
	 * @return
	 */
	public void copy_cpjyd(String jydh, String interid, String entryid, String sqsl, String wlph, String FICMOInterID);
	
	/**
	 * 委外工序送检单
	 * @param interid
	 * @param entryid
	 * @param sjsl
	 */
	public void insert_wwjysqd(String interid, String entryid, String sjsl, String remark, String jyfs, String dj);
	
	/**
	 * 采购申请事务提醒
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList list_task_cgsq(QueryObject qo, String user, String query, String begin, String end);
	
	/**
	 * 外购入库事务提醒
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList list_task_wgrk(QueryObject qo, String user, String query, String begin, String end);
	
	/**
	 * 产品入库事务提醒
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList list_task_cprk(QueryObject qo, String user, String query, String begin, String end);
	
	/**
	 * 受托加工入库事务提醒
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList list_task_stjgrk(QueryObject qo, String user, String query, String begin, String end);
	
	/**
	 * 受托加工入库待审单据数量
	 * @param user
	 * @param begin
	 * @param end
	 * @return
	 */
	public int count_task_stjgrk(String user, String begin, String end);
	
	/**
	 * 外购入库待审单据数量 
	 * @param user
	 * @param begin
	 * @param end
	 * @return
	 */
	public int count_task_wgrk(String user, String begin, String end);
	
	/**
	 * 产品入库待审单据数量
	 * @param user
	 * @param begin
	 * @param end
	 * @return
	 */
	public int count_task_cprk(String user, String begin, String end);
	
	/**
	 * 采购申请待审单据数量
	 * @param user
	 * @param begin
	 * @param end
	 * @return
	 */
	public int count_task_cgsq(String user, String begin, String end);
	
	/**
	 * 委外接收待审单据数量
	 * @param begin
	 * @param end
	 * @return
	 */
	public int count_task_wwjs(String begin, String end);
	
	/**
	 * 生产任务单未接收已结案单据数量
	 * @param begin
	 * @param end
	 * @return
	 */
	public int count_scrw_tqja();
	
	/**
	 * 判断K3中是否存在user
	 * @param user
	 * @return
	 */
	public boolean exist_account(String user);
	
	/**
	 * 审核采购申请
	 * @param FInterID
	 * @param FUserID
	 */
	public void check_cgsq(String FInterID, String FUserID);
	
	/**
	 * 反审核采购申请
	 * @param FInterID
	 * @param FUserID
	 * @return
	 */
	public String uncheck_cgsq(String FInterID, String FUserID);
	
	/**
	 * 审核外购入库
	 * @param FInterID
	 * @param FUserID
	 */
	public void check_wgrk(String FInterID, String FUserID);
	
	/**
	 * 反审核外购入库
	 * @param FInterID
	 * @param FUserID
	 * @return
	 */
	public String uncheck_wgrk(String FInterID, String FUserID);
	
	/**
	 * 审核产品入库
	 * @param FInterID
	 * @param FUserID
	 */
	public void check_cprk(String FInterID, String FUserID);
	
	/**
	 * 反审核产品入库
	 * @param FInterID
	 * @param FUserID
	 * @return
	 */
	public String uncheck_cprk(String FInterID, String FUserID);
	
	/**
	 * 审核受托加工入库
	 * @param FInterID
	 * @param FUserID
	 */
	public void check_stjgrk(String FInterID, String FUserID);
	
	/**
	 * 反审核受托加工入库
	 * @param FInterID
	 * @param FUserID
	 * @return
	 */
	public String uncheck_stjgrk(String FInterID, String FUserID);
	
	/**
	 * 审核委外接收单二审
	 * @param FInterID
	 * @param FUserID   相当于K3 t_user FName
	 */
	public void check_wwjs(String FInterID, String FUserID);
	
	/**
	 * 更新委外接收单含税单价
	 * @param FEntryID
	 * @param hsdj
	 */
	public void update_wwjs_hsdj(String FEntryID, String hsdj);
	
	/**
	 * 根据FName 查询FUserID
	 * @param acc
	 * @return
	 */
	public String getFUserID(String acc);
	
	/**
	 * 同步销售单价
	 * @param FInterID
	 * @param FEntryID
	 */
	public void update_xsdj(String FInterID, String FEntryID);
	
	/**
	 * 销售单价有差异的销售发票列表
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param status
	 * @return
	 */
	public IPageList list_xsfp_djcy(QueryObject qo, String query, String begin, String end, String status);
	
	/**
	 * 开票与未开票统计
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param style
	 * @return
	 */
	public IPageList list_xswkp(QueryObject qo, String query, String begin, String end, String huizong, String dwdm);
	
	/**
	 * 采购未开票
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param huizong
	 * @param dwdm
	 * @return
	 */
	public IPageList list_cgwkp(QueryObject qo, String query, String begin, String end, String huizong, String dwdm);
	
	/**
	 * 借出物资台帐
	 * @param qo
	 * @param query
	 * @return
	 */
	public IPageList list_jcwz(QueryObject qo, String query);
	
	/**
	 * 外协送检异常
	 * @param qo
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList list_wxsjyc(QueryObject qo, String begin, String end);
	
	/**
	 * 生产任务单维护（物料消耗）
	 * @param qo
	 * @param begin
	 * @param end
	 * @param style 0-全部，1-有在制的
	 * @return
	 */
	public IPageList list_scrw_wlxh(QueryObject qo, String query, String begin, String end, String style);
	
	/**
	 * 图号查询系统
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList list_thcx(QueryObject qo, String query, String begin, String end);
	
	/**
	 * 刻印数据查询
	 * @param qo
	 * @param query
	 * @return
	 */
	public IPageList list_stamp(QueryObject qo, String query);
	
	/**
	 * 根据出厂编号 删除记录
	 * @param sn 出厂编号
	 */
	public void delete_record_stamp(String sn);
	
	/**
	 * 资产统计-电脑打印机等
	 * @param qo
	 * @param query
	 * @return
	 */
	public IPageList list_zctj(QueryObject qo, String query);
	
	/**
	 * 外协送检异常单据数量
	 * @param begin
	 * @param end
	 * @return
	 */
	public Integer count_wxsjyc(String begin, String end);
	
	/**
	 * 用于combo的数据，客户信息
	 * @param qo
	 * @return
	 */
	public IPageList select_org(QueryObject qo);
	
	/**
	 * 用于combo的数据，供货商信息
	 * @param qo
	 * @return
	 */
	public IPageList select_supply(QueryObject qo);
	
	/**
	 * 用于combo的数据，物料信息
	 * @param qo
	 * @return
	 */
	public IPageList select_item(QueryObject qo);
	
	/**
	 * 销售出库汇总统计
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param huizong
	 * @return
	 */
	public IPageList report_xsckhztj(QueryObject qo, String query, String begin, String end, String huizong);
	
	/**
	 * 销售发票汇总统计
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @param huizong
	 * @return
	 */
	public IPageList report_xsfphztj(QueryObject qo, String query, String begin, String end, String huizong);
	
	/**
	 * 销售订单列表（未出库）
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList portal_list_xsdd(QueryObject qo, String query, String begin, String end);
	
	/**
	 * 生产任务单列表（未入库）
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList portal_list_scrw(QueryObject qo, String query, String begin, String end);
	
	/**
	 * 车间帐表
	 * @param qo
	 * @param query
	 * @param begin
	 * @param end
	 * @return
	 */
	public IPageList report_sczzp(QueryObject qo, String query, String begin, String end);
	
	/**
	 * 系统自动判断任务单是否可以结案，如果物料平衡并且计划数量也执行完毕，就结案，如果没有接收而已结案的任务单，执行反结案
	 */
	public void exec_close_scrw();
	
	public void updateForSQL(String sql);
	
	/**
	 * 插入新的公网IP地址
	 * @param ipAddress
	 */
	public void insert_public_ip(String ipAddress);

	/**
	 * 获取最后一次记录的公网IP地址
	 * @return
	 */
	public String getLastPublicIp();
	
}
