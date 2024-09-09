<%@ page import="com.util.WordpressLoadBlogUtil" %>
<%@ page import="com.util.app.ErrorUtil" %>
<%@ page import="com.util.app.StaticMembersUtil" %>
<%@ page import="java.util.Map" %>
<%@ page import="com.util.WordpressUtil" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<%
    Thread thread = new Thread(new Runnable() {
        public void run() {
            try {
//                WordpressLoadBlogUtil.fixBlog("https://TheAmericanReporters.com", "1G9K Infs rFE6 oyhr BGIE nDnM");
//                WordpressLoadBlogUtil.fixBlog("https://InclineMagazine.com", "f069 bcD4 iTmT Jogq 5tts TOUL");
//                WordpressLoadBlogUtil.fixBlog("https://FYImagazine.org", "3Dsv 9UAd dBq2 omMz 4Bth MUQV");
//                WordpressLoadBlogUtil.fixBlog("https://BlogPartners.org", "xuai rU33 Yp1H Mydl NSvF y016");
//                WordpressLoadBlogUtil.fixBlog("https://TodayThoughs.com", "zD8Z MUkc GCnE SKmX WpUA tL43");
//                WordpressLoadBlogUtil.fixBlog("https://PRnewsBuz.com", "vCC2 jVQw f456 uFX6 fEkY jzpW");
//                WordpressLoadBlogUtil.fixBlog("https://MyTrendingsNews.com", "b3kf ewp9 kytV PebZ VIJ0 iUsx");
//                WordpressLoadBlogUtil.fixBlog("https://SmallBizFire.com", "s2FY 5a5J 6rhG whXe 4t2r z0w4");
//                WordpressLoadBlogUtil.fixBlog("https://BizModuleHub.com", "rb0q 4xo0 kxCE WsWt uPqC mO5V");
//                WordpressLoadBlogUtil.fixBlog("https://JournalPostToday.com", "8FkM Qhpw LF7O LVLY Gu0q VCkb");
//                WordpressLoadBlogUtil.fixBlog("https://VentMagTimes.com", "yCJI rrnB NH5t PCZW WDyq 5G1u");
//                WordpressLoadBlogUtil.fixBlog("https://TimeBulletinMag.com", "8hzr 0oxn IOiu QvEW dgx2 l4Xl");
//                WordpressLoadBlogUtil.fixBlog("https://InsidHerald.com", "TJA0 OE40 77iU 0RiI lElv Uuk1");
//                WordpressLoadBlogUtil.fixBlog("https://JnewsBuzz.com", "1Bsl QIhL TMlR bppL pl2W lM8m");
//                WordpressLoadBlogUtil.fixBlog("https://OnlineBusinesses.site", "Po3G Fb9L RRO1 ubD3 YAxY nlTH");
//                WordpressLoadBlogUtil.fixBlog("https://Premium-Biz.com", "Xp49 2hoV mV0C pzeK 81LU OlYr");
//                WordpressLoadBlogUtil.fixBlog("https://TheIndex.biz", "5n2n 1efP C3WR IFbe qpWT TMqc");
//                WordpressLoadBlogUtil.fixBlog("https://BizWeb.info", "sYL0 KWjz oLYB btTI TPzt l6rz");
//                WordpressLoadBlogUtil.fixBlog("https://SMB-Listing.com", "3yem gLB3 PCCm 0ZMN p9UB ShKz");
//                WordpressLoadBlogUtil.fixBlog("https://SeekerTime.com", "xyjN 4yrG ttQF KK7j DvUS ncvE");
//                WordpressLoadBlogUtil.fixBlog("https://InsiderPostToday.com", "PWM4 8eSw L19C 4uHs FXUE SHDG");
//                WordpressLoadBlogUtil.fixBlog("https://LocalNewsHerald.com", "AOmJ 0xHU KsrK bSCg dZxh nOdr");

//                WordpressLoadBlogUtil.loadAndFixBlog("https://RealityReporters.com", "5yBH u5yj YXz6 9ile SXBI qkKM");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://InstaBizBulletin.com", "Nj38 x5vt 5CCh OIpp nAuX 1nvw");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://BigTimesDaily.com", "t2R5 a7f0 ewmh DGQ1 Ly0z ktS2");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://TimesBulletinMag.com", "dPN9 TRpz Trcy OhIm TVzm Ay24");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://FlexWorldNews.com", "0xaa W5st cpW8 lfZa BDpO nmNx");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://LogicalReporter.com", "R9ta P5d4 LXL6 wUmx ATOE cGBa");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://TexasNewsMagazine.com", "1fPG xqjo kFgo zac2 cdRB gsE9");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://NextUltraNews.com", "9GT0 nhx0 ATsR xflo D222 jEDf");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://UniqueNewsReporter.com", "NsKK rGTk JINF pl51 6PNN lpQL");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://BizNewsReporter.com", "JP4z VyHA cprt q2jE 94vA 3ofl");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://NextBrandBiz.com", "RgZ8 Zqpd cCGI l6fw 3tci QBSO");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://MagazineOfUSA.com", "3nUE MnFC 0vIp RcXg VJr1 TAAJ");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://TheMagazineWorld.com", "jNT7 O3Gc wyh2 VesN OiGV RnZr");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://CaliforniasBulletin.com", "fajR Tr8x afxo SDSO j3Zt P1rP");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://TimesBizNews.com", "odMb tTtN JI1U 3QWM I6Bf Xphw");

//                WordpressLoadBlogUtil.loadAndFixBlog("https://www.DailyFloridaPost.com", "O24J kZLj jmBy mWYG oYy3 n64L");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://www.DailyPostBiz.com", "aLIt G26q MEaH TT4b 1s1X 9M2L");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://www.DailyPressMag.com", "85Il F9Oy wanj YZH0 pNEj ynqN");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://www.DailyFolkNews.com", "me1g M9eS cRzu 73LB yLZS pvCL");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://www.FlexBuzzPress.com", "6OFu KMqn 5UOb 2jUW tNh0 8o0l");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://www.FoxWorldPost.com", "RaFB EaUF fWHz bhqw nH4X Ifjb");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://www.LaTimesWeekly.com", "ggcU 6Rxr pUci VQ0d PF83 bdhx");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://www.NextExpressNews.com", "dLvH EnAd XqsY Lqw6 yliF 4v6h");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://www.PremiumBizPost.com", "Y29z BICc tMy1 haFK dXTw UuVS");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://www.TheWireMagazines.com", "YzNt Ykpr 5Fzi PwHx 1zS0 vpjJ");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://TimesBizNews.com", "odMb tTtN JI1U 3QWM I6Bf Xphw");

//                WordpressLoadBlogUtil.loadAndFixBlog("https://CreativeMagToday.com", "pu4W cb5c jPBM 09og 94Wm 6Okf");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://TrendLogBiz.com", "vrFc zLMW Rdjs VuJl Lu6K m3Xo");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://TrendingTopicsPost.com", "ws6t HmJs 8Vub 0qmM xLp7 u0dq");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://DailyInkNews.com", "Frd9 y7wV rmPs SoiX jpb3 UVZc");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://DailyBaseNet.com", "qKwi 7rkJ mUkC MPXX CWYp 3CYO");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://BulletinVision.com", "7CAW CXke boBs DF19 NT9U M1du");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://DailyDispatchMag.com", "dVT7 XXM0 KvwP orUE R9cY xWUC");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://PressWireHub.com", "H8JX unEa YpKu hMCq A8fT HZmf");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://TimesVisionWire.com", "c6Xp YH0V Dzcs PipU qm5z CkEy");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://NewsPulseWire.com", "rWpn G0jO Hqau rjCG SzD0 uwlQ");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://ProMediaBuzz.com", "ECzE vpxH jxuV au3b 26cM wo2M");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://LoopPlay.net", "SfnB KBLB iqak EFUF yyVU di6I");

//                WordpressLoadBlogUtil.loadAndFixBlog("https://InfoNetInsider.com", "jZSq WhKm jzAL unVj 09Z1 rqb1");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://NewsFlowHub.com", "i609 n0Od vsWp YN2D Zg8Q 75gR");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://BuzzSphereNews.com", "GVzp ApUA BkvH HTjw KZBV wPg6");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://InstantBulletins.com", "pDev ucJM J1X1 0uk1 9KqN 3I7W");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://NewsInsiderPost.com", "vUdB wQvf GPCo IaWH lujl PPh5");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://AllNewBiz.com", "ewn5 oG6a QKFa uP96 Q89f Ejui");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://BuzzAlertNews.com", "MJDr nbvf OnJF L4su AA1W 82LG");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://BuzzWireMag.com", "bhBD W6Rc 6L3U Zr6w afAu 1m5e");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://CoverageMag.com", "7NqX srRt 3ARq fhI8 BLvH mBz5");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://CurrentBuzzHub.com", "ihdw eLqG mGXl SCzE cjbj zVbp");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://DailyInsightReport.com", "L7mH jbug pZfK UIYX EZVU YW04");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://FlixWorldNews.com", "wnYg HY9H 2LU0 EWrI cXBB 3OWp");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://GlobalBuzzWire.com", "AQGD Yg0z O09P syci gcER LTpH");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://NewsBitBox.com", "6IRA EGe2 Uyps tLux cO0F CelB");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://DailyNewsValley.com", "hv1f DzOM fc2c nw6p hJcJ brvK");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://GlobalVoiceMag.com", "gWMd 88M1 uw8E WxTL hB0Q Y8Bj");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://HotTopicReport.com", "Gypw bTq9 vd9o EDam SnYt tn8f");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://DailyPulseMag.com", "7ivz wdke 0mUL Aned ktTk GHJs");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://InfoPortalNews.com", "cCMh Uq4z E60t ZNBa KjXe NvKM");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://NewsPrintMag.com", "FSXv yjPG O31X ziKw 8nc2 o8sf");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://PaperTrailNews.com", "nfY0 gwYv t8Mg W4WZ 8XNv i1gn");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://OpenMagNews.com", "gmD2 emoN 9vdi pw72 40tB S51N");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://MediaInsightHub.com", "W6po XCQh BQGV gd2y J85n JBcs");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://NewsInkMag.com", "TPVl yzgz BDYl XuSV Jwpa Kmu4");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://NewsPlanetToday.com", "nq28 t00E 5jzs xOYn Rmvq uKpG");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://MediaWireHub.com", "DhGP TA3p 1YDa AI0u Aige GgKl");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://NewsBurstMag.com", "RLpD qP7c RGNK gnRV Thnk Gl6o");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://ReporterDispatch.com", "Zzsq 1jvL OxRK Yr1n ieYi oAWd");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://PressWireLine.com", "3b9N g1Rr K9bu r5Ko OOWg 3j2r");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://NewsWorthyJournal.com", "SjOc YFUT mlTC 7Ytr RisI doNp");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://ReportersInsight.com", "CD4U jlP0 p6dR yNrh VJZ2 6qY1");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://SimilarNetMag.com", "ooAS Q7j9 teVo tpzA 7YeI 7iyl");

//                WordpressLoadBlogUtil.loadAndFixBlog("https://TopBizPaper.com", "Njwo 6p90 x771 4iya lq7l VDcY");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://StarNewsTribune.com", "ifEK XHpS cQxT Zwnf Vz4N FYYH");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://TheJournalPulse.com", "PcBt mwEh 5EbH PmoP SVNY 4kjf");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://TheMediaBurst.com", "Dosz HjJh tju6 RUcz rxks Zt11");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://NewsWireMaven.com", "KhR4 BqqX GQQk EqAk Tf8s kkrJ");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://TheNewsEmpires.com", "UZHX MBHq eTPn ljBU Mtni 4BNi");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://CurrentBuzzPost.com", "wao7 V1wE WT9Y s5cX O1oi Rmze");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://ThePressOutLet.com", "40xS oWKf 01DD zngM 0zdd eJlV");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://TheReporterDesk.com", "c3jt H6l4 vDdN wfEv L8YB TGjW");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://TimeBulletins.com", "b46Q SPjy uNLV 7U9I hn1M kf34");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://TrendWaveMag.com", "4vNz ARje uh6Q 3Xdp jxJ6 EoVc");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://USTimesMag.com", "SIwv qQes 8Wph C7AU e91k lOI0");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://WeeklyVents.com", "M4gb jd5R R0t2 0bHI xkuZ TgZw");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://WorldMagZone.com", "0kdI ZPcy UBzj ldmU blmr wLRR");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://RealityBizTimes.com", "rZfj uprD botF Ik1n 1Qk6 1vq7");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://DailyBaynet.com", "EDmI AJQp 4mVE bV31 d5O3 4dFz");
//                WordpressLoadBlogUtil.loadAndFixBlog("https://kishies.com", "HfUq jQDX bvNB hfLq iAIT mFxZ");
            } catch (Exception e) {
                ErrorUtil.logError(e);
            }
        }
    });
    StaticMembersUtil.threadList.add(thread);
    thread.start();

%>
Working....
<%=WordpressUtil.listCategories("https://DailyInkNews.com", "admin", "Frd9 y7wV rmPs SoiX jpb3 UVZc")%>