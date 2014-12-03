package org.cx.rss.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Seorderentry implements Serializable {
	
	@Id
	@GeneratedValue(strategy=GenerationType.TABLE)
	private int fdetailid;

	private String fbrno;

	private Long finterid;

	private int fentryid;

	private int fitemid;

	private BigDecimal fqty;

	private BigDecimal fcommitqty;

	private BigDecimal fprice;

	private BigDecimal famount;

	private BigDecimal ftaxrate;

	private BigDecimal ftaxamount;

	private BigDecimal ftax;

	private float fdiscount;

	private String fnote;

	private Timestamp fdate;

	private BigDecimal fdiscountamount;

	private BigDecimal finvoiceqty;

	private BigDecimal fbcommitqty;

	private int ftranleadtime;

	private int fatpdeduct;

	private int fcostobjectid;

	private int funitid;

	private BigDecimal fauxbcommitqty;

	private BigDecimal fauxcommitqty;

	private BigDecimal fauxinvoiceqty;

	private BigDecimal fauxprice;

	private BigDecimal fauxqty;

	private BigDecimal funidiscount;

	private BigDecimal ffinalamount;

	private int fsourceentryid;

	private int fhavemrp;

	private BigDecimal fstockqty;

	private BigDecimal fauxstockqty;

	private String fbatchno;

	private BigDecimal fcess;

	private Timestamp fadviceconsigndate;

	private int fbominterid;

	private String fmapnumber;

	private String fmapname;

	private int flockflag;

	private int finforecast;

	private BigDecimal fallamount;

	private BigDecimal fallstdamount;

	private int fauxpropid;

	private BigDecimal fauxpricediscount;

	private BigDecimal fpricediscount;

	private BigDecimal fqtyinvoice;

	private BigDecimal fqtyinvoicebase;

	private BigDecimal ftaxamt;

	private BigDecimal fauxtaxprice;

	private BigDecimal ftaxprice;

	private BigDecimal freceiveamountforCommit;

	private BigDecimal freceiveamountCommit;

	private BigDecimal fseccoefficient;

	private BigDecimal fsecqty;

	private BigDecimal fseccommitqty;

	private int fsourcetrantype;

	private int fsourceinterid;

	private String fsourcebillno;

	private int fcontractinterid;

	private int fcontractentryid;

	private String fcontractbillno;

	private int fmrplockflag;

	private int fmrptrackflag;

	private BigDecimal fordercommitqty;

	private BigDecimal forderseccommitqty;

	private BigDecimal fauxqtyinvoice;

	private BigDecimal fcommitinstall;

	private BigDecimal fauxcommitinstall;

	private int fmrpclosed;

	private BigDecimal fauxincommitqty;

	private BigDecimal fincommitqty;

	private BigDecimal fsecincommitqty;

	private BigDecimal fapplycommitqty;

	private BigDecimal fauxapplycommitqty;

	private BigDecimal fsecapplycommitqty;

	private int fevaluated;

	private int fpackunitid;

	private int fpackcount;

	private BigDecimal fpacktype;

	private int fmapid;

	private String fgoodsdesc;

	private BigDecimal famountafterdiscount;

	private BigDecimal finformcommitqty;

	private BigDecimal fauxinformcommitqty;

	private BigDecimal fsecinformcommitqty;

	private BigDecimal fpurcommitqty;

	private BigDecimal fauxpurcommitqty;

	private BigDecimal fsecpurcommitqty;

	private int fmrpautoclosed;

	private BigDecimal fsecstockqty;

	private BigDecimal fsecinvoiceqty;

	private BigDecimal fseccommitinstall;

	private int fplanmode;

	private String fmtono;

	private String forderbillno;

	private int forderentryid;

	private static final long serialVersionUID = 1L;

	public Seorderentry() {
		super();
	}

	public int getFdetailid() {
		return this.fdetailid;
	}

	public void setFdetailid(int fdetailid) {
		this.fdetailid = fdetailid;
	}

	public String getFbrno() {
		return this.fbrno;
	}

	public void setFbrno(String fbrno) {
		this.fbrno = fbrno;
	}

	public Long getFinterid() {
		return this.finterid;
	}

	public void setFinterid(Long finterid) {
		this.finterid = finterid;
	}

	public int getFentryid() {
		return this.fentryid;
	}

	public void setFentryid(int fentryid) {
		this.fentryid = fentryid;
	}

	public int getFitemid() {
		return this.fitemid;
	}

	public void setFitemid(int fitemid) {
		this.fitemid = fitemid;
	}

	public BigDecimal getFqty() {
		return this.fqty;
	}

	public void setFqty(BigDecimal fqty) {
		this.fqty = fqty;
	}

	public BigDecimal getFcommitqty() {
		return this.fcommitqty;
	}

	public void setFcommitqty(BigDecimal fcommitqty) {
		this.fcommitqty = fcommitqty;
	}

	public BigDecimal getFprice() {
		return this.fprice;
	}

	public void setFprice(BigDecimal fprice) {
		this.fprice = fprice;
	}

	public BigDecimal getFamount() {
		return this.famount;
	}

	public void setFamount(BigDecimal famount) {
		this.famount = famount;
	}

	public BigDecimal getFtaxrate() {
		return this.ftaxrate;
	}

	public void setFtaxrate(BigDecimal ftaxrate) {
		this.ftaxrate = ftaxrate;
	}

	public BigDecimal getFtaxamount() {
		return this.ftaxamount;
	}

	public void setFtaxamount(BigDecimal ftaxamount) {
		this.ftaxamount = ftaxamount;
	}

	public BigDecimal getFtax() {
		return this.ftax;
	}

	public void setFtax(BigDecimal ftax) {
		this.ftax = ftax;
	}

	public float getFdiscount() {
		return this.fdiscount;
	}

	public void setFdiscount(float fdiscount) {
		this.fdiscount = fdiscount;
	}

	public String getFnote() {
		return this.fnote;
	}

	public void setFnote(String fnote) {
		this.fnote = fnote;
	}

	public Timestamp getFdate() {
		return this.fdate;
	}

	public void setFdate(Timestamp fdate) {
		this.fdate = fdate;
	}

	public BigDecimal getFdiscountamount() {
		return this.fdiscountamount;
	}

	public void setFdiscountamount(BigDecimal fdiscountamount) {
		this.fdiscountamount = fdiscountamount;
	}

	public BigDecimal getFinvoiceqty() {
		return this.finvoiceqty;
	}

	public void setFinvoiceqty(BigDecimal finvoiceqty) {
		this.finvoiceqty = finvoiceqty;
	}

	public BigDecimal getFbcommitqty() {
		return this.fbcommitqty;
	}

	public void setFbcommitqty(BigDecimal fbcommitqty) {
		this.fbcommitqty = fbcommitqty;
	}

	public int getFtranleadtime() {
		return this.ftranleadtime;
	}

	public void setFtranleadtime(int ftranleadtime) {
		this.ftranleadtime = ftranleadtime;
	}

	public int getFatpdeduct() {
		return this.fatpdeduct;
	}

	public void setFatpdeduct(int fatpdeduct) {
		this.fatpdeduct = fatpdeduct;
	}

	public int getFcostobjectid() {
		return this.fcostobjectid;
	}

	public void setFcostobjectid(int fcostobjectid) {
		this.fcostobjectid = fcostobjectid;
	}

	public int getFunitid() {
		return this.funitid;
	}

	public void setFunitid(int funitid) {
		this.funitid = funitid;
	}

	public BigDecimal getFauxbcommitqty() {
		return this.fauxbcommitqty;
	}

	public void setFauxbcommitqty(BigDecimal fauxbcommitqty) {
		this.fauxbcommitqty = fauxbcommitqty;
	}

	public BigDecimal getFauxcommitqty() {
		return this.fauxcommitqty;
	}

	public void setFauxcommitqty(BigDecimal fauxcommitqty) {
		this.fauxcommitqty = fauxcommitqty;
	}

	public BigDecimal getFauxinvoiceqty() {
		return this.fauxinvoiceqty;
	}

	public void setFauxinvoiceqty(BigDecimal fauxinvoiceqty) {
		this.fauxinvoiceqty = fauxinvoiceqty;
	}

	public BigDecimal getFauxprice() {
		return this.fauxprice;
	}

	public void setFauxprice(BigDecimal fauxprice) {
		this.fauxprice = fauxprice;
	}

	public BigDecimal getFauxqty() {
		return this.fauxqty;
	}

	public void setFauxqty(BigDecimal fauxqty) {
		this.fauxqty = fauxqty;
	}

	public BigDecimal getFunidiscount() {
		return this.funidiscount;
	}

	public void setFunidiscount(BigDecimal funidiscount) {
		this.funidiscount = funidiscount;
	}

	public BigDecimal getFfinalamount() {
		return this.ffinalamount;
	}

	public void setFfinalamount(BigDecimal ffinalamount) {
		this.ffinalamount = ffinalamount;
	}

	public int getFsourceentryid() {
		return this.fsourceentryid;
	}

	public void setFsourceentryid(int fsourceentryid) {
		this.fsourceentryid = fsourceentryid;
	}

	public int getFhavemrp() {
		return this.fhavemrp;
	}

	public void setFhavemrp(int fhavemrp) {
		this.fhavemrp = fhavemrp;
	}

	public BigDecimal getFstockqty() {
		return this.fstockqty;
	}

	public void setFstockqty(BigDecimal fstockqty) {
		this.fstockqty = fstockqty;
	}

	public BigDecimal getFauxstockqty() {
		return this.fauxstockqty;
	}

	public void setFauxstockqty(BigDecimal fauxstockqty) {
		this.fauxstockqty = fauxstockqty;
	}

	public String getFbatchno() {
		return this.fbatchno;
	}

	public void setFbatchno(String fbatchno) {
		this.fbatchno = fbatchno;
	}

	public BigDecimal getFcess() {
		return this.fcess;
	}

	public void setFcess(BigDecimal fcess) {
		this.fcess = fcess;
	}

	public Timestamp getFadviceconsigndate() {
		return this.fadviceconsigndate;
	}

	public void setFadviceconsigndate(Timestamp fadviceconsigndate) {
		this.fadviceconsigndate = fadviceconsigndate;
	}

	public int getFbominterid() {
		return this.fbominterid;
	}

	public void setFbominterid(int fbominterid) {
		this.fbominterid = fbominterid;
	}

	public String getFmapnumber() {
		return this.fmapnumber;
	}

	public void setFmapnumber(String fmapnumber) {
		this.fmapnumber = fmapnumber;
	}

	public String getFmapname() {
		return this.fmapname;
	}

	public void setFmapname(String fmapname) {
		this.fmapname = fmapname;
	}

	public int getFlockflag() {
		return this.flockflag;
	}

	public void setFlockflag(int flockflag) {
		this.flockflag = flockflag;
	}

	public int getFinforecast() {
		return this.finforecast;
	}

	public void setFinforecast(int finforecast) {
		this.finforecast = finforecast;
	}

	public BigDecimal getFallamount() {
		return this.fallamount;
	}

	public void setFallamount(BigDecimal fallamount) {
		this.fallamount = fallamount;
	}

	public BigDecimal getFallstdamount() {
		return this.fallstdamount;
	}

	public void setFallstdamount(BigDecimal fallstdamount) {
		this.fallstdamount = fallstdamount;
	}

	public int getFauxpropid() {
		return this.fauxpropid;
	}

	public void setFauxpropid(int fauxpropid) {
		this.fauxpropid = fauxpropid;
	}

	public BigDecimal getFauxpricediscount() {
		return this.fauxpricediscount;
	}

	public void setFauxpricediscount(BigDecimal fauxpricediscount) {
		this.fauxpricediscount = fauxpricediscount;
	}

	public BigDecimal getFpricediscount() {
		return this.fpricediscount;
	}

	public void setFpricediscount(BigDecimal fpricediscount) {
		this.fpricediscount = fpricediscount;
	}

	public BigDecimal getFqtyinvoice() {
		return this.fqtyinvoice;
	}

	public void setFqtyinvoice(BigDecimal fqtyinvoice) {
		this.fqtyinvoice = fqtyinvoice;
	}

	public BigDecimal getFqtyinvoicebase() {
		return this.fqtyinvoicebase;
	}

	public void setFqtyinvoicebase(BigDecimal fqtyinvoicebase) {
		this.fqtyinvoicebase = fqtyinvoicebase;
	}

	public BigDecimal getFtaxamt() {
		return this.ftaxamt;
	}

	public void setFtaxamt(BigDecimal ftaxamt) {
		this.ftaxamt = ftaxamt;
	}

	public BigDecimal getFauxtaxprice() {
		return this.fauxtaxprice;
	}

	public void setFauxtaxprice(BigDecimal fauxtaxprice) {
		this.fauxtaxprice = fauxtaxprice;
	}

	public BigDecimal getFtaxprice() {
		return this.ftaxprice;
	}

	public void setFtaxprice(BigDecimal ftaxprice) {
		this.ftaxprice = ftaxprice;
	}

	public BigDecimal getFreceiveamountforCommit() {
		return this.freceiveamountforCommit;
	}

	public void setFreceiveamountforCommit(BigDecimal freceiveamountforCommit) {
		this.freceiveamountforCommit = freceiveamountforCommit;
	}

	public BigDecimal getFreceiveamountCommit() {
		return this.freceiveamountCommit;
	}

	public void setFreceiveamountCommit(BigDecimal freceiveamountCommit) {
		this.freceiveamountCommit = freceiveamountCommit;
	}

	public BigDecimal getFseccoefficient() {
		return this.fseccoefficient;
	}

	public void setFseccoefficient(BigDecimal fseccoefficient) {
		this.fseccoefficient = fseccoefficient;
	}

	public BigDecimal getFsecqty() {
		return this.fsecqty;
	}

	public void setFsecqty(BigDecimal fsecqty) {
		this.fsecqty = fsecqty;
	}

	public BigDecimal getFseccommitqty() {
		return this.fseccommitqty;
	}

	public void setFseccommitqty(BigDecimal fseccommitqty) {
		this.fseccommitqty = fseccommitqty;
	}

	public int getFsourcetrantype() {
		return this.fsourcetrantype;
	}

	public void setFsourcetrantype(int fsourcetrantype) {
		this.fsourcetrantype = fsourcetrantype;
	}

	public int getFsourceinterid() {
		return this.fsourceinterid;
	}

	public void setFsourceinterid(int fsourceinterid) {
		this.fsourceinterid = fsourceinterid;
	}

	public String getFsourcebillno() {
		return this.fsourcebillno;
	}

	public void setFsourcebillno(String fsourcebillno) {
		this.fsourcebillno = fsourcebillno;
	}

	public int getFcontractinterid() {
		return this.fcontractinterid;
	}

	public void setFcontractinterid(int fcontractinterid) {
		this.fcontractinterid = fcontractinterid;
	}

	public int getFcontractentryid() {
		return this.fcontractentryid;
	}

	public void setFcontractentryid(int fcontractentryid) {
		this.fcontractentryid = fcontractentryid;
	}

	public String getFcontractbillno() {
		return this.fcontractbillno;
	}

	public void setFcontractbillno(String fcontractbillno) {
		this.fcontractbillno = fcontractbillno;
	}

	public int getFmrplockflag() {
		return this.fmrplockflag;
	}

	public void setFmrplockflag(int fmrplockflag) {
		this.fmrplockflag = fmrplockflag;
	}

	public int getFmrptrackflag() {
		return this.fmrptrackflag;
	}

	public void setFmrptrackflag(int fmrptrackflag) {
		this.fmrptrackflag = fmrptrackflag;
	}

	public BigDecimal getFordercommitqty() {
		return this.fordercommitqty;
	}

	public void setFordercommitqty(BigDecimal fordercommitqty) {
		this.fordercommitqty = fordercommitqty;
	}

	public BigDecimal getForderseccommitqty() {
		return this.forderseccommitqty;
	}

	public void setForderseccommitqty(BigDecimal forderseccommitqty) {
		this.forderseccommitqty = forderseccommitqty;
	}

	public BigDecimal getFauxqtyinvoice() {
		return this.fauxqtyinvoice;
	}

	public void setFauxqtyinvoice(BigDecimal fauxqtyinvoice) {
		this.fauxqtyinvoice = fauxqtyinvoice;
	}

	public BigDecimal getFcommitinstall() {
		return this.fcommitinstall;
	}

	public void setFcommitinstall(BigDecimal fcommitinstall) {
		this.fcommitinstall = fcommitinstall;
	}

	public BigDecimal getFauxcommitinstall() {
		return this.fauxcommitinstall;
	}

	public void setFauxcommitinstall(BigDecimal fauxcommitinstall) {
		this.fauxcommitinstall = fauxcommitinstall;
	}

	public int getFmrpclosed() {
		return this.fmrpclosed;
	}

	public void setFmrpclosed(int fmrpclosed) {
		this.fmrpclosed = fmrpclosed;
	}

	public BigDecimal getFauxincommitqty() {
		return this.fauxincommitqty;
	}

	public void setFauxincommitqty(BigDecimal fauxincommitqty) {
		this.fauxincommitqty = fauxincommitqty;
	}

	public BigDecimal getFincommitqty() {
		return this.fincommitqty;
	}

	public void setFincommitqty(BigDecimal fincommitqty) {
		this.fincommitqty = fincommitqty;
	}

	public BigDecimal getFsecincommitqty() {
		return this.fsecincommitqty;
	}

	public void setFsecincommitqty(BigDecimal fsecincommitqty) {
		this.fsecincommitqty = fsecincommitqty;
	}

	public BigDecimal getFapplycommitqty() {
		return this.fapplycommitqty;
	}

	public void setFapplycommitqty(BigDecimal fapplycommitqty) {
		this.fapplycommitqty = fapplycommitqty;
	}

	public BigDecimal getFauxapplycommitqty() {
		return this.fauxapplycommitqty;
	}

	public void setFauxapplycommitqty(BigDecimal fauxapplycommitqty) {
		this.fauxapplycommitqty = fauxapplycommitqty;
	}

	public BigDecimal getFsecapplycommitqty() {
		return this.fsecapplycommitqty;
	}

	public void setFsecapplycommitqty(BigDecimal fsecapplycommitqty) {
		this.fsecapplycommitqty = fsecapplycommitqty;
	}

	public int getFevaluated() {
		return this.fevaluated;
	}

	public void setFevaluated(int fevaluated) {
		this.fevaluated = fevaluated;
	}

	public int getFpackunitid() {
		return this.fpackunitid;
	}

	public void setFpackunitid(int fpackunitid) {
		this.fpackunitid = fpackunitid;
	}

	public int getFpackcount() {
		return this.fpackcount;
	}

	public void setFpackcount(int fpackcount) {
		this.fpackcount = fpackcount;
	}

	public BigDecimal getFpacktype() {
		return this.fpacktype;
	}

	public void setFpacktype(BigDecimal fpacktype) {
		this.fpacktype = fpacktype;
	}

	public int getFmapid() {
		return this.fmapid;
	}

	public void setFmapid(int fmapid) {
		this.fmapid = fmapid;
	}

	public String getFgoodsdesc() {
		return this.fgoodsdesc;
	}

	public void setFgoodsdesc(String fgoodsdesc) {
		this.fgoodsdesc = fgoodsdesc;
	}

	public BigDecimal getFamountafterdiscount() {
		return this.famountafterdiscount;
	}

	public void setFamountafterdiscount(BigDecimal famountafterdiscount) {
		this.famountafterdiscount = famountafterdiscount;
	}

	public BigDecimal getFinformcommitqty() {
		return this.finformcommitqty;
	}

	public void setFinformcommitqty(BigDecimal finformcommitqty) {
		this.finformcommitqty = finformcommitqty;
	}

	public BigDecimal getFauxinformcommitqty() {
		return this.fauxinformcommitqty;
	}

	public void setFauxinformcommitqty(BigDecimal fauxinformcommitqty) {
		this.fauxinformcommitqty = fauxinformcommitqty;
	}

	public BigDecimal getFsecinformcommitqty() {
		return this.fsecinformcommitqty;
	}

	public void setFsecinformcommitqty(BigDecimal fsecinformcommitqty) {
		this.fsecinformcommitqty = fsecinformcommitqty;
	}

	public BigDecimal getFpurcommitqty() {
		return this.fpurcommitqty;
	}

	public void setFpurcommitqty(BigDecimal fpurcommitqty) {
		this.fpurcommitqty = fpurcommitqty;
	}

	public BigDecimal getFauxpurcommitqty() {
		return this.fauxpurcommitqty;
	}

	public void setFauxpurcommitqty(BigDecimal fauxpurcommitqty) {
		this.fauxpurcommitqty = fauxpurcommitqty;
	}

	public BigDecimal getFsecpurcommitqty() {
		return this.fsecpurcommitqty;
	}

	public void setFsecpurcommitqty(BigDecimal fsecpurcommitqty) {
		this.fsecpurcommitqty = fsecpurcommitqty;
	}

	public int getFmrpautoclosed() {
		return this.fmrpautoclosed;
	}

	public void setFmrpautoclosed(int fmrpautoclosed) {
		this.fmrpautoclosed = fmrpautoclosed;
	}

	public BigDecimal getFsecstockqty() {
		return this.fsecstockqty;
	}

	public void setFsecstockqty(BigDecimal fsecstockqty) {
		this.fsecstockqty = fsecstockqty;
	}

	public BigDecimal getFsecinvoiceqty() {
		return this.fsecinvoiceqty;
	}

	public void setFsecinvoiceqty(BigDecimal fsecinvoiceqty) {
		this.fsecinvoiceqty = fsecinvoiceqty;
	}

	public BigDecimal getFseccommitinstall() {
		return this.fseccommitinstall;
	}

	public void setFseccommitinstall(BigDecimal fseccommitinstall) {
		this.fseccommitinstall = fseccommitinstall;
	}

	public int getFplanmode() {
		return this.fplanmode;
	}

	public void setFplanmode(int fplanmode) {
		this.fplanmode = fplanmode;
	}

	public String getFmtono() {
		return this.fmtono;
	}

	public void setFmtono(String fmtono) {
		this.fmtono = fmtono;
	}

	public String getForderbillno() {
		return this.forderbillno;
	}

	public void setForderbillno(String forderbillno) {
		this.forderbillno = forderbillno;
	}

	public int getForderentryid() {
		return this.forderentryid;
	}

	public void setForderentryid(int forderentryid) {
		this.forderentryid = forderentryid;
	}

}
