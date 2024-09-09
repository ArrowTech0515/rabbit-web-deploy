<%@ page import="com.util.app.StaticMembersUtil" %>
<%@ page import="com.util.HtmlUtil" %>
<%@ page import="com.util.InetAddressUtil" %>
<%@ page import="com.util.GeoIPUtil" %>
<%@ page import="com.util.app.Finals" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sj" uri="/struts-jquery-tags" %>

<%
    String forwardTo = null;
    String referer = request.getHeader("Referer");
    if (referer != null) {
        session.setAttribute(Finals.TRAFFIC_SOURCE, referer);
    }

    if (StaticMembersUtil.shabbatNow &&
            (StaticMembersUtil.isDev() ||
            GeoIPUtil.getInstance().getCountryCode(InetAddressUtil.getAddressFromRequest(request)).equals("IL"))) {
%>
<jsp:include page="jsp/Guest/shabbath.jsp"/>
<%
    } else {
        String reqUrl = request.getRequestURL().toString();
//        LoggerUtil.getNewLogger().info("reqUrl is " + reqUrl);
        String minTopDomain = HtmlUtil.getMinTopDomain(reqUrl).toLowerCase();
        if (minTopDomain == null || minTopDomain.length() == 0 || minTopDomain.contains("localhost")) {
//        if (minTopDomain == null || minTopDomain.length() == 0 || minTopDomain.contains("localhost") || minTopDomain.contains("seorush")) {
%>
<%--<%@ include file="jsp/cookieLogin.jsp" %>--%>
<jsp:forward page="index-dev.html"/>
<%
        } else {
%>
<%--<jsp:forward page="index-new.html"/>--%>
<jsp:forward page="index.html"/>
<%
        }
    }
%>
