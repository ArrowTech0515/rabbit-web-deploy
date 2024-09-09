<%@ page import="com.util.MyRedisCache" %>
<%@ page import="java.util.Set" %>
<%@ page import="com.util.DateUtil" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="com.util.app.StaticMembersUtil" %>
<%@ page import="java.util.Date" %>
<%@ page import="com.util.LoggerUtil" %>
<%@ page import="java.util.List" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sj" uri="/struts-jquery-tags" %>
<%@ taglib prefix="sjg" uri="/struts-jquery-grid-tags" %>


<a href="javascript: ajaxResultToModal(apiUrl + 'clearCommentsSuperAdmin')">Clear Comments</a><br/>
<%--<a href="javascript: ajaxResultToModal(apiUrl + 'clearTodaySerpStatSuperAdmin')">Clear Today Serp Stat</a><br/>--%>
<%--<a href="javascript: ajaxResultToModal(apiUrl + 'clearTodayStatSuperAdmin')">Clear Today Stat</a><br/>--%>
<a href="javascript: ajaxResultToModal(apiUrl + 'clearAllDaysStatSuperAdmin')">Clear All Days Stat</a><br/>

<%
    if (!MyRedisCache.getInstance().exists("lastUseSuperAdminComments") || true) {
//    if ((DateUtil.getHour() >= 5 && DateUtil.getHour() < 8) || DateUtil.isTodayDay(Calendar.SATURDAY) || StaticMembersUtil.isDev()) {
        MyRedisCache.getInstance().putString("lastUseSuperAdminComments", "true", 60 * 60 * 12);
%>
<h2>Comments</h2>
<%
    StringBuffer sb = new StringBuffer();
    List<String> comments = StaticMembersUtil.getComments();
    if (comments != null) {
        for (int i = 0; i < comments.size(); i++) {
            if (!MyRedisCache.getInstance().exists("lastUseSuperAdminDays") || (!comments.get(i).contains("*** Charge") && !comments.get(i).contains("<<< Left"))) {
                sb.append(comments.get(i) + "<br />");
            }
        }
    }
%>
<%=sb.toString()%>
<br/>
<h2>Open Urls</h2>
<%
    String pattern = "JsoupHref- ";
    final Set<String> keys = MyRedisCache.getInstance().keys(pattern + "*");
    for (String curr : keys) {
        final String value = MyRedisCache.getInstance().get(curr);
        if (value.equals("false")) {
%>
<%=curr%>
<br/>
<%
        }
    }
    if (!MyRedisCache.getInstance().existsAndAddKey("lastUseSuperAdminDays", 60 * 60 * 12) || StaticMembersUtil.isDev()) {
//    if (!MyRedisCache.getInstance().existsAndAddKey("lastUseSuperAdminDays", 60 * 60 * 12)) {
%>

<jsp:include page="statDays.jsp"/>
<%
        }
    }
%>