<%@ page import="com.util.*" %>
<%@ page import="hbn.User" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sj" uri="/struts-jquery-tags" %>
<%
    User user = (User) request.getSession().getAttribute("User");
    if (user != null && user.getRole().getName().equals("SuperAdmin")) {
        String query = request.getParameter("q");%>
<%--Response is: <%= AIUtil.getOpenAiKeywords("https://www.powerboostsolutions.com", 20, "") %>--%>
<%--Response is: <%= AIUtil.callOpenAI("What can you learn about site visitors engagement patterns in those hours of day, day of week and countries? Describe top and low peak hours, top and low countries, top and low days of week, what is the reason for those statistics and what it can indicate, and write key takeaways, hours: [[6,105],[23,69],[12,66],[16,45],[0,41],[5,36],[15,36],[13,26],[18,25],[19,22],[17,19],[4,15],[20,11],[14,10],[21,9],[1,9],[22,8],[3,8],[2,2]], countries: [[\"United States\",261],[\"Ukraine\",76],[\"Romania\",62],[\"India\",58],[\"Israel\",20],[\"Australia\",16],[\"Serbia\",15],[\"Germany\",11],[\"Venezuela\",11],[\"Indonesia\",5],[\"United Kingdom\",5],[\"Canada\",4],[\"Brazil\",2],[\"Vietnam\",2],[\"New Zealand\",2],[\"Turkey\",2],[\"Cameroon\",2],[\"Colombia\",1],[\"Hong Kong\",1],[\"Russia\",1],[\"Japan\",1],[\"Belgium\",1],[\"Hungary\",1],[\"United Arab Emirates\",1],[\"Italy\",1]], days of week: [[5,363],[6,188],[4,11]]").replaceAll("\n", "<br/>") %>--%>
<%--Response is: <%= AIUtil.callOpenAI("find 20 seo keywords (including long tail keywords) for powerboostsolutions.com").replaceAll("\n", "<br/>") %>--%>
<%--Response is: <%= AIUtil.callOpenAI("find 10 seo keywords for \"Elevate Your Style with Handmade Sandals for Women | Kosh-a\"").replaceAll("\n", "<br/>") %>--%>
Query is: <%=query%>
<br />
Response is: <%= AIUtil.callOpenAI(query).replaceAll("\n", "<br/>") %>
<%
    }
%>