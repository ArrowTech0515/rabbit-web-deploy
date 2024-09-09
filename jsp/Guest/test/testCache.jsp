<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.util.MyRedisCache" %>

Key:<%=request.getParameter("key")%><br/>
<%
    String parameter = request.getParameter("key");
//                parameter = "https://www.davar1.co.il/spotlight/%d7%9c%d7%9e%d7%94-%d7%90%d7%aa%d7%9d-%d7%97%d7%99%d7%99%d7%91%d7%99%d7%9d-%d7%9c%d7%a7%d7%a0%d7%95%d7%aa-%d7%a4%d7%95%d7%a4%d7%99%d7%9d-%d7%94%d7%91%d7%99%d7%aa%d7%94-%d7%90%d7%95-%d7%9c%d7%97%d7%a6/";
    if (parameter == null || parameter.equals("")) {
        parameter = "V3inca.co.ilWebsiteRanks";
//        parameter = "https://timeout.co.il/ppost/%D7%A1%D7%99%D7%9C%D7%99%D7%99%D7%94-%D7%93%D7%99-%D7%94%D7%9C%D7%91%D7%A9%D7%94-%D7%AA%D7%97%D7%AA%D7%95%D7%A0%D7%94-%D7%90%D7%99%D7%9B%D7%95%D7%AA%D7%99%D7%AA-%D7%90%D7%95%D7%A0%D7%9C%D7%99%D7%99/";
    }
%>
String:<%=MyRedisCache.getInstance().get(parameter)%><br/>
Int:<%=MyRedisCache.getInstance().getInt(parameter)%><br/>
