package org.cx.rss.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Seorder implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.TABLE)
	private Long finterid;
	
	public Long getFinterid() {
		return finterid;
	}

	public void setFinterid(Long finterid) {
		this.finterid = finterid;
	}

	private String fbillno;

	private int fcurrencyid;

	private int fcustid;

	private Timestamp fdate;

	private String fpaystyle;

	private Timestamp fpaydate;

	private String ffetchstyle;

	private Timestamp ffetchdate;

	private String ffetchadd;

	private int fsalestyle;

	private int fdeptid;

	private int fempid;

	private int fcheckerid;

	private int fbillerid;

	private String fnote;

	private short fclosed;

	private int ftrantype;

	private short finvoiceclosed;

	private short fbclosed;

	private int fmangerid;

	private int fsettleid;

	private double fexchangerate;

	private boolean fdiscounttype;

	private short fstatus;

	private boolean fcancellation;

	private int fmultichecklevel1;

	private int fmultichecklevel2;

	private int fmultichecklevel3;

	private int fmultichecklevel4;

	private int fmultichecklevel5;

	private int fmultichecklevel6;

	private Timestamp fmulticheckdate1;

	private Timestamp fmulticheckdate2;

	private Timestamp fmulticheckdate3;

	private Timestamp fmulticheckdate4;

	private Timestamp fmulticheckdate5;

	private Timestamp fmulticheckdate6;

	private int fcurchecklevel;

	private float ftransitaheadtime;

	private String fpoordbillno;

	private int frelatebrid;

	private int fimport;

	private int forderaffirm;

	private int ftranstatus;

	private String fuuid;

	private Timestamp foperdate;

	private int fsystemtype;

	private String fcashdiscount;

	private Timestamp fcheckdate;

	private String fexplanation;

	private Timestamp fsettledate;

	private int fseltrantype;

	private int fchildren;

	private int fbrid;

	private int fareaps;

	private int fclasstypeid;

	private int fmanagetype;

	private short fsysstatus;

	private String fversionno;

	private Timestamp fchangedate;

	private String fchangecauses;

	private int fchangemark;

	private int fchangeuser;

	private String fvalidatername;

	private String fconsignee;

	private int fdrprelatetrantype;

	private short fprintcount;

	private BigDecimal fdiscount;

	private BigDecimal fdiscountrate;

	private BigDecimal fcommitdiscount;

	private static final long serialVersionUID = 1L;

	public Seorder() {
		super();
	}

	public String getFbillno() {
		return this.fbillno;
	}

	public void setFbillno(String fbillno) {
		this.fbillno = fbillno;
	}

	public int getFcurrencyid() {
		return this.fcurrencyid;
	}

	public void setFcurrencyid(int fcurrencyid) {
		this.fcurrencyid = fcurrencyid;
	}

	public int getFcustid() {
		return this.fcustid;
	}

	public void setFcustid(int fcustid) {
		this.fcustid = fcustid;
	}

	public Timestamp getFdate() {
		return this.fdate;
	}

	public void setFdate(Timestamp fdate) {
		this.fdate = fdate;
	}

	public String getFpaystyle() {
		return this.fpaystyle;
	}

	public void setFpaystyle(String fpaystyle) {
		this.fpaystyle = fpaystyle;
	}

	public Timestamp getFpaydate() {
		return this.fpaydate;
	}

	public void setFpaydate(Timestamp fpaydate) {
		this.fpaydate = fpaydate;
	}

	public String getFfetchstyle() {
		return this.ffetchstyle;
	}

	public void setFfetchstyle(String ffetchstyle) {
		this.ffetchstyle = ffetchstyle;
	}

	public Timestamp getFfetchdate() {
		return this.ffetchdate;
	}

	public void setFfetchdate(Timestamp ffetchdate) {
		this.ffetchdate = ffetchdate;
	}

	public String getFfetchadd() {
		return this.ffetchadd;
	}

	public void setFfetchadd(String ffetchadd) {
		this.ffetchadd = ffetchadd;
	}

	public int getFsalestyle() {
		return this.fsalestyle;
	}

	public void setFsalestyle(int fsalestyle) {
		this.fsalestyle = fsalestyle;
	}

	public int getFdeptid() {
		return this.fdeptid;
	}

	public void setFdeptid(int fdeptid) {
		this.fdeptid = fdeptid;
	}

	public int getFempid() {
		return this.fempid;
	}

	public void setFempid(int fempid) {
		this.fempid = fempid;
	}

	public int getFcheckerid() {
		return this.fcheckerid;
	}

	public void setFcheckerid(int fcheckerid) {
		this.fcheckerid = fcheckerid;
	}

	public int getFbillerid() {
		return this.fbillerid;
	}

	public void setFbillerid(int fbillerid) {
		this.fbillerid = fbillerid;
	}

	public String getFnote() {
		return this.fnote;
	}

	public void setFnote(String fnote) {
		this.fnote = fnote;
	}

	public short getFclosed() {
		return this.fclosed;
	}

	public void setFclosed(short fclosed) {
		this.fclosed = fclosed;
	}

	public int getFtrantype() {
		return this.ftrantype;
	}

	public void setFtrantype(int ftrantype) {
		this.ftrantype = ftrantype;
	}

	public short getFinvoiceclosed() {
		return this.finvoiceclosed;
	}

	public void setFinvoiceclosed(short finvoiceclosed) {
		this.finvoiceclosed = finvoiceclosed;
	}

	public short getFbclosed() {
		return this.fbclosed;
	}

	public void setFbclosed(short fbclosed) {
		this.fbclosed = fbclosed;
	}

	public int getFmangerid() {
		return this.fmangerid;
	}

	public void setFmangerid(int fmangerid) {
		this.fmangerid = fmangerid;
	}

	public int getFsettleid() {
		return this.fsettleid;
	}

	public void setFsettleid(int fsettleid) {
		this.fsettleid = fsettleid;
	}

	public double getFexchangerate() {
		return this.fexchangerate;
	}

	public void setFexchangerate(double fexchangerate) {
		this.fexchangerate = fexchangerate;
	}

	public boolean isFdiscounttype() {
		return this.fdiscounttype;
	}

	public void setFdiscounttype(boolean fdiscounttype) {
		this.fdiscounttype = fdiscounttype;
	}

	public short getFstatus() {
		return this.fstatus;
	}

	public void setFstatus(short fstatus) {
		this.fstatus = fstatus;
	}

	public boolean isFcancellation() {
		return this.fcancellation;
	}

	public void setFcancellation(boolean fcancellation) {
		this.fcancellation = fcancellation;
	}

	public int getFmultichecklevel1() {
		return this.fmultichecklevel1;
	}

	public void setFmultichecklevel1(int fmultichecklevel1) {
		this.fmultichecklevel1 = fmultichecklevel1;
	}

	public int getFmultichecklevel2() {
		return this.fmultichecklevel2;
	}

	public void setFmultichecklevel2(int fmultichecklevel2) {
		this.fmultichecklevel2 = fmultichecklevel2;
	}

	public int getFmultichecklevel3() {
		return this.fmultichecklevel3;
	}

	public void setFmultichecklevel3(int fmultichecklevel3) {
		this.fmultichecklevel3 = fmultichecklevel3;
	}

	public int getFmultichecklevel4() {
		return this.fmultichecklevel4;
	}

	public void setFmultichecklevel4(int fmultichecklevel4) {
		this.fmultichecklevel4 = fmultichecklevel4;
	}

	public int getFmultichecklevel5() {
		return this.fmultichecklevel5;
	}

	public void setFmultichecklevel5(int fmultichecklevel5) {
		this.fmultichecklevel5 = fmultichecklevel5;
	}

	public int getFmultichecklevel6() {
		return this.fmultichecklevel6;
	}

	public void setFmultichecklevel6(int fmultichecklevel6) {
		this.fmultichecklevel6 = fmultichecklevel6;
	}

	public Timestamp getFmulticheckdate1() {
		return this.fmulticheckdate1;
	}

	public void setFmulticheckdate1(Timestamp fmulticheckdate1) {
		this.fmulticheckdate1 = fmulticheckdate1;
	}

	public Timestamp getFmulticheckdate2() {
		return this.fmulticheckdate2;
	}

	public void setFmulticheckdate2(Timestamp fmulticheckdate2) {
		this.fmulticheckdate2 = fmulticheckdate2;
	}

	public Timestamp getFmulticheckdate3() {
		return this.fmulticheckdate3;
	}

	public void setFmulticheckdate3(Timestamp fmulticheckdate3) {
		this.fmulticheckdate3 = fmulticheckdate3;
	}

	public Timestamp getFmulticheckdate4() {
		return this.fmulticheckdate4;
	}

	public void setFmulticheckdate4(Timestamp fmulticheckdate4) {
		this.fmulticheckdate4 = fmulticheckdate4;
	}

	public Timestamp getFmulticheckdate5() {
		return this.fmulticheckdate5;
	}

	public void setFmulticheckdate5(Timestamp fmulticheckdate5) {
		this.fmulticheckdate5 = fmulticheckdate5;
	}

	public Timestamp getFmulticheckdate6() {
		return this.fmulticheckdate6;
	}

	public void setFmulticheckdate6(Timestamp fmulticheckdate6) {
		this.fmulticheckdate6 = fmulticheckdate6;
	}

	public int getFcurchecklevel() {
		return this.fcurchecklevel;
	}

	public void setFcurchecklevel(int fcurchecklevel) {
		this.fcurchecklevel = fcurchecklevel;
	}

	public float getFtransitaheadtime() {
		return this.ftransitaheadtime;
	}

	public void setFtransitaheadtime(float ftransitaheadtime) {
		this.ftransitaheadtime = ftransitaheadtime;
	}

	public String getFpoordbillno() {
		return this.fpoordbillno;
	}

	public void setFpoordbillno(String fpoordbillno) {
		this.fpoordbillno = fpoordbillno;
	}

	public int getFrelatebrid() {
		return this.frelatebrid;
	}

	public void setFrelatebrid(int frelatebrid) {
		this.frelatebrid = frelatebrid;
	}

	public int getFimport() {
		return this.fimport;
	}

	public void setFimport(int fimport) {
		this.fimport = fimport;
	}

	public int getForderaffirm() {
		return this.forderaffirm;
	}

	public void setForderaffirm(int forderaffirm) {
		this.forderaffirm = forderaffirm;
	}

	public int getFtranstatus() {
		return this.ftranstatus;
	}

	public void setFtranstatus(int ftranstatus) {
		this.ftranstatus = ftranstatus;
	}

	public String getFuuid() {
		return this.fuuid;
	}

	public void setFuuid(String fuuid) {
		this.fuuid = fuuid;
	}

	public Timestamp getFoperdate() {
		return this.foperdate;
	}

	public void setFoperdate(Timestamp foperdate) {
		this.foperdate = foperdate;
	}

	public int getFsystemtype() {
		return this.fsystemtype;
	}

	public void setFsystemtype(int fsystemtype) {
		this.fsystemtype = fsystemtype;
	}

	public String getFcashdiscount() {
		return this.fcashdiscount;
	}

	public void setFcashdiscount(String fcashdiscount) {
		this.fcashdiscount = fcashdiscount;
	}

	public Timestamp getFcheckdate() {
		return this.fcheckdate;
	}

	public void setFcheckdate(Timestamp fcheckdate) {
		this.fcheckdate = fcheckdate;
	}

	public String getFexplanation() {
		return this.fexplanation;
	}

	public void setFexplanation(String fexplanation) {
		this.fexplanation = fexplanation;
	}

	public Timestamp getFsettledate() {
		return this.fsettledate;
	}

	public void setFsettledate(Timestamp fsettledate) {
		this.fsettledate = fsettledate;
	}

	public int getFseltrantype() {
		return this.fseltrantype;
	}

	public void setFseltrantype(int fseltrantype) {
		this.fseltrantype = fseltrantype;
	}

	public int getFchildren() {
		return this.fchildren;
	}

	public void setFchildren(int fchildren) {
		this.fchildren = fchildren;
	}

	public int getFbrid() {
		return this.fbrid;
	}

	public void setFbrid(int fbrid) {
		this.fbrid = fbrid;
	}

	public int getFareaps() {
		return this.fareaps;
	}

	public void setFareaps(int fareaps) {
		this.fareaps = fareaps;
	}

	public int getFclasstypeid() {
		return this.fclasstypeid;
	}

	public void setFclasstypeid(int fclasstypeid) {
		this.fclasstypeid = fclasstypeid;
	}

	public int getFmanagetype() {
		return this.fmanagetype;
	}

	public void setFmanagetype(int fmanagetype) {
		this.fmanagetype = fmanagetype;
	}

	public short getFsysstatus() {
		return this.fsysstatus;
	}

	public void setFsysstatus(short fsysstatus) {
		this.fsysstatus = fsysstatus;
	}

	public String getFversionno() {
		return this.fversionno;
	}

	public void setFversionno(String fversionno) {
		this.fversionno = fversionno;
	}

	public Timestamp getFchangedate() {
		return this.fchangedate;
	}

	public void setFchangedate(Timestamp fchangedate) {
		this.fchangedate = fchangedate;
	}

	public String getFchangecauses() {
		return this.fchangecauses;
	}

	public void setFchangecauses(String fchangecauses) {
		this.fchangecauses = fchangecauses;
	}

	public int getFchangemark() {
		return this.fchangemark;
	}

	public void setFchangemark(int fchangemark) {
		this.fchangemark = fchangemark;
	}

	public int getFchangeuser() {
		return this.fchangeuser;
	}

	public void setFchangeuser(int fchangeuser) {
		this.fchangeuser = fchangeuser;
	}

	public String getFvalidatername() {
		return this.fvalidatername;
	}

	public void setFvalidatername(String fvalidatername) {
		this.fvalidatername = fvalidatername;
	}

	public String getFconsignee() {
		return this.fconsignee;
	}

	public void setFconsignee(String fconsignee) {
		this.fconsignee = fconsignee;
	}

	public int getFdrprelatetrantype() {
		return this.fdrprelatetrantype;
	}

	public void setFdrprelatetrantype(int fdrprelatetrantype) {
		this.fdrprelatetrantype = fdrprelatetrantype;
	}

	public short getFprintcount() {
		return this.fprintcount;
	}

	public void setFprintcount(short fprintcount) {
		this.fprintcount = fprintcount;
	}

	public BigDecimal getFdiscount() {
		return this.fdiscount;
	}

	public void setFdiscount(BigDecimal fdiscount) {
		this.fdiscount = fdiscount;
	}

	public BigDecimal getFdiscountrate() {
		return this.fdiscountrate;
	}

	public void setFdiscountrate(BigDecimal fdiscountrate) {
		this.fdiscountrate = fdiscountrate;
	}

	public BigDecimal getFcommitdiscount() {
		return this.fcommitdiscount;
	}

	public void setFcommitdiscount(BigDecimal fcommitdiscount) {
		this.fcommitdiscount = fcommitdiscount;
	}

}
