<%@ page import="com.util.DateUtil" %>
<%@ page import="com.util.MyRedisCache" %>
<%@ page import="com.util.app.Finals" %>
<%@ page import="com.util.app.StaticMembersUtil" %>
<%@ page import="java.util.*" %>
<%@ page import="com.util.LoggerUtil" %>
<%@ page import="com.util.BlogsAndListingsLoader" %>
<%@ page import="com.bo.tasks.SearchMonitorTask" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
Env Type is <%=StaticMembersUtil.getEnvType() %> - <%=StaticMembersUtil.instanceId %>
<br/>
Build Version is <%=StaticMembersUtil.buildVersion %>
<br/>
jmx port: <%=System.getProperty("com.sun.management.jmxremote.port")%>
Start time is <%=StaticMembersUtil.startTime %>
<br/>
Current Time is <%=DateUtil.formatDateWithTime(new Date())%>
<br />
Israel Time is <%=DateUtil.getIsraelTime() %>
<br />

Avg CPU is <%=StaticMembersUtil.isDev() ? "" : SearchMonitorTask.getAvgCpu() %>
<%
    Set<String> myKeys;
    TreeSet<String> myTreeSet;
%>
<br/>

<h2>Stat</h2>
<%--Hour now is <%=DateUtil.getHour()%>--%>
<%
//    if ((DateUtil.getHour() >= 5 && DateUtil.getHour() < 8) || DateUtil.isTodayDay(Calendar.SATURDAY)) {
    if (!MyRedisCache.getInstance().exists("lastUseSuperAdminStat")) {
        MyRedisCache.getInstance().putString("lastUseSuperAdminStat", "true", 60 * 60 * 12);

        myKeys = MyRedisCache.getInstance().keys(StaticMembersUtil.STAT + "W-*");
    myTreeSet = new TreeSet<String>();
    if (myKeys != null && myKeys.size() > 0) {
        myTreeSet.addAll(myKeys);
    }
    if (myTreeSet.size() > 0) {
        for (String key : myTreeSet) {
%>
<br/>
<% if (key.contains("Charge") || key.contains("Income") || key.contains("Left")) { %>
<b>
    <%=key.replace(StaticMembersUtil.STAT + "W-", "")%>:
    $<%= MyRedisCache.getInstance().get(key)%>
</b>
<% } else if (key.contains("Cost")) { %>
<b>
<%=key.replace(StaticMembersUtil.STAT + "W-", "")%>:
$<%= MyRedisCache.getInstance().getInteger(key) %> Avg: $<%= MyRedisCache.getInstance().getInteger(key) / MyRedisCache.getInstance().getInteger(StaticMembersUtil.STAT + "W-DataForSEO API Call") %>
<%--$<%= MyRedisCache.getInstance().getInteger(key) / 10000 %> Avg: $<%= MyRedisCache.getInstance().getInteger(key) / 10000 / MyRedisCache.getInstance().getInteger(StaticMembersUtil.STAT + "W-DataForSEO API Call") %>--%>
</b>
<% } else { %>
<%=key.replace(StaticMembersUtil.STAT + "W-", "")%>:
<%= MyRedisCache.getInstance().get(key)%>
<% }
}
}

try {
//    String val = null;
//    if (session.getAttribute("TestSession") == null) {
//        session.setAttribute("TestSession", StaticMembersUtil.instanceId);
//    } else {
//        val = session.getAttribute("TestSession").toString();
//    }
%>

<br />
Wix signup Conv rate: <%=Double.parseDouble(MyRedisCache.getInstance().get(StaticMembersUtil.STAT + "W-Wix Upgrade Hook"))/Long.parseLong(MyRedisCache.getInstance().get(StaticMembersUtil.STAT + "W-*WixSignup"))%>
<br />
Wix created Conv rate: <%=Double.parseDouble(MyRedisCache.getInstance().get(StaticMembersUtil.STAT + "W-Wix Upgrade Hook"))/Long.parseLong(MyRedisCache.getInstance().get(StaticMembersUtil.STAT + "W-Wix Created"))%>
<br />
Wix created hook Conv rate: <%=Double.parseDouble(MyRedisCache.getInstance().get(StaticMembersUtil.STAT + "W-Wix Upgrade Hook"))/Long.parseLong(MyRedisCache.getInstance().get(StaticMembersUtil.STAT + "W-Wix Created Hook"))%>
<br />
Newsletters Per Day: <%=MyRedisCache.getInstance().get(Finals.DAILY_COUNTER + "newslettersPerDay")%>
<%
    } catch (Exception e) {}
    }
    LoggerUtil.getNewLogger().info("in stat StaticMembersUtil.shabbatStart is " + StaticMembersUtil.shabbatStart);

    if (StaticMembersUtil.shabbatStart == null) {
        MyRedisCache.getInstance().delByTypeAndId(List.class.getCanonicalName(), "shabbathList");
        DateUtil.setShabbatTimes();
    }
%>
<br/>
Next Shabbath / Holiday : <%= StaticMembersUtil.shabbatTitle %>
<br/>
Start : <%= StaticMembersUtil.shabbatStart %>
<br/>
Finish : <%= StaticMembersUtil.shabbatFinish %>
<br/>
<%
    if (StaticMembersUtil.ownBlogs.keySet().size() == 0) {
        BlogsAndListingsLoader loader = new BlogsAndListingsLoader();
        loader.setPublishWebsites();
    }
%>
Blogs : <%= StaticMembersUtil.ownBlogs.size() %>

<br />
<a href="https://admin.rabbitseo.com/startRestartSuperAdmin">Restart App</a>
<br />
<br />
<a href="javascript: showPaymentUserForm(4)">Wix Invoice</a>
<br />
<br />
<%--DB Total Actions <%=StaticMembersUtil.dbTotalActions%>--%>
<%--<br />--%>
<%--<br />--%>
<%--DB Actions <%=StaticMembersUtil.dbActions%>--%>
<%--<br />--%>
<%--<br />--%>
Top Articles Sites <%=MyRedisCache.getInstance().getKeysAsSortedSet("UpgradedSiteArticle")%>
<br />
<br />
Top Listings Sites <%=MyRedisCache.getInstance().getKeysAsSortedSet("UpgradedSiteListing")%>