<%@ page import="com.util.DateUtil" %>
<%@ page import="com.util.MyRedisCache" %>
<%@ page import="com.util.app.KeywordUtil" %>
<%@ page import="com.util.app.StaticMembersUtil" %>
<%@ page import="com.util.app.Finals" %>
<%@ page import="com.pojo.ShabbathHoliday" %>
<%@ page import="java.util.*" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sj" uri="/struts-jquery-tags" %>
<%@ taglib prefix="sjg" uri="/struts-jquery-grid-tags" %>

<%
    Set<String> myKeys;
    TreeSet<String> myTreeSet;
%>

<h2>Actions</h2>
<table>
    <%
        myKeys = MyRedisCache.getInstance().keys("userActions*");
        myTreeSet = new TreeSet<String>();
        if (myKeys != null && myKeys.size() > 0) {
            myTreeSet.addAll(myKeys);
        }
        for (String curr : myTreeSet) {
    %>
    <tr>
        <td>
            <%=curr.replaceAll("userActions", "")%>
        </td>
        <td>
            <%=MyRedisCache.getInstance().get(curr)%>
        </td>
    </tr>
    <%
        }
    %>
</table>
<br/>
    <h2>Wix Actions</h2>
    <br/>
    <table>
        <%
            myKeys = MyRedisCache.getInstance().keys("actionsWix*");
            myTreeSet = new TreeSet<String>();
            myTreeSet.addAll(myKeys);
            for (String curr : myTreeSet) {
        %>
        <tr>
            <td>
                <%=curr.replaceAll("actionsWix", "")%>
            </td>
            <td>
                <%=MyRedisCache.getInstance().get(curr)%>
            </td>
        </tr>
        <%
            }
        %>
    </table>
<table cellpadding="5" border="1" width="100%">
    <tr valign="top">
        <td>
            <s:set var="reportVal" value="%{'Login'}"/>
            <jsp:include page="statTable.jsp"/>
        </td>
        <td>
            <s:set var="reportVal" value="%{'Cache'}"/>
            <jsp:include page="statTable.jsp"/>
        </td>
        <td>
            <s:set var="reportVal" value="%{'Websites'}"/>
            <jsp:include page="statTable.jsp"/>
        </td>
        <td>
            <s:set var="reportVal" value="%{'Keywords'}"/>
            <jsp:include page="statTable.jsp"/>
        </td>
        <td>
            <s:set var="reportVal" value="%{'Reports'}"/>
            <jsp:include page="statTable.jsp"/>
        </td>
        <td>
            <s:set var="reportVal" value="%{'Keywords Tool'}"/>
            <jsp:include page="statTable.jsp"/>
        </td>
        <td>
            <s:set var="reportVal" value="%{'Links'}"/>
            <jsp:include page="statTable.jsp"/>
        </td>
        <%--<td>--%>
        <%--<s:set var="reportVal" value="%{'Notifications'}"/>--%>
        <%--<jsp:include page="statTable.jsp" />--%>
        <%--</td>--%>
        <td>
            <s:set var="reportVal" value="%{'API'}"/>
            <jsp:include page="statTable.jsp"/>
        </td>
        <%--<td>--%>
        <%--<s:set var="reportVal" value="%{'Tasks'}"/>--%>
        <%--<jsp:include page="statTable.jsp" />--%>
        <%--</td>--%>
        <td>
            <s:set var="reportVal" value="%{'Other'}"/>
            <jsp:include page="statTable.jsp"/>
        </td>
    </tr>
</table>

<br/>
<table cellpadding="5">
    <%
        List<ShabbathHoliday> list = MyRedisCache.getInstance().get(List.class, List.class.getCanonicalName(), "shabbathList");
        if (list != null && list.size() > 0) {
            for (int i = 0; i < list.size() && i < 5; i++) {
                ShabbathHoliday curr = list.get(i);
    %>
    <tr>
        <td><%=curr.getName()%>
        </td>
        <td><%=DateUtil.formatDateWithTime(curr.getStart())%>
        </td>
        <td><%=DateUtil.formatDateWithTime(curr.getEnd())%>
        </td>
    </tr>
    <%
            }
        } else {
//            DateUtil.initShabbathTimes();
        }
    %>
</table>
<h2>SERP Tasks Waiting</h2>
<%
    Set<String> keys = MyRedisCache.getInstance().keys("GoogleRequest" + Finals.SERP_TASK_ID + "*");
    if (keys != null && keys.size() > 0) {
        int index = 1;
        for (String key : keys) {
%>
<br/>
<%=index++%>. <%=key.replaceAll("GoogleRequest" + Finals.SERP_TASK_ID + "*", "")%>
<%--<%= MyRedisCache.getInstance().get(key)%>--%>

<%
        }
    }
%>
<br />
<h2>InstanceMapping</h2>
<%
    keys = MyRedisCache.getInstance().keys("instanceMapping*");
    if (keys != null && keys.size() > 0) {
        int index = 1;
        for (String key : keys) {
%>
<br/>
<%=key%> - <%= MyRedisCache.getInstance().get(key)%>


<%
        }
    }
%>
<h2>EverStat</h2>
<table>
    <%
        keys = MyRedisCache.getInstance().keys("Everstat*");
        if (keys != null && keys.size() > 0) {
            for (String key : keys) {
    %>
    <tr>
        <td><%=key.replace("Everstat", "")%>
        </td>
        <td><%= MyRedisCache.getInstance().get(key)%>
        </td>
    </tr>
    <%
            }
        }
        Set<String> myScanKeys = MyRedisCache.getInstance().keys("ScanStat*");
        Iterator<String> iteratorScan = myScanKeys.iterator();
        while (iteratorScan.hasNext()) {
            String curr = iteratorScan.next();
    %>
    <tr>
        <td>
            <%=curr.replaceAll("ScanStat", "")%> : <%=MyRedisCache.getInstance().get(curr)%>
        </td>
    </tr>
    <%
        }
    %>
</table>